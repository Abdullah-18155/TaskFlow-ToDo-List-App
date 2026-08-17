import { useEffect } from "react";

export default function ConfirmModal({
    isOpen,
    message,
    onConfirm,
    onCancel,
}) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onCancel();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="
                fixed inset-0 z-50
                flex justify-center items-center
                backdrop-blur-sm bg-gray-900/70
                transition-all duration-300 ease-out
            "
            onMouseDown={onCancel}
        >
            <div
                className="
                    w-full max-w-md
                    flex flex-col gap-3
                    bg-[var(--glass-bg-strong)]
                    backdrop-blur-3xl
                    border border-[var(--glass-border)]
                    px-5 py-4
                    rounded-lg
                    m-2
                    shadow-2xl
                    transition-all duration-300 ease-out
                "
                onMouseDown={(e) => e.stopPropagation()}
            >
                <h2 className="font-display font-semibold text-lg">
                    Confirmation
                </h2>

                <p className="text-sm text-text-secondary">
                    {message}
                </p>

                <div className="w-full h-px bg-gray-500/30"></div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="
                            px-4 py-2
                            rounded-md
                            border border-[var(--glass-border)]
                            text-text-secondary
                            hover:bg-white/5
                            transition-colors
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="
                            px-4 py-2
                            rounded-md
                            bg-red-500/80
                            text-white
                            hover:bg-red-500
                            transition-colors
                        "
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}