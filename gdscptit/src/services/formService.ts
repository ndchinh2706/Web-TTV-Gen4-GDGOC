import type { FormData } from "@/types/form";
const API = import.meta.env.VITE_API_URL;
export async function submitForm(payload: FormData) {
    const res = await fetch(`${API}/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        return Promise.reject(await res.json());
    }

    return await res.json();
}

