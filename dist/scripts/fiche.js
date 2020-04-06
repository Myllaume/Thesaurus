document.querySelector('#input-upload').addEventListener('input', (e) => {
    e.preventDefault();
    var formData = new FormData(document.querySelector('#form-upload'));

    $.ajax({
        url: '/Thesaurus/core/controllers/upload.php?id=' + sessionStorage.getItem('concept'),
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (json) {
            terminal.open(json.consolMsg);
            if (json.isOk) {
                notice.setDocument(json.data);
            }
        }
    });
});