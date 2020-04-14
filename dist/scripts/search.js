function search(element, critere, terme) {
    return new Promise((resolve, reject) => {
        $.get( '/Thesaurus/core/controllers/search.php' , {
            element: element,
            critere: critere,
            terme : terme
        },
        function(json) {
            if (json.isOk) {
                resolve(json.data); }
        }, 'json' )
        .fail(function(error) { reject(error); });
    });
}