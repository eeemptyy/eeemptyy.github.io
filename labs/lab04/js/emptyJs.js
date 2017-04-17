Zone = [
    ['จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ตราด', 'ปราจีนบุรี', 'ระยอง', 'สระแก้ว'], //ตะวันออก
    ['กรุงเทพมหานคร', 'กำแพงเพชร', 'ชัยนาท', 'นครนายก', 'นครปฐม', 'นครสวรรค์', 'นนทบุรี', 'ปทุมธานี', 'พระนครศรีอยุธยา', 'พิจิตร', 'พิษณุโลก', 'ลพบุรี', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระบุรี', 'สิงห์บุรี', 'สุพรรณบุรี', 'สุโขทัย', 'อุทัยธานี', 'อ่างทอง', 'เพชรบูรณ์'], //กลาง
    ['น่าน', 'พะเยา', 'ลำปาง', 'ลำพูน', 'อุตรดิตถ์', 'เชียงราย', 'เชียงใหม่', 'แพร่', 'แม่ฮ่องสอน'], //เหนือ
    ['กาฬสินธุ์', 'ขอนแก่น', 'ชัยภูมิ', 'นครพนม', 'นครราชสีมา', 'บึงกาฬ', 'บุรีรัมย์', 'มหาสารคาม', 'มุกดาหาร', 'ยโสธร', 'ร้อยเอ็ด', 'ศรีสะเกษ', 'สกลนคร', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อำนาจเจริญ', 'อุดรธานี', 'อุบลราชธานี', 'เลย'], //ตะวันออกเฉียงเหนือ
    ['กระบี่', 'ชุมพร', 'ตรัง', 'นครศรีธรรมราช', 'นราธิวาส', 'ปัตตานี', 'พังงา', 'พัทลุง', 'ภูเก็ต', 'ยะลา', 'ระนอง', 'สงขลา', 'สตูล', 'สุราษฎร์ธานี'], //ใต้
    ['กาญจนบุรี', 'ตาก', 'ประจวบคีรีขันธ์', 'ราชบุรี', 'เพชรบุรี'] //ตะวันตก
]
Zone_name = ['east', 'middle', 'north', 'north-east', 'south', 'west'];

numChecker = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

document.onload = loadDoc2();

function formAlert() {
    document.getElementById("alertBox").style.display = "block";
}

function loadDoc(reg, pro) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#img_data").attr({
                src: "data/sign/" + reg + "/" + pro + ".png"
            });
            $("#data").html(this.responseText);
        }
    };
    xhttp.open("GET", "data/motto/" + reg + "/" + pro + ".txt", true);
    xhttp.send();
}

function loadDoc2() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var x = formatText(this.responseText); //this.responseText
            document.getElementById("demo").innerHTML = x;
        }
    };
    xhttp.open("GET", "data/allProvince.txt", true);
    xhttp.send();
}

function formatText2(temp) {
    var text = temp
    text.sort();
    var out = "";
    for (i = 0; i < text.length; i++) {
        out += "<option>" + text[i] + "</option>" //"<br>"
    }
    // out += "</select>";
    return out;
}

function formatText(temp) {
    var text = temp.split(".txt\n");
    text.sort();
    var out = "";
    for (i = 0; i < text.length; i++) {
        out += "<option>" + text[i] + "</option>" //"<br>"
    }
    return out;
}

function validate() {
    var txt = $("#fname").val() + " " + $("#lname").val();
    for (i = 0; i < txt.length; i++) {
        if (isInteger(txt[i])) {
            return false;
        }
    }
    if ($("input[type=radio]:checked").val() == null) {
        return false;
    }
    if ($("#birthday").val() == "") {
        return false;
    }
    return true;
}

function genProDrop() {
    var pro_zone = parseInt($("#zone").find(':selected').attr('value'));
    if (pro_zone == 6) {
        loadDoc2();
    } else if (pro_zone == 5) {
        document.getElementById("demo").innerHTML = formatText2(Zone[pro_zone]);;
    } else if (pro_zone == 4) {
        document.getElementById("demo").innerHTML = formatText2(Zone[pro_zone]);;
    } else if (pro_zone == 3) {
        document.getElementById("demo").innerHTML = formatText2(Zone[pro_zone]);;
    } else if (pro_zone == 2) {
        document.getElementById("demo").innerHTML = formatText2(Zone[pro_zone]);;
    } else if (pro_zone == 1) {
        document.getElementById("demo").innerHTML = formatText2(Zone[pro_zone]);;
    } else if (pro_zone == 0) {
        document.getElementById("demo").innerHTML = formatText2(Zone[pro_zone]);;
    }
}

function getAge() {
    var temp = $("#birthday").val().split("-");
    var year = parseInt(temp[0]);
    var d = new Date().getFullYear()
    return d - year;
}

function findReg(temp) {
    for (i = 0; i < Zone.length; i++) {
        for (j = 0; j < Zone[i].length; j++) {
            if (Zone[i][j] == temp) {
                return i;
            }
        }
    }
    return 0;
}

function onSub() {
    if (!validate()) {
        formAlert();
    } else {
        var pro_zone = parseInt($("#zone").find(':selected').attr('value'));
        if (pro_zone == 6) {
            pro_zone = findReg($("#demo").find(':selected').html());
        }
        loadDoc(Zone_name[pro_zone], $("#demo").find(':selected').html());
        $("#hi").html("Hello! " + $("#fname").val() + " " + $("#lname").val());
        $("#name").html("You have choosed " + $("#demo").find(':selected').html());
        var gender = $("input[type=radio]:checked").val();
        var age = getAge();
        if (age < 13) {
            $("h1, h2,h3,p").css({ "font-family": "'Itim', cursive" });
            $("body").css({
                "background": '#fdfdfd url("img/bg05.jpg") no-repeat bottom right',
                "background-size": "cover",
                "background-attachment": "fixed"
            });
        } else {
            $("h1, h2,h3,p").css({ "font-family": "'Pridi', serif" });
            if (gender == "male") {
                $("body").css({
                    "background": '#fdfdfd url("img/bg04.jpg") no-repeat bottom right',
                    "background-size": "cover",
                    "background-attachment": "fixed"
                });
            } else {
                $("body").css({
                    "background": '#fdfdfd url("img/bg03.jpg") no-repeat bottom right',
                    "background-size": "cover",
                    "background-attachment": "fixed"
                });
            }
        }

        $("#main").hide();
        $("#result").show();
    }
}

////////////////////////////
function isInteger(n) {
    var t = numChecker.indexOf(n);
    // alert(t + " - " + n);
    if (t == -1) {
        return false;
    }
    return true;
}

function replaceAll(text, searchText, replaceText) {
    var search = text.indexOf(searchText);
    while (search > 0) {
        // alert(search + " search value");
        text = text.replace(searchText, replaceText);
        search = text.indexOf(searchText);
    }
    return text;
}

// font-family: 'Itim', cursive;
// font-family: 'Pridi', serif;