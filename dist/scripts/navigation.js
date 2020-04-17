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

function onglet(nomOnglet, parentOnglet) {
    this.nom = nomOnglet;
    this.btn = document.querySelector('[data-onglet=' + nomOnglet + ']');
    this.content = document.querySelector('#onglet-' + nomOnglet);
    this.parent = parentOnglet;

    this.btn.addEventListener('click', () => {
        this.open();
    });
}

onglet.prototype.open = function() {
    this.parent.querySelector('.onglet__epingle--active')
        .classList.remove('onglet__epingle--active');
    this.parent.querySelector('.onglet--active')
        .classList.remove('onglet--active');
    
    this.btn.classList.add('onglet__epingle--active');
    this.content.classList.add('onglet--active');

    window.location.hash = this.nom;
}

window.addEventListener("DOMContentLoaded", () => {
    var visualisation = document.querySelector('.visualisation');
    var visualisationOnglets = ['matrice', 'notice', 'fiches'];

    visualisationOnglets.forEach(nomOnglet => {
        new onglet(nomOnglet, visualisation); });
    
    var navigation = document.querySelector('.navigation');
    var navigationOnglets = ['arborescence', 'index', 'historique'];

    navigationOnglets.forEach(nomOnglet => {
        new onglet(nomOnglet, navigation); });
    
    if (location.hash) {
        var targetOnglet = new onglet(location.hash.substring(1), visualisation);
        targetOnglet.open();
    }
});