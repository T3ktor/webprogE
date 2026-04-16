        const { useState } = React;

        // --- 1. Alkalmazás: Tic-Tac-Toe ---
        function TicTacToe() {
            const [board, setBoard] = useState(Array(9).fill(null));
            const [xIsNext, setXIsNext] = useState(true);

            const calculateWinner = (squares) => {
                const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
                for (let i = 0; i < lines.length; i++) {
                    const [a, b, c] = lines[i];
                    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
                }
                return null;
            };

            const handleClick = (i) => {
                const newBoard = [...board];
                if (calculateWinner(board) || newBoard[i]) return;
                newBoard[i] = xIsNext ? 'X' : 'O';
                setBoard(newBoard);
                setXIsNext(!xIsNext);
            };

            const winner = calculateWinner(board);
            const status = winner ? `Nyertes: ${winner}` : `Következő játékos: ${xIsNext ? 'X' : 'O'}`;

            return (
                <div>
                    <h2>Amőba (Tic-Tac-Toe)</h2>
                    <p><b>{status}</b></p>
                    <div className="board">
                        {board.map((cell, i) => (
                            <button key={i} className="square" onClick={() => handleClick(i)}>{cell}</button>
                        ))}
                    </div>
                    <button style={{marginTop: '10px'}} onClick={() => setBoard(Array(9).fill(null))}>Új játék</button>
                </div>
            );
        }

        // --- 2. Alkalmazás: Számológép ---
        function Calculator() {
            const [num1, setNum1] = useState('');
            const [num2, setNum2] = useState('');
            const [result, setResult] = useState(null);

            const handleCalc = (op) => {
                const n1 = parseFloat(num1);
                const n2 = parseFloat(num2);
                if (isNaN(n1) || isNaN(n2)) return alert("Írj be számokat!");
                if (op === '+') setResult(n1 + n2);
                if (op === '-') setResult(n1 - n2);
                if (op === '*') setResult(n1 * n2);
                if (op === '/') setResult(n2 !== 0 ? n1 / n2 : "Nullával nem osztunk");
            };

            return (
                <div className="calc-container">
                    <h2>Számológép</h2>
                    <input type="number" className="calc-input" value={num1} onChange={e => setNum1(e.target.value)} placeholder="1. szám" />
                    <input type="number" className="calc-input" value={num2} onChange={e => setNum2(e.target.value)} placeholder="2. szám" />
                    <div>
                        <button onClick={() => handleCalc('+')}>+</button>
                        <button onClick={() => handleCalc('-')}>-</button>
                        <button onClick={() => handleCalc('*')}>*</button>
                        <button onClick={() => handleCalc('/')}>/</button>
                    </div>
                    {result !== null && <h3>Eredmény: {result}</h3>}
                </div>
            );
        }

        // --- Fő SPA Komponens ---
        function App() {
            const [activeApp, setActiveApp] = useState('tictactoe');

            return (
                <div>
                    <h1>Egyoldalas alkalmazás (SPA)</h1>
                    <div className="nav-buttons">
                        <button onClick={() => setActiveApp('tictactoe')}>Amőba megnyitása</button>
                        <button onClick={() => setActiveApp('calculator')}>Számológép megnyitása</button>
                    </div>
                    <hr />
                    {activeApp === 'tictactoe' ? <TicTacToe /> : <Calculator />}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);