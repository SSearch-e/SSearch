document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchbar').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            submitSearch(event);
        }
    });

    function submitSearch(event) {
        event.preventDefault();
        var searchQueryElement = document.getElementById('searchbar');

        if (searchQueryElement) {
            var searchQuery = searchQueryElement.value;
            if (searchQuery.trim() !== '') {
                window.location.href = 'search?q=' + encodeURIComponent(searchQuery);
            }
        }
    }
});

function getRootUrl(urlString) {
    let url = new URL(urlString);
    return `${url.protocol}//${url.host}/`;
}

function ensureHttps(url) {
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    return url;
}

var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
bookmarks.forEach(function (bookmark) {
    document.getElementById('apps-container').innerHTML += `
              <a href="${ensureHttps(bookmark)}" target="_blank">
              <img style="height: 30px !important;" src="${getRootUrl(ensureHttps(bookmark))}/favicon.ico" />
              <div class="label">
                <span style="font-size: x-large;" class="name">${bookmark}</span>
              </div>
            </a>
              `;
});

let displayed = false;

function handleNewsLoad() {
    if (displayed === false) {
        displayed = true
        console.log("Displaying news");
        fetch('/api/news?country=us')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}

const newsLoadTrigger = document.getElementById("newsLoadTrigger");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            handleNewsLoad();
        }
    });
});

observer.observe(newsLoadTrigger);