var download = {
    menu: {
        btn: document.querySelector('#export-btn'),
        content: document.querySelector('#export-menu')
    }
};

download.menu.btn.addEventListener('click', () => {
    download.menu.content.classList.toggle('export__window--visible');
});