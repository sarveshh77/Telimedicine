// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, collection, setDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0ncA7or5DGpfMj3bxYpz7pAmNDhJy9aM",
  authDomain: "bookmydoc-7b3d1.firebaseapp.com",
  projectId: "bookmydoc-7b3d1",
  storageBucket: "bookmydoc-7b3d1.firebasestorage.app",
  messagingSenderId: "182899610658",
  appId: "1:182899610658:web:105b642d77c7a4b1fb267b",
  measurementId: "G-NBX1LDNMV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

/*document.getElementById("doctorForm").addEventListener("submit", async (event) => {



    event.preventDefault();

    const formData = {
        fullName: document.getElementById("fullName").value,
    };
    const specialization = document.getElementById("specialization").value;

    try {
        const specializationDocRef = doc(db, "Doctors", specialization);
        const doctorCollectionRef = collection(specializationDocRef, "data");
        await setDoc(doc(doctorCollectionRef), formData);

        alert("Doctor added successfully!");
        document.getElementById("doctorForm").reset();
    } catch (error) {
        console.error("Error saving data:", error);
        alert("Error submitting form. Check console for details.");
    }
});*/

console.log("Firebase initialized successfully!");
