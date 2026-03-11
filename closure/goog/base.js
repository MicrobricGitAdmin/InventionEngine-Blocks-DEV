// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Bootstrap for the Google JS Library (Closure).
 *
 * In uncompiled mode base.js will attempt to load Closure's deps file, unless
 * the global <code>CLOSURE_NO_DEPS</code> is set to true.  This allows projects
 * to include their own deps file(s) from different locations.
 *
 * Avoid including base.js more than once. This is strictly discouraged and not
 * supported. goog.require(...) won't work properly in that case.
 *
 * @provideGoog
 */


/**
 * Base namespace for the Closure library.  Checks to see goog is already
 * defined in the current scope before assigning to prevent clobbering if
 * base.js is loaded more than once.
 *
 * @const
 */
var goog = goog || {};

/**
 * Reference to the global object.
 * https://www.ecma-international.org/ecma-262/9.0/index.html#sec-global-object
 *
 * More info on this implementation here:
 * https://docs.google.com/document/d/1NAeW4Wk7I7FV0Y2tcUFvQdGMc89k2vdgSXInw8_nvCI/edit
 *
 * @const
 * @suppress {undefinedVars} self won't be referenced unless `this` is falsy.
 * @type {!Global}
 */
goog.global =
    // Check `this` first for backwards compatibility.
    // Valid unless running as an ES module or in a function wrapper called
    //   without setting `this` properly.
    // Note that base.js can't usefully be imported as an ES module, but it may
    // be compiled into bundles that are loadable as ES modules.
    this ||
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/self
    // For in-page browser environments and workers.
    self;

/**
 * Builds an object structure for the provided namespace path, ensuring that
 * names that already exist are not overwritten. For example:
 * "a.b.c" -> a = {};a.b={};a.b.c={};
 * Used by goog.provide and goog.exportSymbol.
 * @param {string} name name of the object that this file defines.
 * @private
 */
goog.exportPath_ = function(name) {
  var parts = name.split('.');
  var cur = goog.global;

  // Internet Explorer exhibits strange behavior when throwing errors from
  // methods externed in this manner.  See the testExportSymbolExceptions in
  // base_test.html for an example.
  if (!(parts[0] in cur) && typeof cur.execScript != 'undefined') {
    cur.execScript('var ' + parts[0]);
  }

  for (var part; parts.length && (part = parts.shift());) {
    if (cur[part] && cur[part] !== Object.prototype[part]) {
      cur = cur[part];
    } else {
      cur = cur[part] = {};
    }
  }
};

/**
 * Defines a namespace in Closure.
 *
 * A namespace may only be defined once in a codebase. It may be defined using
 * goog.provide() or goog.module().
 *
 * The presence of one or more goog.provide() calls in a file indicates
 * that the file defines the given objects/namespaces.
 * Provided symbols must not be null or undefined.
 *
 * In addition, goog.provide() creates the object stubs for a namespace
 * (for example, goog.provide("goog.foo.bar") will create the object
 * goog.foo.bar if it does not already exist).
 *
 * Build tools also scan for provide/require/module statements
 * to discern dependencies, build dependency files (see deps.js), etc.
 *
 * @see goog.require
 * @see goog.module
 * @param {string} name Namespace provided by this file in the form
 *     "goog.package.part".
 */
goog.provide = function(name) {
  // Ensure that the same namespace isn't provided twice.
  // A goog.module/goog.provide maps a goog.require to a specific file
  if (goog.isProvided_(name)) {
    throw Error('Namespace "' + name + '" already declared.');
  }

  delete goog.implicitNamespaces_[name];

  var namespace = name;
  while ((namespace = namespace.substring(0, namespace.lastIndexOf('.')))) {
    if (goog.getObjectByName(namespace)) {
      break;
    }
    goog.implicitNamespaces_[namespace] = true;
  }

  goog.exportPath_(name);
};

/**
 * @private {?{
 *   moduleName: (string|undefined),
 *   declareLegacyNamespace:boolean,
 *   type: ?goog.ModuleType
 * }}
 */
goog.moduleLoaderState_ = null;

/**
 * Check if the given name has been goog.provided. This will return false for
 * names that are available only as implicit namespaces.
 * @param {string} name name of the object to look for.
 * @return {boolean} Whether the name has been provided.
 * @private
 */
goog.isProvided_ = function(name) {
  return (!goog.implicitNamespaces_[name] &&
       goog.isDefAndNotNull(goog.getObjectByName(name)));
};

/**
 * Namespaces implicitly defined by goog.provide. For example,
 * goog.provide('goog.events.Event') implicitly declares that 'goog' and
 * 'goog.events' must be namespaces.
 *
 * @type {!Object<string, (boolean|undefined)>}
 * @private
 */
goog.implicitNamespaces_ = {};

// NOTE: We add goog.module as an implicit namespace as goog.module is defined
// here and because the existing module package has not been moved yet out of
// the goog.module namespace. This satisfies both the debug loader and
// ahead-of-time dependency management.


/**
 * Returns an object based on its fully qualified external name.  The object
 * is not found if null or undefined.  If you are using a compilation pass that
 * renames property names beware that using this function will not find renamed
 * properties.
 *
 * @param {string} name The fully qualified name.
 * @param {Object=} opt_obj The object within which to look; default is
 *     |goog.global|.
 * @return {?} The value (object or primitive) or, if not found, null.
 */
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split('.');
  var cur = opt_obj || goog.global;
  for (var i = 0; i < parts.length; i++) {
    cur = cur[parts[i]];
    if (!goog.isDefAndNotNull(cur)) {
      return null;
    }
  }
  return cur;
};


/**
 * Adds a dependency from a file to the files it requires.
 * @param {string} relPath The path to the js file.
 * @param {!Array<string>} provides An array of strings with
 *     the names of the objects this file provides.
 * @param {!Array<string>} requires An array of strings with
 *     the names of the objects this file requires.
 */
goog.addDependency = function(relPath, provides, requires) {
  goog.debugLoader_.addDependency(relPath, provides, requires);
};




// NOTE(nnaze): The debug DOM loader was included in base.js as an original way
// to do "debug-mode" development.  The dependency system can sometimes be
// confusing, as can the debug DOM loader's asynchronous nature.
//
// With the DOM loader, a call to goog.require() is not blocking -- the script
// will not load until some point after the current script.  If a namespace is
// needed at runtime, it needs to be defined in a previous script, or loaded via
// require() with its registered dependencies.
//
// User-defined namespaces may need their own deps file. For a reference on
// creating a deps file, see:
// Externally: https://developers.google.com/closure/library/docs/depswriter
//
// Because of legacy clients, the DOM loader can't be easily removed from
// base.js.  Work was done to make it disableable or replaceable for
// different environments (DOM-less JavaScript interpreters like Rhino or V8,
// for example). See bootstrap/ for more information.


/**
 * Implements a system for the dynamic resolution of dependencies that works in
 * parallel with the BUILD system.
 *
 * Note that all calls to goog.require will be stripped by the compiler.
 *
 * @see goog.provide
 * @param {string} namespace Namespace (as was given in goog.provide,
 *     goog.module, or goog.declareModuleId) in the form
 *     "goog.package.part".
 * @return {?} If called within a goog.module or ES6 module file, the associated
 *     namespace or module otherwise null.
 */
goog.require = function(namespace) {
  // If the object already exists we do not need to do anything.
  if (!goog.isProvided_(namespace)) {
    var moduleLoaderState = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    try {
      goog.debugLoader_.load_(namespace);
    } finally {
      goog.moduleLoaderState_ = moduleLoaderState;
    }
  }

  return null;
};

/**
 * Requires a symbol for its type information. This is an indication to the
 * compiler that the symbol may appear in type annotations, yet it is not
 * referenced at runtime.
 *
 * When called within a goog.module or ES6 module file, the return value may be
 * assigned to or destructured into a variable, but it may not be otherwise used
 * in code outside of a type annotation.
 *
 * Note that all calls to goog.requireType will be stripped by the compiler.
 *
 * @param {string} namespace Namespace (as was given in goog.provide,
 *     goog.module, or goog.declareModuleId) in the form
 *     "goog.package.part".
 * @return {?}
 */
goog.requireType = function(namespace) {
  // Return an empty object so that single-level destructuring of the return
  // value doesn't crash at runtime when using the debug loader. Multi-level
  // destructuring isn't supported.
  return {};
};

/**
 * Path for included scripts.
 * @type {string}
 */
goog.basePath = '';

/**
 * Normalize a file path by removing redundant ".." and extraneous "." file
 * path components.
 * @param {string} path
 * @return {string}
 * @private
 */
goog.normalizePath_ = function(path) {
  var components = path.split('/');
  var i = 0;
  while (i < components.length) {
    if (components[i] == '.') {
      components.splice(i, 1);
    } else if (
        i && components[i] == '..' && components[i - 1] &&
        components[i - 1] != '..') {
      components.splice(--i, 2);
    } else {
      i++;
    }
  }
  return components.join('/');
};


//==============================================================================
// Language Enhancements
//==============================================================================


/**
 * Returns true if the specified value is defined and not null.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is defined and not null.
 */
goog.isDefAndNotNull = function(val) {
  // Note that undefined == null.
  return val != null;
};

/**
 * This is a "fixed" version of the typeof operator.  It differs from the typeof
 * operator in such a way that null returns 'null' and arrays return 'array'.
 * @param {?} value The value to get the type of.
 * @return {string} The name of the type.
 */
goog.typeOf = function(value) {
  var s = typeof value;
  if (s == 'object') {
    if (value) {
      // Check these first, so we can avoid calling Object.prototype.toString if
      // possible.
      //
      // IE improperly marshals typeof across execution contexts, but a
      // cross-context object will still return false for "instanceof Object".
      if (value instanceof Array) {
        return 'array';
      } else if (value instanceof Object) {
        return s;
      }

      // HACK: In order to use an Object prototype method on the arbitrary
      //   value, the compiler requires the value be cast to type Object,
      //   even though the ECMA spec explicitly allows it.
      var className = Object.prototype.toString.call(
          /** @type {!Object} */ (value));
      // In Firefox 3.6, attempting to access iframe window objects' length
      // property throws an NS_ERROR_FAILURE, so we need to special-case it
      // here.
      if (className == '[object Window]') {
        return 'object';
      }

      // We cannot always use constructor == Array or instanceof Array because
      // different frames have different Array objects. In IE6, if the iframe
      // where the array was created is destroyed, the array loses its
      // prototype. Then dereferencing val.splice here throws an exception, so
      // we can't use goog.isFunction. Calling typeof directly returns 'unknown'
      // so that will work. In this case, this function will return false and
      // most array functions will still work because the array is still
      // array-like (supports length and []) even though it has lost its
      // prototype.
      // Mark Miller noticed that Object.prototype.toString
      // allows access to the unforgeable [[Class]] property.
      //  15.2.4.2 Object.prototype.toString ( )
      //  When the toString method is called, the following steps are taken:
      //      1. Get the [[Class]] property of this object.
      //      2. Compute a string value by concatenating the three strings
      //         "[object ", Result(1), and "]".
      //      3. Return Result(2).
      // and this behavior survives the destruction of the execution context.
      if ((className == '[object Array]' ||
           // In IE all non value types are wrapped as objects across window
           // boundaries (not iframe though) so we have to do object detection
           // for this edge case.
           typeof value.length == 'number' &&
               typeof value.splice != 'undefined' &&
               typeof value.propertyIsEnumerable != 'undefined' &&
               !value.propertyIsEnumerable('splice')

               )) {
        return 'array';
      }
      // HACK: There is still an array case that fails.
      //     function ArrayImpostor() {}
      //     ArrayImpostor.prototype = [];
      //     var impostor = new ArrayImpostor;
      // this can be fixed by getting rid of the fast path
      // (value instanceof Array) and solely relying on
      // (value && Object.prototype.toString.vall(value) === '[object Array]')
      // but that would require many more function calls and is not warranted
      // unless closure code is receiving objects from untrusted sources.

      // IE in cross-window calls does not correctly marshal the function type
      // (it appears just as an object) so we cannot use just typeof val ==
      // 'function'. However, if the object has a call property, it is a
      // function.
      if ((className == '[object Function]' ||
           typeof value.call != 'undefined' &&
               typeof value.propertyIsEnumerable != 'undefined' &&
               !value.propertyIsEnumerable('call'))) {
        return 'function';
      }

    } else {
      return 'null';
    }

  } else if (s == 'function' && typeof value.call == 'undefined') {
    // In Safari typeof nodeList returns 'function', and on Firefox typeof
    // behaves similarly for HTML{Applet,Embed,Object}, Elements and RegExps. We
    // would like to return object for those and we can detect an invalid
    // function by making sure that the function object has a call method.
    return 'object';
  }
  return s;
};


/**
 * Returns true if the specified value is null.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is null.
 */
goog.isNull = function(val) {
  return val === null;
};





/**
 * Returns true if the specified value is an array.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is an array.
 */
goog.isArray = function(val) {
  return goog.typeOf(val) == 'array';
};


/**
 * Returns true if the object looks like an array. To qualify as array like
 * the value needs to be either a NodeList or an object with a Number length
 * property. As a special case, a function value is not array like, because its
 * length property is fixed to correspond to the number of expected arguments.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is an array.
 */
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  // We do not use goog.isObject here in order to exclude function values.
  return type == 'array' || type == 'object' && typeof val.length == 'number';
};


/**
 * Returns true if the object looks like a Date. To qualify as Date-like the
 * value needs to be an object and have a getFullYear() function.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is a like a Date.
 */
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == 'function';
};


/**
 * Returns true if the specified value is a string.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is a string.
 */
goog.isString = function(val) {
  return typeof val == 'string';
};


/**
 * Returns true if the specified value is a boolean.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is boolean.
 */
goog.isBoolean = function(val) {
  return typeof val == 'boolean';
};


/**
 * Returns true if the specified value is a number.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is a number.
 */
goog.isNumber = function(val) {
  return typeof val == 'number';
};


/**
 * Returns true if the specified value is a function.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is a function.
 */
goog.isFunction = function(val) {
  return goog.typeOf(val) == 'function';
};


/**
 * Returns true if the specified value is an object.  This includes arrays and
 * functions.
 * @param {?} val Variable to test.
 * @return {boolean} Whether variable is an object.
 */
goog.isObject = function(val) {
  var type = typeof val;
  return type == 'object' && val != null || type == 'function';
  // return Object(val) === val also works, but is slower, especially if val is
  // not an object.
};

goog.isDef = function(val) {
  // void 0 always evaluates to undefined and hence we do not need to depend on
  // the definition of the global variable named 'undefined'.
  return val !== void 0;
};

//==============================================================================
// goog.defineClass implementation
//==============================================================================


// There's a bug in the compiler where without collapse properties the
// Closure namespace defines do not guard code correctly. To help reduce code
// size also check for !COMPILED even though it redundant until this is fixed.

/**
 * Tries to detect the base path of base.js script that bootstraps Closure.
 * @private
 */
goog.findBasePath_ = function() {
  /** @type {!Document} */
  var doc = goog.global.document;
  // If we have a currentScript available, use it exclusively.
  var currentScript = doc.currentScript;
  if (currentScript) {
    var scripts = [currentScript];
  } else {
    var scripts = doc.getElementsByTagName('SCRIPT');
  }
  // Search backwards since the current script is in almost all cases the one
  // that has base.js.
  for (var i = scripts.length - 1; i >= 0; --i) {
    var script = /** @type {!HTMLScriptElement} */ (scripts[i]);
    var src = script.src;
    var qmark = src.lastIndexOf('?');
    var l = qmark == -1 ? src.length : qmark;
    if (src.substr(l - 7, 7) == 'base.js') {
      goog.basePath = src.substr(0, l - 7);
      return;
    }
  }
};

goog.findBasePath_();

/**
 * A debug loader is responsible for downloading and executing javascript
 * files in an unbundled, uncompiled environment.
 *
 * @struct @constructor @final @private
 */
goog.DebugLoader_ = function() {
  /** @private @const {!Object<string, !goog.Dependency>} */
  this.dependencies_ = {};
  /** @private @const {!Object<string, string>} */
  this.idToPath_ = {};
  /** @private @const {!Object<string, boolean>} */
  this.written_ = {};
  /** @private {!Array<!goog.Dependency>} */
  this.depsToLoad_ = [];
};


/**
 * Travserses the dependency graph and queues the given dependency, and all of
 * its transitive dependencies, for loading and then starts loading if not
 * paused.
 *
 * @param {string} namespace
 * @private
 */
goog.DebugLoader_.prototype.load_ = function(namespace) {
  if (!this.getPathFromDeps_(namespace)) {
    throw Error('goog.require could not find: ' + namespace);
  } else {
    var loader = this;

    var deps = [];

    /** @param {string} namespace */
    var visit = function(namespace) {
      var path = loader.getPathFromDeps_(namespace);

      if (!path) {
        throw Error('Bad dependency path or symbol: ' + namespace);
      }

      if (loader.written_[path]) {
        return;
      }

      loader.written_[path] = true;

      var dep = loader.dependencies_[path];
      for (var i = 0; i < dep.requires.length; i++) {
        if (!goog.isProvided_(dep.requires[i])) {
          visit(dep.requires[i]);
        }
      }

      deps.push(dep);
    };

    visit(namespace);

    var wasLoading = !!this.depsToLoad_.length;
    this.depsToLoad_ = this.depsToLoad_.concat(deps);

    if (!wasLoading) {
      this.loadDeps_();
    }
  }
};


/**
 * Loads any queued dependencies until they are all loaded or paused.
 *
 * @private
 */
goog.DebugLoader_.prototype.loadDeps_ = function() {
  var loader = this;

  while (this.depsToLoad_.length) {
    (function() {
      var loadCallDone = false;
      var dep = loader.depsToLoad_.shift();

      try {
        dep.load();
      } finally {
        loadCallDone = true;
      }
    })();
  }
};


/**
 * @param {string} absPathOrId
 * @return {?string}
 * @private
 */
goog.DebugLoader_.prototype.getPathFromDeps_ = function(absPathOrId) {
  return this.idToPath_[absPathOrId];
};


/**
 * Basic super class for all dependencies Closure Library can load.
 *
 * This default implementation is designed to load untranspiled, non-module
 * scripts in a web broswer.
 *
 * For transpiled non-goog.module files {@see goog.TranspiledDependency}.
 * For goog.modules see {@see goog.GoogModuleDependency}.
 * For untranspiled ES6 modules {@see goog.Es6ModuleDependency}.
 *
 * @param {string} path Absolute path of this script.
 * @param {!Array<string>} requires goog symbols or relative paths to Closure
 *     this depends on.
 * @struct @constructor
 */
goog.Dependency = function(path, requires) {
  /** @const */
  this.path = path;
  /** @const */
  this.requires = requires;
};

/**
 * Map of script ready / state change callbacks. Old IE cannot handle putting
 * these properties on goog.global.
 *
 * @private @const {!Object<string, function(?):undefined>}
 */
goog.Dependency.callbackMap_ = {};


/**
 * Starts loading this dependency. This dependency can pause loading if it
 * needs to and resume it later via the controller interface.
 *
 * When this is loaded it should call controller.loaded(). Note that this will
 * end up calling the loaded method of this dependency; there is no need to
 * call it explicitly.
 */
goog.Dependency.prototype.load = function() {
  /** @type {!HTMLDocument} */
  var doc = goog.global.document;
  doc.write('<script src="' + this.path + '" type="text/javascript"><' +
      '/script>');
};


/**
 * @param {string} relPath
 * @param {!Array<string>|undefined} provides
 * @param {!Array<string>} requires
 * @see goog.addDependency
 */
goog.DebugLoader_.prototype.addDependency = function(
    relPath, provides, requires) {
  relPath = relPath.replace(/\\/g, '/');
  var path = goog.normalizePath_(goog.basePath + relPath);
  var dep = new goog.Dependency(path, requires);
  this.dependencies_[path] = dep;
  for (var i = 0; i < provides.length; i++) {
    this.idToPath_[provides[i]] = path;
  }
  this.idToPath_[relPath] = path;
};


/** @private @const */
goog.debugLoader_ = new goog.DebugLoader_();

/**
 * Copies all the members of a source object to a target object. This method
 * does not work on all browsers for all objects that contain keys such as
 * toString or hasOwnProperty. Use goog.object.extend for this purpose.
 * @param {Object} target Target.
 * @param {Object} source Source.
 */
goog.mixin = function(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }

  // For IE7 or lower, the for-in-loop does not contain any properties that are
  // not enumerable on the prototype object (for example, isPrototypeOf from
  // Object.prototype) but also it will not include 'replace' on objects that
  // extend String and change 'replace' (not that it is common for anyone to
  // extend anything except Object).
};
