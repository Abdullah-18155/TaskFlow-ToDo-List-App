import { formatDate, formatTime } from '../../utils/helpers'
import { categories } from '../../constants/categories'
import { BiPin, BiStar, BiEdit, BiTrash } from 'react-icons/bi';

export default function TaskCard({ task }) {
    const dueLabel = task.dueDate
        ? `${formatDate(task.dueDate)}${task.dueTime ? " · " + formatTime(task.dueTime) : ""}`
        : "";
    const category = categories.find(
        (category) => category.category.toLowerCase() === String(task.category || "").toLowerCase()
    );
    const Icon = category?.icon || null;
    const categoryLabel = category?.category || task.category || "General";
    return (
        <li
            className="group border-l-4 rounded-md
            transition-all
            duration-200
            hover:-translate-y-0.5
            shadow-sm hover:shadow-md"
            style={{
                borderColor: `var(--priority-${task.priority.toLowerCase()})`
            }}
        >
            <div className="flex flex-col sm:flex-row items-start gap-3 p-4
            border border-[var(--glass-border)]
            rounded-md bg-[var(--glass-bg-strong)]
            backdrop-blur-2xl
            ">
                <button className="ink-checkbox"
                    data-action="toggle"
                    role="checkbox"
                    aria-checked={task.completed}
                    aria-label={`Mark task ${task.completed ? "pending" : "completed"}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-md font-medium">{task.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">
                        {task.notes}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-2">
                        <span className={`badge capitalize bg-gradient-to-r ${category?.gradient || 'from-slate-500 to-slate-600'} opacity-75 text-black shadow-sm`}>
                            {Icon && <Icon className="w-4 h-4 mr-1" />}
                            {categoryLabel}
                        </span>
                        <span className={`badge badge-priority prio-${task.priority.toLowerCase()} capitalize`}>{task.priority}</span>
                        <span className="text-xs text-text-muted font-mono ml-auto" title="Last edited">{dueLabel}</span>
                    </div>
                </div>

                <div className="opacity-100 md:opacity-0 md:translate-x-1.5 group-hover:md:opacity-100 group-hover:md:translate-x-0 transition-all duration-200 ease-out
                    flex items-center gap-1 shrink-0 ">
                    <button className="icon-btn sm" data-action="favorite" aria-label="Toggle favorite" title={`${task.favorite ? "Remove from" : "Add to"} favorites`}>
                        <BiStar />
                    </button>
                    <button className="icon-btn sm" data-action="pin" aria-label="Toggle pin" title={`${task.pinned ? "Unpin" : "Pin to top"}`}>
                        <BiPin />
                    </button>
                    <button className="icon-btn sm" data-action="edit" aria-label="Edit task" title="Edit task">
                        <BiEdit />
                    </button>
                    <button className="icon-btn sm danger" data-action="delete" aria-label="Delete task" title="Delete task">
                        <BiTrash />
                    </button>
                </div>
            </div>
        </li>
    )
}
