
// "HISTORY" button/link (from the navigation menu) dropdown menu

var dropdown_history = document.querySelector('#dropdown_history');
var nav_history = document.getElementById('nav_history_menu');

dropdown_history.addEventListener('mouseover', dropdownMenu);
function dropdownMenu() {
	nav_history_menu.style.display = 'block';
}

dropdown_history.addEventListener('mouseout', dropdownMenuOver);
function dropdownMenuOver() {
	nav_history_menu.style.display = 'none';
}


// IMAGES GALLERY SLIDE

var images = document.querySelectorAll('.slide img');
var crtImg = images[0];
var nextImg = images[1];
var displayTime = 4000;
var transitionTime = 500;
var step = 1/transitionTime;
var opacity = 1;
var interval;
var timeout;
var crtLink;
var nextLink;
var controlDiv = document.createElement('div');
controlDiv.className = 'controls';

for (i = 0; i < images.length; i++) {
	var link = document.createElement('a');
	link.innerHTML = 'Slide' + i;
	link.href = '#slide' + i;

	if (i == 0) {
		link.className = 'current';
		crtLink = link;
	}

	if (i == 1) {
		nextLink = link;
	}

	link.addEventListener('click', changeImage);
	controlDiv.appendChild(link);
}

var imageContainer = document.querySelector('.slide');
imageContainer.parentNode.insertBefore(controlDiv, imageContainer.nextElementSibling);


crtImg.className = 'visible';
nextImg.className = 'next';
timeout = setTimeout(startGallery, displayTime);

function startGallery() {
	interval = setInterval(transition, step);
}

function transition() {
	opacity -= step;
	crtImg.style.opacity = opacity;
	if (opacity <= 0) {
		opacity = 1;
		crtLink.className = '';
		crtLink = nextLink;
		nextLink = crtLink.nextElementSibling;
		if (!nextLink) {
			nextLink = document.querySelector('.controls a');
		}
		crtLink.className = 'current';

		crtImg.className = '';
		crtImg.style.opacity = 1;
		crtImg = nextImg;
		nextImg = crtImg.nextElementSibling;
		if (!nextImg) {
			nextImg = images[0];
		}
		crtImg.className = 'visible';
		nextImg.className = 'next';
		clearInterval(interval);
		timeout = setTimeout(startGallery, 4000);
	}
}

// Clicking on the button, you can change the image

function changeImage(event) {
	event.preventDefault();
	var index = parseInt(this.hash.slice(6), 10);
	if (!isNaN(index)) {
		opacity = 1;
		crtImg.style.opacity = 1;
		crtImg.className = '';
		nextImg.className = '';
		crtImg = images[index];
		index++;
		if (index >= images.length) {
			index = 0;
		}
		nextImg = images[index];
		crtImg.className = 'visible';
		nextImg.className = 'next';
		crtLink.className = '';
		crtLink = this;
		nextLink = crtLink.nextElementSibling;
		if (!nextLink) {
			nextLink = document.querySelector('.controls a');
		}
		crtLink.className = 'current';
		clearInterval(interval);
		clearTimeout(timeout);
		timeout = setTimeout(startGallery, displayTime);
	}
}


// ENLARGE LEGENDS PHOTOS WHEN CLICKING ON THEM

function showImage(event) {
	var imageOverlay = document.querySelector('.overlay');
	var imageSrc = this.getAttribute('href');
	var newImage = new Image();
	newImage.src = imageSrc;	

	var maxWidth = 0.6 * window.innerWidth;
	var maxHeight = 0.6 * window.innerHeight;

	newImage.addEventListener('load', function(){
		var width = newImage.width;
		var height = newImage.height;

		if (width > maxWidth) {
			height = height * maxWidth / width;
			width = maxWidth;
		}

		var marginLeft = width/2;
		var marginTop = height/2;

		var styles = 'width: ' + width + 'px; height: ' + height + 'px; margin-left: -' + marginLeft + 'px; margin-top: -' + marginTop + 'px;';
		newImage.style.cssText = styles;
		imageOverlay.appendChild(newImage);
		imageOverlay.style.display = 'block';
	});
	event.preventDefault();
}

window.addEventListener('load', function() {
	var links = document.querySelectorAll('.legend a');
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener('click', showImage);
	}

	var overlay = document.querySelector('.overlay');
	overlay.addEventListener('click', function(event) {
		if (overlay !== event.target) {
			return;
		}
		this.innerHTML = '';
		this.style.display = 'none';
	});
});


// CREATE A SMALLER HEADER WHEN SCROLLING DOWN THE PAGE

function init() {
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if (scroll >= 200) {
			$('.header').addClass('smaller');
		} else {
			$('.header').removeClass('smaller');
		}
	});
};

window.onload = init();



