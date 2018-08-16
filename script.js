    // Initial array of movies
        var animals = ["cat", "dog", "monkey", "bird"];  

        function AddButtons()
        {
            // empty the div 
          $("#buttons-view").empty();
             for (i = 0; i < animals.length; i++){
                var p1 = $("<p>");
                var button = $("<button>");
                button.addClass("animal-btn btn btn-info btn-space");
                button.attr("data-name",animals[i]);
                button.text(animals[i]);              
                $("#buttons-view").append(button);
            }
        };

        AddButtons();

    
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        animals.push(animal);
    
        AddButtons();
      });
       
      const APIKEY = "dc6zaTOxFJmzC"
      const URL = "https://api.giphy.com/v1/gifs/search?q="
    

        function displayResult(){
            
            
            var animal = $(this).attr("data-name");
            console.log(animal);
            var queryURL = `${URL}${animal}&api_key=${APIKEY}&limit=10`;
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then (function (response){
            
            var AnimalDiv = $("<div class='animal'>");
            var result = response.data;
            
            result.forEach(function (index){
            const rating = index.rating;
            const gif = $(`<img src = ${index.images.fixed_height_still.url}>`);
            gif.addClass("gif rounded-circle img-fluid");
            gif.attr("data-state","still");
            gif.attr("data-still",index.images.fixed_height_still.url);
            gif.attr("data-animate",index.images.fixed_height.url);
            
            AnimalDiv.append(gif);
            $("#animal-view").prepend(AnimalDiv);
            
                
            });

            console.log(response);
      
        });
    }


    $(document).on("click", ".animal-btn", displayResult)


    
    $(document).on("click", ".gif", function () {
        const state = $(this).attr("data-state") 
 
      if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
   



 