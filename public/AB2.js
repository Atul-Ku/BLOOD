function Send(){

          
    var name = document.getElementById("Name").value;
    var email = document.getElementById("Email").value;
    var contact = document.getElementById("Contact").value;
    var blood=document.getElementById("Blood").value;
    var sub = document.getElementById("subject").value;
    var mess = document.getElementById("message").value;

    var body = "Name: " + name + "<br/> Email:" + email + "<br/> Contact Number:" + contact + "<br/> Blood Type:" + blood + "<br/> Message:" + mess;
     
    console.log(body);
     Email.send({

      SecureToken : "6b07fa5a-0e36-47ca-9180-839d46fc6622",
      To : 'bloodhub7@gmail.com',
      From : "bloodhub7@gmail.com",
      Subject : sub,
      Body : body
     }).then(
         message =>{
             if(message=='OK'){

                 swal("Successfull", "Your Data Successfull Received", "success");
             }
             else{

                 swal("Something Wrong", "Your Data is not Received", "error");
             }
         }
       )};