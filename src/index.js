/**
 * @typedef {{top: string, bottom: string, left: string, right: string, front: string, back: string}} ImageSet
 */



export default class VZCube {

    /**
     * @param {HTMLElement} el 
     * @param {ImageSet} images 
     */
    constructor(el, images) {
        this.el = el;
        this.images = images;

        el.innerHTML = this.constructor.containerTemplate;

        this._populateFaces();
    }

    /**
     * @private
     */
    _populateFaces() {
        const pivot = this.el.querySelector('.vz-cube__pivot');
        if (!pivot) throw new Error(`Couldn't find pivot element.`);

        pivot.innerHTML = Object.keys(this.images)
            .map(side => `
                <div
                    data-face="${side}"
                    class="vz-cube__face"
                    style="background-image: ${this.images[side]}"
                ></div>
            `)
            .join("\n");
    }
}

VZCube.containerTemplate = `
    <div class="vz-cube">
        <div class="vz-cube__pivot">
        </div>
    </div>
`;
