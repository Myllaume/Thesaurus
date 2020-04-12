var authSwitch = {
    btnDeconnexion: document.querySelector('#btn-deconnexion'),
    formConnexion: document.querySelector('#form-connexion'),

    isConnected: function() {
        // activation de l'édition des différentes visualisations
        notice.canEdit(true);
        fiche.canEdit(true);
        matrice.canEdit(true);
        arborescence.canEdit(true);

        // échange de l'affichage entre le bouton de déco. et le formulaire de co.
        this.btnDeconnexion.classList.add('btn-deconnexion--active');
        this.formConnexion.classList.remove('form-connexion--active');

        this.btnDeconnexion.addEventListener('click', () => {
            $.get( '/Thesaurus/core/controllers/authentification.php' , { action: 'deconnexion' },
            function( json ) {
                terminal.open(json.consolMsg);
    
                if (json.isOk) {
                    // l'utilisateur perd le statut d'opérateur
                    sessionStorage.setItem('isOp', false);
                    // activation de la connexion
                    authSwitch.isDisconnected();
                }
                
            }, 'json' )
            .fail(function (data) {
                console.error(data);
            })
        });
    },
    isDisconnected: function() {
        // désactivation de l'édition des différentes visualisations
        notice.canEdit(false);
        fiche.canEdit(false);
        matrice.canEdit(false);
        arborescence.canEdit(false);

        // échange de l'affichage entre le bouton de déco. et le formulaire de co.
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
                        authSwitch.formConnexion.reset(); // form vidé

                        // l'utilisateur obtient le statut d'opérateur
                        sessionStorage.setItem('isOp', true);
                        // activation de la déconnexion
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