import EventDispatcher from './EventDispatcher';

let frequency = {};
let img = new Image();

EventDispatcher.addEventListener('test', (e) => {
    if (e.detail.high) {
        frequency.type = 'high';
        frequency.value = e.detail.high;
    } else if (e.detail.deep) {
        frequency.type = 'deep';
        frequency.value = e.detail.deep;
    } else {
        frequency.type = 'none';
        frequency.value = e.detail.none;
    }

    pixelate(frequency);
});

let ctx = canvas.getContext('2d');

EventDispatcher.addEventListener('IMAGE::loaded', (e) => {
    img.src = e.detail.image.path;
    img.onload = pixelate;
});

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function pixelate(frequency) {
    console.log(frequency.value)
    let size = frequency.value * 0.01;
    let w = canvas.width * size;
    let h = canvas.height * size;

    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}
