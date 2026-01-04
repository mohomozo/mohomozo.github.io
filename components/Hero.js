import { useEffect, useRef } from 'react'

export default function Hero() {
  const videoRef = useRef()

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
  }, [])

  return (
    <header className="hero">
      <div className="video-container">
        <video
          ref={videoRef}
          id="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline
        >
          <source src="/assets/loop.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      <div className="hero-text">
        <h1>MOHOMOZO</h1>
        <p className="subtitle">Mohammad Mozafari</p>
      </div>
    </header>
  )
}
