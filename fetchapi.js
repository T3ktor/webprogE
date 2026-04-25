const apiUrl = 'api.php';

// Adatok betöltése az adatbázisból (Read)
async function loadData() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const tbody = document.getElementById('fetchTableBody');
        
        if (!tbody) return;
        tbody.innerHTML = '';

        data.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.nev}</td>
                    <td>${item.orszag}</td>
                    <td>
                        <button class="edit-btn" onclick="editItem(${item.id}, '${item.nev}', '${item.orszag}')">Szerkesztés</button>
                        <button class="delete-btn" onclick="deleteItem(${item.id})">Törlés</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
    }
}

// Mentés vagy Frissítés (Create / Update)
async function saveItem() {
    const id = document.getElementById('f_helysegId').value;
    const nev = document.getElementById('f_nev').value;
    const orszag = document.getElementById('f_orszag').value;

    if (!nev || !orszag) return alert("Minden mezőt tölts ki!");

    const method = id ? 'PUT' : 'POST';
    const body = JSON.stringify({ id, nev, orszag });

    try {
        await fetch(apiUrl, { 
            method, 
            headers: { 'Content-Type': 'application/json' }, 
            body 
        });
        
        // Form ürítése
        document.getElementById('f_helysegId').value = '';
        document.getElementById('f_nev').value = '';
        document.getElementById('f_orszag').value = '';
        
        loadData(); // Táblázat frissítése
    } catch (error) {
        alert("Hiba történt a mentés során!");
    }
}

// Szerkesztés előkészítése
function editItem(id, nev, orszag) {
    document.getElementById('f_helysegId').value = id;
    document.getElementById('f_nev').value = nev;
    document.getElementById('f_orszag').value = orszag;
    
    // Gördülés a formhoz, hogy lássuk, mit szerkesztünk
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Törlés az adatbázisból (Delete)
async function deleteItem(id) {
    if (!confirm('Biztosan törölni akarod ezt a rekordot az adatbázisból?')) return;
    
    try {
        await fetch(`${apiUrl}?id=${id}`, { method: 'DELETE' });
        loadData();
    } catch (error) {
        alert("Hiba történt a törlés során!");
    }
}

// Kezdeti betöltés
document.addEventListener('DOMContentLoaded', loadData);