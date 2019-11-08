import * as Vibrant from 'node-vibrant';
import EventDispatcher from './EventDispatcher';

let img = {};
EventDispatcher.addEventListener('IMAGE::loaded', (e) => {
    img.src = e.detail.image.path;
    design();
});

EventDispatcher.addEventListener('ANIMATION::true', (e) => trueAnimation());
EventDispatcher.addEventListener('ANIMATION::false', (e) => falseAnimation());
EventDispatcher.addEventListener('ANIMATION::end', (e) => endAnimation());

async function design () {
    let input = document.querySelector('input');
    let mainColor = (await colors()).Vibrant.rgb;
    input.style.backgroundColor = `rgb(${mainColor[0]} , ${mainColor[1]} , ${mainColor[2]})`;
}

async function colors() {
    return await Vibrant.from(img.src).getPalette();
}

function trueAnimation() {

}

function falseAnimation() {

}

function endAnimation() {

}

