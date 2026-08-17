import { useState } from 'react'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import MobileToolBar from './components/layout/MobileToolbar'
import Sidebar from './components/layout/Sidebar'
import AddTask from './components/modals/AddTask'
import TasksList from './components/tasks/TaskList'
import useTasks from './hooks/useTasks'
import EmptyState from './components/tasks/EmptyState'

function App() {

  const {
    tasks,
    addTask,
  } = useTasks();
  const filteredTasks = tasks;

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  return (
    <>
      <div className="bg-glow" aria-hidden={true}></div>

      <Header setIsOpenAdd={setIsOpenAdd} />

      <main className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        <MobileToolBar />
        <Sidebar />
        <div className="flex-1 min-h-0">
          {filteredTasks.length === 0 && tasks.length === 0 ?
            <div className={`flex justify-center items-center h-full`}>
              <EmptyState openAdd={() => setIsOpenAdd(true)} />
            </div>
            :
            <TasksList
              tasks={filteredTasks}
            />
          }
        </div>
      </main>

      <Footer />


      <AddTask isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} addTask={addTask} />
    </>
  )
}

export default App
