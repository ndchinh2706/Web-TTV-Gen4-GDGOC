import type { ChatPayload } from "@/types/chat";
const API = import.meta.env.VITE_API_URL;
export async function askChat(payload: ChatPayload) {
    const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        return Promise.reject(await res.json());
    }

    return await res.json();
}

