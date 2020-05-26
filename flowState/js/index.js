$(document).ready(function () {
  const goalOffset = $('#goal-title').offset().top;
  const movieViewerOffset = $('#movies').offset().top;
  const movieCarousselOffset = $('#veryuniqueid').offset().top;
  const movieCarousselHeight = $('#veryuniqueid').height();
  $(document).scroll(function () {
    const pos = $(this).scrollTop();
    let newBg = 255;
    if (pos >= goalOffset && pos < movieViewerOffset) {
      console.log('going black');
      newBg = 255 - ((pos - goalOffset) / (movieViewerOffset - goalOffset)) * 255;
    } else if (pos > movieViewerOffset && pos < movieCarousselOffset) {
      console.log('staying black');
      newBg = 0;
    } else if (pos >= movieCarousselOffset && pos < movieCarousselOffset + movieCarousselHeight) {
      console.log('going white');
      console.log(
        `(${pos}-${movieCarousselOffset})/${movieCarousselHeight} = ${
          (pos - movieCarousselOffset) / movieCarousselHeight
        }`
      );
      newBg = ((pos - movieCarousselOffset) / movieCarousselHeight) * 255;
    } else if (pos >= movieCarousselOffset + movieCarousselHeight) {
      newBg = 255;
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
