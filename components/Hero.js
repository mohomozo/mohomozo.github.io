export default function Hero() {
  return (
    <header className="hero">
      <div className="video-container">
        <video
          id="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline
          src="/assets/loop.mp4"
        />
        <div className="video-overlay"></div>
      </div>
      <div className="hero-text">
        <h1 id="heroTitle">MOHOMOZO</h1>
        <p style={{ fontSize: '0.8rem' }}>Mohammad Mozafari</p>
        <p id="heroSubtitle">Experimental Multimedia Artist</p>
      </div>
    </header>
  )
}
