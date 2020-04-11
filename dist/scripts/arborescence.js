var arborescence = {
    content: document.querySelector('.arborescence'),
    racine: document.querySelector('.arborescence__section'),
    lists: document.querySelectorAll('.arborescence__section:not(:first-child)'),
    elts: document.querySelectorAll('.arborescence li span'),

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
        var nodeTab = [this.findNode(idConcept)];
        nodeTab[nodeTab.length-1].classList.add('--active');

        while (nodeTab[nodeTab.length-1] !== this.racine) {
            nodeTab.push(nodeTab[nodeTab.length-1].parentNode);
        }

        nodeTab.forEach(elt => { elt.classList.add('--active'); });
    }

    // rendreEditable: function(elt) {
    //     let brotherNodeIsList = true;

    //     var btnAdd = document.createElement('button');
    //     btnAdd.classList.add('arborescence__add');
    //     btnAdd.textContent = '+';
    //     elt.appendChild(btnAdd);

    //     btnAdd.addEventListener('click', () => {
    //         var brotherNode = elt.nextSibling;

    //         if (brotherNode === null || brotherNode.classList == 'arborescence__elt') {
    //             brotherNodeIsList = false;
    //         }

    //         var fieldContent = document.createElement('div');
    //         fieldContent.classList.add('arborescence__insert-box');
    //         elt.after(fieldContent);

    //         var input = document.createElement('input');
    //         input.setAttribute('placeholder', 'Nom...');
    //         fieldContent.appendChild(input);
    
    //         var btn = document.createElement('button');
    //         btn.setAttribute('type', 'submit');
    //         btn.textContent = '+';
    //         fieldContent.appendChild(btn);

    //         input.focus();

    //         console.log(brotherNode);
            
    
    //         btn.addEventListener('click', () => {
    //             $.get( '/Thesaurus/core/controllers/operations.php' , {
    //                 action: "add_concept",
    //                 data: {
    //                     nom: input.value,
    //                     id_ascendant: elt.dataset.id
    //                 }
    //             },
    //             function( json ) {
                    
    //                 if (json.isOk) {
    //                     var newElt = arborescence.addConcept(json.isOk.id, input.value);

    //                     if (brotherNodeIsList) {
    //                         brotherNode.appendChild(newElt);
    //                     } else {
    //                         var newNode = arborescence.addNode(elt);
    //                         elt.after(newNode);
    //                         newNode.appendChild(newElt);
    //                     }
                        
    //                     arborescence.rendreEditable(newElt);

    //                     fieldContent.remove();
    //                 }
                    
    //             }, 'json' )
    //             .fail(function (data) {
    //                 console.error(data);
    //             })
    //         });
            
    //     });
    // },

    // addConcept: function(id, name) {
    //     var concept = document.createElement('li');
    //     concept.classList.add('arborescence__elt');
    //     concept.dataset.id = id;
    //     concept.textContent = name;

    //     return concept;
    // },

    // addNode: function(elt) {
        
    //     var node = document.createElement('ul');
    //     node.classList.add('arborescence__section', '--active');
    //     this.articuler(node, elt)

    //     return node;
    // },
}

window.onpopstate = function() {
    sessionStorage.setItem('concept', historique.getLastConceptId());
    cache.queryConcept();
};

window.addEventListener("DOMContentLoaded", () => {
    arborescence.showNode();

    arborescence.lists.forEach(list => {
        arborescence.articuler(list);
    });

    arborescence.elts.forEach(elt => {
        elt.addEventListener('click', changeConcept);
    });
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
            cache.getArborescence();
        }
    }, 'json' )
    .fail(function (data) {
        console.error(data);
    });
}