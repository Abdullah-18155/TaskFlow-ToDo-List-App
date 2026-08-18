export default function KeyboardShortcutsModal({ isOpen, onClose }) {
    const shortcuts = [
        { keys: 'Enter', action: 'Add task / save edit' },
        { keys: 'Esc', action: 'Close dialog' },
        { keys: '/', action: 'Focus search' },
        { keys: 'N', action: 'Open new task' },
        { keys: 'Double-click', action: 'Edit a task' },
    ];

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm transition-all duration-300 ease-out"
            onMouseDown={onClose}
        >
            <div
                className="w-full max-w-lg flex flex-col gap-4 bg-[var(--glass-bg-strong)] backdrop-blur-3xl border border-[var(--glass-border)] px-5 py-4 rounded-lg m-2 shadow-2xl transition-all duration-300 ease-out"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display font-semibold text-lg">Keyboard shortcuts</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-black p-2.5 text-md text-black hover:text-red-500 hover:border-red-500 hover:bg-white/5 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="w-full h-px bg-gray-500/30" />

                <div className="space-y-2.5">
                    {shortcuts.map((shortcut) => (
                        <div
                            key={shortcut.keys}
                            className="flex items-center justify-between gap-3 rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-2"
                        >
                            <span className="text-sm text-text-secondary">{shortcut.action}</span>
                            <kbd className="rounded-md border border-[var(--glass-border)] bg-[var(--input-bg)] px-2 py-1 text-xs font-mono text-[var(--text-primary)] shadow-sm">
                                {shortcut.keys}
                            </kbd>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
