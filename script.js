let slides = document.getElementsByClassName("slide");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");
// image indicator (circle-button) declaration
const indexIndicator = document.getElementsByClassName("index");
/* Declaration to prevent double triggering while the transition is running */
let isTransitioning = false;
// image indicator-container
const indexContainer = document.getElementById("indexContainer");

// adding remove blur & black film effect
nextBtn.addEventListener("mouseenter", () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add("btn-hover-state");
  }
});

// removing blur & black film effect remover
nextBtn.addEventListener("mouseleave", () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("btn-hover-state");
  }
});

// adding remove blur & black film effect
backBtn.addEventListener("mouseenter", () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add("btn-hover-state");
  }
});

// removing blur & black film effect remover
backBtn.addEventListener("mouseleave", () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("btn-hover-state");
  }
});

// adding remove blur & black film effect
indexContainer.addEventListener("mouseenter", () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.add("btn-hover-state");
  }
});

// removing blur & black film effect remover
indexContainer.addEventListener("mouseleave", () => {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("btn-hover-state");
  }
});

// swiper effect
const slider = document.getElementById("slider");
let slideCount = slides.length;
const slideWidth = slides[0].offsetWidth;
// set the proper index for the first slide
// (real slide note cloned slide)
let index = 1;

// clone slide
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slideCount - 1].cloneNode(true);

// reference to the first slide & last slide (note cloned slide)
let firstSlide = slides[0];
let lastSlide = slides[slides.length - 1];

// append cloned slide to the slider (container)
firstClone.classList.remove("slide1");
firstClone.id = "first-clone";
lastClone.classList.remove("slide7");
lastClone.id = "last-clone";
slider.insertBefore(lastClone, firstSlide);
slider.appendChild(firstClone);

// new get & access the slide element (all) again
// for update slide HTMLCollection
slides = document.getElementsByClassName("slide");
// assign new slide.length to <slideCount variable>
slideCount = slides.length;

// adjust new width of the slider (slide container)
slider.style.width = `${slideWidth * slideCount}px`;
slider.style.transition = "none";
// move slide to the correct slide (index 1) on loading
updateSlide();
// add the first indicator button to active
indicatorOnLoad();

// add next slide command to the next button
nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  index = index + 1;
  if (index < 0) {
    index = slideCount - 1;
  } else if (index > slideCount - 1) {
    index = 0;
  }
  slider.style.transition = "";
  updateSlide();
  updateActiveIndicator();
});

// add back slide command to the back button
backBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;
  index = index - 1;
  if (index < 0) {
    index = slideCount - 1;
  } else if (index > slideCount - 1) {
    index = 0;
  }
  slider.style.transition = "";
  updateSlide();
  updateActiveIndicator();
});

// transition manipulation on slider
slider.addEventListener("transitionend", () => {
  const currentSlide = slides[index];
  if (currentSlide.id === "first-clone") {
    // 🢁 if current slide is first-clone (index 0)
    // operate the code in block scope
    slider.style.transition = "none";
    index = 1; // jump to real first slide (index 1)
    updateSlide();
  }

  if (currentSlide.id === "last-clone") {
    // 🢁 if current slide is last-clone (index 8)
    // operate the code in block scope
    slider.style.transition = "none";
    index = slideCount - 2; // jump to real slide (index 7)
    updateSlide();
  }
  /* give back transitioning ability to the slider when operation of all
  block scope is done.  */
  isTransitioning = false;
});

// 🢃 update slide function
function updateSlide() {
  slider.style.transform = `translateX(-${index * slideWidth}px)`;
}

// function for update active indicator (circle-button)
function updateActiveIndicator() {
  let dotIndex = index - 1; // start from current index (minus clone offset)
  // index - 1 (1 > 0, 2 > 1, 3 > 2 , 4 > 3, 5 > 4, 6 > 5, 7 > 6)
  // 🢁 for syncing the index of image and the indicator to the same
  if (dotIndex < 0) {
    // 🢁  if the index less than 0 go to 6 (7 - 1)
    // index of the pic has 9 (0 - 9) while the index-indicator has 7 (0 - 6)
    dotIndex = indexIndicator.length - 1;
  } else if (dotIndex > indexIndicator.length - 1) {
    // 🢁 if the index grater than 7 return to 0
    // index of the pic has 9 (0 - 9)
    // but index of the button has 7 (0 - 6)
    dotIndex = 0;
  }

  for (let i = 0; i < indexIndicator.length; i++) {
    indexIndicator[i].classList.remove("active");
  }
  indexIndicator[dotIndex].classList.add("active");
  // 🡻 for debugging
  console.log("dotIndex:", dotIndex, "| index:", index);
}

// add EventListener to the indicatorButton (0-6)
for (let i = 0; i < indexIndicator.length; i++) {
  indexIndicator[i].addEventListener("click", function () {
    const isButtonActive = this.classList.contains("active");
    if (isTransitioning || isButtonActive) {
      return;
    }
    isTransitioning = true;
    for (let j = 0; j < indexIndicator.length; j++) {
      indexIndicator[j].classList.remove("active");
    }
    this.classList.add("active");
    index = i + 1;
    // if index is 0 | index should be 1
    // if index is 1 | index should be 2
    // if index is 2 | index should be 3
    // if index is 3 | index should be 4
    // if index is 4 | index should be 5
    // if index is 5 | index should be 6
    // if index is 6 | index should be 7
    // index is (0, 1, 2, 3, 4, 5, 6, 7, 8) index's length is 9
    // index of indicator is (0, 1, 2, 3, 4, 5, 6) index of indicator's length is 7
    slider.style.transition = "";
    updateSlide();
    console.log("this is i:", i, "this is index:", index);
  });
}

// function initialize indicator active (first button)
function indicatorOnLoad() {
  for (let i = 0; i < indexIndicator.length; i++) {
    indexIndicator[i].classList.remove("active");
  }
  indexIndicator[0].classList.add("active");
}
