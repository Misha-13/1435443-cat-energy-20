var beforeButton = document.querySelector('.js-button-before');
var afterButton = document.querySelector('.js-button-after');

var changeSlide = function (slideType) {
  var currentSlide = document.querySelector('.slider__item--current');

  currentSlide.classList.remove('slider__item--current');

  var newCurrentSlide = document.querySelector('.js-slide-' + slideType);

  newCurrentSlide.classList.add('slider__item--current');

  var sliderBullet = document.querySelector('.slider__toggle-in');

  if (slideType === 'after') {
    sliderBullet.classList.remove('slider__toggle-in--before')
  } else {
    sliderBullet.classList.remove('slider__toggle-in--after')
  };

  sliderBullet.classList.add('slider__toggle-in--' + slideType);
}

beforeButton.addEventListener ('click', function() {
  changeSlide('before')
});

afterButton.addEventListener ('click', function() {
  changeSlide('after')
});
