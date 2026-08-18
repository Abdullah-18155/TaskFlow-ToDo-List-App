import Toast from "./Toast";

const ToastContainer = ({ toasts, onClose }) => {
    return (
        <div
            className="
                fixed bottom-6 right-6 z-[var(--z-toast)]
                flex flex-col gap-3
                pointer-events-none
            "
        >
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={onClose}
                    />
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
