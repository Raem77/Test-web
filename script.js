// all image in containers
const images = document.querySelectorAll(".image-wrapper");

let topZ = 10;        // z-index stacking
let activeDrag = null; 
let offsetX = 0;
let offsetY = 0;

// each image
images.forEach(wrapper => {

  wrapper.addEventListener("mousedown", function (e) {

    // Bring to front
    topZ++;
    wrapper.style.zIndex = topZ;

    // dragging
    activeDrag = wrapper;
    offsetX = e.clientX - wrapper.offsetLeft;
    offsetY = e.clientY - wrapper.offsetTop;

    e.preventDefault(); // Prevent text selection
  });

                                                               // double click -> expand or shrink
  wrapper.addEventListener("click", function () {

    // remove expanded from other images
    images.forEach(img => {
      if (img !== wrapper) {
        img.classList.remove("expanded");
      }
    });

    // toggle expanded class on this one
    wrapper.classList.toggle("expanded");

    // make sure expanded one is on top
    if (wrapper.classList.contains("expanded")) {
      topZ++;
      wrapper.style.zIndex = topZ;
    }

  });

});

                                                               // move image -> mouse
document.addEventListener("mousemove", function (e) {
  if (!activeDrag) return;

  activeDrag.style.left = (e.clientX - offsetX) + "px";
  activeDrag.style.top = (e.clientY - offsetY) + "px";
});

// stop dragging on mouse up
document.addEventListener("mouseup", function () {
  activeDrag = null;
});

                                                              // reset click -> original layout

const resetEye = document.getElementById("resetEye");

resetEye.addEventListener("click", function () {

  // close the eye 
  resetEye.src = resetEye.dataset.closed;

  // fade images 
  images.forEach(wrapper => {
    wrapper.style.opacity = "0.4";
  });

  // small delay so blink feels intentional
  setTimeout(() => {

    topZ = 10; // reset stacking

    images.forEach(wrapper => {

      // remove expanded state
      wrapper.classList.remove("expanded");

      // remove drag positioning
      wrapper.style.left = "";
      wrapper.style.top = "";
      wrapper.style.zIndex = "";
      wrapper.style.opacity = "1";

    });

    // reopen the eye
    resetEye.src = resetEye.dataset.open;

  }, 400); // 300ms delay

});