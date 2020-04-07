var historique = {
    content: document.querySelector('#historique'),
    
    actualiser: function() {
        var oldHistory = sessionStorage.getItem('historique').split(',');
        oldHistory.push(sessionStorage.getItem('concept'));
        sessionStorage.setItem('historique', oldHistory);

        this.addLine(this.getLastConceptId());
    },
    getLastConceptId: function() {
        var oldHistory = sessionStorage.getItem('historique').split(',');
        return oldHistory[oldHistory.length-1];
    },
    set: function() {
        var oldHistory = sessionStorage.getItem('historique').split(',');
        
        oldHistory.forEach(idConcept => {
            this.addLine(idConcept);
        });
    },
    addLine: function(idConcept) {
        var histLigne = document.createElement('div');
        histLigne.classList.add('historique__ligne');
        histLigne.innerHTML = '<a href="/Thesaurus/' + idConcept + '">Concept ' + idConcept + '</a>';
        this.content.appendChild(histLigne);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    historique.set();
});