import global from "./global";

export default class SceneA extends godot.Panel {
	_on_goto_scene_pressed() {
		global.singleton.goto_scene("res://scene_b.tscn");
	}
}
