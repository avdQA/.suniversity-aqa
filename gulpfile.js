// VARIABLES & PATHS

let preprocessor = 'scss', // Preprocessor (sass, scss, less, styl)
	fileswatch = 'html,htm,txt,json,md,woff2', // List of files extensions for watching & hard reload (comma separated)
	imageswatch = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
	baseDir = 'app', // Base directory path without «/» at the end
	online = true; // If «false» - Browsersync will work offline without internet connection

let paths = {

	scripts: {
		src: [
			//'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
			baseDir + '/js/app.js' // app.js. Always at the end
		],
		dest: baseDir + '/js',
	},

	styles: {
		src: baseDir + '/' + preprocessor + '/main.*',
		dest: baseDir + '/css',
	},

	images: {
		src: baseDir + '/images/src/**/*',
		dest: baseDir + '/images/dest',
	},

	deploy: {
		hostname: '', // Deploy hostname
		destination: './public_html/', // Deploy destination
		include: [/* '*.htaccess' */], // Included files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files from deploy
	},

	ftp_data: {
		host: 'ftp.eliteko.com.ua',
		user: '',
		password: '',
		parallel: 8,
		globs: [
			baseDir + '/css/*.min.css',
			// baseDir + '/fonts/*.woff2',
			//baseDir + '/fonts/*.otf',
			// baseDir + '/fonts/*.ttf',
			// baseDir + '/images/dest/*',
			baseDir + '/js/*.min.js',
			baseDir + '/*.ico',
			baseDir + '/*.html',
			baseDir + '/*.txt'
		]
	},

	cssOutputName: 'app.min.css',
	jsOutputName: 'app.min.js',

}

// LOGIC

const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const scss = require('gulp-sass');
const less = require('gulp-less');
const styl = require('gulp-stylus');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const rsync = require('gulp-rsync');
const del = require('del');
const vinylFtp = require('vinyl-ftp');
const gutil = require('gulp-util');

function browsersync() {
	browserSync.init({
		server: { baseDir: baseDir + '/' },
		notify: false,
		online: online
	})
}

function scripts() {
	return src(paths.scripts.src)
		.pipe(concat(paths.jsOutputName))
		.pipe(uglify())
		.pipe(dest(paths.scripts.dest))
		.pipe(browserSync.stream())
}

function styles() {
	return src(paths.styles.src)
		.pipe(eval(preprocessor)())
		.pipe(concat(paths.cssOutputName))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleancss({ level: { 2: { specialComments: 0 } } }))
		.pipe(dest(paths.styles.dest))
		.pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
		.pipe(newer(paths.images.dest))
		.pipe(imagemin([
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 3 })
		]))
		.pipe(dest(paths.images.dest))
}

function cleanimg() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function deploy() {
	return src(baseDir + '/')
		.pipe(rsync({
			root: baseDir + '/',
			hostname: paths.deploy.hostname,
			destination: paths.deploy.destination,
			include: paths.deploy.include,
			exclude: paths.deploy.exclude,
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

function deployToFtp() {
	let conn = vinylFtp.create({
		host: paths.ftp_data.host,
		user: paths.ftp_data.user,
		password: paths.ftp_data.password,
		parallel: paths.ftp_data.parallel,
		log: gutil.log
	})

	// using base = '.' will transfer everything to /public_html correctly
	// turn off buffering in src for best performance
	return src(paths.ftp_data.globs, { base: './app', buffer: false })
		.pipe(conn.newer('/public_html')) // only upload newer files
		.pipe(conn.dest('./public_html'));
}


function startwatch() {
	watch(baseDir + '/**/' + preprocessor + '/**/*', styles);
	watch(baseDir + '/**/*.{' + imageswatch + '}', images);
	watch(baseDir + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
	watch([baseDir + '/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], scripts);
}

exports.browsersync = browsersync;
exports.assets = series(cleanimg, styles, scripts, images);
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.cleanimg = cleanimg;
exports.deploy = deploy;
exports.tohost = series(styles, scripts, deployToFtp);
exports.default = parallel(images, styles, scripts, browsersync, startwatch);
