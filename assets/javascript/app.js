$(document).ready(function(){

  var shows = ["the wire", "true detective", "justified", "boardwalk empire", "the sopranos", "its always sunny in philadelphia", "seinfeld" , "x files", "human giant" ];

  //append new button to button div
  function appendNewButton(show){ 
      var a = $('<button>')
      a.addClass('show');
      a.attr('data-name', show);
      a.text(show);
      $('#button-area').append(a);
  }

  //runs appendNewButton on ever value in shows array
  function renderButtons(){ 
    for (var i = 0; i < shows.length; i++){
        appendNewButton(shows[i])
    }
  }

  //clears show div and appends 15 new images based on users choice of button
  function displayShowInfo(){
    $("#show-area").empty();
    var show = $(this).attr('data-name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC  ";
    $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
      
      for(var i=0 ; i<15 ; i++){
        var div = $('<div class="img-div">')
        var image = $('<img>');
        var p = $('<p>')
        image.attr("src", response.data[i].images.fixed_height_small_still.url);
        image.attr("data-state", 'still');
        image.attr("data-still",response.data[i].images.fixed_height_small_still.url );
        image.attr("data-animate",response.data[i].images.fixed_height_small.url) 
        image.addClass("image");
        p.text(response.data[i].rating);
        div.append(p);
        div.append(image);
        $("#show-area").append(div);}
        }); 
  }

  // toggles image from still state to animated when clicked
  function imageClick(){

        var state = $(this).attr('data-state'); 
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }
            else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
  }

  // clears input box upon hitting submit button
  function resetInputBox() { document.getElementById("input-box").value = "";}

  //submit button, adds new button to shows array
  $("#submit-input").on('click', function(){
    var show = $("#input-box").val().trim();
    shows.push(show);
    appendNewButton(show);
    resetInputBox();
    ("#input-box").value('');
    return false;
  });
  // whenever button is clicked displayShowInfo is run for that particular button
  $(document).on('click', '.show', displayShowInfo);
  // whenever image is clicked imageClick is run for that particular image
  $(document).on('click','.image',imageClick);
  // always runs to keep buttons up to date
  renderButtons();

});
