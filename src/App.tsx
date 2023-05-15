import './App.css'
import Aside from './container/Aside'
import Navigation from './components/Navigation'
import NoteSection from './container/NoteSection'

function App() {
  

  return (
    <div className='min-h-screen bg-primary text-light relative'>
      <Navigation />
      <main className='flex md:flex-row xs:flex-col'>
        <Aside/>
        <NoteSection/>
      </main>
    </div>
  )
}

export default App
