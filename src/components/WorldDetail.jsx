import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function WorldDetail(){
  const { id } = useParams()
  const [world, setWorld] = useState(null)
  const [saved, setSaved] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{
    fetch(`${baseUrl}/api/worlds/${id}`).then(r=>r.json()).then(setWorld)
    const s = localStorage.getItem('ril_world_'+id) === '1'
    setSaved(s)
  }, [id])

  if (!world) return <div className="text-slate-200 py-10">Loading…</div>

  const toggleSave = () => {
    const next = !saved
    setSaved(next)
    localStorage.setItem('ril_world_'+id, next ? '1' : '0')
  }

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10">
        <div className="h-52 sm:h-64 bg-gradient-to-br from-violet-600 to-fuchsia-600" />
        <div className="p-5">
          <div className="text-2xl font-extrabold text-white">{world.title}</div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {world.tags?.map(t => (
              <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-slate-800/80 text-slate-200">{t}</span>
            ))}
          </div>

          <section className="mt-5">
            <h3 className="text-white font-semibold">Visual Style Notes</h3>
            <p className="text-slate-300 mt-1">{world.visualStyleNotes}</p>
          </section>

          <section className="mt-5">
            <h3 className="text-white font-semibold">Use Cases</h3>
            <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
              {world.useCases?.map((u,i)=> <li key={i}>{u}</li>)}
            </ul>
          </section>

          <section className="mt-5">
            <h3 className="text-white font-semibold">Build Checklist</h3>
            <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
              {world.buildChecklist?.map((u,i)=> <li key={i}>{u}</li>)}
            </ul>
          </section>

          <div className="mt-6">
            <button onClick={toggleSave} className={`px-4 py-2 rounded-xl text-white font-semibold ${saved? 'bg-emerald-600':'bg-cyan-600'}`}>
              {saved ? 'Saved to Inspirations' : 'Save to Inspirations'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
