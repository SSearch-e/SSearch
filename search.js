window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);
  var searchQuery = urlParams.get('q');
  var searchQueryArray = searchQuery.split(" ");

  var searchResultsHeading = document.querySelector('h1');
  searchResultsHeading.textContent = 'Search Results for "' + searchQuery + '"';

  fetch('ss/ssearch.json')
    .then(response => response.json())
    .then(data => {
      var searchResultsContainer = document.querySelector('#search-results');
      searchResultsContainer.innerHTML = ''; 

      var matchedWebsites = [];

      data.websites.forEach(function(website) {
        var matchCount = 0;

        searchQueryArray.forEach(function(word) {
          if (website.title.toLowerCase().includes(word.toLowerCase())) {
            matchCount++;
          }
        });

        if (matchCount > 0) {
          matchedWebsites.push({
            website: website,
            matchCount: matchCount
          });
        }
      });

      matchedWebsites.sort((a, b) => b.matchCount - a.matchCount);

      matchedWebsites.forEach(function(match) {
        var searchResultDiv = document.createElement('div');
        searchResultDiv.className = 'search-result';

        var link = document.createElement('a');
        link.href = match.website.link;
        link.id = "link";

        var description = match.website.description.toLowerCase();
        searchQueryArray.forEach(function(word) {
          if (!description.includes(word.toLowerCase())) {
            description = description.replace(new RegExp(word, 'gi'), `<strong>${word}</strong>`);
          }
        });

        link.innerHTML = `
          <div class="result">
            <img class="result-logo" src="${match.website.ico}">
            <div class="result-info">
              <h2 class="result-name">${match.website.title}</h2>
              <p class="result-description">${description}</p>
            </div>
          </div>
        `;

        searchResultDiv.appendChild(link);
        searchResultsContainer.appendChild(searchResultDiv);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
};
