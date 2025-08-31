import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "@/data/question.json"
import majorsData from "@/data/majors.json"
import { motion } from "framer-motion";
import type { FormData } from "@/types/form";
import { useNotification } from "@/components/Notification";
import { submitForm } from "@/services/formService";
import SuccessPopup from "@/components/SuccessPopup";
import { AiOutlineWarning } from "react-icons/ai";
import { REGISTRATION_END } from "@/data/const"
import NotYetPopup from "@/components/NotYetPopup";

import circleBlue from '@/assets/sticker/circle-blue.svg'
import circleRed from '@/assets/sticker/circle-red.svg'
import circleYellow from '@/assets/sticker/circle-yellow.svg'
import circleGreen from '@/assets/sticker/circle-green.svg'

interface ValidationErrors {
    [key: string]: string;
}
const defaultFormData: FormData = {
    information: {
        full_name: "",
        student_code: "",
        gender: "Nam",
        email: "",
        phone_number: "",
        facebook_link: "",
        dob: "",
        university: "",
        majors: "",
        student_year: "",
        applied_department: "",
    },
    answers: Array(10).fill(""),
};

function getInitialFormData(): FormData {
    const saved = localStorage.getItem("section3Data");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            return {
                information: { ...defaultFormData.information, ...(parsed.information || {}) },
                answers: parsed.answers || defaultFormData.answers,
            };
        } catch {
            return defaultFormData;
        }
    }
    return defaultFormData;
}

export function Section1() {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const now = new Date();
        if (now > REGISTRATION_END) {
            setShowPopup(true);
        }
    }, []);

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showPopup]);

    const [errFormReplicate, setErrFormReplicate] = useState(false);
    const { notify } = useNotification();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>(getInitialFormData);
    const [clubQuestion, setClubQuestion] = useState(() => {
        const saved = localStorage.getItem("section3Data");
        if (saved) {
            try {
                return JSON.parse(saved).clubQuestion || "";
            } catch {
                return "";
            }
        }
        return "";
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        localStorage.setItem(
            "section3Data",
            JSON.stringify({
                information: formData.information,
                answers: formData.answers,
                clubQuestion,
            })
        );
    }, [formData, clubQuestion]);


    const validateField = (name: string, value: string) => {
        const newErrors = { ...errors };
        switch (name) {
            case "full_name":
                !value.trim()
                    ? (newErrors.full_name = "Họ và tên là bắt buộc")
                    : delete newErrors.full_name;
                break;
            case "student_code":
                !value.trim()
                    ? (newErrors.student_code = "Mã sinh viên là bắt buộc")
                    : delete newErrors.student_code;
                break;
            case "email":
                if (!value.trim()) newErrors.email = "Email là bắt buộc";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    newErrors.email = "Email không hợp lệ";
                else delete newErrors.email;
                break;
            case "phone_number":
                if (!value.trim()) newErrors.phone_number = "Số điện thoại là bắt buộc";
                else if (!/^[0-9+\-\s()]+$/.test(value))
                    newErrors.phone_number = "Số điện thoại không hợp lệ";
                else delete newErrors.phone_number;
                break;
            case "facebook_link":
                if (!value.trim()) newErrors.facebook_link = "Link Facebook là bắt buộc";
                else if (!value.includes("facebook.com") && !value.includes("fb.com"))
                    newErrors.facebook_link = "Link Facebook không hợp lệ";
                else delete newErrors.facebook_link;
                break;
            case "dob":
                !value
                    ? (newErrors.dob = "Ngày sinh là bắt buộc")
                    : delete newErrors.dob;
                break;
            case "university":
                !value.trim()
                    ? (newErrors.university = "Trường đang học là bắt buộc")
                    : delete newErrors.university;
                break;
            case "majors":
                !value.trim()
                    ? (newErrors.majors = "Chuyên ngành là bắt buộc")
                    : delete newErrors.majors;
                break;
            case "student_year":
                !value
                    ? (newErrors.student_year = "Năm học là bắt buộc")
                    : delete newErrors.student_year;
                break;
            case "applied_department":
                !value
                    ? (newErrors.applied_department = "Ban ứng tuyển là bắt buộc")
                    : delete newErrors.applied_department;
                break;
        }
        setErrors(newErrors);
    };

    const handleInfoChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            information: { ...prev.information, [name]: value },
        }));
        validateField(name, value);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...formData.answers];
        newAnswers[index] = value;
        setFormData((prev) => ({ ...prev, answers: newAnswers }));

        const newErrors = { ...errors };
        if (value.trim()) delete newErrors[`question-${index}`];
        else newErrors[`question-${index}`] = `Câu hỏi ${index + 1} là bắt buộc`;
        setErrors(newErrors);
    };

    const handleClubQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= 300) setClubQuestion(value);
    };

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};
        const info = formData.information;

        if (!info.full_name.trim()) newErrors.full_name = "Họ và tên là bắt buộc";
        if (!info.student_code.trim()) newErrors.student_code = "Mã sinh viên là bắt buộc";
        if (!info.email.trim()) newErrors.email = "Email là bắt buộc";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) newErrors.email = "Email không hợp lệ";
        if (!info.phone_number.trim()) newErrors.phone_number = "Số điện thoại là bắt buộc";
        else if (!/^[0-9+\-\s()]+$/.test(info.phone_number)) newErrors.phone_number = "Số điện thoại không hợp lệ";
        if (!info.facebook_link.trim()) newErrors.facebook_link = "Link Facebook là bắt buộc";
        else if (!info.facebook_link.includes("facebook.com") && !info.facebook_link.includes("fb.com"))
            newErrors.facebook_link = "Link Facebook không hợp lệ";
        if (!info.dob) newErrors.dob = "Ngày sinh là bắt buộc";
        if (!info.university.trim()) newErrors.university = "Trường đang học là bắt buộc";
        if (!info.majors.trim()) newErrors.majors = "Chuyên ngành là bắt buộc";
        if (!info.student_year) newErrors.student_year = "Năm học là bắt buộc";
        if (!info.applied_department) newErrors.applied_department = "Ban ứng tuyển là bắt buộc";

        formData.answers.forEach((answer, index) => {
            if (!answer.trim())
                newErrors[`question-${index}`] = `Câu hỏi ${index + 1} là bắt buộc`;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            notify("Vui lòng điền đầy đủ thông tin và trả lời tất cả câu hỏi!", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                answers: [...formData.answers, clubQuestion],
            };
            await submitForm(payload);
            localStorage.removeItem("section3Data");
            setOpen(true);
            setFormData({
                information: {
                    full_name: "",
                    student_code: "",
                    gender: "Nam",
                    email: "",
                    phone_number: "",
                    facebook_link: "",
                    dob: "",
                    university: "",
                    majors: "",
                    student_year: "",
                    applied_department: "",
                },
                answers: Array(10).fill(""),
            });
            setClubQuestion("");
            setErrors({});
        } catch (res: any) {
            setErrFormReplicate(true);
            if(res.status === 409) {
                const errorMessage = res?.error || "Có lỗi xảy ra, vui lòng thử lại!";
                notify(errorMessage, "error");
            }
            else {
                notify("Có lỗi xảy ra, vui lòng thử lại!", "error");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const questions = questionsData.questions;
    const majors = majorsData;
    const getFieldError = (fieldName: string) => errors[fieldName];
    const hasFieldError = (fieldName: string) => !!errors[fieldName];

    return (
        <div className="relative py-8 px-4">
            <div>
                <h1 className="text-3xl font-bold text-center text-gdsc-primary-blue mb-4">
                    Đăng Ký Thành Viên
                </h1>
            </div>
            {/* Background decorative circles */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.img
                    src={circleBlue}
                    alt="blue circle"
                    className="absolute top-16 left-8 w-40 h-40 opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.img
                    src={circleRed}
                    alt="red circle"
                    className="absolute top-82 right-12 w-24 h-24 opacity-60"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />

                <motion.img
                    src={circleGreen}
                    alt="green circle"
                    className="absolute top-176 left-38 w-20 h-20 opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.img
                    src={circleYellow}
                    alt="yellow circle"
                    className="absolute bottom-92 left-28 w-16 h-16 opacity-50"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.img
                    src={circleGreen}
                    alt="green circle"
                    className="absolute bottom-16 right-40 w-32 h-32 opacity-65"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <div className="max-w-6xl mx-auto border-2 border-blue-500 p-8 rounded-2xl shadow-lg space-y-4 bg-white">
                {/* Personal Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Họ và tên: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.information.full_name}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${hasFieldError("full_name") ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {getFieldError("full_name") && (
                            <p className="text-red-500 text-xs">{getFieldError("full_name")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Mã sinh viên: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="student_code"
                            value={formData.information.student_code}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${hasFieldError("student_code") ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {getFieldError("student_code") && (
                            <p className="text-red-500 text-xs">{getFieldError("student_code")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Giới tính: <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="gender"
                            value={formData.information.gender}
                            onChange={handleInfoChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email cá nhân: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.information.email}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${hasFieldError("email") ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {getFieldError("email") && (
                            <p className="text-red-500 text-xs">{getFieldError("email")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Số điện thoại: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.information.phone_number}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${hasFieldError("phone_number") ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {getFieldError("phone_number") && (
                            <p className="text-red-500 text-xs">{getFieldError("phone_number")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Link Facebook: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="facebook_link"
                            value={formData.information.facebook_link}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${hasFieldError("facebook_link") ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {getFieldError("facebook_link") && (
                            <p className="text-red-500 text-xs">{getFieldError("facebook_link")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Ngày sinh: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.information.dob}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${hasFieldError("dob") ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {getFieldError("dob") && (
                            <p className="text-red-500 text-xs">{getFieldError("dob")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Trường đang học: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="university"
                            value={formData.information.university}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${hasFieldError("university") ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {getFieldError("university") && (
                            <p className="text-red-500 text-xs">{getFieldError("university")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Chuyên ngành: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="majors"
                            list="majors-list"
                            value={formData.information.majors}
                            onChange={handleInfoChange}
                            placeholder="Gõ để tìm chuyên ngành..."
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-400 ${hasFieldError("majors") ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"
                                }`}
                        />
                        <datalist id="majors-list">
                            {majors.map((m) => (
                                <option key={m.ma_nganh} value={m.ten_nganh} />
                            ))}
                        </datalist>
                        {getFieldError("majors") && (
                            <p className="text-red-500 text-xs">{getFieldError("majors")}</p>
                        )}
                    </div>


                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Bạn là sinh viên năm: <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="student_year"
                            value={formData.information.student_year}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white ${hasFieldError("student_year") ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Chọn</option>
                            <option value="Năm 1">Năm 1</option>
                            <option value="Năm 2">Năm 2</option>
                            <option value="Năm 3">Năm 3</option>
                            <option value="Năm 4">Năm 4</option>
                        </select>
                        {getFieldError("student_year") && (
                            <p className="text-red-500 text-xs">{getFieldError("student_year")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Ban ứng tuyển: <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="applied_department"
                            value={formData.information.applied_department}
                            onChange={handleInfoChange}
                            className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white ${hasFieldError("applied_department") ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Chọn</option>
                            <option value="TECH">Tech</option>
                            <option value="PR">NonTech - PR</option>
                            <option value="DES">NonTech - Design</option>
                            <option value="MEDIA">NonTech - Media</option>
                            <option value="HRLG">NonTech - HR-LG</option>
                        </select>
                        {getFieldError("applied_department") && (
                            <p className="text-red-500 text-xs">{getFieldError("applied_department")}</p>
                        )}
                    </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Câu hỏi khảo sát <span className="text-red-500">*</span>
                    </h3>
                    {questions.map((q, idx) => (
                        <div key={idx} className="space-y-3">
                            <p className="font-medium text-gdsc-primary-blue">
                                {idx + 1}. {q.question} <span className="text-red-500">*</span>
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {q.options.map((option, optIdx) => (
                                    <label
                                        key={optIdx}
                                        className="flex items-start gap-3 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${idx}`}
                                            value={String.fromCharCode(65 + optIdx)}
                                            checked={
                                                formData.answers[idx] ===
                                                String.fromCharCode(65 + optIdx)
                                            }
                                            onChange={() =>
                                                handleAnswerChange(
                                                    idx,
                                                    String.fromCharCode(65 + optIdx)
                                                )
                                            }
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                                        />
                                        <span className=" text-gray-700">
                                            {String.fromCharCode(65 + optIdx)}. {option}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {getFieldError(`question-${idx}`) && (
                                <p className="text-red-500 text-xs">{getFieldError(`question-${idx}`)}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Club Question Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Lý do bạn muốn trở thành member GDG on Campus: PTIT là gì ?:
                    </label>
                    <div className="relative">
                        <textarea
                            name="clubQuestion"
                            value={clubQuestion}
                            onChange={handleClubQuestionChange}
                            rows={4}
                            maxLength={300}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none pr-16"
                            placeholder="Nhập câu trả lời của bạn..."
                        />
                        <div className={`absolute bottom-3 right-3 text-xs font-medium ${clubQuestion.length >= 280 ? 'text-red-500' :
                            clubQuestion.length >= 250 ? 'text-orange-500' : 'text-gray-400'
                            }`}>
                            {clubQuestion.length}/300
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    {errFormReplicate && (
                        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 shadow-sm">
                            <AiOutlineWarning className="h-5 w-5 text-red-500" />
                            <p>
                                Có thể có lỗi xảy ra, vui lòng truy cập{" "}
                                <span
                                    className="underline font-medium hover:text-red-700 transition-colors cursor-pointer"
                                    onClick={() => navigate('/form-spare')}
                                >
                                    trang dự phòng
                                </span>
                                .
                            </p>
                        </div>
                    )}
                </div>
                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${isSubmitting
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Đang xử lý...
                            </>
                        ) : (
                            "Đăng ký ngay"
                        )}
                    </button>

                </div>

            </div>
            <SuccessPopup isOpen={open} onClose={() => setOpen(false)} />
            <NotYetPopup isOpen={showPopup} />
        </div>
    );
}