import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Earn() {
  const [paths, setPaths] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/earning-paths`).then(r=>r.json()).then(setPaths)
  }, [])

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <h2 className="text-2xl font-extrabold text-white">Earn Robux</h2>
      <p className="text-slate-300 mt-1 text-sm">Educational tips only — no hacks, no generators, no exploits.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {paths.map((p) => (
          <motion.div key={p.id} whileHover={{ scale: 1.02 }} className="rounded-2xl p-4 bg-slate-900/70 border border-white/10">
            <div className="h-36 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600" />
            <div className="mt-3 text-white font-bold">{p.title}</div>
            <p className="text-sm text-slate-300 mt-1 line-clamp-2">{p.overview}</p>
            <ul className="mt-2 text-sm text-slate-300 list-disc pl-5 space-y-1">
              {p.steps?.slice(0,3).map((s,i)=> <li key={i}>{s}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
