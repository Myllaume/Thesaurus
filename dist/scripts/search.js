/**
 * @param { String } objet - Nom table bdd sujette
 * @param { String } [terme = ''] - Condition WHERE LIKE 'terme%'
 * @param { String } [sort = 'croissant'] - Trie
 * @return { Promise }
 * Requête de recherche à la base de données
 */

function search(objet, terme = '', sort = 'croissant') {
    return new Promise((resolve, reject) => {
        $.get( '/Thesaurus/core/controllers/search.php' , {
            objet: objet,
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