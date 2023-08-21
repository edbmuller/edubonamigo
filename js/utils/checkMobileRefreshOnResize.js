import mobile from 'is-mobile'

const applyMobileClass = () => {
	if (mobile({ tablet: true })) {
		document.body.classList.add('--mobile')
	}
}

const refreshPage = () => {
	const width = window.innerWidth
	setTimeout(() => {
		if (width !== window.innerWidth) {
			window.location.reload()
			applyMobileClass()
		}
	}, 500)
}

window.addEventListener('DOMContentLoaded', applyMobileClass)
window.addEventListener('resize', refreshPage)
