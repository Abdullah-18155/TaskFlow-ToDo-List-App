import { useEffect, useState } from "react";
import { getTheme, setTheme as saveTheme } from "../utils/storage";

export default function useTheme() {
    const [theme, setTheme] = useState(() => getTheme());

    function toggleTheme() {
        setTheme(currentTheme => {
            const newTheme =
                currentTheme === "dark" ? "light" : "dark";

            saveTheme(newTheme);

            return newTheme;
        });
    }

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return {
        theme,
        toggleTheme,
    };
}