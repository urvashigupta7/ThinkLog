var id = document.getElementById('mydiv').dataset.test;
var user = document.getElementById('user').dataset.user;
var userid= document.getElementById('userid').dataset.userid;
var commentform = document.getElementById("addComment");
commentform.addEventListener("submit", onNewComment);

function onNewComment(e) {
    e.preventDefault();
    var newComment = {
        "text": document.getElementById('comment-box').value,
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", `/blogs/${id}/comment`, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4 || xhr.status != 200) return;
        commentform.reset();
    };
    xhr.send(JSON.stringify(newComment))
}
var pusher = new Pusher('0336f0455b17415fde73', {
    cluster: 'ap2',
    encrypted: true
})
var channel = pusher.subscribe(`comment-${id}`);
channel.bind('new-comment', function (data) {
    var commentsList = document.getElementById('comments-list');
    var commentTemplate = document.getElementById('comment-template');
    var newDeleteForm=document.getElementById("delete");

    var newCommentHtml = commentTemplate.innerHTML.replace('{{name}}', data.author.username);
    newCommentHtml = newCommentHtml.replace('{{comment}}', data.text);
    newCommentHtml=newCommentHtml.replace('{{created}}','a few seconds ago');
    newCommentHtml=newCommentHtml.replace('{{url}}','/blogs/'+id+'/comment/'+data._id+'?_method=DELETE')
    newCommentHtml=newCommentHtml.replace('{{updateurl}}','/blogs/'+id+'/comment/'+data._id+'?_method=PUT')
    if(data.author.id===userid){
        newCommentHtml=newCommentHtml.replace('{{display}}',"block");
    }else{
        newCommentHtml=newCommentHtml.replace('{{display}}',"none");
    }
    var newCommentNode = document.createElement('div');
    newCommentNode.classList.add('comment');
    newCommentNode.innerHTML = newCommentHtml;
    commentsList.appendChild(newCommentNode);
    hascomments();
})

function editButtonOnClick(param){
var parent=param.parentElement;
 var comment=parent.previousElementSibling;
 var editable=comment.contentEditable;
 var cancelButton=param.nextElementSibling;
 var updateButton=cancelButton.nextElementSibling;
 var commentOriginal=comment.innerHTML;

 if(editable=="inherit"||editable=="false"){
     comment.style.border="2px solid black";
     comment.style.padding="5px";
     comment.contentEditable=true;
     param.style.display="none";
     cancelButton.style.display="inline"
     updateButton.style.display="inline";
 }
 cancelButton.addEventListener("click",function(){
    comment.style.border="none";
    comment.innerHTML=commentOriginal;
    comment.contentEditable=false; 
    comment.style.padding="0px";
    cancelButton.style.display="none"
    param.style.display="inline"; 
    updateButton.style.display="none";
 })
}
function updateButtonOnClick(param,url){
var parent=param.parentElement;
var comment=parent.previousElementSibling;
var cancelButton=param.previousElementSibling;
var editButton=param.previousElementSibling.previousElementSibling;
var newComment={
    "text":comment.innerHTML
}
comment.contentEditable=false;
comment.style.border="none";
param.style.display="none";
editButton.style.display="inline";
cancelButton.style.display="none";
var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4 || xhr.status != 200) return;
    };
    xhr.send(JSON.stringify(newComment));

}
function hascomments(){
var commentlist=document.getElementById("comments-list");
var nocomment=document.getElementById("no-comment");
if(commentlist.childElementCount===2){
    nocomment.style.display='block';
}else{
    if(nocomment){
    nocomment.style.display='none';
    }
}
};
hascomments();