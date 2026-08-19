import React, { useEffect, useRef, useState } from 'react'
import Button from '../common/Button'
import { categories } from '../../constants/categories'
import ConfirmModal from './ConfirmModal'
import useConfirm from '../../hooks/useConfirm'

export default function AddTask({
    isOpen,
    setIsOpen,
    addTask,
    onSuccess,
    error
}) {
    const modalRef = useRef(null)
    const formDataRef = useRef(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'general',
        priority: 'medium',
        dueDate: '',
        dueTime: '',
    })

    // Keep ref in sync with state
    useEffect(() => {
        formDataRef.current = formData
    }, [formData])

    const {
        confirm,
        confirmState,
        handleConfirm,
        handleCancel,
    } = useConfirm()

    function hasFormData() {
        const current = formDataRef.current
        return Boolean(
            current?.title?.trim() ||
            current?.description?.trim()
        )
    }

    function resetForm() {
        setFormData({
            title: '',
            description: '',
            category: 'general',
            priority: 'medium',
            dueDate: '',
            dueTime: '',
        })
    }

    async function closeAddModal() {
        if (!hasFormData()) {
            resetForm()
            setIsOpen(false)
            return
        }

        const confirmed = await confirm(
            'Are you sure you want to close? Your entered data will be lost.'
        )

        if (confirmed) {
            resetForm()
            setIsOpen(false)
        }
    }

    function handleSubmitTask() {
        const current = formDataRef.current
        const title = current?.title?.trim()
        const description = current?.description?.trim()

        const result = addTask({
            title,
            notes: description,
            category: current?.category,
            priority: current?.priority,
            dueDate: current?.dueDate,
            dueTime: current?.dueTime,
        })

        if (!result.success) {
            error(result.error || 'Failed to add task. Please try again.')
            return
        }

        onSuccess?.()
        resetForm()
        setIsOpen(false)
    }

    function handleInputChange(field, value) {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    useEffect(() => {
        if (!isOpen) return

        resetForm()

        const focusTimer = window.setTimeout(() => {
            const titleInput = document.getElementById('taskInput')
            titleInput?.focus()
            titleInput?.select?.()
        }, 50)

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
            window.clearTimeout(focusTimer)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeAddModal()
            }
        }

        const handleEnter = (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                const target = event.target
                const isTextField = target && (
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.tagName === 'SELECT'
                )

                if (isTextField) {
                    event.preventDefault()
                    handleSubmitTask()
                }
            }
        }

        document.addEventListener('keydown', handleEscape)
        document.addEventListener('keydown', handleEnter)

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('keydown', handleEnter)
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
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="What needs doing?"
                            maxLength="120"
                            aria-label="New task title"
                        />

                        <div className="flex-1 w-full flex flex-row gap-1.5 justify-between items-center">
                            <span
                                className="font-mono text-sm text-text-muted"
                                id="charCount"
                            >
                                {formData.title.length}/120
                            </span>

                            <Button onClick={handleSubmitTask} id="taskSubmitBtn">
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
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                            >
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
                                value={formData.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
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
                                value={formData.dueDate}
                                onChange={(e) => handleInputChange('dueDate', e.target.value)}
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
                                value={formData.dueTime}
                                onChange={(e) => handleInputChange('dueTime', e.target.value)}
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
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
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