if (sessionStorage.length === 0
    || sessionStorage.getItem('concept') != document.body.dataset.concept) {

    sessionStorage.setItem('isOp', document.body.dataset.op);
    sessionStorage.setItem('concept', document.body.dataset.concept);
    sessionStorage.setItem('lastConcept', document.body.dataset.concept);
}

console.log(sessionStorage);


window.addEventListener("DOMContentLoaded", () => {
    cache.query(sessionStorage.getItem('concept'));

    if (sessionStorage.getItem('isOp') == 'true') {
        authSwitch.isConnected();
    } else {
        authSwitch.isDisconnected();
    }
});