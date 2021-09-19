document.querySelector('#button-addon2').addEventListener('click', () => {
    let searchText = document.querySelector('#search-input').value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    document.querySelector('#search-input').value = '';  //clearing search field
    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => loadBooks(data));
});

const loadBooks = (data) => {
    showSearchHit(data);         // show total search hits
    showResults(data);           // show search results
}

const showSearchHit = (data) => {
    if (data.numFound >= 1) {    // checking if no results found
        document.querySelector('#search-hits').innerText = `${data.numFound} hits`;
        document.querySelector('#search-hits').classList.add('text-success');
    } else {
        document.querySelector('#search-hits').innerText = `No Result Found!!!`;
        document.querySelector('#search-hits').classList.add('text-danger');
    }

}

const showResults = (data) => {
    data.docs.forEach(book => {
        let authorName = book.author_name;
        let publishYear = book.first_publish_year;
        const publisher = book.publisher;

        if (!authorName)                        //validate undefined author
            authorName = 'Unknown writer';
        if (!publishYear)
            publishYear = 'Unknown year'        //validate undefined publish year

        const searchResult = document.querySelector('#search-result');  // container for div

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" id="book-cover" class="card-img-top" alt="Book Cover">
                <div class="card-body">
                    <h4 class="card-title">${book.title}</h4>
                    <h6 class="card-text">by ${authorName}</h6>
                    <h6 class="card-text">Published by ${publisher}</h6>
                    <small>First published in ${publishYear}</small>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
}
