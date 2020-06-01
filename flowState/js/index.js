$(document).ready(() => {
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

  // initilises the coursel with the slick library
  $('.movie-caroussel').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false
  });
});
