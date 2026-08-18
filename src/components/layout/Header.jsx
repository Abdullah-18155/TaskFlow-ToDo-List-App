import useTheme from '../../hooks/useTheme';
import Button from '../common/Button';
import Search from '../toolbars/Search';
import logo from '/icon.png'

import { BiMoon, BiPlus } from 'react-icons/bi';
import { CgSun } from 'react-icons/cg';

export default function Header({ setIsOpenAdd, searchValue = '', onSearchChange }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="w-full mx-auto max-w-7xl border-b border-[var(--glass-border)] bg-[var(--glass-bg-strong)] backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between gap-6 px-3 py-1 md:px-5 md:py-1.5">

                {/* Logo & Brand */}
                <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
                    <div className="flex h-12 w-12 md:w-14 md:h-14 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[var(--glass-bg-strong)]">
                        <img
                            src={logo}
                            alt="TaskFlow Logo"
                            className="h-full w-full object-cover shadow-[var(--icon-shadow)] rounded-[var(--radius-md)] border border-[var(--glass-border)]"
                        />
                    </div>

                    <div>
                        <h2 className="font-display text-lg lg:text-xl font-semibold leading-none text-[var(--text-primary)] -tracking-tight">
                            TaskFlow
                        </h2>

                        <p className="text-xs leading-tight text-[var(--text-secondary)] font-display italic hidden md:block">
                            Organize Today. Achieve Tomorrow.
                        </p>
                    </div>
                </div>

                {/* Search - visible on mobile and desktop */}
                <div className="hidden flex-1 md:flex md:justify-center px-2 md:px-0 items-center">
                    <Search value={searchValue} onChange={onSearchChange} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button className="group px-3 hover:px-4" title="Add New Task" onClick={() => setIsOpenAdd(true)}>
                        <BiPlus
                            size={20}
                            className="shrink-0"
                        />

                        <span className="hidden md:block max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-20 group-hover:opacity-100">
                            New Task
                        </span>
                    </Button>

                    <Button style='glass' title="Toggle Theme" onClick={toggleTheme}>
                        {theme === "dark" ? <CgSun size={19} /> : <BiMoon size={19} />}
                    </Button>
                </div>

            </div>
        </header>
    );
}