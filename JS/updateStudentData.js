
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDjIyB5q2q60gzN2ouidyqR5JlIwaCNG7E",
    authDomain: "rimt-8a070.firebaseapp.com",
    projectId: "rimt-8a070",
    storageBucket: "rimt-8a070.appspot.com",
    messagingSenderId: "987922900956",
    appId: "1:987922900956:web:d11b119f54cf61c7a11119",
    measurementId: "G-L3YX5RZN43"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


const FinalBox = document.getElementById('final-box');
const button = document.getElementById('button');
const studentname = document.getElementById('studentname');
const fathername = document.getElementById('fathername');
const address = document.getElementById('address');
const city = document.getElementById('city/Town');
const pincode = document.getElementById('pincode');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const rollnumber = document.getElementById('rollnumber');
const Container = document.getElementById('container-box');
const submitButton = document.getElementById('submit');
const Load = document.getElementById("load-box");
const Login = document.getElementById('login-box');
const togglePassword = document.querySelector('#togglePassword');
const togglePassword2 = document.querySelector('#togglePassword2');


const readData = async () => {
    Login.classList.add('hide');
    // Container.classList.remove('hide');
    const UserId = document.getElementById("fetch").value;
    Loading();
    setTimeout(async () => {

        await db.collection("users")
            .get()
            .then((data) => {
                let a = data.docs.map((item) => {
                    return {
                        ...item.data(),
                        id: item.id,
                    };
                });
                return a;
            })

            .then((a) => {
                let Id;
                let found = false;
                for (let i = 0; i < a.length; i++) {
                    Id = a[i].id;
                    // console.log(Id);
                    if (Id == UserId) {
                        rollnumber.value = a[i].rollNumber;
                        studentname.value = a[i].studentName;
                        fathername.value = a[i].fatherName;
                        address.value = a[i].address;
                        pincode.value = a[i].pincode;
                        city.value = a[i].city;
                        email.value = a[i].email;
                        password.value = a[i].password;
                        password2.value = a[i].password;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    alert("No Data Found");
                    window.location.reload();
                } else if (found) {
                    Load.classList.add('hide');
                    Container.classList.remove('hide');
                }
            })
            .catch((err) => {
                console.error(`Unable to Fetch Data ${err}`);
            });
    }, 2000);


    return false;
};

const Loading = () => {
    Container.classList.add('hide');
    Load.classList.remove('hide');
    Load.classList.add('loader');
}

const updateData = () => {

    Loading();
    setTimeout(async () => {
        const UserId = document.getElementById("fetch").value;
        let found = false;
        await db.collection("users").doc(UserId)
            .update({
                rollNumber: rollnumber.value,
                studentName: studentname.value,
                fatherName: fathername.value,
                address: address.value,
                city: city.value,
                pincode: pincode.value,
                email: email.value,
                password: password.value,
            })
            .then(() => {
                alert(`Data Updated`);
                found = true;
                // prompt("Copy This Id", ref.id);
            })
            .catch((err) => {
                console.error(`Unable to Update Data ${err}`);
            });
        if (!found) {
            alert("Server Errro!\nUnable to Update Data");
            window.location.reload();
        } else if (found) {
            Load.classList.add('hide');
            Container.classList.add('hide');
            FinalBox.innerHTML = `Data Updated Succesfully <br>
    <a href="./studentProfile.html">Login Here</a>`
        }

    }, 2000);
    return false;
};

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

togglePassword2.addEventListener('click', function (e) {
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
button.addEventListener("submit", (e) => {
    readData();
    return false;
})

submitButton.addEventListener("submit", () => {
    updateData();
    return false;
})