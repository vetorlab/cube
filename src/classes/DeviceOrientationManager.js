export default class DeviceOrientationManager {
    constructor (cube) {
        this.cube = cube
        this.orientation = window.orientation || 0

        this._handleDeviceOrientation = this._handleDeviceOrientation.bind(this)
        this._handleDeviceOrientation = this._handleDeviceOrientation.bind(this)
    }

    init() {
        window.addEventListener('deviceorientation', this._handleDeviceOrientation)
    }

    deinit() {
        window.removeEventListener('deviceorientation', this._handleDeviceOrientation)
    }

    _handleDeviceOrientation (e) {
        const curr = this._getOrientation(e)
        const prev = this._previousOrientation

        // @FIXME s/x/y/g s/y/x/g
        if (prev !== undefined) {
            var difX = curr.x - prev.x
            var difY = curr.y - prev.y
            if ( Math.abs(difY) > 90 ){
                difX = 0
                difY = 0
            }
            this.cube.yaw   += difX
            this.cube.pitch  +=difY
            // this.cube.roll    += curr.z - prev.z
        }
        
        this._previousOrientation =  curr
    }

    _getOrientation ({ alpha, beta, gamma }) {
        const orientation = window.orientation || 0

        var r = {
            x: -(alpha + gamma),
            y: beta,
        }

        switch (orientation) {
            case 90:
                // landscape (left)
                r = {
                    x: 90 - (alpha + beta),
                    y: -gamma,
                }
                break;
            case -90:
                r = {
                    x: 90 - (alpha + beta),
                    y: gamma,
                }
                break;
            case 180:
                // portrait (upside-down)
        }

        return r;
    }
}
