const SIMULATED_DELAY_SEC = 0.1;
function load_resource(path) {
    const ril = godot.ResourceLoader.load_interactive(path);
    const total = ril.get_stage_count();
    globalThis.postMessage({ type: "start", total, path });
    let err = ril.poll();
    while (err == godot.OK) {
        let stage = ril.get_stage();
        godot.OS.delay_msec(SIMULATED_DELAY_SEC * 1000);
        globalThis.postMessage({ type: "progress", stage, total, path });
        err = ril.poll();
    }
    if (godot.ERR_FILE_EOF == err) {
        globalThis.postMessage({ type: "done", resource: Worker.abandonValue(ril.get_resource()), path });
    }
    else {
        globalThis.postMessage({ type: "error", error: err, path });
    }
}
const FUNCTIONS = {
    load_resource,
};
globalThis.onmessage = function (event) {
    if (event.function in FUNCTIONS) {
        const func = FUNCTIONS[event.function];
        func.apply(this, event.arguments);
    }
};
//# sourceMappingURL=worker.js.map