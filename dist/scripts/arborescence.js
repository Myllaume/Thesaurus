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
    // ajout des flèches et du mécanisme de volet des listes de concept
    articuler: function(listNode, articulation = false) {
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
    showNode: function(idConcept = sessionStorage.getItem('concept')) {
        var node = this.findNode(idConcept);
        if (node == null) { return false; }
        var nodeTab = [node];
        nodeTab[nodeTab.length-1].classList.add('--active');

        while (nodeTab[nodeTab.length-1] !== this.racine) {
            nodeTab.push(nodeTab[nodeTab.length-1].parentNode); }

        nodeTab.forEach(elt => { elt.classList.add('--active'); });
    },
    // affiche le bouton d'édition
    canEdit: function(bool) {
        if (bool) { this.btnAddConcept.classList.remove('btn--hidden'); }
        else { this.btnAddConcept.classList.add('btn--hidden'); }
    }
}

window.onpopstate = function() {
    // si l'utilisateur recule d'une page
    sessionStorage.setItem('concept', historique.getLastConceptId());
    cache.queryConcept();
};

window.addEventListener("DOMContentLoaded", () => {
    if (arborescence.isNotEmpty()) {
        // afficher le concept demandé à l'ouverture via l'URL
        cache.queryConcept(sessionStorage.getItem('concept'));
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
    sessionStorage.setItem('concept', 0);
    createConcept();
});

/**
 * @param { Event } e d'un concept, arborescence.elt
 */

function changeConcept(e) {
    idConcept = e.target.dataset.id; // = id du nouveau concept
    // le concept n'est pas déjà actif et aucune édition n'est en cours
    if (idConcept == sessionStorage.getItem('concept')) { return; }
    if (sessionStorage.getItem('inEdition') == 'true') { return; }

    arborescence.findNode(sessionStorage.getItem('concept')).parentNode
        .classList.remove('--active');

    /** ajouter le nouveau concept à l'URL, à l'historique
    et l'enregistrer comme concept actif dans la session */
    history.pushState({}, 'concept ' + idConcept, idConcept);
    historique.actualiser();
    sessionStorage.setItem('concept', idConcept);

    arborescence.findNode(idConcept).parentNode
        .classList.add('--active');

    // afficher les informations du concept dans les panneaux de visualisation
    cache.queryConcept();
}

/**
 * @param { Event } e
 * ---
 * envoie d'une requête AJAX pour modifier le
 * concept générique : id_ascendant
*/

function modifAscendant(e) {
    $.get( '/Thesaurus/core/controllers/concept.php' , {
        action: 'change_ascendant',
        id: sessionStorage.getItem('concept'),
        id_ascendant: e.target.dataset.id // = id du concept cible
    },
    function(json) {
        if (json.isOk) { cache.getArborescence(true); }
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
        id_ascendant: sessionStorage.getItem('concept')
    },
    function(json) {
        terminal.open(json.consolMsg);
        if (json.isOk) { cache.getArborescence(true); }
    }, 'json')
    .fail(function(error) { console.error(error); });
}