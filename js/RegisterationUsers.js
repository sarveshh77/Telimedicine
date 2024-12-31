// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";

// Your web app's Firebase configuration
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
const db = getFirestore(app);

// Get the form elements
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Handle registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Reference to the specific document
        const userRef = doc(db, 'Users', 'uHWmHT0ffRaizNxLjzjQ');
        
        // Get existing document
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            // If document exists, check for duplicate phone number
            const existingData = userDoc.data();
            const users = existingData.users || [];

            const isPhoneExists = users.some(user => user.phone === phone);
            if (isPhoneExists) {
                alert("A user with this phone number already exists!");
                return;
            }

            // Add new user to the existing array
            users.push({
                name: name,
                email: email,
                phone: phone,
                country: country,
                password: password
            });

            await setDoc(userRef, { users: users });
        } else {
            // If document does not exist, create it with the first user
            await setDoc(userRef, {
                users: [{
                    name: name,
                    email: email,
                    phone: phone,
                    country: country,
                    password: password
                }]
            });
        }

        alert("Registration successful!");
        registerForm.reset();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error during registration. Please try again.");
    }
});
