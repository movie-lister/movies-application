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


            let htmlBuilder = '<table id="movie-list">';
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
                htmlBuilder += `<td id="tdStars">${rating}</td>`;
                htmlBuilder += `<td id="tdOptions">`
                    +
                    `<button id="edit-button" type="submit" data-target="/api/movies" data-id="${id}"><i class="fas fa-edit"></i></button>` +
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


    $('#delete-button'.id).on('click', function(){
        console.log('clicked');
    });
    generateMovieList();


    // ** submit form to post functionality ** \\
    // ratings of only 1-3 are recorded?
    $('#submit-button').on('click', function(e){
        e.preventDefault();
       // include animate loading gif
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

// ** submit form to delete functionality ** \\
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

// Edit button functionality


$('.container').on('click', '#edit-button', function(e){
    // include animate loading gif
    console.log("clicked");
    let id = $(this).attr('data-id');
    console.log(id);

    fetch(`/api/movies/${id}` , {
        headers: {
            "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({id})



    }).then((response) => {
        response.json();
    }).then(() => {
        generateMovieList();
    });
});










// $('.container').on('click', '#edit-button', function(e){
//     // include animate loading gif
//     console.log("clicked");
//     let id = $(this).attr('data-id');
//     console.log(id);
//
//     fetch(`/api/movies/${id}` , {
//         headers: {
//             "content-type": "application/json"
//         },
//         method: "PUT",
//         body: JSON.stringify({id})
//
//     }).then((response) => {
//         response.json();
//     }).then(() => {
//         generateMovieList();
//     });
// });