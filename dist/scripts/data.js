var cache = {
    /**
     * @return { Promise }
     * ---
     * recherche du fichier JSON cache d'un concept
    */
    queryConcept: function() {
        return new Promise((resolve, reject) => {

            $.getJSON( '/Thesaurus/cache/concept_' + sessionStorage.getItem('idConcept') + '.json',
            function(json) {
                assignData(json, true);
                resolve(true);
            })
            // si aucun n'est stocké, demande du cache
            .fail(function(error) { cache.getConcept(); });
        });
    },
    /**
     * @param { Boolean } [mustReloadContent = true] - Si la visualisation
     * doit être rechargée avec le contenu téléchargé
     * @param { Integer } [id = sessionStorage id]
     * ---
     * query la génération du cache pour un concept et
     * recueil d'une copie des données
    */
    getConcept: function(mustReloadContent = true, id = sessionStorage.getItem('idConcept')) {
        $.get( '/Thesaurus/core/controllers/cache.php' , {
            element: 'concept',
            id: id
        },
        function( json ) {
            if (mustReloadContent) {
                assignData(json.data, json.isOk); }
        }, 'json' )
        .fail(function (data) { console.error(data); });
    },
    /**
     * @param { Boolean } [mustReload = false]
     * ---
     * query enregistrement du cache de l'arborescence
    */
    getArborescence: function(mustReload = false) {
        $.get( '/Thesaurus/core/controllers/cache.php' , {
            element: 'arborescence'
        },
        function( json ) {
            if (json.isOk && mustReload) { document.location.reload(); }
            else if (!json.isOk && json.consolMsg == 'arborescence vide') {
                sessionStorage.setItem('idConcept', 0); }
        }, 'json' )
        .fail(function(error) { console.error(error); });
    },
}

/**
 * @param { Object } obj 
 * @param { Boolean } isOk 
 * ---
 * appel des différentes méthodes d'affichage
 * des objets des différentes visualisations
 */

function assignData(obj, isOk) {
    if (isOk) {
        // enregistrement du nom du concept
        sessionStorage.setItem('nomConcept', obj.matrice.nom);

        matrice.traitement(obj.matrice);
        notice.traitement(obj.notice);
        fiche.set(obj.fiche);
    } else {
        terminal.open('Ce concept n\'existe pas dans cette base de données.'); }
}

/**
 * 
 * @param { HTMLElement } input - Champs à enregistrer
 * @param { String } metaOnChange - Métadonnée de concept modifiée 
 * @param { Boolean } [immediat = false] - Si l'enregistrement est immédiat
 * @return {Promise}
 */

function sauvegardeAuto(input, metaOnChange, immediat = false) {
    return new Promise((resolve, reject) => {

        if (immediat) { var delais = 0; }
        else { var delais = 10000; }

        var lastContent = input.value;
        var newContent = input.value;
        // id = id de concept enregistré dans la session
        var id = sessionStorage.getItem('idConcept');

        input.addEventListener('input', () => {
            // contenu actualité en temps réel
            newContent = input.value;
            // la session est en mode édition -> navigation bloquée
            sessionStorage.setItem('inEdition', true);
        });
        
        var retardateur = setInterval(() => {
            if (lastContent !== newContent) {
                // si le contenu précédemment enregistré est différent de l'actuel
                $.post( '/Thesaurus/core/controllers/concept.php?action=change_' + metaOnChange,
                {
                    id : id,
                    data : input.value
                },
                function( json ) {
                    terminal.open(json.consolMsg);

                    if (json.isOk) {
                        cache.getConcept(false, id);
                        sessionStorage.setItem('inEdition', false);
                        resolve({
                            content: input.value, // = contenu enregistré
                            id: id // = id du concept modifié
                        });
                    } else {
                        reject(json.consolMsg);
                    }
                }, 'json' )
                .fail(function(erreur) {
                    reject("Échec :" + erreur); });

                // le contenu enregistré devient contenu actuel à comparer
                lastContent = newContent;
            }

            /** si le focus a été fait sur un autre élément que le input,
            stoper les enregistrements */
            if (document.activeElement !== input) { clearInterval(retardateur); }
        }, delais);

    });
}