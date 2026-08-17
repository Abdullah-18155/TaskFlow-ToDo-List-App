export default function Sorting() {
    return (
        <select
            className="md:w-full"
            id="sortSelect"
            aria-label="Sort tasks"
        >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
        </select>
    )
}
