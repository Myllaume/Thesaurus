var notice = {
    inputDescription: document.querySelector('#concept-description'),
    inputDocuments: document.querySelector('#concept-document'),
    inputPersonnes: document.querySelector('#concept-personne'),
    setDescription: function (text) {
        this.inputDescription.value = text;
    },
    setDocument: function (array) {
        var text = '';
        array.forEach(elt => {
            var tab = [elt.titre, elt.auteur, elt.editeur, elt.annee, elt.type, elt.identifiant, elt.id];
            text += tab.join(', ') + '\r\n';
        });

        this.inputDocuments.value = text;
    },
    setPersonne: function (array) {
        var text = '';
        array.forEach(elt => {
            var tab = [elt.nom, elt.profession, elt.genre, elt.nationalite, elt.id];
            text += tab.join(', ') + '\r\n';
        });

        this.inputPersonnes.value = text;
    },
    traitement: function (obj) {
        this.setDescription(obj.description);
        this.setDocument(obj.document);
        this.setPersonne(obj.personne);
    },
    canEdit: function(bool) {
        bool = !bool; // inversion
        this.inputDescription.readOnly = bool;
        this.inputDocuments.readOnly = bool;
        this.inputPersonnes.readOnly = bool;
    }
}

notice.inputDescription.addEventListener('focus', () => {
    sauvegardeAuto(notice.inputDescription, 'description'); });

notice.inputDocuments.addEventListener('focus', () => {
    sauvegardeAuto(notice.inputDocuments, 'document'); });

notice.inputPersonnes.addEventListener('focus', () => {
    var initialVal = notice.inputPersonnes.value;
    var searchResult = notice.inputPersonnes.nextElementSibling;
    
    var firstResult = document.createElement('span');
    notice.inputPersonnes.after(firstResult);
    firstResult.addEventListener('click', () => {
        sauvegarde(sessionStorage.getItem('idConcept'), notice.inputPersonnes.value, 'personne'); });

    notice.inputPersonnes.addEventListener('input', () => {
        var totalVal = notice.inputPersonnes.value;
        var splitVal = totalVal.split('\n');

        firstResult.textContent = splitVal[splitVal.length - 1];

        search('personne', 'nom', splitVal[splitVal.length - 1])
        .then(function(data) {
            searchResult.innerHTML = '';
            
            data.forEach(line => {
                var listElementSearch = document.createElement('li');
                listElementSearch.textContent = line.libelle;
                searchResult.appendChild(listElementSearch);

                listElementSearch.addEventListener('click', () => {
                    var tab = [line.libelle, line.profession, line.genre, line.nationalite, line.id];
                    notice.inputPersonnes.value = initialVal + tab.join(', ');
                    initialVal = notice.inputPersonnes.value;
                    sauvegarde(sessionStorage.getItem('idConcept'), notice.inputPersonnes.value, 'personne');
                });
            });
        });
    });
});