const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balloons = [];
const balloonCount = 15;

class Balloon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.radius = Math.random() * 20 + 15;
        this.speedY = Math.random() * 0.5 + 0.3;
        this.speedX = Math.sin(this.y * 0.01) * 0.5;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.03 + 0.01;
        this.color = this.getRandomColor();
        this.stringLength = Math.random() * 40 + 30;
    }

    getRandomColor() {
        const colors = [
            '#ff6f61', // coral
            '#ff8c42', // orange
            '#ffd23f', // yellow
            '#3bceac', // teal
            '#ee5a6f', // red
            '#c44569'  // dark red
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y -= this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;

        // Reset when off screen
        if (this.y < -100) {
            this.y = canvas.height + 50;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        // Draw string (rendered as small square blocks)
        ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
        for(let i = 0; i < 40; i += 8) {
            ctx.fillRect(this.x + this.radius/2 - 2, this.y + this.radius + i, 4, 4);
        }
    
        // Draw square balloon body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.radius * 1.5, this.radius * 1.5);
    
        // Draw square shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(this.x + 4, this.y + 4, this.radius / 3, this.radius / 3);
    }
}

function initBalloons() {
    for (let i = 0; i < balloonCount; i++) {
        balloons.push(new Balloon());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let balloon of balloons) {
        balloon.update();
        balloon.draw();
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initBalloons();
animate();