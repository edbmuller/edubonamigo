import mobile from 'is-mobile'
import './utils/checkMobileRefreshOnResize'
// import { lazyLoadImages } from './utils/lazyLoad'

// TODO: Trigger after imagesLoaded
import './animations/load-init'

import './animations/toggle-theme'
import './animations/header-menu'
import './animations/projects'

import magneticElement from './animations/magneticElement'

if (!mobile({ tablet: true })) {
	magneticElement()
}

// TODO: ativar algum experimento com webgl quando usar o macete
console.log('Macete: → ↑ ← ↓ e d !')
