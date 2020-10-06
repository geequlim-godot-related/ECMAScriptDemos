import { dayjs } from "..";

export default class TimeLabel extends godot.Label {
	
	_process(delta) {
		this.text = `${dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')}`;
	}
}
