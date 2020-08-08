/** Set the script is runable in editor */
export function tool(target) {
    godot.set_script_tooled(target, true);
}
/** Set the script icon */
export function icon(icon) {
    return function (target) {
        godot.set_script_icon(target, icon);
    };
}
/** Register signal to godot script */
export function signal(target, property, descriptor) {
    var constructor = typeof (target) === 'function' ? target : target.constructor;
    var prototype = constructor.prototype;
    godot.register_signal(target, property);
    descriptor = descriptor || {};
    descriptor.value = property;
    descriptor.writable = false;
    Object.defineProperty(constructor, property, descriptor);
    Object.defineProperty(prototype, property, descriptor);
}
/**
 * Register property to godot class
 * @param value The default value of the property
 */
export function property(info) {
    return function (target, property, descriptor) {
        info = info || {};
        godot.register_property(target, property, info);
        return descriptor;
    };
}
/**
 * Return the node with `path` if the `_onready` is called
 * @param path The path or the type to get the node
 */
export function onready(path) {
    return function (target, property, descriptor) {
        const key = `$onready:${property}`;
        descriptor = descriptor || {};
        descriptor.set = function (v) { this[key] = v; };
        descriptor.get = function () {
            let v = this[key];
            if (!v) {
                v = this.get_node(path);
                this[key] = v;
            }
            return v;
        };
        return descriptor;
    };
}
/**
 * Register the member as a node property
 * **Note: The value is null before current node is ready**
 * @param path The default path name of the node
 */
export function node(target, property, descriptor) {
    const key = `$onready:${property}`;
    const path_key = `${property} `; // <-- a space at the end
    descriptor = descriptor || {};
    descriptor.set = function (v) { this[key] = v; };
    descriptor.get = function () {
        let v = this[key];
        if (!v) {
            v = this.get_node(this[path_key]);
            this[key] = v;
        }
        return v;
    };
    godot.register_property(target, path_key, { type: godot.TYPE_NODE_PATH });
    return descriptor;
}
/**
 * Register an enumeration property
 * @param enumeration Enumeration name list
 * @param default_value The default value of the property
 */
export function enumeration(enumeration, default_value) {
    return function (target, property, descriptor) {
        const pi = {
            hint: godot.PropertyHint.PROPERTY_HINT_ENUM,
            type: typeof (default_value) === 'string' ? godot.TYPE_STRING : godot.TYPE_INT,
            hint_string: '',
            default: typeof (default_value) === 'string' ? default_value : 0
        };
        for (let i = 0; i < enumeration.length; i++) {
            pi.hint_string += enumeration[i];
            if (i < enumeration.length - 1) {
                pi.hint_string += ',';
            }
        }
        godot.register_property(target, property, pi);
        return descriptor;
    };
}
//# sourceMappingURL=decorators.js.map