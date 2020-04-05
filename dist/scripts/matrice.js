var matrice = {
    setConcept: function (text) {
        document.querySelector('#concept')
        .textContent = text;
    },
    setConceptGenerique: function (text) {
        document.querySelector('#concept-generique')
        .textContent = text;
    },
    setConceptSpecifique: function (array) {
        var html = '';

        if (array) { html = this.list(array); }

        document.querySelector('#concept-specifique')
        .innerHTML = html;
    },
    setConceptAssocie: function (array) {
        var html = '';

        if (array) { html = this.list(array); }

        document.querySelector('#concept-associe')
        .innerHTML = html;
    },
    setTermeEmploye: function (array) {
        var html = '';

        if (array) { html = this.list(array); }

        document.querySelector('#terme-employe')
        .innerHTML = html;
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
    }
}