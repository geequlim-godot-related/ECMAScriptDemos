const HEART = godot.load("res://addons/custom_node/heart.png");

export default class Heart extends godot.Node2D {
	_draw() {
		this.draw_texture(HEART, HEART.get_size() * new godot.Vector2(-0.5));
	}

	_get_item_rect() {
		let rect = new godot.Rect2(HEART.get_size() * new godot.Vector2(-0.5), HEART.get_size());
		console.log(rect);
		return rect;
	}
}
godot.set_script_meta(Heart, true);
