$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#searchTerm').val();
        var numResults = $('#numResults').val();
        scrapeWikipedia(searchTerm, numResults);
    });
});

function scrapeWikipedia(term, numResults) {
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        data: {
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: term,
            srlimit: numResults,
            utf8: 1,
            srprop: 'snippet'
        },
        dataType: 'jsonp',
        success: function(data) {
            displayResults(data.query.search);
        },
        error: function(errorMessage) {
            console.log(errorMessage);
        }
    });
}

function displayResults(results) {
    var html = '<h2>Results:</h2>';
    if (results.length > 0) {
        html += '<ol>';
        results.forEach(function(result) {
            html += '<li><a href="https://en.wikipedia.org/wiki/' + result.title.replace(/ /g, '_') + '" target="_blank">' + result.title + '</a> - ' + result.snippet + '</li>';
        });
        html += '</ol>';
    } else {
        html += '<p>No results found.</p>';
    }
    $('#results').html(html);
}