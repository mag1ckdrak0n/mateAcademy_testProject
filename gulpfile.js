//I know it's not ideal, but I'll try do it better later...maybe ;)
//Plugin modules
const gulp = require('gulp');
      concat = require('gulp-concat');
      autoprefixer = require('gulp-autoprefixer');
      cleanCss = require('gulp-clean-css');
      uglify = require('gulp-uglify');
      del = require('del');
      sass = require('gulp-sass');
      browserSync = require('browser-sync').create();

//Magic :)
function styles() {
    return gulp.src('src/css/*.css')
                .pipe(concat('main.css'))
                .pipe(autoprefixer({
                    browsers: ['last 3 versions'],
                    cascade: false
                }))
                .pipe(cleanCss({
                    level: 2
                }))
                .pipe(gulp.dest('./build/css/'));              
}

// function sass() {
//     return gulp.src('sass/**/*.sass')
//                 .pipe(sass().on('error', sass.logError))
//                 .pipe(gulp.dest('css/main.css'))
// }

function scripts() {
    return gulp.src('src/js/*.js')
                .pipe(concat('main.js'))
                .pipe(uglify({
                    toplevel: true
                }))
                .pipe(gulp.dest('./build/js/'));              
}

function img() {
    return gulp.src('src/img/*.*')
                .pipe(gulp.dest('./build/img/'));
}

function html() {
    return gulp.src('src/*.html')
                .pipe(gulp.dest('./build/'));               
}
//watcher
function watch() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });

    gulp.watch('src/css/**/*.css').on('all', gulp.series(styles, browserSync.reload));
    gulp.watch('src/js/**/*.js').on('all', gulp.series(scripts, browserSync.reload));
    gulp.watch('src/*.html').on('all', gulp.series(html, browserSync.reload));
}

function clean() {
    return del(['build/css/*.css', 'build/js/**/*.js', 'build/*.html']);
}

//Tasks
gulp.task('styles', styles);
gulp.task('script', scripts); 
gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('build', gulp.series(clean, 
                        gulp.parallel(styles, scripts, img, html)
                        ));