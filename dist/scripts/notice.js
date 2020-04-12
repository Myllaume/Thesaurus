var notice = {
    inputDescription: document.querySelector('#concept-description'),
    setDescription: function (text) {
        this.inputDescription.value = text;
    },
    traitement: function (obj) {
        this.setDescription(obj.description);
    },
    canEdit: function(bool) {
        bool = !bool; // inversion
        this.inputDescription.readOnly = bool;
    }
}

notice.inputDescription.addEventListener('focus', () => {
    sauvegardeAuto(notice.inputDescription, 'description'); });