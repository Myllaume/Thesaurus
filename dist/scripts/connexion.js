var formConnexion = document.querySelector('#form-connexion');

formConnexion.addEventListener('submit', (e) => {
    var cleEntree = document.querySelector('#input-connexion').value;
    e.preventDefault();

    if (cleEntree !== '') {
        $.get( '/Thesaurus/core/controllers/connexion.php' , { 'key': cleEntree },
        function( json ) {
                
            terminal.open(json.consolMsg);
            if (json.isOk) {
                document.location.reload(true);
            }
            
        }, 'json' )
        .fail(function (data, tata, oto) {
            console.error(data);
        })
    }
});