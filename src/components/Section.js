export class Section {
    constructor(containerSelectos,renderer){
    this._container = document.querySelector(containerSelectos);
    this._renderer = renderer;
    }
    
    _addCard (item) {
        const card = this._renderer(item);
        this._container.append(card)
    }

    renderItem (items) {
        items.forEach((item) => {
            this._addCard(item)
        })
    }
}