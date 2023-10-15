const Password = document.getElementById("password");
let messageBox = document.getElementById('message-box');
const togglePassword = document.querySelector('#togglePassword');
let adminId = document.getElementById('adminId');
const Login = document.getElementById('login-box');
const Load = document.getElementById("load-box");
const html = document.getElementsByTagName('html');
togglePassword.addEventListener('click', function (e) {
    const type = Password.getAttribute('type') === 'password' ? 'text' : 'password';
    Password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
const loginAdmin = () => {
    location.href = './adminData.html';
}

const start = () => {
    if (adminId.value == 'rimtinstituteofficial' && Password.value == 'officialmjpru@rimt#1234&') {
        setTimeout(() => {
            loginAdmin();
        }, 5000);
        Loading();

    }
    else {
        messageBox.innerHTML = "Invalid Admin Id And Password";
        adminId.style.border = '1px solid red';
        Password.style.border = '1px solid red';
        setTimeout(() => {
            messageBox.innerHTML = "";
        }, 2000);
    }


    return false;
}

const Loading = () => {
    Load.classList.remove('hide');
    Load.classList.add('loader');
    Login.classList.add('hide');
}