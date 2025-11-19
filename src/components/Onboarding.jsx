import { useNavigate } from 'react-router-dom'
import { useTheme } from './ThemeContext'

const slides = [
  { title: 'Get new Roblox game ideas', text: 'Explore a colorful library of concepts and mechanics.' },
  { title: 'Learn safe, TOS‑friendly ways to earn Robux', text: 'Educational advice only — no hacks, no exploits.' },
  { title: 'Turn everything into a clear plan', text: 'Create checklists from ideas and paths.' },
  { title: 'Track progress and stay motivated', text: 'Progress bars and streaks keep you moving.' },
]

export default function Onboarding(){
  const navigate = useNavigate()
  const { setOnboarded, level, setLevel } = useTheme()

  const finish = () => {
    setOnboarded(true)
    navigate('/')
  }

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="rounded-3xl p-5 bg-slate-900/70 border border-white/10 text-slate-200">
        <h2 className="text-2xl font-extrabold text-white">Welcome!</h2>
        <div className="mt-4 grid gap-4">
          {slides.map((s,i)=> (
            <div key={i} className="rounded-2xl p-4 bg-slate-950/60 border border-white/10">
              <div className="h-28 rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 mb-3" />
              <div className="text-white font-semibold">{s.title}</div>
              <div className="text-sm text-slate-300">{s.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="text-white font-semibold">Your experience level</div>
          <select value={level} onChange={e=>setLevel(e.target.value)} className="mt-2 bg-slate-900/70 border border-white/10 text-slate-200 rounded-xl px-3 py-2">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={finish} className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold">Get Started</button>
        </div>
      </div>
    </div>
  )
}
