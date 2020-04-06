var notice = {
    inputType: document.querySelector('#concept-type'),
    inputDescription: document.querySelector('#concept-description'),
    // setType: function (text) {
        
    // },
    setDescription: function (text) {
        this.inputDescription.textContent = text;
    },
    traitement: function (obj) {
        // this.setType(obj.type);
        this.setDescription(obj.description);
    },
    canEdit: function(bool) {
        bool = !bool; // inversion
        this.inputType.disabled = bool;
        this.inputDescription.readOnly = bool;
    }
}