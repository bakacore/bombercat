import babel from "gulp-babel";
import gulp from "gulp";
import sass from "gulp-sass";
import nano from "gulp-cssnano";
import concat from "gulp-concat";
import htmlMin from "gulp-htmlmin";
process.env.FORCE_COLOR = true;
gulp.task("js", () => {
	return gulp.src("src/**/*.js")
		.pipe(babel({
			presets: ["stage-0", "es2015"],
			plugins: ["transform-es2015-modules-systemjs"]
		}))
		.pipe(gulp.dest("dist"));
});
gulp.task("default", ["js", "html", "css"], () => {});
gulp.task("html", () => {
	return gulp.src("src/html/*.html")
		.pipe(htmlMin({
			collapseWhitespace: true,
			removeComments: true,
			removeAttributeQuotes: true,
			removeRedundantAttributes: true
		}))
		.pipe(gulp.dest("."));
});
gulp.task("css", () => {
	let scssFiles = gulp.src("src/scss/index.scss")
		.pipe(sass())
		.pipe(concat("style.css"))
		.pipe(nano())
		.pipe(gulp.dest("dist/css"));
});
