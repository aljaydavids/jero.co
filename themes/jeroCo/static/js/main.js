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
			return el.classList.contains(className.trim());
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
	// var interestShown = Q.getElement('.interest-shown');
	shuffleInterests();
	var interests = interestsParent.children;
	var randomInterest = false;
	window.setInterval(function() {
		randomInterest = Q.random(interests);
		// interestShown.textContent = randomInterest.textContent;
		// console.log(randomInterest);
		highlightInterest(randomInterest, interestsParent);
	}, 2600);

	//track events
	Q.getElement('#link-twitter-profile').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'view twitter profile');
    }, false);

    Q.getElement('#link-linkedin-profile').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'view linkedIn profile');
    }, false);

    Q.getElement('#link-behance-profile').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'view behance profile');
    }, false);

    Q.getElement('#link-github-profile').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'view github profile');
    }, false);

    Q.getElement('.logo').addEventListener('click', function() {
        ga('send', 'event', 'external', 'click', 'click logo');
    }, false);
});

function shuffleInterests() {
	var interestsParent = Q.getElement('.interests');
	for (var i = interestsParent.children.length; i >= 0; i--) {
	    interestsParent.appendChild(interestsParent.children[Math.random() * i | 0]);
	}
}


function highlightInterest(interest, interestsParent) {
	//find chosen interest spans
	var children = interestsParent.children;
	var chosenSpans = [];
	var dirtySpans = [];
	var chosenSpanCleaned = interest.className.replace('interest ','').replace('interest--active','');

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