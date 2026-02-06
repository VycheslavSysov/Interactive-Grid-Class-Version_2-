const CELL = 50;
const GAP = 2;
const STEP = CELL + GAP;

function toggleButton(btn, show, transform = "") {
  btn.style.display = show ? "block" : "none";
  if (show) btn.style.transform = transform;
}

class Table {
  constructor(parentEl, rows = 4, cols = 4) {
    let rowCount = rows;
    let colCount = cols;
    let hoverRow = null;
    let hoverCol = null;

    const root = document.createElement("div");
    root.className = "wrapper";
    root.innerHTML = `
      <button class="btn add add-col" type="button">+</button>
      <button class="btn add add-row" type="button">+</button>
      <div class="grid"></div>
      <button class="btn del del-row" type="button">−</button>
      <button class="btn del del-col" type="button">−</button>
    `;
    parentEl.appendChild(root);

    const grid = root.querySelector(".grid");
    const addRowBtn = root.querySelector(".add-row");
    const addColBtn = root.querySelector(".add-col");
    const delRowBtn = root.querySelector(".del-row");
    const delColBtn = root.querySelector(".del-col");

    const updateHoverButtons = () => {
      toggleButton(
        delRowBtn,
        rowCount > 1 && hoverRow !== null,
        `translateY(${hoverRow * STEP}px)`
      );

      toggleButton(
        delColBtn,
        colCount > 1 && hoverCol !== null,
        `translateX(${hoverCol * STEP}px)`
      );
    };

    const render = () => {
      grid.innerHTML = "";
      grid.style.gridTemplateColumns = `repeat(${colCount}, ${CELL}px)`;

      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          grid.insertAdjacentHTML(
            "beforeend",
            `<div class="cell" data-row="${r}" data-col="${c}"></div>`
          );
        }
      }

      updateHoverButtons();
    };

    const bindEvents = () => {
      grid.addEventListener("mousemove", e => {
      const cell = e.target.closest(".cell");
      if (!cell) return;

      const nextRow = +cell.dataset.row;
      const nextCol = +cell.dataset.col;
      if (nextRow === hoverRow && nextCol === hoverCol) return;

      hoverRow = nextRow;
      hoverCol = nextCol;
      updateHoverButtons();
    });

      grid.addEventListener("mouseleave", e => {
      if (!e.relatedTarget?.classList?.contains("del")) {
        hoverRow = null;
        hoverCol = null;
        updateHoverButtons();
      }
    });

    const hideDeleteButtons = () => {
      hoverRow = null;
      hoverCol = null;
      updateHoverButtons();
    };

      delRowBtn.addEventListener("mouseleave", hideDeleteButtons);
      delColBtn.addEventListener("mouseleave", hideDeleteButtons);

      delRowBtn.addEventListener("click", e => {
      e.stopPropagation();
      if (rowCount > 1) rowCount--;
      hoverRow = null;
      render();
    });

      delColBtn.addEventListener("click", e => {
      e.stopPropagation();
      if (colCount > 1) colCount--;
      hoverCol = null;
      render();
    });

      addRowBtn.addEventListener("click", () => {
      rowCount++;
      render();
    });

      addColBtn.addEventListener("click", () => {
      colCount++;
      render();
    });
    };

    bindEvents();
    render();

    return { root };
  }
}

const tablesRoot = document.getElementById("tables");
const table1 = new Table(tablesRoot);
const table2 = new Table(tablesRoot);
const table3 = new Table(tablesRoot);
const table4 = new Table(tablesRoot);
const table5 = new Table(tablesRoot);/*...And so on...*/
