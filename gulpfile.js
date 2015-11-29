/** Gulp functionality like src, dest, watch etc. */
var gulp          = require( 'gulp' );

/** Adds browser-vendor-prefixes to css properties like transition */
var autoprefixer  = require( 'gulp-autoprefixer' );

/** Concatenates files in a stream */
var concat        = require( 'gulp-concat' );

/** Validates JavaScript syntax and semantics */
var jshint        = require( 'jshint' );

/** Compiles SASS/SCSS to CSS */
var sass          = require( 'sass' );

/** Generates Sourcemaps for JavaScript and CSS */
var sourcemaps    = require( 'sourcemaps' );

/** asset-builder extracts dependencies and source files from manifest */
var manifest      = require( 'asset-builder' )( './manifest.json' );