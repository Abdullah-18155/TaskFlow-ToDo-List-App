const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
];

export default function Segement({ filterStatus = "all", setFilterStatus }) {
    return (
        <div
            className="grid grid-cols-3 bg-[var(--input-bg)]
                    border border-[var(--input-border)]
                    rounded-pill p-1 gap-1 backdrop-blur-[2px] md:w-full"
            role="tablist"
            aria-label="Filter tasks"
            id="filterSegmented">

            {filters.map(filter => {
                const isActive = filterStatus === filter.value;

                return (
                    <button key={filter.value}
                        className={`${isActive ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)]' : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
                            text-sm text-[var(--font-body)] px-3 py-1.5
                            rounded-pill transition-all duration-[var(--dur-fast)]
                            `}
                        role="tab"
                        aria-selected={isActive}
                        data-filter={filter.value}
                        type="button"
                        onClick={() => setFilterStatus?.(filter.value)}
                    >{filter.label}</button>
                );
            })}
        </div>
    )
}
