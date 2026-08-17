import { categories } from "../../constants/categories"

export default function Categories() {
    return (
        <select
            className="md:w-full"
            id="categoryFilter"
            aria-label="Filter by category"
        >
            <option value="all">All categories</option>
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