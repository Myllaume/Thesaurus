var arborescence = {
    // premier contenant
    content: document.querySelector('.arborescence'),
    // liste de premier niveau
    racine: document.querySelector('.arborescence__section'),
    // toutes les listes, exceptée celle de premier niveau
    lists: document.querySelectorAll('.arborescence__section:not(:first-child)'),
    // tous les concepts
    elts: document.querySelectorAll('.arborescence li span'),
    // bouton d'ajout de concept
    btnAddConcept: document.querySelector('#concept-racine'),
    // return false si le premier contenant contient le minimum d'éléments (3)
    // et est donc considéré comme vide
    isNotEmpty: function() {
        return arborescence.content.childNodes.length !== 3; },
    // return le node d'un concept correspondant à l'identifiant en paramètre
    findNode: function(idConcept) {
        return document.querySelector('[data-id="' + idConcept + '"]'); },
    getChildsId: function(target) {
        if (target.tagName != 'UL') { return false; }
        return target.querySelectorAll('[data-id]');
    },
    nodeToId: function(nodeList) {
        var idList = [];
        nodeList.forEach(node => { idList.push(node.dataset.id); });
        return idList;
    },
    // ajout des flèches et du mécanisme de volet des listes de concept
    articuler: function(listNode) {
        var btnArrow = document.createElement('button');
        btnArrow.classList.add('arborescence__arrow');
        btnArrow.textContent = '▶';

        listNode.previousSibling.appendChild(btnArrow);
        
        btnArrow.addEventListener('click', () => {
            listNode.classList.toggle('--active');
            btnArrow.classList.toggle('arborescence__arrow--active');
        });
    },
    // trouve le node correspondant à un concept et remonte ses parents
    // pour les déployer un à un et aisi le laisser apparaître
    showNode: function(idConcept = sessionStorage.getItem('idConcept')) {
        var node = this.findNode(idConcept);
        if (node == null) { return false; }
        node.classList.add('--active');
        var nodeTab = [node];

        while (nodeTab[nodeTab.length-1] !== this.racine) {
            nodeTab.push(nodeTab[nodeTab.length-1].parentNode); }

        nodeTab.forEach(elt => { elt.classList.add('--active'); });
    },
    // affiche le bouton d'édition
    canEdit: function(bool) {
        if (bool) { this.btnAddConcept.classList.remove('--hidden'); }
        else { this.btnAddConcept.classList.add('--hidden'); }
    }
}

window.onpopstate = function() {
    // si l'utilisateur recule d'une page
    var lastIdConcept = sessionStorage.getItem('idConcept');
    var newIdConcept = historique.backConcept();
    
    arborescence.findNode(lastIdConcept).parentNode
        .classList.remove('--active');

    sessionStorage.setItem('idConcept', newIdConcept);
    cache.queryConcept()
    .then(function() {
        document.title = sessionStorage.getItem('nomConcept');

        arborescence.findNode(newIdConcept).parentNode
            .classList.add('--active');
    });
};

window.addEventListener("DOMContentLoaded", () => {
    if (arborescence.isNotEmpty()) {
        // afficher le concept demandé à l'ouverture via l'URL
        cache.queryConcept();
        arborescence.showNode();
    
        arborescence.lists.forEach(list => {
            arborescence.articuler(list); });
    
        arborescence.elts.forEach(elt => {
            elt.addEventListener('click', changeConcept); });
    } else {
        cache.getArborescence();
    }
});

arborescence.btnAddConcept.addEventListener('click', () => {
    // ajout d'un concept à la racine de l'arborescence
    sessionStorage.setItem('idConcept', 0);
    createConcept();
});

/**
 * @param { Event } e d'un concept, arborescence.elt
 */

function changeConcept(e) {
    idConcept = e.target.dataset.id; // = id du nouveau concept
    // le concept n'est pas déjà actif et aucune édition n'est en cours
    if (idConcept == sessionStorage.getItem('idConcept')) { return; }
    if (sessionStorage.getItem('inEdition') == 'true') { return; }

    arborescence.findNode(sessionStorage.getItem('idConcept')).parentNode
        .classList.remove('--active');

    /** ajouter le nouveau concept à l'URL, à l'historique
    et l'enregistrer comme concept actif dans la session */
    history.pushState({}, 'concept ' + idConcept, idConcept);
    historique.actualiser();
    sessionStorage.setItem('idConcept', idConcept);

    arborescence.showNode();

    /** afficher les informations du concept dans les panneaux de visualisation
    et dans la session */
    cache.queryConcept()
    .then(function() {
        document.title = sessionStorage.getItem('nomConcept');
    
        arborescence.findNode(idConcept).parentNode
            .classList.add('--active');
    })
}

/**
 * @param { HTMLElement } target
 * @param { Function } fxModification
 * ---
 * Passage en mode modification de l'arborescence :
 * cliquer sur ses éléments ne permet plus de naviguer mais
 * de mettre à jour la matrice et donc la hirarchie
 */

function changeMode(target, fxModification) {
    if (sessionStorage.getItem('isOp') != 'true') { return; }

    target.classList.add('clignotant--active');
    arborescence.elts.forEach(elt => {
        // désactiver le changement de visualation de concept
        elt.removeEventListener('click', changeConcept);
        // activer la modificaton de parent de concept
        elt.addEventListener('click', fxModification);
    });
}

/**
 * @param { Number } idConcept - Id d'un concept selectionné
 * dans l'arborescence
 * @return { Boolean } - 'true' en cas d'acte ignoble
 * ---
 * Éviter qu'un élément parent puisse devenir l'enfant ou l'associé
 * d'un de ces enfants, ce qui casserait la structure
 * L'inversre est toutefois autorisé...
 */

function isInceste(idConcept) {
    // selectionner son élement frère = la liste de concept dont il est parent, générique
    var brother = arborescence.findNode(sessionStorage.getItem('idConcept'))
    .parentNode.nextSibling;
    // chercher ses concepts enfants, spécifiques
    if (brother === null) { return false; }
    let isAListParent = arborescence.getChildsId(brother);
    if (isAListParent) {
    /** s'il s'agit bien d'un parent :
     * lister les id de concepts dont il est parent
     * vérifier que l'un d'eux n'est pas la cible (target)
     */
    var idList = arborescence.nodeToId(isAListParent);
    var test = idList.indexOf(idConcept);

        if (test !== -1) { return true; }
        else { return false; }
    }

    return false;
}

/**
 * @param { Event } e
 * ---
 * envoie d'une requête AJAX pour modifier le
 * concept générique : id_ascendant
*/

function modifGenerique(e) {

    if (isInceste(e.target.dataset.id)) { return; }
    
    $.get( '/Thesaurus/core/controllers/concept.php' , {
        action: 'change_ascendant',
        id: sessionStorage.getItem('idConcept'),
        id_ascendant: e.target.dataset.id // = id du concept cible
    },
    function(json) {
        if (json.isOk) {
            cache.getConcept()
            .then(function() { cache.getArborescence(true); });
        }
    }, 'json')
    .fail(function(error) { console.error(error); });
}

/**
 * @param { Event } e
 * ---
 * envoie d'une requête AJAX pour ajouter un
 * concept associé
*/

function modifAssocie(e) {

    if (isInceste(e.target.dataset.id)) { return; }

    $.get( '/Thesaurus/core/controllers/concept.php' , {
        action: 'add_associe',
        id: sessionStorage.getItem('idConcept'),
        id_associe: e.target.dataset.id // = id du concept cible
    },
    function(json) {
        console.log(json);
        
        if (json.isOk) { cache.getConcept(true); }
    }, 'json')
    .fail(function(error) { console.error(error); });
}

/**
 * ajout d'un concept à la racine de l'arboresence
*/
function createConcept() {    
    $.get( '/Thesaurus/core/controllers/concept.php' , {
        action: 'add_concept',
        nom: 'Nouveau concept',
        id_ascendant: sessionStorage.getItem('idConcept')
    },
    function(json) {
        terminal.open(json.consolMsg);
        if (json.isOk) { cache.getArborescence(true); }
    }, 'json')
    .fail(function(error) { console.error(error); });
}