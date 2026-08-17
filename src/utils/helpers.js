export const generateId = () => `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-").map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

export const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m);
    return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
};

export const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
};

export const isOverdue = (dueDate, dueTime, completed) => {
    if (!dueDate || completed) return false;
    const due = new Date(`${dueDate}T${dueTime || "23:59"}`);
    return due.getTime() < Date.now();
};

export const truncate = (str, max = 60) => {
    if (!str) return "";
    return str.length > max ? `${str.slice(0, max - 1)}…` : str;
};

export const debounce = (fn, delay = 250) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};