"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var webp = require('gulp-webp');
var svgo = require('gulp-svgo');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var htmlmin = require('gulp-htmlmin');

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("svgo", function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgo())
    .pipe(gulp.dest("source/img"));
});

gulp.task("image_optimize", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe (imagemin([
      imagemin.optipng({ optimizationLevel: 3}),
      imagemin.jpegtran({ progressive: true})
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("compress", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("sprite", function() {
  return gulp.src([
    "source/img/icon-*.svg",
    "source/img/logo-footer.svg",
    "source/img/htmlacademy.svg"
  ])
    .pipe( svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
    return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});


gulp.task("clean", function() {
  return del("build");
})

gulp.task('compress', function () {
  return pipeline(
        gulp.src('source/js/*.js'),
        uglify(),
        rename(
          function (path) {
            path.basename += ".min";
          }
        ),
        gulp.dest('build/js')
  );
});

gulp.task("images", gulp.series("svgo", "webp", "image_optimize"));

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "compress",
  "css",
  "sprite",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
