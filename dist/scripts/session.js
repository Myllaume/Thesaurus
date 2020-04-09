// sessionStorage.clear();
if (sessionStorage.length === 0) {
    sessionStorage.setItem('concept', document.body.dataset.concept)
    sessionStorage.setItem('isOp', document.body.dataset.op);
    sessionStorage.setItem('historique', [document.body.dataset.concept]);
    
} else if (sessionStorage.getItem('concept') != document.body.dataset.concept) {
    sessionStorage.setItem('concept', document.body.dataset.concept);
}

window.addEventListener("DOMContentLoaded", () => {
    cache.query(sessionStorage.getItem('concept'));

    if (sessionStorage.getItem('isOp') == 'true') {
        authSwitch.isConnected();
    } else {
        authSwitch.isDisconnected();
    }
});