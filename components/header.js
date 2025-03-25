class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <header class="navbar navbar-expand-lg bg-white border-bottom shadow-sm mb-4">
                <nav class="container">
                    <a class="navbar-brand fs-3 fw-bold text-dark" href="/">MyeongSeok's Blog</a>
                </nav>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent); 