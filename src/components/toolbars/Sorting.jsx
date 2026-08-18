export default function Sorting({ value = "newest", onChange }) {
    return (
        <select
            className="md:w-full"
            id="sortSelect"
            aria-label="Sort tasks"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
        >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
        </select>
    )
}
