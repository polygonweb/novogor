var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var postcss = require('gulp-postcss');

var processors = [
	require('autoprefixer')
];

const buildPath = 'docs';

const config = {
	src: {
		styles: 'src/styles/*.styl',
		scripts: 'src/scripts/**/*.js',
		views: 'src/views/*.pug',
		fonts: 'src/fonts/**/*.*',
		images: 'src/images/**/*.*'
	},
	watch: {
		styles: 'src/styles/**/*.*',
		scripts: 'src/scripts/**/*.js',
		views: 'src/views/**/*.*',
		fonts: 'src/fonts/**/*.*',
		images: 'src/images/**/*.*'
	},
	build: {
		styles:  `${buildPath}/css/`,
		scripts: `${buildPath}/js/`,
		views:   `${buildPath}/`,
		fonts:   `${buildPath}/fonts/`,
		images:  `${buildPath}/img/`
	}
};

gulp.task('styles', function() {
	return gulp.src(config.src.styles)
		.pipe(sourcemaps.init())
		.pipe(stylus({
			'include css': true,
			'include': 'node_modules'
		}))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.build.styles))
});

gulp.task('views', function() {
	return gulp.src(config.src.views)
		.pipe(pug({
			'pretty': '\t'
		}))
		.pipe(gulp.dest(config.build.views))
});

gulp.task('fonts', function() {
	return gulp.src(config.src.fonts)
		.pipe(gulp.dest(config.build.fonts));
});

gulp.task('images', function() {
	return gulp.src(config.src.images)
		.pipe(gulp.dest(config.build.images));
});

gulp.task('scripts', function() {
	return gulp.src(config.src.scripts)
		.pipe(gulp.dest(config.build.scripts));
});

gulp.task('watch', function() {
	gulp.watch(config.watch.styles, ['styles']);
	gulp.watch(config.watch.scripts, ['scripts']);
	gulp.watch(config.watch.views, ['views']);
	gulp.watch(config.watch.font, ['fonts']);
	gulp.watch(config.watch.images, ['images']);
});

gulp.task('build', ['styles', 'scripts', 'views', 'fonts', 'images']);

gulp.task('dev', ['build', 'watch']);

gulp.task('default', ['dev']);