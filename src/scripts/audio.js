// MICROPHONE DETECTION

import EventDispatcher from './EventDispatcher';

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

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        let context = new AudioContext();
        let mediaStream = context.createMediaStreamSource(stream);
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

            if (count === 150){
                avg = sum/count;
                count = 0;
                sum = 0;
            }

            if (avg > 1 && avg < 4) {
                deep++;
            } else if (avg > 4.5 && avg < 7) {
                high++;
            } else {
                none++;
            }

            if (high >= 35) {
                high = 0;
                highEvent++;
                EventDispatcher.dispatchEvent(new CustomEvent('test', {detail: {high: highEvent}}));
            } else if (deep >= 35) {
                deep = 0;
                deepEvent++;
                EventDispatcher.dispatchEvent(new CustomEvent('test', {detail: {deep: deepEvent}}));
            } else if (none >= 250) {
                none = 0;
                highEvent = 0;
                deepEvent = 0;
                EventDispatcher.dispatchEvent(new CustomEvent('test', {detail: {none: 2}}));
            }
        };
        mediaStream.connect(recorder);
        recorder.connect(context.destination);

    }).catch(function(err) {
    console.log("Stream not OK");

});
