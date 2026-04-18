        const { useState, useEffect } = React;

        function AxiosApp() {
            const [data, setData] = useState([]);
            const [formData, setFormData] = useState({ id: '', nev: '', orszag: '' });
            const apiUrl = 'api.php';

            useEffect(() => { loadData(); }, []);

            const loadData = () => {
                axios.get(apiUrl).then(res => setData(res.data));
            };

            const handleSave = () => {
                if (!formData.nev || !formData.orszag) return alert("Hiányzó adatok!");
                
                if (formData.id) {
                    axios.put(apiUrl, formData).then(loadData);
                } else {
                    axios.post(apiUrl, formData).then(loadData);
                }
                setFormData({ id: '', nev: '', orszag: '' });
            };

            const handleDelete = (id) => {
                axios.delete(`${apiUrl}?id=${id}`).then(loadData);
            };

            return (
                <div>
                    <h1>Helységek kezelése (React + Axios)</h1>
                    <div style={{background: "#eef", padding: "15px", width: "57%"}}>
                        <div className="form-group">
                            <label>Név: </label>
                            <input type="text" value={formData.nev} onChange={e => setFormData({...formData, nev: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Ország: </label>
                            <input type="text" value={formData.orszag} onChange={e => setFormData({...formData, orszag: e.target.value})} />
                        </div>
                        <button onClick={handleSave}>Mentés</button>
                    </div>

                    <table>
                        <thead><tr><th>ID</th><th>Név</th><th>Ország</th><th>Műveletek</th></tr></thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td><td>{item.nev}</td><td>{item.orszag}</td>
                                    <td>
                                        <button onClick={() => setFormData(item)}>Szerkesztés</button>
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
        root.render(<AxiosApp />);