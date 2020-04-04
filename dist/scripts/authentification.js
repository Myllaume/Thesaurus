var formConnexion = document.querySelector('#form-connexion');
if (formConnexion) { connexion(); }

var btnDeconnexion = document.querySelector('#btn-deconnexion');
if (btnDeconnexion) { deconnexion(); }

function connexion() {
    formConnexion.addEventListener('submit', (e) => {
        var cleEntree = document.querySelector('#input-connexion').value;
        e.preventDefault();
    
        if (cleEntree !== '') {
            $.post( '/Thesaurus/core/controllers/authentification.php?action=connexion',
            { cle : cleEntree },
            function( json ) {
                    
                terminal.open(json.consolMsg);
                if (json.isOk) {
                    document.location.reload(true);
                }
                
            }, 'json' )
            .fail(function (data) {
                console.error(data);
            });
        }
    
    });
}

function deconnexion() {
    btnDeconnexion.addEventListener('click', (e) => {
        $.get( '/Thesaurus/core/controllers/authentification.php' , { action: 'deconnexion' },
        function( json ) {
            terminal.open(json.consolMsg);

            if (json.isOk) {
                document.location.reload(true);
            }
            
        }, 'json' )
        .fail(function (data) {
            console.error(data);
        })
    });
}