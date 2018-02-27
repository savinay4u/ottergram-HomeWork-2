var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
/*------------Part-1, Declaration of variables for Navigation Buttons-------------------*/
var FirstSlide = 0, P = document.getElementById('previousImage'), N = document.getElementById('nextImage') ;
/*--------------------------------------------------------------------------------------*/
var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);

/*------------Part-2 Function Declaration for the thumbnail and getting the infromation from id attribut ----*/
function takeid(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('id');
}
/*-----------------------------------------------------------------------------------------------------*/

/*----------------Part-3 Next & Previous Slider function for the BUTTON tag in the HTML FILE-----------*/
function oldSlide() {
  var newvariable = (detailImage.getAttribute('id'));
  FirstSlide = Number(newvariable); slideNumber(FirstSlide - 1);
}

function newSlide() {
  var newvariable = (detailImage.getAttribute('id'));
  FirstSlide = Number(newvariable); slideNumber(FirstSlide + 1);
}

/*------------------------------------------------------------------------------------------------------*/
function setDetails(imageUrl, titleText, id) {
  'use strict';
  detailImage.setAttribute('src', imageUrl);
  detailImage.setAttribute('id', id);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), takeid(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

/*--------Part-4------------Logic For randomly clicked on thumbnails and counting towards next & previos slide---------*/
function slideNumber(number) {
  var countingArray = getThumbnailsArray();
  FirstSlide = (number + countingArray.length) % countingArray.length;
  setDetailsFromThumb(countingArray[FirstSlide]);
}
/*--------------------------------------------------------------------------------------------------------------------*/
N.onclick = function() { newSlide();
};

P.onclick = function() { oldSlide();
};

initializeEvents();
