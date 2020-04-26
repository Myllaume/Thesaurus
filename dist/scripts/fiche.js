var fiche = {
    // bloc où insérer les badeaux des fiches
    allFichesContent: document.querySelector('#fiche'),
    formUpload: document.querySelector('#form-upload'),
    btnCreate: document.querySelector('#fiche-create'),
    // contenant des boutons de création et de téléversement des fiches
    bandeauEdition: document.querySelector('.fiche__btns-box'),
    // contenant extensible des blocs de lecture et écriture
    voletSelection: document.querySelector('.fiche__volet-selection'),
    voletLecture: {
        content: document.querySelector('.fiche__volet-lecture'),
        btnExtend: document.querySelector('#reader-extend'),
        btnClose: document.querySelector('#reader-close')
    },
    // bouton permettant d'étendre le voletLecture
    // btnExtend: document.querySelector('#reader-extend'),
    // textarea de titre des fiches
    title: document.querySelector('#fiche-title'),
    // textarea d'édition des fiches
    writer: document.querySelector('#writer'),
    // bloc de lecture des fiches
    reader: document.querySelector('#reader'),
    // informations sur la fiche en cours de lecture
    metas: {
        path: null,
        title: null,
        id: null
    },
    /**
     * @param { Array } array - Tableau listant toutes les fiches
     * Les fiches retrouvée dans la base de données ou le cache sont
     * insérées une à dans le allFichesContent
     */
    set: function(array) {
        this.allFichesContent.innerHTML = '';
        this.writer.value = '';
        this.reader.innerHTML = '';
        
        array.forEach(line => {
            this.add(line);
        });
    },
    /**
     * @param { JSON } obj - Metas de la base de données
     * id, nom_enregistrement, nom_sortie,
     * extension, date
     */
    add: function(obj) {
        var icon_content = document.createElement('div');
        icon_content.classList.add('file');
        this.allFichesContent.appendChild(icon_content);

        var img = document.createElement('img');
        img.classList.add('file__icon')
        img.setAttribute('src', '/Thesaurus/assets/images/icon-' + obj.extension + '.svg');
        img.setAttribute('alt', 'Fichier' + obj.extension);
        img.setAttribute('title', obj.nom_sortie);
        icon_content.appendChild(img);

        var bandeau = document.createElement('div');
        bandeau.classList.add('file__bandeau');
        icon_content.appendChild(bandeau);

        var titre = document.createElement('span');
        titre.classList.add('file__titre');
        titre.textContent = obj.nom_sortie;
        bandeau.appendChild(titre);

        var contentBtns = document.createElement('div');
        contentBtns.classList.add('file__btns');
        bandeau.appendChild(contentBtns);

        var btnRead = document.createElement('button');
        btnRead.classList.add('btn-lite');
        btnRead.textContent = 'Ouvrir';
        contentBtns.appendChild(btnRead);

        var btnDowld = document.createElement('button');
        btnDowld.classList.add('btn-lite');
        btnDowld.textContent = 'Télécharger';
        contentBtns.appendChild(btnDowld);

        btnRead.addEventListener('click', () => {
            // Si demande de lecture, on stocke l'id de la fiche
            this.metas.title = obj.nom_sortie;
            this.metas.id = obj.id;
            this.read();
        });
        
    },
    send: function(e) {
        e.preventDefault();
        var data = new FormData(fiche.formUpload);

        $.ajax({
            url: '/Thesaurus/core/controllers/upload.php?id=' + sessionStorage.getItem('idConcept'),
            type: 'POST',
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (json) {
                terminal.open(json.consolMsg);
                if (json.isOk) {
                    fiche.add(json.data);
                    cache.getConcept(false);
                }
            }
        });
    },
    canEdit: function(bool) {
        // au changement de statut d'authentification
        if (bool === true) {
            this.bandeauEdition.classList.remove('fiche__btns-box--hidden');
            this.formUpload.addEventListener('input', this.send);
            
            this.writer.readOnly = false;
            this.writer.addEventListener('change', this.modifContent);
            this.title.readOnly = false;
            this.title.addEventListener('change', this.modifTitle);

            fiche.btnCreate.addEventListener('click', this.create);

            this.writer.classList.add('zone-lecture--active');
            this.reader.classList.remove('zone-lecture--active');
        } else {
            this.bandeauEdition.classList.add('fiche__btns-box--hidden');
            this.formUpload.removeEventListener('input', this.send);

            this.writer.readOnly = true;
            this.writer.removeEventListener('change', this.modifContent);
            this.title.readOnly = true;
            this.title.removeEventListener('change', this.modifTitle);

            fiche.btnCreate.removeEventListener('click', this.create);

            this.writer.classList.remove('zone-lecture--active');
            this.reader.classList.add('zone-lecture--active');
        }

        this.switchToModeLecture(false);
    },
    read: function() {
        return new Promise((resolve, reject) => {

            $.get( '/Thesaurus/core/controllers/cache.php' , {
                element: 'fiche',
                id: fiche.metas.id,
                markdown: sessionStorage.getItem('isOp')
            },
            function(json) {
                terminal.open(json.consolMsg);

                if (json.isOk) {
                    fiche.switchToModeLecture(true);
                    fiche.title.value = fiche.metas.title;
                    fiche.path = json.data.path;
                }

                if (sessionStorage.getItem('isOp') == 'true') {
                    fiche.writer.value = json.data.content; }
                else { 
                    fiche.reader.innerHTML = json.data.content; }

                resolve(true);

            }, 'json' )
            .fail(function (error) { console.error(error); });

        });
    },
    modifContent: function() {
        $.post( '/Thesaurus/core/controllers/concept.php?action=change_fiche_content', {
            id : fiche.metas.id,
            data : fiche.writer.value,
            path : fiche.path
        },
        function(json) {
            terminal.open(json.consolMsg);
        }, 'json' )
        .fail(function(erreur) { console.error(erreur); });
    },
    modifTitle: function() {
        $.post( '/Thesaurus/core/controllers/concept.php?action=change_fiche_title', {
            id : fiche.metas.id,
            data : fiche.title.value
        },
        function(json) {
            terminal.open(json.consolMsg);

            if (json.isOk) {
                cache.getConcept()
                .then(function() {
                    fiche.switchToModeLecture(false);

                    fiche.metas.title = fiche.title.value;

                    fiche.read(fiche.metas.id)
                    .then(function() {
                        fiche.switchToModeLecture(true); });
                });
            }

        }, 'json' )
        .fail(function(erreur) { console.error(erreur); });
    },
    create: function() {
        $.get( '/Thesaurus/core/controllers/concept.php' , {
            action: 'add_fiche',
            id: sessionStorage.getItem('idConcept')
        },
        function(json) {

            if (json.isOk) {
                cache.getConcept(false);
                fiche.add(json.data);
    
                fiche.metas.id = json.data.id;
                fiche.metas.title = json.data.nom_sortie;
                fiche.read();
            }

        }, 'json' )
        .fail(function (error) { console.error(error); });
    },
    extendLecture: function() {
        fiche.voletLecture.content.classList.toggle('fiche__volet-lecture--active');
    },
    switchToModeLecture: function(bool) {
        if (bool) {
            fiche.voletSelection.classList.remove('fiche__volet-selection--active');
            fiche.voletLecture.content.classList.add('fiche__volet-lecture--visible');
            fiche.voletLecture.btnExtend.addEventListener('click', this.extendLecture);
        } else {
            fiche.voletSelection.classList.add('fiche__volet-selection--active');
            fiche.voletLecture.content.classList.remove('fiche__volet-lecture--visible');
            fiche.voletLecture.btnExtend.removeEventListener('click', this.extendLecture);
            fiche.voletLecture.content.classList.remove('fiche__volet-lecture--active');
        }
    }
};

fiche.voletLecture.btnClose.addEventListener('click', () => {
    fiche.switchToModeLecture(false);
});

function deleteFiche(idFiche) {
    console.log(idFiche);
    
    $.get( '/Thesaurus/core/controllers/concept.php' , {
        action: 'delete_fiche',
        id: idFiche
    },
    function(json) {
        terminal.open(json.consolMsg);
        if (json.isOk) { cache.getConcept(); }
    }, 'json')
    .fail(function(error) { console.error(error); });
}