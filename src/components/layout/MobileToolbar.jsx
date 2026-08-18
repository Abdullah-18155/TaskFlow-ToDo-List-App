import React, { useEffect, useRef, useState } from 'react'
import Statistics from '../toolbars/Statistics'
import Search from '../toolbars/Search'
import Segment from '../toolbars/Segment'
import Categories from '../toolbars/Categories'
import Sorting from '../toolbars/Sorting'
import { BiDotsVertical } from 'react-icons/bi'

export default function MobileToolBar({ tasks, filters, setFilters, onDeleteCompleted, onDeleteAll }) {
    const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false)
    const bulkMenuRef = useRef(null)

    useEffect(() => {
        if (!isBulkMenuOpen) return

        const handleClickOutside = (event) => {
            if (bulkMenuRef.current && !bulkMenuRef.current.contains(event.target)) {
                setIsBulkMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isBulkMenuOpen])

    return (
        <div className="md:hidden px-4 py-4 space-y-4">
            {/* Statistics */}
            <Statistics tasks={tasks} />

            {/* Search */}
            <Search
                value={filters.search}
                onChange={(value) => setFilters((prev) => ({ ...prev, search: value }))}
            />

            {/* Filters */}
            <div className="flex items-center justify-between gap-2.5 flex-wrap">
                <Segment
                    filterStatus={filters.status}
                    setFilterStatus={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                />
                <Categories
                    value={filters.category}
                    onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                />
                <Sorting
                    value={filters.sort}
                    onChange={(value) => setFilters((prev) => ({ ...prev, sort: value }))}
                />

                <div className="relative" ref={bulkMenuRef}>
                    <button
                        id="bulkMenuBtn"
                        className="icon-btn sm"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isBulkMenuOpen}
                        title="Bulk actions"
                        aria-label="Bulk actions"
                        onClick={() => setIsBulkMenuOpen((prev) => !prev)}
                    >
                        <BiDotsVertical size={17} />
                    </button>
                    <div className={
                        `absolute right-0 top-[calc(100% + 6px)] min-w-47.5
                        bg-[var(--glass-bg-strong)] border border-[var(--glass-border)]
                        rounded-sm backdrop-blur-2xl shadow-[var(--glass-shadow)] p-1.5 z-20
                        animate-expand-in ${isBulkMenuOpen ? 'block' : 'hidden'}`
                    }
                        id="bulkMenu" role="menu">
                        <button
                            role="menuitem"
                            id="clearCompletedBtn"
                            type="button"
                            className='block w-full text-left bg-none border-none text-[var(--text-primary)] text-sm px-2.5 py-2 rounded-sm hover:bg-[var(--input-bg)]'
                            onClick={() => {
                                setIsBulkMenuOpen(false)
                                onDeleteCompleted?.()
                            }}
                        >Delete completed</button>
                        <button
                            role="menuitem"
                            id="clearAllBtn"
                            type="button"
                            className="block w-full text-left bg-none border-none text-accent-rose text-sm px-2.5 py-2 rounded-sm hover:bg-[var(--input-bg)]"
                            onClick={() => {
                                setIsBulkMenuOpen(false)
                                onDeleteAll?.()
                            }}
                        >Delete all tasks</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
