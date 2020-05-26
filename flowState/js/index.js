$(document).ready(function () {
  $(document).scroll(function () {
    const goalOffset = $('#goal-title').offset().top;
    const movieViewerOffset = $('#movies').offset().top;
    const movieCarousselOffset = $('#movie-caroussel').offset().top;
    const movieCarousselHeight = $('#movie-caroussel').height();
    const pos = $(this).scrollTop();
    let newBg = 255;
    if (pos >= goalOffset && pos <= movieViewerOffset) {
      newBg = 255 - ((pos - goalOffset) / (movieViewerOffset - goalOffset)) * 255;
    } else if (pos > movieViewerOffset && pos < movieCarousselOffset) {
      newBg = 0;
    } else if (pos >= movieCarousselOffset && pos < movieCarousselOffset + movieCarousselHeight) {
      newBg = ((pos - movieCarousselOffset) / movieCarousselHeight) * 255;
    }
    $(document.body).css('background-color', `rgb(${newBg},${newBg},${newBg})`);
  });
  $('.movie-caroussel').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false
  });
});
