const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('q');

if (!query) {
    window.location.href = '/';
}

const filterSort = document.getElementById('filter-sort');

filterSort.addEventListener('change', function() {
    const selectedValue = filterSort.value;
    if (selectedValue !== 'order') {
        if (urlParams.has('sort')) {
            urlParams.set('sort', selectedValue);
        } else {
            urlParams.append('sort', selectedValue);
        }
    } else {
        urlParams.delete('sort');
    }
    window.location.href = window.location.origin + window.location.pathname + '?' + urlParams.toString();
});

function updatePriceFilter() {
    const sliderValues = $("#price_filter").slider("values");
    const minPrice = sliderValues[0];
    const maxPrice = sliderValues[1];

    if (urlParams.has('minPrice')) {
        urlParams.set('minPrice', minPrice);
    } else {
        urlParams.append('minPrice', minPrice);
    }

    if (urlParams.has('maxPrice')) {
        urlParams.set('maxPrice', maxPrice);
    } else {
        urlParams.append('maxPrice', maxPrice);
    }

    window.location.href = window.location.origin + window.location.pathname + '?' + urlParams.toString();
}

$('#price_filter').each( function() {
    let $filter_selector = $(this);
    let a = $filter_selector.data("min-value");
    let b = $filter_selector.data("max-value");
    let c = $filter_selector.data("price-sign");
    $filter_selector.slider({
        range: true,
        min: $filter_selector.data("min"),
        max: $filter_selector.data("max"),
        values: [ a, b ],
        slide: function( event, ui ) {
            $( "#flt_price" ).html( c + ui.values[ 0 ] + " - " + c + ui.values[ 1 ] );
            $( "#price_first" ).val(ui.values[ 0 ]);
            $( "#price_second" ).val(ui.values[ 1 ]);
        }
    });
    $( "#flt_price" ).html( c + $filter_selector.slider( "values", 0 ) + " - " + c + $filter_selector.slider( "values", 1 ) );
});