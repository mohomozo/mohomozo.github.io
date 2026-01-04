export const projects = [
  {
    id: 1,
    title: "My Painting",
    category: "painting",
    type: "single",
    image: "/assets/painting1.jpg",
    concept: "A conceptual painting."
  },
  {
    id: 2,
    title: "Animation Clip",
    category: "animation",
    type: "simple-with-video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    concept: "Experimental animation."
  },
  {
    id: 3,
    title: "Illustration Series",
    category: "illustration",
    type: "gallery",
    gallery: [
      { image: "/assets/ill1.jpg", caption: "First illustration" },
      { image: "/assets/ill2.jpg", caption: "Second illustration" }
    ]
  },
  {
    id: 4,
    title: "Ongoing Project",
    category: "wip",
    type: "featured-wip",
    image: "/assets/wip1.jpg",
    concept: "Work in progress."
  }
]
