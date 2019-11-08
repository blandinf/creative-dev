import * as Vibrant from 'node-vibrant';

let input = document.querySelector('input');

async function mainColor() {
    let colors = await Vibrant.from('../../public/assets/breaking.jpg').getPalette();
    let mainColor = colors.Vibrant.rgb;
    input.style.backgroundColor = `rgb(${mainColor[0]} , ${mainColor[1]} , ${mainColor[2]})`;

    return mainColor;
}

mainColor();