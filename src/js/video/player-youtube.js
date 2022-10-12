const playObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const frame = entry.target.children[0];

      if (entry.isIntersecting) {
        console.log('play video ')
        frame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        

        return;
      }
      console.log('stop video ')
      frame.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    });
  },
  { 
    threshold: 0.75,
  }
);

const loadObserver = new IntersectionObserver(
(entries, observer) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const idYoutube = video.dataset.id;

      if (entry.isIntersecting) {
        console.log('create new frame')

        const iframe = document.createElement("iframe");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        );
        iframe.setAttribute(
          "src",
          `https://www.youtube.com/embed/${idYoutube}?rel=0&showinfo=0&autoplay=1&mute=1&enablejsapi=1`
        );

        video.innerHTML = "";
        video.appendChild(iframe);


        playObserver.observe(video);
        observer.unobserve(video);

        return;
      }
    });
  },
  { threshold: 0 }
);

const videos = document.querySelectorAll('.js-youtube-player')

export function playerYoutubeStart(){
  if(videos) videos.forEach(video => loadObserver.observe(video))
}