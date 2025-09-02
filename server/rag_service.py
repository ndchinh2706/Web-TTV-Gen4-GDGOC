import os
import re
import pickle
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from openai import OpenAI
from typing import List, Dict, Tuple
import logging

logger = logging.getLogger(__name__)

class RAGService:
    def __init__(self, config):
        self.config = config
        self.openai_client = None
        self.embedding_model = None
        self.knowledge_chunks = []
        self.embeddings = None
        self.faiss_index = None
        self.embeddings_file = 'embeddings.pkl'
        self.index_file = 'faiss_index.bin'
        
        self.initialize_openai()
        self.initialize_embedding_model()
        self.load_or_create_embeddings()
    
    def initialize_openai(self):
        try:
            if hasattr(self.config, 'get'):
                api_key = self.config.get('OPENAI_API_KEY')
                base_url = self.config.get('OPENAI_BASE_URL', 'https://api.openai.com/v1')
            else:
                api_key = getattr(self.config, 'OPENAI_API_KEY', None)
                base_url = getattr(self.config, 'OPENAI_BASE_URL', 'https://api.openai.com/v1')
            
            if not api_key:
                logger.warning("OpenAI API key not configured. Chat functionality will be limited.")
                self.openai_client = None
                return
                
            self.openai_client = OpenAI(
                api_key=api_key,
                base_url=base_url
            )
            logger.info("OpenAI client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize OpenAI client: {e}")
            self.openai_client = None
    
    def initialize_embedding_model(self):
        try:
            if hasattr(self.config, 'get'):
                model_name = self.config.get('EMBEDDING_MODEL', 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
            else:
                model_name = getattr(self.config, 'EMBEDDING_MODEL', 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
                
            self.embedding_model = SentenceTransformer(model_name)
            logger.info(f"Embedding model loaded: {model_name}")
        except Exception as e:
            logger.error(f"Failed to load embedding model: {e}")
            raise
    
    def load_knowledge_base(self) -> str:
        try:
            if hasattr(self.config, 'get'):
                kb_path = self.config.get('KNOWLEDGE_BASE_PATH', 'text/knowledge_base.txt')
            else:
                kb_path = getattr(self.config, 'KNOWLEDGE_BASE_PATH', 'text/knowledge_base.txt')
                
            knowledge_path = os.path.join(os.path.dirname(__file__), kb_path)
            with open(knowledge_path, 'r', encoding='utf-8') as f:
                content = f.read()
            logger.info(f"Knowledge base loaded from {knowledge_path}")
            return content
        except Exception as e:
            logger.error(f"Failed to load knowledge base: {e}")
            raise
    
    def chunk_text(self, text: str) -> List[str]:
        sections = text.split('\n\n')
        chunks = []
        
        for section in sections:
            section = section.strip()
            if not section:
                continue
            
            if len(section) > 500:
                sentences = re.split(r'[.!?]\s+', section)
                current_chunk = ""
                
                for sentence in sentences:
                    if len(current_chunk + sentence) <= 500:
                        current_chunk += sentence + ". "
                    else:
                        if current_chunk:
                            chunks.append(current_chunk.strip())
                        current_chunk = sentence + ". "
                
                if current_chunk:
                    chunks.append(current_chunk.strip())
            else:
                chunks.append(section)
        
        chunks = [chunk for chunk in chunks if len(chunk) > 50]
        
        logger.info(f"Text split into {len(chunks)} chunks")
        return chunks
    
    def load_or_create_embeddings(self):
        embeddings_path = os.path.join(os.path.dirname(__file__), self.embeddings_file)
        index_path = os.path.join(os.path.dirname(__file__), self.index_file)
        
        if os.path.exists(embeddings_path) and os.path.exists(index_path):
            try:
                self.load_embeddings(embeddings_path, index_path)
                logger.info("Loaded existing embeddings and FAISS index")
                return
            except Exception as e:
                logger.warning(f"Failed to load existing embeddings: {e}. Creating new ones.")
        
        self.create_embeddings()
        self.save_embeddings(embeddings_path, index_path)
    
    def create_embeddings(self):
        try:
            knowledge_text = self.load_knowledge_base()
            self.knowledge_chunks = self.chunk_text(knowledge_text)
            
            logger.info("Creating embeddings for knowledge chunks...")
            embeddings = self.embedding_model.encode(self.knowledge_chunks, convert_to_numpy=True)
            self.embeddings = embeddings
            
            dimension = embeddings.shape[1]
            self.faiss_index = faiss.IndexFlatIP(dimension)
            
            faiss.normalize_L2(embeddings)
            self.faiss_index.add(embeddings)
            
            logger.info(f"Created embeddings for {len(self.knowledge_chunks)} chunks")
            
        except Exception as e:
            logger.error(f"Failed to create embeddings: {e}")
            raise
    
    def save_embeddings(self, embeddings_path: str, index_path: str):
        try:
            with open(embeddings_path, 'wb') as f:
                pickle.dump({
                    'chunks': self.knowledge_chunks,
                    'embeddings': self.embeddings
                }, f)
            
            faiss.write_index(self.faiss_index, index_path)
            
            logger.info("Embeddings and index saved successfully")
        except Exception as e:
            logger.error(f"Failed to save embeddings: {e}")
    
    def load_embeddings(self, embeddings_path: str, index_path: str):
        with open(embeddings_path, 'rb') as f:
            data = pickle.load(f)
            self.knowledge_chunks = data['chunks']
            self.embeddings = data['embeddings']
        
        self.faiss_index = faiss.read_index(index_path)
    
    def search_similar_chunks(self, query: str) -> List[Tuple[str, float]]:
        try:
            query_embedding = self.embedding_model.encode([query], convert_to_numpy=True)
            faiss.normalize_L2(query_embedding)
            
            if hasattr(self.config, 'get'):
                max_chunks = self.config.get('MAX_CHUNKS_FOR_CONTEXT', 3)
                similarity_threshold = self.config.get('SIMILARITY_THRESHOLD', 0.3)
            else:
                max_chunks = getattr(self.config, 'MAX_CHUNKS_FOR_CONTEXT', 3)
                similarity_threshold = getattr(self.config, 'SIMILARITY_THRESHOLD', 0.3)
                
            scores, indices = self.faiss_index.search(query_embedding, max_chunks * 2)
            
            results = []
            for score, idx in zip(scores[0], indices[0]):
                if score >= similarity_threshold:
                    results.append((self.knowledge_chunks[idx], float(score)))
            
            results.sort(key=lambda x: x[1], reverse=True)
            
            return results[:max_chunks]
            
        except Exception as e:
            logger.error(f"Error in similarity search: {e}")
            return []
    
    def is_greeting_or_help(self, query: str) -> bool:
        """Check if the query is a greeting or help request"""
        greetings = [
            'xin chào', 'chào', 'hello', 'hi', 'hey', 'chào bạn', 'chào em',
            'good morning', 'good afternoon', 'good evening', 'kính chào'
        ]
        help_requests = [
            'giúp', 'help', 'hướng dẫn', 'instruction', 'cách sử dụng',
            'làm sao', 'thế nào', 'có thể', 'giải thích', 'explain'
        ]
        
        query_lower = query.lower().strip()
        
        if any(greeting in query_lower for greeting in greetings):
            return True
            
        if any(help_word in query_lower for help_word in help_requests):
            return True
            
        return False
    
    def is_relevant_query(self, query: str, relevant_chunks: List[Tuple[str, float]]) -> bool:
        if not relevant_chunks:
            if self.is_greeting_or_help(query):
                return True
            return False
        
        best_score = relevant_chunks[0][1] if relevant_chunks else 0
        
        gdg_keywords = [
            'gdg', 'gdsc', 'google developer', 'google developers', 'ptit',
            'tuyển thành viên', 'tuyển sinh', 'đăng ký', 'technical', 'design',
            'truyền thông', 'nhân sự', 'hậu cần', 'câu lạc bộ', 'clb',
            'sự kiện', 'hoạt động', 'training', 'dự án', 'gen 4', 'tech', 'hrlg', 'pr',
            'apply', 'ứng tuyển', 'coding', 'lập trình', 'developer', 'community', 'cộng đồng'
        ]
        
        query_lower = query.lower()
        has_keywords = any(keyword in query_lower for keyword in gdg_keywords)
        
        if hasattr(self.config, 'get'):
            similarity_threshold = self.config.get('SIMILARITY_THRESHOLD', 0.3)
        else:
            similarity_threshold = getattr(self.config, 'SIMILARITY_THRESHOLD', 0.3)
        
        if self.is_greeting_or_help(query):
            return True
            
        return best_score >= similarity_threshold or has_keywords
    
    def create_prompt(self, query: str, context_chunks: List[str]) -> str:
        context = "\n\n".join(context_chunks)
        
        is_greeting_help = self.is_greeting_or_help(query)
        
        if is_greeting_help and not context_chunks:
            prompt = f"""Bạn là một chatbot hỗ trợ thân thiện cho GDG on Campus: PTIT. Hãy chào hỏi một cách ấm áp và giới thiệu về khả năng hỗ trợ của bạn.

CÂU HỎI/LỜI CHÀO: {query}

QUY TẮC TRẢ LỜI:
1. Chào hỏi thân thiện bằng tiếng Việt
2. Giới thiệu ngắn gọn về GDG on Campus: PTIT
3. Đưa ra một vài gợi ý về những câu hỏi mà người dùng có thể hỏi
4. Khuyến khích tham gia CLB
5. Xưng hô 2 ngôi là "tớ" và "cậu"
6. Hãy tự nhiên và thân thiện như đang nói chuyện với bạn

TRẢ LỜI:"""
        else:
            prompt = f"""Bạn là một chatbot hỗ trợ cho GDG on Campus: PTIT (Google Developer Groups on Campus: PTIT). Hãy trả lời câu hỏi dựa trên thông tin được cung cấp.

THÔNG TIN VỀ GDG on Campus: PTIT:
{context}

QUY TẮC TRẢ LỜI:
1. Chỉ trả lời các câu hỏi liên quan đến GDG on Campus: PTIT
2. Sử dụng thông tin từ ngữ cảnh được cung cấp ở trên
3. Trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp
4. Nếu không có thông tin trong ngữ cảnh nhưng vấn đề liên quan tới CLB, hãy trả lời sát nhất có thể và nói "Nhưng tớ không được cung cấp thông tin chi tiết về vấn đề này. Cậu vui lòng liên hệ trực tiếp với GDG on Campus: PTIT qua fanpage https://www.facebook.com/gdsc.ptit để được hỗ trợ tốt nhất nhé!"
5. Luôn khuyến khích người dùng đăng ký tham gia CLB
6. Xưng hô 2 ngôi là "tớ" và "cậu"
7. Hãy tự nhiên và thân thiện như đang trò chuyện với bạn bè

CÂU HỎI: {query}

TRẢ LỜI:"""
        
        return prompt
    
    def chat(self, query: str) -> Dict[str, any]:
        try:
            if not self.openai_client:
                return {
                    'response': 'Xin lỗi, câu hỏi đó nằm ngoài khả năng hiểu biết của tớ. Cậu vui lòng nhắn tin qua fanpage https://www.facebook.com/gdsc.ptit để được hỗ trợ nhéeee.',
                    'relevant': False,
                    'sources': [],
                    'error': 'OpenAI client not configured'
                }
            
            relevant_chunks = self.search_similar_chunks(query)
            
            if not self.is_relevant_query(query, relevant_chunks):
                return {
                    'response': 'Xin lỗi, câu hỏi đó nằm ngoài khả năng hiểu biết của tớ. Cậu vui lòng nhắn tin qua fanpage https://www.facebook.com/gdsc.ptit để được hỗ trợ nhée.',
                    'relevant': False,
                    'sources': []
                }
            
            context_chunks = [chunk for chunk, score in relevant_chunks]
            
            prompt = self.create_prompt(query, context_chunks)
            
            if hasattr(self.config, 'get'):
                model = self.config.get('OPENAI_MODEL', 'gpt-3.5-turbo')
            else:
                model = getattr(self.config, 'OPENAI_MODEL', 'gpt-3.5-turbo')
            
            response = self.openai_client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            answer = response.choices[0].message.content.strip()
            
            sources = [
                {
                    'content': chunk[:100] + '...' if len(chunk) > 100 else chunk,
                    'similarity_score': score
                }
                for chunk, score in relevant_chunks
            ]
            
            return {
                'response': answer,
                'relevant': True,
                'sources': sources
            }
            
        except Exception as e:
            logger.error(f"Error in chat function: {e}")
            return {
                'response': 'Xin lỗi, câu hỏi đó nằm ngoài khả năng hiểu biết của tớ. Cậu vui lòng nhắn tin qua fanpage https://www.facebook.com/gdsc.ptit để được hỗ trợ nhéee',
                'relevant': False,
                'sources': [],
                'error': str(e)
            }
