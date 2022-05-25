import gsap from 'gsap'

const DOM = {
	target: document.querySelector('.hello'),
	areaAroundTarget: document.querySelector('.section--contact')
}

const targetOffsetTop = DOM.target.offsetTop
const targetHeight = DOM.target.clientHeight
const targetOffsetLeft = DOM.target.offsetLeft
const targetWidth = DOM.target.clientWidth

const mouseDistanceFromElementY = (mouseY) =>
	mouseY - (targetOffsetTop + targetHeight / 2)

const mouseDistanceFromElementX = (mouseX) =>
	mouseX - (targetOffsetLeft + targetWidth / 2)

const getPercentageOfValue = (percentage, valueNumber) =>
	((percentage / 100) * valueNumber).toFixed(0)

const animationSettings = {
	duration: 0.4,
	ease: 'linear'
}

// Make an element follow the mouse when it gets far from it
DOM.areaAroundTarget.addEventListener('mousemove', (e) => {
	let distanceY = getPercentageOfValue(20, mouseDistanceFromElementY(e.pageY))
	let distanceX = getPercentageOfValue(20, mouseDistanceFromElementX(e.pageX))

	gsap.to(DOM.target, {
		x: `${distanceX}px`,
		animationSettings
	})

	gsap.to(DOM.target, {
		y: `${distanceY}px`,
		animationSettings
	})
})
