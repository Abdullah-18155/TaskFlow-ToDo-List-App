import React, { useEffect, useRef, useState } from 'react'
import Button from '../common/Button'
import { categories } from '../../constants/categories'
import ConfirmModal from './ConfirmModal'
import useConfirm from '../../hooks/useConfirm'

export default function EditTask({
    isOpen,
    setIsOpen,
    editingTask,
    updateTask,
    setEditingTask,
    onSuccess,
    error
}) {
    const modalRef = useRef(null)
    const formDataRef = useRef(null)
    const originalTaskRef = useRef(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'general',
        priority: 'medium',
        dueDate: '',
        dueTime: '',
    })

    // Keep refs in sync with state
    useEffect(() => {
        formDataRef.current = formData
    }, [formData])

    useEffect(() => {
        originalTaskRef.current = editingTask
    }, [editingTask])

    const {
        confirm,
        confirmState,
        handleConfirm,
        handleCancel,
    } = useConfirm()

    function getFormSnapshot() {
        const current = formDataRef.current
        return {
            title: current?.title?.trim() || '',
            description: current?.description?.trim() || '',
            category: current?.category || 'general',
            priority: current?.priority || 'medium',
            dueDate: current?.dueDate || '',
            dueTime: current?.dueTime || '',
        }
    }

    function populateForm(task) {
        if (!task) return

        setFormData({
            title: task.title || '',
            description: task.notes || '',
            category: String(task.category || 'general'),
            priority: task.priority || 'medium',
            dueDate: task.dueDate || '',
            dueTime: task.dueTime || '',
        })
    }

    function hasRealChanges() {
        const task = originalTaskRef.current
        if (!task) return false

        const current = getFormSnapshot()
        const original = {
            title: task.title || '',
            description: task.notes || '',
            category: task.category || 'general',
            priority: task.priority || 'medium',
            dueDate: task.dueDate || '',
            dueTime: task.dueTime || '',
        }

        return JSON.stringify(current) !== JSON.stringify(original)
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

    async function closeEditModal() {
        if (!hasRealChanges()) {
            resetForm()
            setEditingTask?.(null)
            setIsOpen(false)
            return
        }

        const confirmed = await confirm(
            'Are you sure you want to close? Your changes will be lost.'
        )

        if (confirmed) {
            resetForm()
            setEditingTask?.(null)
            setIsOpen(false)
        }
    }

    function handleSubmitTask() {
        if (!editingTask) return

        const title = formData.title.trim()
        const description = formData.description.trim()

        const result = updateTask(editingTask.id, {
            title,
            notes: description,
            category: formData.category,
            priority: formData.priority,
            dueDate: formData.dueDate,
            dueTime: formData.dueTime,
        })

        if (!result.success) {
            error(result.error || 'Failed to update task. Please try again.')
            return
        }

        onSuccess?.()
        resetForm()
        setEditingTask?.(null)
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

        if (editingTask) {
            populateForm(editingTask)
        } else {
            resetForm()
        }

        const focusTimer = window.setTimeout(() => {
            const titleInput = document.getElementById('editTaskInput')
            titleInput?.focus()
            titleInput?.select?.()
        }, 50)

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeEditModal()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.clearTimeout(focusTimer)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, editingTask])

    useEffect(() => {
        if (!isOpen) return

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeEditModal()
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
    }, [isOpen, editingTask])

    return (
        <>
            <div
                className={`
                    fixed inset-0 z-30
                    flex justify-center items-center
                    backdrop-blur-sm bg-gray-900/70
                    transition-all duration-300 ease-out
                    ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
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
                        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
                    `}
                >
                    <h2 className="font-display font-semibold text-lg">Edit Task</h2>

                    <div className="w-full flex flex-col gap-2.5 sm:flex-row justify-between">
                        <input
                            type="text"
                            id="editTaskInput"
                            className="flex-3 min-w-75 w-full"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="What needs doing?"
                            maxLength="120"
                            aria-label="Edit task title"
                        />

                        <div className="flex-1 w-full flex flex-row gap-1.5 justify-between items-center">
                            <span className="font-mono text-sm text-text-muted" id="editCharCount">
                                {formData.title.length}/120
                            </span>

                            <Button onClick={handleSubmitTask} id="editTaskSubmitBtn">
                                Save changes
                            </Button>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-500/30" />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                        <div className="flex flex-col gap-0.5">
                            <label className="text-sm text-text-secondary uppercase tracking-wider" htmlFor="editCategoryDropDown">
                                Category
                            </label>

                            <select
                                className="md:w-full"
                                id="editCategoryDropDown"
                                aria-label="Select a category"
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.category}
                                        value={category.category.toLowerCase().replace(/\s+/g, '-')}
                                    >
                                        {category.category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <label className="text-sm text-text-secondary uppercase tracking-wider" htmlFor="editPriorityDropdown">
                                Priority
                            </label>

                            <select
                                className="md:w-full"
                                id="editPriorityDropdown"
                                aria-label="Select priority"
                                value={formData.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="editTaskDueDate" className="text-sm text-text-secondary uppercase tracking-wider">
                                Due Date
                            </label>

                            <input
                                type="date"
                                id="editTaskDueDate"
                                value={formData.dueDate}
                                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="editTaskDueTime" className="text-sm text-text-secondary uppercase tracking-wider">
                                Due time
                            </label>

                            <input
                                type="time"
                                id="editTaskDueTime"
                                value={formData.dueTime}
                                onChange={(e) => handleInputChange('dueTime', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-0.5">
                        <label htmlFor="editTaskNotes" className="text-sm text-text-secondary uppercase tracking-wider">
                            Notes
                        </label>

                        <input
                            type="text"
                            id="editTaskNotes"
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

            <ConfirmModal
                isOpen={confirmState.isOpen}
                message={confirmState.message}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    )
}
