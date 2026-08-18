import { GiBroom } from "react-icons/gi";
import Button from "../common/Button";
import { BsTrash } from "react-icons/bs";

export default function DeleteTasks({ onDeleteCompleted, onDeleteAll }) {

    return (
        <>
            <div className="flex items-center gap-2 w-full">
                <Button
                    style="glass"
                    className="flex-1"
                    title="Delete Completed Tasks"
                    onClick={onDeleteCompleted}
                >
                    <GiBroom size={18} />
                    Delete Completed
                </Button>

                <Button
                    style='danger'
                    className="flex-1"
                    title="Delete All Tasks"
                    onClick={onDeleteAll}
                >
                    <BsTrash size={16} />
                    Delete All Tasks
                </Button>
            </div>
        </>
    )
}
