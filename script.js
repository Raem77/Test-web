// Select all image containers
const images = document.querySelectorAll(".image-wrapper");

let topZ = 10;        // base for z-index stacking
let activeDrag = null; 
let offsetX = 0;
let offsetY = 0;

// For each image
images.forEach(wrapper => {

  wrapper.addEventListener("mousedown", function (e) {

    // Bring this image to the front
    topZ++;
    wrapper.style.zIndex = topZ;

    // Set up for dragging
    activeDrag = wrapper;
    offsetX = e.clientX - wrapper.offsetLeft;
    offsetY = e.clientY - wrapper.offsetTop;

    e.preventDefault(); // Prevent text selection
  });
});

// Move image with mouse
document.addEventListener("mousemove", function (e) {
  if (!activeDrag) return;

  activeDrag.style.left = (e.clientX - offsetX) + "px";
  activeDrag.style.top = (e.clientY - offsetY) + "px";
});

// Stop dragging on mouse up
document.addEventListener("mouseup", function () {
  activeDrag = null;
});