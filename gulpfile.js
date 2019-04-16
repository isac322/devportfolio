const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');

gulp.task('scripts', function () {
	return gulp.src('js/scripts.js')
		.pipe(plumber(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		})))
		.pipe(uglify({
			output: {
				comments: '/^!/'
			}
		}))
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('js'));
});

gulp.task('styles', function () {
	return gulp.src('./scss/styles.scss')
		.pipe(wait(250))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./css'));
});

gulp.task('views', function () {
	return gulp.src('index.pug')
		.pipe(pug())
		.pipe(rename({extname: '.html'}))
		.pipe(gulp.dest('.'))
});

gulp.task('watch', function () {
	gulp.watch('js/scripts.js', gulp.series('scripts'));
	gulp.watch('scss/styles.scss', gulp.series('styles'));
	gulp.watch('index.pug', gulp.series('views'));
});