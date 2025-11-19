import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Gallery() {
  const navigate = useNavigate()
  const baseCards = [
    { id:'world-floating-islands', title: 'Floating Islands', notes: 'Bright colors, coins, jump pads', uses: ['Lobby','Spawn','Parkour'], color:'from-purple-600 to-pink-600' },
    { id:'world-cute-shop', title: 'Cute Pet Shop', notes: 'Warm lights, rounded shelves, plush props', uses: ['Shop','UI background'], color:'from-emerald-500 to-teal-500' },
    { id:'world-sci-hub', title: 'Sci‑fi Portals', notes: 'Neon trims, hex patterns, fog', uses: ['Hub','Teleporter'], color:'from-cyan-500 to-blue-600' },
    { id:'world-cloud-track', title: 'Cloud Track', notes: 'High contrast track, boosters, banners', uses: ['Race','Time trial'], color:'from-fuchsia-500 to-violet-600' },
  ]
  return (
    <div className="px-6 md:px-10 pt-6 pb-28">
      <h2 className="text-2xl font-extrabold text-white">3D Worlds & Inspirations</h2>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {baseCards.map((c, i) => (
          <motion.button onClick={()=>navigate(`/worlds/${c.id}`)} key={c.id} initial={{ rotate: -1 }} animate={{ rotate: [ -1, 1, -1 ] }} transition={{ duration: 10, repeat: Infinity }} className={`text-left rounded-3xl overflow-hidden bg-gradient-to-br ${c.color} p-0.5`}>
            <div className="bg-slate-950/70 p-4 rounded-3xl">
              <div className={`h-40 rounded-2xl bg-gradient-to-br ${c.color}`} />
              <div className="mt-3 text-white font-bold">{c.title}</div>
              <div className="text-slate-200 text-sm">{c.notes}</div>
              <div className="mt-2 flex gap-1 flex-wrap">
                {c.uses.map(u => <span key={u} className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white">{u}</span>)}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
