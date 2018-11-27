import PointerEvents from './plugins/PointerEvents';
import { map, constraint } from './utils/math';

/**
 * @typedef {{top: string, bottom: string, left: string, right: string, front: string, back: string}} ImageSet
 */

export default class Cube{
    /**
     * @param {HTMLElement} el
     * @param {ImageSet} images
     */
    constructor(el, images) {
        this.el = el;
        this.images = images;
        this.plugins = [];


        // add the basic template to the element
        el.innerHTML = this.constructor.containerTemplate;


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

        this.init();
    }


    init() {
        // init plugins
        this.plugins = Object.keys(this.constructor.plugins).reduce((acc, key) => {
            const pluginClass = this.constructor.plugins[key];
            const plugin = new pluginClass(this);
            plugin.init();

            return { ...acc, [key]: plugin };
        }, {});

        this.processAnimation = this.processAnimation.bind(this);
        this.refresh = this.refresh.bind(this);

        requestAnimationFrame(this.refresh);
    }

    deinit() {
        // deinit plugins
        this.plugins.forEach(plugin => {
            plugin.deinit();
        })
        this.plugins = [];
    }


    processAnimation() {
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
    refresh(t) {
        this.processAnimation()
        this._normalize()

        const perspective = getComputedStyle(this._viewport).perspective

        this._pivot.style.transform = `translateZ(${perspective}) rotateZ(${this.roll}deg) rotateX(${this.pitch}deg) rotateY(${this.yaw}deg)`

        requestAnimationFrame(this.refresh)
    }
}
Cube.plugins = {
    pointerEvents: PointerEvents,
}
Cube.containerTemplate = `
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
