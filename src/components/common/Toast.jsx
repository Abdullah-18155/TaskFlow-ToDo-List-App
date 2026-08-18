import { useEffect } from "react";

const Toast = ({ id, message, type = "info", duration = 3000, onClose }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return {
                    bg: "bg-emerald-500/20",
                    border: "border-emerald-500/30",
                    icon: "✓",
                    iconColor: "text-emerald-400",
                };
            case "error":
                return {
                    bg: "bg-red-500/20",
                    border: "border-red-500/30",
                    icon: "✕",
                    iconColor: "text-red-400",
                };
            case "warning":
                return {
                    bg: "bg-amber-500/20",
                    border: "border-amber-500/30",
                    icon: "⚠",
                    iconColor: "text-amber-400",
                };
            default:
                return {
                    bg: "bg-blue-500/20",
                    border: "border-blue-500/30",
                    icon: "ℹ",
                    iconColor: "text-blue-400",
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div
            className={`
                animate-in slide-in-from-right-96 fade-in duration-300
                w-full max-w-sm
                flex gap-3 items-center
                bg-[var(--glass-bg-strong)]
                backdrop-blur-3xl
                border ${styles.border}
                ${styles.bg}
                px-3 py-2
                rounded-md
                shadow-2xl
                transition-all duration-300 ease-out
                pointer-events-auto
            `}
        >
            <div className={`flex-shrink-0 text-lg font-bold ${styles.iconColor}`}>
                {styles.icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary break-words">
                    {message}
                </p>
            </div>
            <button
                onClick={() => onClose(id)}
                className="
                    flex-shrink-0 text-text-secondary hover:text-text-primary
                    transition-colors duration-200
                "
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;
