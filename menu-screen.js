// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement
    this.menu = new Array()

    // show the title of decks
    for (var i = 0; i < FLASHCARD_DECKS.length; ++i) {
      this.menu.push(document.createElement('div'))
      this.menu[i].innerHTML = FLASHCARD_DECKS[i].title // set title content
      this.menu[i].id = i // set html id
      this.containerElement.querySelector('#choices').appendChild(this.menu[i]) // append to the document
      this.menu[i].addEventListener('click', this._gotoGame) // click event
    }    
  }

  _gotoGame(event) {
    // generate event `eventShowMain`
    document.dispatchEvent(new CustomEvent('eventShowMain', {
      detail: {'itemNumber': event.currentTarget.id, 'wrongIndex': new Array()}
    }))
  }

  show() {
    this.containerElement.classList.remove('inactive')
  }

  hide() {
    this.containerElement.classList.add('inactive')
  }
}
