import { LitElement, html } from './lit-element.js'
// 'https://lolcow.farm/banner'

class LolcatPage extends LitElement {
  static get properties () {
    return {
      posts: Array
    }
  }

  constructor () {
    super()

    this.posts = []

    window.fetch('//localhost:3000/ot/270158')
      .then(response => response.json())
      .then(response => {
        this.posts = response.posts
      })
  }

  _render ({ posts }) {
    return html`
      ${posts.map(({ image, spoiler, body }) => html`
        <lolcat-post image=${image} spoiler=${spoiler} body=${body}></lolcat-post>
      `)}
    `
  }
}

window.customElements.define('lolcat-page', LolcatPage)
