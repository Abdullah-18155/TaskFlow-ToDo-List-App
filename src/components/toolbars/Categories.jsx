import { categories } from "../../constants/categories"

export default function Categories({ value = "all", onChange }) {
    return (
        <select
            className="md:w-full text-text-primary"
            id="categoryFilter"
            aria-label="Filter by category"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
        >
            <option value="all">All</option>
            {categories.map(category => (
                <option
                    key={category.category}
                    value={category.category.toLowerCase().replace(/\s+/g, "-")}
                >
                    {category.category}
                </option>
            ))}
        </select>
    )
}