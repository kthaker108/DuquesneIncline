// helped with toggling of menu icon:https://stackoverflow.com/questions/63320999/how-can-we-close-a-toggle-menu-with-an-outside-click

document.addEventListener('DOMContentLoaded', function() {
	const menuToggle = document.getElementById('menuToggle');
	const navLinks = document.getElementById('navLinks');
	const navOverlay = document.getElementById('navOverlay');

	menuToggle.addEventListener('click', function() {
		menuToggle.classList.toggle('active');
		navLinks.classList.toggle('active');
		navOverlay.classList.toggle('active');

		if (navLinks.classList.contains('active')) {
		  document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	navOverlay.addEventListener('click', function() {
		menuToggle.classList.remove('active');
		navLinks.classList.remove('active');
		navOverlay.classList.remove('active');
		document.body.style.overflow = '';
	});

	const links = document.querySelectorAll('.webLinks');
	links.forEach(link => {
		link.addEventListener('click', function() {
			menuToggle.classList.remove('active');
			navLinks.classList.remove('active');
			navOverlay.classList.remove('active');
			document.body.style.overflow = '';
		});
	});
});

function highlightActiveLink() {
	var currentPage = window.location.pathname.split('/').pop();
	if (currentPage == '') {
		currentPage = 'index.html';
	}
	var links = document.querySelectorAll('nav a');
	links.forEach(function(link) {
		var href = link.getAttribute('href');
		if (href.endsWith(currentPage)) {
			link.classList.add('active');
		}
	});
}

$("#longIntro").hide();
$("#readLessID").hide();

$("#readMoreID").click(function() {
	$("#longIntro").show();
	$("#readMoreID").hide();
	$("#readLessID").show();
});

$("#readLessID").click(function() {
	$("#longIntro").hide();
	$("#readMoreID").show();
	$("#readLessID").hide();
});

// for carousel slideshow movement: https://stackoverflow.com/questions/41541559/multiple-slideshows-on-one-page-makes-the-first-one-not-work-anymore
document.addEventListener('DOMContentLoaded', function() {
	let slideIndex = 1;
	showSlides(slideIndex);

	window.plusSlides = function(n) {
		showSlides(slideIndex += n);
	};

	window.currentSlide = function(n) {
		showSlides(slideIndex = n);
	};

	function showSlides(n) {
		let slides = document.getElementsByClassName("mySlides");
		let dots = document.getElementsByClassName("dot");

		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }

		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}

		for (let i = 0; i < dots.length; i++) {
			dots[i].classList.remove("active");
		}

		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].classList.add("active");
	}
});

// geolocation API reference: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API

document.addEventListener('DOMContentLoaded', function() {
	const calculateBtn = document.getElementById('calculateDistance');
	const resultElement = document.getElementById('distanceResult');

	const inclineLocation = {
		lat: 40.4406,
		lng: -80.0184
	};

	calculateBtn.addEventListener('click', function() {
		resultElement.textContent = "Getting your location...";

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					const userLocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					const distance = calculateDistance(userLocation, inclineLocation);

					resultElement.textContent = `You are approximately ${distance.toFixed(1)} miles from the Duquesne Incline.`;
				},
				function(error) {
					resultElement.textContent = "Unable to get your location. Please make sure location services are enabled.";
				}
			);
		} else {
			resultElement.textContent = "Geolocation is not supported by your browser.";
		}
	});


  // https://www.movable-type.co.uk/scripts/latlong.html?from=48.86,-122.0992&to=48.8599,-122.1449
	function calculateDistance(point1, point2) {
		const R = 3958.8;

		const lat1Rad = point1.lat * Math.PI / 180;
		const lat2Rad = point2.lat * Math.PI / 180;
		const latDiff = (point2.lat - point1.lat) * Math.PI / 180;
		const lngDiff = (point2.lng - point1.lng) * Math.PI / 180;

		const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
			Math.cos(lat1Rad) * Math.cos(lat2Rad) *
			Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;

		return distance;
	}
});
