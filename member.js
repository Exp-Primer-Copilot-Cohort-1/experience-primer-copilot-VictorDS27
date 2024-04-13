function skillsMember() {
  var member = document.getElementById("member").value;
  var skills = document.getElementById("skills").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("skillsMember").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "skillsMember.php?member="+member+"&skills="+skills, true);
  xhttp.send();
}