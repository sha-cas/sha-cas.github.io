// filepath: /c:/Users/sharo/homework-1-sha-cas/pacman.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pacman-canvas');
    const context = canvas.getContext('2d');

    // Example: Draw a simple Pac-Man shape
    function drawPacMan() {
        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(400, 300, 50, 0.2 * Math.PI, 1.8 * Math.PI); // Pac-Man shape
        context.lineTo(400, 300);
        context.fill();
    }

    drawPacMan();
});