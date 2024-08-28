const accessKey = "VwEayrn2cIEqic7wRSrll4L0YcQgoz_ksQXZyhvqvcQ"

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page===1){
        searchResult.innerHTML ="";
    }

    const results = data.results;

    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = "block"; //to actually display the show more button//
}

searchForm.addEventListener("submit" , (e) =>{
    e.preventDefault();
    page = 1;
    searchImages(); //prevent default behaviour//
})

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages(); //to load the results from 2nd page , 3rd page and so on when you click show more button//

})