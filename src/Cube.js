import { map, constraint } from './utils/math';

/**
 * @typedef {{top: string, bottom: string, left: string, right: string, front: string, back: string}} ImageSet
 */


export default class VZCube{
    /**
     * @param {HTMLElement} el 
     * @param {ImageSet} images 
     */
    constructor(el, images) {
        this.el = el;
        this.images = images;


        // add the basic template to the element
        el.innerHTML = containerTemplate;


        // store references to key elements
        this._viewport = this.el.querySelector('.vz-cube');
        if (!this._viewport) throw new Error(`Couldn't find viewport element.`);

        this._pivot = this.el.querySelector('.vz-cube__pivot');
        if (!this._pivot) throw new Error(`Couldn't find pivot element.`);


        // create the face objects and add them to the pivot
        populateFaces(this._pivot, images);


        // animation control
        this.isAnimating = false;
        this.isDragging = false;
        this.isFrozen = false;
        this.speed = 0.1;
        this.yaw = 0
        this.pitch = 0
        this.roll = 0

        this._init();
    }


    /** @private */
    _init() {
        this._handleMouseDown = this._handleMouseDown.bind(this)
        this._handleMouseMove = this._handleMouseMove.bind(this)
        this._handleMouseUp = this._handleMouseUp.bind(this)
        this._handleTouchStart = this._handleTouchStart.bind(this)
        this._handleTouchMove = this._handleTouchMove.bind(this)
        this._handleTouchEnd = this._handleTouchEnd.bind(this)
        this._processAnimation = this._processAnimation.bind(this)
        this._refresh = this._refresh.bind(this)

        this.el.addEventListener('mousedown', this._handleMouseDown)
        window.addEventListener('mousemove', this._handleMouseMove)
        window.addEventListener('mouseup', this._handleMouseUp)
        this.el.addEventListener('touchstart', this._handleTouchStart)
        this.el.addEventListener('touchmove', this._handleTouchMove)
        this.el.addEventListener('touchend', this._handleTouchEnd)
        this.el.addEventListener('touchcancel', this._handleTouchEnd)

        requestAnimationFrame(this._refresh);
    }


    /** @private */
    _deinit() {
        this.el.removeEventListener('mousedown', this._handleMouseDown)
        window.removeEventListener('mousemove', this._handleMouseMove)
        window.removeEventListener('mouseup', this._handleMouseUp)
        this.el.removeEventListener('touchstart', this._handleTouchStart)
        this.el.removeEventListener('touchmove', this._handleTouchMove)
        this.el.removeEventListener('touchend', this._handleTouchEnd)
        this.el.removeEventListener('touchcancel', this._handleTouchEnd)
    }


    _handleMouseDown(e) {
        this.isDragging = true
        this._lastDragEvent = e
    }

    _handleMouseMove(e) {
        if (!this.isDragging || this.isAnimating || this.isFrozen) return

        this.yaw += (this._lastDragEvent.pageX - e.pageX) * this.speed
        this.pitch -= constraint((this._lastDragEvent.pageY - e.pageY) * this.speed, -70, 70)

        this._lastDragEvent = e
    }

    _handleMouseUp(e) {
        this.isDragging = false
    }

    _handleTouchStart(e) {
        if (Math.abs(this.pitch) < 69) {
            e.preventDefault()
        }

        this.isDragging = true
        this._lastDragEvent = e.touches[0]
    }

    _handleTouchMove(e) {
        if (Math.abs(this.pitch) < 69) {
            e.preventDefault()
        }
        if (!this.isDragging || this.isAnimating || this.isFrozen) return

        this.yaw += (this._lastDragEvent.pageX - e.touches[0].pageX) * this.speed;
        this.pitch -= (this._lastDragEvent.pageY - e.touches[0].pageY) * this.speed;

        this._lastDragEvent = e.touches[0]
    }

    _handleTouchEnd(e) {
        if (Math.abs(this.pitch) < 69) {
            e.preventDefault()
        }
        this.isDragging = false
    }

    _processAnimation() {
        if (!this.isAnimating) return

        const now = Date.now()
        const t = map(now, this._animationStartTime, this._animationEndTime, 0, 1)

        this.yaw = map(this._easing(t), 0, 1, this._animationStartPos.yaw, this._animationEndPos.yaw)
        this.pitch = map(this._easing(t), 0, 1, this._animationStartPos.pitch, this._animationEndPos.pitch)

        if (this._animationEndTime <= now) {
            this.isAnimating = false
            this.yaw = this._animationEndPos.yaw
            this.pitch = this._animationEndPos.pitch

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

    /** @private */
    _refresh(t) {
        this._processAnimation()
        this._normalize()

        const perspective = getComputedStyle(this._viewport).perspective

        this._pivot.style.transform = `translateZ(${perspective}) rotateZ(${this.roll}deg) rotateX(${this.pitch}deg) rotateY(${this.yaw}deg)`

        requestAnimationFrame(this._refresh)
    }
}

const containerTemplate = `
    <div class="vz-cube">
        <div class="vz-cube__pivot">
        </div>
    </div>
`;


/**
 * Create the face elements and add them to the el.
 * 
 * @param {HTMLElement} el  The pivot element.
 * @param {ImageSet} images 
 */
function populateFaces(el, images) {
    el.innerHTML = Object.keys(images)
        .map(side => `<div data-face="${side}" class="vz-cube__face" style="background-image: url(${images[side]})" ></div>`)
        .join("\n");
}