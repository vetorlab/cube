// @ts-check

const defaultStyles = `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    backface-visibility: hidden;
`

const transforms = {
    front: 'rotateY(90deg) translateX(calc(50% - 1px)) rotateY(-90deg)',
    left: 'translateX(calc(-50% + 1px)) rotateY(90deg)',
    right: 'translateX(calc(50% - 1px)) rotateY(-90deg)',
    top: 'translateY(calc(-50% + 1px)) rotateX(-90deg)',
    bottom: 'translateY(calc(50% - 1px)) rotateX(90deg)',
    back: 'rotateY(90deg) translateX(calc(-50% + 1px)) rotateY(90deg)',
}

class Face extends HTMLElement {
    static get observedAttributes() {
        return ['src', 'face']
    }

    constructor() {
        super()

        this.style.cssText = defaultStyles
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue
    }

    set face(face) {
        if (!transforms.hasOwnProperty(face))
            throw `Please use one of the allowed face types: ${Object.keys(transforms).join(', ')}`
        
        this.style.transform = transforms[face]
    }

    get face() {
        return this.getAttribute('face')
    }

    set src(src) {
        this.style.backgroundImage = `url(${src})`
    }

    get src() {
        return this.getAttribute('src')
    }
}

export default Face
