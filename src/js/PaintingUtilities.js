import Point from "./Point";
export let $ = document.querySelector.bind(document);
/* A canvas is a place where we can draw stuff */
export let canvas = $("canvas");
export const GRID_LINE_WIDTH = 1;
canvas.width = 800;
canvas.height = 800;
export let context = canvas.getContext("2d");
/**
* Draws a line from <start> to <end>.
*
* @param start
*	A 2D point to start a line from
* @param end
*	A 2D point to end the line at
*/
function drawLine(start, end) {
	context.strokeStyle = "black";
	context.lineWidth = GRID_LINE_WIDTH;
	context.moveTo(start.x, start.y);
	context.lineTo(end.x, end.y);
	context.stroke();
}
/**
* Draws a grid on the screen for a given <level>.
*
* @param level
*	A level that contains all information to draw the grid
*/
export function drawGrid(level) {
	context.fillStyle = "black";
	/* ||| First, draw all vertical lines ||| */
	for (let x = 0; x <= canvas.width; x += level.tileSize.width) {
		let start = new Point(x, 0);
		let end = new Point(x, canvas.height);
		drawLine(start, end);
	}
	/* ———— Then, draw all horizontal lines ———— */
	for (let y = 0; y <= canvas.height; y += level.tileSize.height) {
		let start = new Point(0, y);
		let end = new Point(canvas.width, y);
		drawLine(start, end);
	}
};
export function drawPlayer(level, oldCoordinate, newCoordinate) {
	const width = level.tileSize.width;
	const height = level.tileSize.height;
	const x = newCoordinate.x * width + 1;
	const y = newCoordinate.y * height + 1;
	if (!level.isBombAt(oldCoordinate)) {
		eraseCell(level, oldCoordinate);
	}
	context.fillStyle = "#8ED6FF";
	context.fillRect(x + GRID_LINE_WIDTH / 2 - 1, y + GRID_LINE_WIDTH / 2 - 1, width - GRID_LINE_WIDTH - 1, height - GRID_LINE_WIDTH - 1);
};
export function drawBomb(level, coordinate) {
	const width = level.tileSize.width;
	const height = level.tileSize.height;
	const x = coordinate.x * width + 1;
	const y = coordinate.y * height + 1;
	context.fillStyle = "black";
	context.fillRect(x + GRID_LINE_WIDTH / 2 - 1, y + GRID_LINE_WIDTH / 2 - 1, width - GRID_LINE_WIDTH - 1, height - GRID_LINE_WIDTH - 1);
};
export function eraseCell(level, coordinate) {
	const width = level.tileSize.width;
	const height = level.tileSize.height;
	const x = coordinate.x * width + 1;
	const y = coordinate.y * height + 1;
	context.clearRect(x + GRID_LINE_WIDTH / 2 - 1, y + GRID_LINE_WIDTH / 2 - 1, width - GRID_LINE_WIDTH - 1, height - GRID_LINE_WIDTH - 1);
};