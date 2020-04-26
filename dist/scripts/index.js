var index = {
    sujet: document.querySelector('#search-sujet'),
    search: document.querySelector('#search-input'),
    btnsSort: document.querySelectorAll('.index__btn'),
    board: document.querySelector('#search-board'),
    list: document.querySelector('#index-list'),
    request: {
        objet: '',
        terme: '',
        sort: 'croissant',
    },

    load: function() {
        index.list.innerHTML = '';

        search(this.request.objet, this.request.critere,
            this.request.terme, this.request.sort)
        .then(function(data) {

            data.forEach(lineData => {
                index.addLine(lineData); });
        });
    },
    selectObjet: function() {
        index.btnsSort.forEach(btn => {
            btn.classList.remove('--hidden'); });
        index.search.classList.remove('--hidden');

        index.request.objet = index.sujet.value;

        index.load();

        index.search.addEventListener('input', index.addTerme);
        index.btnsSort.forEach(btn => {
            btn.addEventListener('click', index.sort);
        });
    },
    sort: function(e) {
        index.request.sort = e.target.dataset.sort;

        index.load();
    },
    addTerme: function(e) {
        index.request.terme = e.target.value;

        index.load();
    },
    addLine: function(lineData) {
        var listElt = document.createElement('li');
        listElt.classList.add('index__ligne');
        listElt.textContent = Object.values(lineData)[1]; // nom
        index.list.appendChild(listElt);

        if (sessionStorage.getItem('isOp') == 'true') {
            var btnSuppr = document.createElement('button');
            btnSuppr.classList.add('btn-push');
            btnSuppr.setAttribute('data-delete-type', this.request.objet);
            btnSuppr.setAttribute('data-delete-id', Object.values(lineData)[0])
            btnSuppr.textContent = 'x';
            listElt.appendChild(btnSuppr);

            btnSuppr.addEventListener('click', deleteElement);
        }
    }
}

index.sujet.addEventListener('change', index.selectObjet);

function deleteElement(e) {

    var elementType = e.target.dataset.deleteType;
    var elementId = e.target.dataset.deleteId;

    switch (elementType) {
        case 'Concepts':
            deleteConcept(elementId);
            break;
        case 'Files':
            console.log('go suppr Files' + elementId);
            break;
    }
}