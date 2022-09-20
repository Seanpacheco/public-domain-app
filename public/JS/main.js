
//search bar autocomplete
$(document).ready(function () {
    $('#title').autocomplete({
        source: async function(request,response) {
            let data= await fetch(`http://localhost:3000/searchDb?query=${request.term}`)
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

//modals
const logInModal = document.getElementById('logInModal')
const logInBtn = document.getElementById('log-in-btn')
logInModal.addEventListener('shown.bs.modal', openLogInModal)

logInModal.addEventListener('hide.bs.modal', closeLogInModal)


function openLogInModal() {
    localStorage.setItem('isLogInModalOpen', true);
};

function closeLogInModal() {
    localStorage.setItem('isLogInModalOpen',false);
};

if(localStorage.getItem('isLogInModalOpen') == 'true') {
    logInBtn.click()
}

const signUpModal = document.getElementById('signUpModal')
const signUpBtn = document.getElementById('sign-up-btn')
signUpModal.addEventListener('shown.bs.modal', openSignUpModal)

signUpModal.addEventListener('hide.bs.modal', closeSignUpModal)


function openSignUpModal() {
    localStorage.setItem('isSignUpModalOpen', true);
};

function closeSignUpModal() {
    localStorage.setItem('isSignUpModalOpen',false);
};

if(localStorage.getItem('isSignUpModalOpen') == 'true') {
    signUpBtn.click()
}

//tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


//alerts
const alertList = document.querySelectorAll('.alert')
const alerts = [...alertList].map(element => new bootstrap.Alert(element))
