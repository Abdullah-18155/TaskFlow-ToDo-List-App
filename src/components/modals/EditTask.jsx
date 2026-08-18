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
}) {
    const modalRef = useRef(null)
    const [titleLength, setTitleLength] = useState(0)

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

    function getFormSnapshot() {
        return {
            title: inputRefs.title.current?.value.trim() || '',
            description: inputRefs.description.current?.value.trim() || '',
            category: inputRefs.category.current?.value || 'general',
            priority: inputRefs.priority.current?.value || 'medium',
            dueDate: inputRefs.dueDate.current?.value || '',
            dueTime: inputRefs.dueTime.current?.value || '',
        }
    }

    function populateForm(task) {
        if (!task) return

        if (inputRefs.title.current) inputRefs.title.current.value = task.title || ''
        if (inputRefs.description.current) inputRefs.description.current.value = task.notes || ''
        if (inputRefs.category.current) inputRefs.category.current.value = String(task.category || 'general')
        if (inputRefs.priority.current) inputRefs.priority.current.value = task.priority || 'medium'
        if (inputRefs.dueDate.current) inputRefs.dueDate.current.value = task.dueDate || ''
        if (inputRefs.dueTime.current) inputRefs.dueTime.current.value = task.dueTime || ''
        setTitleLength(task.title?.length || 0)
    }

    function hasRealChanges() {
        if (!editingTask) return false

        const current = getFormSnapshot()
        const original = {
            title: editingTask.title || '',
            description: editingTask.notes || '',
            category: editingTask.category || 'general',
            priority: editingTask.priority || 'medium',
            dueDate: editingTask.dueDate || '',
            dueTime: editingTask.dueTime || '',
        }

        return JSON.stringify(current) !== JSON.stringify(original)
    }

    function resetForm() {
        if (inputRefs.title.current) inputRefs.title.current.value = ''
        if (inputRefs.description.current) inputRefs.description.current.value = ''
        if (inputRefs.category.current) inputRefs.category.current.value = 'general'
        if (inputRefs.priority.current) inputRefs.priority.current.value = 'medium'
        if (inputRefs.dueDate.current) inputRefs.dueDate.current.value = ''
        if (inputRefs.dueTime.current) inputRefs.dueTime.current.value = ''
        setTitleLength(0)
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

        const title = inputRefs.title.current?.value.trim()
        const description = inputRefs.description.current?.value.trim()
        const category = inputRefs.category.current?.value
        const priority = inputRefs.priority.current?.value
        const dueDate = inputRefs.dueDate.current?.value
        const dueTime = inputRefs.dueTime.current?.value

        const result = updateTask(editingTask.id, {
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

        onSuccess?.()
        resetForm()
        setEditingTask?.(null)
        setIsOpen(false)
    }

    useEffect(() => {
        if (!isOpen) return

        if (editingTask) {
            populateForm(editingTask)
        } else {
            resetForm()
        }

        const focusTimer = window.setTimeout(() => {
            inputRefs.title.current?.focus()
            inputRefs.title.current?.select?.()
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
                            ref={inputRefs.title}
                            placeholder="What needs doing?"
                            maxLength="120"
                            aria-label="Edit task title"
                            onChange={(event) => setTitleLength(event.target.value.length)}
                        />

                        <div className="flex-1 w-full flex flex-row gap-1.5 justify-between items-center">
                            <span className="font-mono text-sm text-text-muted" id="editCharCount">
                                {titleLength}/120
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
                                defaultValue="general"
                                ref={inputRefs.category}
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
                                defaultValue="medium"
                                ref={inputRefs.priority}
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

                            <input type="date" id="editTaskDueDate" ref={inputRefs.dueDate} />
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <label htmlFor="editTaskDueTime" className="text-sm text-text-secondary uppercase tracking-wider">
                                Due time
                            </label>

                            <input type="time" id="editTaskDueTime" ref={inputRefs.dueTime} />
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
                            ref={inputRefs.description}
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
