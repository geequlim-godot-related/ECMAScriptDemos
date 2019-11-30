export default class ColorButton extends godot.ColorPickerButton {
	
	get_drag_data(pos) {
		// Use another colorpicker as drag preview
		let cpb = new godot.ColorPickerButton();
		cpb.color = this.color;
		cpb.rect_size = new godot.Vector2(50, 50);
		this.set_drag_preview(cpb);
		// Return color as drag data
		return this.color;
	}
	
	can_drop_data(pos, data) {
		return data instanceof godot.Color;
	}
	
	drop_data(pos, data) {
		this.color = data;
	}
}
