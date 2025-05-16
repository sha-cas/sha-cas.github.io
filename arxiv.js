// Updated 5/16/2025 3:15
// filepath: /c:/Users/sharo/homework-1-sha-cas/arxiv.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('papers-container');

    async function fetchPapers() {
        // Replace 'machine+learning' with your keywords, using + for spaces
        const response = await fetch('https://export.arxiv.org/api/query?search_query=all:machine+learning&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending');
        const data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const entries = xml.querySelectorAll('entry');

        entries.forEach(entry => {
            const title = entry.querySelector('title')?.textContent.trim() || "No title";
            // Collect all authors
            const authors = Array.from(entry.querySelectorAll('author > name')).map(a => a.textContent).join(', ');
            const summary = entry.querySelector('summary')?.textContent.trim() || "No summary";
            // Find the PDF link
            let pdfLink = "#";
            entry.querySelectorAll('link').forEach(link => {
                if (link.getAttribute('type') === 'application/pdf') {
                    pdfLink = link.getAttribute('href');
                }
            });

            const paperElement = document.createElement('div');
            paperElement.className = "arxiv-paper";
            paperElement.innerHTML = `
                <h2>${title}</h2>
                <p><strong>Authors:</strong> ${authors}</p>
                <p>${summary}</p>
                <a href="${pdfLink}" target="_blank">Read PDF</a>
                <hr>
            `;
            container.appendChild(paperElement);
        });
    }

    fetchPapers();
});
