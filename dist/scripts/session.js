// sessionStorage.clear();
if (sessionStorage.length === 0) {
    sessionStorage.setItem('concept', document.body.dataset.concept);
}

window.addEventListener("DOMContentLoaded", () => {
    arborescence.queryCache(sessionStorage.getItem('concept'));
});