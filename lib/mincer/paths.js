/** internal
 *  mixin Paths
 *
 *  An internal mixin whose public methods are exposed on the [[Environment]]
 *  and [[Index]] classes.
 *
 *  Provides helpers to work with `trail` instance.
 **/


'use strict';


// internal
var getter = require('./common').getter;


/**
 *  Paths#root -> String
 *
 *  Returns [[Environment]] root.
 *
 *  All relative paths are expanded with root as its base.
 *  To be useful set this to your applications root directory.
 **/
getter(module.exports, 'root', function () {
  return this.trail.root;
});

/**
 *  Paths#paths -> Array
 *
 *  Returns an `Array` of path `String`s.
 *
 *  These paths will be used for asset logical path lookups.
 *
 *  Note that a copy of the `Array` is returned so mutating will
 *  have no affect on the environment. See [[Paths#appendPath]],
 *  [[Paths#prependPath]], and [[Paths#clearPaths]].
 **/
getter(module.exports, 'paths', function () {
  return this.trail.paths.toArray();
});


/**
 *  Paths#prependPath(path) -> Void
 *
 *  Prepend a `path` to the `paths` list.
 *  Paths at the end have the least priority.
 **/
module.exports.prependPath = function (path) {
  this.trail.paths.prepend(path);
};


/**
 *  Paths#appendPath(path) -> Void
 *
 *  Append a `path` to the `paths` list.
 *  Paths at the beginning have a higher priority.
 **/
module.exports.appendPath = function (path) {
  this.trail.paths.append(path);
};


/**
 *  Paths#clearPaths() -> Void
 *
 *  Clear all paths and start fresh.
 *
 *  There is no mechanism for reordering paths, so its best to
 *  completely wipe the paths list and reappend them in the order
 *  you want.
 **/
module.exports.clearPaths = function () {
  this.trail.paths.toArray().forEach(function (path) {
    this.remove(path);
  }, this.trail);
};


/**
 *  Paths#extensions -> Array
 *
 *  Returns an `Array` of extensions.
 *
 *  These extensions maybe omitted from logical path searches.
 *
 *      [".js", ".css", ".coffee", ".sass", ...]
 **/
getter(module.exports, 'extensions', function () {
  return this.trail.extensions.toArray();
});