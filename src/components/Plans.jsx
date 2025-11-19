import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Plans() {
  const [plans, setPlans] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    try {
      const r = await fetch(`${baseUrl}/api/plans`)
      const data = await r.json()
      setPlans(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-white">My Plans</h2>
        <button onClick={async ()=>{
          await fetch(`${baseUrl}/api/plans`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'New Plan', type:'game', description:'Quick plan created from app', tasks:[{title:'First step'}]})})
          load()
        }} className="px-3 py-2 rounded-xl bg-cyan-600 text-white text-sm font-semibold">Create New Plan</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {plans.map((p) => (
          <motion.div key={p.id} whileHover={{ scale: 1.01 }} className="rounded-2xl p-4 bg-slate-900/70 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-white font-bold">{p.name}</div>
              <div className="text-xs text-slate-300 capitalize">{p.type}</div>
            </div>
            <p className="text-sm text-slate-300 mt-1 line-clamp-2">{p.description}</p>
            <div className="mt-3 h-2 rounded bg-slate-800">
              <div className="h-2 rounded bg-cyan-500" style={{width: `${p.progress||0}%`}} />
            </div>
            <div className="mt-2 text-xs text-slate-400">{(p.tasks||[]).filter(t=>t.done).length} / {(p.tasks||[]).length} tasks</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
