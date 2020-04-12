var terminal = {
    content: document.querySelector('#terminal'),

    open: function (text) {
        this.content.classList.add('terminal--visible');
        this.content.textContent = text;
        // fermeture au bout de 4 secondes
        setTimeout(() => {
            this.close(); }, 4000);
    },

    close: function () {
        this.content.classList.remove('terminal--visible');
        this.content.textContent = '';
    }
}