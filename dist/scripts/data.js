var cache = {
    queryConcept: function() {
        $.getJSON( '/Thesaurus/cache/concept_' + sessionStorage.getItem('concept') + '.json',
        function(json) {
            assignData(json, true);
        })
        .fail(function () {
            cache.getConcept();
        });
    },
    getConcept: function(mustReloadContent = true, id = sessionStorage.getItem('concept')) {
        $.get( '/Thesaurus/core/controllers/cache.php' , {
            element: 'concept',
            id: id
        },
        function( json ) {
            if (mustReloadContent) {
                assignData(json.data, json.isOk); }
        }, 'json' )
        .fail(function (data) {
            console.error(data);
        });
    },
    getArborescence: function() {
        $.get( '/Thesaurus/core/controllers/cache.php' , {
            element: 'arborescence'
        },
        function( json ) {
            terminal.open(json.consolMsg);
        }, 'json' )
        .fail(function (data) {
            console.error(data);
        });
    },
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

function sauvegardeAuto(input, metaOnChange, immediat = false) {
    return new Promise((resolve, reject) => {

        if (immediat) { var delais = 0; }
        else { var delais = 10000; }
        var lastContent = input.value;
        var newContent = input.value;
        var id = sessionStorage.getItem('concept');

        input.addEventListener('input', () => { newContent = input.value; });
        
        var retardateur = setInterval(() => {
            if (lastContent !== newContent) {
                
                $.post( '/Thesaurus/core/controllers/concept.php?action=change_' + metaOnChange,
                { id : id, data : input.value},
                function( json ) {
                    terminal.open(json.consolMsg);

                    if (json.isOk) {
                        cache.getConcept(false, id);
                        resolve({
                            content: input.value,
                            id: id
                        });
                    } else {
                        reject(json.consolMsg);
                    }
                }, 'json' )
                .fail(function (data) {
                    reject("Échec :" + data);
                });

                lastContent = newContent;
            }

            if (document.activeElement !== input) { clearInterval(retardateur); }
        }, delais);

    });
}