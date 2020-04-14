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
            var tab = [elt.titre, elt.auteur, elt.editeur, elt.annee, elt.type, elt.identifiant];
            text += tab.join(', ') + '\r\n';
        });

        this.inputDocuments.value = text;
    },
    setPersonne: function (array) {
        var text = '';
        array.forEach(elt => {
            var tab = [elt.nom, elt.profession, elt.genre, elt.nationalite];
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
    sauvegardeAuto(notice.inputPersonnes, 'personne'); });