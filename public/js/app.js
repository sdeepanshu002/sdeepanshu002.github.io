const carousel = document.querySelector('.carousel');
let isMouseDown = false;
let startX;
let scrollLeft;

// Mouse Events for dragging the carousel
carousel.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing'; // Change cursor to grabbing
});

carousel.addEventListener('mouseleave', () => {
    isMouseDown = false;
    carousel.style.cursor = 'grab'; // Reset cursor when mouse leaves
});

carousel.addEventListener('mouseup', () => {
    isMouseDown = false;
    carousel.style.cursor = 'grab'; // Reset cursor on mouseup
});

carousel.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carousel.scrollLeft = scrollLeft - walk;
});

// Touch Events for Mobile Devices
carousel.addEventListener('touchstart', (e) => {
    isMouseDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
});

carousel.addEventListener('touchend', () => {
    isMouseDown = false;
    carousel.style.cursor = 'grab'; // Reset cursor on touchend
});

carousel.addEventListener('touchmove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});
