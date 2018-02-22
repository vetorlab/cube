import Cube from "../Cube";

const DRAG_MULTIPLIER = 0.1

export default class Animation {
    constructor(cube) {
        if (!(cube instanceof Cube))
            throw `${typeof cube} should be a Cube object`

        this.cube = cube

        this._isDragging = false
        this._lastEvent = null

        this.cube.addEventListener('mousedown', this.mouseDown.bind(this))
        window.addEventListener('mousemove', this.mouseMove.bind(this))
        window.addEventListener('mouseup', this.mouseUp.bind(this))
        this.cube.addEventListener('touchstart', this.touchStart.bind(this))
        this.cube.addEventListener('touchmove', this.touchMove.bind(this))
        this.cube.addEventListener('touchend', this.touchEnd.bind(this))
        this.cube.addEventListener('touchcancel', this.touchEnd.bind(this))
    }



    //#region Handlers

    mouseDown(e) {
        this.isDragging = true
        this._lastEvent = e
    }

    mouseMove(e) {
        this._move(e)
    }

    mouseUp(e) {
        this.isDragging = false
    }

    touchStart(e) {
        // allow scrolling when hitting the maximum pitch
        // @todo parametrize this
        if (Math.abs(this.cube.pitch) < 70){
            e.preventDefault()
        }

        this.isDragging = true
        this._lastEvent = e.touches[0]
    }

    touchMove(e) {
        // allow scrolling when hitting the maximum pitch
        // @todo parametrize this
        if (Math.abs(this.cube.pitch) < 70){
            e.preventDefault()
        }

        this._move(e.touches[0])
    }

    touchEnd(e) {
        this.isDragging = false
    }

    //#endregion


    //#region Getters and Setters

    set isDragging(value) {
        this._isDragging = !!value

        if (value) {
            this.cube.setAttribute('is-dragging', '')
        } else {
            this.cube.removeAttribute('is-dragging')
        }
    }

    get isDragging() {
        return this._isDragging;
    }

    //#endregion



    _move(e) {
        if (!this.isDragging) return

        // @todo implement the rest of the blockers
        // if (!this._isDragging || this._isAnimating || this._isFrozen) return

        this.cube.yaw   += (this._lastEvent.pageX - e.pageX) * DRAG_MULTIPLIER
        this.cube.pitch -= (this._lastEvent.pageY - e.pageY) * DRAG_MULTIPLIER

        this._lastEvent = e
    }
}
