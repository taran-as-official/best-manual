var syntax        = 'sass'; // Syntax: sass or scss;

//const sass        = require('gulp-sass')(require('sass'));
var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass')(require('sass')),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: '_site'
		},
		notify: false,
		open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src(syntax+'/**/*.'+syntax+'')
	//.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('css'))
	.pipe(gulp.dest('_site/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', function() {
	return gulp.src([
		'libs/jquery/dist/jquery.min.js',
		'libs/likely/likely.js',
		'libs/prognroll/prognroll.js',
		'js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('js'))
	.pipe(gulp.dest('_site/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('_site/**')
	.pipe(rsync({
		root: '_site/',
		hostname: 'bestmanuru@best-manual.ru',
		destination: 'public_html/',
		include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

//gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
//	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
//	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
//	gulp.watch('app/*.html', browsersync.reload)
//});

//gulp.task('default', ['watch']);


gulp.task('watch', function() {
	gulp.watch(syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'js/common.js'], gulp.parallel('js'));
	gulp.watch(['*.html','_site/**/*.html'], browsersync.reload)
});

gulp.task('default', gulp.parallel('watch', 'styles', 'js', 'browser-sync' ));
