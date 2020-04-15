var notice = {
    inputDescription: document.querySelector('#concept-description'),
    inputDocuments: document.querySelector('#concept-document'),
    personnes: {
        input: document.querySelector('#concept-personne'),
        memoire: [],
        models: document.querySelectorAll('[data-personne-model]')
    },
    inputPersonnesMemory: [],
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
        let i = 0;
        array.forEach(elt => {
            var tab = [elt.nom, elt.profession, elt.genre, elt.nationalite, elt.id];
            this.personnes.memoire.push(tab);

            if (i == array.length - 1) { text += tab.join(', '); }
            else { text += tab.join(', ') + '\r\n'; }

            i++;
        });

        this.personnes.input.value = text;
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
        this.personnes.input.readOnly = bool;
    }
}

notice.inputDescription.addEventListener('focus', () => {
    sauvegardeAuto(notice.inputDescription, 'description'); });

notice.inputDocuments.addEventListener('focus', () => {
    sauvegardeAuto(notice.inputDocuments, 'document'); });

notice.personnes.input.addEventListener('focus', () => {
    
    notice.personnes.input.addEventListener('input', () => {
        var totalVal = notice.personnes.input.value;
        var lines = totalVal.split('\n');
    
        // console.log(notice.inputPersonnesMemory[1]);
    
        let i= 0;
        lines.forEach(line => {
            var chaine = line.split(', ');
            // console.log(chaine);
            // notice.personnes.models[chaine.length - 1].classList.add('--active');
    
                switch (chaine.length - 1) {
                    case 0:
                        notice.personnes.models[0].classList.add('--active');
                        break;
                    case 1:
                        notice.personnes.models[1].classList.add('--active');
                        break;
                    case 2:
                        notice.personnes.models[2].classList.add('--active');
                        break;
                    case 3:
                        notice.personnes.models[3].classList.add('--active');
                        break;
                    case 4:
                        notice.personnes.models[4].classList.add('--active');
                        break;
                }
            
                notice.personnes.memoire[i] = chaine;
    
    
            i++;
        });
    });

    
    notice.personnes.input.addEventListener('blur', () => {
        console.log(notice.personnes.memoire);
        
        sauvegarde(sessionStorage.getItem('idConcept'), notice.personnes.memoire, 'personne');

    });
});

// notice.personnes.input.addEventListener('blur', () => {
//     // console.log(notice.personnes.memoire);
//     sauvegarde(sessionStorage.getItem('idConcept'), notice.personnes.memoire, 'personne');
// });