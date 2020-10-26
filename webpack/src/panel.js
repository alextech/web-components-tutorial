import style from './panel.css';

const panelTpl = document.createElement('template');
panelTpl.innerHTML =
`<div class="panel">
  <div class="title"><span>Panel Title/Heading</span> <span class="icons"> <slot name="icons"></slot></span></div>
  <div class="panelContent"><slot name="body"></slot></div>
</div>
`;

class Panel extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(panelTpl.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [style];
    }
}

if (customElements.get('ata-panel') == null) {
    customElements.define('ata-panel', Panel);
}
