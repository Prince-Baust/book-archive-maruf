document.querySelector('#button-addon2').addEventListener('click', () => {
    let searchText = document.querySelector('#search-input').value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    searchText.value = '';

    fetch(url)
        .then(res => res.json())
        .then(data => loadBooks(data));
});

const loadBooks = (data) => {
    showSearchHit(data);
    showResults(data);
}

const showSearchHit = (data) => {
    document.querySelector('#search-hits').innerText = `${data.numFound} hits`;
}

const showResults = (data) => {
    data.docs.forEach(book => {
        const searchResult = document.querySelector('#search-result');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" id="book-cover" class="card-img-top" alt="Book Cover">
                <div class="card-body">
                    <h4 id="book-title" class="card-title">${book.title}</h4>
                    <h6 id="book-author" class="card-text">by ${book.author_name}</h6>
                    <small id="first-published">First published in ${book.first_publish_year}</small>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}
