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
      console.log(one.style.marginTop, one.offsetHeight, one);
      const new_top = number_px(one.style.marginTop) + one.offsetHeight;
      two.style.marginTop = new_top;
      one.style.marginTop = "";
      infinite_scrolling.vessel.appendChild(one);
      infinite_scrolling.element.push(infinite_scrolling.element.shift(0));
    }
  }
  old_e = e;
});
let i = 0;

function create_item(params) {
  const item = document.createElement("div");
  // item.style.position = "absolute";
  item.innerHTML = `
  <div style="height:60px;">
  item  ${i++}
  <a href="<#=v.href#>">
  <img class="img" src="data:image/gif;base64,R0lGODdhAQABAPAAAP%2F%2F%2FwAAACwAAAAAAQABAEACAkQBADs%3D"
  data-src="<#=v.src#>">
  </img>
  <strong><#=v.title#></strong>
  <span class="writer"><#=v.writer#></span>
  <span class="good-num"><#=v.succNum#></span>
</a>
  </div>
`;
  return item;
}

for (let i = 0; i < 11; i++) {
  infinite_scrolling.element.push(create_item());
}
infinite_scrolling.render();

function number_px(str) {
  return Number(str.replace("px", ""));
}
