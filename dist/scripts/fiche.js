var fiche = {
    content: document.querySelector('#fiche'),
    input: document.querySelector('#input-upload'),
    form: document.querySelector('#form-upload'),

    set: function(array) {
        this.content.innerHTML = '';
        
        array.forEach(line => {
            this.add(line);
        });
    },
    add: function(obj) {
        var icon_content = document.createElement('div');
        icon_content.classList.add('file');
        icon_content.innerHTML = `
        <img class="file__icon" src="/Thesaurus/assets/images/icon-` + obj.extension + `.svg"
            title="` + obj.nom_sortie + `" alt="Fichier ` + obj.extension + `" />
        <div class="file__bandeau">
            <h2 class="file__titre">` + obj.nom_sortie + `</h2>
            <div class="file__btns">
                <button class="btn">Lire</button>
                <button class="btn">Télécharger</button>
            </div>
        </div>`;
        this.content.appendChild(icon_content);
    },
    send: function(data) {
        $.ajax({
            url: '/Thesaurus/core/controllers/upload.php?id=' + sessionStorage.getItem('concept'),
            type: 'POST',
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (json) {
                terminal.open(json.consolMsg);
                if (json.isOk) {
                    fiche.add(json.data);
                    cache.get(false);
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
    }
};