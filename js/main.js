const scrollToCards = () => {
  const container = document.querySelector(".scroll-div"); 
  container.scrollIntoView({ behavior: "smooth" });
};

/* fetch, Load and show categories on html */

// create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories))
    .catch((error) => console.log(error))

}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn")
  console.log(buttons)
  for (let btn of buttons) {
    btn.classList.remove("bg-[#0E7A81]");
  }
}
/* 
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

// Load categories by ID
const loadCategoriesCard = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {

      removeActiveClass();
      // change color
      const activeBtn = document.getElementById(`btn-${id}`);
      if (activeBtn) {
        activeBtn.classList.add("bg-[#0E7A81]");
      }



      // close



      DisplayCard(data.data || data.category || []);
    })
    .catch((error) => console.log("Error loading category:", error));
};


// Load details
const loadDetails = async (petId) => {
  console.log("Pet ID:", petId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();

  displayDetails(data.petData); 
};

// loadLike
const loadLike = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => displayLike(data.petData)) 
    .catch((error) => console.log(error));
};

// displayLike
const displayLike = (pet) => {
  const likeContainer = document.getElementById("sideBar");

  

  const like = document.createElement("div");
  like.classList = "card bg-base-100 px-2 py-2 mb-3";
  like.innerHTML = `
    <figure class="w-full aspect-square">
      <img src="${pet.image}"  class="rounded-md object-cover h-full w-full" />
    </figure>
  `;
  likeContainer.append(like);
};





// Display details in modal
const displayDetails = (pet) => {
  console.log(pet);

  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
    <figure class="h-[390px] w-[600px] px-4 py-5">
      <img
        src="${pet.image}"
        class="h-full w-full object-cover rounded-md"
        alt="${pet.pet_name}"
      />
    </figure>

    <div class="card-body  px-5 py-5">
      <div class="text-gray-700 border-b pb-3">
        <h1 class="font-bold text-xl mt-4 mb-1">${pet.pet_name}</h1>

        <div class="flex justify-between">
        <div class="flex flex-row gap-1 items-center">
          <img class="w-5 h-5" src="https://img.icons8.com/?size=24&id=115909&format=png" />
          <h3>Breed: ${pet.breed}</h3>
        </div>
         <div class="flex flex-row gap-1 items-center">
          <img class="w-5 h-5" src="https://img.icons8.com/?size=80&id=70834&format=png" />
          <h3>Gender: ${pet.gender}</h3>
        </div>
        </div>

        <div class="flex justify-between">
         <div class="flex flex-row gap-1 items-center">
          <img class="w-5 h-5" src="https://img.icons8.com/?size=50&id=60611&format=png" />
          <h3>Birth: ${pet.date_of_birth}</h3>
        </div>

        <div class="flex flex-row gap-1 items-center ">
          <img class="w-5 h-5" src="https://img.icons8.com/?size=50&id=7163&format=png" />
          <h3>Price: ${pet.price}</h3>
        </div>

        </div>

       
        <div class="flex flex-row gap-1 items-center mb-3">
          <img class="w-5 h-5 " src="https://img.icons8.com/?size=80&id=HIcu7xch7cTZ&format=png" />
          <h3>vaccinated_status: ${pet.vaccinated_status}</h3>
        </div>
      </div>

      <div class=" flex flex-col  mt-3   gap-3">
      <h1 class="mb-2 font-bold">Details Information</h1>
      <p class="text-gray-700">It is a long established fact that a reader will be distracted by the readable content <br> of a page when looking at its layout. 
      
      <br>The point of using is that it has a more-or-less normal distribution of letters, as <br> opposed to using. </h1>
       
      </div>
    </div>
  `;

  // Show the modal
  document.getElementById("my_modal_1").showModal();
};











// create DisplayCard
const DisplayCard = (pets) => {
  const CardContainer = document.getElementById("card");
  CardContainer.innerHTML = "";

  if (pets.length === 0) {
    CardContainer.classList.remove("grid");
    CardContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
      <img src="images/error.webp" />
      <h2 class="font-bold text-gray-900 text-2xl ">No Information Available</h2>
      <p class="text-center text-gray-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>

    </div>
    
    `
    return;
  }
  else {
    CardContainer.classList.add("grid")
  }




  pets.forEach((pet) => {
    // console.log(pet);
    const card = document.createElement("div");
    card.classList = "card gap-4 shadow-md py-3 px-3 rounded-xl border";

    card.innerHTML = `
      <figure class="h-[200px]">
        <img
          src="${pet.image}"
          class="h-full w-full object-cover rounded-md"
          alt="${pet.pet_name}"
        />
      </figure>

      <div class="card-body">
        <div class="text-gray-700 border-b pb-3">
          <h1 class="font-bold text-xl mt-4 mb-1">${pet.pet_name}</h1>

          <div class="flex flex-row gap-1 items-center">
            <img class="w-5 h-5" src="https://img.icons8.com/?size=24&id=115909&format=png" />
            <h3>Breed: ${pet.breed}</h3>
          </div>

          <div class="flex flex-row gap-1 items-center">
            <img class="w-5 h-5" src="https://img.icons8.com/?size=50&id=60611&format=png" />
            <h3>Birth: ${pet.date_of_birth}</h3>
          </div>

          <div class="flex flex-row gap-1 items-center">
            <img class="w-5 h-5" src="https://img.icons8.com/?size=80&id=70834&format=png" />
            <h3>Gender: ${pet.gender}</h3>
          </div>

          <div class="flex flex-row gap-1 items-center mb-3">
            <img class="w-5 h-5" src="https://img.icons8.com/?size=50&id=7163&format=png" />
            <h3>Price: ${pet.price}</h3>
          </div>
        </div>

         <div class="card-actions justify-end mt-3 flex items-center gap-3">
          <button onclick="loadLike('${pet.petId}')" class="p-3 bg-gray-100 rounded-lg">
           <img class="w-5 h-5" src="https://img.icons8.com/?size=24&id=82788&format=png" />
          </button>

          <button class="px-4 py-2 bg-gray-100 font-bold text-[rgba(14,122,129,1)] border rounded-lg">Adopt</button>
          <button onclick="loadDetails('${pet.petId}')" class="px-4 py-2 font-bold bg-gray-100 text-[rgba(14,122,129,1)] border rounded-lg">Details</button>
        </div>

       
      </div>
    `;

    CardContainer.append(card);
  });
};



// Display categories
const DisplayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categoryContainer.innerHTML = ""; // Clear previous buttons

  categories.forEach((item) => {
    console.log(item);

    // Create button element
    const button = document.createElement("button");
    button.classList =
      "flex items-center gap-3 bg-gray-100 text-black p-3 font-bold rounded-lg hover:bg-gray-200 transition category-btn";
    button.onclick = () => loadCategoriesCard(item.category);
    button.id = `btn-${item.category}`;

    // Icon inside button
    const icon = document.createElement("img");
    icon.src = item.category_icon;
    icon.alt = item.category;
    icon.classList = "w-6 h-6";

    // Category text
    const text = document.createElement("span");
    text.innerText = item.category;

    // Combine icon + text
    button.append(icon, text);

    // Append to container
    categoryContainer.append(button);
  });
};













loadCategories();
loadCard();