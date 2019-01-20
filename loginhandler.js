var provider = new firebase.auth.GoogleAuthProvider();

var database = firebase.database()

function createUser(userId,email,password){
    function writeUserData(userId, password, email) {
        firebase.database().ref('users/' + userId).set({
          username: userId,
          email: email,
          password: password,
        });
      }
    console.log("Creating user")
    console.log("hi");
    debugger;
    authObject = firebase.auth();
    console.log("im working");
    console.log(authObject.currentUser)
    authObject.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
    // ...
    });
    

}

function signInUser(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
        console.log(data);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
