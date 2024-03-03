$(document).ready(function() {
        // Initialize an empty object to score the amenity IDs
        const checkedAmenities = {};

        // Listen for changes on each input checkbox tag
        $('input[type="checkbox"]').change(function() {
                const amenityId = $(this).data('id');
                const amenityName = $(this).data('name');

                // If the checkbox is checked, store the Amenity ID in the object
                if ($(this).is(':checked')) {
                        checkedAmenities[amenityId] = amenityName;
                } else {
                        // If the checkbox is unchecked, remove the Amenity ID from the object
                        delete checkedAmenities[amenityId];
                }

                // Update the h4 tag inside the div with the class 'amenities' with the list of checked Amenities
                const amenitiesList = Object.values(checkedAmenities).join(', ');
                $('amenities h4').text(amenitiesList);
        });

        // Listen for the button click event
        $('button').click(function() {
		// Collect the list of checked amenities
		const amenityIds = Object.keys(checkedAmenities);

		// Send a POST request to places_search with the the list of checked amenities
                $.ajax({
                        url: "http://0.0.0.0:5001/api/v1/places_search",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({ amenities: amenityIds }),
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
						    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : "}</div>
                                                </div>
						<div class="description">
                                                        ${place.description}
                                                </div>
                                            </article>
                                         `;
                                         $('.places').append(placeArticle);
                                });
                        },
			error: function(error) {
				console.log("Error fetching places:", error);
			}
		});
	});
});
