const container2 = document.querySelector(".container2");

const logout = document.getElementById("logout");
const addBookmarks = document.querySelector(".bookmarks_shop");
const BASE_URL = "https://openlibrary.org/people/mekBot/books";
const IMG_URL = "https://covers.openlibrary.org/b/olid";
const darkMode = document.querySelector(".dark_mode_s");
const lightMode = document.querySelector("#dark_mode");
const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const information = document.querySelector(".information");
const searchbar = document.querySelector(".searchbar");

logout.addEventListener("click", (e) => {
  localStorage.removeItem("password");
  localStorage.removeItem("user");
  window.location.href = "index.html";
});
darkMode.addEventListener("click", (e) => {
  header.setAttribute("class", "header_dark");
  hero.setAttribute("class", "hero_dark");
  information.setAttribute("class", "information_dark");
  searchbar.setAttribute("class", "searchbar_dark");
});
lightMode.addEventListener("click", (e) => {
  header.setAttribute("class", "header");
  hero.setAttribute("class", "hero");
  information.setAttribute("class", "information");
  searchbar.setAttribute("class", "searchbar");
});

const inInput = document.getElementById("inInput");
inInput.addEventListener("input", (e) => {
  if (e.target.value.length > 0) {
    searchbar.setAttribute("style", "display:block");
    const creatUl2 = () => {
      fetchData().then((item) => {
        let sum = 0;
        const reading_log = item.reading_log_entries;
        reading_log.map((reItem) => {
          const work = reItem.work;
          const booksLi = document.createElement("li");
          if (work.title === e.target.value) {
            if (sum === 0) {
              const search_books = document.createElement("div");
              search_books.setAttribute("class", "books");
              booksLi.innerHTML = `
            <div class="books_img">
            <img
              src="${IMG_URL}/${work.cover_edition_key}.jpg"
              alt="d"
              width="201"
              height="202"
            />
          </div>
          <div class="books_img_n">
            <h1>${work.title}</h1>
            <p>${work.author_names[0]}</p>
            <p>${work.first_publish_year}</p>
          </div>
          <div class="books_btn">
            <div>
              <button id="books_bookmarks">Bookmark</button>
              <a href="#"><button id="books_info">More Info</button></a>
            </div>
            <button id="books_read">Read</button>
          </div>`;
              const addBook = document.getElementById("books_info");
              console.log(addBook);
              search_books.appendChild(booksLi);
              searchbar.appendChild(search_books);
              sum++;
            }
          }
        });
      });
    };
    creatUl2();
  } else {
    searchbar.setAttribute("style", "display:none");
    searchbar.innerHTML = "";
  }
});

const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/currently-reading.json`);
    if (!response.ok) throw new Error(`colud not fetch data from ${BASE_URL}`);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
};
const creatUl = () => {
  fetchData().then((item) => {
    const books = document.querySelector(".books");
    const reading_log = item.reading_log_entries.slice(0, 6);
    reading_log.map((reItem) => {
      const work = reItem.work;
      const booksLi = document.createElement("li");
      booksLi.innerHTML = `
      <div class="books_img">
      <img
        src="${IMG_URL}/${work.cover_edition_key}.jpg"
        alt="d"
        width="201"
        height="202"
      />
    </div>
    <div class="books_img_n">
      <h1>${work.title}</h1>
      <p>${work.author_names[0]}</p>
      <p>${work.first_publish_year}</p>
    </div>
    <div class="books_btn">
      <div>
        <button id="books_bookmarks">Bookmark</button>
        <a href="#"><button id="books_info">More Info</button></a>
      </div>
      <button id="books_read">Read</button>
    </div>`;
      books.appendChild(booksLi);
    });
  });
};
creatUl();

setTimeout(function () {
  const bookmarks = document.querySelectorAll("#books_bookmarks");
  const bookInfo = document.querySelectorAll("#books_info");
  Array.from(bookmarks).map((item) => {
    item.addEventListener("click", (e) => {
      const bookmarksLi = document.createElement("li");
      const titul =
        item.parentElement.parentElement.parentElement.children[1].children[0]
          .textContent;
      const authorName =
        item.parentElement.parentElement.parentElement.children[1].children[1]
          .textContent;
      bookmarksLi.innerHTML = `
      <div class="bookmarks_shop_p">
                <h3>${titul}</h3>
                <p>${authorName}</p>
              </div>
      `;
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
        bookmarksLi.parentNode.removeChild(bookmarksLi);
      });
    });
  });
  Array.from(bookInfo).map((item) => {
    item.addEventListener("click", (e) => {
      container2.setAttribute("style", "display:flex;");
      const info_img = document.querySelector(".book_info");
      const book_photo =
        item.parentElement.parentElement.parentElement.parentElement.children[0].children[0].getAttribute(
          "src"
        );
      info_img.setAttribute("src", book_photo);
      const info_title = document.querySelector(".author_name");
      const published = document.querySelector(".published");
      info_title.textContent =
        item.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent;
      info_title.setAttribute("style", "color:blue;");
      published.textContent =
        item.parentElement.parentElement.parentElement.parentElement.children[1].children[2].textContent;
      published.setAttribute("style", "color:blue;");
      const info_delete = document.getElementById("info_delete");
      info_delete.addEventListener("click", (e) => {
        container2.setAttribute("style", "display:none;");
      });
    });
  });
}, 2000);
