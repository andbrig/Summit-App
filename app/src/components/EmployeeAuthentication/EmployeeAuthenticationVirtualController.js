const firebase = require('firebase/app');
require('firebase/auth');

function init() {
    var config = {
        apiKey:"AIzaSyAPtPRECDUfTVZIB8D5vNX5woc18ZeTq_I",
        authDomain: "summit-app-6f288.firebaseapp.com",
        databaseURL: "https://summit-app-6f288.firebaseio.com",
        projectId: "summit-app-6f288",
        storageBucket: "summit-app-6f288.appspot.com",
        messagingSenderId: "587485967951",
   };

    firebase.initializeApp(config);
}

function authEmployee(payload, callback) {
    // init only it is not inited
    if (!firebase.apps.length) {
        init();
    }

    // get email and password
    const {email, password} = payload;
    // data for callback
    const returnVal = {
        userId: undefined,
        authenticated: false,
        error: undefined,
    };

    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
            returnVal.error = error;

        })
        .then((user) => {
            // return if any error occured
            if(returnVal.error) {
                callback(returnVal);

                return;
            }

            // fetch current user
            user = firebase.auth().currentUser;

            if(user) {
                returnVal.userId = user.uid;
                returnVal.authenticated = true;

                firebase.auth().signOut();
            }

            callback(returnVal);
        });
}

export default authEmployee;
