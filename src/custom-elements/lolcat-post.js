import { LitElement, html } from './lit-element.js'
// 'https://lolcow.farm/banner'

class LolcatPost extends LitElement {
  static get properties () {
    return {
      body: Array,
      image: String,
      spoiler: Boolean
    }
  }

  constructor () {
    super()

    this.body = []
  }

  _render ({ image, spoiler, body }) {
    return html`
      ${image && html`<lolcow-image image=${image} spoiler=${spoiler}></lolcat-image>`}
      <lolcow-body parts=${body}></lolcat-body>
    `
  }
}

window.customElements.define('lolcat-post', LolcatPost)
