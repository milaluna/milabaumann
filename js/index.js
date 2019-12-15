let didScroll;
var lastScrollTop = 0;
var delta = 2;
var navbarHeight = $('#menu')
  .outerHeight();


// on scroll, let the interval function know the user has scrolled
$(window)
  .scroll(function(event) {
    didScroll = true;
  });

// run hasScrolled() and reset didScroll status
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this)
    .scrollTop();

  if (Math.abs(lastScrollTop - st) <= delta) {
    return;
  }

  // If current position > last position AND scrolled past navbar...
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('#menu')
      .removeClass('menu-show')
      .addClass('menu-hide');
  } else {
    // Scroll Up
    // If did not scroll past the document (possible on mac)...
    if (st + $(window)
      .height() < $(document)
      .height()) {
      $('#menu')
        .removeClass('menu-hide')
        .addClass('menu-show');
    }
  }

  lastScrollTop = st;
}

// function padd(c) {
//   let hex = Number(c).toString(16);
//   while (hex.length < 6) {
//     hex = "0" + hex;
//   }
//
//   return hex;
// }
// var c = 0;
//
// setInterval(() => {
//   $("#menu").css('background-color', `#${padd(c)}`);
//   if (c < 0xFFFFFF) {
//     c += 1;
//   } else {
//     c = 0;
//   }
// }, 1);
