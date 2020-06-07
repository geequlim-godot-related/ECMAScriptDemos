export default class FollowCamera extends godot.Camera {
	collision_exception = [];
	max_height = 2.0;
	min_height = 0;
	
	_ready() {
		// Find collision exceptions for ray
		let node = this;
		let collision_exception = this.collision_exception;
		while (node) {
			if (node instanceof godot.RigidBody) {
				collision_exception.push(node.get_rid());
				break;
			} else {
				node = node.get_parent();
			}
		}
		this.collision_exception = collision_exception;
		// This detaches the camera transform from the parent spatial node
		this.set_as_toplevel(true);
	}
	
	_physics_process(dt) {
		let target = this.get_parent().get_global_transform().origin;
		let pos = this.get_global_transform().origin;
		let up = godot.Vector3.UP;
		var delta = pos - target;
		// Regular delta follow
		
		// Check ranges
		if (delta.length() < this.min_distance)
			delta = delta.normalized() * new godot.Vector3(this.min_distance);
		if (delta.length() > this.max_distance)
			delta = delta.normalized() * new godot.Vector3(this.max_distance);
		
		// Check upper and lower height
		if (delta.y > this.max_height)
			delta.y = this.max_height;
		if (delta.y < this.min_height)
			delta.y = this.min_height;
		
		pos = target + delta;
		
		this.look_at_from_position(pos, target, up);
		
		// Turn a little up or down
		var t = this.get_transform();
		t.basis = new godot.Basis(t.basis.x, godot.deg2rad(this.angle_v_adjust)) * t.basis;
		this.set_transform(t);
	}
}

godot.register_property(FollowCamera, 'min_distance', 0.5);
godot.register_property(FollowCamera, 'max_distance', 4);
godot.register_property(FollowCamera, 'angle_v_adjust', 0);
godot.register_property(FollowCamera, 'autoturn_ray_aperture', 25);
godot.register_property(FollowCamera, 'autoturn_speed', 50);
