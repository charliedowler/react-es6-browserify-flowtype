var gulp = require("gulp")
var gutil = require("gulp-util")
var livereload = require("gulp-livereload")
var sass = require("gulp-ruby-sass")
var connect = require("gulp-connect")
var flow = require("gulp-flowtype")
var del = require("del")
var source = require("vinyl-source-stream")
var browserify = require("browserify")
var watchify = require("watchify")
var reactify = require("reactify")
var streamify = require("gulp-streamify")
var notifier = require("node-notifier")
var uglify = require("gulp-uglify")
var rename = require("gulp-rename")

var reactifyES6 = function(file) {
    return reactify(file, {
        "harmony": true,
        "strip-types": true
    })
}

var paths = {
    jsDir: "dist/js",
    jsBundle: "app.js",
    jsxMain: "./src/jsx/app.jsx",
    jsxDir: "src/jsx",
    cssDir: "dist/css",
    sassMain: "src/sass/app.scss",
    sassDir: "src/sass"
}

gulp.task("browserify", function() {
    del.sync(paths.jsDir)

    var watcher  = watchify(browserify({
        entries: [paths.jsxMain],
        transform: [reactifyES6],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }))

    return watcher.on("update", function() {
        del.sync(paths.jsDir)

        gutil.log(gutil.colors.green("Browserify: updating app.js..."))

        watcher.bundle()
            .pipe(source(paths.jsBundle))
            .pipe(gulp.dest(paths.jsDir))

        gutil.log(gutil.colors.green("Browserify: app.js updated"))
    })
    .bundle()
    .pipe(source(paths.jsBundle))
    .pipe(gulp.dest(paths.jsDir))
})

gulp.task("uglify", function() {
    del.sync("public/app.min-*.js")

    var hash = Math.random().toString(36).substring(2, 10)

    return browserify({
        entries: [paths.jsxMain],
        transform: [reactifyES6]
    })
    .bundle()
    .pipe(source(paths.jsBundle))
    .pipe(streamify(uglify()))
    .pipe(rename("app.min-" + hash + ".js"))
    .pipe(gulp.dest("public"))
})

gulp.task("flow", function() {
    return gulp.src(paths.jsxDir + "/**/*.jsx")
        .pipe(flow())
})

gulp.task("sass", function() {
    del.sync(paths.cssDir)

    return sass(paths.sassMain)
        .pipe(gulp.dest(paths.cssDir))
})

gulp.task("server", function() {
    connect.server({
        port: 3000
    })
})

gulp.task("watch", function() {
    livereload.listen()
    gulp.watch(paths.sassDir + "/**/*.scss", ["sass"])
    gulp.watch(paths.cssDir + "/**/*.css").on("change", livereload.changed)
    gulp.watch(paths.jsDir + "/" + paths.jsBundle).on("change", livereload.changed)
    gulp.watch(paths.jsxDir + "/**/*.jsx", ["flow"])
})

gulp.task("default", ["server", "sass", "browserify", "watch"])
gulp.task("build", ["sass"])
