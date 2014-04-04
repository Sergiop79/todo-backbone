var gulp        = require('gulp'),
  uglify        = require('gulp-uglify'),
  compass       = require('gulp-compass'),
  rename        = require('gulp-rename'),
  autoprefixer  = require('gulp-autoprefixer'),
  minifyCSS     = require('gulp-minify-css'),
  changed       = require('gulp-changed'),
  imagemin      = require('gulp-imagemin'),
  stripDebug    = require('gulp-strip-debug'),
  minifyHTML    = require('gulp-minify-html'),
  browserify    = require('gulp-browserify'),
  static        = require('node-static'),
  lr            = require('tiny-lr'),
  livereload    = require('gulp-livereload'),
  watch         = require('gulp-watch'),
  reloadServer  = lr();

//paths
var paths = {
  styles : './app/scss/**/*.scss',
  scripts: './app/js/**/*',
  images: './app/img/**/*',
  fonts: './app/fonts/**/*',
  html: './app/*.html'
};


// styles
gulp.task('styles', function () {
	gulp.src(paths.styles)
		.pipe(compass({
			css: 'app/css',
			sass: 'app/scss',
      image: 'app/img',
      font: 'app/fonts',
      require: ['susy', 'breakpoint']
		}))
    .on('error', function(err){
      console.log(err);
    })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./app/css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload(reloadServer));
});


// scripts
gulp.task('scripts', function () {
  gulp.src('./app/js/main.js')
    .pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload(reloadServer));
});


// images
gulp.task('images', function () {
  var imgSrc = paths.images,
      imgDst = './public/img';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst))
    .pipe(livereload(reloadServer));
});

// html
gulp.task('html', function () {
  var htmlSrc = paths.html,
      htmlDst = './public';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst))
  .pipe(livereload(reloadServer));
});

//fonts
gulp.task('fonts', function () {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('./public/fonts'))
    .pipe(livereload(reloadServer));
});

// Server
gulp.task('server', function() {
  var http = require('http'),
  st = require('node-static'),
  opts = { cache: false },
  file = new st.Server('./public', opts),
  port = process.env.PORT || 3000;

  http.createServer(function (req,res){
    file.serve(req, res);
  }).listen(port);

  console.log("App running on http://localhost:%s", port);
});

// Watch
gulp.task('watch', function () {
  reloadServer.listen(35729, function (err) {
    if (err) {
      console.err(err);
    };
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.html, ['html']);

  });
});




gulp.task('default', [ 'styles', 'scripts', 'images', 'fonts', 'html']);
gulp.task('dev', [ 'styles', 'scripts', 'images', 'fonts', 'html', 'watch', 'server']);