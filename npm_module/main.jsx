const TWEEN = require('@tweenjs/tween.js');

export default class main extends godot.Node2D {

	_ready() {
		const icon = this.get_node("icon");
		const coords = new godot.Vector2(0, 0); // Start at (0, 0)
		const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
			.to({x: this.get_viewport().size.x, y: this.get_viewport().size.y}, 2500) // Move to (300, 200) in 1 second.
			.easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
			.onUpdate(() => {
				icon.position = coords;
			}).start().repeat(1000); // Start the tween immediately.
	}

	_process() {
		TWEEN.update(godot.OS.get_system_time_msecs());
	}
}
