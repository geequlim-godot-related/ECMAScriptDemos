export default class HeartPlugin extends godot.EditorPlugin {
	_enter_tree() {
		this.add_custom_type(
			"Heart",
			"Node2D",
			godot.load("res://addons/custom_node/heart.js"),
			godot.load("res://addons/custom_node/heart_icon.png")
		);
	}
	
	_exit_tree() {
		this.remove_custom_type("Heart");
	}
}
godot.set_script_tooled(HeartPlugin, true);
