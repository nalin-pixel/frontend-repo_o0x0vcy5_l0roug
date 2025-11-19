import { Home, Wand2, Coins, Layers3, ClipboardCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  const tabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/ideas', label: 'Game Ideas', icon: Wand2 },
    { to: '/earn', label: 'Earn Robux', icon: Coins },
    { to: '/gallery', label: '3D Worlds', icon: Layers3 },
    { to: '/plans', label: 'My Plans', icon: ClipboardCheck },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-3xl">
        <nav className="m-4 rounded-2xl bg-slate-900/80 backdrop-blur border border-white/10 shadow-xl">
          <ul className="grid grid-cols-5">
            {tabs.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 py-3 text-xs transition ${
                      isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  <Icon size={22} />
                  <span className="font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
