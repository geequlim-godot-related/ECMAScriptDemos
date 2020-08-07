export default class SceneB extends godot.Panel {
	_on_goto_scene_pressed() {
		this.get_node("/root/global").goto_scene("res://scene_a.tscn");
	}
}