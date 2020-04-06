var fiche = {
    content: document.querySelector('#fiche'),
    input: document.querySelector('#input-upload'),
    form: document.querySelector('#form-upload'),

    set: function(array) {
        array.forEach(line => {
            this.add(line);
        });
    },
    add: function(obj) {
        var icon_content = document.createElement('div');
        icon_content.classList.add('file-icon');
        icon_content.innerHTML = `
        <a href="/Thesaurus/upload/` + obj.nom_enregistrement + `.` + obj.extension + `" target="_blank">
            <img src="/Thesaurus/assets/images/icon-` + obj.extension + `.svg"
                title="` + obj.nom_sortie + `" alt="Fichier ` + obj.extension + `" />
        </a>`;
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
                }
            }
        });
    },
    canEdit: function(bool) {
        if (bool === true) {
            this.form.classList.add('form-upload--active');

            fiche.form.addEventListener('input', (e) => {
                e.preventDefault();
                var formData = new FormData(fiche.input);
            
                fiche.send(formData);
            });
        } else {
            this.form.classList.remove('form-upload--active');
        }
    }
};