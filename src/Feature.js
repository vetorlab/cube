class Feature extends HTMLElement {
    constructor () {
        super()

        this._yaw       = this.getAttribute('yaw')
        this._pitch     = this.getAttribute('pitch')
        this._refresh   = this._refresh.bind(this)

        this._refresh()
    }

    connectedCallback() {
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case 'yaw':
                this._yaw = parseFloat(newVal) || 0; break
            case 'pitch':
                this._pitch = parseFloat(newVal) || 0; break
        }

        this._refresh()
    }

    _refresh() {
        this.style.transform = `rotateY(${this.yaw}deg) rotateX(${this.pitch}deg) translateZ(calc(-50vmax + 2rem))`
    }

    get yaw() {
        return this._yaw
    }
    get pitch() {
        return this._pitch
    }
}

export default Feature
