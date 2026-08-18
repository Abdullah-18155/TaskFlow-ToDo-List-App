import { useState, useCallback } from "react";

export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 3000) => {
        const id = Date.now();
        const newToast = { id, message, type, duration };

        setToasts((prev) => [...prev, newToast]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const clearAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    const success = useCallback(
        (message, duration = 3000) =>
            addToast(message, "success", duration),
        [addToast]
    );

    const error = useCallback(
        (message, duration = 3000) =>
            addToast(message, "error", duration),
        [addToast]
    );

    const warning = useCallback(
        (message, duration = 3000) =>
            addToast(message, "warning", duration),
        [addToast]
    );

    const info = useCallback(
        (message, duration = 3000) =>
            addToast(message, "info", duration),
        [addToast]
    );

    return {
        toasts,
        addToast,
        removeToast,
        clearAllToasts,
        success,
        error,
        warning,
        info,
    };
};

export default useToast;
