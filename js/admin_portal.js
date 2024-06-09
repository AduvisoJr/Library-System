$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBin1evT-H6jfR49WIhtVPsGMLzbEklIQY",
        authDomain: "library-management-syste-f2a85.firebaseapp.com",
        databaseURL: "https://library-management-syste-f2a85.firebaseio.com",
        projectId: "library-management-syste-f2a85",
        storageBucket: "library-management-syste-f2a85.appspot.com",
        messagingSenderId: "914416876417",
        appId: "1:914416876417:web:bf9e7762c1c283ba"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();

    db.collection("books").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var bookcode = parseInt(doc.data().bookcode, 10);
            if (bookcode > 1000000) {
                $('#books').append(
                    "<div><h2>" + doc.data().bookcode + "-" + doc.data().bookname + "</h2>" +
                    "<h3>" + doc.data().author1 + " , " + doc.data().author2 + "</h3>" +
                    "<h3>" + doc.data().subject + "</h3>" +
                    "<p>" + doc.data().tags + "</p>" +
                    "</div><hr>"
                );
            }
        });
    });

    db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (doc.data().Roll_Number.startsWith("BNHS")) {
                var book = doc.data().books;
                var books_set = "<ul>";
                for (var i = 0; i < book.length; i++) {
                    books_set += "<li>" + book[i] + "</li>";
                }
                books_set += "</ul>";
                $('#users').append(
                    "<div><h2>" + doc.data().name + "</h2>" +
                    "<h3>" + "Roll Number : " + doc.data().Roll_Number + "</h3>" +
                    "<h3>" + "Date of Birth : " + doc.data().DOB + "</h3>" +
                    "<h3>" + "E-mail Id: " + doc.data().Email + "</h3>" +
                    books_set +
                    "</div><hr>"
                );
            }
        });
    });

    $("#Students_search").submit(function(e) {
        e.preventDefault();
    });

    $("#Books_search").submit(function(e) {
        e.preventDefault();
    });

    d1 = document.getElementById("books");
    d2 = document.getElementById("users");
    d2.style.display = "none";
    d1.style.display = "none";

    $('#show_books').click(function() {
        show_books();
    });
    $('#show_students').click(function() {
        show_students();
    });

    $('#log_button').click(function() {
        logout();
    });
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'index.html';
        }
    });
});

function show_books() {
    d1 = document.getElementById("books");
    d2 = document.getElementById("users");
    d2.style.display = "none";
    d1.style.display = "block";
}

function show_students() {
    d1 = document.getElementById("books");
    d2 = document.getElementById("users");
    d1.style.display = "none";
    d2.style.display = "block";
}

function logout() {
    firebase.auth().signOut().then(function() {
        console.log("logout done");
        window.location = 'admin_login.html';
    }).catch(function(error) {
        console.log("error");
    });
}
