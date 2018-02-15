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


var _Cube = __webpack_require__(1);

var _Cube2 = _interopRequireDefault(_Cube);

var _Face = __webpack_require__(4);

var _Face2 = _interopRequireDefault(_Face);

var _Feature = __webpack_require__(5);

var _Feature2 = _interopRequireDefault(_Feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('vz-cube', _Cube2.default);
customElements.define('vz-cube-face', _Face2.default);
customElements.define('vz-cube-feature', _Feature2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DeviceOrientationManager = __webpack_require__(2);

var _DeviceOrientationManager2 = _interopRequireDefault(_DeviceOrientationManager);

var _math = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {camelCase} from 'lodash/fp'

// console.log(camelCase)
var defaultStyles = '\n    background: black;\n    overflow: hidden;\n    border: 2px solid gold;\n    display: block;\n    width: 100%;\n    height: 100%;\n    /* @todo move to attr fov */\n    perspective: 40vmax;\n    /* @todo move to attr fov-zoomed-in */\n    /* perspective: 60vmax;  */\n';

var Cube = function (_HTMLElement) {
    _inherits(Cube, _HTMLElement);

    _createClass(Cube, null, [{
        key: 'observedAttributes',
        get: function get() {
            return ['fov', 'zoom-fov'];
        }
    }]);

    function Cube() {
        _classCallCheck(this, Cube);

        var _this = _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this));

        _this.style.cssText = defaultStyles;

        _this._isAnimating = false;
        _this._isDragging = false;
        _this._isFrozen = false;

        _this._draggingMultiplier = 0.1;

        _this.yaw = 0;
        _this.pitch = 0;
        _this.roll = 0;

        _this._handleMouseDown = _this._handleMouseDown.bind(_this);
        _this._handleMouseMove = _this._handleMouseMove.bind(_this);
        _this._handleMouseUp = _this._handleMouseUp.bind(_this);
        _this._handleTouchStart = _this._handleTouchStart.bind(_this);
        _this._handleTouchMove = _this._handleTouchMove.bind(_this);
        _this._handleTouchEnd = _this._handleTouchEnd.bind(_this);
        _this._processAnimation = _this._processAnimation.bind(_this);
        _this._refresh = _this._refresh.bind(_this);

        _this.deviceOrientationManager = new _DeviceOrientationManager2.default(_this);
        return _this;
    }

    _createClass(Cube, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this._pivot = this.querySelector('vz-cube-pivot');
            if (!this._pivot) throw "Pivot element (<vz-cube-pivot>) not found."; // @todo add a link to the doc

            this._addEventHandlers();
            this._refresh();

            if (this.deviceOrientationManager !== undefined) this.deviceOrientationManager.init();
        }
    }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
            typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame(this._refreshId) : clearTimeout(this._refreshId);

            this._removeEventHandlers();

            if (this.deviceOrientationManager !== undefined) this.deviceOrientationManager.deinit();
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
            this[name] = newValue;
            console.log(camelCase(name));
        }

        // API

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
            this.pitch -= (0, _math.constraint)((this._lastDragEvent.pageY - e.pageY) * this._draggingMultiplier, -70, 70);

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
            if (Math.abs(this.pitch) < 69) {
                e.preventDefault();
            }
            this._isDragging = true;
            this._lastDragEvent = e.touches[0];
        }
    }, {
        key: '_handleTouchMove',
        value: function _handleTouchMove(e) {
            if (Math.abs(this.pitch) < 69) {
                e.preventDefault();
            }
            if (!this._isDragging || this._isAnimating || this._isFrozen) return;

            this.yaw += (this._lastDragEvent.pageX - e.touches[0].pageX) * this._draggingMultiplier;
            this.pitch -= (this._lastDragEvent.pageY - e.touches[0].pageY) * this._draggingMultiplier;

            this._lastDragEvent = e.touches[0];
        }
    }, {
        key: '_handleTouchEnd',
        value: function _handleTouchEnd(e) {
            if (Math.abs(this.pitch) < 69) {
                e.preventDefault();
            }
            this._isDragging = false;
        }
    }, {
        key: '_processAnimation',
        value: function _processAnimation() {
            var _this2 = this;

            if (!this._isAnimating) return;

            var now = Date.now();
            var t = (0, _math.map)(now, this._animationStartTime, this._animationEndTime, 0, 1);

            this.yaw = (0, _math.map)(this._easing(t), 0, 1, this._animationStartPos.yaw, this._animationEndPos.yaw);
            this.pitch = (0, _math.map)(this._easing(t), 0, 1, this._animationStartPos.pitch, this._animationEndPos.pitch);

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
            this.pitch = (0, _math.constraint)(this.pitch, -70, 70);
            if (this.yaw > 180) this.yaw -= 360;
            if (this.yaw < -180) this.yaw += 360;
            if (this.roll < -180) this.roll += 360;
        }
    }, {
        key: '_refresh',
        value: function _refresh() {
            this._processAnimation();
            this._normalize();

            var perspective = getComputedStyle(this).perspective;

            this._pivot.style.transform = 'translateZ(' + perspective + ') rotateZ(' + this.roll + 'deg) rotateX(' + this.pitch + 'deg) rotateY(' + this.yaw + 'deg)';

            // recurse
            this._refreshId = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(this._refresh) : setTimeout(this._refresh, 1000 / 30);
        }
    }]);

    return Cube;
}(HTMLElement);

exports.default = Cube;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeviceOrientationManager = function () {
    function DeviceOrientationManager(cube) {
        _classCallCheck(this, DeviceOrientationManager);

        this.cube = cube;
        this.orientation = window.orientation || 0;

        this._handleDeviceOrientation = this._handleDeviceOrientation.bind(this);
        this._handleDeviceOrientation = this._handleDeviceOrientation.bind(this);
    }

    _createClass(DeviceOrientationManager, [{
        key: 'init',
        value: function init() {
            window.addEventListener('deviceorientation', this._handleDeviceOrientation);
        }
    }, {
        key: 'deinit',
        value: function deinit() {
            window.removeEventListener('deviceorientation', this._handleDeviceOrientation);
        }
    }, {
        key: '_handleDeviceOrientation',
        value: function _handleDeviceOrientation(e) {
            var curr = this._getOrientation(e);
            var prev = this._previousOrientation;

            // @FIXME s/x/y/g s/y/x/g
            if (prev !== undefined) {
                var difX = curr.x - prev.x;
                var difY = curr.y - prev.y;
                if (Math.abs(difY) > 90) {
                    difX = 0;
                    difY = 0;
                }
                this.cube.yaw += difX;
                this.cube.pitch += difY;
                // this.cube.roll    += curr.z - prev.z
            }

            this._previousOrientation = curr;
        }
    }, {
        key: '_getOrientation',
        value: function _getOrientation(_ref) {
            var alpha = _ref.alpha,
                beta = _ref.beta,
                gamma = _ref.gamma;

            var orientation = window.orientation || 0;

            var r = {
                x: -(alpha + gamma),
                y: beta
            };

            switch (orientation) {
                case 90:
                    // landscape (left)
                    r = {
                        x: 90 - (alpha + beta),
                        y: -gamma
                    };
                    break;
                case -90:
                    r = {
                        x: 90 - (alpha + beta),
                        y: gamma
                    };
                    break;
                case 180:
                // portrait (upside-down)
            }

            return r;
        }
    }]);

    return DeviceOrientationManager;
}();

exports.default = DeviceOrientationManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.map = map;
exports.constraint = constraint;
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyles = '\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-size: 100% 100%;\n    background-repeat: no-repeat;\n    backface-visibility: hidden;\n';

var transforms = {
    front: 'rotateY(90deg) translateX(calc(50% - 1px)) rotateY(-90deg)',
    left: 'translateX(calc(-50% + 1px)) rotateY(90deg)',
    right: 'translateX(calc(50% - 1px)) rotateY(-90deg)',
    top: 'translateY(calc(-50% + 1px)) rotateX(-90deg)',
    bottom: 'translateY(calc(50% - 1px)) rotateX(90deg)',
    back: 'rotateY(90deg) translateX(calc(-50% + 1px)) rotateY(90deg)'
};

var Face = function (_HTMLElement) {
    _inherits(Face, _HTMLElement);

    _createClass(Face, null, [{
        key: 'observedAttributes',
        get: function get() {
            return ['src', 'face'];
        }
    }]);

    function Face() {
        _classCallCheck(this, Face);

        var _this = _possibleConstructorReturn(this, (Face.__proto__ || Object.getPrototypeOf(Face)).call(this));

        _this.style.cssText = defaultStyles;
        return _this;
    }

    _createClass(Face, [{
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, oldValue, newValue) {
            this[name] = newValue;
        }
    }, {
        key: 'face',
        set: function set(face) {
            if (!transforms.hasOwnProperty(face)) throw 'Please use one of the allowed face types: ' + Object.keys(transforms).join(', ');

            this.style.transform = transforms[face];
        },
        get: function get() {
            return this.getAttribute('face');
        }
    }, {
        key: 'src',
        set: function set(src) {
            this.style.backgroundImage = 'url(' + src + ')';
        },
        get: function get() {
            return this.getAttribute('src');
        }
    }]);

    return Face;
}(HTMLElement);

exports.default = Face;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feature = function (_HTMLElement) {
    _inherits(Feature, _HTMLElement);

    function Feature() {
        _classCallCheck(this, Feature);

        var _this = _possibleConstructorReturn(this, (Feature.__proto__ || Object.getPrototypeOf(Feature)).call(this));

        _this._yaw = _this.getAttribute('yaw');
        _this._pitch = _this.getAttribute('pitch');
        _this._refresh = _this._refresh.bind(_this);

        _this._refresh();
        return _this;
    }

    _createClass(Feature, [{
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

    return Feature;
}(HTMLElement);

exports.default = Feature;

/***/ })
/******/ ]);