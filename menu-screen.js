// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.menu = new Array();
    for (var i = 0; i < 3; ++i) {
      this.menu.push(document.createElement('div'))
      this.menu[i].innerHTML = FLASHCARD_DECKS[i].title
      this.menu[i].id = i
      this.containerElement.querySelector('#choices').appendChild(this.menu[i]);
    }
    for (var i = 0; i < 3; ++i) {
      this.menu[i].addEventListener('click', this._gotoGame)
    }
  }

  _gotoGame(event) {
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
