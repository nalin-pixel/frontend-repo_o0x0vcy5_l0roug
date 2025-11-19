import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProjectDetail(){
  const { id } = useParams()
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [plan, setPlan] = useState(null)
  const [notes, setNotes] = useState('')
  const [tab, setTab] = useState('overview')

  const load = async ()=>{
    const r = await fetch(`${baseUrl}/api/plans/${id}`)
    const d = await r.json()
    setPlan(d)
    setNotes(d.notes||'')
  }

  useEffect(()=>{ load() }, [id])

  const progress = plan?.progressPercent || 0

  const toggleTask = async (taskId) => {
    const tasks = (plan.tasks||[]).map(t => t.taskId===taskId ? { ...t, isDone: !t.isDone } : t)
    const r = await fetch(`${baseUrl}/api/plans/${id}/tasks`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ tasks }) })
    const d = await r.json()
    setPlan(d)
  }

  const saveNotes = async () => {
    await fetch(`${baseUrl}/api/plans/${id}/notes`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ notes }) })
  }

  if (!plan) return <div className="text-slate-200 py-10">Loading…</div>

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="rounded-3xl p-5 bg-slate-900/70 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-white">{plan.name}</div>
            <div className="text-xs text-slate-300 capitalize">{plan.type}</div>
          </div>
          {plan.robuxGoal ? <div className="text-sm text-cyan-300 font-semibold">Goal: {plan.robuxGoal.toLocaleString()} Robux</div> : null}
        </div>
        <div className="mt-3 h-2 rounded bg-slate-800">
          <div className="h-2 rounded bg-cyan-500" style={{width: `${progress}%`}} />
        </div>
        {plan.streakCount ? (<div className="mt-2 text-xs text-emerald-400">🔥 {plan.streakCount}-day streak</div>) : null}

        <div className="mt-5 flex gap-2">
          {['overview','tasks','notes'].map(t => (
            <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-lg text-sm ${tab===t? 'bg-cyan-600 text-white':'bg-slate-800/70 text-slate-200'}`}>{t[0].toUpperCase()+t.slice(1)}</button>
          ))}
        </div>

        {tab==='overview' && (
          <div className="mt-4 text-slate-300">
            <p>{plan.notes || 'No description yet.'}</p>
            {plan.linkedIdeaId && <div className="mt-2 text-xs text-slate-400">Linked idea: {plan.linkedIdeaId}</div>}
            {plan.linkedPathId && <div className="mt-1 text-xs text-slate-400">Linked path: {plan.linkedPathId}</div>}
          </div>
        )}

        {tab==='tasks' && (
          <div className="mt-4 space-y-2">
            {(plan.tasks||[]).map(t => (
              <label key={t.taskId} className="flex items-start gap-2 text-slate-200">
                <input type="checkbox" checked={!!t.isDone} onChange={()=>toggleTask(t.taskId)} className="mt-1" />
                <span>{t.label}</span>
              </label>
            ))}
          </div>
        )}

        {tab==='notes' && (
          <div className="mt-4">
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} onBlur={saveNotes} rows={6} className="w-full bg-slate-950/60 text-slate-100 border border-white/10 rounded-xl p-3" placeholder="Write notes about your plan…" />
            <div className="text-xs text-slate-400 mt-1">Changes are saved when you leave the field.</div>
          </div>
        )}
      </div>
    </div>
  )
}
