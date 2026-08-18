import TaskCard from './TaskCard'

export default function TasksList({ tasks, toggleComplete, toggleFavorite, togglePinned, onDeleteTask, onEdit }) {
    return (
        <ul className="h-full min-h-0 flex-1 p-5 flex flex-col gap-4.5 overflow-y-auto scrollbar scrollbar-right pr-5">
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    toggleComplete={toggleComplete}
                    toggleFavorite={toggleFavorite}
                    togglePinned={togglePinned}
                    onDeleteTask={onDeleteTask}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    )
}