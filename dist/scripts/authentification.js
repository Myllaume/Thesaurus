var authSwitch = {
    btnDeconnexion: document.querySelector('#btn-deconnexion'),
    formConnexion: document.querySelector('#form-connexion'),

    isConnected: function() {
        notice.canEdit(true);
        fiche.canEdit(true);
        matrice.canEdit(true);

        this.btnDeconnexion.classList.add('btn-deconnexion--active');
        this.formConnexion.classList.remove('form-connexion--active');

        this.btnDeconnexion.addEventListener('click', () => {
            $.get( '/Thesaurus/core/controllers/authentification.php' , { action: 'deconnexion' },
            function( json ) {
                terminal.open(json.consolMsg);
    
                if (json.isOk) {
                    sessionStorage.setItem('isOp', false);
                    authSwitch.isDisconnected();
                }
                
            }, 'json' )
            .fail(function (data) {
                console.error(data);
            })
        });
    },
    isDisconnected: function() {
        notice.canEdit(false);
        fiche.canEdit(false);
        matrice.canEdit(false);

        this.btnDeconnexion.classList.remove('btn-deconnexion--active');
        this.formConnexion.classList.add('form-connexion--active');

        this.formConnexion.addEventListener('submit', (e) => {
            var cleEntree = document.querySelector('#input-connexion').value;
            e.preventDefault();
        
            if (cleEntree !== '') {
                $.post( '/Thesaurus/core/controllers/authentification.php?action=connexion',
                { cle : cleEntree },
                function( json ) {
                        
                    terminal.open(json.consolMsg);
                    if (json.isOk) {
                        authSwitch.formConnexion.reset();

                        sessionStorage.setItem('isOp', true);
                        fiche.canEdit(false);
                        authSwitch.isConnected();
                    }
                    
                }, 'json' )
                .fail(function (data) {
                    console.error(data);
                });
            }
        
        });
    }
};