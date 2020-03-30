var arborescence = {
    content: document.querySelector('.arborescence'),
    lists: document.querySelectorAll('.arborescence__section:not(:first-child)')
}

arborescence.lists.forEach(list => {
    var listNode = list.previousSibling;

    var btn = document.createElement('button');
    btn.classList.add('arborescence__arrow');
    btn.textContent = '▶';
    listNode.appendChild(btn);

    btn.addEventListener('click', () => {
        console.log(list);
        list.classList.toggle('--active');
        btn.classList.toggle('arborescence__arrow--active');
    });
});
