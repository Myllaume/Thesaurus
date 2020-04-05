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
        }

        document.querySelector('#concept-specifique')
        .innerHTML = html;
    },
    setConceptAssocie: function (array) {
        var html = '';

        if (array) {
            array.forEach(line => {
                html += '<li>' + line.nom + '</li>';
            });
        }

        document.querySelector('#concept-associe')
        .innerHTML = html;
    },
    setTermeEmploye: function (array) {
        var html = '';

        if (array) {
            array.forEach(line => {
                html += '<li>' + line.nom + '</li>';
            });
        }

        document.querySelector('#terme-employe')
        .innerHTML = html;
    },
    traitement: function (obj) {
        this.setConcept(obj.nom);

        if (!obj.concept_generique) {
            this.setConceptGenerique('');
        } else {
            this.setConceptGenerique(obj.concept_generique[0].nom);
        }

        if (!obj.concept_specifique) {
            this.setConceptSpecifique(false);
        } else {
            this.setConceptSpecifique(obj.concept_specifique);
        }

        if (!obj.concept_associe) {
            this.setConceptAssocie(false);
        } else {
            this.setConceptAssocie(obj.concept_associe);
        }

        if (!obj.concept_employe) {
            this.setTermeEmploye(false);
        } else {
            this.setTermeEmploye(obj.concept_employe);
        }
        
    }
}