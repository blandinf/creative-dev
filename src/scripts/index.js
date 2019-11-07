import '../styles/index.scss';

let ctx = canvas.getContext('2d')
let img = new Image();

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


img.onload = pixelate;
img.src = '../public/assets/images/breaking.jpg';

function pixelate() {
    let size = blocks.value * 0.01;
    let w = canvas.width * size;
    let h = canvas.height * size;

    ctx.drawImage(img, 0, 0, w, h);
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}

blocks.addEventListener('change', pixelate, false);
