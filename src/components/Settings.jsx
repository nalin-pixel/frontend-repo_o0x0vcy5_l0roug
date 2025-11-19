import { useTheme } from './ThemeContext'

export default function Settings(){
  const { theme, setTheme, animations, setAnimations, level, setLevel, setOnboarded } = useTheme()
  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <div className="rounded-3xl p-5 bg-slate-900/70 border border-white/10 text-slate-200">
        <h2 className="text-2xl font-extrabold text-white">Settings</h2>

        <section className="mt-5">
          <h3 className="font-semibold text-white">Theme</h3>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {['light','dark','neon'].map(t => (
              <button key={t} onClick={()=>setTheme(t)} className={`px-3 py-2 rounded-xl ${theme===t?'bg-cyan-600 text-white':'bg-slate-800/70 text-slate-200'}`}>{t[0].toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h3 className="font-semibold text-white">3D & Animations</h3>
          <label className="mt-2 flex items-center gap-2">
            <input type="checkbox" checked={animations} onChange={e=>setAnimations(e.target.checked)} />
            <span>Enable 3D & animations</span>
          </label>
        </section>

        <section className="mt-5">
          <h3 className="font-semibold text-white">Experience Level</h3>
          <select value={level} onChange={e=>setLevel(e.target.value)} className="mt-2 bg-slate-900/70 border border-white/10 text-slate-200 rounded-xl px-3 py-2">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </section>

        <section className="mt-6">
          <button onClick={()=>setOnboarded(false)} className="px-3 py-2 rounded-xl bg-fuchsia-600 text-white">Restart Onboarding</button>
        </section>
      </div>
    </div>
  )
}
