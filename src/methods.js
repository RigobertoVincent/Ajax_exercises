// Using JQuery Ajax
$(document).ready(function(){
    $("#clickable a").click(function (e) {
        var url = "https://jsonplaceholder.typicode.com/posts";  //fake API site that has training data
        e.preventDefault();
        // request details are sent to server in a key-value pair object
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                $.each(data, function (key, value) {
                    console.log(key);
                    console.log(value);
                    $("#output_posts").append(`<br>User ID: ${value.userId} <br>Post ID: ${value.id}
                    <br>Post Title:</br>${value.title} <br> <br>Post Content:</br>${value.body} <br>`);
                })
            },
            error: function (data) {
                console.log(data);
                $("#output_posts").append(`<br>${data.statusText}`);
            }
        });
    });
});

//XML AJAX
var btn = document.getElementById("btn")
var postsCopntainer = document.getElementById("posts_info")
btn.addEventListener("click", function () {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open('GET','https://jsonplaceholder.typicode.com/posts/1/comments');
    xmlRequest.onload = function () {
        var data = JSON.parse(xmlRequest.responseText);
        appendHTML(data);

    };
    xmlRequest.send();
});

function appendHTML(posts_data) {
    var html = "";
    for (i = 0; i < posts_data.length; i++) {
        html += "<p>" +"Post ID:" + posts_data[i].postId +
            "<br>" +"User ID: " + posts_data[i].id +
            "<br>" +"User Name: " +posts_data[i].name +
            "<br>" +"User Email: " +posts_data[i].email +
            "<br>" +"Post Comment: " +posts_data[i].body + ".</p>";
    }
    postsCopntainer.insertAdjacentHTML('beforeend', html);
}

//Using Fetch with promises
$(document).ready( () => {
    $("#todo_btn").click( () => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                const info = data.map(user => {
                    return `
                        <div id="user_info">
                            <p>UserID: ${user.userId}</p>
                            <p>ID: ${user.id}</p>
                            <p>Post Title: ${user.title}</p>
                            <p>Did they Complete Task: ${user.completed}</p>
                            <br>
                        </div>
                    `;
                }).join("");
                console.log(info);
                document.querySelector("#todo_info")
                    .insertAdjacentHTML("afterbegin", info);
            }).catch(e => {
                console.log(e);
        });
    });

});
