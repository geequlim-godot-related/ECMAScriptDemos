export default function fib(n) {
	if (n < 2) return n;
	return (fib(n - 2) + fib(n - 1));
};

if (typeof onmessage != 'undefined') {
	onmessage = function(n) {
		postMessage(fib(n));
	}
}
