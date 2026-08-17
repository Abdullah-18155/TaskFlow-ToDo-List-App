import { useState } from "react";

export default function useConfirm() {
    const [confirmState, setConfirmState] = useState({
        isOpen: false,
        message: "",
    });

    const [resolvePromise, setResolvePromise] = useState(null);

    const confirm = (message) => {
        return new Promise((resolve) => {
            setResolvePromise(() => resolve);

            setConfirmState({
                isOpen: true,
                message,
            });
        });
    };

    const handleConfirm = () => {
        resolvePromise?.(true);

        setConfirmState({
            isOpen: false,
            message: "",
        });

        setResolvePromise(null);
    };

    const handleCancel = () => {
        resolvePromise?.(false);

        setConfirmState({
            isOpen: false,
            message: "",
        });

        setResolvePromise(null);
    };

    return {
        confirm,
        confirmState,
        handleConfirm,
        handleCancel,
    };
}