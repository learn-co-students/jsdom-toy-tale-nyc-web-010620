let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  let toyCollection = document.querySelector('#toy-collection')
  let BASE_URL = 'http://localhost:3000/toys'

  addBtn.addEventListener("click", (event) => {
    event.preventDefault()
    console.log('hello');
    
    // event.preventDefault()

    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }

    fetch(BASE_URL, {
      method: 'POST',
      header: {
        "content-type": "application/json",
        accept: "application/json"
      },
      // body: 
      //JSON.stringify() -> Converts JS String data into JSON
      //

    })
    


  });

  fetch(BASE_URL)
  .then(resp => resp.json())
  .then(data => { 
    
    data.forEach(toy => renderToy(toy))
    
  })  
 
  let renderToy = toy => {
    const div = document.createElement('div')
    div.className = 'card'
    div.dataset.id = toy.id 
    
    div.innerHTML = `
      <h2>${toy.name}</h2>
      <img height='200px' width='200px' src='${toy.image}'/>
      <p>${toy.likes}</p>
      <button class='like-btn'>Like <3</button>
    `
    toyCollection.appendChild(div)
  }



});
