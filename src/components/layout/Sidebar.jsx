import Statistics from "../toolbars/Statistics";
import Segment from "../toolbars/Segment";
import Categories from "../toolbars/Categories";
import Sorting from "../toolbars/Sorting";
import DeleteTasks from "../toolbars/DeleteTasks";

export default function Sidebar({ tasks, filters, setFilters, onDeleteCompleted, onDeleteAll }) {
    return (
        <aside className='hidden md:block w-[370px] border-r border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl shadow-sm scrollbar scrollbar-left'>
            <div className="px-3.5 py-4 flex flex-col items-center gap-4 overflow-hidden inset-shadow-2xs">
                {/* Statistics */}
                <Statistics tasks={tasks} />


                {/* Filters Toolbar */}
                <section className="flex flex-col gap-3.5 w-full">
                    {/* Segmented Filters */}
                    <Segment
                        filterStatus={filters.status}
                        setFilterStatus={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                    />

                    {/* Categories Filter */}
                    <div>
                        <h3 className="mb-1 text-sm font-medium font-body text-text-muted">Select Category</h3>
                        <Categories
                            value={filters.category}
                            onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                        />
                    </div>

                    {/* Sort */}
                    <div>
                        <h3 className="mb-1 text-sm font-medium font-body text-text-muted">Sort By</h3>
                        <Sorting
                            value={filters.sort}
                            onChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))}
                        />
                    </div>

                    <div>
                        <h3 className="mb-1 text-sm font-medium font-body text-text-muted">Delete Tasks</h3>
                        <DeleteTasks
                            onDeleteCompleted={onDeleteCompleted}
                            onDeleteAll={onDeleteAll}
                        />
                    </div>

                </section>
            </div>
        </aside>
    )
}