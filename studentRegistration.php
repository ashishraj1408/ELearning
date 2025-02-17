
<form role="form" id="stuRegForm">
   <div class="form-group">
     <i class="fas fa-user"></i><label for="stuname" class="pl-2 font-weight-bold">Name</label><small id="statusMsg1"></small><input type="text"
       class="form-control" placeholder="Name" name="stuname" id="stuname">
   </div>
   <div class="form-group">
   <i class="fas fa-envelope"></i><label for="stuemail" class="pl-2 font-weight-bold">Email</label><small id="statusMsg2"></small><input type="email"
       class="form-control" placeholder="Email" name="stuemail" id="stuemail">
     <small class="form-text">We'll never share your email with anyone else.</small>
   </div>
   <div class="form-group">
     <i class="fas fa-key"></i><label for="stupass" class="pl-2 font-weight-bold">
       Password </label><small id="statusMsg3"></small><i class="far fa-eye" id="togglePassword" style="margin-left: 70%; cursor: pointer;"></i>
      
       <input type="password" class="form-control" placeholder="Password" name="stupass" id="stupass" >
       
   </div>
   <div class="form-group">
     <i class="fas fa-key"></i><label for="pass2" class="pl-2 font-weight-bold">
       Re-Enter Password</label><small id="statusMsg4"></small><input type="password" class="form-control" placeholder="Password" name="pass2" id="pass2">
   </div>
 </form>