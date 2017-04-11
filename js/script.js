
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

    // NYTimes API AJAX request
    var newsUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' + 'api-key=cedb5e972a1a43a6adced466e7cc08ee' + '&';
    newsUrl += $.param({
        q: city,
        fl: 'headline,snippet,web_url'
    });

    $.getJSON(newsUrl, function (data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);

        var articles = data.response.docs;

        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li><a href="' + article.web_url + '">' + article.headline.main + '</a><p>' + article.snippet + '</p></li>');
        }
    })
    .fail(function () {
        $nytHeaderElem.text('New Your Times Articles Could Not Be Loaded');
    });

    // Wikipedia API AJAX request
    var wikiUrl = 'https://en.wikipedia.org/w/api.php';

    $.ajax({
        url: wikiUrl,
        data: {
            action: 'opensearch',
            search: city,
            format: 'json'
        },
        dataType: 'jsonp',
        success: function (data) {
            var linkList = data;
            var linkText;
            var linkUrl;
            for (var i = 0; i < linkList[1].length; i ++) {
                linkText = linkList[1][i];
                linkUrl = linkList[3][i];
                $wikiElem.append('<li><a href="' + linkUrl + '" rel target="_blank">' + linkText + '</a>');
            }
        }
    });

    return false;
}

$('#form-container').submit(loadData);
