export default class Bullet extends godot.RigidBody2D {
	
	_on_bullet_body_enter(body) {
		if (body.hit_by_bullet) {
			body.hit_by_bullet();
		}
	}
	
	_on_Timer_timeout() {
		this.get_node('Anim').play('shutdown');
	}
}
