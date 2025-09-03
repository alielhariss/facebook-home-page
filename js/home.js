function createPost() {
    let input = document.getElementById("postInput");
    let content = input.value.trim();
    if (content === "") return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    if (typeof posts[0] === "string") {
        posts = posts.map(p => ({ content: p, comments: [] }));
    }
    posts.push({ content: content, comments: [] });
    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
    input.value = "";
}

function displayPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let container = document.getElementById('postsContainer');
    container.innerHTML = "";


    posts.forEach((postObj, index) => {
        let div = document.createElement("div");
        div.className = "single-post";
        div.innerHTML = `
            <div class="post-bg">
                <p>${postObj.content}</p>
                <div class="post-actions">
                <button onclick="toggleCommentArea(${index})"><i class="fa-regular fa-comment"></i> Comment</button>
                <button onclick="likePost(${index})"><i class="fa-regular fa-thumbs-up"></i></i></i> Like</button>
                </div>
                <div class="comment-area" id="comment-area-${index}" style="display:none;">
                <input type="text" class="comment-input" placeholder="Write a comment..." />
                <button onclick="addComment(${index})">Comment</button>
                </div>
                <div class="comments" id="comments-${index}">
                    ${postObj.comments.map(c => `<div class="comment"><p>${c}</p> <img src="img/A1.jpg" alt="Profile Picture" /></div>`).join("")}
                </div>
                <div>
                    
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

function addComment(index) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const input = document.querySelectorAll(".comment-input")[index];
    const comment = input.value.trim();
    if (comment === "") return;

    posts[index].comments.push(comment);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}

function likePost(index) {
    alert("You liked post #" + (index + 1));
}
function toggleCommentArea(index) {
    const area = document.getElementById(`comment-area-${index}`);
    if (area.style.display === "none") {
        area.style.display = "block";
    } else {
        area.style.display = "none";
    }
}



window.onload = displayPosts;

function addNotification(message) {
  let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  notifications.push(message);
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

function toggleNotifBox() {
  const box = document.getElementById("notifBox");
  if (box.style.display === "none") {
    showNotifications();
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}

function showNotifications() {
  const box = document.getElementById("notifBox");
  box.innerHTML = "";
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  if (notifications.length === 0) {
    box.innerHTML = "<p>لا يوجد إشعارات حتى الآن.</p>";
  } else {
    notifications.slice().reverse().forEach((msg) => {
      const p = document.createElement("p");
      p.textContent = msg;
      box.appendChild(p);
    });
  }
}

// التعديل داخل دوال اللايك والبوسط والكومنت:

function createPost() {
  let input = document.getElementById("postInput");
  let content = input.value.trim();
  if (content === "") return;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  if (typeof posts[0] === "string") {
    posts = posts.map(p => ({ content: p, comments: [] }));
  }
  posts.push({ content: content, comments: [] });
  localStorage.setItem("posts", JSON.stringify(posts));
  addNotification("نشرت بوست جديد: \"" + content + "\"");
  displayPosts();
  input.value = "";
}

function addComment(index) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const input = document.querySelectorAll(".comment-input")[index];
  const comment = input.value.trim();
  if (comment === "") return;

  posts[index].comments.push(comment);
  localStorage.setItem("posts", JSON.stringify(posts));
  addNotification("علّقت على بوست رقم " + (index + 1));
  displayPosts();
}

function likePost(index) {
  alert("You liked post #" + (index + 1));
  addNotification("أعجبت ببوست رقم " + (index + 1));
}

                