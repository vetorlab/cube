$(document).ready(function() {
    var o = 0;
    document.body.onmousedown = function() {
        o = 1
    }
    ;
    document.body.onmouseup = function() {
        o = 0
    }
    ;
    var t = function() {
        this.enabled = false;
        this.cubeName = null ;
        this.cubeContainer = null ;
        this.setCubeName = function(z) {
            $("#" + this.cubeName).css("display", "none");
            this.cubeName = z;
            $("#" + this.cubeName).css("display", "inline")
        }
        ;
        this.setActive = function(z) {
            if (!z) {
                $("#" + this.cubeName).css("display", "none");
                this.cubeName = null
            } else {
                this.restartCube()
            }
            this.enabled = z
        }
        ;
        this.restartCube = function() {
            h = v.y;
            v.x = 0
        }
        ;
        this.isActive = function() {
            return this.enabled
        }
    };
    var l = new t();
    window.cubeManager = l;
    var g;
    var r;
    var w = {
        x: 500,
        y: 500
    };
    var v = {
        x: 0,
        y: 0,
        z: 0
    };
    var s;
    var e = 0.25;
    var i = null ;
    var j = 0;
    var y = null ;
    var u = null ;
    var h = null ;
    var d = null ;
    var c = null ;
    g = document.getElementById("tour_interno");
    r = document.getElementById("rotationContainer");
    window.addEventListener("deviceorientation", f);
    window.addEventListener("orientationchange", b);
    window.onmousemove = q;
    function b() {
        y = window.orientation;
        u = event.gamma
    }
    function q(B) {
        B = B || window.event;
        var A, z;
        if (o) {
            if (i) {
                A = B.pageX - i.pageX;
                z = B.pageY - i.pageY;
                v.y += e * A;
                v.x -= e * z
            }
        }
        if (v.x > 45) {
            v.x = 45
        }
        if (v.x < -45) {
            v.x = -45
        }
        i = B
    }
    var k = null ;
    function f(z) {
        if (y == null ) {
            y = window.orientation
        }
        if (u == null ) {
            u = z.gamma
        }
        if (Math.abs(z.gamma) < 10) {
            if (u * z.gamma < 0) {
                y = -y;
                u = z.gamma
            }
        } else {
            if (u * z.gamma < 0) {
                u = z.gamma
            }
        }
        if (z.alpha != null ) {
            if (y == 90) {
                if (z.gamma < 0) {
                    v.x = -90 - z.gamma;
                    v.y = -z.alpha
                } else {
                    v.x = 90 - z.gamma;
                    v.y = 180 - z.alpha
                }
            } else {
                if (y == -90) {
                    if (z.gamma < 0) {
                        v.x = 90 + z.gamma;
                        v.y = -z.alpha
                    } else {
                        v.x = -90 + z.gamma;
                        v.y = 180 - z.alpha
                    }
                } else {
                    if (y == 0) {
                        v.x = z.beta - 90;
                        if (k != null ) {
                            var A = 180 - z.alpha;
                            if (Math.abs(k - A) < 10) {
                                v.y = 180 - z.alpha
                            }
                        }
                        k = 180 - z.alpha
                    } else {
                        v.x = z.beta - 90;
                        v.y = 180 - z.alpha
                    }
                }
            }
            if (y != window.orientation) {
                v.y = 180 + v.y
            }
            if (h == null ) {
                h = v.y
            }
        }
    }
    var n, m = null ;
    var p = 0;
    var x = 0;
    document.body.addEventListener("touchstart", function(z) {
        n = z.changedTouches[0].pageX;
        m = z.changedTouches[0].pageY
    }, false);
    document.body.addEventListener("touchmove", function(B) {
        if (n != null ) {
            var A = (B.changedTouches[0].pageX - n);
            x += A / 5;
            n = B.changedTouches[0].pageX
        }
        if (m != null ) {
            var z = (B.changedTouches[0].pageY - m);
            p -= z / 5;
            if (v.x + p > 45) {
                p = 45 - v.x
            }
            if (v.x + p < -45) {
                p = -v.x - 45
            }
            m = B.changedTouches[0].pageY
        }
    }, false);
    document.body.addEventListener("touchend", function(z) {
        n = null ;
        m = null
    }, false);
    function a() {
        if (l.enabled) {
            var A = 0;
            var C, B;
            if (d && d) {
                if (Math.abs(d - v.x) < 90 && Math.abs(c - v.y - h) < 90) {
                    C = A * d + (1 - A) * v.x;
                    B = A * c + (1 - A) * v.y - h
                } else {
                    C = v.x;
                    B = v.y - h
                }
            } else {
                C = v.x;
                B = v.y - h
            }
            d = C;
            c = B;
            C += p;
            B += x;
            if (!isie()) {
                var z;
                if ($(window).width() > 2000) {
                    z = "translate3d(0px,0px,1250px) rotateX(" + C + "deg) rotateY(" + B + "deg)"
                } else {
                    if ($(window).width() > 1280) {
                        z = "translate3d(0px,0px,1000px) rotateX(" + C + "deg) rotateY(" + B + "deg)"
                    } else {
                        z = "translate3d(0px,0px,640px) rotateX(" + C + "deg) rotateY(" + B + "deg)"
                    }
                }
                $("#" + l.cubeName + " .cube").css({
                    transform: z,
                    "-webkit-transform": z,
                    "-moz-transform": z,
                    "-ms-transform": z,
                    "-o-transform:rotate": z
                })
            } else {
                window.tourManager.setIePosition(C, B)
            }
        }
    }
    window.setInterval(a, 40)
});
