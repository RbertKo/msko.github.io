class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <header class="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
                <div class="container-fluid" style="max-width: 960px;">
                    <a class="navbar-brand py-3" href="/">
                        <h1 class="fs-3 fw-bold text-dark m-0">MyeongSeok's Blog</h1>
                    </a>
                </div>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent); 