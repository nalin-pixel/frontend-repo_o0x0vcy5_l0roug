import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function IdeaDetail(){
  const { id } = useParams()
  const [idea, setIdea] = useState(null)
  const [creating, setCreating] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(`${baseUrl}/api/ideas/${id}`).then(r=>r.json()).then(setIdea)
  }, [id])

  if (!idea) return <div className="text-slate-200 py-10">Loading…</div>

  const createFromIdea = async () => {
    setCreating(true)
    try {
      const r = await fetch(`${baseUrl}/api/plans`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
        name: idea.title, type: 'game', linkedIdeaId: idea.id
      })})
      const data = await r.json()
      navigate(`/plans/${data.id}`)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="rounded-3xl overflow-hidden bg-slate-900/70 border border-white/10">
        <div className="h-52 sm:h-64 bg-gradient-to-br from-indigo-600 to-fuchsia-600" />
        <div className="p-5">
          <div className="text-2xl font-extrabold text-white">{idea.title}</div>
          <div className="mt-2 flex gap-2 flex-wrap">
            <span className="text-[11px] px-2 py-1 rounded-full bg-slate-800/80 text-slate-200">{idea.type}</span>
            {idea.tags?.map(t => (
              <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-slate-800/80 text-slate-200">{t}</span>
            ))}
          </div>

          <div className="mt-5 grid gap-4">
            <section>
              <h3 className="text-white font-semibold">Concept</h3>
              <p className="text-slate-300 mt-1">{idea.concept}</p>
            </section>
            <section>
              <h3 className="text-white font-semibold">Core Mechanics</h3>
              <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
                {idea.coreMechanics?.map((m,i)=> <li key={i}>{m}</li>)}
              </ul>
            </section>
            <section>
              <h3 className="text-white font-semibold">Ways to Make It Fun</h3>
              <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
                {idea.funHooks?.map((m,i)=> <li key={i}>{m}</li>)}
              </ul>
            </section>
            <section>
              <h3 className="text-white font-semibold">Monetization Ideas (TOS-safe)</h3>
              <ul className="list-disc pl-5 text-slate-300 mt-1 space-y-1">
                {idea.monetizationIdeas?.map((m,i)=> <li key={i}>{m}</li>)}
              </ul>
            </section>
          </div>

          <div className="mt-6">
            <button disabled={creating} onClick={createFromIdea} className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-semibold">
              {creating ? 'Creating…' : 'Add to My Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
