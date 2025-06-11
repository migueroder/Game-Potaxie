class Game {
 constructor() {
    this.container = document.getElementById("game-container");
    this.personaje = null;
    this.monedas = [];
    this.puntuacion = 0;
    this.crearEscenario();
    this.agregarEventos();
    this.puntosElement = document.getElementById("puntos");
 }

 crearEscenario() {
    this.personaje = new Personaje();
    this.container.appendChild(this.personaje.element);
    for (let i = 0; i < 5; i++) {
        const moneda = new Moneda(imagenesMonedas[i]); // Llamo a la variable donde están los array y cada moneda recibe una imagen diferente con la i.
        this.monedas.push(moneda);
        this.container.appendChild(moneda.element);
    }
 }

 agregarEventos() {
    window-addEventListener("keydown", (e) => this.personaje.mover(e));
    this.checkColisiones();
 }

 checkColisiones() {
    const coinSound = document.getElementById("coin-sound"); // Llamo  al id del sonido del HTML.
    setInterval(() => {
        this.monedas.forEach((moneda, index) => {
            if (this.personaje.colisionaCon(moneda)) {
                this.container.removeChild(moneda.element);
                this.monedas.splice(index, 1);
                this.actualizarPuntuacion(10);
                coinSound.play(); // Para reproducir el sonido de la moneda.
            }
        })
    },100)
 }
 actualizarPuntuacion(puntos) {
    this.puntuacion += puntos;
    this.puntosElement.textContent = `Puntos: ${this.puntuacion}`;
 }
}

class Personaje {
    constructor() {
        this.x = 50;
        this.y = 290;
        this.width = 90;
        this.height = 90;
        this.velocidad = 10;
        this.saltando = false;
        this.element = document.createElement("img"); // Creé un elemento "img" en lugar de "div" para cambiar el punto por una imagen.
        this.element.src = "https://i.ibb.co/wNHCDYKq/puchaina.png"; // Agregué el elemento SRC para la fuente de la imagen del personaje.
        this.element.style.position = "absolute"; // Para la posición del personaje.
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.actualizarPosicion();
    }

    mover(evento) {
         const contenedor = document.getElementById("game-container");
         const limiteDerecho = contenedor.offsetWidth - this.width; // Agregada variable para aplicar limites a lo ancho.

        if (evento.key === "ArrowRight") {
            this.x += this.velocidad;
            if (this.x > limiteDerecho) this.x = limiteDerecho; // Para que choque al llegar al limite derecho.
            this.element.style.transform = "scaleX(1)"; // Para mirar a la derecha.
        } else if (evento.key === "ArrowLeft") {
            this.x -= this.velocidad;
            if (this.x < 0) this.x = 0; // Para que detenga su movimiento al llegar al limite izquierdo.
            this.element.style.transform = "scaleX(-1)"; // Para mirar hacia la izquierda.
        } else if (evento.key === "ArrowUp") {
            this.saltar();
        }
        this.actualizarPosicion();
    }

    saltar() {
        this.saltando = true;
        let alturaMaxima = this.y - 100;
        const salto = setInterval(() => {
            if (this.y > alturaMaxima) {
                this.y -= 10;
            } else {
                clearInterval(salto);
                this.caer();
            }
            this.actualizarPosicion();
        },20);
    }

    caer() {
        const gravedad = setInterval(() => {
            if (this.y < 300) {
                this.y += 10;
            } else {
                clearInterval(gravedad);
            }
            this.actualizarPosicion();
        },20);
    }

    actualizarPosicion() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    colisionaCon(objeto) {
        return (
      this.x < objeto.x + objeto.width &&
      this.x + this.width > objeto.x &&
      this.y < objeto.y + objeto.height &&
      this.y + this.height > objeto.y
    );
    }
}

class Moneda {
    constructor(imagenSrc) {
        this.x = Math.random() * 700 + 50;
        this.y = Math.random() * 250 + 50;
        this.width = 50;
        this.height = 50;
        this.element = document.createElement("img"); // Creé elemento "img" en lugar de "div".
        this.element.src = imagenSrc; // Ruta de la imagen de las monedas.
        this.element.style.position = "absolute"; 
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.animation = "flotar 2s ease-in-out infinite"; // Le da una leve animación al elemento de movimiento infinito.
        const delay = Math.random() * 2; // Variable matematico entre 0 y 2 segundos.
        this.element.style.animationDelay = `${delay}s`;
        this.element.style.animation = "flotar 2s ease-in-out infinite, brilloTitilante 1s ease-in-out infinite";
        this.actualizarPosicion();
    }
    actualizarPosicion() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}

// Array con las 5 rutas de las distintas imagenes de monedas:
const imagenesMonedas = [
  "https://img.icons8.com/?size=96&id=QSM9VGJSJMgh&format=png",
  "https://img.icons8.com/?size=96&id=UJikDF3wj2jk&format=png",
  "https://img.icons8.com/?size=96&id=5wGnhtHODuE9&format=png",
  "https://img.icons8.com/?size=96&id=cy0WzlUnunku&format=png",
  "https://img.icons8.com/?size=96&id=wyJ7oMo7IdEZ&format=png",
];

const juego = new Game();