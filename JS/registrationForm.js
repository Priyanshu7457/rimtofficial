const form = document.getElementById("form");
const studentname = document.getElementById("studentname");
const fathername = document.getElementById("fathername");
const address = document.getElementById("address");
const city = document.getElementById("city/Town");
const pincode = document.getElementById("pincode");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const rollnumber = document.getElementById("rollnumber");
const togglePassword = document.querySelector("#togglePassword");
const togglePassword2 = document.querySelector("#togglePassword2");
const input = document.getElementsByClassName("form-control");
const Load = document.getElementById("load-box");
const Login = document.getElementById("login-box");
const FinalBox = document.getElementById("final-box");

// const FormMethod = new CheckingForm();

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const Small = formControl.querySelector("small");
  Small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const getFieldName = (input) => {
  let a = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return a;
};

const checkValues = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "" || input.value.lenght == 0) {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
};

checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} contains maximum ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

checkEmail = (email) => {
  const check =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (check.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
};

checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Password Cannot Match");
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let a = [
    rollnumber,
    studentname,
    fathername,
    address,
    city,
    pincode,
    email,
    password,
    password2,
  ];
  checkValues(a);

  checkEmail(email);
  checkLength(rollnumber, 12, 12);
  checkLength(studentname, 3, 20);
  checkLength(fathername, 3, 20);
  checkLength(address, 3, 30);
  checkLength(city, 3, 20);
  checkLength(pincode, 6, 6);
  checkLength(password, 6, 15);
  checkPasswordMatch(password, password2);
  // if (input.classList) {
  //     // formSubmit();
  //     console.log('Working')
  // }
  let count = 0;
  let b = Array.from(input);
  console.log(b);
  b.forEach((e) => {
    if (e.classList.contains("success")) {
      console.log("Working");
      count++;
    }
  });
  if (count == 9) {
    saveData();
  }
});

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});

togglePassword2.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type);

  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDjIyB5q2q60gzN2ouidyqR5JlIwaCNG7E",
  authDomain: "rimt-8a070.firebaseapp.com",
  projectId: "rimt-8a070",
  storageBucket: "rimt-8a070.appspot.com",
  messagingSenderId: "987922900956",
  appId: "1:987922900956:web:d11b119f54cf61c7a11119",
  measurementId: "G-L3YX5RZN43",
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const saveData = async () => {
  Loading();
  let found = false;
  setTimeout(async () => {
    await db
      .collection("users")
      .add({
        rollNumber: rollnumber.value,
        studentName: studentname.value,
        fatherName: fathername.value,
        address: address.value,
        city: city.value,
        pincode: pincode.value,
        email: email.value,
        password: password.value,
      })

      .then((ref) => {
        alert(`Registered Succesfully`);
        found = true;
        FinalBox.innerHTML = `UserId:<input disabled id="refInput" value="${ref.id}"/> <button id= "${ref.id}" onclick="CopyData(this.id)"> Copy </button> 
        <br/> Must Copy This Id To Login <br/> Registered Succesfully 
        <br/>
            <a href="studentProfile.html">Login Here</a>`;

      })
      .catch((err) => {
        alert(`Unable to Fetch Data ${err} `);
      });

    if (found) {
      Load.classList.add("hide");
    } else if (!found) {
      alert('Registration Failed');
      FinalBox.innerHTML = `Server Error\nData Cannot Saved`;
    }
  }, 6000);
};

const CopyData = (a) => {
  navigator.clipboard.writeText(a);
  alert("Copied the text: " + a);
};

const Loading = () => {
  Load.classList.remove("hide");
  Load.classList.add("loader");
  Login.classList.add("hide");
};
