// https://covers.openlibrary.org/b/id/554106-M.jpg
// https://covers.openlibrary.org/b/id/{cover_i}-M.jpg
document.querySelector('#button-addon2').addEventListener('click', function () {
    let searchText = document.querySelector('#search-input').value;

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    searchText.value = '';

    fetch(url)
        .then(res => res.json())
        .then(data => loadBooks(data));
});

const loadBooks = (data) => {
    console.log(data)
    showSearchHit(data);
}

const showSearchHit = (data) => {
    document.querySelector('#search-hits').innerText = `${data.numFound} hits`;
}
