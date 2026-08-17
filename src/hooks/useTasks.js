import { useEffect, useState } from "react";
import { setTasks as saveTasks, getTasks } from "../utils/storage";

export default function useTasks() {

    const [tasks, setTasks] = useState(() => getTasks());

    // Save tasks whenever tasks change
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    // Add task
    function addTask({
        title,
        notes = "",
        category,
        priority,
        dueDate = "",
        dueTime = "",
    }) {
        // Validate required fields
        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof category !== "string" ||
            !category.trim() ||
            typeof priority !== "string" ||
            !priority.trim()
        ) {
            return {
                success: false,
                task: null,
                error: "Title, category and priority are required.",
            };
        }

        // Clean inputs
        const cleanTitle = title.trim();

        const cleanNotes =
            typeof notes === "string"
                ? notes.trim()
                : "";

        if (category.toLowerCase() === "all") category = "general";
        const cleanCategory = category
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");

        const cleanPriority = priority
            .trim()
            .toLowerCase();

        const cleanDueDate =
            typeof dueDate === "string"
                ? dueDate.trim()
                : "";

        const cleanDueTime =
            typeof dueTime === "string"
                ? dueTime.trim()
                : "";

        // Timestamp
        const now = new Date().toISOString();

        // New task
        const newTask = {
            id: crypto.randomUUID(),

            title: cleanTitle,
            notes: cleanNotes,

            category: cleanCategory,
            priority: cleanPriority,

            dueDate: cleanDueDate,
            dueTime: cleanDueTime,

            completed: false,
            favorite: false,
            pinned: false,

            createdAt: now,
            updatedAt: now,
        };

        // Add task
        setTasks((currentTasks) => [
            ...currentTasks,
            newTask,
        ]);

        return {
            success: true,
            task: newTask,
            error: null,
        };
    }

    // Update task
    function updateTask(id, updates = {}) {
        if (!id || !updates || typeof updates !== "object") {
            return {
                success: false,
                task: null,
                error: "Invalid task update.",
            };
        }

        const existingTask = tasks.find((task) => task.id === id);

        if (!existingTask) {
            return {
                success: false,
                task: null,
                error: "Task not found.",
            };
        }

        const updatedTask = {
            ...existingTask,
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id ? updatedTask : task
            )
        );

        return {
            success: true,
            task: updatedTask,
            error: null,
        };
    }


    // Delete task
    function deleteTask(id) {
        if (!id) {
            return {
                success: false,
                error: "Task ID is required.",
            };
        }

        const existingTask = tasks.find((task) => task.id === id);

        if (!existingTask) {
            return {
                success: false,
                error: "Task not found.",
            };
        }

        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );

        return {
            success: true,
            task: existingTask,
            error: null,
        };
    }


    // Delete completed tasks
    function deleteCompletedTasks() {
        const completedTasks = tasks.filter((task) => task.completed);

        if (completedTasks.length === 0) {
            return {
                success: false,
                deletedCount: 0,
                error: "No completed tasks found.",
            };
        }

        setTasks((currentTasks) =>
            currentTasks.filter((task) => !task.completed)
        );

        return {
            success: true,
            deletedCount: completedTasks.length,
            error: null,
        };
    }

    // Toggle completed
    function toggleComplete(id) {
        if (!id) return false;

        const taskExists = tasks.some((task) => task.id === id);

        if (!taskExists) return false;

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                        updatedAt: new Date().toISOString(),
                    }
                    : task
            )
        );

        return true;
    }

    // Toggle favorite
    function toggleFavorite(id) {
        if (!id) return false;

        const taskExists = tasks.some((task) => task.id === id);

        if (!taskExists) return false;

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        favorite: !task.favorite,
                        updatedAt: new Date().toISOString(),
                    }
                    : task
            )
        );

        return true;
    }

    // Toggle pinned
    function togglePinned(id) {
        if (!id) return false;

        const taskExists = tasks.some((task) => task.id === id);

        if (!taskExists) return false;

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        pinned: !task.pinned,
                        updatedAt: new Date().toISOString(),
                    }
                    : task
            )
        );

        return true;
    }

    // Get task by ID
    function getTaskById(id) {
        if (!id) return null;

        return tasks.find((task) => task.id === id) ?? null;
    }

    // Clear all tasks
    function clearTasks() {
        setTasks([]);
        return true;
    }

    // Return hook API
    return {
        tasks,
        setTasks,

        addTask,
        updateTask,
        deleteTask,
        deleteCompletedTasks,

        toggleComplete,
        toggleFavorite,
        togglePinned,

        getTaskById,
        clearTasks,
    };
}