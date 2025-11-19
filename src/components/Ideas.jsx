import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTheme } from './ThemeContext'

const TAGS = ['All','Obby', 'Tycoon', 'Simulator', 'Roleplay', 'Horror', 'Story', 'PvP']

export default function Ideas() {
  const [ideas, setIdeas] = useState([])
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('All')
  const [difficulty, setDifficulty] = useState('')
  const navigate = useNavigate()
  const { level } = useTheme() || { level: 'Beginner' }
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/ideas`).then(r=>r.json()).then(setIdeas)
  }, [])

  const filtered = useMemo(() => {
    let data = ideas
    if (q) {
      const ql = q.toLowerCase()
      data = data.filter(i => (i.title + ' ' + (i.concept||'')).toLowerCase().includes(ql))
    }
    if (tag !== 'All') {
      data = data.filter(i => i.tags?.includes(tag))
    }
    if (difficulty) {
      data = data.filter(i => i.difficulty?.toLowerCase() === difficulty.toLowerCase())
    }
    // prioritize recommendedLevel == level
    data = [...data].sort((a,b)=> (b.recommendedLevel===level) - (a.recommendedLevel===level))
    return data
  }, [ideas, q, tag, difficulty, level])

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-white">Game Ideas</h2>
        <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="bg-slate-900/70 border border-white/10 text-slate-200 rounded-xl px-2 py-1 text-sm">
          <option value="">All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
        {TAGS.map(t => (
          <button key={t} onClick={()=>setTag(t)} className={`px-3 py-1.5 rounded-full text-sm ${tag===t?'bg-cyan-500 text-white':'bg-slate-800/70 text-slate-200'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search ideas (lava, pets, racing…)" className="w-full bg-slate-900/70 border border-white/10 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {filtered.map((idea) => (
          <motion.button onClick={()=>navigate(`/ideas/${idea.id}`)} key={idea.id} whileHover={{ scale: 1.02 }} className="text-left rounded-2xl overflow-hidden bg-slate-900/70 border border-white/10">
            <div className="h-36 bg-gradient-to-br from-indigo-600 to-fuchsia-600" />
            <div className="p-4">
              <div className="text-white font-bold">{idea.title}</div>
              <p className="text-sm text-slate-300 mt-1 line-clamp-2">{idea.concept}</p>
              <div className="mt-2 flex gap-1 flex-wrap">
                {idea.tags?.map(t => (
                  <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-slate-800/80 text-slate-200">{t}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
