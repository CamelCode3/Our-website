const canvas = document.getElementById("sandstorm");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let numParticles = Math.floor(window.innerWidth * window.innerHeight / 250); // تكثيف الجزيئات

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1;

    this.speedX = Math.random() * 15 + 10; // تتحرك بسرعة كبيرة لليمين
    this.speedY = Math.random() * 10 + 5; // تسقط للأسفل ولكن بشكل متعرج  
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.3 - 0.15;
    this.windEffect = Math.random() * 2 - 1.5;
    
    this.color = `rgba(255, 230, 180, ${Math.random() * 0.8 + 0.2})`;
  }

  update() {
    this.x += this.speedX + Math.sin(this.angle) * 10 + this.windEffect * 2;
    this.y += this.speedY + Math.cos(this.angle) * 5;
    this.angle += this.angleSpeed;

    if (this.x > canvas.width || this.y > canvas.height) {
      this.reset();
      this.y = Math.random() * canvas.height * 0.3; //Sand Start From Up To Down
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  numParticles = Math.floor(window.innerWidth * window.innerHeight / 250);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
  requestAnimationFrame(animate);
}

initParticles();
animate();

function toggleMenu() {
  console.log('Menu icon clicked'); // إضافة تسجيل للتأكد من استدعاء الدالة
  const navList = document.querySelector('nav ul');
  navList.classList.toggle('active');
  }