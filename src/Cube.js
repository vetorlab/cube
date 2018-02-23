import DeviceOrientation from './behavior/DeviceOrientation'
import Manipulation from './behavior/Manipulation'
import PointerInteraction from './behavior/PointerInteraction'
import {map} from './utils/math' // @TODO replace for lodash functions
// @ts-ignore
import {clamp} from 'lodash/fp'

const DEFAULT_FOV = '40vmax'
const ZOOM_FOV = '60vmax'

class Cube extends HTMLElement {
    static get observedAttributes() {
        return ['zoomed-in']
    }

    constructor() {
        super()

        this._isDragging    = false

        this.yaw    = 0
        this.pitch  = 0
        this.roll  = 0

        this._processAnimation  = this._processAnimation.bind(this)
        this._refresh           = this._refresh.bind(this)

        this.deviceOrientation = new DeviceOrientation(this)
        this.manipulation = new Manipulation(this)
        // this.pointerInteraction = new PointerInteraction(this)
    }

    connectedCallback() {
        this._updatePerspective()

        this._pivot = this.querySelector('vz-cube-pivot')
        if (!(this._pivot instanceof HTMLElement))
            throw "Pivot element (<vz-cube-pivot>) not found." // @todo add a link to the doc

        this._refresh()

        // @todo INIT all properties that are INITiable
        if (this.deviceOrientation !== undefined)
            this.deviceOrientation.init()
    }

    disconnectedCallback() {
        cancelAnimationFrame(this._refreshId)

        // @todo DEINIT all properties that are DEINITiable
        if (this.deviceOrientation !== undefined)
            this.deviceOrientation.deinit()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
        case 'zoomed-in':
            this._updatePerspective()
            break
        }
    }

    //#region Getters and Setters

    set fov(value) {
        this.setAttribute('fov', value)
    }

    get fov() {
        return this.getAttribute('fov') || DEFAULT_FOV
    }

    set zoomFov(value) {
        this.setAttribute('zoom-fov', value)
    }

    get zoomFov() {
        return this.getAttribute('zoom-fov') || ZOOM_FOV
    }

    set zoomedIn(value) {
        if (value) this.setAttribute('zoomed-in', '')
        else this.removeAttribute('zoomed-in')
    }

    get zoomedIn() {
        return this.hasAttribute('zoomed-in')
    }

    set frozen(value) {
        if (value) this.setAttribute('frozen', '')
        else this.removeAttribute('frozen')
    }

    get frozen() {
        return this.hasAttribute('frozen')
    }

    //#endregion


    //#region Animation

    wait(duration = 0) {
        return new Promise(win => setTimeout(_ => win(this), duration))
    }

    animateTo(yaw, pitch, duration = 1000) {
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
    }

    //#endregion


    //#region Freezing

    freeze() {
        this.frozen = true

        return Promise.resolve(this)
    }

    unfreeze() {
        this.frozen = false

        return Promise.resolve(this)
    }

    //#endregion


    //#region Zooming

    zoomIn() {
        this.zoomedIn = true

        return Promise.resolve(this)
    }
    zoomOut() {
        this.zoomedIn = false

        return Promise.resolve(this)
    }
    toggleZoom() {
        this.zoomedIn = !this.zoomedIn
    }
    _updatePerspective() {
        this.style.perspective = this.zoomedIn
            ? this.zoomFov
            : this.fov
    }

    //#endregion



    _easing(t) {
        return t<.5 ? 2*t*t : -1+(4-2*t)*t
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
        this.pitch = clamp(-70, 70, this.pitch)

        if (this.yaw > 180) this.yaw -= 360
        if (this.yaw < -180) this.yaw += 360
        if (this.roll < -180) this.roll += 360
    }

    _refresh() {
        this._processAnimation()
        this._normalize()

        const perspective = getComputedStyle(this).perspective

        if (!(this._pivot instanceof HTMLElement))
            throw "Pivot element (<vz-cube-pivot>) not found." // @todo add a link to the doc
        this._pivot.style.transform = `
            translateZ(${perspective})
            rotateZ(${this.roll}deg)
            rotateX(${this.pitch}deg)
            rotateY(${this.yaw}deg)
        `

        // recurse
        this._refreshId = requestAnimationFrame(this._refresh)
    }

}

export default Cube
