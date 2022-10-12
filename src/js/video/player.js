const playObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {
          console.error("can't play video");
        });

        return;
      }

      video.pause();
    });
  },
  { 
    threshold: 0.75,
     rootMargin: '-100px 0px 0px 0px',
  }
);

const loadObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;

        for (const source in video.children) {
          const videoSource = video.children[source];
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
            videoSource.src = videoSource.dataset.src ?? "";
          }
        }

        video.load();
        observer.unobserve(video);
        playObserver.observe(video);

        return;
      }
    });
  },
  { threshold: 0 }
);

const videos = document.querySelectorAll('.js-video-player')

export function playerStart(){
  if(videos) videos.forEach(video => loadObserver.observe(video))
}
