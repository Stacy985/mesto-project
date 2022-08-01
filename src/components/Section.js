// export class Section {
// constructor({items, renderer},container ){
//     this._renderer = renderer;
//     this._items = items;
//     this._container = container;
// }
// }

export class Section {
    constructor (container, renderer) {
        this._container = container; 
        this._renderer = renderer;
    }

    _addCard (item) {
        const card = this._renderer(item)
        this._container.appened(card)
    }

    renderItem (items) {
        items.forEach((item) => {
            this._addCard(item)
        })
    }
}

