// write your code here


document.addEventListener("DOMContentLoaded", ()=>{
   loadMenu()
   document.getElementById("new-ramen").addEventListener("submit", addRamen)
   
})

const baseUrl = "http://localhost:3000/ramens"

function loadMenu(){
   let menuDiv = document.getElementById("ramen-menu")
   fetch(baseUrl)
   .then (resp => resp.json())
   .then (data => {
      data.forEach(element => {
         let img = document.createElement("img")
         img.src = element.image
         menuDiv.append(img)
         img.addEventListener("click", () => displayDetail(element.id))
      })
   })
}

function displayDetail(id) {
   console.log(`${id} was clicked`)
   fetch(`${baseUrl}/${id}`)
   .then (resp => resp.json())
   .then (data => {
      let detailDiv = document.getElementById("ramen-detail")
      detailDiv.innerHTML =
      `<img class="detail-image" src="${data.image}" alt="${data.name}" />
      <h2 class="name">${data.name}</h2>
      <h3 class="restaurant">${data.restaurant}</h3>`
      
      let rating = document.getElementById("rating-display")
      rating.innerText = data.rating
      let p = rating.parentElement

      let comment = document.getElementById("comment-display")
      comment.innerText = data.comment
   })
}


//add new ramen through new-ramen form
// add to the ramen-menu div
// does not need to persist

function addRamen(){
   event.preventDefault()
   let formInput = document.getElementById("new-ramen")
   // console.log ("sumbitted")
   // console.log(formInput[`new-comment`].value)
   let moreRamen = {
      name: formInput.name.value,
      restaurant: formInput.restaurant.value,
      image: formInput.image.value,
      rating:formInput.rating.value,
      comment: formInput[`new-comment`].value
   }
   let topMenu = document.getElementById("ramen-menu")

   topMenu += moreRamen

   formInput.reset()

   // fetch(`${baseUrl}`, {
   //    method: "POST",
   //    headers:{
   //       "Content-Type": "application/json"
   //    },
   //    body: JSON.stringify(moreRamen)
   // })
   // .then(resp => resp.json())
   // .then(data => loadMenu(data))

   //formInput.reset()
}


{/* <form id="new-ramen">
<h4>Add New Ramen</h4>
<label for="name">Name: </label>
<input type="text" name="name" id="new-name" />
<label for="restaurant">Restaurant: </label>
<input type="text" name="restaurant" id="new-restaurant" />
<label for="image">Image: </label>
<input type="text" name="image" id="new-image" />
<label for="rating">Rating: </label>
<input type="number" name="rating" id="new-rating" />
<label for="new-comment">Comment: </label>
<textarea name="new-comment" id="new-comment"></textarea>
<input type="submit" value="Create" />
</form> */}