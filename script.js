const accessKey = "fk1TuUdZ5TZ4i-EEYuLGG37blRqZERZ99wcOZH72kBY"; //To store access key

const formEl = document.querySelector("form"); //To store our form section
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    //  store json conversion into a variable
    const results = data.results;

    //initialize page number
    if (page == 1){
        searchResults.innerHTML = ""
    }else {
        console.error("Element is null. Cannot set 'innerHTML'.");
    }

    //map results variable
    results.map((result) =>{
        //Create all elements for our templates
        //store images inside container
        //push all the data in the html page one tamplate(already prebuild tamplate)
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        //add data inside src and alt (from img-html)
        image.src = result.urls.small;
        image.alt = result.alt_description;
        //create anchor tag ( from ahref html)
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;


        //Append these elements inside our HTML page
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

     //Increase page number
     page++
     //Show more-button
     if(page > 1){
         showMore.style.display = "block";
     }

}

//Create event listeners
formEl.addEventListener("submit", (event) =>{
    event.preventDefault()//prevent the default event
    page = 1; //Initializa the page
    searchImages() //call our searchImages function
})

//Call for showMore function
showMore.addEventListener("click", (event) =>{
    searchImages() //call our searchImages function
})
