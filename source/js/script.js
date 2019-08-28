/*Menu*/

var pageHeader = document.querySelector(".page-header");
pageHeader.classList.remove("page-header--nojs");

var menuBtn = document.querySelector(".button-burger");
var menu = document.querySelector(".main-nav");

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("button-burger--closed");
  menu.classList.toggle("page-header__toggle--closed");
});

/*slider*/
var sliderBeforeBtn = document.querySelector(".live-example__button-control--before");
var sliderAfterBtn = document.querySelector(".live-example__button-control--after");

var sliderBeforeImg = document.querySelector(".live-example__image-container--before");
var sliderAfterImg = document.querySelector(".live-example__image-container--after");
var sliderControlContainer = document.querySelector(".live-example__slider-before-after");
var sliderControl = document.querySelector(".live-example__slider-control");

var carouselControls = document.querySelector(".live-example__carousel-controls");

var MinX = 0;
var MaxX = sliderControlContainer.clientWidth;

//Before click
sliderBeforeBtn.addEventListener("click", function() {
  sliderBeforeImg.setAttribute("style", "clip: rect(0, 690px, 517px, 0);");
  sliderAfterImg.setAttribute("style", "clip: rect(0, 0, 517px, 0);");
  if (sliderControlContainer.classList.contains("live-example__slider-before-after--toggle")) {
    sliderControlContainer.classList.toggle("live-example__slider-before-after--toggle");
    sliderControl.style.left = MinX+"px";
  }
});

//After click
sliderAfterBtn.addEventListener("click", function() {
  sliderBeforeImg.setAttribute("style", "clip: rect(0, 0, 517px, 0);");
  sliderAfterImg.setAttribute("style", "clip: rect(0, 690px, 517px, 0);");
  if (!sliderControlContainer.classList.contains("live-example__slider-before-after--toggle")) {
    sliderControlContainer.classList.toggle("live-example__slider-before-after--toggle");
    sliderControl.style.left = MaxX+"px";
  }
});

//slider mouse move control ( Если останется время )
/*
var preview = document.querySelector(".live-example__preview");
var previewContainer = document.querySelector(".live-example__preview-container");
var previewRow = document.querySelector(".live-example__preview-row");
var container = document.querySelector(".live-example__container");
var row = document.querySelector(".live-example__row");

var isDown = false;
var offsetX = 0;

var x_current = 100;
/*
sliderControlContainer.addEventListener("mousedown", function(e) {
  isDown = true;
  offsetX = sliderControlContainer.offsetLeft - e.clientX;
});

sliderControlContainer.addEventListener("mouseup", function() {
  isDown = false;
});

sliderControlContainer.addEventListener("mousemove", function (e) {
  event.preventDefault();
  if (isDown) {
    //где находится курсор в позиции X
    var mousePositionX = event.clientX;
    //Вычитаем сдвиг всех внутренних контейнеров
    var x = mousePositionX - carouselControls.offsetLeft - previewRow.offsetLeft  - preview.offsetLeft  - container.offsetLeft - row.offsetLeft;

   //var x = x_current -  offsetX - mousePositionX;
    //x=0;
    console.log(Math.abs(offsetX + mousePositionX));
    if ((x >=MinX ) && (x <= MaxX)) {
      //задаем положение ползунка
      sliderControl.style.left = x+"px";

      //Высчитываем проценты
      var percent = x / MaxX;
    }


  }
});
*/
