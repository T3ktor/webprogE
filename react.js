
        const { useState } = React;

        function App() {
            // Kezdeti állapot beállítása a helyseg.txt alapján
            const [data, setData] = useState([
                { id: 1, nev: "Sousse", orszag: "Tunézia" },
                { id: 2, nev: "Djerba", orszag: "Tunézia" },
                { id: 3, nev: "Sharm El Sheikh", orszag: "Egyiptom" },
                { id: 4, nev: "Hurghada", orszag: "Egyiptom" }
            ]);
            const [formData, setFormData] = useState({ id: null, nev: '', orszag: '' });

            const handleSave = () => {
                if (!formData.nev || !formData.orszag) return alert("Minden mezőt ki kell tölteni!");
                
                if (formData.id) {
                    // Frissítés
                    setData(data.map(item => item.id === formData.id ? formData : item));
                } else {
                    // Új hozzáadása
                    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
                    setData([...data, { ...formData, id: newId }]);
                }
                setFormData({ id: null, nev: '', orszag: '' }); // Form ürítése
            };

            const handleEdit = (item) => setFormData(item);
            
            const handleDelete = (id) => setData(data.filter(item => item.id !== id));

            return (
                <div>
                    <h1>Helységek kezelése (React CRUD)</h1>
                    <div style={{background: "#f9f9f9", padding: "15px", width: "57%"}}>
                        <div className="form-group">
                            <label>Helység neve: </label>
                            <input type="text" value={formData.nev} onChange={(e) => setFormData({...formData, nev: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Ország: </label>
                            <input type="text" value={formData.orszag} onChange={(e) => setFormData({...formData, orszag: e.target.value})} />
                        </div>
                        <button onClick={handleSave}>Mentés</button>
                    </div>

                    <table>
                        <thead>
                            <tr><th>ID</th><th>Név</th><th>Ország</th><th>Műveletek</th></tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nev}</td>
                                    <td>{item.orszag}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)}>Szerkesztés</button>
                                        <button onClick={() => handleDelete(item.id)}>Törlés</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);