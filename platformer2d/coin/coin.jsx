import Player from "../player/player";

export default class Coin extends godot.Area2D {
	taken = false;
	
	_on_coin_body_entered(body) {
		if (!this.taken && body instanceof Player) {
			this.$("Anim").play("taken");
			this.taken = true;
		}
	}
}
