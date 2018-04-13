export function loadYoutubeSDK(loadingCb) {
  window.onYouTubeIframeAPIReady = function(){
    loadingCb(window.YT);
  };

  ((d, s, id) => {
    const element = d.getElementsByTagName(s)[0];
    const fjs = element;
    let js = element;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://www.youtube.com/iframe_api';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'youtube-frame-api');
}

