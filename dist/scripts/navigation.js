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
    epingleByHash: document.querySelector('[data-onglet-main="'+ window.location.hash.substr(1) + '"]'),

    activ: function () {
        this.epingles.forEach(epingle => {
            epingle.addEventListener('click', (e) => {

                if (this.epingleActive == undefined) {
                    if (epingleByHash) {
                        this.epingleActive = this.epingleByHash; }
                    else {
                        this.epingleActive = this.epingles.item(0); }
                }
        
                if (this.epingleActive !== e.target) {
                    document.querySelector('#onglet' + this.epingleActive.dataset.ongletMain)
                        .classList.remove('onglet--active');
                    this.epingleActive.classList.remove('onglet__epingle--active');
                }
                this.epingleActive = epingle;
        
                document.querySelector('#onglet' + epingle.dataset.ongletMain)
                    .classList.add('onglet--active');
                epingle.classList.add('onglet__epingle--active');

                // history.pushState({}, 'concept ' + idConcept, idConcept);
            });
        });
    }
}

var ongletByHash = document.querySelector(identifiantOnglet);

if (ongletByHash) {
    document.querySelector('#' + ongletByHash.dataset.ongletMain)
        .classList.add('onglet--active');
    ongletByHash.classList.add('onglet__epingle--active');
} else {
    var firstOnglet = document.querySelector('[data-onglet-aside]');
    document.querySelector('#' + firstOnglet.dataset.ongletMain)
        .classList.add('onglet--active');
    firstOnglet.classList.add('onglet__epingle--active');
}


console.log(window.location.hash);

window.addEventListener("DOMContentLoaded", () => {
    voletAside.activ();
    voletMain.activ();
});