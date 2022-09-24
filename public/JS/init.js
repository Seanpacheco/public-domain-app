//tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl).enable())


//alerts
const alertList = document.querySelectorAll('.alert')
const alerts = [...alertList].map(element => new bootstrap.Alert(element))

//toasts
const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl).show())


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
