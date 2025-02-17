$(document).ready(function() {
  // Ajax Call for Already Exists Email Verification
  $("#stuemail").on("keypress blur", function() {
    var reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[com]{2,4}$/i;
    var stuemail = $("#stuemail").val();
    $.ajax({
      url: "Student/addstudent.php",
      type: "post",
      data: {
        checkemail: "checkmail",
        stuemail: stuemail
      },
      success: function(data) {
        console.log(data);
        if (data != 0) {
          $("#statusMsg2").html(
            '<small style="color:red;"> Email ID Already Registered ! </small>'
          );
          $("#signup").attr("disabled", true);
        } else if (data == 0 && reg.test(stuemail)) {
          $("#statusMsg2").html(
            '<small style="color:green;"> There you go ! </small>'
          );
          $("#signup").attr("disabled", false);
        } else if (!reg.test(stuemail)) {
          $("#statusMsg2").html(
            '<small style="color:red;"> Please Enter Valid Email e.g. example@mail.com </small>'
            
          );
          
          $("#signup").attr("disabled", false);
        }
        if (stuemail == "") {
          $("#statusMsg2").html(
            '<small style="color:red;"> Please Enter Email ! </small>'
          );
        }
      }
    });
  });


  // Checking name on keypress
  $("#stuname").keypress(function() {
    var stuname = $("#stuname").val();
    if (stuname !== "") {
      $("#statusMsg1").html(" ");
    }
  });
  // Checking Password on keypress
  $("#stupass").keypress(function() {
    var stupass = $("#stupass").val();
    if (stupass !== "") {
      $("#statusMsg3").html(" ");
    }
  });
});
// // //possword hide
// const togglePassword = document.querySelector('#togglePassword');
// const password = document.querySelector('#stupass');

// togglePassword.addEventListener('click', function (e) {
//   // toggle the type attribute
//   const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//   password.setAttribute('type', type);
//   // toggle the eye slash icon
//   this.classList.toggle('fa-eye-slash');
// });

// Ajax Call for Adding New Student
function addStu() {
  var reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var stuname = $("#stuname").val();
  var stuemail = $("#stuemail").val();
  var stupass = $("#stupass").val();
  var pass2 = $("#pass2").val();


  //checking  all feilds on form submission 
  if( stuname.trim(), stupass.trim(), stuemail.trim() , pass2.trim()== "") {
    $("#statusMsg1").html(
      '<small style="color:red;">  Please Enter Name ! </small>'
    );
    $("#stuname").focus();
    $("#statusMsg2").html(
      '<small style="color:red;">  Please Enter Email ! </small>'
    );
    $("#stuemail").focus();
    $("#statusMsg3").html(
      '<small style="color:red;">  Please Enter Password ! </small>'
    );
    $("#pass2").focus();
    $("#statusMsg4").html(
      '<small style="color:red;">  Please Enter above Password ! </small>'
    );
    return false;
  }
  // checking fields on form submission
  if (stuname.trim() == "") {
    $("#statusMsg1").html(
      '<small style="color:red;"> Please Enter Name ! </small>'
    );
    $("#stuname").focus();
    return false;
  }else if (stuemail.trim() == "") {
    $("#statusMsg2").html(
      '<small style="color:red;"> Please Enter Email ! </small>'
    );
    $("#stuemail").focus();
    return false;
  } else if (stuemail.trim() != "" && !reg.test(stuemail)) {
    $("#statusMsg2").html(
      '<small style="color:red;"> Please Enter Valid Email e.g. example@mail.com </small>'
    );
    $("#stuemail").focus();
    return false;
  } else if (stupass.trim() == "") {
    $("#statusMsg3").html(
      '<small style="color:red;"> Please Enter Password ! </small>'
    );
    $("#stupass").focus();
    return false;
   
  }else if(pass2.trim == ""){
    $("#statusMsg4").html(
      '<small style="color:red;">Please Enter Your Above  Password !</small>'
      );
      $("#pass2").focus();
      return false;

  }else if (pass2.trim() != stupass.trim()) {
    $("#statusMsg4").html(
      '<small style="color:red;"> Password not Match ! </small>'
    );
    $("#stupass").focus();
    return false;
    }else {
    $.ajax({
      url: "Student/addstudent.php",
      type: "post",
      data: {
        // assigned stusignup value just to check all iz well
        stusignup: "stusignup",
        stuname: stuname,
        stuemail: stuemail,
        stupass: stupass,
        pass2: pass2
      },
      success: function(data) {
        console.log(data);
        if (data == "OK" || data == '0') {
          $("#successMsg").html(
            '<span class="alert alert-success"> Registration Successful ! </span>'
          );
          // making field empty after signup
          clearStuRegField();
        } else if (data == "Failed") {
          $("#successMsg").html(
            '<span class="alert alert-danger"> Unable to Register ! </span>'
          );
        }
      }
    });
  }
}

// Empty All Fields and Status Msg
function clearStuRegField() {
  $("#stuRegForm").trigger("reset");
  $("#statusMsg1").html(" ");
  $("#statusMsg2").html(" ");
  $("#statusMsg3").html(" ");
  $("#statusMsg4").html(" ");
}

function clearAllStuReg() {
  $("#successMsg").html(" ");
  clearStuRegField();
}

// Ajax Call for Student Login Verification
function checkStuLogin() {
  var stuLogEmail = $("#stuLogEmail").val();
  var stuLogPass = $("#stuLogPass").val();

  if (stuLogEmail.trim() == "") {
    $("#statusLogMsg1").html(
      '<small style="color:red;"> Enter E-mail! </small>'
    );
    $("#stuLogEmail").focus();
    return false;
  }
  else if (stuLogPass.trim() == "") {
    $("#statusLogMsg2").html(
      '<small style="color:red;"> Enter Password! </small>'
    );
    $("#stuLogPass").focus();
    return false;
  }
  $.ajax({
    url: "Student/addstudent.php",
    type: "post",
    data: {
      checkLogemail: "checklogmail",
      stuLogEmail: stuLogEmail,
      stuLogPass: stuLogPass
    },
    success: function(data) {
      console.log(data);
    
        if (data == 0) {
        $("#statusLogMsg").html(
          '<small class="alert alert-danger"> Invalid Email ID or Password ! </small>'
        )
        }else if (data == 1) {
        $("#statusLogMsg").html(
          '<div class="spinner-border text-success" role="status"></div>'
        );


        
        // Empty Login Fields
        clearStuLoginField();
        setTimeout(() => {
          window.location.href = "index.php";
        }, 1000);
      }
    }
    
  
  });
}
$("#stuLogEmail").keypress(function() {
  var stuname = $("#stuLogEmail").val();
  if (stuname !== "") {
    $("#statusLogMsg1").html(" ");
  }
});
$("#stuLogPas").keypress(function() {
  var stuname = $("#stuLogPas").val();
  if (stuname !== "") {
    $("#statusLogMsg2").html(" ");
  }
});

// Empty Login Fields
function clearStuLoginField() {
  $("#stuLoginForm").trigger("reset");
  $("#statusLogMsg1").html(" ");
 
}

// Empty Login Fields and Status Msg
function clearStuLoginWithStatus() {
  $("#statusLogMsg").html(" ");
  clearStuLoginField();
  $("#statusLogMsg1").html(" ");
  clearStuLoginField();
  
  
}
