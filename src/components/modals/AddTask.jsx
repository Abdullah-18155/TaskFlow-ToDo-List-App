import React, { useEffect, useRef } from 'react'
import Button from '../common/Button'
import { categories } from '../../constants/categories'
import ConfirmModal from './ConfirmModal'
import useConfirm from '../../hooks/useConfirm'

export default function AddTask({
    isOpen,
    setIsOpen,
    addTask,
}) {
    const modalRef = useRef(null)

    const inputRefs = {
        title: useRef(null),
        description: useRef(null),
        category: useRef(null),
        priority: useRef(null),
        dueDate: useRef(null),
        dueTime: useRef(null),
    }

    const {
        confirm,
        confirmState,
        handleConfirm,
        handleCancel,
    } = useConfirm()

    // --------------------------------
    // Check whether user entered data
    // --------------------------------
    function hasFormData() {
        const {
            title,
            description,
            dueDate,
            dueTime,
        } = inputRefs

        return Boolean(
            title.current?.value.trim() ||
            description.current?.value.trim() ||
            dueDate.current?.value ||
            dueTime.current?.value
        )
    }

    // --------------------------------
    // Reset form
    // --------------------------------
    function resetForm() {
        inputRefs.title.current.value = ''
        inputRefs.description.current.value = ''
        inputRefs.category.current.value = 'all'
        inputRefs.priority.current.value = 'medium'
        inputRefs.dueDate.current.value = ''
        inputRefs.dueTime.current.value = ''
    }

    // --------------------------------
    // Close modal
    // --------------------------------
    async function closeAddModal() {
        // Nothing entered → close directly
        if (!hasFormData()) {
            resetForm()
            setIsOpen(false)
            return
        }

        // Something entered → ask confirmation
        const confirmed = await confirm(
            'Are you sure you want to close? Your entered data will be lost.'
        )

        if (confirmed) {
            resetForm()
            setIsOpen(false)
        }
    }

    // --------------------------------
    // Add task
    // --------------------------------
    function handleAddTask() {
        const title = inputRefs.title.current?.value.trim()
        const description = inputRefs.description.current?.value.trim()
        const category = inputRefs.category.current?.value
        const priority = inputRefs.priority.current?.value
        const dueDate = inputRefs.dueDate.current?.value
        const dueTime = inputRefs.dueTime.current?.value

        const result = addTask({
            title,
            notes: description,
            category,
            priority,
            dueDate,
            dueTime,
        })

        if (!result.success) {
            console.error(result.error)
            return
        }

        // Successfully added
        resetForm()
        setIsOpen(false)
    }

    // --------------------------------
    // Outside click
    // --------------------------------
    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target)
            ) {
                closeAddModal()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            )
        }
    }, [isOpen])

    // --------------------------------
    // Escape key
    // --------------------------------
    useEffect(() => {
        if (!isOpen) return

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeAddModal()
            }
        }

        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener(
                'keydown',
                handleEscape
            )
        }
    }, [isOpen])

    return (
        <>
            {/* Add Task Modal */}
            <div
                className={`
                    fixed inset-0 z-30
                    flex justify-center items-center
                    backdrop-blur-sm bg-gray-900/70
                    transition-all duration-300 ease-out
                    ${isOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                    }
                `}
            >
                <div
                    ref={modalRef}
                    className={`
                        max-w-2xl
                        flex flex-col gap-2.5 items-center
                        bg-[var(--glass-bg-strong)]
                        backdrop-blur-3xl
                        border border-[var(--glass-border)]
                        px-4 py-3
                        rounded-lg
                        m-2
                        shadow-2xl
                        transition-all duration-300 ease-out
                        ${isOpen
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-4'
                        }
                    `}
                >
                    <h2 className="font-display font-semibold text-lg">
                        Add New Task
                    </h2>

                    {/* Title */}
                    <div className="w-full flex flex-col gap-2.5 sm:flex-row justify-between">
                        <input
                            type="text"
                            id="taskInput"
                            className="flex-3 min-w-75 w-full"
                            ref={inputRefs.title}
                            placeholder="What needs doing?"
                            maxLength="120"
                            aria-label="New task title"
                        />

                        <div className="flex-1 w-full flex flex-row gap-1.5 justify-between items-center">
                            <span
                                className="font-mono text-sm text-text-muted"
                                id="charCount"
                            >
                                0/120
                            </span>

                            <Button onClick={handleAddTask}>
                                Add task
                            </Button>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-500/30" />

                    {/* Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">

                        {/* Category */}
                        <div className="flex flex-col gap-0.5">
                            <label
                                className="text-sm text-text-secondary uppercase tracking-wider"
                                htmlFor="categoryDropDown"
                            >
                                Category
                            </label>

                            <select
                                className="md:w-full"
                                id="categoryDropDown"
                                aria-label="Select a category"
                                defaultValue="all"
                                ref={inputRefs.category}
                            >
                                <option value="all">
                                    All categories
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.category}
                                        value={category.category
                                            .toLowerCase()
                                            .replace(/\s+/g, '-')}
                                    >
                                        {category.category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Priority */}
                        <div className="flex flex-col gap-0.5">
                            <label
                                className="text-sm text-text-secondary uppercase tracking-wider"
                                htmlFor="priorityDropdown"
                            >
                                Priority
                            </label>

                            <select
                                className="md:w-full"
                                id="priorityDropdown"
                                aria-label="Select priority"
                                defaultValue="medium"
                                ref={inputRefs.priority}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div className="flex flex-col gap-0.5">
                            <label
                                htmlFor="taskDueDate"
                                className="text-sm text-text-secondary uppercase tracking-wider"
                            >
                                Due Date
                            </label>

                            <input
                                type="date"
                                id="taskDueDate"
                                ref={inputRefs.dueDate}
                            />
                        </div>

                        {/* Due Time */}
                        <div className="flex flex-col gap-0.5">
                            <label
                                htmlFor="taskDueTime"
                                className="text-sm text-text-secondary uppercase tracking-wider"
                            >
                                Due time
                            </label>

                            <input
                                type="time"
                                id="taskDueTime"
                                ref={inputRefs.dueTime}
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col w-full gap-0.5">
                        <label
                            htmlFor="taskNotes"
                            className="text-sm text-text-secondary uppercase tracking-wider"
                        >
                            Notes
                        </label>

                        <input
                            type="text"
                            id="taskNotes"
                            className="w-full min-w-75"
                            ref={inputRefs.description}
                            placeholder="Add some notes..."
                            maxLength="120"
                            aria-label="Task notes"
                        />
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmState.isOpen}
                message={confirmState.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    )
}