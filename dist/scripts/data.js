var cache = {
    query: function() {
        $.getJSON( '/Thesaurus/cache/concept_' + sessionStorage.getItem('concept') + '.json',
        function(json) {
            assignData(json, true);
        })
        .fail(function () {
            cache.get();
        });
    },
    get: function(mustReloadContent = true) {
        $.get( '/Thesaurus/core/controllers/cache.php' , {
            element: 'concept',
            id: sessionStorage.getItem('concept')
        },
        function( json ) {
            if (mustReloadContent) {
                assignData(json.data, json.isOk); }
        }, 'json' )
        .fail(function (data) {
            console.error(data);
        });
    }
}

function assignData(obj, isOk) {
    if (isOk) {
        matrice.traitement(obj.matrice);
        notice.traitement(obj.notice);
        fiche.set(obj.fiche);
    } else {
        terminal.open('Ce concept n\'existe pas dans cette base de données.');
    }
}