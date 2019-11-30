const STEER_SPEED = 1;
const STEER_LIMIT = 0.4;


export default class Vehicle extends godot.VehicleBody {
	steer_angle = 0;
	steer_target = 0;
	
	_physics_process(delta) {
		let fwd_mps = this.transform.basis.xform_inv(this.linear_velocity).x;
		
		if (godot.Input.is_action_pressed("ui_left"))
			this.steer_target = STEER_LIMIT;
		else if (godot.Input.is_action_pressed("ui_right"))
			this.steer_target = -STEER_LIMIT;
		else
			this.steer_target = 0;
			
		if (godot.Input.is_action_pressed("ui_up"))
			this.engine_force = this.engine_force_value;
		else
			this.engine_force = 0;
			
		if (godot.Input.is_action_pressed("ui_down")) {
			if (fwd_mps >= -1)
				this.engine_force = - this.engine_force_value;
			else
				this.brake = 1;
		} else {
			this.brake = 0;
		}
		
		if (this.steer_target < this.steer_angle) {
			this.steer_angle -= STEER_SPEED * delta;
			if (this.steer_target > this.steer_angle)
				this.steer_angle = this.steer_target;
		} else if (this.steer_target > this.steer_angle) {
			this.steer_angle += STEER_SPEED * delta;
			if (this.steer_target < this.steer_angle)
				this.steer_angle = this.steer_target;
		}
		this.steering = this.steer_angle;
	}
	
}

godot.register_property(Vehicle, 'engine_force_value', 40);
