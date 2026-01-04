'use client'

import { useState, useEffect } from 'react'

export default function Lightbox({ project, onClose }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (project) {
      setIsOpen(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsOpen(false)
      document.body.style.overflow = 'auto'
    }
  }, [project])

  if (!project || !isOpen) return null

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>

        <div id="lightbox-media-container">
          {project.type === 'single' && (
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <img
                src={project.image}
                alt={project.title}
                className="floating-media"
                style={{ width: '100%' }}
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
          )}

          {project.type === 'gallery' && project.gallery?.map((img, i) => (
            <div key={i} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <img src={img.image} className="floating-media" style={{ width: '100%' }} />
              {img.caption && (
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '10px' }}>
                  {img.caption}
                </p>
              )}
            </div>
          ))}

          {project.videoUrl && (
            <div className="floating-media" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src={project.videoUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          )}

          <div className="lightbox-info">
            <h3>{project.title}</h3>
            <p>{project.fullConcept || project.concept || ''}</p>
            <div style={{ marginTop: '20px', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              {project.material && <p><strong>MAT:</strong> {project.material}</p>}
              {project.dimensions && <p><strong>DIM:</strong> {project.dimensions}</p>}
              {project.year && <p><strong>YEAR:</strong> {project.year}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
