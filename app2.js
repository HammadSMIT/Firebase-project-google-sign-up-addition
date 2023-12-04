import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

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
  const provider = new GoogleAuthProvider(app);


// ========= LOGIN WITH GOOGLE ===========

 function google_btn(){
  console.log("aaraha hai")
      signInWithPopup(auth, provider)
           .then((result) => {
             const credential = GoogleAuthProvider.credentialFromResult(result);
             const user = result.user;
             console.log(user);
             window.location = "./todo.html"
     
           }).catch((error) => {
          
             console.log(error)
     
           });
 }

 window.google_btn = google_btn