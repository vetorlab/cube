class Face extends HTMLElement {
    static get observedAttributes() {
        return ['src', 'face']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue
    }

    set face(face) {
        const allowedFaces = ['top', 'bottom', 'left', 'right', 'front', 'back']
        
        if (!allowedFaces.includes(face))
            throw `Please use one of the allowed face types: ${allowedFaces.join(', ')}`
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
