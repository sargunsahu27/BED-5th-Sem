const signupForm=document.querySelector("#signup-form");
const signupUsername=document.querySelector("#signup-username");
const signupEmail=document.querySelector("#signup-email");
const signupPassword=document.querySelector("#signup-password");

const loginForm=document.querySelector("#login-form");
const loginEmail=document.querySelector("#login-email");
const loginPassword=document.querySelector("#login-password");
signupForm.addEventListener("submit",async function(e){
    e.preventDefault();
    
        let name=signupUsername.value;
        let email=signupEmail.value;
        let password=signupPassword.value;
   
    let response=await fetch("/api/users/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password

        })
    });
   let data=await response.json();
   console.log(data);
    if(data.success){
        alert("Registration Successful");
        
    }else{
        alert("Registration Failed: "+data.message);
    }
});
loginForm.addEventListener("submit",async function(e){
    e.preventDefault();
    
        let email=loginEmail.value;
        let password=loginPassword.value;
   
    let response=await fetch("/api/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password

        })
    });
   let data=await response.json();
   console.log(data);
    if(data.success){
        let token=data.token;
        localStorage.setItem("token",token);
        alert("Login Successful");
        loginForm.reset();
        
    }else{
        alert("Login Failed: "+data.message);
    }
});