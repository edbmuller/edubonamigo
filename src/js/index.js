import mobile from 'is-mobile'
import './checkMobileRefreshOnResize'

// TODO: Trigger after imagesLoaded
import './animations/loading-intro'

import './animations/toggle-theme'
import './animations/header-menu'
import './animations/projects'

import magneticElement from './animations/magneticElement'

if (!mobile({ tablet: true })) {
	magneticElement()
}

// TODO: ativar algum experimento com webgl quando usar o macete
console.log('Macete: → ↑ ← ↓ e d !')
