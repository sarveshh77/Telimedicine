// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
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

// Add event listener for form submission
document.getElementById("doctorForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    // Gather form data
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const specialization = document.getElementById("specialization").value;
    const issuingAuthority = document.getElementById("issuingAuthority").value;
    const licenseNumber = document.getElementById("licenseNumber").value;
    const languages = Array.from(
      document.getElementById("languages").selectedOptions
    ).map((option) => option.value);
    const clinicName = document.getElementById("clinicName").value;
    const country = document.getElementById("country").value;
    const meetlink = document.getElementById("meetlink").value;
    const availabilityDays = Array.from(
      document.querySelectorAll("input[name='days']:checked")
    ).map((input) => input.value);
    const availabilityFromTime = document.getElementById(
      "availabilityFromTime"
    ).value;
    const availabilityToTime = document.getElementById("availabilityToTime").value;
  
    const termsCheckbox = document.getElementById("terms");

  if (!termsCheckbox.checked) {
  alert("You must agree to the terms and conditions before registering.");
  return;
  }
    

    // Prepare the doctor data
    const doctorData = {
      fullName,
      email,
      phoneNumber,
      specialization,
      issuingAuthority,
      licenseNumber,
      languages,
      clinicName,
      country,
      meetlink,
      availability: {
        days: availabilityDays,
        fromTime: availabilityFromTime,
        toTime: availabilityToTime,
      },
    };
  
    try {
      // Generate a unique ID using the full name and a timestamp
      const uniqueId = `${fullName.replace(/\s+/g, "_")}_${Date.now()}`;
  
      // Save the data under specialization-specific categories with the doctor ID as the name
      const specializationDocRef = doc(
        db,
        `DoctorsBySpecialization/${specialization}/Doctors`,
        uniqueId
      );
      await setDoc(specializationDocRef, doctorData);
  
      alert("Doctor registered successfully!");
      document.getElementById("doctorForm").reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("An error occurred while saving the data.");
    }
  });