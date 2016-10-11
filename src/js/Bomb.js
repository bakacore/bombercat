export default class Bomb {
	constructor(position) {
		console.log("nuggetbombe wurde erstellt an position", position);
		this.position = position;
	}
	explode() {
		console.log("boom .o. (wegen bombe .w.)");
	}
};