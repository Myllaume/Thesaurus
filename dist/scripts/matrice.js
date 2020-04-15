var matrice = {
    inputConcept: document.querySelector('#concept'),
    inputConceptGenerique: document.querySelector('#concept-generique'),
    inputConceptSpecifique: document.querySelector('#concept-specifique'),
    inputConceptAssocie: document.querySelector('#concept-associe'),
    inputTermeEmploye: document.querySelector('#terme-employe'),

    setConcept: function (text) {
        this.inputConcept.value = text;
    },
    setConceptGenerique: function (obj) {
        this.inputConceptGenerique.innerHTML = '';
        if (!obj) { return; }

        var span = document.createElement('span');
        span.dataset.id = obj.id;
        span.textContent = obj.nom;
        this.inputConceptGenerique.appendChild(span);
        span.addEventListener('click', changeConcept);
    },
    setConceptSpecifique: function (array) {
        this.inputConceptSpecifique.innerHTML = '';
        if (!array) { return; }

        array.forEach(elt => {
            var span = document.createElement('li');
            span.dataset.id = elt.id;
            span.textContent = elt.nom;
            this.inputConceptSpecifique.appendChild(span);
            span.addEventListener('click', changeConcept);
        });
    },
    setConceptAssocie: function (array) {
        this.inputConceptAssocie.innerHTML = '';
        if (!array) { return; }

        array.forEach(elt => {
            var span = document.createElement('li');
            span.dataset.id = elt.id;
            span.textContent = elt.nom;
            this.inputConceptAssocie.appendChild(span);
            span.addEventListener('click', changeConcept);
        });
    },
    setTermeEmploye: function (array) {
        var text = '';
        array.forEach(elt => {
            text += elt.nom + '\r\n'; });

        this.inputTermeEmploye.value = text;
    },
    traitement: function (obj) {
        this.setConcept(obj.nom);
        this.setConceptGenerique(obj.concept_generique);
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
        this.inputTermeEmploye.readOnly = bool;
    }
}

matrice.inputConcept.addEventListener('focus', () => {
    sauvegardeAuto(matrice.inputConcept, 'nom')
    .then(function(result) { cache.getArborescence(true); })
    .catch(function(error) { console.error(error); });
});

matrice.inputTermeEmploye.addEventListener('focus', () => {
    sauvegardeAuto(matrice.inputTermeEmploye, 'employe')
    .then(function(result) { cache.getConcept(true); })
    .catch(function(error) { console.error(error); });
});

matrice.inputConceptGenerique.addEventListener('click', () => {
    changeMode(matrice.inputConceptGenerique, modifGenerique); });

matrice.inputConceptAssocie.addEventListener('click', () => {
    changeMode(matrice.inputConceptAssocie, modifAssocie); });