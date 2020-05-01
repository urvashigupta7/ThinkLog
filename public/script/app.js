var items=document.getElementsByClassName("blog");
var titles=document.getElementsByClassName("title");
var msg=document.getElementById("msg");
function myFunction(){
var myInput=document.getElementById("myInput");
var filterValue=myInput.value.toLowerCase().trim();
var count=0;
for(var i=0;i<items.length;i++){
    var blog=items[i];
    var title=titles[i];
    var txtValue=title.textContent || title.innerText;
    if(txtValue.toLowerCase().indexOf(filterValue)>-1){
        blog.style.display = "";   
    }else{
      blog.style.display="none";
      count++;
    }
}
if(count===items.length){
 msg.innerText="No Blogs Found"
}
else{
    msg.innerText="";
}
}
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

