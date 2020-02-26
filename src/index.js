let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyForm = document.querySelector(".container");
    const BASE_URL = "http://localhost:3000/toys"
    const toyCollection = document.getElementById("toy-collection")

    addBtn.addEventListener("click", () => {
    // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
    });

    fetch(BASE_URL)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      data.forEach(function(toy) {
        return displayToy(toy)
      })
    })

  function displayToy(toy){
    // we want the toys to be displayed in the toy collection section
    // we can first create a card (div) element and append it to the existing toy collection div
    const toyCard = document.createElement("div")
    // const toyCollection = document.getElementById("toy-collection")

    toyCard.className = "card"
    toyCard.dataset.id = toy.id
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `

    toyCollection.append(toyCard)
    }
    
  // now we need to handle a POST request to /toys
  // we have to add an event listener for the submit event
  // when the user submits the form, we want to grab their input and add it to the DOM
  toyForm.addEventListener("submit", function(event) {
    event.preventDefault()
    let name = event.target.name.value //the event target is the form
    let image = event.target.image.value
    // we are only going to send a POST request to /toys when the user submits the form
    // so it makes sense that the fetch request happens inside the submit event listener
    fetch(BASE_URL, { 
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      // in the body, we specify what data we are passing in for the body
      // i.e. how to store the info that gets passed in from the user input
      body: JSON.stringify({
        "name": name,  
        "image": image,  
        "likes": 0
      })
    })
  })

  // now we need to add the functionality of increasing a toy's likes
  // so we need to handle the PATCH request to 'http://localhost:3000/toys/:id'
  // the like button is on the toyCard (it is a child element of the toyCard)
  // since the toyCard is a child of the toyCollection, we can place the event listener on the collection
  toyCollection.addEventListener("click", function(event) {
    event.preventDefault()
    if (event.target.className === 'like-btn') {
      // the event target is the like button, but when the button is clicked, 
      // the thing we want to change is that toy's likes attribute (we want it to increase by 1)
      let likedToyCard = event.target.parentNode
      let likedToyId = likedToyCard.dataset.id
      // console.log(event.target.parentNode)
      let newLikesCount = parseInt(event.target.previousElementSibling.innerText) + 1
      let likesString = `${newLikesCount} Likes`

      fetch(`${BASE_URL}/${likedToyId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify({likes: newLikesCount})
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(data) {
          event.target.previousElementSibling.innerText = `${newLikesCount} likes`;
        })  
      }
  }) //toyCollection event listener closing

}) //DOMLoadedContent closing

