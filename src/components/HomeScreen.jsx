import { Sparkles, Rocket, Shuffle, Settings as SettingsIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function HomeScreen({ onQuick }) {
  const navigate = useNavigate()
  const buttons = [
    { key: 'idea', label: 'New Game Idea', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { key: 'earn', label: 'Earn Robux Plan', icon: Rocket, color: 'from-cyan-500 to-blue-500' },
    { key: 'random', label: 'Random Challenge', icon: Shuffle, color: 'from-emerald-500 to-teal-500' },
  ]

  const feed = [
    { title: 'Best idea of the week', tag: 'Tycoon', color: 'bg-purple-500', link: '/ideas/idea-tycoon-pets' },
    { title: 'New earning strategy', tag: 'Gamepasses', color: 'bg-cyan-500', link: '/paths/path-gamepasses' },
    { title: 'Featured 3D design', tag: 'Lobby', color: 'bg-emerald-500', link: '/worlds/world-floating-islands' },
  ]

  return (
    <div className="pb-28">
      {/* Greeting */}
      <div className="px-6 md:px-10 pt-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Hi, Builder!</h2>
          <p className="text-slate-300 mt-1">Welcome back, Creator!</p>
        </div>
        <button onClick={()=>navigate('/settings')} className="p-2 rounded-xl bg-slate-900/70 border border-white/10 text-slate-200 hover:text-white">
          <SettingsIcon size={20} />
        </button>
      </div>

      {/* Daily highlight */}
      <div className="px-6 md:px-10 mt-5">
        <motion.div
          initial={{ y: 8, rotateX: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative rounded-3xl p-5 md:p-6 bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-xl"
        >
          <div className="text-sm opacity-90">Today’s Challenge</div>
          <h3 className="text-xl md:text-2xl font-bold mt-1">Build an Obby with 3 unusual traps</h3>
          <button
            onClick={() => onQuick?.('start-challenge')}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 transition"
          >
            Start
          </button>
        </motion.div>
      </div>

      {/* Quick buttons */}
      <div className="px-6 md:px-10 mt-5 grid grid-cols-3 gap-3">
        {buttons.map((b) => (
          <motion.button
            key={b.key}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => onQuick?.(b.key)}
            className={`rounded-2xl p-3 md:p-4 bg-gradient-to-br ${b.color} text-white shadow-lg`}
          >
            <div className="flex flex-col items-center gap-2">
              <b.icon size={22} />
              <span className="text-xs md:text-sm font-semibold text-center leading-tight">{b.label}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feed */}
      <div className="px-6 md:px-10 mt-6 space-y-3">
        {feed.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.01 }}
            onClick={()=> navigate(item.link)}
            className="text-left flex items-center gap-4 rounded-2xl p-4 bg-slate-900/70 border border-white/10"
          >
            <div className={`w-16 h-16 rounded-xl ${item.color} shadow-lg`} />
            <div className="flex-1">
              <div className="text-white font-semibold">{item.title}</div>
              <div className="text-xs text-slate-300 mt-1">Tag: {item.tag}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
