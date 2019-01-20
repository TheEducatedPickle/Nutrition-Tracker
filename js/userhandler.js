var db = openDatabase('mydb', '1.0', 'User database', 2 * 1024 * 1024);
var admin = 'ajyuan@ucsc.edu'

db.transaction(function (tx) {
    //tx.executeSql('DROP TABLE users');
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (email unique, password, name, calories DEFAULT 0, sugar DEFAULT 0, fats DEFAULT 0, carbohydrates DEFAULT 0)');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS nt (email unique, calories, sugar, fats, carbohydrates)')
    tx.executeSql('SELECT * FROM users', [], function (tx, results) {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            console.log(results.rows.item(i));
        }
    });
    console.log("user handler opened!")
});

function addUser(name, email, password) {
    console.log("name: " + name + "\nemail: " + email + "\npassword: " + password);
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        //tx.executeSql('INSERT INTO nt (email, 0, 0, 0, 0)');
        console.log(`Added user ${name}`);
    })
}

function authUser(email, password) {
    //console.log("email: " + email + "\npassword: " + password);
    db.transaction(function (tx) {
        tx.executeSql(`SELECT * FROM users WHERE password =? AND email=?`, [password, email], function (tx, results) {
            var len = results.rows.length, i;
            //console.log(len)
            if (len === 0) {
                alert("User not found, please try again");
            } else {
                console.log(results.rows.item(0).name + " signed in");
                window.location.href = "./home.html";
            }
        })
    })
}

function updateUser(calories = 0, sugar = 0, fats = 0, carbs = 0, email = admin) {
    console.log("Values: " + calories + " " + sugar + " " + fats + " " + carbs + " " + email)
    db.transaction(function (tx) {
        tx.executeSql('UPDATE users SET calories=calories+?,sugar=sugar+?,fats=fats+?,carbohydrates=carbohydrates+? WHERE email=?', [calories, sugar, fats, carbs, email],
            function (tx, results) { console.log("Success") }, function (transaction, error) { console.log(error); }
        );
    })
}

function getUserData(email = admin) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT calories,sugar,fats,carbohydrates FROM users WHERE email=?', [email], function (tx, results) {
            console.log(results.rows.item(0));
        })
    });
}