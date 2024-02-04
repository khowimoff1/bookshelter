const container2 = document.querySelector(".container2");
const logout = document.getElementById("logout");
const bookmarks = document.querySelectorAll("#books_bookmarks");
const addBookmarks = document.querySelector(".bookmarks_shop");
const bookInfo = document.querySelectorAll("#books_info");
const BASE_URL = "https://openlibrary.org/people/mekBot/books";
const darkMode = document.querySelector('.dark_mode_s')
const lightMode = document.querySelector('#dark_mode')
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const information = document.querySelector('.information');

logout.addEventListener("click", (e) => {
  window.localStorage.removeItem("token");
  window.location.href = "login.html";
});
Array.from(bookmarks).map((item) => {
  item.addEventListener("click", (e) => {
    const bookmarksLi = document.createElement("li");
    const bookmarksDiv = document.createElement("div");
    const addbooks = document.createElement("h3");
    const addbooksP = document.createElement("p");
    bookmarksDiv.setAttribute("class", "bookmarks_shop_p");
    addbooks.textContent = "Python";
    addbooksP.textContent = "David M. Beazley";
    bookmarksDiv.appendChild(addbooks);
    bookmarksDiv.appendChild(addbooksP);
    bookmarksLi.appendChild(bookmarksDiv);
    addBookmarks.appendChild(bookmarksLi);

    const bookmarksDiv2 = document.createElement("div");
    const bookmarksOpen = document.createElement("img");
    bookmarksDiv2.setAttribute("class", "open_delete");
    bookmarksOpen.setAttribute("src", "./home/assests/image/book-open 1.svg");
    bookmarksOpen.setAttribute("alt", "open");
    bookmarksOpen.setAttribute("width", "24");
    bookmarksOpen.setAttribute("height", "24");
    const bookmarksDelete = document.createElement("img");
    bookmarksDelete.setAttribute("src", "./home/assests/image/delete 1.svg");
    bookmarksDelete.setAttribute("alt", "delete");
    bookmarksDelete.setAttribute("width", "24");
    bookmarksDelete.setAttribute("height", "24");
    bookmarksDiv2.appendChild(bookmarksOpen);
    bookmarksDiv2.appendChild(bookmarksDelete);
    bookmarksLi.appendChild(bookmarksDiv2);
    bookmarksDelete.addEventListener("click", (e) => {
      // e.target.parentElement.parentElement.removeItem
      console.log(bookmarksDiv2);
      bookmarksLi.parentNode.removeChild(bookmarksLi);
    });
  });
});
Array.from(bookInfo).map((item) => {
  item.addEventListener("click", (e) => {
    container2.setAttribute("style", "display:flex;");
    const info_img = document.querySelector(".book_info");
    const book_photo =
      item.parentElement.parentElement.parentElement.children[0].children[0].getAttribute(
        "src"
      );
    info_img.setAttribute("src", book_photo);
     
    const author_n = document.querySelector(".author_name");
    fetch(`${BASE_URL}/already-read.json`)
      .then((res) => res.json())
      .then((data) => {
        const bookApi = data.reading_log_entries;
        bookApi.map((item,index) => {
            const author_name = item.work.author_names
            Array.from(author_name).map(author=>{
                if(author === 'Dan Ariely'){
                    const author_a = document.createElement('a');
                    author_a.setAttribute("href",'#')
                    author_a.textContent = author
                    // author_n.appendChild(author_a)
                }
            })
        });
      });

    const info_delete = document.getElementById("info_delete");
    info_delete.addEventListener("click", (e) => {
      container2.setAttribute("style", "display:none;");
    });
  });
});
darkMode.addEventListener("click", (e) => {
    header.setAttribute('class', 'header_dark');
    hero.setAttribute('class', 'hero_dark');
    information.setAttribute('class', 'information_dark');
})
lightMode.addEventListener("click", (e) => {
    header.setAttribute('class', 'header');
    hero.setAttribute('class', 'hero');
    information.setAttribute('class', 'information');
})