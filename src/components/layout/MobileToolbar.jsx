import React from 'react'
import Statistics from '../toolbars/Statistics'
import Search from '../toolbars/Search'
import Segment from '../toolbars/Segment'
import Categories from '../toolbars/Categories'
import Sorting from '../toolbars/Sorting'
import { BiDotsVertical } from 'react-icons/bi'
import { categories } from '../../constants/categories'

export default function MobileToolBar() {
    return (
        <div className="md:hidden px-4 py-4 space-y-4">
            {/* Statistics */}
            <Statistics />

            {/* Search */}
            <Search />

            {/* Filters */}
            <div className="flex items-center justify-between gap-2.5 flex-wrap">
                <Segment />
                <Categories />
                <Sorting />

                <div class="relative">
                    <button id="bulkMenuBtn" className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-[var(--glass-border)] bg-[var(--glass-bg)] text-text-secondary transition-all duration-200 hover:text-[var(--text-primary)] hover:border-accent-primary hover:-translate-y-px active:translate-y-0" type="button" aria-haspopup="true" aria-expanded="false"
                        title="Bulk actions" aria-label="Bulk actions">
                        <BiDotsVertical size={17} />
                    </button>
                    <div className="hidden
                    absolute right-0 top-[calc(100% + 6px)] min-w-47.5
                    bg-[var(--glass-bg-strong)] border border-[var(--glass-border)]
                    rounded-sm backdrop-blur-2xl shadow-[var(--glass-shadow)] p-1.5 z-20
                    animate-expand-in"
                        id="bulkMenu" role="menu">
                        <button role="menuitem" id="clearCompletedBtn" type="button" className='block w-full text-left bg-none border-none text-[var(--text-primary)] text-sm px-2.5 py-2 rounded-sm hover:bg-[var(--input-bg)]'>Delete completed</button>
                        <button role="menuitem" id="clearAllBtn" type="button" className="block w-full text-left bg-none border-none text-accent-rose text-sm px-2.5 py-2 rounded-sm hover:bg-[var(--input-bg)]">Delete all
                            tasks</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
