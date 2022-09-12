function fancySlide() {
  var slideOne = $('#slide-one'),
    slideTwo = $('#slide-two'),
    slideThree = $('#slide-three'),
    slideFour = $("#slide-four"),
    slideFive = $("#slide-five");
    slideSix = $("#slide-six");

  var slides = [slideOne, slideTwo, slideThree, slideFour, slideFive, slideSix];

  var textTrans = $('#slideContainer').attr('transform-text');
  var dataSpeed = $('#slideContainer').attr('data-speed');
  dataSpeed = dataSpeed * 1000;

  if (textTrans == 'upper') {
    $('.text').addClass('text-uppercase');
  } else if (textTrans == 'lower') {
    $('.text').addClass('text-lowercase');
  }

  var i = 1;
  slides[0].show();

  setInterval(function() {
    $('.slide').hide();
    $('.text').hide();
    slides[i].fadeIn(function() {
      $('.text').fadeIn(1200);
    });
    
    if (i == 5) {
      i = 0;
    } else {
      i++;
    }
  }, dataSpeed);

  console.log(dataSpeed);
}

$(document).ready(function() {
  fancySlide();
});
