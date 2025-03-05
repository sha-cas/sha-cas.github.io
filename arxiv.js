// filepath: /c:/Users/sharo/homework-1-sha-cas/arxiv.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('papers-container');

    async function fetchPapers() {
        const response = await fetch('https://export.arxiv.org/api/query?search_query=all:your-keywords&start=0&max_results=10');
        const data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const entries = xml.querySelectorAll('entry');

        entries.forEach(entry => {
            const title = entry.querySelector('title').textContent;
            const author = entry.querySelector('author > name').textContent;
            const summary = entry.querySelector('summary').textContent;
            const link = entry.querySelector('link[title="pdf"]').getAttribute('href');

            const paperElement = document.createElement('div');
            paperElement.innerHTML = `
                <h2>${title}</h2>
                <p><strong>Author:</strong> ${author}</p>
                <p>${summary}</p>
                <a href="${link}" target="_blank">Read PDF</a>
            `;
            container.appendChild(paperElement);
        });
    }

    fetchPapers();
});