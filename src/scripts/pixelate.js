/* eslint-disable */
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
    console.log(frequency.value);
    let size = frequency.value * 0.01;
    let w = canvas.width * size;
    let h = canvas.height * size;

    // gradient on canvas image
    ctx.drawImage(img, 0, 0, w, h);
    // ctx.globalCompositeOperation = ;


    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    var gradient = ctx.createLinearGradient(0, 90, 400, 90);
    gradient.addColorStop(0, 'rgba(20,20,20,1)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);



}
