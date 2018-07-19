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
            `<i class="far fa-trash-alt" data-id="${id}"></i></td>` +
            `<i class="far fa-trash-alt" data-id="${id}"></i></td>` +
            `</tr>`


    });
    htmlBuilder += '</table>';
    $('#html-builder').html(htmlBuilder);

}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

