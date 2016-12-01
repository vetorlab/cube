class VZCubeElement extends HTMLElement {
    createdCallback() {
        this.rotation3d = {x:0, y:0, z:0}
        this.velocity = 0.25
        this.lastPosition = null
        this.lastGamma = null
        this.intialRotation = null
        this.lastX = null
        this.lastY = null
        this.realOrientation = null
        this.verticalY = null

        // bind events
        this._mouseDownListener = this._mouseDownListener.bind(this)
        this._mouseUpListener = this._mouseUpListener.bind(this)
        this._mouseMoveListener = this._mouseMoveListener.bind(this)
        this._deviceMotionListener = this._deviceMotionListener.bind(this)
    }
    attachedCallback() {
        // add initial events
        window.addEventListener('deviceorientation', this._deviceMotionListener)
        this.addEventListener('mousedown', this._mouseDownListener)
    }
    detachedCallback() {
        // remove event handlers
        window.removeEventListener('deviceorientation', this._deviceMotionListener)
    }

    // ==============
    // event handlers
    // --------------

    // mouse
    _mouseDownListener(e) {
        window.addEventListener('mousemove', this._mouseMoveListener)
        window.addEventListener('mouseup', this._mouseUpListener)
    }
    _mouseUpListener(e) {
        window.removeEventListener('mousemove', this._mouseMoveListener)
        window.removeEventListener('mouseup', this._mouseUpListener)
    }
    _mouseMoveListener(e) {
        let deltaX
        let deltaY
        if (this.lastPosition) { // @XXX
            deltaX = e.pageX - this.lastPosition.pageX;
            deltaY = e.pageY - this.lastPosition.pageY;

            this.rotation3d.y += this.velocity * deltaX;
            this.rotation3d.x -= this.velocity * deltaY;
        }
        console.log(deltaX, deltaY)

        if(this.rotation3d.x > 45) this.rotation3d.x = 45;
        if(this.rotation3d.x < -45) this.rotation3d.x = -45;
        this.lastPosition = e;

    }

    // sensors
    _deviceMotionListener(e) {
        if (!this.lastGamma) {
            this.lastGamma = e.gamma
        }

        if (Math.abs(e.gamma) < 10) {
            if (this.lastGamma * e.gamma < 0) {
                this.realOrientation = -this.realOrientation
                this.lastGamma = e.gamma
            }
        } else {
            if (this.lastGamma * e.gamma < 0) {
                this.lastGamma = e.gamma
            }
        }

	    if (e.alpha !== null) {
	    	if (this.realOrientation == 90) {
		    	if (e.gamma < 0) {
			        this.rotation3d.x = -90 - e.gamma
			        this.rotation3d.y = -e.alpha
			    } else {
			    	this.rotation3d.x = 90 - e.gamma
			    	this.rotation3d.y = 180 - e.alpha
			    }
		    } else if (this.realOrientation == -90) {
		        if (e.gamma < 0){
			        this.rotation3d.x = 90 + e.gamma
			        this.rotation3d.y = -e.alpha
			    } else {
			    	this.rotation3d.x = -90 + e.gamma
			    	this.rotation3d.y = 180 - e.alpha
			    }
		    } else if (this.realOrientation == 0) {
		    	this.rotation3d.x = e.beta - 90
		    	if (this.verticalY !== null) {
		    		if (Math.abs(this.verticalY - 180 - e.alpha) < 10) {
		    			this.rotation3d.y = 180 - e.alpha
		    		}
		    	}
		    	this.verticalY = 180 - e.alpha
		    } else {
		    	this.rotation3d.x = e.beta - 90
		    	this.rotation3d.y = 180 - e.alpha
		    }
		    if (this.intialRotation === null) {
				this.intialRotation = this.rotation3d.y
			}
	    }
    }

    // =========
    // animation
    // ---------

    refresh() {
        //var smooth = 0.1;
        var smooth = 0;
        var newX,newY;
        if(lastX && lastX){
            if(Math.abs(lastX - rotation3d.x) < 90 && Math.abs(lastY - rotation3d.y-intialRotation) < 90){
                newX = smooth*lastX + (1-smooth)*rotation3d.x;
                newY = smooth*lastY + (1-smooth)*rotation3d.y-intialRotation;
            }else{
                newX = rotation3d.x;
                newY = rotation3d.y-intialRotation;
            }
        }else{
            newX = rotation3d.x;
            newY = rotation3d.y-intialRotation;
        }

        lastX = newX;
        lastY = newY;

        newX += xShift;
        newY += yShift;

        if(!isie()){
            var newOrientation;
            if($(window).width() > 2000){
                newOrientation = "translate3d(0px,0px,1250px) rotateX(" + newX + "deg) rotateY(" + newY + "deg)";
            }else if($(window).width() > 1280){
                newOrientation = "translate3d(0px,0px,1000px) rotateX(" + newX + "deg) rotateY(" + newY + "deg)";
            }else{
                newOrientation = "translate3d(0px,0px,640px) rotateX(" + newX + "deg) rotateY(" + newY + "deg)";
            }
            $('#'+cubeManager.cubeName+' .cube').css({
                'transform': newOrientation,
                '-webkit-transform': newOrientation,
                '-moz-transform': newOrientation,
                '-ms-transform': newOrientation,
                '-o-transform:rotate': newOrientation
            });
        }else{
            window.tourManager.setIePosition(newX,newY);
        }
    }
}
document.registerElement('vz-cube', VZCubeElement)
