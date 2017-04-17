/*
    Global variable declaration
*/
numChecker = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
invalid = "Invalid Input.";
zodiacYear = ["MONKEY", "ROOSTER", "DOG", "PIG", "RAT", "OX", "TIGER", "RABBIT", "DRAGON", "SNAKE", "HORSE", "GOAT"];
zodiacSign = ["AQUARIUS", "PISCES", "ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN"];
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
error_code = 0;
idInputArr = ["prename", "firstname", "lastname", "houseNumber", "street", "city", "province", "zipcode", "phoneNumber", "cellPhoneNumber", "birthday", "citizenship", "zodiacSign", "zodiacYear", "dayOfWeek"]

function test() {
    document.getElementById("alertBox").style.display = "block";
}

function formatFirstname(temp) {
    var name = temp.value;
    if (name == "" || name == null || name == " " || name.length == 0) {
        document.getElementById("fname-error").textContent = "Can't be empty.";
        document.getElementById("firstname").focus();
        error = 1;
    }
}

function formatLastname(temp) {
    var name = temp.value;
    if (name == "" || name == null || name == " " || name.length == 0) {
        document.getElementById("lname-error").textContent = "Can't be empty.";
        document.getElementById("lastname").focus();
        error = 1;
    }
}

function formatZipcode(temp) {
    var code = temp.value;
    if (code == "" || code == null || code == " " || code.length == 0) {
        document.getElementById("zipcode-error").textContent = "Can't be empty.";
        document.getElementById("zipcode").focus();
        error = 1;
    }
    for (i = 0; i < code.length; i++) {
        if (!isInteger(code[i])) {
            document.getElementById("zipcode-error").textContent = "invalid number.";
            document.getElementById("zipcode").focus();
            error = 1;
            break;
        }
    }
}

function formatPhoneNum(temp) {
    var num = replaceAll(replaceAll(temp.value, '-', ''), ' ', '');
    var numArr = num.split("");
    var out = "+66";
    if (numArr.length != 11 || numArr[0] != '+') {
        document.getElementById("phone-error").textContent = "invalid number.";
        document.getElementById("phoneNumber").focus();
        error = 1;
        out = "+66";
    } else {
        for (i = 3; i < numArr.length; i++) {
            if (!isInteger(numArr[i])) {
                out = "+66";
                document.getElementById("phone-error").textContent = "invalid number.";
                document.getElementById("phoneNumber").focus();
                error = 1;
                break;
            }
            // alert(numArr[i]);
            out += numArr[i];
            if (i == 3 || i === 6) {
                out += "-";
            }
        }
    }
    document.getElementById("phoneNumber").value = out;
}

function formatCellPhoneNum(temp) {
    // var num = temp.value.replaceAll('-', '');
    var num = replaceAll(replaceAll(temp.value, '-', ''), ' ', '');
    var numArr = num.split("");
    var out = "+66";
    if (numArr.length != 12 || numArr[0] != '+') {
        // alert(invalid);
        document.getElementById("cellPhone-error").textContent = "invalid number.";
        document.getElementById("cellPhoneNumber").focus();
        error = 1;
        out = "+66";
    } else {
        for (i = 3; i < numArr.length; i++) {
            if (!isInteger(numArr[i])) {
                out = "+66";
                // alert(invalid);
                document.getElementById("cellPhone-error").textContent = "invalid number.";
                document.getElementById("cellPhoneNumber").focus();
                error = 1;
                break;
            }
            out += numArr[i];
            if (i == 4 || i === 7) {
                out += "-";
            }
        }
    }
    document.getElementById("cellPhoneNumber").value = out;
}

function formatCitizen(temp) {
    var num = replaceAll(replaceAll(temp.value, '-', ''), ' ', '');
    var numArr = num.split("");
    var out = "";
    if (numArr.length != 13) {
        // alert(invalid);
        document.getElementById("citizen-error").textContent = "invalid number.";
        document.getElementById("citizenship").focus();
        error = 1;
        out = "";
    } else {
        for (i = 0; i < numArr.length; i++) {
            if (!isInteger(numArr[i])) {
                out = "+66";
                // alert(invalid);
                document.getElementById("citizen-error").textContent = "invalid number.";
                document.getElementById("citizenship").focus();
                error = 1;
                break;
            }
            // alert(numArr[i]);
            out += numArr[i];
            if (i == 0 || i === 4 || i == 9 || i == 11) {
                out += "-";
            }
        }
    }
    document.getElementById("citizenship").value = out;
}

function formatZodiac(temp) {
    // alert(temp.value);
    var datetime = temp.value.split("-");
    var year = parseInt(datetime[0]);
    var month = parseInt(datetime[1]);
    var day = parseInt(datetime[2]);
    var dayOfWeek = getDayOfWeek(day, month, year);
    document.getElementById("zodiacYear").value = zodiacYear[year % 12];
    document.getElementById("zodiacSign").value = zodiacSign[getZodiacSign(month, day) - 1];
    document.getElementById("dayOfWeek").value = days[dayOfWeek];
}

function createCookiesSave() {
    var tt = "";
    for (i = 0; i < idInputArr.length; i++) {
        // alert(idInputArr[i]);
        document.cookie = idInputArr[i] + "=" + document.getElementById(idInputArr[i]).value;
    }
    // alert(document.cookie);
}

function validateData() {
    formatFirstname(document.getElementById("firstname"));
    formatLastname(document.getElementById("lastname"));
    formatZipcode(document.getElementById("zipcode"));
    formatPhoneNum(document.getElementById("phoneNumber"));
    formatCellPhoneNum(document.getElementById("cellPhoneNumber"));
    formatCitizen(document.getElementById("citizenship"));
    if (error_code != 1) {
        createCookiesSave();
        alert(document.cookie + ' form submitted.');
        window.location.href = "result.html";
    }
}

function newResultData() {
    var tt = '<table style="left: 30%;width:50%" align="center" id="result">';
    var dat = "";
    for (i = 0; i < idInputArr.length; i++) {
        dat = getCookie(idInputArr[i]);
        tt += '<tr><td>' + idInputArr[i] + '</td>' +
            '<td>' + dat + '</td></tr>';
    }
    tt += '</table>'
    document.getElementById("tab").innerHTML = tt;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/////////////- CustomFunction -//////////////////

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

function getDayOfWeek(day, month, year) {
    var temp = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var D = year % 100;
    var C = parseInt(year / 100);
    if (month <= 2) {
        D -= 1;
    }
    var f = day + ((13 * temp[month - 1] - 1) / 5) + D + (D / 4) + (C / 4) - 2 * C
    return parseInt(f) % 7;
}

function getZodiacSign(month, day) {
    if (month == 1) {
        if (day >= 20) {
            return 1;
        } else {
            return 12;
        }
    } else if (month == 2) {
        if (day >= 19) {
            return 2;
        } else {
            return 1;
        }
    } else if (month == 3) {
        if (day >= 21) {
            return 3;
        } else {
            return 2;
        }
    } else if (month == 4) {
        if (day >= 20) {
            return 4;
        } else {
            return 3;
        }
    } else if (month == 5) {
        if (day >= 21) {
            return 5;
        } else {
            return 4;
        }
    } else if (month == 6) {
        if (day >= 21) {
            return 6;
        } else {
            return 5;
        }
    } else if (month == 7) {
        if (day >= 23) {
            return 7;
        } else {
            return 6;
        }
    } else if (month == 8) {
        if (day >= 23) {
            return 8;
        } else {
            return 7;
        }
    } else if (month == 9) {
        if (day >= 23) {
            return 9;
        } else {
            return 8;
        }
    } else if (month == 10) {
        if (day >= 23) {
            return 10;
        } else {
            return 9;
        }
    } else if (month == 11) {
        if (day >= 22) {
            return 11;
        } else {
            return 10;
        }
    } else if (month == 12) {
        if (day >= 22) {
            return 12;
        } else {
            return 11;
        }
    }
}