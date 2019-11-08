// import EventDispatcher from './EventDispatcher';
//
// EventDispatcher.addEventListener('CHRONO::start', () => chrono.start(10));
//
// let chrono = {
// 	secondsLeft: 0,
// 	timer: undefined,
//
// 	start: function(secondsLeft) {
// 		this.secondsLeft = secondsLeft;
// 		this.timer = setInterval(this.tick.bind(this), 1000);
// 	},
//
// 	tick: function() {
// 		document.getElementById("time").innerHTML = --this.secondsLeft;
// 		if(this.secondsLeft === 0) {
// 			this.stop();
// 		}
// 	},
//
// 	stop: function() {
// 		clearInterval(this.timer);
// 		EventDispatcher.dispatchEvent(new CustomEvent('ANIMATION::false'));
// 	}
//
// };