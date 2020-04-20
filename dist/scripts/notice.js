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

notice.document.input.addEventListener('change', () => {

    var totalVal = notice.document.input.value;
    var lines = totalVal.split('\n');

    for (let y = 0; y < notice.document.memoire.length; y++) {

        // console.log(lines[y].length);

        var words = lines[y].split(', ');
        
        if (lines[y] == '') {
            notice.document.memoire[y] = {id: notice.document.memoire[y].id};
        } else if (words.length === 6) {
            notice.document.memoire[y] = {
                id: notice.document.memoire[y].id,
                titre: words[0],
                auteur: words[1],
                editeur: words[2],
                annee: words[3],
                type: words[4],
                identifiant: words[5]
            };
            
        }
    }

    if (lines.length > notice.document.memoire.length) {
        var i = notice.document.memoire.length;
        
        while (lines[i] !== undefined) {
            var line = lines[i].split(', ');
            if (line.length === 6) {
                notice.document.memoire.push({
                    titre: line[0],
                    auteur: line[1],
                    editeur: line[2],
                    annee: line[3],
                    type: line[4],
                    identifiant: line[5]
                });
            } else {
                break;
            }
            i++;
        }
    }
    
    $.post( '/Thesaurus/core/controllers/concept.php?action=documents', {
        id : sessionStorage.getItem('idConcept'),
        data : notice.document.memoire
    },
    function(json) {
        terminal.open(json.consolMsg);

        console.log(json);

        if (json.isOk) {
            cache.getConcept(true, sessionStorage.getItem('idConcept'));
        }
    }, 'json' )
    .fail(function(erreur) { console.error(erreur); });

});