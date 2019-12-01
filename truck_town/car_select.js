export default class CarSelect extends godot.Control {
	town = null;
	
	_back() {
		this.town.queue_free();
		this.show();
	}
	
	_load_scene(car) {
		let tt = godot.load(car).instance();
		tt.name = "car";
		this.town = godot.load("res://town_scene.tscn").instance();
		this.town.get_node("instance_pos").add_child(tt);
		this.town.get_node("back").connect(godot.BaseButton.pressed, this, '_back');
		this.get_parent().add_child(this.town);
		this.hide();
	}
	
	_on_van_1_pressed() {
		this._load_scene("res://car_base.tscn");
	}
	
	_on_van_2_pressed() {
		this._load_scene("res://trailer_truck.tscn");
	}


	_on_van_3_pressed() {
		this._load_scene("res://crane.tscn");
	}
}
