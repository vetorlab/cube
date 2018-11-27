import Plugin from './Plugin';
import { constraint } from '../utils/math';


export default class PointerEvents extends Plugin {
    init() {
        // bind functions
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)

        // add event handlers
        this.cube.el.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        this.cube.el.addEventListener('touchstart', this.handleTouchStart)
        this.cube.el.addEventListener('touchmove', this.handleTouchMove)
        this.cube.el.addEventListener('touchend', this.handleTouchEnd)
        this.cube.el.addEventListener('touchcancel', this.handleTouchEnd)
    }

    deinit() {
        // remove event handlers
        this.cube.el.removeEventListener('mousedown', this.handleMouseDown);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        this.cube.el.removeEventListener('touchstart', this.handleTouchStart)
        this.cube.el.removeEventListener('touchmove', this.handleTouchMove)
        this.cube.el.removeEventListener('touchend', this.handleTouchEnd)
        this.cube.el.removeEventListener('touchcancel', this.handleTouchEnd)
    }

    handleMouseDown(e) {
        e.preventDefault();

        this.cube.isDragging = true;
        this.lastDragEvent = e;
    }

    handleMouseMove(e) {
        if (!this.cube.isDragging || this.cube.isAnimating || this.cube.isFrozen) return;

        this.cube.yaw += (this.lastDragEvent.pageX - e.pageX) * this.cube.speed;
        this.cube.pitch -= constraint((this.lastDragEvent.pageY - e.pageY) * this.cube.speed, -70, 70);

        this.lastDragEvent = e;
    }

    handleMouseUp(e) {
        this.cube.isDragging = false;
    }

    //#region touch
    handleTouchStart(e) {
        if (Math.abs(this.cube.pitch) < 69) {
            e.preventDefault();
        }

        this.cube.isDragging = true;
        this.lastDragEvent = e.touches[0];
    }

    handleTouchMove(e) {
        if (Math.abs(this.cube.pitch) < 69) {
            e.preventDefault();
        }
        if (!this.cube.isDragging || this.cube.isAnimating || this.cube.isFrozen) return

        this.cube.yaw += (this.lastDragEvent.pageX - e.touches[0].pageX) * this.cube.speed;
        this.cube.pitch -= (this.lastDragEvent.pageY - e.touches[0].pageY) * this.cube.speed;

        this.lastDragEvent = e.touches[0]
    }

    handleTouchEnd(e) {
        if (Math.abs(this.cube.pitch) < 69) {
            e.preventDefault()
        }
        this.cube.isDragging = false
    }
    //#endregion
}