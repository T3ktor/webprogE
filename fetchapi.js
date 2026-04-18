
        const apiUrl = 'api.php';

        async function loadData() {
            const res = await fetch(apiUrl);
            const data = await res.json();
            const tbody = document.getElementById('fetchTableBody');
            tbody.innerHTML = '';
            data.forEach(item => {
                tbody.innerHTML += `<tr>
                    <td>${item.id}</td><td>${item.nev}</td><td>${item.orszag}</td>
                    <td>
                        <button onclick="editItem(${item.id}, '${item.nev}', '${item.orszag}')">Szerkesztés</button>
                        <button onclick="deleteItem(${item.id})">Törlés</button>
                    </td></tr>`;
            });
        }

        async function saveItem() {
            const id = document.getElementById('f_helysegId').value;
            const nev = document.getElementById('f_nev').value;
            const orszag = document.getElementById('f_orszag').value;

            if (!nev || !orszag) return alert("Minden mezőt tölts ki!");

            const method = id ? 'PUT' : 'POST';
            const body = JSON.stringify({ id, nev, orszag });

            await fetch(apiUrl, { method, headers: { 'Content-Type': 'application/json' }, body });
            document.getElementById('f_helysegId').value = '';
            document.getElementById('f_nev').value = '';
            document.getElementById('f_orszag').value = '';
            loadData();
        }

        function editItem(id, nev, orszag) {
            document.getElementById('f_helysegId').value = id;
            document.getElementById('f_nev').value = nev;
            document.getElementById('f_orszag').value = orszag;
        }

        async function deleteItem(id) {
            await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
            loadData();
        }

        loadData();