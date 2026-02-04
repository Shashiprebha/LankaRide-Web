import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyDutVKa0MTkccykDVcgk-qzRWNCa_SyXiQ",
  authDomain: "lankaride-56bc0.firebaseapp.com",
  projectId: "lankaride-56bc0",
  storageBucket: "lankaride-56bc0.firebasestorage.app",
  messagingSenderId: "1078623791070",
  appId: "1:1078623791070:web:25ba86dd1fdda30bd99f4f",
  measurementId: "G-EWFN7S9K21"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export async function handleBooking(bookingData, whatsappNumber) {
    try {
        await addDoc(collection(db, "bookings"), {
            ...bookingData,
            status: "pending",
            timestamp: new Date()
        });
        
        const message = `*LANKARIDE NEW BOOKING*%0A` +
                        `--------------------------%0A` +
                        `*Name:* ${bookingData.name}%0A` +
                        `*Contact:* ${bookingData.phone}%0A` +
                        `*Pickup:* ${bookingData.pickup}%0A` +
                        `*Destination:* ${bookingData.destination}%0A` +
                        `*Vehicle:* ${bookingData.vehicle}%0A` +
                        `--------------------------%0A` +
                        `Please confirm my ride.`;

        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    } catch (error) {
        console.error("Booking Error:", error);
    }
}


export async function driverSignUp(email, password, name, phone) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "drivers"), {
        uid: userCredential.user.uid,
        name: name,
        phone: phone,
        email: email,
        timestamp: new Date()
    });
    return userCredential.user;
}


export async function driverLogin(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export { auth, db };