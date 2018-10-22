document.addEventListener("DOMContentLoaded", function () {


    const newsEverything = 'https://newsapi.org/v2/everything?';
    const newsHeadlines = 'https://newsapi.org/v2/top-headlines?';

    const bbc = 'sources=bbc-news'

    const newsApiKey = '&apiKey=b0223e247363421fafcc6d77736eff92';

    const searchButton = document.querySelector('#searchButton');
    const searchInput = document.querySelector('#newsSearch');

    const news = {
        async getNews(url) {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            let newsItemsArray = jsonResponse.articles;
    
            console.log(url);
            console.log(newsItemsArray);
            this.displayHeadlines(newsItemsArray);
        },
        displayHeadlines(newsArray){
            const headlineContainer = document.querySelector('#headlines-container');

            newsArray.map((news, index) => {

                let container = document.createElement('div');
                container.className = 'newsElement';

                let anchor = document.createElement('a');
                anchor.setAttribute('href', news.url);
                anchor.setAttribute('title', 'See article');

                let image = document.createElement('img');
                image.setAttribute('src', news.urlToImage);

                let containerText = document.createElement('div');
                containerText.className = 'newTextContent';
                let title = document.createElement('h1');
                title.innerHTML = news.title;


                let timeDateContainer = document.createElement('div');
                timeDateContainer.className = 'timeDateContainer';
                let dateTime = news.publishedAt;
                let dateValue = dateTime.slice(0,10);
                let timeValue = dateTime.slice(11,16);

                let date = document.createElement('p');
                date.innerHTML = dateValue;
                let time = document.createElement('p');
                time.innerHTML = timeValue;

                let description = document.createElement('p');
                description.innerHTML = news.description;

                timeDateContainer.appendChild(date);
                timeDateContainer.appendChild(time);

                //New text wrapper
                containerText.appendChild(timeDateContainer);
                containerText.appendChild(title);
                containerText.appendChild(description);

                //Creating img as link
                anchor.appendChild(image);

                //News wrapper
                container.appendChild(anchor);
                container.appendChild(containerText);

                //Append news items to headline container
                headlineContainer.appendChild(container);
            });
        }
    };

    news.getNews(`${newsHeadlines}${bbc}${newsApiKey}`);

});

