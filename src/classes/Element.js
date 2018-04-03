const Element = class {
    constructor (value = 0, positionAnimation = {}, sortingAnimation = {}) {
        this.value = value;

        this.positionAnimetion = positionAnimation;
        this.sortingAnimation = sortingAnimation;
    }
};

export default Element;