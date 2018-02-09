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




customElements.define('vz-cube', VZCubeElement)




customElements.define('vz-cube-feature', VZCubeFeature);
