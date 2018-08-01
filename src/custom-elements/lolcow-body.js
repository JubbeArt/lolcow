import { LitElement, html } from './lit-element.js'

class LolcatBody extends LitElement {
  static get properties () {
    return {
      parts: Array
    }
  }

  constructor () {
    super()

    this.parts = []
  }

  _render ({ parts }) {
    return html`
      ${parts.map(part => {
        if (part.hasOwnProperty('quote')) {
          return html`<span class="text-success">&gt;${part.quote}</span><br />`
        } else if (part.hasOwnProperty('postLink')) {
          return html`<a href="${part.postLink}">&gt;&gt;${part.postLink}</a><br />`
        } else if (part.hasOwnProperty('br')) {
          return html`<br /><br />`
        } else if (part.hasOwnProperty('threadLink')) {
          return html`<a href="${part.threadLink}">&gt;&gt;&gt;&gt;${part.threadLink}</a><br />`
        } else if (part.hasOwnProperty('text')) {
          return html`<span>${part.text}</span><br />`
        }
      })}
    `
  }
}

window.customElements.define('lolcow-body', LolcatBody)
