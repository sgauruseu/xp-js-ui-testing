var gulp = require('gulp');
const selenium = require('selenium-standalone');
const mocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var allure = require("mocha-allure-reporter");

gulp.task('selenium', function (done) {
    return selenium.install(
        {
            logger: function (message) {
                console.log(message);
            }
        },
        function (error) {
            if (error) {
                return done(error);
            }

            selenium.start(function (error, child) {
                if (error) {
                    return done(error);
                }
                selenium.child = child;
                done();
            });
        }
    );
});

gulp.task('mocha', function () {
    return gulp
        .src('tests/**/**.js', {read: false})
        .pipe(mocha(
            {
                reporter: 'mocha-allure-reporter',
                outputDir: '/build/testoutput/',
                //reportOpts: { dir: './build/testoutput/'}
                reporterOptions: {
                    allure: {
                        outputDir: '/build/testoutput/'
                    }
                },
            }
        ));
        //.pipe(gulp.dest('./testoutput'));
});

gulp.task('test', function (done) {
    return runSequence([ 'selenium'], 'mocha', function () {
        selenium.child.kill();
        done();
    });
});