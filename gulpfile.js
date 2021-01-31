const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync')

browserSync.create();

function buildCss(done) {
    // place code for your default task here

    gulp.src('./public/css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());

    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function hotModuleReplacement(done) {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        port: 3000
    });

    done();
}

function watchSass() {
    gulp.watch('./public/css/**/*', buildCss);
    gulp.watch('./**/*.html', reload);
}

gulp.task('build:css', buildCss);

const tasks = [hotModuleReplacement, watchSass];

gulp.task('default', gulp.parallel(...tasks));

