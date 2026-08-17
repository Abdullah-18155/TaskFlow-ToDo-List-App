import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import MobileToolBar from './components/layout/MobileToolbar'
import Sidebar from './components/layout/Sidebar'

function App() {

  return (
    <>
      <div className="bg-glow" aria-hidden={true}></div>

      <Header />

      <main className="flex-1 flex flex-col md:flex-row gap-4">
        <MobileToolBar />
        <Sidebar />
        Hello World
      </main>

      <Footer />
    </>
  )
}

export default App
