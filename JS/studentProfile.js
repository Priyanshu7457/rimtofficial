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

const form = document.getElementById("form");
const Password = document.getElementById("password");
const Student = document.getElementById("student");
const Login = document.getElementById("login-box");
const rollnumber = document.getElementById("rollnumber");
const Load = document.getElementById("load-box");
const button = document.getElementById("button");

const show = () => {
    if (Password.type === "password") {
        Password.type = "text";
    } else {
        Password.type = "password";
    }
};

const Loading = () => {
    Load.classList.remove("hide");
    Load.classList.add("loader");
    Login.classList.add("hide");
};

const readData = () => {
    const UserId = document.getElementById("fetch").value;
    if (UserId != "") {
        Loading();
        setTimeout(() => {
            db.collection("users")
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

                            console.log(a[i]);
                            Student.innerHTML = `<div class="container light-bg">
                                    <div class="contact-details">
                                        <table>
                                            <tr>
                                                <th>UserId-</th>
                                                <td>${a[i].id}

                                            </td >

                                        </tr >
                                            <tr>
                                                <th>Roll No.-</th>
                                                <td>${a[i].rollNumber}</td>
                                            </tr>
                                            <tr>
                                                <th>Name-</th>
                                                <td>${a[i].studentName}</td>
                                            </tr>
                                            <tr>
                                                <th>Father's Name-</th>
                                                <td>${a[i].fatherName}

                                            </td >

                                        </tr >
                                        <tr>
                                                <th>Email-</th>
                                                <td>${a[i].email}

                                            </td >

                                        </tr >
                                        <tr>
                                                <th>Password-</th>
                                                <td>${a[i].password}

                                            </td >

                                        </tr >
                                        <tr>
                                                <th>Address-</th>
                                                <td>${a[i].address}

                                            </td >

                                        </tr >
                                        <tr>
                                                <th>City-</th>
                                                <td>${a[i].city}

                                            </td >

                                        </tr >
                                        <tr>
                                                <th>Pincode-</th>
                                                <td>${a[i].pincode}

                                            </td >

                                        </tr >
                                        <tr>
                                            <th>Update</th>
                                        <td>
                                  <a class="update-student"
                                            href="./update-students.html">Update</a></td>
    </tr>
                                        </table >
                                </div >
                               </div >`;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        alert("Data Cannot Found\nInvalid User Id");
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

    } else {
        alert("Enter The UserId");
    }
    return false;
};