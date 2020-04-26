var download = {
    menu: {
        btn: document.querySelector('#export-btn'),
        content: document.querySelector('#export-menu')
    },
    downloadBtns: {
        concept: document.querySelector('#download-concept')
    }
};

download.menu.btn.addEventListener('click', () => {
    download.menu.content.classList.toggle('export__window--visible');
});

download.downloadBtns.concept.addEventListener('click', () => {
    window.open('/Thesaurus/core/controllers/export.php?element=concept&id='
        + sessionStorage.getItem('idConcept'), '_blank');
});