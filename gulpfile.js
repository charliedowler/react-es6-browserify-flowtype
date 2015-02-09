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

gulp.task("browserify", function() {
    del.sync("dist/js")

    var reactifyES6 = function(file) {
        return reactify(file, {
            "harmony": true,
            "strip-types": true
        })
    }

    var watcher  = watchify(browserify({
        entries: ["./src/jsx/app.jsx"],
        transform: [reactifyES6],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }))

    return watcher.on("update", function() {
        del.sync("dist/js")

        gutil.log(gutil.colors.green("Browserify: updating app.js..."))

        watcher.bundle()
            .pipe(source("app.js"))
            .pipe(gulp.dest("dist/js"))

        gutil.log(gutil.colors.green("Browserify: app.js updated"))
    })
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("dist/js"))
})

gulp.task("flow", function() {
    return gulp.src("src/jsx/**/*.jsx")
        .pipe(flow())
})

gulp.task("sass", function() {
    del.sync("dist/css")

    return sass(["src/sass/app.scss"])
        .pipe(gulp.dest("dist/css"))
})

gulp.task("server", function() {
    connect.server({
        port: 3000
    })
})

gulp.task("watch", function() {
    livereload.listen()
    gulp.watch("src/sass/**/*.scss", ["sass"])
    gulp.watch("dist/css/**/*.css").on("change", livereload.changed)
    gulp.watch("dist/js/app.js").on("change", livereload.changed)
    gulp.watch("src/jsx/**/*.jsx", ["flow"])
})

gulp.task("default", ["server", "sass", "browserify", "watch"])
gulp.task("build", ["sass"])
