class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #f8f9fa;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                nav {
                    max-width: 800px;
                    margin: 0 auto;
                    text-align: center;
                }

                .logo {
                    font-size: 2rem;
                    font-weight: bold;
                    text-decoration: none;
                    color: #333;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .subtitle {
                    margin-top: 0.5rem;
                    color: #666;
                    font-size: 1rem;
                }
            </style>
            <nav>
                <a href="index.html" class="logo">MyeongSeok's Blog</a>
            </nav>
        `;
    }
}

customElements.define('header-component', HeaderComponent); 