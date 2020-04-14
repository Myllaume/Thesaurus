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
     * @return { Promise }
     * ---
     * query la génération du cache pour un concept et
     * recueil d'une copie des données
    */
    getConcept: function(mustReloadContent = true, id = sessionStorage.getItem('idConcept')) {
        return new Promise((resolve, reject) => {

            $.get( '/Thesaurus/core/controllers/cache.php' , {
                element: 'concept',
                id: id
            },
            function( json ) {
                if (mustReloadContent) {
                    assignData(json.data, json.isOk); }
                resolve(true);
            }, 'json' )
            .fail(function (error) { resolve(error); });
        });
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

function sauvegardeAuto(input, metaOnChange) {
    return new Promise((resolve, reject) => {

        var lastContent = input.value;
        
        // id = id de concept enregistré dans la session
        var id = sessionStorage.getItem('idConcept');

        input.addEventListener('blur', () => {
            var newContent = input.value;

            if (lastContent !== newContent) {
                $.post( '/Thesaurus/core/controllers/concept.php?action=change_' + metaOnChange, {
                    id : id,
                    data : input.value
                },
                function( json ) {
                    terminal.open(json.consolMsg);
    
                    if (json.isOk) {
                        cache.getConcept(true, id);
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
                    reject(erreur); });
            }
        });
    });
}