import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqH060hfHKRPPmadVf66avyHv15uWG9y4",
  authDomain: "miniblog-261e2.firebaseapp.com",
  projectId: "miniblog-261e2",
  storageBucket: "miniblog-261e2.appspot.com",
  messagingSenderId: "524332039657",
  appId: "1:524332039657:web:a11c27be9cecca1c621f78"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };