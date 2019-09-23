$(document).ready(function () {

    // Create array of starter characters
    var characters = ["Leslie Knope", "Tom Haverford", "Ron Swanson"];

    // Create function that runs through array and puts those values into buttons
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < characters.length; i++) {
            var button = $("<button>");
            button.addClass("character-btn");
            button.attr("data-name", characters[i]);
            button.text(characters[i]);
            $("#buttons-view").append(button);
        }
    }

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    //Create on click function that returns GIFs for that specific button's character
    $(".character-btn").on("click", function (event) {
        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aVrBqR9BhdBa1956eBfc5ZJN3tJd86hm&q=" + character + "&limit=10";

        // Create ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });
    });

    // Create on click event that adds the user's input into the array
    $("#add-character").on("click", function (event) {
        event.preventDefault();
        var character = $("#character-input").val().trim();
        characters.push(character);
        renderButtons();
    });

})