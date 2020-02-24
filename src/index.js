
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyForm = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
    // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyForm.style.display = "block";
      } else {
        toyForm.style.display = "none";
      }
    });


    const BASE_URL = 'http://localhost:3000/toys'
      fetch(BASE_URL)
      .then (resp=> resp.json())
      .then (toys => {toys.forEach(handleToys) 
    });


    function handleToys(toy){
      // create a function handleToys
      // locate id under what is the toy created
      // in each iteration to create a new div
      // assign an id to a new toy, by dataset
      //create a new div using the inner`html
      //append a div
  
      const divToy = document.createElement('div')
      let div = document.getElementById('toy-collection')
      let likeButton = document.querySelector(".like-btn")
      //  toyItem = toy.id
      //  divToy.dataset.id = toyItem.id
    
      divToy.innerHTML = 
      `<div class="card">
      <h2>"${toy.name}"</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>"${toy.likes}" Likes </p>
      <button class="like-btn">Like <3</button>
      </div>`
      div.append(divToy)
      divToy.dataset.id = toy.id
    }
    

  //sends a post request - give the fetch second argument
  //the new toy is added to collection of toys
  //should conditionally render the to page
  //append a new toy to the div

  document.addEventListener('submit', function(event){
    
    event.preventDefault()
   let newName = document.querySelector("input[name='name']").value
   let newImage= document.querySelector("input[name='image']").value
   let newLikes = 0
   newToy = { name: newName, image:newImage, likes: newLikes}
   handleToys(newToy)
    fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
        name: newName, 
        image:newImage, 
        likes: newLikes
      })
  
    })
  })

    const toyCol = document.querySelector('#toy-collection')
    toyCol.addEventListener("click", function(event){
    // console.log("click")
    if (event.target.className === 'like-btn'){

      let cardDiv = event.target.parentNode

      let likesText = cardDiv.children[2].innerText
      let likesNumber = parseFloat(likesText.split('"')[1])
      // debugger
      newNumber = likesNumber+1
      event.target.parentNode.children[2].innerText = `"${newNumber}" Likes`
      console.log(newNumber)

      // divToy = document.createElement('div')
      // debugger
      let idNumber = event.target.parentNode.parentNode.dataset.id

      let body = {likes: newNumber}

      fetch(`${BASE_URL}/${idNumber}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify(body)
      })
      
    }
  
 })

})
//end of Document Loaded

