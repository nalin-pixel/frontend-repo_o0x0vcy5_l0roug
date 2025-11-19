import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[46vh] sm:h-[50vh] md:h-[58vh] overflow-hidden">
      <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950" />
      <div className="absolute inset-0 flex items-end">
        <div className="px-6 md:px-10 pb-6 md:pb-10 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow">Roblox Idea Lab & Robux Planner</h1>
          <p className="mt-3 md:mt-4 text-slate-200/90 max-w-2xl text-sm md:text-base">
            Fresh ideas, safe ways to earn Robux, and interactive 3D checklists to turn your visions into playable experiences.
          </p>
        </div>
      </div>
    </section>
  )
}
