var ApiKey = "HW305A9gZXYPc3n3OWKMlw5N6uTcEkJT";

var topics = ["Trigun", "Knights of Sidonia", "Death Note", "Attack on Titan"];

//AJAX Query//
function showGifs()
{
    var gifSearch = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=" + ApiKey + "&limit=" + limit;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response.data);

        var gifs = response.data;

        for (var i = 0; i < gifs.length; i++)
        {
            var gifInner = $("<div>");
            gifInner.addClass("gifFormat")
            var rating = gifs[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animate = gifs[i].images.fixed_height.url;
            var still = gifs[i].images.fixed_height_still.url;

            var gifImage = $("<img>");
            gifImage.attr("src", still);
            gifImage.attr("data-still", still);
            gifImage.attr("data-animate", animate);
            gifImage.attr("data-state", "still");
            gifImage.addClass("gif-image");

            gifInner.append(gifImage);
            gifInner.append(p);
            
            $("#gifDiv").prepend(gifInner);
        }
    });

    $(document).on("click", ".gif-image", function ()
    {
        var state = $(this).attr("data-state");

        if (state === "still")
        {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }

        else
        {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
};

function showButtons() 
{
    $("#gifButtons").empty();

    for (var i = 0; i < topics.length; i++)
    {
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#gifButtons").append(a);
    }
}


function createButton()
{
    event.preventDefault();
    console.log("here");
    
    var gif = $("#searchBox").val().trim();
    console.log(gif);
    topics.push(gif);
    console.log(topics);
    
    showButtons();
}


$(document).ready(function()
{
    $("#searchButton").on("click", createButton);
    $(document).on("click", ".gif-btn", showGifs);
    showButtons();
});


