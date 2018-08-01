import { LitElement, html, styleString, classString } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module'

class LitterElement extends LitElement {
  _createRoot () {
    return this
  }
}

export { html, LitterElement as LitElement, styleString, classString }
