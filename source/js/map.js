ymaps.ready(function () {
  var myMap = new ymaps.Map('location__map-container', {
          center: [59.938630, 30.323051],
          zoom: 18
      }),

  myPlacemark = new ymaps.Placemark([59.938630, 30.323051], {
      hintContent: 'ул. Большая Конюшенная, д. 19/8'
  }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.png',
      iconImageSize: [102, 90],
      iconImageOffset: [-46, -102]
  });

  myMap.geoObjects
      .add(myPlacemark);
});
