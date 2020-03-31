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