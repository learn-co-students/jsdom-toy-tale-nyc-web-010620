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

// function addToys(toys){
//   let newToy = document.createElement("div")
//   let toyWall = document.getElementById("toy-collection")
//   let toyInfo = document.getElementsByClassName("input-text")

//   newToy.innerHTML = `
//     <div class="card">
//       <h2>${toyInfo[0].value}</h2>
//       <img src=${toyInfo[1].value} class="toy-avatar" />
//       <p>0 Likes </p>
//       <button class="like-btn">Like <3</button>
//     </div>
//   `
//   console.log(newToy)
//   console.log(toyWall)
//   console.log(toyInfo)
//   toyWall.append(newToy)
// }

