export default class CustomDock extends godot.EditorPlugin {
	dock = null;
	
	_enter_tree() {
		this.dock = godot.load("res://addons/custom_dock/custom_dock.tscn").instance();
		this.add_control_to_dock(godot.EditorPlugin.DOCK_SLOT_LEFT_UL, this.dock);
	}
	
	_exit_tree() {
		this.remove_control_from_docks(this.dock);
		this.dock.free();
	}
}
godot.set_script_meta(CustomDock, true);
