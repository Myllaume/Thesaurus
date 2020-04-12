var historique = {
    content: document.querySelector('#historique'),

    /**
     * @return { Array } - Historique de session découpé
     */
    sessionHistoriqueToArray: function() {
        return sessionStorage.getItem('historique').split(',');
    },
    actualiser: function() {
        var oldHistory = this.sessionHistoriqueToArray();
        // l'id du concept en session est ajouté à l'historique...
        var idConcept = sessionStorage.getItem('concept');
        oldHistory.push(idConcept);
        sessionStorage.setItem('historique', oldHistory);

        this.addLine(idConcept); // et au panneau Historique
    },
    /**
     * @return { Number } - Dernier id entré dans l'historique de session
     */
    getLastConceptId: function() {
        var oldHistory = this.sessionHistoriqueToArray();
        return oldHistory[oldHistory.length-1];
    },
    set: function() {
        var oldHistory = this.sessionHistoriqueToArray();
        oldHistory.forEach(idConcept => {
            this.addLine(idConcept); });
    },
    /**
     * @param { Number } [idConcept=] Dernier id  enregistré en Historique de session
     */
    addLine: function(idConcept = this.getLastConceptId()) {
        var histLigne = document.createElement('div');
        histLigne.classList.add('historique__ligne');
        histLigne.innerHTML = '<a href="/Thesaurus/' + idConcept + '">Concept ' + idConcept + '</a>';
        this.content.appendChild(histLigne);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    historique.set(); });