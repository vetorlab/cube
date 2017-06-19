/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js */

function map(n, start1, stop1) {
    var start2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var stop2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}
function constraint(n) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    return Math.min(Math.max(n, min), max);
}

function head(ls) {
    return ls[0];
}
function tail(ls) {
    return ls.slice(1);
}
function init(ls) {
    return ls.slice(0, -1);
}
function last(ls) {
    return ls[ls.length - 1];
}

var realOrientation = void 0,
    lastGamma = void 0,
    rotation3d = void 0,
    verticalY = void 0;
var getOrientation = function getOrientation(e) {
    var rotation3d = {};

    if (realOrientation == null) {
        realOrientation = window.orientation;
    }
    if (lastGamma == null) {
        lastGamma = e.gamma;
    }

    if (Math.abs(e.gamma) < 10) {
        if (lastGamma * e.gamma < 0) {
            realOrientation = -realOrientation;
            lastGamma = e.gamma;
        }
    } else {
        if (lastGamma * e.gamma < 0) {
            lastGamma = e.gamma;
        }
    }

    if (realOrientation == 90) {
        if (e.gamma < 0) {
            rotation3d.x = -90 - e.gamma;
            rotation3d.y = -e.alpha;
        } else {
            rotation3d.x = 90 - e.gamma;
            rotation3d.y = 180 - e.alpha;
        }
    } else if (realOrientation == -90) {
        if (e.gamma < 0) {
            rotation3d.x = 90 + e.gamma;
            rotation3d.y = -e.alpha;
        } else {
            rotation3d.x = -90 + e.gamma;
            rotation3d.y = 180 - e.alpha;
        }
    } else if (realOrientation == 0) {
        rotation3d.x = e.beta - 90;
        if (verticalY != null) {
            var newY = 180 - e.alpha;
            if (Math.abs(verticalY - newY) < 10) {
                rotation3d.y = 180 - e.alpha;
            }
        }
        verticalY = 180 - e.alpha;
    } else {
        rotation3d.x = e.beta - 90;
        rotation3d.y = 180 - e.alpha;
    }
    if (realOrientation != window.orientation) {
        rotation3d.y = 180 + rotation3d.y;
    }

    return rotation3d;
};

var VZCubeElement = function (_HTMLElement) {
    _inherits(VZCubeElement, _HTMLElement);

    function VZCubeElement() {
        _classCallCheck(this, VZCubeElement);

        var _this = _possibleConstructorReturn(this, (VZCubeElement.__proto__ || Object.getPrototypeOf(VZCubeElement)).call(this));

        _this._isAnimating = false;
        _this._isDragging = false;
        _this._isFrozen = false;

        _this._draggingMultiplier = 0.1;

        _this.yaw = 0;
        _this.pitch = 0;

        _this._handleMouseDown = _this._handleMouseDown.bind(_this);
        _this._handleMouseMove = _this._handleMouseMove.bind(_this);
        _this._handleMouseUp = _this._handleMouseUp.bind(_this);
        _this._handleTouchStart = _this._handleTouchStart.bind(_this);
        _this._handleTouchMove = _this._handleTouchMove.bind(_this);
        _this._handleTouchEnd = _this._handleTouchEnd.bind(_this);
        _this._handleOrientation = _this._handleOrientation.bind(_this);
        _this._processAnimation = _this._processAnimation.bind(_this);
        _this._refresh = _this._refresh.bind(_this);
        return _this;
    }

    _createClass(VZCubeElement, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this._pivot = this.querySelector('vz-cubepivot');
            this._addEventHandlers();
            this._refresh();
        }
    }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
            typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame(this._refreshId) : clearTimeout(this._refreshId);

            this._removeEventHandlers();
        }
    }, {
        key: 'animateTo',
        value: function animateTo(yaw, pitch) {
            var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
            var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            // set yaw to the neares yaw
            var altYaw = yaw > 0 ? yaw - 360 : yaw + 360;
            if (Math.abs(altYaw - this.yaw) < Math.abs(yaw - this.yaw)) {
                yaw = altYaw;
            }

            this._isAnimating = true;
            this._animationStartPos = { yaw: this.yaw, pitch: this.pitch };
            this._animationEndPos = { yaw: parseFloat(yaw) || 0, pitch: parseFloat(pitch) || 0 };
            this._animationStartTime = Date.now();
            this._animationEndTime = Date.now() + duration;
            this._animationEndCallback = callback;
        }
    }, {
        key: 'freeze',
        value: function freeze() {
            this._isFrozen = true;
        }
    }, {
        key: 'unfreeze',
        value: function unfreeze() {
            this._isFrozen = false;
        }
    }, {
        key: 'zoomIn',
        value: function zoomIn() {
            this.setAttribute('zoom', true);
        }
    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            this.removeAttribute('zoom');
        }
    }, {
        key: '_easing',
        value: function _easing(t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
    }, {
        key: '_addEventHandlers',
        value: function _addEventHandlers() {
            this.addEventListener('mousedown', this._handleMouseDown);
            window.addEventListener('mousemove', this._handleMouseMove);
            window.addEventListener('mouseup', this._handleMouseUp);
            this.addEventListener('touchstart', this._handleTouchStart);
            this.addEventListener('touchmove', this._handleTouchMove);
            this.addEventListener('touchend', this._handleTouchEnd);
            this.addEventListener('touchcancel', this._handleTouchEnd);
            window.addEventListener('deviceorientation', this._handleOrientation);
        }
    }, {
        key: '_removeEventHandlers',
        value: function _removeEventHandlers() {
            this.removeEventListener('mousedown', this._handleMouseDown);
            window.removeEventListener('mousemove', this._handleMouseMove);
            window.removeEventListener('mouseup', this._handleMouseUp);
            this.removeEventListener('touchstart', this._handleTouchStart);
            this.removeEventListener('touchmove', this._handleTouchMove);
            this.removeEventListener('touchend', this._handleTouchEnd);
            this.removeEventListener('touchcancel', this._handleTouchEnd);
            window.removeEventListener('deviceorientation', this._handleOrientation);
        }
    }, {
        key: '_handleMouseDown',
        value: function _handleMouseDown(e) {
            this._isDragging = true;
            this._lastDragEvent = e;
        }
    }, {
        key: '_handleMouseMove',
        value: function _handleMouseMove(e) {
            if (!this._isDragging || this._isAnimating || this._isFrozen) return;

            this.yaw += (this._lastDragEvent.pageX - e.pageX) * this._draggingMultiplier;
            this.pitch -= constraint((this._lastDragEvent.pageY - e.pageY) * this._draggingMultiplier, -70, 70);

            this._lastDragEvent = e;
        }
    }, {
        key: '_handleMouseUp',
        value: function _handleMouseUp(e) {
            this._isDragging = false;
        }
    }, {
        key: '_handleTouchStart',
        value: function _handleTouchStart(e) {
            this._isDragging = true;
            this._lastDragEvent = e.touches[0];
        }
    }, {
        key: '_handleTouchMove',
        value: function _handleTouchMove(e) {
            if (!this._isDragging || this._isAnimating || this._isFrozen) return;

            this.yaw += (this._lastDragEvent.pageX - e.touches[0].pageX) * this._draggingMultiplier;
            this.pitch -= (this._lastDragEvent.pageY - e.touches[0].pageY) * this._draggingMultiplier;

            this._lastDragEvent = e.touches[0];
        }
    }, {
        key: '_handleTouchEnd',
        value: function _handleTouchEnd(e) {
            this._isDragging = false;
        }
    }, {
        key: '_handleOrientation',
        value: function _handleOrientation(e) {
            var currentOrientation = getOrientation(e);

            if (this._lastOrientation !== undefined) {
                console.log();

                // console.log(this._lastOrientation.y, currentOrientation.y)
                this.yaw -= this._lastOrientation.y - currentOrientation.y || 0;
                this.pitch -= this._lastOrientation.x - currentOrientation.x || 0;
            }

            this._lastOrientation = currentOrientation;
        }
    }, {
        key: '_processAnimation',
        value: function _processAnimation() {
            var _this2 = this;

            if (!this._isAnimating) return;

            var now = Date.now();
            var t = map(now, this._animationStartTime, this._animationEndTime, 0, 1);

            this.yaw = map(this._easing(t), 0, 1, this._animationStartPos.yaw, this._animationEndPos.yaw);
            this.pitch = map(this._easing(t), 0, 1, this._animationStartPos.pitch, this._animationEndPos.pitch);

            if (this._animationEndTime <= now) {
                this._isAnimating = false;
                this.yaw = this._animationEndPos.yaw;
                this.pitch = this._animationEndPos.pitch;

                // @TODO normalize

                if (typeof this._animationEndCallback === 'function') {
                    requestAnimationFrame(function (_) {
                        return _this2._animationEndCallback.call(_this2);
                    });
                }
            }
        }
    }, {
        key: '_normalize',
        value: function _normalize() {
            this.pitch = constraint(this.pitch, -70, 70);
            if (this.yaw > 180) this.yaw -= 360;
            if (this.yaw < -180) this.yaw += 360;
        }
    }, {
        key: '_refresh',
        value: function _refresh() {
            this._processAnimation();
            this._normalize();

            var perspective = getComputedStyle(this).perspective;

            this._pivot.style.transform = 'translateZ(' + perspective + ') rotateX(' + this.pitch + 'deg) rotateY(' + this.yaw + 'deg)';

            // recurse
            this._refreshId = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(this._refresh) : setTimeout(this._refresh, 1000 / 30);
        }
    }]);

    return VZCubeElement;
}(HTMLElement);

customElements.define('vz-cube', VZCubeElement);

var VZCubeFeature = function (_HTMLElement2) {
    _inherits(VZCubeFeature, _HTMLElement2);

    function VZCubeFeature() {
        _classCallCheck(this, VZCubeFeature);

        var _this3 = _possibleConstructorReturn(this, (VZCubeFeature.__proto__ || Object.getPrototypeOf(VZCubeFeature)).call(this));

        _this3._yaw = _this3.getAttribute('yaw');
        _this3._pitch = _this3.getAttribute('pitch');
        _this3._refresh = _this3._refresh.bind(_this3);

        _this3._refresh();
        return _this3;
    }

    _createClass(VZCubeFeature, [{
        key: 'connectedCallback',
        value: function connectedCallback() {}
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(attrName, oldVal, newVal) {
            switch (attrName) {
                case 'yaw':
                    this._yaw = parseFloat(newVal) || 0;break;
                case 'pitch':
                    this._pitch = parseFloat(newVal) || 0;break;
            }

            this._refresh();
        }
    }, {
        key: '_refresh',
        value: function _refresh() {
            this.style.transform = 'rotateY(' + this.yaw + 'deg) rotateX(' + this.pitch + 'deg) translateZ(calc(-50vmax + 2rem))';
        }
    }, {
        key: 'yaw',
        get: function get() {
            return this._yaw;
        }
    }, {
        key: 'pitch',
        get: function get() {
            return this._pitch;
        }
    }]);

    return VZCubeFeature;
}(HTMLElement);

customElements.define('vz-cube-feature', VZCubeFeature);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./vz-cube.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./vz-cube.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "vz-cube, vz-cubepivot, vz-cubeface {\n    display: block;\n}\nvz-cube {\n    width: 100vmax; height: 100vmax;\n    overflow: hidden;\n    perspective: 40vmax;\n    transition: 500ms perspective ease-in-out;\n}\nvz-cube[zoom] {\n    perspective: 60vmax;\n}\nvz-cubepivot {\n    position: relative;\n    width: 100%; height: 100%;\n    transform-style: preserve-3d;\n}\nvz-cubeface {\n    position: absolute;\n    left: 0; top: 0;\n    width: 100%; height: 100%;\n    background-size: 100% 100%;\n    background-repeat: no-repeat;\n    backface-visibility: hidden;\n}\nvz-cubeface[data-face=front] {\n  transform: rotateY(90deg) translateX(calc(50% - 1px)) rotateY(-90deg);\n}\nvz-cubeface[data-face=left] {\n  transform: translateX(calc(-50% + 1px)) rotateY(90deg);\n}\nvz-cubeface[data-face=right] {\n  transform: translateX(calc(50% - 1px)) rotateY(-90deg);\n}\nvz-cubeface[data-face=top] {\n  transform: translateY(calc(-50% + 1px)) rotateX(-90deg);\n}\nvz-cubeface[data-face=bottom] {\n  transform: translateY(calc(50% - 1px)) rotateX(90deg);\n}\nvz-cubeface[data-face=back] {\n  transform: rotateY(90deg) translateX(calc(-50% + 1px)) rotateY(90deg);\n}\n\n/*\n    Features\n*/\nvz-cube-feature {\n    width: 2rem;\n    height: 2rem;\n    margin-top: -1rem;\n    margin-left: -1rem;\n    position: absolute;\n    top: 50%; left: 50%;\n    background: white;\n    border-radius: 50%;\n    opacity: .666;\n    transform: translateZ(calc(-50vmax + 1px));\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);