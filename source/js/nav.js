var navigationPane = document.querySelector('.main-nav');
var navigationButton = document.querySelector('.main-nav__toggle');

if (navigationButton.classList.contains('main-nav--nojs')) {
  navigationButton.classList.remove('main-nav--nojs');
}

if (window.innerWidth<768) {
  navigationPane.classList.add('main-nav--closed');
}

navigationButton.addEventListener('click', function(){
  if (navigationButton.classList.contains('main-nav__toggle--open')){
    navigationButton.classList.remove('main-nav__toggle--open');
    navigationButton.classList.add('main-nav__toggle--close');
    navigationPane.classList.remove('main-nav--closed');
  } else {
    navigationButton.classList.remove('main-nav__toggle--close');
    navigationButton.classList.add('main-nav__toggle--open');
    navigationPane.classList.add('main-nav--closed');
  }
});

window.addEventListener('resize', function(){
  if (window.innerWidth>768) {
    if (navigationPane.classList.contains('main-nav--closed')) {
      navigationPane.classList.remove('main-nav--closed');
      navigationButton.classList.remove('main-nav__toggle--close');
      navigationButton.classList.add('main-nav__toggle--open');
    } else {
      navigationButton.classList.remove('main-nav__toggle--open');
      navigationButton.classList.add('main-nav__toggle--close');
    };
  };
});

