/**
 * @param { String } objet - Nom table bdd sujette
 * @param { String } critere - Nom col bdd pour trie
 * @param { String } [terme = ''] - Condition WHERE LIKE 'terme%'
 * @param { String } [sort = 'croissant'] - Trie
 * @param { String } [render = 'table'] - Format de rendu
 * @return { Promise }
 * Requête de recherche à la base de données
 */

function search(objet, critere, terme = '', sort = 'croissant') {
    return new Promise((resolve, reject) => {
        $.get( '/Thesaurus/core/controllers/search.php' , {
            objet: objet,
            critere: critere,
            terme : terme,
            sort : sort
        },
        function(json) {
            if (json.isOk) {
                terminal.open(json.consolMsg);
                resolve(json.data); }
            else {
                console.error(json); }
        }, 'json' )
        .fail(function(error) { console.error(error);
         });
    });
}