const listElement = document.querySelector(".posts");
const postTemplate = document.querySelector("#single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector(".posts");

function sendHttpRequest(method, url, data) {
  // with XHR
  //   const promise = new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open(method, url);
  //     xhr.onload = function () {
  //       if (xhr.status >= 200 && xhr.status < 300) {
  //         resolve(xhr.response);
  //       } else {
  //         reject(new Error("Something went wrong.... :<"));
  //       }
  //     };
  //     xhr.send();
  //   });

  //   return promise;

  //with fetch function
  //   return fetch(url).then((data) => data.json());

  //with axios
  return axios.get(url);
}

async function fetchPosts() {
  //   const responseData = sendHttpRequest(
  //       "GET",
  //       "https://jsonplaceholder.typicode.com/posts"
  //   ).then(data => {
  //       return JSON.parse(data)
  //   }).then(parsedData => {
  //       for(const post of parsedData){
  //         const postElClone = document.importNode(postTemplate.content, true)
  //         postElClone.querySelector('h2').textContent = post.title.toUpperCase()
  //         postElClone.querySelector('p').textContent = post.body
  //         postElClone.querySelector('li').id = post.id
  //         listElement.appendChild(postElClone)

  //       }
  //   }).catch(err => {
  //     console.error('Error Message => ', err)
  //   })

  const responseData = sendHttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  )
    .then(({ data }) => {
      for (const post of data) {
        const postElClone = document.importNode(postTemplate.content, true);
        postElClone.querySelector("h2").textContent = post.title.toUpperCase();
        postElClone.querySelector("p").textContent = post.body;
        postElClone.querySelector("li").id = post.id;
        listElement.appendChild(postElClone);
      }

      const li = document.querySelector(".post-item");

      const deleteBtns = document.querySelectorAll(".delete-btn");
      deleteBtns.forEach((del) => {
        del.addEventListener("click", (e) => {
          const deleteItem = e.target.parentNode;
          deleteItem.parentNode.removeChild(deleteItem);
          // 多分Nodeの指定をしなきゃいけないから何だと思う
          // console.log(e.target.parentNode);
        });
      });

      console.log(data);
    })
    .catch((err) => {
      console.error("Error Message => ", err);
    });
}

//READ
fetchButton.addEventListener("click", fetchPosts);


//↓授業の。データ扱い //
// async function createPost(title, content) {
//   try {
//     const post = {
//       title: title,
//       body: content,
//       userId: Math.random()
//     };

//     const result = await sendHttpRequest(
//       "POST",
//       "https://jsonplaceholder.typicode.com/posts",
//       post
//     );
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function deletePost(event){
//     if(event.target.tagName === "BUTTON"){

//         event.target.style.backgroundColor = "gray"
//         event.target.style.borderColor = "gray"
//         event.target.textContent = "Loading..."
//         event.target.disabled = true

//         const postToDelete = event.target.closest("li")
//         console.log(postToDelete);

//         const result = await sendHttpRequest("DELETE", "https://jsonplaceholder.typicode.com/posts/" + postToDelete.id)

//         if(result === "Delete successfully"){
//             this.removeChild(postToDelete)
//         }
//     }
// }

// //READ
// fetchButton.addEventListener("click", fetchPosts);

// //CREATE
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const enteredTitle = event.currentTarget.querySelector("#title").value;
//   const enteredContent = event.currentTarget.querySelector("#content").value;

//   createPost(enteredTitle, enteredContent);
// });

// //DELETE
// postList.addEventListener("click", deletePost);
// //