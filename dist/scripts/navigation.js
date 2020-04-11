var navDeroulante = {
    list: document.querySelector('#navigation-list'),
    btn: document.querySelector('#navigation-btn'),
    elts: document.querySelectorAll('#navigation-list li')
};

navDeroulante.btn.addEventListener('click', () => {
    navDeroulante.list.classList.toggle('list__content--active');
});

navDeroulante.elts.forEach(elt => {
    elt.addEventListener('click', () => {
        navDeroulante.list.classList.remove('list__content--active'); });
});

var toolbar = {
    menu: document.querySelector('#tool-menu'),
    btn: document.querySelector('#tool-btn')
};

toolbar.btn.addEventListener('click', () => {
    toolbar.menu.classList.toggle('toolbar__window--visible')
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