var Q = {
	config: {
		hue: 0,
		textColor: 'hsl(' + this.hue + ', 100%, 50%)',
	},
	
	ready: function(fn) {
	  if (document.readyState != 'loading'){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	},

	getElements: function(elmSel) {
		return document.querySelectorAll(elmSel);
	},

	getElement: function(elmSel) {
		return document.querySelector(elmSel);
	},

	hasClass: function(el, className) {
		if (el.classList)
			return el.classList.contains(className);
		else
			return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	},

	addClass: function(el, className) {
		if (el.classList)
			el.classList.add(className);
		else
			el.className += ' ' + className;
	},

	removeClass: function(el, className) {
		if (el.classList)
			return el.classList.remove(className);
		else
			return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	},

	random: function(items) {
		return items[Math.floor(Math.random()*items.length)];
	},

	matches: function(el, selector) {
	  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	},

};

Q.ready(function() {
	var interestsParent = Q.getElement('.interests');
	var interestShown = Q.getElement('.interest-shown');
	var interests = interestsParent.children;
	var randomInterest = false;
	window.setInterval(function() {
		randomInterest = Q.random(interests);
		interestShown.textContent = randomInterest.textContent;
		// console.log(randomInterest);
		highlightInterest(randomInterest, interestsParent);
	}, 3000);
})

function highlightInterest(interest, interestsParent) {
	//find chosen interest spans
	var children = interestsParent.children;
	var chosenSpans = [];
	var dirtySpans = [];
	var chosenSpanCleaned = interest.className.replace('interest ','');

	Array.prototype.forEach.call(children, function(el, i){
		//Find all the spans with class interest--active
		if(Q.hasClass(el, 'interest--active')) {
			dirtySpans.push(el);
		}

		//Find all the spans with choses interest
		if(Q.hasClass(el, chosenSpanCleaned)) {
			chosenSpans.push(el);
		}
	});

	//remove already highlighted classes from siblings
	Array.prototype.forEach.call(dirtySpans, function(el, i){
		Q.removeClass(el, 'interest--active');
	});

	//add chosen interest highlight class
	Array.prototype.forEach.call(chosenSpans, function(el, i){
		Q.addClass(el, 'interest--active');
		// el.style.color = Q.config.hue;
	});

	Q.config.hue += 10;
}