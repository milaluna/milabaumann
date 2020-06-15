$(document).ready(() => {
  // initilises the coursel with the slick library
  $('.movie-caroussel').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false
  });

  //sync vimeo video play with timeline animation
  const flyinghHigherAndHigher = new TimeLinePlayer('flying-higher-and-higher');
  const exchange = new TimeLinePlayer('exchange');
  const alive = new TimeLinePlayer('alive');
});

class TimeLinePlayer {
  constructor(target) {
    if (!target) throw new Error('Invalid class!', target);
    this.target = $(`#${target}>.timeline-display>.timeline-container>.time`);
    this.player = new Vimeo.Player(document.querySelector(`#${target}>.timeline-video>iframe`));
    this.link();
  }

  link() {
    this.player.on('play', (event) => {
      console.log('played the video!', event);
      console.log('duration', event.duration);
      if (this.target.css('animation-name') === 'timeline-animation') {
        this.target.css('animation-play-state', 'running');
      } else {
        this.target.css('animation-name', 'timeline-animation');
        this.target.css('animation-duration', `${event.duration}s`);
        this.target.css('animation-timing-function', 'linear');
        this.target.css('animation-play-state', 'running');
      }
    });

    this.player.on('pause', () => this.target.css('animation-play-state', 'paused'));

    this.player.on('ended', () => this.target.css('animation-name', 'none'));

    this.player.getVideoTitle().then((title) => console.log('title:', title));
  }
}
