
//search bar autocomplete
$(document).ready(function () {
    $('#title').autocomplete({
        source: async function(request,response) {
            let data= await fetch(`http://localhost:3000/search?query=${request.term}`)
                    .then(results => results.json())
                    .then(results => results.map(result => {
                        return {
                            label: result.title,
                            value: result.title,
                            id: result._id
                        }
                    }))
                response(data)
                //console.log(response)
        },
        minLength: 2,
        select: function(event, ui) {
            console.log(ui.item.id)
            // fetch(`http://localhost:3000/get/${ui.item.id}`)
            //     .then(results => results.json())
                window.location.assign(`/plays/${ui.item.id}`)

        }
    })
})

// toggle mobile menu

const toggle = document.querySelector('.toggle')
const menu = document.querySelector('.menu')
 
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active")
        //adds menu icon
        toggle.querySelector("a").innerHTML = "<i class ='fas fa-bars'></i>"
    }else {
        menu.classList.add("active")
        //adds close icon
        toggle.querySelector("a").innerHTML = "<i class ='fas fa-times'></i>"
    }
}

//event listener
toggle.addEventListener("click", toggleMenu, false)