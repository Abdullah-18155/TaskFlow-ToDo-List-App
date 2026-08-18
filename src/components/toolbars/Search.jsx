import { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { debounce } from "../../utils/helpers";

export default function Search({ value = "", onChange }) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const debouncedOnChange = useMemo(
        () => debounce((nextValue) => onChange?.(nextValue), 250),
        [onChange]
    );

    const handleChange = (event) => {
        const nextValue = event.target.value;
        setInputValue(nextValue);
        debouncedOnChange(nextValue);
    };

    return (
        <div className="relative w-full md:w-75 lg:w-88">
            <BiSearch
                size={19}
                className="
                    absolute
                    left-3
                    top-1/2
                    z-10
                    -translate-y-1/2
                    pointer-events-none
                    text-[var(--text-muted)]
                "
            />

            <input
                type="search"
                id="searchInput"
                placeholder="Search tasks..."
                aria-label="Search tasks"
                value={inputValue}
                onChange={handleChange}
                className="
                    w-full
                    md:w-[80%]
                    lg:w-full
                    h-10
                    !pl-10
                    !pr-4
                    rounded-[var(--radius-md)]
                    border border-[var(--input-border)]
                    bg-[var(--input-bg)]
                    text-sm
                    text-[var(--text-primary)]
                    placeholder:text-[var(--text-muted)]
                    backdrop-blur-md
                    outline-none
                    transition-all
                    duration-[var(--dur-fast)]
                    focus:border-[var(--input-border-focus)]
                    focus:bg-[var(--glass-bg-strong)]
                "
            />
        </div>
    );
}