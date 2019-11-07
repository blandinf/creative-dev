import '../styles/index.scss';

import './pixelate';
import './audio';

import * as Vibrant from 'node-vibrant';

async function mainColor() {
    let mainColor = await Vibrant.from('../../public/assets/breaking.jpg').getPalette();
    console.log(mainColor.Vibrant.rgb);
    return mainColors;
}

mainColor()
