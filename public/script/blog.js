var id = document.getElementById('mydiv').dataset.test;
var user = document.getElementById('user').dataset.user;
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
    var newCommentNode = document.createElement('div');
    newCommentNode.classList.add('comment');
    newCommentNode.innerHTML = newCommentHtml;
    commentsList.appendChild(newCommentNode);
})

function editButtonOnClick(param){
 var comment=param.previousElementSibling;
 var editable=comment.contentEditable;
 var cancelButton=param.nextElementSibling;
 var commentOriginal=comment.innerHTML;

 if(editable=="inherit"||editable=="false"){
     comment.style.border="2px solid black";
     comment.style.padding="5px";
     comment.contentEditable=true;
     param.style.display="none";
     cancelButton.style.display="inline"
 }
 cancelButton.addEventListener("click",function(){
    comment.style.border="none";
    comment.innerHTML=commentOriginal;
    comment.contentEditable=false; 
    comment.style.padding="0px";
    cancelButton.style.display="none"
    param.style.display="inline"; 
 })
}