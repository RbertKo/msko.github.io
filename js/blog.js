class BlogPosts {
    constructor() {
        this.postsContainer = document.querySelector('.post-list');
    }

    async getPostFiles() {
        try {
            const response = await fetch('/posts/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            return Array.from(doc.querySelectorAll('a'))
                .filter(a => a.href.endsWith('.html'))
                .map(a => {
                    const url = new URL(a.href);
                    return url.pathname;
                });
        } catch (error) {
            console.error('Error fetching post list:', error);
            return [];
        }
    }

    async fetchPostContent(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            return {
                title: doc.title,
                date: this.extractDate(doc),
                excerpt: this.extractExcerpt(doc),
                file: filePath
            };
        } catch (error) {
            console.error(`Error loading post ${filePath}:`, error);
            return null;
        }
    }

    extractDate(doc) {
        const dateElement = doc.querySelector('.post-date');
        if (dateElement) {
            const dateStr = dateElement.textContent.trim();
            return new Date(dateStr);
        }
        return new Date();
    }

    extractExcerpt(doc) {
        const firstParagraph = doc.querySelector('.post-content p');
        if (firstParagraph) {
            const text = firstParagraph.textContent.trim();
            return text.length > 200 ? text.substring(0, 200) + '...' : text;
        }
        return '';
    }

    formatDate(date) {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    createPostCard(post) {
        return `
            <article class="card border-0 rounded-3 shadow-sm hover-shadow-md mb-4">
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="text-secondary small">
                            <i class="bi bi-calendar"></i> ${this.formatDate(post.date)}
                        </div>
                    </div>
                    <h2 class="card-title h4 mb-3">
                        <a href="${post.file}" class="text-decoration-none link-dark stretched-link">
                            ${post.title}
                        </a>
                    </h2>
                    <p class="card-text text-secondary mb-0">${post.excerpt}</p>
                </div>
            </article>
        `;
    }

    async loadPosts() {
        try {
            const postFiles = await this.getPostFiles();
            if (postFiles.length === 0) {
                return [];
            }

            const posts = await Promise.all(
                postFiles.map(file => this.fetchPostContent(file))
            );

            return posts
                .filter(post => post !== null)
                .sort((a, b) => b.date - a.date);
        } catch (error) {
            console.error('Error loading posts:', error);
            return [];
        }
    }

    async renderPosts() {
        const posts = await this.loadPosts();
        if (posts.length === 0) {
            this.postsContainer.innerHTML = `
                <div class="alert alert-info d-flex align-items-center" role="alert">
                    <i class="bi bi-info-circle me-2"></i>
                    <div>아직 작성된 포스트가 없습니다.</div>
                </div>
            `;
            return;
        }

        const postsHTML = posts.map(post => this.createPostCard(post)).join('');
        this.postsContainer.innerHTML = postsHTML;
    }
}

// Initialize blog posts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const blog = new BlogPosts();
    blog.renderPosts();
}); 