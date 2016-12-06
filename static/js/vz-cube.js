/**
 * @TODO inertia
 */
class VZCubeElement extends HTMLElement {
    createdCallback() {
        this.refreshPointer = null
        this.initialR = { roll: 0, pitch: 0, yaw: 0 }
        this.currentR = { roll: 0, pitch: 0, yaw: 0 }
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
        (typeof cancelAnimationFrame === 'function') ? cancelAnimationFrame(this.refreshPointer) : clearTimeout(this.refreshPointer)
    }

    startInteraction() {}

    addInteraction(interaction) {
        this.eventStack.push(interaction)
    }

    endInteraction() {}

    // move(x, y, t) {
    //     this.currentPos = { x, y, t }
    //
    //     if (!this.pivot) return;
    //
    //     let perspective = parseInt(window.getComputedStyle(this).perspective)
    //     let deltaX = (x - this.initialPos.x) * -0.2
    //     let deltaY = (y - this.initialPos.y) * 0.2
    //     this.pivot.style.transform = `translateZ(${perspective}px) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`
    // }

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
        // recurse
        this.refreshPointer = (typeof cancelAnimationFrame === 'function')
            ? requestAnimationFrame(this._refresh)
            : setTimeout(this._refresh, 1000/60)
    }
}
document.registerElement('vz-cube', VZCubeElement)
