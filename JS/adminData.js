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
const TableBox = document.getElementById('tr');
const Login = document.getElementById('login-box');
const Load = document.getElementById("load-box");


const Loading = () => {
    // Load.classList.remove('hide');
    Load.classList.add('loader');
    Login.classList.add('hide');
}

const readData = () => {
    Loading();
    let fetchData = false;
    setTimeout(async () => {
        await db.collection("users")
            .get()
            .then((data) => {
                let htmlContent = '';
                data.forEach((doc) => {
                    const userData = doc.data();
                    htmlContent += `
                <tr>
                        <td>${doc.id}</td>
                        <td>${userData.rollNumber}</td>
                        <td>${userData.studentName}</td>
                        <td>${userData.fatherName}</td>
                        <td>${userData.email}</td>
                        <td>${userData.address}</td>
                        <td>${userData.city}</td>                    
                        <td>${userData.pincode}</td>
                        <td>
                         <a href="#" class="delete-student" id="${doc.id}" onclick="deleteData(this.id)">Delete</a>
                        </td>

                        </tr>
                    `;
                    fetchData = true;
                });
                if (fetchData) {
                    Load.classList.add('hide');
                    Login.classList.remove('hide');
                    TableBox.innerHTML += htmlContent;
                } else if (!fetchData) {
                    Load.classList.add('hide');
                    Login.classList.remove('hide');
                    TableBox.innerHTML = "Data Is Not Available";
                }
            })
            .catch((err) => {
                console.error(`Unable to Fetch Data ${err}`);
            });
    }, 2000);
};

function deleteData(id) {

    let a = confirm("Do You Want To Delete This User");

    if (a === true) {
        db.collection("users").doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
}
readData();
