$(document).ready(() => {
  const ratio = 960 / 540;
  const videoWidth = window.innerWidth;
  const videoHeight = videoWidth / ratio;
  $('#main-movie').css('width', videoWidth).css('height', videoHeight);
  // initilises the coursel with the slick library
  $('.movie-caroussel').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false
  });

  //sync vimeo video play with timeline animation
  const vimeoVideos = $('.timeline-video').each(function () {
    if ($(this).attr('data-target')) {
      console.log(`targetting ${$(this).attr('data-target')}`);
      new TimeLinePlayer($(this).attr('data-target'), $(this)[0]);
    }
  });

  function opacityFunction() {
    const scrollTop = $(document).scrollTop();
    const offsetTop = $(this).offset().top - scrollTop;

    const start = (window.innerHeight * 4) / 8;
    const stop = (window.innerHeight * 3) / 8;
    const diff = start - stop;

    if (offsetTop > start) return 0;
    if (offsetTop < stop) return 1;

    const heightDiff = offsetTop - stop;
    return 1 - heightDiff / diff;
  }

  //scroll opacity
  $(document).scroll(function () {
    const scrollTop = $(this).scrollTop();
    const goalText = $('#goal');
    const collectionOfMovements = $('#collection-of-movements');
    goalText.css({
      opacity: opacityFunction.bind(goalText)
    });
    collectionOfMovements.css({
      opacity: opacityFunction.bind(collectionOfMovements)
    });
  });
});

class TimeLinePlayer {
  constructor(timelineImage, vimeoPlayer) {
    if (!timelineImage) throw new Error('Invalid class!', timelineImage);
    this.target = $(`#${timelineImage}`);
    this.player = new Vimeo.Player(vimeoPlayer);
    this.link();
  }

  link() {
    this.player.on('play', event => {
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

    this.player.on('pause', () =>
      this.target.css('animation-play-state', 'paused')
    );

    this.player.on('ended', () => this.target.css('animation-name', 'none'));

    this.player.getVideoTitle().then(title => console.log('title:', title));
  }
}
