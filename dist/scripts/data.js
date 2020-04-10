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
    get: function(mustReloadContent = true, id = sessionStorage.getItem('concept')) {
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

function sauvegardeAuto(input, metaOnChange, immediat = false) {
    if (immediat) { var delais = 0; }
    else { var delais = 10000; }
    var lastContent = notice.inputDescription.value;
    var newContent = notice.inputDescription.value;
    var id = sessionStorage.getItem('concept');

    input.addEventListener('input', () => { newContent = input.value; });
    
    var toto = setInterval(() => {
        if (lastContent !== newContent) {
            $.post( '/Thesaurus/core/controllers/modification.php?action=change_' + metaOnChange,
            { id : sessionStorage.getItem('concept'), data : input.value},
            function( json ) {
                terminal.open(json.consolMsg);
                if (json.isOk) { cache.get(false, id); }
            }, 'json' )
            .fail(function (data) {
                console.error(data);
            });

            lastContent = newContent;
        }

        if (document.activeElement !== input) { clearInterval(toto); }
    }, delais);
}