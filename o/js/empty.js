(function() {
    emailjs.init("user_s8Lz8TXBFNzMbuOpxKhMp");
})();

$.Thailand({
    database: 'js/jquery.Thailand.js/database/db.json', // path หรือ url ไปยัง database
    $district: $('#district'), // input ของตำบล
    $amphoe: $('#amphoe'), // input ของอำเภอ
    $province: $('#province'), // input ของจังหวัด
    $zipcode: $('#zipcode'), // input ของรหัสไปรษณีย์
});

$(function() {
    const config = {
        apiKey: "AIzaSyCFliCAzJNlYjBQdqKKzvBILt7S7zOmHsc",
        authDomain: "form-ad546.firebaseapp.com",
        databaseURL: "https://form-ad546.firebaseio.com",
        projectId: "form-ad546",
        storageBucket: "form-ad546.appspot.com",
        messagingSenderId: "536794091654"
    };
    firebase.initializeApp(config);

    const state = {
        email: '',
        password: ''
    };

    $('.js-form').on('submit', event => {
        event.preventDefault();
        const email = $('#js-email').val() || state.email;
        const password = $('#js-password').val() || state.password;
        const message = $('#js-message').val();
        console.log(email, password, message);
        firebase.auth().signInAnonymously()
            .then(user => {
                state.email = email;
                state.password = password;
                // $('#js-login-data').addClass('hidden');
                firebase.database().ref('messages').push({
                    message,
                    email
                });
                emailjs.send("mailjet", "template_6Pl9iQOo", { "buyer_name": email, "from_name": "jompol.s@ku.th", "to_name": "EMPTY", "message_html": "This is test from code pen." + message });
                $('.js-form').trigger('reset');
            })
            .catch(error => {
                console.log(error)
            })
    });
});