import { useEffect, useState } from 'react'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import MobileToolBar from './components/layout/MobileToolbar'
import Sidebar from './components/layout/Sidebar'
import AddTask from './components/modals/AddTask'
import EditTask from './components/modals/EditTask'
import ConfirmModal from './components/modals/ConfirmModal'
import KeyboardShortcutsModal from './components/modals/KeyboardShortcutsModal'
import TasksList from './components/tasks/TaskList'
import useTasks from './hooks/useTasks'
import EmptyState from './components/tasks/EmptyState'
import { useTaskFilters } from './hooks/useTaskFilters'
import useConfirm from './hooks/useConfirm'
import { useToast } from './hooks/useToast'
import ToastContainer from './components/common/ToastContainer'

function App() {

  const {
    tasks,
    addTask,
    updateTask,
    toggleComplete,
    toggleFavorite,
    togglePinned,
    deleteTask,
    deleteCompletedTasks,
    clearTasks,
  } = useTasks();

  const { filters, setFilters, applyFilters } = useTaskFilters();
  const filteredTasks = applyFilters(tasks);
  const { confirm, confirmState, handleConfirm, handleCancel } = useConfirm();
  const { toasts, removeToast, success, error, warning, info } = useToast();

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  function openAddModal() {
    setEditingTask(null);
    setIsOpenAdd(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setIsOpenEdit(true);
  }

  async function confirmDeleteAction(message, action) {
    const confirmed = await confirm(message);
    if (confirmed) action();
  }

  const handleToggleComplete = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toggleComplete(taskId);
      success(task.completed ? 'Task marked as pending' : 'Task completed!');
    }
  };

  const handleToggleFavorite = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toggleFavorite(taskId);
      success(task.favorite ? 'Removed from favorites' : 'Added to favorites');
    }
  };

  const handleTogglePinned = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      togglePinned(taskId);
      success(task.pinned ? 'Unpinned' : 'Pinned to top');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    await confirmDeleteAction(`Delete task "${task.title}"?`, () => {
      deleteTask(taskId);
      success(`Task "${task.title}" deleted`);
    });
  };

  const handleDeleteCompleted = async () => {
    const completedCount = tasks.filter((task) => task.completed).length;
    if (!completedCount) {
      warning('No completed tasks to delete');
      return;
    }

    await confirmDeleteAction(`Delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`, () => {
      deleteCompletedTasks();
      success(`${completedCount} completed task${completedCount > 1 ? 's' : ''} deleted`);
    });
  };

  const handleDeleteAll = async () => {
    if (!tasks.length) {
      warning('No tasks to delete');
      return;
    }

    await confirmDeleteAction('Delete all tasks?', () => {
      clearTasks();
      success('All tasks deleted');
    });
  };

  useEffect(() => {
    const handleGlobalShortcuts = (event) => {
      const target = event.target;
      const isTypingTarget =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable);

      if (event.key === '/' && !isTypingTarget && !isOpenAdd) {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput');
        searchInput?.focus();
        searchInput?.select?.();
        return;
      }

      if (event.key.toLowerCase() === 'n' && !event.ctrlKey && !event.metaKey && !event.altKey && !isTypingTarget) {
        event.preventDefault();
        openAddModal();
        setTimeout(() => {
          document.getElementById('taskInput')?.focus();
        }, 0);
      }
    };

    document.addEventListener('keydown', handleGlobalShortcuts);
    return () => document.removeEventListener('keydown', handleGlobalShortcuts);
  }, [isOpenAdd]);

  return (
    <>
      <div className="bg-glow" aria-hidden={true}></div>

      <Header
        setIsOpenAdd={setIsOpenAdd}
        searchValue={filters.search}
        onSearchChange={(value) => setFilters((prev) => ({ ...prev, search: value }))}
      />

      <main className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        <MobileToolBar
          tasks={tasks}
          filters={filters}
          setFilters={setFilters}
          onDeleteCompleted={handleDeleteCompleted}
          onDeleteAll={handleDeleteAll}
        />
        <Sidebar
          tasks={tasks}
          filters={filters}
          setFilters={setFilters}
          onDeleteCompleted={handleDeleteCompleted}
          onDeleteAll={handleDeleteAll}
        />
        <div className="flex-1 min-h-0">
          {filteredTasks.length === 0 && tasks.length === 0 ?
            <div className={`flex justify-center items-center h-full`}>
              <EmptyState openAdd={openAddModal} />
            </div>
            :
            <TasksList
              tasks={filteredTasks}
              toggleComplete={handleToggleComplete}
              toggleFavorite={handleToggleFavorite}
              togglePinned={handleTogglePinned}
              onDeleteTask={handleDeleteTask}
              onEdit={openEditModal}
            />
          }
        </div>
      </main>

      <Footer onOpenShortcuts={() => setIsShortcutsOpen(true)} />


      <AddTask
        isOpen={isOpenAdd}
        setIsOpen={setIsOpenAdd}
        addTask={addTask}
        onSuccess={() => success('Task created successfully!')}
        error={error}
      />

      <EditTask
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        editingTask={editingTask}
        updateTask={updateTask}
        setEditingTask={setEditingTask}
        onSuccess={() => success('Task updated successfully!')}
        error={error}
      />

      <ConfirmModal
        isOpen={confirmState.isOpen}
        message={confirmState.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  )
}

export default App
