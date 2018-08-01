import { LitElement, html } from './lit-element.js'
// 'https://lolcow.farm/banner'

class LolcatThread extends LitElement {
  static get properties () {
    return {
      posts: Array,
      thread: String,
      board: String
    }
  }

  constructor () {
    super()

    this.posts = []
  }

  _shouldRender (props, changedProps, prevProps) {
    console.log(props, changedProps, changedProps)
    if (changedProps.thread) {
      fetch(`//localhost:3000/${changedProps.board}/${changedProps.thread}`)
        .then(response => response.json())
        .then(response => {
          this.posts = response.posts
        })
    }

    return true
  }

  _render ({ posts }) {
    return html`
      <!-- ${posts.map(({ image, spoiler, body }) => html`
        <lolcat-post image=${image} spoiler=${spoiler} body=${body}></lolcat-post>
      `)} -->
    `
  }
}

window.customElements.define('lolcat-thread', LolcatThread)
