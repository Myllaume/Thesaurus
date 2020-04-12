var navDeroulante = {
    // <ul> contenant la liste
    list: document.querySelector('#navigation-list'),
    // <div> : interrupteur de la liste
    btn: document.querySelector('#navigation-btn'),
    // <li> : éléments de la liste
    elts: document.querySelectorAll('#navigation-list li')
};

navDeroulante.btn.addEventListener('click', () => {
    navDeroulante.list.classList.toggle('list__content--active'); });

navDeroulante.elts.forEach(elt => {
    elt.addEventListener('click', () => {
        navDeroulante.list.classList.remove('list__content--active'); });
});

var toolbar = {
    menu: document.querySelector('#tool-menu'),
    btn: document.querySelector('#tool-btn')
};

toolbar.btn.addEventListener('click', () => {
    toolbar.menu.classList.toggle('toolbar__window--visible') });

/**
 * Affichage des onglets de navigation et de visualisation
 */

var voletAside = {
    epingles: document.querySelectorAll('[data-onglet-aside]'),
    epingleActive: undefined,

    activ: function () {
        this.epingles.forEach(epingle => {
            epingle.addEventListener('click', (e) => {

                if (this.epingleActive == undefined) {
                    this.epingleActive = this.epingles.item(0); }
        
                if (this.epingleActive !== e.target) {
                    document.querySelector('#onglet' + this.epingleActive.dataset.ongletAside)
                        .classList.remove('onglet--active');
                    this.epingleActive.classList.remove('onglet__epingle--active');
                }
                this.epingleActive = epingle;
        
                document.querySelector('#onglet' + epingle.dataset.ongletAside)
                    .classList.add('onglet--active');
                epingle.classList.add('onglet__epingle--active');
            });
        });
    }
}

var voletMain = {
    epingles: document.querySelectorAll('[data-onglet-main]'),
    epingleActive: undefined,

    activ: function () {
        this.epingles.forEach(epingle => {
            epingle.addEventListener('click', (e) => {

                if (this.epingleActive == undefined) {
                    this.epingleActive = this.epingles.item(0); }
        
                if (this.epingleActive !== e.target) {
                    document.querySelector('#onglet' + this.epingleActive.dataset.ongletMain)
                        .classList.remove('onglet--active');
                    this.epingleActive.classList.remove('onglet__epingle--active');
                }
                this.epingleActive = epingle;
        
                document.querySelector('#onglet' + epingle.dataset.ongletMain)
                    .classList.add('onglet--active');
                epingle.classList.add('onglet__epingle--active');
            });
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    voletAside.activ();
    voletMain.activ();
});