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

        if (array) {
            array.forEach(line => {
                html += '<li>' + line.nom + '</li>';
            });
        } else {
            html = 'AUCUN';
        }

        document.querySelector('#concept-specifique')
        .innerHTML = html;
    },
    traitement: function (obj) {
        this.setConcept(obj.nom);

        if (!obj.concept_generique) {
            this.setConceptGenerique('AUCUN');
        } else {
            this.setConceptGenerique(obj.concept_generique[0].nom);
        }

        if (!obj.concept_specifique) {
            this.setConceptSpecifique(false);
        } else {
            this.setConceptSpecifique(obj.concept_specifique);
        }
        
    }
}