import global from "./global";

export default class SceneB extends godot.Panel {
	_on_goto_scene_pressed() {
		global.singleton.goto_scene("res://scene_a.tscn");
	}
}