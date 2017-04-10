
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // Clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Load street view image
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    $body.append('<img class="bgimg" src="' + streetViewUrl + '">');

    // NYTimes AJAX request
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    url += '?' + $.param({
        'api-key': 'cedb5e972a1a43a6adced466e7cc08ee',
        'q': city,
        'fl': 'headline,lead_paragraph,web_url'
    });
    $.getJSON(url, function (data) {
        console.log(data);
    });


    return false;
}

$('#form-container').submit(loadData);
