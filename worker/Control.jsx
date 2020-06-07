import fib from "./fib";

const N = 35;


export default class Control extends godot.Panel {

	result_label = null;
	worker = null;

	_ready() {
		this.get_node("Label").text = `fib(${N}) = `;
		this.result_label = this.get_node("Result");
		this.result_label.text = "";
		this.worker = new Worker("res://fib.js");
		this.worker.onmessage = this.on_get_retsult.bind(this);
	}

	calculate_in_main_thread() {
		this.on_start_calculate();
		let ret = fib(N);
		this.on_get_retsult(ret);
	}

	calculate_in_worker() {
		this.on_start_calculate();
		this.worker.postMessage(N);
	}

	on_start_calculate() {
		this.result_label.text = "calculating...";
	}

	on_get_retsult(n) {
		this.result_label.text = `${n}`;
	}
}
