$(document).ready(function() {
    // Initialize an empty object to store the checked State and City IDs
    const checkedStatesCities = {};

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');

        // If the checkbox is checked, store the State or City ID in the object
        if ($(this).is(':checked')) {
            checkedStatesCities[id] = name;
        } else {
            // If the checkbox is unchecked, remove the State or City ID from the object
            delete checkedStatesCities[id];
        }

        // Update the h4 tag inside the div Locations with the list of States or Cities checked
        const checkedList = Object.values(checkedStatesCities).join(', ');
        $('.locations h4').text(checkedList);
    });

    // Listen for the button click event
    $('button').click(function() {
        // Collect the list of checked amenities
        const amenityIds = Object.keys(checkedAmenities);
        // Collect the list of checked States and Cities
        const stateCityIds = Object.keys(checkedStatesCities);

        // Send a POST request to places_search with the list of checked amenities, States, and Cities
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ amenities: amenityIds, states_cities: stateCityIds }),
            success: function(data) {
                // Clear the current places
                $('.places').empty();

                // Loop through the result and create article tags for each place
                data.forEach(function(place) {
                    var placeArticle = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedrooms${place.number_rooms != 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                            
                            <!-- Add a button to show/hide reviews -->
                            <button class="show-reviews-btn" data-place-id="${place.id}">Show Reviews</button>
                            
                            <!-- Reviews section -->
                            <div class="reviews" style="display: none;">
                                <h2>Reviews <span class="toggle-reviews" data-place-id="${place.id}">(show)</span></h2>
                                <div>
                                    <ul class="reviews-list">
                                        <!-- Reviews will be dynamically added here -->
                                    </ul>
                                </div>
                            </div>
                        </article>
                    `;
                    $('.places').append(placeArticle);
                });

                // Attach click event listener to the show reviews button
                $('.show-reviews-btn').click(function() {
                    const placeId = $(this).data('place-id');
                    const reviewsDiv = $(`.reviews[data-place-id="${placeId}"]`);
                    
                    if (reviewsDiv.is(':visible')) {
                        reviewsDiv.hide();
                    } else {
                        // Fetch and display reviews (you need to implement this)
                        fetchAndDisplayReviews(placeId);
                    }
                });
            },
            error: function(error) {
                console.log("Error fetching places:", error);
            }
        });
    });
    
    // Function to fetch and display reviews for a specific place
    function fetchAndDisplayReviews(placeId) {
        // Dummy function for demonstration, replace with actual logic to fetch reviews
        const reviewsList = $(`.reviews-list[data-place-id="${placeId}"]`);
        reviewsList.empty(); // Clear existing reviews
        
        // Dummy reviews (replace with actual fetched reviews)
        const dummyReviews = [
            { user: 'John Doe', date: '2024-03-01', text: 'Great place to stay!' },
            { user: 'Jane Smith', date: '2024-03-02', text: 'Lovely atmosphere and friendly staff.' }
        ];

        dummyReviews.forEach(function(review) {
            const reviewItem = `<li><h3>From ${review.user} on ${review.date}</h3><p>${review.text}</p></li>`;
            reviewsList.append(reviewItem);
        });

        // Show the reviews section
        $(`.reviews[data-place-id="${placeId}"]`).show();
        // Change the text of the toggle button
        $(`.toggle-reviews[data-place-id="${placeId}"]`).text('(hide)');
    }
});