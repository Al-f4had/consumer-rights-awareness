// Rights search
var searchBox = document.getElementById("rightSearch");
if (searchBox) {
  searchBox.addEventListener("input", function() {
    var searchText = searchBox.value.toLowerCase();
    var rights = document.querySelectorAll(".right");
    var count = 0;

    for (var i = 0; i < rights.length; i++) {
      if (rights[i].textContent.toLowerCase().indexOf(searchText) !== -1) {
        rights[i].hidden = false;
        count++;
      } else {
        rights[i].hidden = true;
      }
    }

    document.getElementById("searchMessage").textContent = count + " result(s) found.";
  });
}

// Complaint form validation
var complaintForm = document.getElementById("complaintForm");
if (complaintForm) {
  complaintForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var problem = document.getElementById("problem").value;
    var message = document.getElementById("formMessage");

    if (name.length < 2) {
      message.textContent = "Please enter your name.";
    } else if (email.indexOf("@") === -1) {
      message.textContent = "Please enter a valid email address.";
    } else if (problem.length < 20) {
      message.textContent = "Please describe your problem in at least 20 characters.";
    } else {
      message.textContent = "Your practice form is valid. No information has been sent.";
    }
  });
}

// Show or hide law information
var lawButton = document.getElementById("lawButton");
if (lawButton) {
  lawButton.addEventListener("click", function() {
    var lawInfo = document.getElementById("lawInfo");
    if (lawInfo.hidden === true) {
      lawInfo.hidden = false;
      lawButton.textContent = "Hide information";
    } else {
      lawInfo.hidden = true;
      lawButton.textContent = "Show more";
    }
  });
}

// Quiz score
var quizForm = document.getElementById("quizForm");
if (quizForm) {
  quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var score = 0;
    var questions = ["q1", "q2", "q3", "q4"];
    var complete = true;

    for (var i = 0; i < questions.length; i++) {
      var answer = document.querySelector('input[name="' + questions[i] + '"]:checked');
      if (answer === null) {
        complete = false;
      } else if (answer.value === "right") {
        score++;
      }
    }

    if (complete === false) {
      document.getElementById("quizResult").textContent = "Please answer all four questions.";
    } else {
      document.getElementById("quizResult").textContent = "Your score: " + score + " out of 4.";
    }
  });
}
