
        // Ősosztály (Base Class)
        class Shape {
            constructor(x, y, size, color) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
                this.element = document.createElement('div');
            }

            // Metódus
            render() {
                this.element.className = 'shape-element';
                this.element.style.left = this.x + 'px';
                this.element.style.top = this.y + 'px';
                this.element.style.width = this.size + 'px';
                this.element.style.height = this.size + 'px';
                this.element.style.backgroundColor = this.color;
                
                // Kötelező elem: document.body.appendChild
                document.body.appendChild(this.element);
            }
        }

        // Származtatott osztály (Kör)
        class Circle extends Shape {
            constructor(x, y, size, color) {
                super(x, y, size, color); // Kötelező elem: super
            }

            // Felülírjuk/Kiegészítjük a render metódust
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
                // A négyzet kap egy kis árnyékot extraként
                this.element.style.boxShadow = "3px 3px 10px rgba(0,0,0,0.5)";
            }
        }

        // Segédfüggvény a véletlenszerű színekhez és pozíciókhoz
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function getRandomPosition(size) {
            const maxX = window.innerWidth - size;
            const maxY = window.innerHeight - size;
            return {
                x: Math.max(0, Math.random() * maxX),
                y: Math.max(150, Math.random() * maxY) // 150 a gombok alatti rész
            };
        }

        // Gombok funkciói
        function spawnCircle() {
            const size = Math.random() * 50 + 50; // 50-100px
            const pos = getRandomPosition(size);
            const circle = new Circle(pos.x, pos.y, size, getRandomColor());
            circle.render();
        }

        function spawnSquare() {
            const size = Math.random() * 50 + 50;
            const pos = getRandomPosition(size);
            const square = new Square(pos.x, pos.y, size, getRandomColor());
            square.render();
        }
