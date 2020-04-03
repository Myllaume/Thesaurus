var arborescence = {
    content: document.querySelector('.arborescence'),
    lists: document.querySelectorAll('.arborescence__section:not(:first-child)'),
    elts: document.querySelectorAll('.arborescence li'),

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

    query: function(elt) {
        elt.querySelector('span').addEventListener('click', () => {
            $.get( '/Thesaurus/core/controllers/query.php' , { id: elt.dataset.id },
            function( json ) {
                    
                matrice.traitement(json.data.matrice);
                notice.traitement(json.data.notice);
                
            }, 'json' )
            .fail(function (data) {
                console.error(data);
            })
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {

    arborescence.lists.forEach(list => {
        arborescence.articuler(list);
    });

    arborescence.elts.forEach(elt => {
        // arborescence.rendreEditable(elt);
        arborescence.query(elt);
    });
});