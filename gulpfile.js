const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// StylesMin

const stylesMin = () => {
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
    .pipe(sync.stream());
}

exports.stylesMin = stylesMin;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles", "stylesMin"));
  gulp.watch("source/js/*.js", gulp.series("js"));
  gulp.watch("source/*.html").on("change", gulp.series(html,sync.reload));
}

exports.default = gulp.series(
  styles, server, watcher
);

// Imagemin

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
}

exports.images = images;

// SVGStore

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

// Clean
const clean = () => {
  return del("build")
}

exports.clean = clean;

// html

const html = () => {
  return gulp.src([
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
}

exports.html = html;

// js

const js = () => {
  return gulp.src([
    "source/js/*.js"
  ], {
    base: "source"
  })
  .pipe(uglify())
  .pipe(gulp.dest("build"));
}

exports.js = js;

// Build

const build = gulp.series(
  clean, copy, styles, stylesMin, sprite, js, html
)

exports.build = build;

// Start

const start = gulp.series(
  build, server, watcher
)

exports.start = start;
