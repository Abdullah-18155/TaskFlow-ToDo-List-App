import React from 'react'

export default function Statistics({ tasks = [] }) {
    const total = tasks.length;
    const done = tasks.filter((task) => task.completed).length;
    const pending = total - done;
    const highPriority = tasks.filter((task) => task.priority?.toLowerCase() === 'high').length;
    const completion = total ? Math.round((done / total) * 100) : 0;

    const statsDisplay = [
        { value: total, label: "total" },
        { value: pending, label: "pending" },
        { value: done, label: "done" },
        { value: highPriority, label: "high priority" }
    ];

    return (
        <section
            className="flex flex-col items-center gap-1.5 w-full
                    px-4 py-2.5 rounded-md
                    bg-[var(--glass-bg-strong)]
                    border border-[var(--glass-border)]
                    backdrop-blur-[2px] shadow"
            aria-label="Task statistics">
            <div className="flex flex-row gap-3.5 overflow-x-auto scrollbar scrollbar-bottom w-full">
                {statsDisplay.map((stat, i) => (
                    <div key={stat.label} className={`flex flex-col items-start gap-0.5 whitespace-nowrap border-[var(--divider)] ${i !== (statsDisplay.length - 1) ? 'border-r pr-3.5' : ''}`}>
                        <span className="font-mono text-lg font-medium tracking-tight">{stat.value}</span>
                        <span className="text-xs text-text-secondary uppercase tracking-wide">{stat.label}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-[var(--sp-3)] shrink-0 w-full">
                <div className="flex-1 h-2 rounded-pill bg-[var(--input-bg)] overflow-hidden" role="progressbar" aria-label="Completion percentage"
                    aria-valuemin="0" aria-valuemax="100" aria-valuenow={completion} id="progressBar">
                    <div
                        className="h-full rounded-pill transition-all duration-500 ease-out"
                        id="progressFill"
                        style={{
                            width: `${completion}%`,
                            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-mint))'
                        }}
                    ></div>
                </div>
                <span className="font-mono text-sm text-text-secondary" id="progressPct">{completion}%</span>
            </div>
        </section>
    )
}
