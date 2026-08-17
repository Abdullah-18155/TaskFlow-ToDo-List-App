import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import MobileToolBar from './components/layout/MobileToolbar'
import Sidebar from './components/layout/Sidebar'
import TasksList from './components/tasks/TaskList'
import useTasks from './hooks/useTasks'

function App() {

  const { tasks } = useTasks();
  const filteredTasks = tasks;

  return (
    <>
      <div className="bg-glow" aria-hidden={true}></div>

      <Header />

      <main className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        <MobileToolBar />
        <Sidebar />
        <div className="flex-1 min-h-0">
          {filteredTasks.length === 0 && tasks.length === 0 ?
            <div className={`flex justify-center items-center h-full`}>
              <EmptyState />
            </div>
            :
            <TasksList
              tasks={filteredTasks}
            />
          }
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
