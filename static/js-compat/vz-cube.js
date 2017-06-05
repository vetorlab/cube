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

var VZCubeElement = function (_HTMLElement) {
    _inherits(VZCubeElement, _HTMLElement);

    function VZCubeElement() {
        _classCallCheck(this, VZCubeElement);

        return _possibleConstructorReturn(this, (VZCubeElement.__proto__ || Object.getPrototypeOf(VZCubeElement)).apply(this, arguments));
    }

    _createClass(VZCubeElement, [{
        key: 'createdCallback',
        value: function createdCallback() {
            this._isAnimating = false;
            this._isDragging = false;

            this.yaw = 0;
            this.pitch = 0;

            this._handleMouseDown = this._handleMouseDown.bind(this);
            this._handleMouseMove = this._handleMouseMove.bind(this);
            this._handleMouseUp = this._handleMouseUp.bind(this);
            this._handleTouchStart = this._handleTouchStart.bind(this);
            this._handleTouchMove = this._handleTouchMove.bind(this);
            this._handleTouchEnd = this._handleTouchEnd.bind(this);
            this._processAnimation = this._processAnimation.bind(this);
            this._refresh = this._refresh.bind(this);
        }
    }, {
        key: 'attachedCallback',
        value: function attachedCallback() {
            this._pivot = this.querySelector('vz-cubepivot');
            this._addEventHandlers();
            this._refresh();
        }
    }, {
        key: 'detachedCallback',
        value: function detachedCallback() {
            typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame(this._refreshId) : clearTimeout(this._refreshId);
            this._removeEventHandlers();
        }
    }, {
        key: 'animateTo',
        value: function animateTo(yaw, pitch) {
            var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
            var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            this._isAnimating = true;
            this._animationStartPos = { yaw: this.yaw, pitch: this.pitch };
            this._animationEndPos = { yaw: yaw, pitch: pitch };
            this._animationStartTime = Date.now();
            this._animationEndTime = Date.now() + duration;
            this._animationEndCallback = callback;
        }
    }, {
        key: 'easing',
        value: function easing(t) {
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
            if (this._isAnimating) return;
            if (!this._isDragging) return;

            this.yaw += (this._lastDragEvent.pageX - e.pageX) * 0.1;
            this.pitch -= constraint((this._lastDragEvent.pageY - e.pageY) * 0.1, -70, 70);

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
            if (this._isAnimating) return;
            if (!this._isDragging) return;

            this.yaw += (this._lastDragEvent.pageX - e.touches[0].pageX) * 0.1;
            this.pitch -= (this._lastDragEvent.pageY - e.touches[0].pageY) * 0.1;

            this._lastDragEvent = e.touches[0];
        }
    }, {
        key: '_handleTouchEnd',
        value: function _handleTouchEnd(e) {
            this._isDragging = false;
        }
    }, {
        key: '_processAnimation',
        value: function _processAnimation() {
            if (!this._isAnimating) return;

            var now = Date.now();
            var t = map(now, this._animationStartTime, this._animationEndTime, 0, 1);

            this.yaw = map(this.easing(t), 0, 1, this._animationStartPos.yaw, this._animationEndPos.yaw);
            this.pitch = map(this.easing(t), 0, 1, this._animationStartPos.pitch, this._animationEndPos.pitch);

            if (this._animationEndTime <= now) {
                this._isAnimating = false;
                this.yaw = this._animationEndPos.yaw;
                this.pitch = this._animationEndPos.pitch;

                if (typeof this._animationEndCallback === 'function') {
                    this._animationEndCallback.call(this);
                }
            }
        }
    }, {
        key: '_refresh',
        value: function _refresh() {
            this._processAnimation();

            var perspective = getComputedStyle(this).perspective;

            this._pivot.style.transform = 'translateZ(' + perspective + ') rotateX(' + this.pitch + 'deg) rotateY(' + this.yaw + 'deg)';

            console.log(this.yaw, this.pitch);

            // recurse
            this._refreshId = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(this._refresh) : setTimeout(this._refresh, 1000 / 30);
        }
    }]);

    return VZCubeElement;
}(HTMLElement);

document.registerElement('vz-cube', VZCubeElement);
//# sourceMappingURL=vz-cube.js.map