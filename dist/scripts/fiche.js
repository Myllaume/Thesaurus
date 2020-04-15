var fiche = {
    content: document.querySelector('#fiche'),
    input: document.querySelector('#input-upload'),
    form: document.querySelector('#form-upload'),
    voletLecture: document.querySelector('.fiche__volet-lecture'),
    bandeauEdition: document.querySelector('.fiche__btns-box'),
    reader: document.querySelector('#reader'),
    btnExtend: document.querySelector('#reader-extend'),

    set: function(array) {
        this.content.innerHTML = '';
        // this.reader.innerHTML = '';
        
        array.forEach(line => {
            this.add(line);
        });
    },
    add: function(obj) {
        var icon_content = document.createElement('div');
        icon_content.classList.add('file');
        this.content.appendChild(icon_content);

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
        btnRead.textContent = 'Lire';
        contentBtns.appendChild(btnRead);

        var btnDowld = document.createElement('button');
        btnDowld.classList.add('btn-lite');
        btnDowld.textContent = 'Télécharger';
        contentBtns.appendChild(btnDowld);

        btnRead.addEventListener('click', () => {
            this.read(obj.id);
        });
        
    },
    send: function(e) {
        e.preventDefault();
        var data = new FormData(fiche.form);

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
        if (bool === true) {
            this.bandeauEdition.classList.remove('fiche__btns-box--hidden');
            this.form.addEventListener('input', this.send);
        } else {
            this.bandeauEdition.classList.add('fiche__btns-box--hidden');
            this.form.removeEventListener('input', this.send);
        }
    },
    read: function(idFiche) {
        $.get( '/Thesaurus/core/controllers/cache.php' , {
            element: 'fiche',
            id: idFiche
        },
        function( json ) {
            terminal.open(json.consolMsg);

            fiche.reader.innerHTML = json.data;
        }, 'json' )
        .fail(function (error) { resolve(error); });
    }
};

fiche.btnExtend.addEventListener('click', () => {
    fiche.voletLecture.classList.toggle('fiche__volet-lecture--active');
});