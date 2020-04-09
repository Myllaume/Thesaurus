var navDeroulante = {
    list: document.querySelector('#navigation-list'),
    btn: document.querySelector('#navigation-btn'),
    elts: document.querySelectorAll('#navigation-list li'),
    isOpen: false,

    open: function() { this.list.classList.add('navigation-list--active'); },
    close: function() { this.list.classList.remove('navigation-list--active'); }
};

navDeroulante.btn.addEventListener('click', () => {
    if (!navDeroulante.isOpen) {
        navDeroulante.open();
        navDeroulante.isOpen = true;
    } else {
        navDeroulante.close();
        navDeroulante.isOpen = false;
    }
});

var toolbar = {
    menu: document.querySelector('#tool-menu'),
    btn: document.querySelector('#tool-btn')
};

toolbar.btn.addEventListener('click', () => {
    toolbar.menu.classList.toggle('toolbar__window--visible')
});

navDeroulante.elts.forEach(elt => {
    elt.addEventListener('click', () => { navDeroulante.close(); });
});

var voletAside = {
    epingles: document.querySelectorAll('[data-onglet-aside]'),
    epingleActive: document.querySelectorAll('[data-onglet-aside]')[0],

    activ: function () {
        this.epingles.forEach(epingle => {
            epingle.addEventListener('click', (e) => {
        
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
    epingleActive: document.querySelectorAll('[data-onglet-main]')[0],

    activ: function () {
        this.epingles.forEach(epingle => {
            epingle.addEventListener('click', (e) => {
        
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