export class Section {
    constructor(containerSelectos,renderer){
    this._container = document.querySelector(containerSelectos);
    this._renderer = renderer;
    }
    
    addCard(item, position = 'append') {
        const card = this._renderer(item);
        switch (position) {
            case 'append':
                this._container.append(card)
                break;
            case 'prepend':
                this._container.prepend(card)
                break;
            default:
                break;
        } 
    }

    renderItem(items) {
        items.forEach((item) => {
            this.addCard(item)
        })
    }
}