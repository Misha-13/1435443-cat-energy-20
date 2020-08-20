ymaps.ready(function () {
  var myMap = new ymaps.Map(document.querySelector('.map'), {
        center: [59.938635, 30.323117],
        zoom: 14,
        controls: []
      }, {
          searchControlProvider: 'yandex#search'
      }),

      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'CatEnergy',
      }, {
          iconLayout: 'default#image',
          iconImageHref: '../img/map-pin.png',
          iconImageSize: [57, 53],
          iconImageOffset: [-5, -38]
      });

  myMap.geoObjects.add(myPlacemark);

  myMap.events.add('mouseenter', function () {
    myMap.controls.add('default');
  });
});

var mapImg = document.querySelector(".map__img");
mapImg.classList.add("map__img--hide");
