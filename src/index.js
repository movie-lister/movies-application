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
                `<i class="far fa-trash-alt" data-id="${id}"></i>` +
                `<i class="far fa-trash-alt" data-id="${id}"></i>` +
                `</td></tr>`

        });
        htmlBuilder += '</table>';
        $('#html-builder').html(htmlBuilder);

    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });
};
generateMovieList();


// submit form \\
$('#submit-button').on('click', function(){
    // e.preventDefault();
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