'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

/**
 * @TODO inertia
 * @TODO get/set props from attrs
 * @TODO motion sensors (how to conciliate with pointer events)
 * @TODO relativize mouse movement to viewport-size
 */

var VZCubeElement = function (_HTMLElement) {
    _inherits(VZCubeElement, _HTMLElement);

    function VZCubeElement() {
        _classCallCheck(this, VZCubeElement);

        return _possibleConstructorReturn(this, (VZCubeElement.__proto__ || Object.getPrototypeOf(VZCubeElement)).apply(this, arguments));
    }

    _createClass(VZCubeElement, [{
        key: 'createdCallback',
        value: function createdCallback() {
            this.initialR = { pitch: 0, yaw: 0 };
            this.currentR = { pitch: 0, yaw: 0 };
            this.eventStack = [];

            // elements
            this.pivot = this.querySelector('vz-cubepivot');

            // styles
            this.style.cursor = 'move';

            // events
            this._mouseDownListener = this._mouseDownListener.bind(this);
            this._mouseUpListener = this._mouseUpListener.bind(this);
            this._mouseMoveListener = this._mouseMoveListener.bind(this);
            this._touchStartListener = this._touchStartListener.bind(this);
            this._touchEndListener = this._touchEndListener.bind(this);
            this._touchMoveListener = this._touchMoveListener.bind(this);
            this._refresh = this._refresh.bind(this);

            this.addEventListener('mousedown', this._mouseDownListener);
            this.addEventListener('touchstart', this._touchStartListener, true);
            this.addEventListener('touchmove', this._touchMoveListener, true);
            this.addEventListener('touchend', this._touchEndListener, true);
            this.addEventListener('touchcancel', this._touchEndListener, true);
        }
    }, {
        key: 'attachedCallback',
        value: function attachedCallback() {
            this._refresh();
        }
    }, {
        key: 'detachedCallback',
        value: function detachedCallback() {
            typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame(this.refreshPointer) : clearTimeout(this.refreshPointer);
        }
    }, {
        key: 'startInteraction',
        value: function startInteraction() {
            Object.assign(this.initialR, this.currentR);
            this.eventStack = [];
        }
    }, {
        key: 'addInteraction',
        value: function addInteraction(interaction) {
            this.eventStack.push(interaction);
        }
    }, {
        key: 'endInteraction',
        value: function endInteraction() {}

        // ==============
        // event handlers
        // --------------

        // mouse

    }, {
        key: '_mouseDownListener',
        value: function _mouseDownListener(e) {
            window.addEventListener('mousemove', this._mouseMoveListener);
            window.addEventListener('mouseup', this._mouseUpListener);
            this.startInteraction();
        }
    }, {
        key: '_mouseUpListener',
        value: function _mouseUpListener(e) {
            window.removeEventListener('mousemove', this._mouseMoveListener);
            window.removeEventListener('mouseup', this._mouseUpListener);
            this.endInteraction();
        }
    }, {
        key: '_mouseMoveListener',
        value: function _mouseMoveListener(e) {
            this.addInteraction({ x: e.pageX, y: e.pageY, t: e.timeStamp });
        }

        // touch

    }, {
        key: '_touchStartListener',
        value: function _touchStartListener(e) {
            this.startInteraction();
        }
    }, {
        key: '_touchEndListener',
        value: function _touchEndListener(e) {
            this.endInteraction();
        }
    }, {
        key: '_touchMoveListener',
        value: function _touchMoveListener(e) {
            e.preventDefault();
            this.addInteraction({ x: e.touches[0].pageX, y: e.touches[0].pageY, t: e.timeStamp });
        }

        // =========
        // animation
        // ---------

    }, {
        key: '_refresh',
        value: function _refresh() {
            if (this.eventStack.length >= 2 && this.pivot) {
                var firstEvent = this.eventStack[0];
                var lastEvent = this.eventStack[this.eventStack.length - 1];

                // calculate deltas of this interaction
                var deltaX = (lastEvent.x - firstEvent.x) * -0.2; // side-to-side movement
                var deltaY = (lastEvent.y - firstEvent.y) * 0.2; // up-down movement

                // apply deltas to the initial R of this interaction
                this.currentR.yaw = constraint(this.initialR.yaw + deltaY, -90, 90); // constraint rotation arount X axis (yaw)
                this.currentR.pitch = this.initialR.pitch + deltaX;

                // apply current R to the pivot element
                var perspective = parseInt(window.getComputedStyle(this).perspective);

                this.pivot.style.transform = 'translateZ(' + perspective + 'px) rotateX(' + this.currentR.yaw + 'deg) rotateY(' + this.currentR.pitch + 'deg)';
            }

            // recurse
            this.refreshPointer = typeof cancelAnimationFrame === 'function' ? requestAnimationFrame(this._refresh) : setTimeout(this._refresh, 1000 / 60);
        }
    }]);

    return VZCubeElement;
}(HTMLElement);

document.registerElement('vz-cube', VZCubeElement);

// =====================================================
//                        Polyfills
// -----------------------------------------------------
/**
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 */
if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) {
        // .length of function is 2
        'use strict';

        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) {
                // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}
//# sourceMappingURL=vz-cube.js.map