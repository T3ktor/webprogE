
        // Kezdeti adatok a helyseg.txt alapján
        let data = [
            { id: 1, nev: "Sousse", orszag: "Tunézia" },
            { id: 2, nev: "Djerba", orszag: "Tunézia" },
            { id: 3, nev: "Sharm El Sheikh", orszag: "Egyiptom" },
            { id: 4, nev: "Hurghada", orszag: "Egyiptom" }
        ];
        let nextId = 5;

        function renderTable() {
            const tbody = document.getElementById('tableBody');
            tbody.innerHTML = '';
            data.forEach(item => {
                tbody.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nev}</td>
                        <td>${item.orszag}</td>
                        <td>
                            <button onclick="editItem(${item.id})">Szerkesztés</button>
                            <button onclick="deleteItem(${item.id})">Törlés</button>
                        </td>
                    </tr>
                `;
            });
        }

        function saveItem() {
            const idInput = document.getElementById('helysegId').value;
            const nev = document.getElementById('nev').value;
            const orszag = document.getElementById('orszag').value;

            if (!nev || !orszag) return alert("Minden mezőt ki kell tölteni!");

            if (idInput) {
                // Frissítés (Update)
                const index = data.findIndex(d => d.id == idInput);
                if (index !== -1) {
                    data[index].nev = nev;
                    data[index].orszag = orszag;
                }
            } else {
                // Létrehozás (Create)
                data.push({ id: nextId++, nev, orszag });
            }
            clearForm();
            renderTable();
        }

        function editItem(id) {
            const item = data.find(d => d.id == id);
            if (item) {
                document.getElementById('helysegId').value = item.id;
                document.getElementById('nev').value = item.nev;
                document.getElementById('orszag').value = item.orszag;
            }
        }

        function deleteItem(id) {
            data = data.filter(d => d.id != id); // Törlés (Delete)
            renderTable();
        }

        function clearForm() {
            document.getElementById('helysegId').value = '';
            document.getElementById('nev').value = '';
            document.getElementById('orszag').value = '';
        }

        renderTable(); // Kezdeti renderelés (Read)
