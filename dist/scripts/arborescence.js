var arborescence = {
    content: document.querySelector('.arborescence'),
    racine: document.querySelector('.arborescence__section'),
    lists: document.querySelectorAll('.arborescence__section:not(:first-child)'),
    elts: document.querySelectorAll('.arborescence li span'),
    btnAddConcept: document.querySelector('#concept-racine'),

    isNotEmpty: function() {
        return arborescence.content.childNodes.length !== 3;
    },

    findNode: function(idConcept) {
        return document.querySelector('[data-id="' + idConcept + '"]');
    },

    articuler: function(listNode, articulation = false) {
        var btnArrow = document.createElement('button');
        btnArrow.classList.add('arborescence__arrow');
        btnArrow.textContent = '▶';

        if (articulation) {
            articulation.appendChild(btnArrow);
        } else {
            listNode.previousSibling.appendChild(btnArrow);
        }
        
        btnArrow.addEventListener('click', () => {
            listNode.classList.toggle('--active');
            btnArrow.classList.toggle('arborescence__arrow--active');
        });
    },

    showNode: function(idConcept = sessionStorage.getItem('concept')) {
        var node = this.findNode(idConcept);
        if (node == null) { return false; }
        var nodeTab = [node];
        nodeTab[nodeTab.length-1].classList.add('--active');

        while (nodeTab[nodeTab.length-1] !== this.racine) {
            nodeTab.push(nodeTab[nodeTab.length-1].parentNode);
        }

        nodeTab.forEach(elt => { elt.classList.add('--active'); });
    },

    canEdit: function(bool) {
        if (bool) {
            this.btnAddConcept.classList.remove('btn--hidden');
        } else {
            this.btnAddConcept.classList.add('btn--hidden');
        }
    }
}

window.onpopstate = function() {
    sessionStorage.setItem('concept', historique.getLastConceptId());
    cache.queryConcept();
};

window.addEventListener("DOMContentLoaded", () => {
    if (arborescence.isNotEmpty()) {
        cache.queryConcept(sessionStorage.getItem('concept'));
        arborescence.showNode();
    
        arborescence.lists.forEach(list => {
            arborescence.articuler(list);
        });
    
        arborescence.elts.forEach(elt => {
            elt.addEventListener('click', changeConcept);
        });
    } else {
        cache.getArborescence();
    }
});

arborescence.btnAddConcept.addEventListener('click', () => {
    sessionStorage.setItem('concept', 0);
    createConcept();
});

function changeConcept(e) {
    idConcept = e.target.dataset.id;
    if (idConcept == sessionStorage.getItem('concept')) { return; }
    if (sessionStorage.getItem('inEdition') == 'true') { return; }

    arborescence.findNode(sessionStorage.getItem('concept')).parentNode
        .classList.remove('--active');

    history.pushState({}, 'concept ' + idConcept, idConcept);
    historique.actualiser();
    sessionStorage.setItem('concept', idConcept);

    arborescence.findNode(idConcept).parentNode
        .classList.add('--active');

    cache.queryConcept();
}

function modifAscendant(e) {
    $.get( '/Thesaurus/core/controllers/concept.php' , {
        action: 'change_ascendant',
        id: sessionStorage.getItem('concept'),
        id_ascendant: e.target.dataset.id
    },
    function( json ) {
        terminal.open(json.consolMsg);
        if (json.isOk) {
            cache.getConcept();
            cache.getArborescence(true);
        }
    }, 'json' )
    .fail(function (data) {
        console.error(data);
    });
}

function createConcept() {
    $.get( '/Thesaurus/core/controllers/concept.php' , {
        action: 'add_concept',
        nom: 'Nouveau concept',
        id_ascendant: sessionStorage.getItem('concept')
    },
    function( json ) {
        console.log(json);
        
        terminal.open(json.consolMsg);
        if (json.isOk) {
            cache.getConcept();
            cache.getArborescence(true);
        }
    }, 'json' )
    .fail(function (data) {
        console.error(data);
    });
}