class VZCubeElement extends HTMLElement {
    createdCallback() {
        this.initialR = { roll: 0, pitch: 0, yaw: 0 }
        this.currentR = { roll: 0, pitch: 0, yaw: 0 }
        this.initialPos = { x: 0, y: 0, t: 0 }
        this.currentPos = { x: 0, y: 0, t: 0 }

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

        this.addEventListener('mousedown', this._mouseDownListener)
        this.addEventListener('touchstart', this._touchStartListener, true)
        this.addEventListener('touchmove', this._touchMoveListener, true)
        this.addEventListener('touchend', this._touchEndListener, true)
    }
    attachedCallback() {
    }
    detachedCallback() {
    }
    move(x, y, t) {
        this.currentPos = { x, y, t }

        if (!this.pivot) return;

        let perspective = parseInt(window.getComputedStyle(this).perspective)
        let deltaX = (x - this.initialPos.x) * -0.2
        let deltaY = (y - this.initialPos.y) * 0.2
        this.pivot.style.transform = `translateZ(${perspective}px) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`
    }

    // ==============
    // event handlers
    // --------------

    // mouse
    _mouseDownListener(e) {
        window.addEventListener('mousemove', this._mouseMoveListener)
        window.addEventListener('mouseup', this._mouseUpListener)
        this.initialPos = { x: e.pageX, y: e.pageY, t: e.timeStamp }
    }
    _mouseUpListener(e) {
        window.removeEventListener('mousemove', this._mouseMoveListener)
        window.removeEventListener('mouseup', this._mouseUpListener)
        // @TODO inertia
    }
    _mouseMoveListener(e) {
        this.move(e.pageX, e.pageY, e.timeStamp)
    }

    // touch
    _touchStartListener(e) {
        this.initialPos = { x: e.touches[0].pageX, y: e.touches[0].pageY, t: e.timeStamp }
    }

    _touchEndListener(e) {
        // @TODO inertia
    }

    _touchMoveListener(e) {
        e.preventDefault()
        this.move(e.touches[0].pageX, e.touches[0].pageY, e.timeStamp)
    }


    // sensors
    // _deviceMotionListener(e) {
    // }

    // =========
    // animation
    // ---------

    refresh() {
    }
}
document.registerElement('vz-cube', VZCubeElement)
