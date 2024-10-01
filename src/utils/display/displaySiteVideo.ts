/*
export function createVideoOnLoad() {
  const videoComponents = document.querySelectorAll('[element="video-component"]');
  //console.log(videoComponents);

  videoComponents.forEach((container) => {
    const vimeoIDElement = container.querySelector('[element="video-id"]');
    const vimeoPlayerElement = container.querySelector('[element="video-player"]');
    if (vimeoIDElement && vimeoPlayerElement) {
      const vimeoID = vimeoIDElement.textContent;
      //console.log(vimeoID);
      vimeoPlayerElement.src = vimeoPlayerElement.src.replace('--insertHereVideoID--', vimeoID);
    }
  });
}


export function loadVideoOnHover() {
  const videoComponents = document.querySelectorAll('[element="video-component"]');

  videoComponents.forEach((container) => {
    const iframe = container.querySelector('iframe');
    const player = new Vimeo.Player(iframe);

    container.addEventListener('mouseenter', function () {
      player.play();
    });

    container.addEventListener('mouseleave', function () {
      player.pause();
    });
  });
}
  */
