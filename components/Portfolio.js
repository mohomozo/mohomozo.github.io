import { useState } from 'react'
import { projects } from '../js/projects'
import Lightbox from './Lightbox'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = projects.filter(
    (p) => (filter === 'all' ? true : p.category === filter && p.category !== 'wip')
  )

  return (
    <>
      <section className="panel">
        <div className="portfolio-menu">
          {['all','painting','illustration','animation'].map(c => (
            <button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>
              {c.charAt(0).toUpperCase()+c.slice(1)}
            </button>
          ))}
        </div>

        <div className="portfolio-container">
          {filtered.map(p => (
            <div key={p.id} className="project-card" onClick={() => setSelected(p)}>
              <img src={p.image} alt={p.title} onError={(e)=>e.target.src='https://via.placeholder.com/400'} />
              <div className="card-overlay">
                <span>{p.title}</span>
                <p>{p.concept}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Lightbox project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
