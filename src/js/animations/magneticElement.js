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

let started = 0
// Make an element follow the mouse, based on element position
DOM.areaAroundTarget.addEventListener('mousemove', (e) => {
	let distanceY = getPercentageOfValue(20, mouseDistanceFromElementY(e.pageY))
	let distanceX = getPercentageOfValue(20, mouseDistanceFromElementX(e.pageX))

	if (started === 0) {
		gsap.to(DOM.target, { autoAlpha: 1, duration: 0.7 })
		started = 1
	}

	gsap.to(DOM.target, {
		x: `${distanceX}px`,
		duration: 1,
		ease: 'linear'
	})

	gsap.to(DOM.target, {
		y: `${distanceY}px`,
		duration: 1,
		ease: 'linear'
	})
})
