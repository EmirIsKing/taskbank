import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/clientApp";

const getDetails = (userId, callback) => {
  try {
    const docRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data()); // Call the callback with document data
      } else {
        console.log("No such document!");
        callback(null); // Or handle no document case
      }
    }, (error) => {
      console.error("Error fetching balance:", error);
      callback(null); // Handle error
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;

  } catch (error) {
    console.error("Error fetching balance:", error);
    return null; // Handle error
  }
};

export default getDetails;
