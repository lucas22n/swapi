let nextPageValue = null;
let firstPageValue = null;
let quantityOfPerson = 0;

const fetchdata = (url) => {
  const starwars = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const tarjetasContainer = document.getElementById("tarjetascontainer");
      while (tarjetasContainer.firstChild) {
        tarjetasContainer.removeChild(tarjetasContainer.firstChild);
      }

      data.results.forEach((result, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = `tarjeta${index}`;

        card.innerHTML = `
                    <p>NOMBRE: ${result.name}</p>
                    <p>COLOR DE PELO: ${result.hair_color}</p>
                    <p>COLOR DE OJOS: ${result.eye_color}</p>
                    <p>GENERO: ${result.gender}</p>
                    <a onclick="abrirModal('${result.homeworld}')">Ver Planeta</a>
                `;

        tarjetasContainer.append(card);
      });
      console.log("Next page: " + data.next);
      console.log("Previous page: " + data.previous);
      nextPageValue = data.next;
      previousPageValue = data.previous;
      quantityOfPerson = data.count;

      // Habilitar botones del paginador
      let previous = document.getElementById("prev");
      let firstpage = document.getElementById("firstpage");
      let nextpage = document.getElementById("next");
      let lastpage = document.getElementById("lastpage");

      if (data.previous == null) {
        prev.setAttribute("disabled", "");
        firstpage.setAttribute("disabled", "");
      } else {
        previous.removeAttribute("disabled");
        firstpage.removeAttribute("disabled");
      }

      if (data.next == null) {
        nextpage.setAttribute("disabled", "");
        lastpage.setAttribute("disabled", "");
      } else {
        nextpage.removeAttribute("disabled");
        lastpage.removeAttribute("disabled");
      }
    });
};

fetchdata("http://localhost:8080/");

// Paginador

// datas will be shown on pages
data = [
  "블랙베리",
  "블루베리",
  "산딸기",
  "크랜베리",
  "딸기",
  "레몬",
  "라임",
  "오렌지",
  "귤",
  "자몽",
  "바나나",
  "사과",
  "키위",
  "망고",
  "배",
  "포도",
  "파인애플",
  "복숭아",
  "수박",
];

//page data distribution
let pageContent = [];
let pcount = Math.floor(data.length / 5);
let fazlalik = 0;

Number.isInteger(data.length / 5) === false
  ? (fazlalik = data.length - Math.floor(data.length / 5) * 5)
  : null;

for (let i = 0; i < pcount; i++) {
  let pagec = "";
  for (let j = 1; j <= 5; j++) {
    let r = Math.floor(Math.random() * data.length);
    let content = data[r];
    data.splice(r, 1);
    pagec = pagec + "," + content;
  }
  pageContent.push(pagec);
}

if (fazlalik !== 0) {
  let pagec = "";
  for (let i = 0; i < data.length; i++) {
    pagec = pagec + "," + data[i];
  }
  pageContent.push(pagec);
}

let z = [];
for (l in pageContent) {
  let b = pageContent[l].split(",");
  b.shift();
  z.push(b);
}
pageContent = z;

// Grabbing the html elements
const prnt = document.getElementById("prnt");
const bg = document.getElementById("bg");
const page = document.getElementById("page");
const ul = document.getElementById("ul");
const nav = document.getElementById("nav");
const btns = document.getElementById("btns");
const left = document.getElementById("left");
const right = document.getElementById("right");
const c = document.getElementById("c");

// Background
bg.style.width = pageContent.length * 100 + "vw";
for (a in pageContent) {
  let bgs = document.createElement("div");
  bg.appendChild(bgs);
  bgs.style.width = "100vw";
  bgs.style.height = "100vh";
  bgs.style.position = "absolute";
  bgs.style.transition = "opacity .5s";
  bgs.setAttribute("id", "bg" + a);
  bgs.setAttribute("class", "bg");
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const r = parseInt(randomColor.slice(0, 2), 16);
  const g = parseInt(randomColor.slice(2, 4), 16);
  const b = parseInt(randomColor.slice(4, 6), 16);
  bgs.style.background =
    "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(" +
    r +
    "," +
    g +
    "," +
    b +
    "," +
    "1) 65%)";
}

// Bg animation
function animateTransition(cp) {
  const bgs = document.querySelectorAll(".bg");
  bgs.forEach((a, b) => {
    if (cp - 1 === b) {
      a.classList.add("fadeIn");
      a.classList.remove("fadeOut");
    } else {
      a.classList.add("fadeOut");
      a.classList.remove("fadeIn");
    }
  });
}

// Nav buttons summoning
for (a in pageContent) {
  let btn = document.createElement("button");
  btns.appendChild(btn);
  btn.setAttribute("id", "b" + (parseInt(a) + 1).toString());
  btn.setAttribute("class", "b");
  btn.setAttribute("onclick", "showPage(" + (parseInt(a) + 1).toString() + ")");
  let s = document.createElement("span");
  btn.appendChild(s);
  s.innerHTML = (parseInt(a) + 1).toString();
}

// Making buttons active
function buttonStuff(cp) {
  const btnss = document.querySelectorAll(".b");
  btnss.forEach((b, i) => {
    if (i === cp - 1) b.classList.add("active");
    else b.classList.remove("active");

    if (b.classList.contains("active")) {
      b.style.transition = "all .5s";
      const aa = document.getElementById("bg" + (parseInt(cp) - 1).toString());

      const rr = aa.style.background
        .split("rgb")
        .slice(-1)[0]
        .split("(")[1]
        .split(")")[0]
        .split(",")[0];
      const gg = aa.style.background
        .split("rgb")
        .slice(-1)[0]
        .split("(")[1]
        .split(")")[0]
        .split(",")[1]
        .trim();
      const bb = aa.style.background
        .split("rgb")
        .slice(-1)[0]
        .split("(")[1]
        .split(")")[0]
        .split(",")[2]
        .trim();
      b.style.background = "rgb(" + rr + "," + gg + "," + bb + ")";
    } else {
      b.style.background = "transparent";
    }

    // Showing or disabling three dots in the nav
    if (cp - 1 < 3) {
      left.style.display = "none";
      if (pageContent.length > 5) right.style.display = "inline";
      else right.style.display = "none";

      if (i > 4) {
        b.style.display = "none";
      } else {
        b.style.display = "inline";
      }
    } else if (cp > pageContent.length - 3) {
      right.style.display = "none";
      if (pageContent.length > 5) left.style.display = "inline";
      else left.style.display = "none";

      if (i < pageContent.length - 5) {
        b.style.display = "none";
      } else {
        b.style.display = "inline";
      }
    } else {
      left.style.display = "inline";
      right.style.display = "inline";
      if (i < cp - 3 || i > cp + 1) {
        b.style.display = "none";
      } else {
        b.style.display = "inline";
      }
    }
  });
}

let currentPage = 1;

function showPage(cp = 1) {
  buttonStuff(cp);
  animateTransition(cp);

  // Remove existing page content
  while (ul.lastElementChild) {
    ul.removeChild(ul.lastElementChild);
  }

  // Rgb grabbing
  const aa = document.getElementById("bg" + (parseInt(cp) - 1).toString());

  const rr = aa.style.background
    .split("rgb")
    .slice(-1)[0]
    .split("(")[1]
    .split(")")[0]
    .split(",")[0];
  const gg = aa.style.background
    .split("rgb")
    .slice(-1)[0]
    .split("(")[1]
    .split(")")[0]
    .split(",")[1]
    .trim();
  const bb = aa.style.background
    .split("rgb")
    .slice(-1)[0]
    .split("(")[1]
    .split(")")[0]
    .split(",")[2]
    .trim();

  // rgb
  const btnss = document.querySelectorAll(".b");
  btnss.forEach((b, i) => {
    if (i === cp - 1) {
      page.style.color = "rgb(" + rr + "," + gg + "," + bb + ")";
      prnt.style.boxShadow =
        "0px 0px 50px 10px rgba(" +
        rr +
        "," +
        gg +
        "," +
        bb +
        ",1), 0px 0px 50px 25px rgba(255,255,255,1)";
      prnt.style.border = "1px solid rgb(" + rr + "," + gg + "," + bb + ")";
    }
  });

  // Show new page
  currentPage = cp;

  page.innerHTML = cp;
  for (a in pageContent[cp - 1]) {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = pageContent[cp - 1][a];
  }
}

function firstPage() {
  fetchdata("http://localhost:8080/");
}

function prevPage() {
  fetchdata(previousPageValue);
}

function nextPage() {
  fetchdata(nextPageValue);
}

function lastPage() {
  if (previousPageValue == null && nextPageValue == null) {
    return;
  }

  if (previousPageValue == null) {
    const final = nextPageValue.substring(0, nextPageValue.length - 1);
    let lastPageNumberUrl = final + Math.ceil(quantityOfPerson / 10);
    fetchdata(lastPageNumberUrl);
  }
}

function abrirModal(url) {
  fetch(`http://localhost:8080/api/planet/?planet=${url}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let contenidomodal = document.getElementById("contenidomodal");
      contenidomodal.innerHTML = `Nombre: ${data.name} <br> Clima: ${data.climate} <br> Tierra: ${data.terrain} <br> Habitantes: ${data.population} <br> Gravedad: ${data.gravity} <br> Fecha de edición: ${data.edited}`;
      document.getElementById("miModal").style.display = "block";
    });
}

function cerrarModal() {
  document.getElementById("miModal").style.display = "none";
}

showPage();
