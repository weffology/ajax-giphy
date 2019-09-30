$(document).ready(function () {

    //Create some global variables
    var characterURL = "";
    var characterRating = "";

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
            $("#buttons-view").append(' ');
        }
    }

    //Create function that builds div then pushes each character's GIFS into it
    function returnCharacter() {
        var characterDiv = $("<div>");
        characterDiv.append("<p>Rating: " + characterRating + "</p>");
        characterDiv.append("<img src=" + characterURL + ">");
        $("#gifs-view").prepend(characterDiv);
    }

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    //Create on click function that returns GIFs for that specific button's character
    $(document).on("click",".character-btn", function (event) {
        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aVrBqR9BhdBa1956eBfc5ZJN3tJd86hm&q=" + character + "&limit=10";

        // Create ajax call
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json",
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                characterURL = response.data[i].images.fixed_height.url;
                characterRating = response.data[i].rating;
                returnCharacter();
            }
        });
    });

    // Create on click event that adds the user's input into the array
    $("#add-character").on("click", function (event) {
        event.preventDefault();
        var character = $("#character-input").val().trim();
        if(character != '') {
            characters.push(character);
            renderButtons();
        } 
    });

})