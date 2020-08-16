export default class global extends godot.Node {
	static #sigleton;

	static get singleton() {
		return global.#sigleton;
	}

	constructor() {
		super();
		if (!global.#sigleton) {
			global.#sigleton = this;
		}
	}

	
	goto_scene(path) {
		this.call_deferred("_deferred_goto_scene", path);
	}
	
	_deferred_goto_scene(path) {
		this.get_tree().get_current_scene().free();
		let packed_scene = godot.ResourceLoader.load(path);
		let instanced_scene = packed_scene.instance();
		this.get_tree().get_root().add_child(instanced_scene);
		this.get_tree().set_current_scene(instanced_scene);
	}
	
}