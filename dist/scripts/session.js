if (sessionStorage.length === 0
    || sessionStorage.getItem('concept') != document.body.dataset.concept) {
    sessionStorage.setItem('concept', document.body.dataset.concept);
    sessionStorage.setItem('lastConcept', document.body.dataset.concept);
}

window.addEventListener("DOMContentLoaded", () => {
    arborescence.queryCache(sessionStorage.getItem('concept'));
});