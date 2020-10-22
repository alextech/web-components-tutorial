import sheets from "../style.js";

export default class Panel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Primary Outline</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                  </button>
                </div>
                <!-- /.card-tools -->
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                The body of the card
              </div>
              <!-- /.card-body -->
            </div>
    `;

    this.shadowRoot.adoptedStyleSheets = sheets;
  }
}

if(!customElements.get('ata-panel')) {
  customElements.define('ata-panel', Panel);
}
