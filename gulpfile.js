
// ------ GULP PIPE MODULES ------ //

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const source = require("vinyl-source-stream");
const gutil = require("gutil");
const browsersync = require("browser-sync");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const browserify = require("browserify");
const buffer = require("gulp-buffer");



// ---- files ---- //
const scripts = ["./src/scripts/**/*.js"];
const styles = ["./src/scss/**/*.scss"];

// --- tasks ---- //

gulp.task("browserify",()=>{
    return browserify("./src/scripts/scroll.bar.js",{debug:true})
        .transform("babelify", {presets: ["latest"]})
        .bundle()
        .on("error",function(err){
            gutil.log(err);
            this.emit("end");
        })
        .pipe(plumber())
        .pipe(source("scroll.bar.b.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(sourcemaps.write("./"))
        .pipe(plumber.stop())
        .pipe(gulp.dest("./www/scripts"));
});

gulp.task("sass",()=>{
    return gulp.src("./src/scss/main.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on("error",function(err){
            gutil.log(err);
            this.emit("end");
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("./"))
        .pipe(plumber.stop())
        .pipe(gulp.dest("./www/styles"));

});


gulp.task("browserify-watch",["browserify"],(done)=>{
    browsersync.reload();
    done();
});

gulp.task("sass-watch",["sass"],done=>{
    browsersync.reload();
    done();
});


gulp.task("debug",()=>{

    browsersync.init({
        server:"./www",
        files:["./www/**/*.html"]
    });

    gulp.watch(scripts,["browserify-watch"]);
    gulp.watch(styles,["sass-watch"]);

});