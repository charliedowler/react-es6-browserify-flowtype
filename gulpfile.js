var gulp = require("gulp")
var livereload = require("gulp-livereload")
var sass = require("gulp-ruby-sass")
var connect = require("gulp-connect")
var react = require("gulp-react")
var del = require("del")
var concat = require("gulp-concat")
var flow = require("gulp-flowtype")

gulp.task("react", function () {
    del.sync("dist/js")

    return gulp.src([
            "src/es6/components/**/*.jsx",
            "src/es6/app.jsx"
        ])
        .pipe(flow())
        .pipe(react({
            harmony: true
        }))
        .pipe(concat("app.js"))
        .pipe(gulp.dest("dist/js"))
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
    gulp.watch(["src/es6/**/*.js", "src/es6/**/*.jsx"], ["react"]).on("change", livereload.changed)
})

gulp.task("default", ["server", "sass", "react", "watch"])
gulp.task("build", ["sass"])
