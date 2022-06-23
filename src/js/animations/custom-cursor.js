import gsap from 'gsap'

const DOM = {
	cursor: document.querySelector('.custom-cursor'),
	cursorDisabled: true,
	subtitles: document.querySelectorAll('h2'),
	menuItems: document.querySelectorAll('.menu__item'),
	scrolls: document.querySelectorAll('.--scroll'),
	projects: document.querySelectorAll('h3'),
	contact: document.querySelectorAll('.hello')
}

const moveCursor = (e) =>
	gsap.to(DOM.cursor, { duration: 0.5, x: e.clientX, y: e.clientY })

const showCursor = () => {
	gsap.to(DOM.cursor, {
		ease: 'power2.out',
		duration: 1,
		delay: 0.3,
		css: { opacity: 0.7 }
	})
}

const activeCursor = () => {
	if (DOM.cursorDisabled) {
		showCursor()
		window.removeEventListener('mousemove', activeCursor)
	}
}

export default function initCursor() {
	window.addEventListener('mousemove', activeCursor)
	window.addEventListener('mousemove', moveCursor)

	let smallTriggers = [...DOM.subtitles, ...DOM.menuItems]
	let mediumTriggers = [...DOM.projects]
	let largeTriggers = [...DOM.contact]

	smallTriggers.forEach((target) => {
		target.addEventListener('mouseenter', () =>
			DOM.cursor.classList.add('--active')
		)
	})
	smallTriggers.forEach((target) => {
		target.addEventListener('mouseout', () =>
			DOM.cursor.classList.remove('--active')
		)
	})

	mediumTriggers.forEach((item) => {
		item.addEventListener('mouseenter', () =>
			DOM.cursor.classList.add('--active', '--medium')
		)
	})
	mediumTriggers.forEach((item) => {
		item.addEventListener('mouseout', () =>
			DOM.cursor.classList.remove('--active', '--medium')
		)
	})

	DOM.scrolls.forEach((item) => {
		item.addEventListener('mouseenter', () => {
			DOM.cursor.classList.add('--active', '--large')
		})
	})
	DOM.scrolls.forEach((item) => {
		item.addEventListener('mouseout', () =>
			DOM.cursor.classList.remove('--active', '--large')
		)
	})
}

// DOM.menuItem.forEach(function (el) {
//   el.addEventListener('mouseover', () => {
//     gsap.to(DOM.cursor, 0.25, {
//       scale: 1,
//       autoAlpha: 1,
//     })
//   })
// }

// 	el.addEventListener('mouseout', () => {
// 		gsap.to(button, 0.25, {
// 			scale: 0.5,
// 			autoAlpha: 0
// 		})
// 	})

// 	el.addEventListener('mousedown', () => {
// 		gsap.to(button, 0.5, {
// 			css: { transform: `translate(-50%, -50%) scale(0.75)` }
// 		})

// 		gsap.to(buttonText, 0.25, {
// 			css: { opacity: 1 }
// 		})
// 	})

// 	el.addEventListener('mouseup', () => {
// 		gsap.to(button, 1, {
// 			css: { background: `transparent` }
// 		})

// 		gsap.to(button, 0.5, {
// 			css: { transform: `translate(-50%, -50%) scale(1)` }
// 		})

// 		gsap.to(buttonText, 0.25, {
// 			css: {
// 				opacity: 1
// 			}
// 		})
// 	})
// })
