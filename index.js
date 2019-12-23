const vessel = document.getElementById("vessel");

const infinite_scrolling = {
  vessel,
  data: [],
  element: [],
  drag: false,
  render() {
    this.element.map((el) => this.vessel.appendChild(el));
  },
};

let old_e;

vessel.addEventListener("mousedown", function(e) {
  e.preventDefault();
  infinite_scrolling.drag = true;
});
vessel.addEventListener("mouseup", function(e) {
  infinite_scrolling.drag = false;
  old_e = undefined;
});
vessel.addEventListener("mousemove", function(e) {
  if (infinite_scrolling.drag == false) return;
  if (!old_e) return (old_e = e);
  const offset = { x: e.x - old_e.x, y: e.y - old_e.y };
  const one = infinite_scrolling.element[0];
  const two = infinite_scrolling.element[1];
  let top = one.style.marginTop || "";
  top = number_px(top) + offset.y;
  one.style.marginTop = top + "px";
  if (offset.y < 0) {
    /** 往上划 */
    /** 第二个元素到顶了，可以将第一个元素放到最下面 */
    if (two.offsetTop === 0) {
      const new_top = number_px(one.style.marginTop) + one.offsetHeight;
      two.style.marginTop = new_top;
      one.style.marginTop = "";
      infinite_scrolling.vessel.appendChild(one);
      infinite_scrolling.element.push(infinite_scrolling.element.shift(0));
    }
  } else {
    const l = infinite_scrolling.element.length;
    const one_end = infinite_scrolling.element[l - 1];
    const two_end = infinite_scrolling.element[l - 2];
    /** 倒数第二个元素到底了，可以将倒数第一放到最上*/
    if (two_end.offsetTop + two_end.offsetHeight === infinite_scrolling.vessel.offsetHeight) {
      const new_top = number_px(one.style.marginTop) - one.offsetHeight;
      one_end.style.marginTop = new_top + "px";
      one.style.marginTop = "";
      infinite_scrolling.vessel.insertBefore(one_end, one);
      infinite_scrolling.element.unshift(infinite_scrolling.element.pop(0));
    }
  }
  old_e = e;
});
let i = 0;

function create_item(params) {
  const item = document.createElement("div");
  item.innerHTML = `无限滚动 ${i++}`;
  item.style = `   text-align: center;
  height: 60px;`;
  return item;
}

for (let i = 0; i < 11; i++) {
  infinite_scrolling.element.push(create_item());
}
infinite_scrolling.render();

function number_px(str) {
  return Number(str.replace("px", ""));
}
