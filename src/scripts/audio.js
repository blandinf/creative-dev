// MICROPHONE DETECTION

import EventDispatcher from './EventDispatcher';

let canvas = document.querySelector('#audio');
let c = canvas.getContext("2d");

console.log(canvas);
let bufferSize = 256;
let frequence = 0;
let amplitude = 0;
let maxAmplitude = 0;
let sum = 0;
let count = 0;
let avg = 0;
let deep = 0;
let high = 0;
let deepEvent = 0;
let highEvent = 0;
let none = 0;

let w = canvas.width;
let h = canvas.height;



let x = w / 2;
let y = h / 2;


navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        let context = new AudioContext();
        let mediaStream = context.createMediaStreamSource(stream);
        let analyser = context.createAnalyser();
        mediaStream.connect(analyser);
        analyser.fftSize = 2048;
        console.log(analyser);
        let frequencyData = new Uint8Array(analyser.frequencyBinCount);

        let numberOfInputChannels = 2;
        let numberOfOutputChannels = 2;
        let recorder;
        if (context.createScriptProcessor) {
            recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        } else {
            recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        }

        recorder.onaudioprocess = function (e) {
            let chanl = e.inputBuffer.getChannelData(0);
            let chanr = e.inputBuffer.getChannelData(1);
            amplitude = 0;
            frequence = 0;
            let mem = 0;
            let l = 0;
            let r = 0;
            for (let i in chanl) {
                l = chanl[i];
                r = chanr[i];
                amplitude += Math.abs(l)+Math.abs(r);
                if ((l<0 && mem>0) || (l>0 && mem<0))
                    frequence++;
                mem = l;

            }
            if (maxAmplitude<amplitude){
                maxAmplitude = amplitude;
            }

            sum += frequence;
            count++;

            if (count === 100){
                avg = sum/count;
                count = 0;
                sum = 0;
            }

            console.log(avg);

            if (avg < 10) {
                deep++;
            } else if (avg > 4.5 && avg < 7) {
                high++;
            } else {
                none++;
            }

            // if (high >= 35) {
            //     high = 0;
            //     highEvent++;
            //     EventDispatcher.dispatchEvent(new CustomEvent('test', {detail: {high: highEvent}}));
            // } else
             if (deep >= 20) {
                deep = 0;
                deepEvent++;
                EventDispatcher.dispatchEvent(new CustomEvent('test', {detail: {deep: deepEvent}}));
            } else if (none >= 200) {
                none = 0;
                highEvent = 0;
                deepEvent = 0;
                EventDispatcher.dispatchEvent(new CustomEvent('test', {detail: {none: 2}}));
            }


        };

        // draw sound analyser


        // function drawSound() {
        //
        //     analyser.getByteFrequencyData(frequencyData);
        //     c.clearRect(0,0,w,h);
        //
        //     let n = frequencyData.length;
        //
        //
        //     // c.beginPath();
        //     // // c.arc(x,y,  300, 0, 2 * Math.PI);
        //     // c.fill();
        //
        //     // ROND
        //     // for(let i in frequencyData) {
        //     //     let f = frequencyData[i];
        //     //     let a = 2*Math.PI*i/(n*0.4);
        //     //     c.beginPath();
        //     //     c.strokeStyle = "red";
        //     //     c.lineWidth = 2;
        //     //     c.moveTo(w/2+200*Math.cos(a),
        //     //         h/2+200*Math.sin(a));
        //     //     c.lineTo(w/2+(200+f)*Math.cos(a),
        //     //         h/2+(200+f)*Math.sin(a));
        //     //     c.stroke()
        //     //
        //     // }
        //
        //     window.requestAnimationFrame(drawSound);
        //
        // }
        // window.requestAnimationFrame(drawSound);

        mediaStream.connect(recorder);
        recorder.connect(context.destination);

    }).catch(function(err) {
    console.log("Stream not OK");

});




