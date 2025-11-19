import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TAGS = ['Obby', 'Tycoon', 'Simulator', 'Roleplay', 'Horror', 'Story', 'PvP']

export default function Ideas() {
  const [ideas, setIdeas] = useState([])
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('All')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/ideas`).then(r=>r.json()).then(setIdeas)
  }, [])

  const filtered = ideas.filter(i => {
    const matchQ = !q || (i.title + ' ' + (i.concept||'')).toLowerCase().includes(q.toLowerCase())
    const matchTag = tag==='All' || i.tags?.includes(tag)
    return matchQ && matchTag
  })

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <h2 className="text-2xl font-extrabold text-white">Game Ideas</h2>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
        <button onClick={()=>setTag('All')} className={`px-3 py-1.5 rounded-full text-sm ${tag==='All'?'bg-cyan-500 text-white':'bg-slate-800/70 text-slate-200'}`}>All</button>
        {TAGS.map(t => (
          <button key={t} onClick={()=>setTag(t)} className={`px-3 py-1.5 rounded-full text-sm ${tag===t?'bg-cyan-500 text-white':'bg-slate-800/70 text-slate-200'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search ideas (lava, pets, racing…)" className="w-full bg-slate-900/70 border border-white/10 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {filtered.map((idea) => (
          <motion.div key={idea.id} whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden bg-slate-900/70 border border-white/10">
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
          </motion.div>
        ))}
      </div>
    </div>
  )
}
