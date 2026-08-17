import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

function App() {

  return (
    <>
      <div className="bg-glow" aria-hidden={true}></div>

      <Header />

      <div className="flex-1">
        Hello World
      </div>

      <Footer />
    </>
  )
}

export default App
