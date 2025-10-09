// Variables globales pour la carte et les éléments graphiques
let map;
let activePolyline = null;
let activeMarkers = [];

// Fonction d'initialisation de la carte, appelée par l'API Google Maps
// IMPORTANT : Cette fonction DOIT être dans la portée globale (window)
window.initMap = function() {
    const paris = { lat: 48.8566, lng: 2.3522 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: paris
    });
    chargerParcours();
}

// Fonction pour charger les données des parcours depuis le fichier JSON avec l'API Fetch
async function chargerParcours() {
    try {
        // CORRECTION : Chemin correct vers le fichier JSON
        const response = await fetch('/running/courses.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        const data = await response.json();
        creerBoutonsSelection(data.parcours);
        // Affiche le premier parcours par défaut
        if (data.parcours.length > 0) {
            afficherParcours(data.parcours[0]);
        }
    } catch (error) {
        console.error("Impossible de charger les parcours :", error);
        document.getElementById("selection-parcours").innerHTML = "<p>Erreur de chargement des parcours.</p>";
    }
}

// Crée les boutons pour chaque parcours
function creerBoutonsSelection(parcours) {
    const container = document.getElementById('boutons-parcours');
    container.innerHTML = ''; // Nettoyer le conteneur avant d'ajouter les boutons
    parcours.forEach((course) => {
        const bouton = document.createElement('button');
        bouton.innerText = course.titre;
        bouton.addEventListener('click', () => afficherParcours(course));
        container.appendChild(bouton);
    });
}

// Efface le parcours précédemment affiché sur la carte
function effacerParcoursPrecedent() {
    if (activePolyline) {
        activePolyline.setMap(null);
    }
    activeMarkers.forEach(marker => marker.setMap(null));
    activeMarkers = [];
}

// Affiche le parcours sélectionné sur la carte
function afficherParcours(parcours) {
    effacerParcoursPrecedent();

    const bounds = new google.maps.LatLngBounds();
    const cheminPoints = [];

    // Créer les marqueurs et le chemin
    parcours.points.forEach((point, index) => {
        const position = { lat: parseFloat(point.lat), lng: parseFloat(point.lng) };
        cheminPoints.push(position);
        bounds.extend(position);

        const marker = new google.maps.Marker({
            position: position,
            map: map,
            label: `${index + 1}`,
            title: `Point ${index + 1}`
        });
        activeMarkers.push(marker);
    });

    // Créer la ligne qui relie les points
    activePolyline = new google.maps.Polyline({
        path: cheminPoints,
        geodesic: true,
        strokeColor: parcours.couleur || '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });

    activePolyline.setMap(map);

    // Ajuster le zoom de la carte pour voir tout le parcours
    map.fitBounds(bounds);
}