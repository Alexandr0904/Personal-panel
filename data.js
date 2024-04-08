let arrUsers = [
  {
    name: "Мухамад",
    age: 21,
    img: "https://mixnews.lv/wp-content/uploads/2020/04/20/2020-04-20-mixnews-grandbeauty07.jpg",
    work: "frontend",
  },
  {
    name: "Эльвина",
    age: 18,
    img: "https://bigpicture.ru/wp-content/uploads/2019/04/grandbeauty00.jpg",
    work: "frontend",
  },
  {
    name: "Лера",
    age: 25,
    img: "https://bigpicture.ru/wp-content/uploads/2019/04/grandbeauty19.jpg",
    work: "backend",
  },
  {
    name: "Андрей",
    age: 34,
    img: "https://icdn.lenta.ru/images/2023/06/13/14/20230613143659473/square_320_d7cc02278ab94292d3c3b4bae62fbc4e.jpg",
    work: "backend",
  },
  {
    name: "Владилен",
    age: 25,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZBlARNmfW_t6Skqd_EhTUROr3LGPLOjBcNw&usqp=CAU",
    work: "manager",
  },
  {
    name: "Антоха",
    age: 21,
    img: "https://storedigital.ru/wp-content/uploads/2020/02/1st.png",
    work: "manager",
  },
];
let btns = document.querySelectorAll(".personal__btn");
let container = document.querySelector(".personal__body");
let template = document.querySelector(".template");
let minAge = document.querySelector(".min__age");
let maxAge = document.querySelector(".max__age");
let filterBtn = document.querySelector(".filter__btn");
let search = document.querySelector(".search");
let btnSearch = document.querySelector(".btn__search");
let select = document.querySelector(".sort__select");

select.onchange = sortUsers;
function sortUsers() {
  console.log(select.value);
  let value = select.value;
  if (value == "words") {
    arrUsers.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }
  if (value == "max-age") {
    arrUsers.sort(function (a, b) {
      return a.age - b.age;
    });
  }
  if (value == "min-age") {
    arrUsers.sort(function (a, b) {
      return b.age - a.age;
    });
  }
  if (value == "") {
    arrUsers.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  }
  renderUsers(arrUsers);
}

filterBtn.onclick = filterAge;
btns.forEach(function (item) {
  item.onclick = () => changeCategory(item);
});
btnSearch.onclick = clearSearch;
function clearSearch() {
  search.value = "";
  renderUsers(arrUsers);
}

search.oninput = searchUsers;
function searchUsers() {
  let value = search.value;
  let filterUsers = arrUsers.filter(function (item) {
    return item.name.toLowerCase().includes(value.toLowerCase());
  });
  renderUsers(filterUsers);
}
function changeCategory(item) {
  btns.forEach(function (item) {
    item.classList.remove("btn-active");
  });
  item.classList.add("btn-active");
  let category = item.innerHTML.toLowerCase();
  if (category != "all") {
    let filterUsers = arrUsers.filter(function (item) {
      return item.work == category;
    });
    renderUsers(filterUsers);
  } else {
    renderUsers(arrUsers);
  }
}
function renderUsers(arr) {
  console.log(arr);
  container.innerHTML = null;
  arr.forEach(function (item) {
    let clone = template.content.cloneNode(true); // копируем содержимое шаблона
    let img = clone.querySelector(".personal__img");
    img.src = item.img;
    let name = clone.querySelector(".personal__name");
    name.innerHTML = item.name;
    let age = clone.querySelector(".personal__value");
    age.innerHTML = item.age;
    container.append(clone);
  });
}
renderUsers(arrUsers);
function filterAge() {
  let min = minAge.value;
  let max = maxAge.value;
  let filterUsers = arrUsers.filter(function (item) {
    return item.age >= min && item.age <= max;
  });
  renderUsers(filterUsers);
}
