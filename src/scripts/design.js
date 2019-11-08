import * as Vibrant from 'node-vibrant';
import EventDispatcher from './EventDispatcher';

let img = {};
EventDispatcher.addEventListener('IMAGE::loaded', (e) => {
    img.src = e.detail.image.path;
    img.name = e.detail.image.name;
    img.year = e.detail.image.year;

    fillInfos();
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
    new Audio('../../public/assets/success.mp3').play()
}

function falseAnimation() {
    new Audio('../../public/assets/error.mp3').play()
}

function endAnimation() {
    new Audio('../../public/assets/win.mp3').play()
}

async function fillInfos() {
    let info = document.querySelector('.informations');

    // FILL TITLE
    let title = document.createElement("h2");
    title.classList.add('txt-white');
    let titleContent = document.createTextNode(img.name);
    title.appendChild(titleContent);



    let year = document.createElement("h2");
    year.classList.add('txt-white');
    let yearContent = document.createTextNode(img.year);
    year.appendChild(yearContent);

    info.appendChild(title);
    info.appendChild(year);

}
