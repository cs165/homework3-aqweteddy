// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement
    this.wrongIndex = new Array()
    this.itemNumber = -1

    this._gotoMenu = this._gotoMenu.bind(this)
    this._continue = this._continue.bind(this)

    const toMenu = this.containerElement.querySelector('.to-menu')
    toMenu.addEventListener('click', this._gotoMenu)

    const cont = this.containerElement.querySelector('.continue')
    cont.addEventListener('click', this._continue)
  }

  _gotoMenu(event) {
    this.hide()
    document.querySelector('#menu').classList.remove('inactive')
  }

  _continue(event) {
    document.dispatchEvent(new CustomEvent('eventShowMain', {
      detail: {'wrongIndex': this.wrongIndex, 'itemNumber': this.itemNumber}
    }))
  }

  show(itemNumber, numberCorrect, numberWrong, wrongIndex) {

    const percent = Math.round(numberCorrect / (numberCorrect + numberWrong) * 100)
    this.containerElement.querySelector('.percent').innerHTML = percent
    this.containerElement.querySelector('.correct').innerHTML = numberCorrect
    this.containerElement.querySelector('.incorrect').innerHTML = numberWrong
    this.wrongIndex = wrongIndex
    this.itemNumber = itemNumber
    this.containerElement.classList.remove('inactive')
  }

  hide() {
    this.containerElement.classList.add('inactive')
  }
}
