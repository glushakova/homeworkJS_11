let developer = {
  name: "Developers",
  id: 2,
  dept_units: []
};
let devLead = {
  name: "Lead Developers",
  id: 1,
  dept_units: [developer]
};
let devDeptHead = {
  name: "Development Management",
  id: 0,
  dept_units: [devLead],
  first: null
};
let qaTester = {
  name: "Testers",
  id: 5,
  dept_units: []
};
let qaLead = {
  name: "Lead QA",
  id: 4,
  dept_units: [qaTester]
};
let qaDeptHead = {
  name: "Quality Assurance Management",
  id: 3,
  dept_units: [qaLead],
  first: null
};

let base = [devDeptHead, devLead, developer, qaDeptHead, qaLead, qaTester];
let tree = base.filter((item) => item.first === null);

let container = document.getElementsByClassName("container")[0];
let htmlTreeParent = document.getElementsByClassName("html_tree")[0];

traverseTree(tree, htmlTreeParent);

function traverseTree(elements, parentEl) {
  if (!elements) {
    return;
  }
  elements.forEach(function (el) {
    let liEl = document.createElement("li");
    let spanText = document.createElement("span");
    let iEl = "<i class='fa fa-chevron-down'></i>";

    parentEl.appendChild(liEl);
    spanText.setAttribute("data-dept-id", el.id);
    liEl.appendChild(spanText);

    if (el.dept_units.length && el.dept_units) {
      spanText.innerHTML = iEl + el.name;
    } else {
      spanText.innerText = el.name;
    }

    if (el.dept_units.length !== 0) {
      let ulEl = document.createElement("ul");
      liEl.appendChild(ulEl);
      traverseTree(el.dept_units, ulEl);
    }
  });
}

let selectedItem = null;

const clickHandler = (event) => {
  if (event.target.tagName === "SPAN") {
    if (selectedItem) {
      selectedItem.classList.remove("choose");
    }

    selectedItem = event.target;
    selectedItem.classList.add("choose");
  }
};

const clickDown = (event) => {
  if (event.target.tagName === "I") {
    let liEl = event.target.parentElement.parentElement;

    if (event.target.classList.contains("collapsed")) {
      event.target.classList.add("fa-chevron-down");
      event.target.classList.remove("fa-chevron-right");
    } else {
      event.target.classList.add("fa-chevron-right");
      event.target.classList.remove("fa-chevron-down");
    }

    event.target.classList.toggle("collapsed");
    liEl.children[1].classList.toggle("transparent");
  }
};

const clickText = (event) => {
  if (event.target.tagName === "SPAN") {
    let deptId = event.target.getAttribute("data-dept-id");
    fetch(deptId + "_department.json")
      .then((response) => response.json())
      .then((data) => {
        select(data);
      });
  }
};

htmlTreeParent.addEventListener("click", clickHandler);
htmlTreeParent.addEventListener("click", clickText);
htmlTreeParent.addEventListener("click", clickDown);

let table = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
let trHead = document.createElement("tr");

container.appendChild(table);
table.appendChild(thead);
table.appendChild(tbody);
thead.appendChild(trHead);

["id", "name", "dept_unit_id", "tel", "salary"].map((el) => {
  let thHead = document.createElement("th");
  trHead.appendChild(thHead);
  thHead.innerText = el;
});

function rows (){
  const rows = Array.from(
    document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
  );
  if (rows.length) {
    rows.forEach((row) => tbody.removeChild(row));
  }
}

let salary = [];
function select(employeers) {
  rows()
  salary.length = 0
  
  employeers.forEach((employeer) => {
    let trBody = document.createElement("tr");
    tbody.appendChild(trBody);
    
    for (let key in employeer) {
      let tdBody = document.createElement("td");
      trBody.appendChild(tdBody);
      tdBody.innerText = employeer[key];

      if (key === "salary") {
        tdBody.classList.add("salary");
        salary.push(employeer[key]);
      }
    }
  });
  changeCurrency(salary);
}

let arr = [145, 292];
let currency = document.getElementsByClassName("currency")[0];

arr.forEach(function (id) {
  let option = document.createElement("option");
  fetch(`http://www.nbrb.by/API/exrates/currencies/${id}`)
    .then((response) => response.json())
    .then((date) => {
      currency.appendChild(option);
      option.innerText = date.Cur_Abbreviation;
      option.setAttribute("data-curr-id", id);
    });
});

function changeCurrency(value) {
  const selectedOption = Array.from(currency.options).find(
    (option) => option.innerText === currency.value
  );
  if (
    selectedOption.innerText !== "BYN" &&
    selectedOption.innerText !== "Choose salary currency"
  ) {
    fetch(
      `http://www.nbrb.by/API/ExRates/Rates/${selectedOption.getAttribute(
        "data-curr-id"
      )}`
    )
      .then((response) => response.json())
      .then((item) => {
        let rate = item.Cur_OfficialRate;
        getSum(rate, value);
      });
  } else {
    if (value) {
      getSumByn(value);
    }
  }
}

currency.onchange = function () {
  changeCurrency(salary);
};

let trCur = document.getElementsByClassName("salary");

function getSum(rate, value) {
  for (let i = 0; i < value.length; i++) {
    let newSalary = (value[i] / rate).toFixed(0);
    trCur[i].innerText = newSalary;
  }
}

function getSumByn(value) {
  for (let i = 0; i < value.length; i++) {
    let newSalary = value[i];
    trCur[i].innerText = newSalary;
  }
}

document.getElementsByTagName('button')[0].onclick = function (){
  if(tbody.children.length!==0){
    rows()
    selectedItem.classList.remove("choose")
  }
}

