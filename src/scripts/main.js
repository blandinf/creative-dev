import EventDispatcher from './EventDispatcher';

let images;
function loadDatas() {
    const req = new XMLHttpRequest();
    req.open('GET', './images.json', false);
    req.send(null);

    if (req.status === 200) {
        images = JSON.parse(req.responseText);
        EventDispatcher.dispatchEvent(new CustomEvent('IMAGE::loaded', {detail: {image: images[0]}}));
    } else {
       console.log(req.statusText);
    }
}

loadDatas();

let i=0;
const input = document.querySelector('input');
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        if ((e.target.value).toLowerCase() === (images[i].name).toLowerCase()) {
            i++;
            e.target.value = '';
            if (i < images.length) {
                EventDispatcher.dispatchEvent(new CustomEvent('test', {detail: {deep: 50}}));
                EventDispatcher.dispatchEvent(new CustomEvent('ANIMATION::true'));
                EventDispatcher.dispatchEvent(new CustomEvent('IMAGE::loaded', {detail: {image: images[i]}}));
            } else {
                EventDispatcher.dispatchEvent(new CustomEvent('ANIMATION::end'));
            }
        } else {
            e.target.value = '';
            EventDispatcher.dispatchEvent(new CustomEvent('ANIMATION::false'));
        }
    }
});