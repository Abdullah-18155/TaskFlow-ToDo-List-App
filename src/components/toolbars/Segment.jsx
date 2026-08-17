const filters = [
    { label: "All", value: "all", isActive: true },
    { label: "Active", value: "active", isActive: false },
    { label: "Completed", value: "completed", isActive: false },
];

export default function Segement({ filterStatus, setFilterStatus }) {
    return (
        <div
            className="grid grid-cols-3 bg-[var(--input-bg)]
                    border border-[var(--input-border)]
                    rounded-pill p-1 gap-1 backdrop-blur-[2px] md:w-full"
            role="tablist"
            aria-label="Filter tasks"
            id="filterSegmented">

            {filters.map(filter => (
                <button key={filter.value}
                    className={`${filter.isActive ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)]' : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                        text-sm text-[var(--font-body)] px-3 py-1.5
                        rounded-pill transition-all duration-[var(--dur-fast)]
                        `}
                    role="tab"
                    aria-selected={filter.isActive}
                    data-filter={filter.value}
                    type="button">{filter.label}</button>
            ))}
        </div>
    )
}
