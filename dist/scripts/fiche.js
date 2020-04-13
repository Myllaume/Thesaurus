var fiche = {
    content: document.querySelector('#fiche'),
    input: document.querySelector('#input-upload'),
    form: document.querySelector('#form-upload'),
    reader: document.querySelector('#reader'),

    set: function(array) {
        this.content.innerHTML = '';
        
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

        var titre = document.createElement('h2');
        titre.classList.add('file__titre');
        titre.textContent = obj.nom_sortie;
        bandeau.appendChild(titre);

        var contentBtns = document.createElement('div');
        contentBtns.classList.add('file__btns');
        bandeau.appendChild(contentBtns);

        var btnRead = document.createElement('button');
        btnRead.classList.add('btn');
        btnRead.textContent = 'Lire';
        contentBtns.appendChild(btnRead);

        var btnDowld = document.createElement('button');
        btnDowld.classList.add('btn');
        btnDowld.textContent = 'Télécharger';
        contentBtns.appendChild(btnDowld);

        btnRead.addEventListener('click', () => {
            this.read(obj.id);
        });
        
    },
    send: function(data) {
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
            this.form.classList.add('form-upload--active');

            this.form.addEventListener('input', (e) => {
                e.preventDefault();
                
                var formData = new FormData(this.form);
            
                this.send(formData);
            });
        } else {
            this.form.classList.remove('form-upload--active');
        }
    },
    read: function(idFiche) {
        $.get( '/Thesaurus/core/controllers/cache.php' , {
            element: 'fiche',
            id: idFiche
        },
        function( json ) {
            terminal.open(json.consolMsg);
            console.log(json);

            fiche.reader.innerHTML = json.data;
            
        }, 'json' )
        .fail(function (error) { resolve(error); });
    }
};