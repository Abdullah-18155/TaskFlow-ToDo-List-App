import TaskCard from './TaskCard'

export default function TasksList({ tasks }) {
    // Sort tasks: pinned first, then by updatedAt
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return (
        <ul className="h-full min-h-0 flex-1 p-5 flex flex-col gap-4.5 overflow-y-auto scrollbar scrollbar-right pr-5">
            {sortedTasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                />
            ))}
        </ul>
    )
}