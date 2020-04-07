var matrice = {
    inputConcept: document.querySelector('#concept'),
    inputConceptGenerique: document.querySelector('#concept-generique'),
    inputConceptSpecifique: document.querySelector('#concept-specifique'),
    inputConceptAssocie: document.querySelector('#concept-associe'),
    inputTermeEmploye: document.querySelector('#terme-employe'),

    lastConceptGeneriqueElt: undefined,

    setConcept: function (text) {
        this.inputConcept.textContent = text;
    },
    setConceptGenerique: function (obj) {
        if (obj == false) { var id = 0; } else { var id = obj.id; }

        if (this.lastConceptGeneriqueElt !== undefined)
        { this.lastConceptGeneriqueElt.removeAttribute('selected'); }

        var selectedElt = this.inputConceptGenerique.querySelector('[value="' + id + '"]');
        selectedElt.setAttribute('selected', '');

        this.lastConceptGeneriqueElt = selectedElt;
        
    },
    setConceptSpecifique: function (array) {
        var html = '';

        if (array) { html = this.list(array); }

        this.inputConceptSpecifiqueinnerHTML = html;
    },
    setConceptAssocie: function (array) {
        var html = '';

        if (array) { html = this.list(array); }

        this.inputConceptAssocie.innerHTML = html;
    },
    setTermeEmploye: function (array) {
        var html = '';

        if (array) { html = this.list(array); }

        this.inputTermeEmploye.innerHTML = html;
    },
    list: function (array) {
        var html = '';
        if (array) {
            array.forEach(line => {
                html += '<li>' + line.nom + '</li>';
            });
        }
        return html;
    },
    traitement: function (obj) {
        this.setConcept(obj.nom);
        this.setConceptGenerique(obj.concept_generique);
        this.setConceptSpecifique(obj.concept_specifique);
        this.setConceptAssocie(obj.concept_associe);
        this.setTermeEmploye(obj.concept_employe);
    },
    canEdit: function(bool) {
        bool = !bool; // inversion
        this.inputConcept.readOnly = bool;
        this.inputConceptGenerique.disabled = bool;
    }
}