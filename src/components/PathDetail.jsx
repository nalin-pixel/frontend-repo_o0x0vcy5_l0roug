import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PathDetail(){
  const { id } = useParams()
  const [path, setPath] = useState(null)
  const [tasks, setTasks] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(`${baseUrl}/api/paths/${id}`).then(r=>r.json()).then(d=>{ setPath(d); setTasks(d.checklist||[]) })
  }, [id])

  if (!path) return <div className="text-slate-200 py-10">Loading…</div>

  const toggle = (taskId) => setTasks(ts => ts.map(t => t.taskId===taskId? {...t, isDone: !t.isDone} : t))

  const createPlan = async () => {
    const r = await fetch(`${baseUrl}/api/plans`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      name: path.title, type: 'earning', linkedPathId: path.id
    })})
    const data = await r.json()
    navigate(`/plans/${data.id}`)
  }

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10">
        <div className="h-52 sm:h-64 bg-gradient-to-br from-teal-500 to-blue-600" />
        <div className="p-5">
          <div className="text-2xl font-extrabold text-white">{path.title}</div>

          <section className="mt-5">
            <h3 className="text-white font-semibold">Overview</h3>
            <p className="text-slate-300 mt-1">{path.description}</p>
          </section>

          <section className="mt-5">
            <h3 className="text-white font-semibold">Step-by-step Plan</h3>
            <ol className="list-decimal pl-5 text-slate-300 mt-1 space-y-1">
              {path.steps?.map((s)=> <li key={s.stepNumber}><b className="text-slate-200">{s.title}:</b> {s.explanation}</li>)}
            </ol>
          </section>

          <section className="mt-5">
            <h3 className="text-white font-semibold">Checklist</h3>
            <ul className="text-slate-300 mt-1 space-y-2">
              {tasks.map((t)=> (
                <li key={t.taskId} className="flex items-start gap-2">
                  <input type="checkbox" checked={!!t.isDone} onChange={()=>toggle(t.taskId)} className="mt-1" />
                  <span>{t.label}</span>
                  {t.isOptional && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white">Optional</span>}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-5">
            <h3 className="text-white font-semibold">Tips</h3>
            <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
              {path.tips?.map((t,i)=> <li key={i}>{t}</li>)}
            </ul>
          </section>

          <div className="mt-6">
            <button onClick={createPlan} className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold">Turn this into a personal plan</button>
          </div>
        </div>
      </div>
    </div>
  )
}
