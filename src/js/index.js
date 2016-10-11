import Level from "./Level";
import { UP, DOWN, LEFT, RIGHT } from "./Direction";
/* Let's create a new level */
let level = new Level(10, 10);
/* Then, control what each key should do with the level */
window.addEventListener("keydown", e => {
	let key = e.code;
	switch (key) {
		case "ArrowUp":
		case "KeyW":
			level.move(UP);
			break;
		case "ArrowDown":
		case "KeyS":
			level.move(DOWN);
			break;
		case "ArrowLeft":
		case "KeyA":
			level.move(LEFT);
			break;
		case "ArrowRight":
		case "KeyD":
			level.move(RIGHT);
			break;
		case "Space":
			level.placeBomb();
			break;
	}
});