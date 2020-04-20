// sessionStorage.clear();
if (sessionStorage.length === 0) {
    // si la session est vide
    sessionStorage.setItem('idConcept', document.body.dataset.concept);
    sessionStorage.setItem('nomConcept', undefined);
    sessionStorage.setItem('historique', '[{"nom" : "undefined", "id": ' + document.body.dataset.concept + '}]');
    sessionStorage.setItem('historiquePos', 0);
    sessionStorage.setItem('inEdition', 'false');
    
} else if (sessionStorage.getItem('concept') != document.body.dataset.concept) {
    // ou que l'identifiant enregistré n'est pas le même que celui présenté dans le DOM
    sessionStorage.setItem('idConcept', document.body.dataset.concept);
}

sessionStorage.setItem('isOp', document.body.dataset.op);

window.addEventListener("DOMContentLoaded", () => {
    // si l'utilisateur est désigné opérateur par sa session
    if (sessionStorage.getItem('isOp') == 'true') {
        authSwitch.isConnected();
    } else {
        authSwitch.isDisconnected();
    }
});