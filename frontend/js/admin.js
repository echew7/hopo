function login(e) {
    if (e.type == "keypress" && e.charCode != 13) return;
    var http = new XMLHttpRequest();
    http.open("POST", "/api/authenticate");
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.onload = function() {
        console.log(http.response);
        var response = JSON.parse(http.response);
        if (response.message == "Successfully authenticated!") {
            document.getElementById('login-container').style.display = 'none';
        }
    }
    loginData = "username=" + document.getElementById("username").value + "&password=" + document.getElementById("password").value;
    http.send(loginData);
}

document.getElementById("login").onclick = login;
document.getElementById("username").onkeypress = login;
document.getElementById("password").onkeypress = login;

document.getElementById("submitLocation").onclick = function() {
    var http = new XMLHttpRequest();
    http.open("POST", "/api/locations");
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.onload = function() {
        console.log(http.response);
    }
    locationData = "lat=" + document.getElementById("lat").value
     + "&lng=" + document.getElementById("lng").value
     + "&name=" + document.getElementById("name").value
     + "&ocean=" + document.getElementById("ocean").value
     + "&videoLink=" + document.getElementById("link").value
     + "&description=" + document.getElementById("description").value;
    http.send(locationData);
}