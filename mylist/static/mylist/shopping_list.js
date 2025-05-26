// Neues laden der Seite erzwingen
function reloadPage() {
    location.reload();
}

function addItem() {
    let itemName = prompt("Neues Element hinzufügen");

    let token = "{{ csrf_token }}";
    let formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("csrfmiddlewaretoken", token);

    fetch("/mylist/", {
        method: "POST",
        body: formData,
    })
        .then(response => { // Die Response des Fetch wird hier entgegengenommen
            if (response.ok) { // Überprüfen, ob die Anfrage erfolgreich war (Status 2xx)
                reloadPage(); // Seite neu laden, wenn die Anfrage erfolgreich war
            } else {
                console.error("Fehler beim Hinzufügen des Elements:", response.status);
                // Hier könnten Sie eine Fehlermeldung für den Benutzer anzeigen
            }
        })
        .catch(error => {
            console.error("Netzwerkfehler beim Hinzufügen des Elements:", error);
            // Hier könnten Sie eine Fehlermeldung für den Benutzer anzeigen
        });
}

function deleteItem(itemId) {
    let token = "{{ csrf_token }}";

    fetch(`/mylist/delete/${itemId}/`, { // URL mit der Element-ID
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Optional, je nach Ihrer Backend-Implementierung
            "X-CSRFToken": token, // Django CSRF-Schutz
        },
        // Wenn Ihr Backend die ID im Request-Body erwartet, verwenden Sie stattdessen:
        // body: JSON.stringify({ itemId: itemId }),
    })
        .then(response => {
            if (response.ok) {
                // Erfolgreich gelöscht, die Seite neu laden, um die Änderungen anzuzeigen
                reloadPage();
            } else {
                console.error("Fehler beim Löschen des Elements:", response.status);
                // Hier könnten Sie eine Fehlermeldung für den Benutzer anzeigen
            }
        })
        .catch(error => {
            console.error("Netzwerkfehler beim Löschen des Elements:", error);
            // Hier könnten Sie eine Fehlermeldung für den Benutzer anzeigen
        });
}

function checkItem(itemId) {
    let token = "{{ csrf_token }}";

    fetch(`/mylist/check/${itemId}/`, { // URL mit der Element-ID
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Optional, je nach Ihrer Backend-Implementierung
            "X-CSRFToken": token, // Django CSRF-Schutz
        },
        // body: JSON.stringify({}), // Optional: Sie könnten hier Daten senden, falls nötig
    })
        .then(response => {
            if (response.ok) {
                // Erfolgreich geändert, die Seite neu laden, um die Änderungen anzuzeigen
                reloadPage();
            } else {
                console.error("Fehler beim Ändern des Check-Status:", response.status);
                // Hier könnten Sie eine Fehlermeldung für den Benutzer anzeigen
            }
        })
        .catch(error => {
            console.error("Netzwerkfehler beim Ändern des Check-Status:", error);
            // Hier könnten Sie eine Fehlermeldung für den Benutzer anzeigen
        });
}