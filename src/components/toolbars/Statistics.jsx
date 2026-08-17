import React, { useMemo } from 'react'

export default function Statistics() {

    const statsDisplay = [
        { value: 0, label: "total" },
        { value: 0, label: "pending" },
        { value: 0, label: "done" },
        { value: 0, label: "high priority" }
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
                    aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="progressBar">
                    <div
                        className="h-full rounded-pill bg-[linear-gradient(90deg, var(--accent-primary), var(--accent-mint))] transition-all duration-500 ease-out"
                        id="progressFill"
                    ></div>
                </div>
                <span className="font-mono text-sm text-text-secondary" id="progressPct">0%</span>
            </div>
        </section>
    )
}
