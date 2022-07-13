import gsap from 'gsap'

const DOM = {
	cursor: document.querySelector('.custom-cursor'),
	cursorDisabled: true,
	subtitles: document.querySelectorAll('h2'),
	menuItems: document.querySelectorAll('.header__menu__item'),
	scrolls: document.querySelectorAll('.scroll-icon'),
	projects: document.querySelectorAll('h3'),
	contact: document.querySelectorAll('.contact__CTA__link')
}

const moveCursor = (e) =>
	gsap.to(DOM.cursor, { duration: 0.7, x: e.clientX, y: e.clientY })

const showCursor = () => {
	gsap.to(DOM.cursor, {
		ease: 'power2.out',
		duration: 1,
		opacity: 1,
		delay: 0.4
	})
}

const activeCursor = () => {
	if (DOM.cursorDisabled) {
		showCursor()
		window.removeEventListener('mousemove', activeCursor)
	}
}

export default function initCursor() {
	if (DOM.cursor) {
		window.addEventListener('mousemove', activeCursor)
		window.addEventListener('mousemove', moveCursor)

		const smallTriggers = [...DOM.subtitles, ...DOM.menuItems]
		const mediumTriggers = [...DOM.projects]
		const largeTriggers = [...DOM.scrolls, ...DOM.contact]

		smallTriggers.forEach((target) => {
			target.addEventListener('mouseenter', () =>
				DOM.cursor.classList.add('--active', '--small')
			)
		})
		smallTriggers.forEach((target) => {
			target.addEventListener('mouseout', () =>
				DOM.cursor.classList.remove('--active', '--small')
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

		largeTriggers.forEach((item) => {
			item.addEventListener('mouseenter', () => {
				DOM.cursor.classList.add('--active', '--large')
			})
		})
		largeTriggers.forEach((item) => {
			item.addEventListener('mouseout', () =>
				DOM.cursor.classList.remove('--active', '--large')
			)
		})
	}
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
