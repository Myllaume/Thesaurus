var index = {
    sujet: document.querySelector('#search-sujet'),
    search: document.querySelector('#search-input'),
    btnsSort: document.querySelectorAll('.index__btn'),
    board: document.querySelector('#search-board'),
    request: {
        objet: '',
        critere: '',
        terme: '',
        sort: 'croissant',
    },
    activeSelect: undefined,

    load: function() {
        search(this.request.objet, this.request.critere,
            this.request.terme, this.request.sort)
        .then(function(data) {
            index.board.innerHTML = data;
        });
    },
    selectObjet: function() {
        if (index.activeSelect !== undefined) {
            // si un select est déjà affiché
            index.activeSelect.classList.add('--hidden');
        } else {
            index.btnsSort.forEach(btn => {
                btn.classList.remove('--hidden'); });
            index.search.classList.remove('--hidden');
        }

        index.activeSelect = document.querySelector('#search-' + index.sujet.value);

        index.activeSelect.classList.remove('--hidden');

        index.request.objet = index.sujet.value;
        index.request.critere = index.activeSelect.value;

        index.load();

        index.activeSelect.addEventListener('change', index.selectCritere);
        index.search.addEventListener('input', index.addTerme);
        index.btnsSort.forEach(btn => {
            btn.addEventListener('click', index.sort);
        });
    },
    selectCritere: function() {
        index.request.critere = index.activeSelect.value;

        index.load();
    },
    sort: function(e) {
        index.request.sort = e.target.dataset.sort;

        index.load();
    },
    addTerme: function(e) {
        index.request.terme = e.target.value;

        index.load();
    }
}

index.sujet.addEventListener('change', index.selectObjet);

console.log(index.search);
