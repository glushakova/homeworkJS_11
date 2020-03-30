const employeers = [
  {
    id: 0,
    name: "YarikHead",
    dept_unit_id: 0,
    tel: "123-123-3",
    salary: 3000
  },
  {
    id: 1,
    name: "MashaLead",
    dept_unit_id: 1,
    tel: "123-123-3",
    salary: 2000
  },
  {
    id: 2,
    name: "SashaLead",
    dept_unit_id: 1,
    tel: "123-123-3",
    salary: 2200
  },
  {
    id: 3,
    name: "MirraDev",
    dept_unit_id: 2,
    tel: "123-123-3",
    salary: 1200
  },
  {
    id: 4,
    name: "IraDev",
    dept_unit_id: 2,
    tel: "123-123-3",
    salary: 1000
  },
  {
    id: 5,
    name: "DanikHead3",
    dept_unit_id: 3,
    tel: "123-123-33",
    salary: 3000
  },
  {
    id: 7,
    name: "KoliaLead",
    dept_unit_id: 4,
    tel: "123-123-3",
    salary: 2000
  },
  {
    id: 6,
    name: "OliaLead3",
    dept_unit_id: 4,
    tel: "123-123-3",
    salary: 2200
  },
  {
    id: 9,
    name: "SienaTest",
    dept_unit_id: 5,
    tel: "123-123-3",
    salary: 1000
  },
  {
    id: 8,
    name: "LenaTest",
    dept_unit_id: 2,
    tel: "123-123-3",
    salary: 1200
  }
];

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
  dept_units: [devLead]
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
  dept_units: [qaLead]
};

let base = [devDeptHead, devLead, developer, qaDeptHead, qaLead, qaTester];
let tree = base.filter(item => item.name.includes("Management"));

let container = document.getElementsByClassName("container")[0];
let htmlTreeParent = document.getElementsByClassName("html_tree")[0];

traverseTree(tree, htmlTreeParent);

function traverseTree(elements, parentEl) {
  if (!elements) {
    return;
  }
  elements.forEach(function(el) {
    let liEl = document.createElement("li");
    let spanDown = document.createElement("span");
    let spanRight = document.createElement("span");
    let spanText = document.createElement("span");

    parentEl.appendChild(liEl);
    spanText.innerText = el.name;
    spanDown.innerText = "▽";
    spanRight.innerText = "▷";

    liEl.appendChild(spanDown);
    liEl.appendChild(spanRight);
    liEl.appendChild(spanText);

    spanDown.classList.add("transparent");

    if (el.dept_units.length !== 0) {
      let ulEl = document.createElement("ul");
      liEl.appendChild(ulEl);
      ulEl.classList.add("close");
      traverseTree(el.dept_units, ulEl);
    }
  });
}

const clickHandler = event => {
  const list = [...event.target.parentElement.children].find(
    el => el.tagName === "UL"
  );
  if (list) {
    list.classList.contains("close")
      ? list.classList.remove("close")
      : list.classList.add("close");
  }
};

const clickDown = event => {
  const down = [...event.target.parentElement.children].find(
    el => el.tagName === "SPAN"
  );

  const right = [...event.target.parentElement.children].filter(
    el => el.tagName
  );

  const children = [...event.target.parentElement.children].filter(
    el => el.tagName === "UL"
  );

  down.classList.contains("transparent")
    ? down.classList.remove("transparent")
    : down.classList.add("transparent");

  right[1].classList.contains("transparent")
    ? right[1].classList.remove("transparent")
    : right[1].classList.add("transparent");
};

const clickText = event => {
  base.forEach(item_one => {
    if (item_one.name == event.target.childNodes[0].textContent) {
      select(
        employeers.filter(item_two => item_one.id == item_two.dept_unit_id)
      );
    }
  });
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

["id", "name", "dept_unit_id", "tel", "salary"].map(el => {
  let thHead = document.createElement("th");
  trHead.appendChild(thHead);
  thHead.innerText = el;
});

function select(employeers) {
  const rows = Array.from(
    document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
  );
  if (rows.length) {
    rows.forEach(row => tbody.removeChild(row));
  }

  employeers.forEach(employeer => {
    let trBody = document.createElement("tr");
    tbody.appendChild(trBody);
    for (let key in employeer) {
      let tdBody = document.createElement("td");
      trBody.appendChild(tdBody);
      tdBody.innerText = employeer[key];
    }
  });
}
