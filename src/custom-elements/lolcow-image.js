import { html, LitElement } from './lit-element.js'

class LolcatImage extends LitElement {
  static get properties () {
    return {
      image: String,
      spoiler: Boolean,
      expanded: Boolean,
      hoverX: Number,
      hoverY: Number
    }
  }

  constructor () {
    super()

    this.expanded = false
    this.hoverX = 0
    this.hoverY = 0
  }

  _render ({ image, spoiler, expanded, hoverX, hoverY }) {
    if (!image) {
      return html``
    }

    const thumbnailURL = spoiler ? 'static/spoiler.png' : `ot/thumb/${image}`
    const imageURL = `ot/src/${image}`
    console.log(hoverX, hoverY)

    return html`
      ${styles}
      <img 
        class="image" 
        src="https://lolcow.farm/${expanded ? imageURL : thumbnailURL}"
        on-mousemove=${event => this.handleMousemove(event)}
        on-click=${() => this.handleClick()} />
      <img class="hover" style="top: ${hoverY}px; left: ${hoverX}px;" src="https://lolcow.farm/${imageURL}" />
    `
  }

  handleMousemove (event) {
    console.log(event)
    console.log(window)
    this.hoverX = event.clientX + 8
    this.hoverY = window.pageYOffset + event.clientY + 10
  }

  handleClick () {
    this.expanded = !this.expanded
  }
}

const styles = html`
  <style>
    .hover {
      display: none;
      position: absolute;
    }

    .image:hover + .hover {
      display: inline;
    }
  </style>
`

customElements.define('lolcow-image', LolcatImage)
