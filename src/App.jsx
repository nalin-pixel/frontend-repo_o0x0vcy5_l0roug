import { Routes, Route, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import HomeScreen from './components/HomeScreen'
import Ideas from './components/Ideas'
import Earn from './components/Earn'
import Gallery from './components/Gallery'
import Plans from './components/Plans'
import NavBar from './components/NavBar'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f1a] via-[#0a1020] to-[#0b0f1a]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_35%)]" />
      <div className="relative">
        <Hero />
        <div className="mx-auto max-w-5xl -mt-6">
          <div className="mx-4 md:mx-6">
            {children}
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  )
}

function App() {
  const navigate = useNavigate()
  return (
    <Layout>
      <Routes>
        <Route index element={<HomeScreen onQuick={(k)=>{
          if (k==='idea') navigate('/ideas')
          if (k==='earn') navigate('/earn')
          if (k==='random') navigate('/ideas')
        }} />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </Layout>
  )
}

export default App
