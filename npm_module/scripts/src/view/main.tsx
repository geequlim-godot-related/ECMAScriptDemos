import { node } from '../decorators';

export default class main extends godot.Node2D {
	@node
	icon: godot.Sprite;

	_process(delta: number) {
		this.icon.rotation_degrees += 180 * delta;
	}
}
