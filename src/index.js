import './vz-cube.css'
import DeviceOrientationManager from './classes/DeviceOrientationManager'
import { map, constraint } from './utils/math'

/** @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js */





let realOrientation, lastGamma, rotation3d, verticalY
const getOrientation = e => {
    let rotation3d = {}

    if (realOrientation == null) { realOrientation = window.orientation; }
    if (lastGamma == null) { lastGamma = e.gamma; }

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
            var newY = 180 - e.alpha
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

    return rotation3d
}


class VZCubeElement extends HTMLElement {
    constructor() {
        super()

        this._isAnimating   = false
        this._isDragging    = false
        this._isFrozen      = false

        this._draggingMultiplier = 0.1

        this.yaw    = 0
        this.pitch  = 0
        this.roll  = 0

        this._handleMouseDown   = this._handleMouseDown.bind(this)
        this._handleMouseMove   = this._handleMouseMove.bind(this)
        this._handleMouseUp     = this._handleMouseUp.bind(this)
        this._handleTouchStart  = this._handleTouchStart.bind(this)
        this._handleTouchMove   = this._handleTouchMove.bind(this)
        this._handleTouchEnd    = this._handleTouchEnd.bind(this)
        this._processAnimation  = this._processAnimation.bind(this)
        this._refresh           = this._refresh.bind(this)

        this.deviceOrientationManager = new DeviceOrientationManager(this)
    }

    connectedCallback() {
        this._pivot = this.querySelector('vz-cubepivot')
        this._addEventHandlers()
        this._refresh()
        
        if (this.deviceOrientationManager !== undefined)
            this.deviceOrientationManager.init()
    }

    disconnectedCallback() {
        typeof cancelAnimationFrame === 'function'
            ? cancelAnimationFrame(this._refreshId)
            : clearTimeout(this._refreshId)

        this._removeEventHandlers()

        if (this.deviceOrientationManager !== undefined)
            this.deviceOrientationManager.deinit()
    }

    animateTo(yaw, pitch, duration = 1000, callback = null) {
        // set yaw to the neares yaw
        const altYaw = yaw > 0
            ? yaw - 360
            : yaw + 360
        if (Math.abs(altYaw - this.yaw) < Math.abs(yaw - this.yaw)) {
            yaw = altYaw
        }

        this._isAnimating = true
        this._animationStartPos     = { yaw: this.yaw, pitch: this.pitch }
        this._animationEndPos       = { yaw: parseFloat(yaw) || 0, pitch: parseFloat(pitch) || 0 }
        this._animationStartTime    = Date.now()
        this._animationEndTime      = Date.now() + duration
        this._animationEndCallback  = callback
    }

    freeze() {
        this._isFrozen = true
    }

    unfreeze() {
        this._isFrozen = false
    }

    zoomIn() {
        this.setAttribute('zoom', true)
    }
    zoomOut() {
        this.removeAttribute('zoom')
    }

    _easing(t) {
        return t<.5 ? 2*t*t : -1+(4-2*t)*t
    }

    _addEventHandlers() {
        this.addEventListener('mousedown', this._handleMouseDown)
        window.addEventListener('mousemove', this._handleMouseMove)
        window.addEventListener('mouseup', this._handleMouseUp)
        this.addEventListener('touchstart', this._handleTouchStart)
        this.addEventListener('touchmove', this._handleTouchMove)
        this.addEventListener('touchend', this._handleTouchEnd)
        this.addEventListener('touchcancel', this._handleTouchEnd)
    }

    _removeEventHandlers() {
        this.removeEventListener('mousedown', this._handleMouseDown)
        window.removeEventListener('mousemove', this._handleMouseMove)
        window.removeEventListener('mouseup', this._handleMouseUp)
        this.removeEventListener('touchstart', this._handleTouchStart)
        this.removeEventListener('touchmove', this._handleTouchMove)
        this.removeEventListener('touchend', this._handleTouchEnd)
        this.removeEventListener('touchcancel', this._handleTouchEnd)
    }

    _handleMouseDown(e) {
        this._isDragging = true
        this._lastDragEvent = e
    }

    _handleMouseMove(e) {
        if (!this._isDragging || this._isAnimating || this._isFrozen) return

        this.yaw    += (this._lastDragEvent.pageX - e.pageX) * this._draggingMultiplier
        this.pitch  -= constraint((this._lastDragEvent.pageY - e.pageY) * this._draggingMultiplier, -70, 70)

        this._lastDragEvent = e
    }

    _handleMouseUp(e) {
        this._isDragging = false
    }

    _handleTouchStart(e) {
        if ( Math.abs(this.pitch) < 69 ){
            e.preventDefault()
        }
        this._isDragging = true
        this._lastDragEvent = e.touches[0]
    }

    _handleTouchMove(e) {
        if ( Math.abs(this.pitch) < 69 ){
            e.preventDefault()
        }
        if (!this._isDragging || this._isAnimating || this._isFrozen) return

        this.yaw    += (this._lastDragEvent.pageX - e.touches[0].pageX) * this._draggingMultiplier
        this.pitch  -= (this._lastDragEvent.pageY - e.touches[0].pageY) * this._draggingMultiplier

        this._lastDragEvent = e.touches[0]
    }

    _handleTouchEnd(e) {
        if ( Math.abs(this.pitch) < 69 ){
            e.preventDefault()
        }
        this._isDragging = false
    }

    _processAnimation() {
        if (!this._isAnimating) return

        const now = Date.now()
        const t = map(now, this._animationStartTime, this._animationEndTime, 0, 1)

        this.yaw    = map(this._easing(t), 0, 1, this._animationStartPos.yaw, this._animationEndPos.yaw)
        this.pitch  = map(this._easing(t), 0, 1, this._animationStartPos.pitch, this._animationEndPos.pitch)

        if (this._animationEndTime <= now) {
            this._isAnimating   = false
            this.yaw            = this._animationEndPos.yaw
            this.pitch          = this._animationEndPos.pitch

            // @TODO normalize

            if (typeof this._animationEndCallback === 'function') {
                requestAnimationFrame(_ => this._animationEndCallback.call(this))
            }
        }
    }

    _normalize() {
        this.pitch = constraint(this.pitch, -70, 70)
        if (this.yaw > 180) this.yaw -= 360
        if (this.yaw < -180) this.yaw += 360
        if (this.roll < -180) this.roll += 360
    }

    _refresh() {
        this._processAnimation()
        this._normalize()

        const perspective = getComputedStyle(this).perspective

        this._pivot.style.transform = `translateZ(${perspective}) rotateZ(${this.roll}deg) rotateX(${this.pitch}deg) rotateY(${this.yaw}deg)`

        // recurse
        this._refreshId = typeof requestAnimationFrame === 'function'
            ? requestAnimationFrame(this._refresh)
            : setTimeout(this._refresh, 1000/30)
    }
}

customElements.define('vz-cube', VZCubeElement)



class VZCubeFeature extends HTMLElement {
    constructor () {
        super()

        this._yaw       = this.getAttribute('yaw')
        this._pitch     = this.getAttribute('pitch')
        this._refresh   = this._refresh.bind(this)

        this._refresh()
    }

    connectedCallback() {
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case 'yaw':
                this._yaw = parseFloat(newVal) || 0; break
            case 'pitch':
                this._pitch = parseFloat(newVal) || 0; break
        }

        this._refresh()
    }

    _refresh() {
        this.style.transform = `rotateY(${this.yaw}deg) rotateX(${this.pitch}deg) translateZ(calc(-50vmax + 2rem))`
    }

    get yaw() {
        return this._yaw
    }
    get pitch() {
        return this._pitch
    }
}

customElements.define('vz-cube-feature', VZCubeFeature);
