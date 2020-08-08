import BackgroundLoad from "./background_load";
export default class sculptures extends godot.Node2D {
	_on_switch_pressed() {
		this.$('CanvasLayer/Switch').hide();
		BackgroundLoad.singleton.load_scene("res://paintings.tscn");
	}
}
//# sourceMappingURL=sculptures.jsx.map
