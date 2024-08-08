document.addEventListener('DOMContentLoaded', () => {
    const placeForm = document.getElementById('placeForm');
    const placeInput = document.getElementById('placeInput');
    const placeList = document.getElementById('placeList');
    const randomButton = document.getElementById('randomButton');
    const randomPlaceDisplay = document.getElementById('randomPlaceDisplay');
    // For POp up
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');
    const closePopup = document.getElementById('closePopup');

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

            //  for pop up start
            popupText.innerHTML = `We Will Go <br><br>"${randomPlace}"`;            showPopup();
             //  for pop up end

            // randomPlaceDisplay.textContent = `WE Will Go : ${randomPlace}`;
            // randomPlaceDisplay.style.color = 'white'; 
            removePlaceFromUI(randomPlace);
            removePlaceFromStorage(randomPlace);
        } else {
            // randomPlaceDisplay.textContent = "No places available.";
            // randomPlaceDisplay.style.color = 'white';
            // randomPlaceDisplay.classList.remove('fade-in'); 
             
            //  for pop up start
            popupText.textContent = "Sorry! No Places Available.";
            showPopup();
            //  for pop up end

        }
    });

      //  for pop up start

          // Function to show the popup
    function showPopup() {
        popup.classList.remove('hidden');
    }
    // Close the popup when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.classList.add('hidden');
        }
    });

      //  for pop up end



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
