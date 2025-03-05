// filepath: /c:/Users/sharo/homework-1-sha-cas/pacman.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pacman-canvas');
    const context = canvas.getContext('2d');
    const tileSize = 20;
    const rows = canvas.height / tileSize;
    const cols = canvas.width / tileSize;

    const pacMan = {
        x: 1,
        y: 1,
        size: tileSize,
        direction: 'right'
    };

    const ghosts = [
        { x: 10, y: 10, direction: 'left' },
        { x: 15, y: 15, direction: 'up' }
    ];

    const map = [
        // 0: empty, 1: wall, 2: pellet
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function drawMap() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (map[row][col] === 1) {
                    context.fillStyle = 'blue';
                    context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                } else if (map[row][col] === 2) {
                    context.fillStyle = 'white';
                    context.beginPath();
                    context.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 5, 0, 2 * Math.PI);
                    context.fill();
                }
            }
        }
    }

    function drawPacMan() {
        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(pacMan.x * tileSize + tileSize / 2, pacMan.y * tileSize + tileSize / 2, pacMan.size / 2, 0.2 * Math.PI, 1.8 * Math.PI);
        context.lineTo(pacMan.x * tileSize + tileSize / 2, pacMan.y * tileSize + tileSize / 2);
        context.fill();
    }

    function drawGhosts() {
        ghosts.forEach(ghost => {
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(ghost.x * tileSize + tileSize / 2, ghost.y * tileSize + tileSize / 2, tileSize / 2, 0, 2 * Math.PI);
            context.fill();
        });
    }

    function movePacMan() {
        if (pacMan.direction === 'right' && map[pacMan.y][pacMan.x + 1] !== 1) {
            pacMan.x++;
        } else if (pacMan.direction === 'left' && map[pacMan.y][pacMan.x - 1] !== 1) {
            pacMan.x--;
        } else if (pacMan.direction === 'up' && map[pacMan.y - 1][pacMan.x] !== 1) {
            pacMan.y--;
        } else if (pacMan.direction === 'down' && map[pacMan.y + 1][pacMan.x] !== 1) {
            pacMan.y++;
        }
    }

    function moveGhosts() {
        ghosts.forEach(ghost => {
            const directions = ['left', 'right', 'up', 'down'];
            const direction = directions[Math.floor(Math.random() * directions.length)];
            if (direction === 'right' && map[ghost.y][ghost.x + 1] !== 1) {
                ghost.x++;
            } else if (direction === 'left' && map[ghost.y][ghost.x - 1] !== 1) {
                ghost.x--;
            } else if (direction === 'up' && map[ghost.y - 1][ghost.x] !== 1) {
                ghost.y--;
            } else if (direction === 'down' && map[ghost.y + 1][ghost.x] !== 1) {
                ghost.y++;
            }
        });
    }

    function update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawMap();
        movePacMan();
        drawPacMan();
        moveGhosts();
        drawGhosts();
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            pacMan.direction = 'right';
        } else if (event.key === 'ArrowLeft') {
            pacMan.direction = 'left';
        } else if (event.key === 'ArrowUp') {
            pacMan.direction = 'up';
        } else if (event.key === 'ArrowDown') {
            pacMan.direction = 'down';
        }
    });

    setInterval(update, 200);
});