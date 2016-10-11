import { UP, DOWN, LEFT, RIGHT } from "./Direction";
import { canvas, drawPlayer, drawBomb, drawGrid, eraseCell } from "./PaintingUtilities";
import Point from "./Point";
import Bomb from "./Bomb";
export default class Level {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.x = 0;
		this.y = 0;
		this.bombs = new Set();
		let playerPosition = new Point(this.x, this.y);
		drawGrid(this);
		drawPlayer(this, playerPosition, playerPosition);
	}
	moveUp() {
		/*
		* The top left of the coordinate system looks like this:
		*
		*       0  1  2    x
		*      .————————————→
		*    0 |__|__|__|
		*    1 |__|__|__|
		*    2 |__|__|__|
		*    3 |__|__|__|
		*      |
		*      |
		*      ↓
		*    y
		*
		* Before the player moves up, we must first check
		* if his "y" coordinate is over 0.
		*
		* If it is, the player may move up.
		*
		* If it's not, don't do anything. The player must
		* not move out of the coordinate system.
		*/
		if (this.y > 0 && !this.isBombAt(new Point(this.x, this.y - 1))) {
			--this.y;
		}
	}
	moveDown() {
		/*
		* The bottom left of the coordinate system looks like this:
		*
		*                 0  1  2    x
		*                .————————————→
		*              0 |__|__|__|
		*              1 |__|__|__|
		*                …
		*     height – 2 |__|__|__|
		*     height – 1 |__|__|__|
		*               y
		*
		* Before the player moves down, we must first check
		* if his "y" coordinate is less than height – 1.
		*
		* Normally, you might think that "height" would be the
		* maximum "y" value. But since we're starting to count
		* from 0, the maximum "y" value will be height – 1.
		*
		* If the player's "y" coordinate is less than the maximum
		* "y" value, the player may move down.
		*
		* If not, don't do anything. The player must not move out
		* of the coordinate system.
		*/
		if (this.y < this.height - 1 && !this.isBombAt(new Point(this.x, this.y + 1))) {
			++this.y;
		}
	}
	moveLeft() {
		/*
		* The top left of the coordinate system looks like this:
		*
		*       0  1  2    x
		*      .————————————→
		*    0 |__|__|__|
		*    1 |__|__|__|
		*    2 |__|__|__|
		*    3 |__|__|__|
		*      |
		*      |
		*      ↓
		*    y
		*
		* Before the player moves left, we must first check
		* if his "x" coordinate is over 0.
		*
		* If it is, the player may move left.
		*
		* If it's not, don't do anything. The player must
		* not move out of the coordinate system.
		*/
		if (this.x > 0 && !this.isBombAt(new Point(this.x - 1, this.y))) {
			--this.x;
		}
	}
	moveRight() {
		/*
		* The top right of the coordinate system looks like this:
		*
		*       0  1  2      width – 2  width – 1   x
		*      .————————— … .————————————————————.
		*    0 |__|__|__|   |_________|__________|
		*    1 |__|__|__|   |_________|__________| ← I drew these pixels wider,
		*    2 |__|__|__|   |_________|__________|   because the labels "width – 2"
		*    3 |__|__|__|   |_________|__________|   and "width – 1" take up so
		*      |        |   |         |          |   much space. Sorry.
		*      |        |   |         |          |
		*      ↓        ↓   ↓         ↓          ↓
		*    y
		*
		* Before the player moves right, we must first check
		* if his "x" coordinate is less than width – 1.
		*
		* Normally, you might think that "width" would be the		if (this.x > 0) {
		* maximum "x" value. But since we're starting to count
		* from 0, the maximum "x" value will be width – 1.
		*
		* If the player's "x" coordinate is less than the maximum
		* "x" value, the player may move right.
		*
		* If it's not, don't do anything. The player must
		* not move out of the coordinate system.
		*/
		if (this.x < this.width - 1 && !this.isBombAt(new Point(this.x + 1, this.y))) {
			++this.x;
		}
	}
	move(direction) {
		const oldPosition = new Point(this.x, this.y);
		if (direction === UP) {
			this.moveUp();
		}
		else if (direction === DOWN) {
			this.moveDown();
		}
		else if (direction === LEFT) {
			this.moveLeft();
		}
		else if (direction === RIGHT) {
			this.moveRight();
		}
		const newPosition = new Point(this.x, this.y);
		drawPlayer(this, oldPosition, newPosition);
	}
	get tileSize() {
		let width = canvas.width / this.width;
		let height = canvas.height / this.height;
		return {
			width,
			height
		};
	}
	placeBomb() {
		let playerPosition = new Point(this.x, this.y);
		let bomb = new Bomb(playerPosition);
		this.bombs.add(bomb);
		drawBomb(this, playerPosition);
	};
	isBombAt(coordinate) {
		for (let bomb of this.bombs) {
			if (bomb.position.x === coordinate.x && bomb.position.y === coordinate.y) {
				return true;
			}
		}
		return false;
	}
};