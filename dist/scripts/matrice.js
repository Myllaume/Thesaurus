var matrice = {
    inputConcept: document.querySelector('#concept'),
    inputConceptGenerique: document.querySelector('#concept-generique'),
    inputConceptSpecifique: document.querySelector('#concept-specifique'),
    inputConceptAssocie: document.querySelector('#concept-associe'),
    inputTermeEmploye: document.querySelector('#terme-employe'),

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
    /**
     * @param { Array } - Tableau de noms
     * @return { String } - Code html
     * ---
     * Créer une liste à partir d'éléments en tableau
     */
    list: function (array) {
        var html = '';
        array.forEach(line => {
            html += '<li>' + line.nom + '</li>'; });

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
        if (bool) {
            matrice.inputConceptGenerique.classList.add('clignotant');
            matrice.inputConceptAssocie.classList.add('clignotant');
        } else {
            matrice.inputConceptGenerique.classList.remove('clignotant');
            matrice.inputConceptAssocie.classList.remove('clignotant');
        }

        bool = !bool; // inversion
        this.inputConcept.readOnly = bool;
    }
}

matrice.inputConcept.addEventListener('focus', () => {
    sauvegardeAuto(matrice.inputConcept, 'nom')
    .then(function(result) { cache.getArborescence(true); })
    .catch(function(error) { console.error(error); });
});

matrice.inputConceptGenerique.addEventListener('click', () => {
    changeMode(matrice.inputConceptGenerique, modifGenerique); });

matrice.inputConceptAssocie.addEventListener('click', () => {
    changeMode(matrice.inputConceptAssocie, modifAssocie); });