window.onload = function() {
      var urlParams = new URLSearchParams(window.location.search);
      var searchQuery = urlParams.get('q');

      var searchResultsHeading = document.querySelector('h1');
      searchResultsHeading.textContent = 'Search Results for "' + searchQuery + '"';

      fetch('ss/ssearch.json')
        .then(response => response.json())
        .then(data => {
          var searchResultsContainer = document.querySelector('#search-results');
          searchResultsContainer.innerHTML = ''; 

          data.websites.forEach(function(website) {
            if (website.title.toLowerCase().includes(searchQuery.toLowerCase())) {
              var searchResultDiv = document.createElement('div');
              searchResultDiv.className = 'search-result';

              var link = document.createElement('a');
              link.href = website.link;
link.id="link";
              link.innerHTML = `
              <div class="result">
        <img class="result-logo" src="${website.ico}">
        <div class="result-info">
          <h2 class="result-name">${website.title}</h2>
          <p class="result-description">${website.description}</p>
        </div>
      </div>
              `;

              searchResultDiv.appendChild(link);

              searchResultsContainer.appendChild(searchResultDiv);
            }
          });
        })
        .catch(error => {
          console.log('Error:', error);
        });
    };
