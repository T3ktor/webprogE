// Ősosztály (Base Class)
class Shape {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.element = document.createElement('div');
    }

    // Metódus az alakzat kirajzolásához
    render() {
        this.element.className = 'shape-element';
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
        this.element.style.backgroundColor = this.color;
        
        // Kattintásra törölje magát az alakzat (opcionális extra)
        this.element.onclick = () => this.element.remove();
        
        document.body.appendChild(this.element);
    }
}

// Származtatott osztály (Kör)
class Circle extends Shape {
    constructor(x, y, size, color) {
        super(x, y, size, color); // Kötelező elem: super hívás
    }

    render() {
        super.render();
        this.element.style.borderRadius = '50%'; // Ettől lesz kör
    }
}

// Származtatott osztály (Négyzet)
class Square extends Shape {
    constructor(x, y, size, color) {
        super(x, y, size, color);
    }

    render() {
        super.render();
        // A négyzet kap egy kis árnyékot a stílus miatt
        this.element.style.boxShadow = "4px 4px 10px rgba(0,0,0,0.3)";
    }
}

// Segédfüggvények
function getRandomColor() {
    const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c', '#f1c40f'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomPosition(size) {
    const maxX = window.innerWidth - size - 20;
    const maxY = window.innerHeight - size - 20;
    return {
        x: Math.max(10, Math.random() * maxX),
        // A maxY értéket úgy állítjuk be, hogy a gombok (kb. 250px magasságig) alá kerüljenek
        y: Math.max(250, Math.random() * maxY) 
    };
}

// Gombok funkciói (Példányosítás)
function spawnCircle() {
    const size = Math.random() * 60 + 40; // 40-100px közötti méret
    const pos = getRandomPosition(size);
    const circle = new Circle(pos.x, pos.y, size, getRandomColor());
    circle.render();
}

function spawnSquare() {
    const size = Math.random() * 60 + 40;
    const pos = getRandomPosition(size);
    const square = new Square(pos.x, pos.y, size, getRandomColor());
    square.render();
}