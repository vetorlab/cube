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
            this.cube.yaw   -= curr.x - prev.x
            this.cube.pitch += curr.y - prev.y
        }
        
        this._previousOrientation =  curr
    }

    _getOrientation ({ alpha, beta, gamma }) {
        const orientation = window.orientation || 0
        // VAI TE QUE USA QUARTENIO CACETE

        
        // console.log(orientation, alpha, beta, gamma)

        switch (orientation) {
            case 0:
                // portrait (native)
                // @FIXME (little jump around beta 90)
                return {
                    x: alpha + gamma,
                    y: beta,
                }
            case 90:
                // landscape (left)
                if (gamma < 0)
                    return {
                        x: -90 - gamma,
                        y: -alpha,
                    }
			    else
                    return {
                        x: 90 - gamma,
                        y: 180 - alpha,
                    }
            case -90:
                // landscape (right)
            case 180:
                // portrait (upside-down)
        }


    }
}
