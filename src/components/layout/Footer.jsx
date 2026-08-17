export default function Footer() {
    return (
        <footer className="w-full mx-auto max-w-7xl border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow">
            <div className="px-8 py-5 sm:py-2.5 flex flex-col-reverse sm:flex-row items-center justify-between gap-5 text-xs text-text-muted">
                <p className="text-xs text-text-muted">
                    💖 Developed By Abdullah Abid (<a href="#" className="link-btn" target="_blank" rel="noopener noreferrer">Visit Portfolio</a>)
                </p>
                <button id="shortcutsBtn" className="link-btn" type="button">Keyboard shortcuts</button>
            </div>
        </footer>
    )
}
