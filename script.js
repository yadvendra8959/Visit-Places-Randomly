document.addEventListener('DOMContentLoaded', () => {
    const placeForm = document.getElementById('placeForm');
    const placeInput = document.getElementById('placeInput');
    const placeList = document.getElementById('placeList');
    const randomButton = document.getElementById('randomButton');
    const randomPlaceDisplay = document.getElementById('randomPlaceDisplay');

    // Load places from LocalStorage
    loadPlaces();

    placeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const placeValue = placeInput.value.trim();
        if (placeValue) {
            addPlace(placeValue);
            savePlace(placeValue);

            // Clear input field after adding
            placeInput.value = '';
        }
    });

    // Function to add place to the list
    function addPlace(place) {
        const li = document.createElement('li');
        li.textContent = place;
        placeList.appendChild(li);
    }

    // Function to save place to LocalStorage
    function savePlace(place) {
        let places = getPlacesFromStorage();
        places.push(place);
        localStorage.setItem('places', JSON.stringify(places));
    }

    // Function to load places from LocalStorage
    function loadPlaces() {
        let places = getPlacesFromStorage();
        places.forEach((place) => {
            addPlace(place);
        });
    }

    // Helper function to get places from LocalStorage
    function getPlacesFromStorage() {
        let places = localStorage.getItem('places');
        return places ? JSON.parse(places) : [];
    }

    // Helper function to remove place from LocalStorage
    function removePlaceFromStorage(place) {
        let places = getPlacesFromStorage();
        const updatedPlaces = places.filter(storedPlace => storedPlace !== place);
        localStorage.setItem('places', JSON.stringify(updatedPlaces));
    }

    // Add event listener for random button
    randomButton.addEventListener('click', () => {
        let places = getPlacesFromStorage();
        if (places.length > 0) {
            const randomIndex = Math.floor(Math.random() * places.length);
            const randomPlace = places[randomIndex];
            randomPlaceDisplay.textContent = `Random Place: ${randomPlace}`;
            removePlaceFromUI(randomPlace);
            removePlaceFromStorage(randomPlace);
        } else {
            randomPlaceDisplay.textContent = "No places available.";
        }
    });

    // Function to remove place from UI
    function removePlaceFromUI(place) {
        const listItems = Array.from(placeList.getElementsByTagName('li'));
        listItems.forEach(item => {
            if (item.textContent === place) {
                placeList.removeChild(item);
            }
        });
    }
});
