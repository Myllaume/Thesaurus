var notice = {
    setType: function (text) {
        document.querySelector('#concept-type')
        .textContent = text;
    },
    setDescription: function (text) {
        document.querySelector('#concept-description')
        .textContent = text;
    },
    setDocument: function (obj) {
        var icon_content = document.createElement('div');
        icon_content.classList.add('file-icon');
        icon_content.innerHTML = `
        <a href="/Thesaurus/` + obj.chemin + `" target="_blank">
            <img src="/Thesaurus/assets/images/icon-` + obj.type + `.svg" alt="Fichier ` + obj.type + `" />
        </a>`;
        document.querySelector('#concept-document').appendChild(icon_content);
    },
    traitement: function (obj) {
        this.setType(obj.type);
        this.setDescription(obj.description);
    }
}