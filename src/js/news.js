document.addEventListener("DOMContentLoaded", function () {

    const newsEverything = 'https://newsapi.org/v2/everything?';
    const newsHeadlines = 'https://newsapi.org/v2/top-headlines?';

    const newsSourcePrefix = 'sources=';
    const newsSourcePostfix = 'bbc-news';
    const newsApiKey = '&apiKey=b0223e247363421fafcc6d77736eff92';

    const newsDropDown = document.querySelector('#newsSourceSelection');
    newsDropDown.onchange = function () {
        sportNews.getNews(`${newsEverything}${newsSourcePrefix}${sportNews.dropDownListener()}${newsApiKey}`, '#listNews');
        sportNews.clearNewsSection('#listNews');
        document.querySelector('#listNews').innerHTML = '';
    }


    function NewsType() {}
    NewsType.prototype.dropDownListener = function(){
        let value = document.querySelector('#newsSourceSelection');
        let valueOption = value.options[value.selectedIndex].getAttribute('data-src');
        console.log(valueOption);

        return valueOption;
    }
    NewsType.prototype.clearNewsSection = function(elementName){
        document.querySelector(`${elementName}`).innerHTML = '';
    }

    NewsType.prototype.getNews = async function(url, where){
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            let newsItemsArray = jsonResponse.articles;
            this.displayNews(newsItemsArray, where);
            console.log(url);
        } catch (error) {
            console.log(error);
        }
    }

    NewsType.prototype.displayNews = function (newsArray, where) {
        const newsContainer = document.querySelector(where);

        newsArray.map((news, index) => {

            // 1
            let container = document.createElement('div');
            container.className = 'newsElement';
            // container.style.backgroundImage(`url("${news.urlToImage})"`);
            newsContainer.appendChild(container);

            // 2
            let image = document.createElement('img');
            if (news.urlToImage == null) {
                image.setAttribute('src', 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&h=350');
            } else {
                image.setAttribute('src', news.urlToImage);
            }
            container.appendChild(image);

            // 3
            let anchor = document.createElement('a');
            anchor.setAttribute('href', news.url);
            anchor.setAttribute('title', 'Read article');
            anchor.setAttribute('target', '_blank');
            container.appendChild(anchor);

            // 4
            let overlay = document.createElement('div');
            overlay.className = 'overlay';
            anchor.appendChild(overlay);

            // 5
            let contentContainer = document.createElement('div');
            contentContainer.className = 'contentContainer';
            overlay.appendChild(contentContainer);

            let title = document.createElement('h1');
            title.innerHTML = news.title;
            contentContainer.appendChild(title);

            let description = document.createElement('p');
            description.innerHTML = news.description;
            contentContainer.appendChild(description);

            let timeDateContainer = document.createElement('div');
            timeDateContainer.className = 'timeDateContainer';
            let dateTime = news.publishedAt;
            let dateValue = dateTime.slice(0, 10);
            let timeValue = dateTime.slice(11, 16);

            let date = document.createElement('p');
            date.innerHTML = dateValue;
            let time = document.createElement('p');
            time.innerHTML = timeValue;
        });
    }

    const headlineNews = new NewsType('headline');
    headlineNews.getNews(`${newsHeadlines}${newsSourcePrefix}${newsSourcePostfix}${newsApiKey}`, '#headlines-container');

    const sportNews = new NewsType('sport');
    sportNews.getNews(`${newsEverything}${newsSourcePrefix}${newsSourcePostfix}${newsApiKey}`, '#listNews');

});