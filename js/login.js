
let email = "maurofgarcia87@gmail.com";
let pass = '123';

let inputMail = document.getElementById('mail');
let inputPass = document.getElementById('pass');
let btnLogin = document.getElementById('btnLogin');
let formLogin = document.getElementById('formLogin')

formLogin.addEventListener('submit', login);
console.log(inputMail.value)
console.log(inputPass.value)


function login(e){
    e.preventDefault();
    if( (inputPass = pass) && (inputMail = email)){
        window.location = '../admin.html';
       
    }else{
       
        console.log(inputMail.value)
        console.log(inputPass.value)

    }
    
}

