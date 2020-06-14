$(document).ready(() => {
  // initilises the coursel with the slick library
  $('.movie-caroussel').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false
  });

  //effect to smootly transition screen to black when arriving to #movies
  //and then back to white when leaving #movies
  $(document).scroll(() => {
    const goalOffset = $('#goal-title').offset().top;
    const moviesOffset = $('#movies').offset().top;
    const movieCarousselOffset = $('#movie-caroussel').offset().top;
    const collectionOfMovementsOffset = $('#collection-of-movements').offset().top;
    const pos = $(document).scrollTop();
    let newBg = 255;
    if (pos >= goalOffset && pos <= moviesOffset) {
      newBg = 255 - ((pos - goalOffset) / (moviesOffset - goalOffset)) * 255;
    } else if (pos > moviesOffset && pos < movieCarousselOffset) {
      newBg = 0;
    } else if (pos >= movieCarousselOffset && pos < collectionOfMovementsOffset) {
      newBg = ((pos - movieCarousselOffset) / (collectionOfMovementsOffset - movieCarousselOffset)) * 255;
      $('.com-title').css('opacity', newBg / 255); //code is shorted, but we just need a number that goes from 0 to 1
    }
    $('.bg-color-change').css('background-color', `rgb(${newBg},${newBg},${newBg})`);
  });

  //sync vimeo video play with timeline animation
  const flyinghHigherAndHigher = new TimeLinePlayer('flying-higher-and-higher');
  const exchange = new TimeLinePlayer('exchange');
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
