
/* fetch, Load and show categories on html */

// create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories))
    .catch((error) => console.log(error))

}
/* {
    "petId": 3,
    "category": "Rabbit",
    "date_of_birth": "2022-04-20",
    "price": 1500,
    "image": "https://i.ibb.co.com/s3PXSwD/pet-3.jpg",
    "gender": "Male",
    "pet_details": "This male African Grey rabbit is a small, friendly companion born on April 20, 2022. He prefers a calm environment and enjoys gentle handling. Partially vaccinated, he's a great choice for rabbit lovers who want a peaceful, easygoing pet. Priced at $1500, he's perfect for a quiet home environment.",
    "vaccinated_status": "Partially",
    "pet_name": "Coco"


    {
    "petId": 17,
    "breed": "Maine Coon",
    "category": "Cat",
    "date_of_birth": "2022-12-01",
    "price": 1200,
    "image": "https://i.ibb.co.com/85w4kSt/pet-17.jpg",
    "gender": "Male",
    "pet_details": "This majestic male Maine Coon, born on December 1, 2022, is known for his gentle demeanor and friendly personality. Fully vaccinated and priced at $1200, he's great with families and other pets.",
    "vaccinated_status": "Fully",
    "pet_name": "Thor"
}
} */



// create loadCard
const loadCard = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => DisplayCard(data.pets))
    .catch((error) => console.log(error))

}
// create DisplayCard
const DisplayCard = (pets) => {
  const CardContainer = document.getElementById("card");
  pets.forEach((pets) => {
    console.log(pets);
    const cards = document.createElement("div");
    cards.classList = "card gap-4 shadow-md py-3 px-3 "
    cards.innerHTML = `
         <figure class="h-[200px]">
    <img
      src=${pets.image}
      class="h-full w-full object-cover rounded-md"
      alt="Shoes" />
  </figure>
  <div class="card-body ">
    <div class="text-gray-700 border-b">
    <h1 class="font-bold text-xl mt-4 mb-1">${pets.pet_name}</h1>
    <div class="flex flex-row gap-1 items-center">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=24&id=115909&format=png" />
      <h3>Breed: ${pets.breed}</h3>
    </div>
     <div class="flex flex-row gap-1 items-center ">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=50&id=60611&format=png" />
      <h3>Birth: ${pets.date_of_birth}</h3>
    </div>
     <div class="flex flex-row gap-1 items-center">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=80&id=70834&format=png" />
      <h3>Gender: ${pets.gender}</h3>
    </div>
     <div class="flex flex-row gap-1 items-center mb-3">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=50&id=7163&format=png" />
      <h3>Price: ${pets.price}</h3>
    </div>
    </div
    <div class="card-actions justify-end">
      <button>Adopt</button>
      <button class="btn btn-primary">Details</button>
    </div>
  </div>
        `;
    CardContainer.append(cards)
  })

}


// create DisplayCategories
const DisplayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories")

  categories.forEach((item) => {
    console.log(item)
    // create a button
    const button = document.createElement("button")
    button.classList = "btn flex gap-3 bg-gray-100 item-center text-black p-5 w-auto  font-bold rounded-lg "



    // add icon image
    const icon = document.createElement("img");
    icon.src = item.category_icon; // ✅ use category_icon from API
    // icon.alt = item.category;
    icon.classList = "w-6 h-6"; // adjust size as needed

    // add text
    const text = document.createElement("span");
    text.innerText = item.category;

    // combine icon + text inside button
    button.append(icon, text);



    // add button to category container
    categoryContainer.append(button);
  });

};



loadCategories();
loadCard();