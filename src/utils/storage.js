const KEYS = {
    TASKS: "taskflow.tasks",
    THEME: "taskflow.theme"
};

const memoryFallback = {};

let localStorageAvailable = false;

try {
    if (typeof window !== "undefined" && window.localStorage) {
        const testKey = "__taskflow_test__";

        window.localStorage.setItem(testKey, "1");
        window.localStorage.removeItem(testKey);

        localStorageAvailable = true;
    }
} catch (e) {
    console.warn(
        "localStorage unavailable, using in-memory storage for this session."
    );
}

function get(key, fallback = null) {
    try {
        if (!localStorageAvailable) {
            return memoryFallback[key] ?? fallback;
        }

        const raw = window.localStorage.getItem(key);

        if (raw === null) {
            return fallback;
        }

        return JSON.parse(raw);
    } catch (e) {
        console.error(`Storage.get failed for "${key}"`, e);

        // Remove corrupted data if possible
        try {
            window.localStorage.removeItem(key);
        } catch {
            // Ignore cleanup failure
        }

        return fallback;
    }
}

function set(key, value) {
    try {
        if (!localStorageAvailable) {
            memoryFallback[key] = value;
            return true;
        }

        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error(`Storage.set failed for "${key}"`, e);

        // Fall back to memory storage
        localStorageAvailable = false;
        memoryFallback[key] = value;

        return true;
    }
}

export function getTasks() {
    return get(KEYS.TASKS, []);
}

export function setTasks(tasks) {
    return set(KEYS.TASKS, tasks);
}

export function getTheme() {
    return get(KEYS.THEME, "dark");
}

export function setTheme(theme) {
    return set(KEYS.THEME, theme);
}

export default function storage() {
    return {
        getTasks,
        setTasks,
        getTheme,
        setTheme
    };
}