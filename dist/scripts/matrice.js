var matrice = {
    inputConcept: document.querySelector('#concept'),
    inputConceptGenerique: document.querySelector('#concept-generique'),
    inputConceptSpecifique: document.querySelector('#concept-specifique'),
    inputConceptAssocie: document.querySelector('#concept-associe'),
    inputTermeEmploye: document.querySelector('#terme-employe'),

    lastConceptGeneriqueElt: undefined,

    setConcept: function (text) {
        this.inputConcept.value = text;
    },
    setConceptGenerique: function (text) {
        this.inputConceptGenerique.textContent = text;
    },
    setConceptSpecifique: function (array) {
        var html = '';

        if (array) { html = this.list(array); }

        this.inputConceptSpecifique.innerHTML = html;
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
        this.setConceptGenerique(obj.concept_generique.nom);
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

matrice.inputConcept.addEventListener('focus', () => {
    sauvegardeAuto(matrice.inputConcept, 'nom')
    .then(function(result) {
        arborescence.findNode(result.id).textContent = result.content;
        cache.getArborescence();
    })
    .catch(function(error) { console.error(error); });
});