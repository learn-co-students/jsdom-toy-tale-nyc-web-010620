let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let url = "http://localhost:3000/toys"

  fetch(url)
    .then(resp => resp.json())
    .then(toys => fetchToys(toys)); 

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
//

let toyInputs = document.getElementsByClassName("add-toy-form")[0]

toyInputs.addEventListener("submit", function(e){
  let toyInfo = document.getElementsByClassName("input-text")
  
  fetch(url, { 
    method: "POST",
    
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyInfo[0].value,
      "image": toyInfo[1].value,
      "likes": 0
    })
  })
})


});

function fetchToys(toys){
  let toyWall = document.getElementById("toy-collection")
  
  for (i = 0; i < toys.length; i++){
    let toyPost = document.createElement("div") 

    toyPost.innerHTML = `
      <div class="card">
        <h2>${toys[i]["name"]}</h2>
        <img src=${toys[i]["image"]} class="toy-avatar" />
        <p>${toys[i]["likes"]} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>
    `
    toyPost.dataset.id = toys[i]["id"]

  toyWall.append(toyPost)
  }  
}

function like(toys){
  for (i = 0; i < toys.length; i++){
    const likeBtn = document.getElementsByClassName("like-btn")
    likeBtn.addEventListener('click', function(e){
      
      fetch(url, {
      method: "PATCH", 
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        
        body: JSON.stringify({
          "likes": e.target.likes++
        })
      })
  })
}
}