/**
 * es6 modules and imports JS
 */

import $ from 'jquery';

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */




const {getMovies} = require('./api.js');

$(document).ready(function(){
    $(document).ajaxStart(function(){
        $(".loading-gif").css("display", "block");
    });

});

    const generateMovieList = () => {
        getMovies().then((movies) => {
        // console.log(`id#${id} - ${title} - rating: ${rating}`)
            $(".loading-gif").css("display", "none");

            let htmlBuilder = '<table class="centered" id="movie-list">';
            htmlBuilder += '<thead>';
            htmlBuilder += '<tr>';
            htmlBuilder+= '<th>Film</th>';
            htmlBuilder += '<th>Rating</th>';
            htmlBuilder += '<th>Options</th>';
            htmlBuilder += '</tr>';
            htmlBuilder += '</thead>';

            movies.forEach(({title, rating, id}) => {
                //populate the table with json response data
                htmlBuilder += `<tr><td id="tdTitle">${title}</td>`;
                htmlBuilder += `<td id="rating-id">${rating}</td>`;
                htmlBuilder += `<td id="tdOptions">`
                    // hidden options to update movie rating, triggered once 'edit' btn is clicked' \\
                    +
                    `<select class="browser-default edit-rating" style="display: none" data-id=${id}>` +
                        `<option value="">Update rating</option>` +
                        `<option value='<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'>1 star</option>` +
                        `<option value='<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'>2 star</option>` +
                        `<option value='<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'>3 star</option>` +
                        `<option value='<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'>4 star</option>` +
                        `<option value='<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'>5 star</option>` +
                    `</select>` +
                    `<button class="edit-button" type="submit" data-target="/api/movies" data-id="${id}"><i class="fas fa-edit"></i></button>` +
                    `<button id="delete-button" type="submit" data-target="/api/movies" data-id="${id}"><i class="far fa-trash-alt"></i></button>` +
                    `</td></tr>`

            });
            htmlBuilder += '</table>';
            $('#html-builder').html(htmlBuilder);

        }).catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
    };

    generateMovieList();

    // ** submit form to post functionality ** \\

    $('#submit-button').on('click', function(e){
        e.preventDefault();
       // include animate loading gif to show once a movie is added \\
       let title = $('#movie-title').val();
       let rating = $('#movie-rating').val();
       let movie = {
           title: title,
           rating: rating
       };

       fetch('/api/movies', {
           headers: {
               "content-type": "application/json"
           },
           method: "POST",
           body: JSON.stringify({title, rating})

       }).then((response) => {
           response.json();
       }).then(() => {
           generateMovieList();
       });
    });





// **  delete movie entry ** \\

$('.container').on('click', '#delete-button', function(e){
    // include animate loading gif
    console.log("clicked");
    let id = $(this).attr('data-id');
    console.log(id);

    fetch(`/api/movies/${id}` , {
        headers: {
            "content-type": "application/json"
        },
        method: "DELETE",
        body: JSON.stringify({id})

    }).then((response) => {
        response.json();
    }).then(() => {
        generateMovieList();
    });
});

// Edit button functionality \\

$('.container').on('click', '.edit-button', function(){
    $(this).prev().toggle();
});

// select change event for when a new rating is picked \\
$('.container').on('change', '.edit-rating', function(e){
   // console.log('test');
    let rating = $(this).val();
    let id = $(this).attr("data-id");
    let title = $('#tdTitle').val();
    console.log(id);
    console.log(rating);
    console.log(title);

    let movie = {
        title: title,
        rating: rating
    };

    fetch(`/api/movies/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({rating})

    }).then((response) => {
        response.json();
    }).then(() => {
        generateMovieList();
    });

});


