import { BiPlus } from "react-icons/bi";
import Button from "../common/Button";

export default function EmptyState({ openAdd }) {
    return (
        <div id="emptyState" className="flex flex-col items-center px-5 py-8">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" className="text-text-muted mb-1.5 animate-float-y">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <h2 id="emptyStateTitle" className="font-display font-semibold m-0 text-[var(--text-primary)] text-lg mb-2.5">Nothing on the TaskFlow yet</h2>
            <Button onClick={openAdd}><BiPlus size={18} /> Add New Task</Button>
        </div>
    )
}
