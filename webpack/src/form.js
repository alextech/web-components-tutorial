import style from './panel.css';

const panelTpl = document.createElement('template');
panelTpl.innerHTML =
`
<div class="panel">
    <div class="title"><span></span> <span class="icons"> <slot name="icons"></slot></span></div>
    <form class="panelContent">
        <input type="text" />  
    </form>
</div>
`;

class Form extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(panelTpl.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [style];
    }
}

if (customElements.get('ata-form') == null) {
    customElements.define('ata-form', Form);
}
