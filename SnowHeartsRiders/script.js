// Daten im LocalStorage speichern beim Absenden des Formulars
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    const newMember = {
        vorname: document.getElementById('vorname').value,
        nachname: document.getElementById('nachname').value,
        spielername: document.getElementById('spielername').value,
        spitzname: document.getElementById('spitzname').value || '-',
        level: document.getElementById('level').value,
        starrider: document.getElementById('starrider').value,
        alter: document.getElementById('alter').value,
        email: document.getElementById('email').value,
        discord: document.getElementById('discord').value,
        anmerkungen: document.getElementById('anmerkungen').value || '-'
    };

    let members = JSON.parse(localStorage.getItem('clubMembers')) || [];
    members.push(newMember);
    localStorage.setItem('clubMembers', JSON.stringify(members));

    alert('Deine Bewerbung wurde erfolgreich abgesendet!');
});

// Admin-Login Prüfung mit festem Passwort "Lordileo123."
function loginAdmin() {
    const emailInput = document.getElementById('adminEmail').value.trim().toLowerCase();
    const passwordInput = document.getElementById('adminPassword').value;

    const allowedEmails = ['evaschafer748@gmail.com', 'schaefeemalin48@gmail.com'];
    const adminPassword = "Lordileo123.";

    if (allowedEmails.includes(emailInput) && passwordInput === adminPassword) {
        alert('Erfolgreich als Admin eingeloggt!');
        document.getElementById('adminDashboard').style.display = 'block';
        loadAdminData();
    } else {
        alert('Zugriff verweigert! Ungültige E-Mail oder falsches Passwort.');
    }
}

// Lade Mitgliedsdaten in die Admin-Tabelle
function loadAdminData() {
    const membersTableBody = document.getElementById('membersTableBody');
    membersTableBody.innerHTML = '';

    const members = JSON.parse(localStorage.getItem('clubMembers')) || [];

    if (members.length === 0) {
        membersTableBody.innerHTML = '<tr><td colspan="10" style="text-align:center; color: #94a3b8;">Noch keine Registrierungen vorhanden.</td></tr>';
        return;
    }

    members.forEach(m => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(m.vorname)}</td>
            <td>${escapeHtml(m.nachname)}</td>
            <td>${escapeHtml(m.spielername)}</td>
            <td>${escapeHtml(m.spitzname)}</td>
            <td>${escapeHtml(m.level)}</td>
            <td>${escapeHtml(m.starrider)}</td>
            <td>${escapeHtml(m.alter)}</td>
            <td>${escapeHtml(m.email)}</td>
            <td>${escapeHtml(m.discord)}</td>
            <td>${escapeHtml(m.anmerkungen)}</td>
        `;
        membersTableBody.appendChild(row);
    });
}

// Hilfsfunktion zum Schutz vor unsauberem Text
function escapeHtml(text) {
    if (!text) return '-';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}