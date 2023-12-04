

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyBVYYv_rwXY_LnQROK7WMZ-T53VM1KdopI",
    authDomain: "project-2-4c60f.firebaseapp.com",
    projectId: "project-2-4c60f",
    storageBucket: "project-2-4c60f.appspot.com",
    messagingSenderId: "262871930056",
    appId: "1:262871930056:web:1a995e7f96fc0bef4bc1fd",
    measurementId: "G-B8N6BFQB0M"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const ids = []  



// ======== TODO =========

async function AddTodo() {

    let Getinp = document.querySelector("#GetInp");
    // Getinp.value = '';
    const docRef = await addDoc(collection(db, "todos"), {
        Task: Getinp.value,
        Time: new Date().toLocaleString(),
    });
    Getinp.value = '';


    console.log("Document written with ID: ", docRef.id);


}





function getData() {
    let ul = document.querySelector("#getul");

    if(ul){

    
    onSnapshot(collection(db, 'todos'), (data) => {
        data.docChanges().forEach((newData) => {

            ids.push(newData.doc.id)

            if (newData.type == 'removed') {

                let del = document.getElementById(newData.doc.id)
                del.remove()

            }
            else if (newData.type == 'added'){
                ul.innerHTML += `
                <li id=${newData.doc.id}>${newData.doc.data().Task} <br> ${newData.doc.data().Time} <br><button onclick="delTodo('${newData.doc.id}')" >Delete</button> <button  onclick="editTodo(this,'${newData.doc.id}')" >Edit</button> <br><br> </li>
                `
                console.log(newData.doc.data())

            }
         

        })
    })

}

}

getData();

async function delTodo(id) {
    await deleteDoc(doc(db, "todos", id));
}


async function editTodo(e,id) {

    var editVal = prompt("Enter Edit Value");
    e.parentNode.firstChild.nodeValue = editVal;
    // console.log(e); 

    await updateDoc(doc(db, "todos", id), {
        Task: editVal,
        Time: new Date().toLocaleString(),

    });

}


async function DelAll(){
    
    var list = document.getElementById("getul");
    list.innerHTML = "";
    // console.log(ids)
    for(var i = 0 ; i < ids.length ; i++ ){
        await deleteDoc(doc(db, "todos", ids[i]));
    }



}



// ====== Authentication ======

let btn = document.querySelector("#Sbtn")

if(btn){
   btn.addEventListener("click", () => {

       let getemail = document.querySelector("#Semail")
       let getpass = document.querySelector("#Spass")
   
       createUserWithEmailAndPassword(auth, getemail.value, getpass.value)
           .then(async(userCredential) => {
               const user = userCredential.user.email;
               console.log(user)
               localStorage.setItem("Email", getemail.value)
               localStorage.setItem("Password", getpass.value)
   
               try {
                   const docRef = await addDoc(collection(db, "users"), {
                       first: getemail.value,
                       last: getpass.value,
                   
                   });
                   console.log("Document written with ID: ", docRef.id);

                   
                  
               
               
                   location.href = "./signin.html"
   
               } catch (e) {
                   console.error("Error adding document: ", e);
               }
   
   
           })
           .catch((error) => {
               const errorCode = error.code;
               const errorMessage = error.message;
               console.log(error)
           });
   
   })
   
}
   


// ============== SIGN IN =================

let btn1 = document.querySelector("#Lbtn")

if(btn1){
   btn1.addEventListener("click" , () =>{

       let getemail = document.querySelector("#Lemail")
       let getpass  = document.querySelector("#Lpass")
   
   signInWithEmailAndPassword(auth, getemail.value , getpass.value)
     .then((userCredential) => {
       const user = userCredential.user.email;
       console.log(user)
       location.href = "./todo.html"
   
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log(error)
     })
   })
   
}




// ========= WINDOW ===========


window.AddTodo = AddTodo
window.getData = getData
window.delTodo = delTodo
window.editTodo = editTodo
window. DelAll =  DelAll



// ============ Form ================
var allUsers = []
var users = localStorage.getItem("Users")
if (users !== null) {
   allUsers = JSON.parse(users)
}




function signup() {
   var email = document.getElementById("Semail")
   var password = document.getElementById("Spass")

   var obj = {

       email: email.value,

       password: password.value,
   }
   allUsers.push(obj)
   localStorage.setItem('Users', JSON.stringify(allUsers))

if( email.value == '' || password.value  == ''){
  
   alert ("Oops Try Again")  ;

}

else{
location.href = './signin.html'
}

}



function signin() {
   var email = document.getElementById("Lemail").value
   var password = document.getElementById("Lpass").value
   var filterusers = allUsers.filter(function (data) {
       return data.email === email && data.password === password


   })

   
   
    if(email == '' || password == '' ){
     alert("Oops Try Again")  
   }
   else if (filterusers.length){
        Swal.fire({
           icon: 'success',
           title: '<h3 style="color: #00AD96 ">Great! You are now Sign up. Click OK to proceed.</h3>',
           confirmButtonColor: "#00AD96",
           // iconColor: '#00AD96',
       }).then(() => {
           if (true) {
               location.href = './todo.html';
           }
       })
       

   }


   else {

       alert('Sorry user not found')

       location.href = ("./index.html")
   }



}



// // ========== Windows ===========

window.signin = signin
window.signup = signup

// =============== logout =================

let logoutbtn = document.querySelector("#LObtn")
if (logoutbtn){
logoutbtn.addEventListener("click", () => {
   localStorage.clear()
   location.href = "./index.html"
})
}
