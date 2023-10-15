const Username = document.getElementById("username");
const Password = document.getElementById("password");
const Button = document.getElementById("button");
const Login = document.getElementById("login-box");
const Load = document.getElementById("load-box");
const studentInfo = document.getElementById('student-info');
const StudentBox = document.getElementById('student-detail');
const Body = document.body;
Button.addEventListener('click', (e) => {
  Load.classList.toggle("loader");
  Load.classList.remove("hide");
  Login.classList.add("hide");
  setTimeout(() => {
    if (Username.value == "RIMT" && Password.value == "admin") {
      Change();
      Profile('undefined', 'Admin', 'undefined', './Image/Image.png');
    } else {
      Login.classList.remove("hide");
      Load.classList.add("hide");
      alert("Error");
    }
    Load.classList.toggle("loader");
  }, 3000);
  e.preventDefault();
})

const Profile = (rollno, name, fathersName, image) => {

  studentInfo.innerHTML = `
<div class="container light-bg">
    <div class="contact-details">
    <table>
    <tr>
    <td class="image" colspan='2'>
    <div class="img">
    <center>
      <img src="${image}" alt="" />
    </center>
    </div>
  </td>
    </tr>
    <tr>
      <th>Roll No.-</th>
      <td>${rollno}</td>
    </tr>
    <tr>
      <th>Name-</th>
      <td>${name}</td>
    </tr>
    <tr>
      <th>Father's Name-</th>
      <td>${fathersName}</a>
      </td>
    </tr>
   
  </table>
    </div>
  </div>`;
};


function Change() {
  Body.classList.add('white');
  Login.classList.add("hide");
  Load.classList.add('hide');
  StudentBox.classList.remove('hide');
  StudentBox.style.backgroundColor = 'white';
}


// ShowPassword 
const show = () => {
  if (Password.type === 'password') {
    Password.type = 'text';
  } else {
    Password.type = 'password';
  }
}