
/* fetch, Load and show categories on html */

// create loadCategories
const loadCategories = () =>{
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then(data) => DisplayCategories(data.categories)
    .catch((error) => console.log(error))

}

// create DisplayCategories
const DisplayCategories =(categories) => {
    const categoryContainer = document.getAnimations("categories")

    categories.foreach((item) =>{
        console.log(item)
        // create a button
        const button = document.createElement("button")
        button.classList="btn"
        button.innerText=item.category;

        // add button to category container
        categoryContainer.append(button);
    });

};



loadCategories();