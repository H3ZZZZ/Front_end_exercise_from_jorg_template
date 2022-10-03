import "./style.css";
import jokeFacade from "./jokeFacade.js";
document.getElementById("all-content").style.display = "block";
const jokeButton = document.getElementById("getJokeButton")
const addJokebtn = document.getElementById("addJokeButton")
const getQuotebtn = document.getElementById("quoteButton")
const fUserButton = document.getElementById("fUserBtn")
const addUserButton = document.getElementById("addbtn")
const editUserButton = document.getElementById("editbtn")
const deleteUserButton = document.getElementById("deletebtn")

/*
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */

/* JS For Exercise-2 below */

/* JS For Exercise-3 below */

/*
 If you do not understand the code below, don´t worry, it is not necessary for completing the exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none";
  document.getElementById("ex1_html").style = "display:none";
  document.getElementById("ex2_html").style = "display:none";
  document.getElementById("ex3_html").style = "display:none";
  document.getElementById(idToShow).style = "display:block";
}



function getQuote () {
  const output = document.getElementById("quote")
  const url = "https://api.chucknorris.io/jokes/random"
  const quoteInterval = setInterval(() => {
    fetch(url)
        .then(res => res.json())
        .then(data => output.innerText = data.value)
  }, 5000)
}


function getJokeById() {
  const jokeOutput = document.getElementById("jokeText")
  const jokeIdInput = document.getElementById("jokeid")
  const joke = jokeFacade.getJokeById(jokeIdInput.value-1)
  console.log(joke)
  jokeOutput.innerText = joke
}

function addNewJoke() {
  const addJokeinput = document.getElementById("jokeToAdd")
  jokeFacade.addJoke(addJokeinput.value)
  addJokeinput.value = ""
  const jokes = jokeFacade.getJokes();
  const jokeList = document.getElementById("jokes")
  jokeList.innerHTML = jokes.map((joke) => `<li>${joke}</li>`).join("")
}

const getAllUsers = () => {
  const url = "http://localhost:3333/api/users/"
  const table = document.getElementById("allUserRows")
  fetch(url)
      .then(res => res.json())
      .then(data => table.innerHTML = data.map((el) =>
          `<tr><td>${el.id}</td>  
           <td>${el.age}</td>
           <td>${el.name}</td>
           <td></td>
           <td>${el.gender}</td>
           <td>${el.email}</td><tr/>`
      ).join(""))
}

const getUserById = () => {
  const url = "http://localhost:3333/api/users/"
  const id = document.getElementById("fUserInput")
  const output = document.getElementById("fUserOutput")

  fetch(url + id.value)
      .then(res => res.json())
      .then(data => output.innerText = Object.values(data).join(", "))
}

function handleHttpErrors(res){
  if(!res.ok){
    return Promise.reject({status: res.status, fullError: res.json() })
  }
  return res.json();
}

function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

const addUser = () => {
  const url = "http://localhost:3333/api/users"
  const age = document.getElementById("age")
  const name = document.getElementById("name")
  const gender = getRadioValue("addgender")
  const email = document.getElementById("email")
  const toAdd = {
    age: age.value,
    name: `${name.value}`,
    gender: `${gender}`,
    email: `${email.value}`,
  }
  console.log(JSON.stringify(toAdd))
  const options = makeOptions("POST", toAdd)
  fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  getAllUsers()
}

function getRadioValue(theRadioGroup) {
  var elements = document.getElementsByName(theRadioGroup);
  for (var i = 0, l = elements.length; i < l; i++) {
    if (elements[i].checked) {
      return elements[i].value;
    }
  }
}

const editUser = () => {
  const id = document.getElementById("userId")
  const age = document.getElementById("editage")
  const name = document.getElementById("editname")
  const gender = getRadioValue("gender")
  const email = document.getElementById("editemail")
  const url = "http://localhost:3333/api/users/" + id.value;
  const toEdit = {
    age: age.value,
    name: `${name.value}`,
    gender: `${gender}`,
    email: `${email.value}`,
  }
  console.log(JSON.stringify(toEdit))
  const options = makeOptions("PUT", toEdit)
  fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  getAllUsers()
  id.value = ""
  age.value = ""
  name.value = ""
  email.value = ""
}

const deleteUser = () => {
  const id = document.getElementById("deleteId")
  const url = "http://localhost:3333/api/users/" + id.value;
  fetch(url, {method: "DELETE"})
  getAllUsers()
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1":
      hideAllShowOne("ex1_html");
      const jokes = jokeFacade.getJokes();
      const jokeList = document.getElementById("jokes")
        jokeList.innerHTML = jokes.map((joke) => `<li>${joke}</li>`).join("")
        jokeButton.addEventListener("click", getJokeById)
        addJokebtn.addEventListener("click", addNewJoke)
      break;
    case "ex2":
      hideAllShowOne("ex2_html");
      // getQuotebtn.addEventListener("click", getQuote)
        getQuote();
      break;
    case "ex3":
      hideAllShowOne("ex3_html");
      getAllUsers()
        fUserButton.addEventListener("click", getUserById)
        addUserButton.addEventListener("click", addUser)
        editUserButton.addEventListener("click", editUser)
        deleteUserButton.addEventListener("click", deleteUser)
      break;
    default:
      hideAllShowOne("about_html");
      break;
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");
