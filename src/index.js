let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch Andy's Toys
  // On the index.html page, there is a div with the id "toy-collection."
  
  // When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
  
  // when page loads -> DOM event listener 
  //  GET request 
  //  save to DOM -> create element, object, and append to div 
    
    function getAllToys() {
    return fetch ("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyArray => {
      // console.log(toyArray)
      renderAllToys(toyArray)
    })
  }

  getAllToys()
     
//  to create one toy 
 function createOneToy(toyObj) {
    const toyCollection = document.querySelector("#toy-collection")
    const card = document.createElement("div") 
    card.className = "card"
    card.dataset.id = toyObj.id

    card.innerHTML= `
    <h2 class="name">${toyObj.name}</h2>
    <div class="image">
    <img class="toy-avatar" src="${toyObj.image}" >
    </div>
    <p class="likes">${toyObj.likes}</p>
    <button class="like-btn">Like <3</button>
    `

    toyCollection.append(card)
  }

  // to create all toys 
  function renderAllToys(toyData) {
    // .forEach takes a callback function (function definition/reference); renderOneAnimal is a function reference
    toyData.forEach(createOneToy)
  }
 

//   Add a New Toy
// When a user submits the toy form, a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
// The toy should conditionally render to the page.
// In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.


 const toyForm= document.querySelector("form.add-toy-form")

  toyForm.addEventListener("submit",addToy)

  function addToy(event) {
  event.preventDefault()

  const toyObj = {
  name: event.target.name.value,
  image: event.target.image.value,
  likes: 0 
  }

    return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: 
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(toyObj)
})
  .then(response => response.json())
  .then(newtoyObj => {createOneToy(newtoyObj)
  })
  // event.target.reset() // check why this not working 
}

// Increase Toy's Likes
// When a user clicks on a toy's like button, two things should happen:

// Conditional increase to the toy's like count without reloading the page
// A patch request sent to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
// Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)


toyCollection = document.querySelector("#toy-collection")
toyCollection.addEventListener('click',toyLikes)

function toyLikes(event) {
  // console.log (event.target)
  if (event.target.matches('.like-btn')){
    console.log(event.target)
    let button = event.target 
    let card = button.closest(".card")
    let id = card.dataset.id
    const idNumber = parseInt('id')
    const likes = card.querySelector(".likes")
    numLikes = parseInt(likes.textContent) + 1

    

    return fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: numLikes
    })
  })
    .then(response => response.json())
      .then(updatedToy => {
        console.log('Success:', updatedToy);
        likes.textContent = updatedToy.likes
  })
}
}


});
