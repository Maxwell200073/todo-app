function itemTemplate(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}
//Create feature
let createField = document.getElementById("create-field")
document.getElementById("create-form").addEventListener("submit",function(e){
    e.preventDefault()//so browser doesnt do what it normally does    this is the servers res back to browser
    axios.post('/create-item', {text: createField.value}).then(function(response){
        //create the html for a new item             a is where to add html b is html to add   this will access obj w/ new data that server is sending to browser
        document.getElementById("item-list").insertAdjacentHTML("beforeend",itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch(function(){
        console.log("Please try again later")
    })
})

document.addEventListener("click",function(e){
    //delete feature
    if (e.target.classList.contains("delete-me")){
        if (confirm("Are you sure you want to delete?")) {
            axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function(){
                e.target.parentElement.parentElement.remove()
            }).catch(function(){
                console.log("Please try again later")
            })
        }
    }
    
    //update feature
    if (e.target.classList.contains("edit-me")){                                                              //.represents class
        let userInput = prompt("Enter your desired text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)//<-sec isn't need except to prefill box could also e.target.dataset.id
        if (userInput) {
            axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function(){
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function(){
                console.log("Please try again later")
            })
        }
    }
})