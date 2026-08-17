export const useTaskFilters = (tasks) => {
    const [filters, setFilters] = useState({
        search: "",
        status: "all", // all | active | completed
        category: "all",
        sort: "newest", // newest | oldest | az | za
    });

    const applyFilters = useCallback((taskList) => {
        let result = [...taskList];

        // Status filter
        if (filters.status === "active") result = result.filter((t) => !t.completed);
        if (filters.status === "completed") result = result.filter((t) => t.completed);

        // Category filter
        if (filters.category !== "all") {
            result = result.filter((t) => t.category === filters.category);
        }

        // Search
        if (filters.search.trim()) {
            const q = filters.search.trim().toLowerCase();
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(q) ||
                    (t.notes && t.notes.toLowerCase().includes(q))
            );
        }

        // Sorting
        switch (filters.sort) {
            case "oldest":
                result.sort((a, b) => a.createdAt - b.createdAt);
                break;
            case "az":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "za":
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "newest":
            default:
                result.sort((a, b) => b.createdAt - a.createdAt);
                break;
        }

        // Pinned always float to top
        result.sort((a, b) => (b.pinned === true) - (a.pinned === true));

        return result;
    }, [filters]);

    return { filters, setFilters, applyFilters };
};