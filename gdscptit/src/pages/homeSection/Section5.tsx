import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesGDSC from "@/data/categories.json";
import benefits from "@/data/benefits.json";
import { motion } from "framer-motion";
import com1 from "@/assets/home/section5/1.png";
import com2 from "@/assets/home/section5/14.png";

export function Section5() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = categoriesGDSC;

  const memberBenefits = benefits;

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <div className="relative max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="relative text-center mb-8 z-60">
        <h1 className="text-3xl md:text-4xl font-bold text-gdsc-primary-red mb-6">
          Trở thành 1 thành viên của
          <br />
          GDG on Campus: PTIT ngay!
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-6 py-2 rounded-full border-2 transition-all duration-300 text-lg md:text-base ${selectedCategory === category.id
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Selected Category Description */}
        {selectedCategoryData && (
          <motion.div
            key={selectedCategoryData.id}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-4 bg-blue-50 rounded-lg"
          >
            <h3 className="font-semibold text-blue-700 mb-2 text-2xl">
              {selectedCategoryData.label}
            </h3>
            <p className="text-gray-700 text-lg">
              {selectedCategoryData.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Member Benefits Section */}
      <motion.div
        className="relative bg-blue-50 rounded-lg p-6 mb-8 z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 text-center mb-6">
          QUYỀN LỢI THÀNH VIÊN
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {(() => {
            const half = Math.ceil(memberBenefits.length / 2);
            const left = memberBenefits.slice(0, half);
            const right = memberBenefits.slice(half);
            return [left, right].map((column, colIndex) => (
              <div key={colIndex} className="space-y-3">
                {column.map((benefit, index) => (
                  <div key={index + colIndex * half} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 text-lg leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            ));
          })()}
        </div>
      </motion.div>


      {/* Registration Button */}
      <div className="relative text-center z-10">
        <motion.button
          className="bg-gdsc-primary-blue hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg cursor-pointer text-lg md:text-xl"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/form")}
        >
          ĐĂNG KÝ THAM GIA
        </motion.button>
      </div>

      {/* Floating Images behind */}
      <motion.img
        src={com1}
        alt="Community 1"
        className="absolute bottom-0 -left-25 w-56 md:w-72 z-0 -rotate-15"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={com2}
        alt="Community 2"
        className="absolute top-0 -right-10 md:right-0 w-40 md:w-52 z-50 rotate-12"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );

}
