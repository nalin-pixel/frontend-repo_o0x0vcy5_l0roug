import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import Hero from './components/Hero'
import HomeScreen from './components/HomeScreen'
import Ideas from './components/Ideas'
import Earn from './components/Earn'
import Gallery from './components/Gallery'
import Plans from './components/Plans'
import NavBar from './components/NavBar'
import IdeaDetail from './components/IdeaDetail'
import PathDetail from './components/PathDetail'
import WorldDetail from './components/WorldDetail'
import ProjectDetail from './components/ProjectDetail'
import Settings from './components/Settings'
import Onboarding from './components/Onboarding'
import { ThemeProvider, useTheme } from './components/ThemeContext'

function Layout({ children }) {
  const { theme } = useTheme() || { theme: 'dark' }
  return (
    <div className={`min-h-screen ${theme==='neon' ? 'bg-[#05090f]' : 'bg-gradient-to-br from-[#0b0f1a] via-[#0a1020] to-[#0b0f1a]'}`}>
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

function AppRoutes() {
  const navigate = useNavigate()
  const { onboarded } = useTheme() || { onboarded: true }
  const location = useLocation()

  if (!onboarded && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <Layout>
      <Routes>
        <Route index element={<HomeScreen onQuick={(k)=>{
          if (k==='idea') navigate('/ideas')
          if (k==='earn') navigate('/earn')
          if (k==='random') navigate('/ideas')
        }} />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:id" element={<IdeaDetail />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/paths/:id" element={<PathDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/worlds/:id" element={<WorldDetail />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/:id" element={<ProjectDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
