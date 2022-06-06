import { ScrollbarPlugin } from 'smooth-scrollbar'

export default class MobilePlugin extends ScrollbarPlugin {
	// Fix scroll speed on mobile
	static pluginName = 'mobile'
	static defaultOptions = {
		speed: 0.5
	}

	transformDelta(delta, fromEvent) {
		if (fromEvent.type !== 'touchend') {
			return delta
		}

		return {
			x: delta.x * this.options.speed,
			y: delta.y * this.options.speed
		}
	}
}
