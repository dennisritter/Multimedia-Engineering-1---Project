/** Gulp functionality like src, dest, watch etc. */
var gulp          = require( 'gulp' );

/** Adds browser-vendor-prefixes to css properties like transition */
var autoprefixer  = require( 'gulp-autoprefixer' );

/** Concatenates files in a stream */
var concat        = require( 'gulp-concat' );

/** Validates JavaScript syntax and semantics */
var jshint        = require( 'gulp-jshint' );

/** Compiles SASS/SCSS to CSS */
var sass          = require( 'gulp-sass' );

/** Minifies CSS */
var minifyCss     = require( 'gulp-minify-css' );

/** Minifies HTML */
var minifyHtml    = require( 'gulp-minify-html' );

/** Generates Sourcemaps for JavaScript and CSS */
var sourcemaps    = require( 'gulp-sourcemaps' );

/** Compresses JS by stripping whitespace, removing comments and renaming variables */
var uglify        = require( 'gulp-uglify' );

/** Reduces file paths to their actual name */
var flatten       = require( 'gulp-flatten' );

/** Prevents Pipe from breaking, when error occurs */
var plumber       = require( 'gulp-plumber' );

/** Runs several tasks in a sequence */
var runSequence   = require( 'run-sequence' );

/** Minified all angular template files and puts them into the template cache */
var ngTemplate    = require( 'gulp-angular-templatecache' );

/** asset-builder extracts dependencies and source files from manifest */
var manifest      = require( 'asset-builder' )( './manifest.json');

/** Contains lists of third-party js and css unter the keys 'js', 'css' and 'fonts' */
var globs         = manifest.globs;

/** Contains lists of first-party js and css under the keys 'js' and 'css' */
var project       = manifest.getProjectGlobs();

/** Contains the source and dist paths */
var paths         = manifest.paths;

/** Replacement for native gulp.watch, aware of new and deleted files */
var watch         = require( 'gulp-watch' );

/** Function performing all script tasks for the specified globs */
var scriptTasks = function ( scriptGlobs, fileName ) {
  return gulp.src( scriptGlobs )
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( concat( fileName ) )
    .pipe( uglify() )
    .pipe( sourcemaps.write( '.', {
      sourceRoot: '/scripts'
    } ) )
    .pipe( gulp.dest( paths.dist  + 'scripts' ) );
};

/**
 * Validates all JavaScript including the bower.json configuration, the gulpfile
 * and the first-party JavaScript with jshint.
 */
gulp.task( 'jshint', [], function () {
  return gulp.src( [ 'bower.json', 'gulpfile.js' ].concat( project.js ) )
    .pipe( jshint() );
} );

/** Performs script tasks for all first-party scripts */
gulp.task( 'scripts.app', [ 'jshint' ], function () {
  var js = manifest.getDependencyByName( 'app.js' );
  return scriptTasks( js.globs, js.name );
} );

/** Performs script tasks for all first-party scripts */
gulp.task( 'scripts.libs', [], function () {
  var js = manifest.getDependencyByName( 'libs.js' );
  return scriptTasks( js.globs, js.name );
} );

/**
 * Compiles SASS to CSS, concatenates all CSS files, autoprefixes properties, minifies CSS and adds a sourcemap
 */
gulp.task( 'styles', [], function () {
  var css = manifest.getDependencyByName( 'main.css' );

  return gulp.src( css.globs )
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( sass({
      errorLogToConsole: false
    }) )
    .pipe( concat( css.name ) )
    .pipe( autoprefixer() )
    .pipe( minifyCss( {
      processImport: false
    } ) )
    .pipe( sourcemaps.write( '.', {
      sourceRoot: '/styles'
    } ) )
    .pipe( gulp.dest( paths.dist + 'styles' ) );
} );

/**
 * Copies all font files from dependencies into the dist/fonts directory.
 */
gulp.task( 'fonts', [], function () {
  return gulp.src( globs.fonts )
    .pipe( flatten() )
    .pipe( gulp.dest( paths.dist + 'fonts' ) );
} );

/**
 * Loads all template files, minifies them and creates a JavaScript file putting the templates into template cache
 */
gulp.task( 'templates', [], function () {
  var templates = manifest.getDependencyByName( 'templates.js' );

  return gulp.src( templates.globs )
    .pipe( plumber() )
    .pipe( minifyHtml() )
    .pipe( ngTemplate( {
      module: manifest.config.ngModuleName
    } ) )
    .pipe( concat( templates.name ) )
    .pipe( uglify() )
    .pipe( gulp.dest( paths.dist + 'scripts' ) );
} );

/**
 * Runs styles, scripts and fonts task in a sequence
 */
gulp.task( 'build', [], function () {
  return runSequence( [
    'styles',
    'scripts.libs',
    'scripts.app',
    'fonts',
    'templates'
  ] );
} );

gulp.task( 'watch', [], function () {
  watch( paths.source + 'styles/**/*.scss', function () {
    gulp.start( 'styles' );
  } );

  watch( paths.source + 'scripts/**/*.js', function () {
    gulp.start( 'scripts.app' );
  } );

  watch( paths.source + 'templates/**/*.html', function () {
    gulp.start( 'templates' );
  } );

  watch( [ 'bower.json', 'assets/manifest.json' ], function () {
    gulp.start( 'build' );
  } );

  gulp.start( 'build' );
} );