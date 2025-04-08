const menuBtn = document.querySelector("#menu-btn");
const navBox = document.querySelector("#nav-box");
const btnBox = document.querySelector("#names-box");
const tagsBtn = document.querySelectorAll(".tags-btn");
const tagsContent = document.querySelectorAll(".tags-content");

// RESPONSIVE NAVIGATION MENU

function responsiveMenu() {
	const layer = document.querySelector("#layer");
	if (!layer.classList.contains("layer-active")) {
		navBox.style.transform = "translateX(0)";
				navBox.style.boxShadow = "0 0 50px 20px rgba(0, 0, 0, 0.767)";
		layer.classList.add("layer-active");
	} else if (layer.classList.contains("layer-active")) {
		navBox.style.transform = "translateX(100%)";
		navBox.style.boxShadow = "0 0 50px 0 rgba(0, 0, 0, 0.767)";
		layer.classList.remove("layer-active");
	}
}

menuBtn.addEventListener("click", responsiveMenu);

btnBox.addEventListener("click", function (e) {
	tagsBtn.forEach((btn) => btn.classList.remove("btn-active"));
	const clicked = e.target.closest(".tags-btn");
	clicked.classList.add("btn-active");

	tagsContent.forEach((tag) => tag.classList.remove("content-active"));
	document
		.querySelector(`.content-section-${clicked.dataset.tag}`)
		.classList.add("content-active");
});

// SCROLL INTO VIEW

navBox.addEventListener("click", function (e) {
	const clicked = e.target
		.closest(".nav-links")
		.querySelector("a")
		.getAttribute("href");
	document.querySelector(clicked).scrollIntoView({ behavior: "smooth" });
});

// STICKY NAVIGATION MENU
const nav = document.querySelector("nav");
const navHeight = nav.getBoundingClientRect().height;
const banner = document.querySelector("#banner");

const stickyMenu = function (entries) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			nav.classList.add("sticky__menu--active");
			banner.style.marginTop = `${navHeight}px`;
		} else {
			banner.style.marginTop = "0";
			nav.classList.remove("sticky__menu--active");
		}
	});
};

const observerOptions = {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(stickyMenu, observerOptions);
observer.observe(banner);

// ACTIVE IMAGES
const images = document.querySelectorAll(".images");

const loadImg = function (entries, observer) {
	entries.forEach( (entr) => {
		if (entr.isIntersecting) {
			entr.target.classList.add('img-active')
			observer.unobserve(entr.target)
		}
	})

};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0.5,
});

images.forEach((img) => imgObserver.observe(img));
