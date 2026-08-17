export default function Button({
    children,
    className = "",
    fontSize = "text-sm",
    fontWeight = "font-medium",
    padding = "px-3 py-1.5 md:px-4 md:py-2",
    style = "primary",
    title,
    onClick
}) {
    let styles = "";

    switch (style) {
        case "primary":
            styles = `
                bg-[var(--accent-primary)]
                text-[var(--text-on-accent)]
                hover:bg-[var(--accent-primary-strong)]
            `;
            break;

        case "glass":
            styles = `
                border border-[var(--glass-border)]
                bg-[var(--glass-bg-strong)]
                text-[var(--text-primary)]
                backdrop-blur-md
                hover:bg-[var(--glass-bg)]
            `;
            break;

        case "danger":
            styles = `
                bg-[var(--accent-rose)]
                text-white
                hover:opacity-90
            `;
            break;

        default:
            styles = `
                bg-[var(--accent-primary)]
                text-[var(--text-on-accent)]
                hover:bg-[var(--accent-primary-strong)]
            `;
    }

    return (
        <button
            className={`
                inline-flex items-center justify-center gap-1
                ${padding}
                ${fontSize}
                ${fontWeight}
                rounded-[var(--radius-sm)]
                transition-all duration-[var(--dur-fast)]
                shadow
                hover:-translate-y-0.5 hover:shadow-md
                active:translate-y-0 active:shadow
                ${styles}
                ${className}
            `}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    );
}