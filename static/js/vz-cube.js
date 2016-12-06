/** @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js */
function map(n, start1, stop1, start2 = 0, stop2 = 1) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}
function constraint(n, min = 0, max = 1) {
    return Math.min(Math.max(n, min), max)
}

/**
 * @TODO inertia
 * @TODO get/set props from attrs
 * @TODO motion sensors (how to conciliate with pointer events)
 * @TODO relativize mouse movement to viewport-size
 */
class VZCubeElement extends HTMLElement {
    createdCallback() {
        this.initialR = { pitch: 0, yaw: 0 }
        this.currentR = { pitch: 0, yaw: 0 }
        this.eventStack = []

        // elements
        this.pivot = this.querySelector('vz-cubepivot')

        // styles
        this.style.cursor = 'move'

        // events
        this._mouseDownListener = this._mouseDownListener.bind(this)
        this._mouseUpListener = this._mouseUpListener.bind(this)
        this._mouseMoveListener = this._mouseMoveListener.bind(this)
        this._touchStartListener = this._touchStartListener.bind(this)
        this._touchEndListener = this._touchEndListener.bind(this)
        this._touchMoveListener = this._touchMoveListener.bind(this)
        this._refresh = this._refresh.bind(this)

        this.addEventListener('mousedown', this._mouseDownListener)
        this.addEventListener('touchstart', this._touchStartListener, true)
        this.addEventListener('touchmove', this._touchMoveListener, true)
        this.addEventListener('touchend', this._touchEndListener, true)
        this.addEventListener('touchcancel', this._touchEndListener, true)
    }

    attachedCallback() {
        this._refresh()
    }

    detachedCallback() {
        (typeof cancelAnimationFrame === 'function')
            ? cancelAnimationFrame(this.refreshPointer)
            : clearTimeout(this.refreshPointer)
    }

    startInteraction() {
        Object.assign(this.initialR, this.currentR)
        this.eventStack = []
    }

    addInteraction(interaction) {
        this.eventStack.push(interaction)
    }

    endInteraction() {}

    // ==============
    // event handlers
    // --------------

    // mouse

    _mouseDownListener(e) {
        window.addEventListener('mousemove', this._mouseMoveListener)
        window.addEventListener('mouseup', this._mouseUpListener)
        this.startInteraction()
    }

    _mouseUpListener(e) {
        window.removeEventListener('mousemove', this._mouseMoveListener)
        window.removeEventListener('mouseup', this._mouseUpListener)
        this.endInteraction()
    }

    _mouseMoveListener(e) {
        this.addInteraction({ x: e.pageX, y: e.pageY, t: e.timeStamp })
    }

    // touch

    _touchStartListener(e) {
        this.startInteraction()
    }

    _touchEndListener(e) {
        this.endInteraction()
    }

    _touchMoveListener(e) {
        e.preventDefault()
        this.addInteraction({ x: e.touches[0].pageX, y: e.touches[0].pageY, t: e.timeStamp })
    }

    // =========
    // animation
    // ---------

    _refresh () {
        if (this.eventStack.length >= 2 && this.pivot) {
            let firstEvent = this.eventStack[0]
            let lastEvent = this.eventStack[this.eventStack.length - 1]

            // calculate deltas of this interaction
            let deltaX = (lastEvent.x - firstEvent.x) * -0.2 // side-to-side movement
            let deltaY = (lastEvent.y - firstEvent.y) * 0.2 // up-down movement

            // apply deltas to the initial R of this interaction
            this.currentR.yaw   = constraint(this.initialR.yaw + deltaY, -90, 90) // constraint rotation arount X axis (yaw)
            this.currentR.pitch = this.initialR.pitch + deltaX

            // apply current R to the pivot element
            let perspective = parseInt(window.getComputedStyle(this).perspective)

            this.pivot.style.transform = `translateZ(${perspective}px) rotateX(${this.currentR.yaw}deg) rotateY(${this.currentR.pitch}deg)`
        }

        // recurse
        this.refreshPointer = (typeof cancelAnimationFrame === 'function')
            ? requestAnimationFrame(this._refresh)
            : setTimeout(this._refresh, 1000/60)
    }
}
document.registerElement('vz-cube', VZCubeElement)



// =====================================================
//                        Polyfills
// -----------------------------------------------------
/**
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
 */
if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];

            if (nextSource != null) { // Skip over if undefined or null
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
