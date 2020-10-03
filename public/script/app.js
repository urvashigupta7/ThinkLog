var i=0;
var text="Want To Write Something?, Give It A Try Here !";
var speed = 100; 

function typeWriter() {
  if (i < text.length) {
    if(text.charAt(i)===","){
      document.getElementById("type").innerHTML += "<br>";
    }else{
    document.getElementById("type").innerHTML += text.charAt(i);
    }
    i++;
    setTimeout(typeWriter, speed);
  }
}
if(i!==text.length){
setTimeout(typeWriter,speed);
}
function validate(){
  var texteditorbody=document.getElementById("mytextarea");
  var p=document.getElementById("body-warning");
  if(texteditorbody.value===''){
    p.style.display="block";
    return false;
  }else{
    return true;
  }
}
function onblogload(){
  console.log(body);
  console.log("yes");
}


