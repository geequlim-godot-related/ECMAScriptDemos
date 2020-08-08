import BackgroundLoad from "./background_load";
export default class paintings extends godot.Node2D {
	_on_switch_pressed() {
		this.$('CanvasLayer/Switch').hide();
		BackgroundLoad.singleton.load_scene("res://sculptures.tscn");
	}
}
//# sourceMappingURL=paintings.jsx.map
