export class ListCard {
    constructor(containerSelectos,renderer){
    this._container = document.querySelector(containerSelectos);
    this._rederer = renderer;
    }
    renderItem(cardData){
        this._renderer(cardData)
    }
    renderItems(cards){
        cards.forEach(cardData => this.renderItem(cardData ));
    }
    addItem(cardNode){
       this._container.append(cardNode)    
    }
}