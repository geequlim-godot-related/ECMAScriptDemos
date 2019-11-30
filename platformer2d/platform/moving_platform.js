export default class MovingPlatform extends godot.Node2D {
	accum = 0;
	
	_physics_process(delta) {
		this.accum += delta * (1 / this.cycle) * Math.PI * 2;
		this.accum = godot.fmod(this.accum, Math.PI * 2.0);
		let d = godot.sin(this.accum);
		let xf = new godot.Transform2D();
		xf.origin = this.motion * new godot.Vector2(d);
		this.get_node("Platform").transform = xf;
	}
}

godot.register_property(MovingPlatform, "motion", new godot.Vector2());
godot.register_property(MovingPlatform, "cycle", 1);
