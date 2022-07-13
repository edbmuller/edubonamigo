import gsap from 'gsap'

const DOM = {
	target: document.querySelector('.contact__CTA__mask'),
	areaAroundTarget: document.querySelector('.section.contact')
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
	const distanceY = getPercentageOfValue(10, mouseDistanceFromElementY(e.pageY))
	const distanceX = getPercentageOfValue(10, mouseDistanceFromElementX(e.pageX))

	if (started === 0) {
		gsap.to(DOM.target, { autoAlpha: 1, duration: 0.6 })
		started = 1
	}

	gsap.to(DOM.target, {
		x: `${distanceX}px`,
		duration: 1,
		ease: 'power2.out'
	})

	gsap.to(DOM.target, {
		y: `${distanceY}px`,
		duration: 1,
		ease: 'power2.out'
	})
})
