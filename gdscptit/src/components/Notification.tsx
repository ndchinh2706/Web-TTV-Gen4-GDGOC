// Notification.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { motion, AnimatePresence } from "framer-motion";

type NotificationType = "success" | "error" | "info";

interface Notification {
  id: number;
  message: string;
  type?: NotificationType;
}

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, type: NotificationType = "info") => {
    const id = Date.now();
    setNotifications((prev) => [{ id, message, type }, ...prev]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000); // auto-hide sau 3s
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 left-0 right-0 flex flex-col items-center gap-2 z-[9999]">
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ y: -50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`px-4 py-2 rounded-2xl shadow-lg text-gray-700 max-w-lg text-center
                ${type === "success" ? "bg-green-200 border-1 border-gdsc-primary-green" : ""}
                ${type === "error" ? "bg-red-200 border-1  border-gdsc-primary-red" : ""}
                ${type === "info" ? "bg-blue-200 border-1  border-gdsc-primary-blue" : ""}`}
            >
              {message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
