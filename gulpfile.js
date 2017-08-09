var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var rename = require("gulp-rename");
var browserSync = require("browser-sync");

gulp.task("serve", ["css"], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("css/main.scss", ["css"]);
    gulp.watch("index.html").on("change", browserSync.reload);
    gulp.watch("js/main.js").on("change", browserSync.reload);    
});

gulp.task("css", function() {
    gulp.src("css/main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);