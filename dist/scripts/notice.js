var notice = {
    inputDescription: document.querySelector('#concept-description'),
    document: {
        input: document.querySelector('#concept-document'),
        memoire: []
    },
    setDescription: function (text) {
        this.inputDescription.value = text;
    },
    setDocument: function (array) {
        var text = '';
        let i = 0;
        array.forEach(elt => {
            // this.document.memoire.push([elt.id, elt.titre, elt.auteur, elt.editeur, elt.annee, elt.type, elt.identifiant]);
            this.document.memoire.push({
                id: elt.id,
                titre: elt.titre,
                auteur: elt.auteur,
                editeur: elt.editeur,
                annee: elt.annee,
                type: elt.type,
                identifiant: elt.identifiant
            });
            var tab = [elt.titre, elt.auteur, elt.editeur, elt.annee, elt.type, elt.identifiant];

            if (i == array.length - 1) { text += tab.join(', '); }
            else { text += tab.join(', ') + '\r\n'; }

            i++;
        });

        this.document.input.value = text;
    },
    traitement: function (obj) {
        this.setDescription(obj.description);
        this.setDocument(obj.document);
    },
    canEdit: function(bool) {
        bool = !bool; // inversion
        this.inputDescription.readOnly = bool;
        this.document.input.readOnly = bool;
    }
}

notice.inputDescription.addEventListener('focus', () => {
    sauvegardeAuto(notice.inputDescription, 'description'); });

notice.document.input.addEventListener('focus', () => {
    sauvegardeAuto(notice.document.input, 'document'); });

// notice.personnes.input.addEventListener('input', () => {
//     var totalVal = notice.personnes.input.value;
//     var lines = totalVal.split('\n');

//     let i= 0;
//     lines.forEach(line => {
//         var chaine = line.split(', ');

//         switch (chaine.length - 1) {
//             case 0:
//                 notice.personnes.models[0].classList.add('--active');
//                 break;
//             case 1:
//                 notice.personnes.models[1].classList.add('--active');
//                 break;
//             case 2:
//                 notice.personnes.models[2].classList.add('--active');
//                 break;
//             case 3:
//                 notice.personnes.models[3].classList.add('--active');
//                 break;
//             case 4:
//                 notice.personnes.models[4].classList.add('--active');
//                 break;
//         }

//         i++;
//     });
// });

notice.document.input.addEventListener('change', () => {

    var totalVal = notice.document.input.value;
    var lines = totalVal.split('\n');

    if (lines.length > notice.document.memoire.length) {
        var i = notice.document.memoire.length;
        while (lines[i] !== undefined) {
            var line = lines[i].split(', ');
            notice.document.memoire.push({
                titre: line[0],
                auteur: line[1],
                editeur: line[2],
                annee: line[3],
                type: line[4],
                identifiant: line[5]
            });
            i++;
        }
    }

    // for (let i = 0; i < lines.length; i++) {

    //     if (notice.personnes.memoire[i] == undefined) {
    //         notice.personnes.memoireTampon.push('add');
    //         break;
    //     }
        
    //     if (lines[i] != notice.personnes.memoire[i].join(', ')) {
    //         notice.personnes.memoireTampon[i] = 'modif';
    //         break;
    //     }

    //     if (lines[i] == '') {
    //         notice.personnes.memoireTampon[i] = 'suppr';
    //     }
    // }    
    
    $.post( '/Thesaurus/core/controllers/test.php', {
        id : sessionStorage.getItem('idConcept'),
        data : notice.document.memoire
    },
    function(json) {
        terminal.open(json.consolMsg);

        console.log(json);

        if (json.isOk) {
            cache.getConcept(true, id);
        }
    }, 'json' )
    .fail(function(erreur) { console.error(erreur); });

});