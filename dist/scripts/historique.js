var historique = {
    content: document.querySelector('#historique'),

    /**
     * @return { Array } - Historique de session découpé
     */
    sessionHistoriqueToJSON: function() {
        return JSON.parse(sessionStorage.getItem('historique'));
    },
    actualiser: function() {
        var oldHistory = sessionStorage.getItem('historique');
        var oldHistory = oldHistory.substr(0, oldHistory.length-1);
        
        // l'id du concept en session est ajouté à l'historique...
        var idConcept = sessionStorage.getItem('idConcept');
        var nomConcept = sessionStorage.getItem('nomConcept');
        oldHistory += ',{"nom" : "' + nomConcept + '", "id": ' + idConcept + '}]';
        sessionStorage.setItem('historique', oldHistory);

        console.log(historique.sessionHistoriqueToJSON());

        this.addLine(JSON.parse('{"nom" : "' + nomConcept + '", "id": ' + idConcept + '}'));
        
    },
    /**
     * @return { Number } - Dernier id entré dans l'historique de session
     */
    getLastConceptId: function() {
        var oldHistory = this.sessionHistoriqueToJSON();
        return oldHistory[oldHistory.length-1].id;
    },
    set: function() {
        this.sessionHistoriqueToJSON()
            .forEach(this.addLine);
    },
    /**
     * @param { Object } obj Dernier objet enregistré en Historique de session
     */
    addLine: function(obj) {
        var histLigne = document.createElement('a');
        histLigne.classList.add('historique__ligne');
        histLigne.setAttribute('href', '/Thesaurus/' + obj.id);
        histLigne.textContent = obj.nom;
        historique.content.prepend(histLigne);
        
    }
};

window.addEventListener("DOMContentLoaded", () => {
    historique.set();});