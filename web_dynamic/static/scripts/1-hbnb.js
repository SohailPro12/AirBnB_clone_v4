$(document).ready(function() {
	// Initialize an empty object to score the amenity IDs
	const checkAmenities = {};

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
});
