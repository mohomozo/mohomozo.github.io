import { projects } from '../js/projects'

export default function Wip() {
  const wips = projects.filter(p => p.category === 'wip')
  return (
    <section className="panel">
      <h2>Ongoing Projects</h2>
      <div className="grid">
        {wips.map(p => (
          <div key={p.id} className="project-card">
            <img src={p.image} alt={p.title} onError={(e)=>e.target.src='https://via.placeholder.com/400'} />
            <div className="card-overlay">
              <span>{p.title}</span>
              <p>{p.concept}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
