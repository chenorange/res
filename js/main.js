function barChange(node) {  //技能条状态切换
    target = document.querySelector("section.portfolio nav div.progress");
    switch (node.id) {
        case "all":
            target.style.width = "20%";
            target.style["margin-left"] = "0";
            break;
        case "original":
            target.style.width = "18%";
            target.style["margin-left"] = "30%";
            break;
        case "originalJsAndCSS":
            target.style.width = "36%";
            target.style["margin-left"] = "64%";
            break;
        default:
            break;
    }
}

window.onscroll = ((event) => { 
    if (window.scrollY > 0) {
        topNavBar.classList.add("sticky");
    }else{
        topNavBar.classList.remove("sticky");
    }
    let specialNodes = document.querySelectorAll("[specialNode]");
    let nearestIndex = 0;
    for (const key in specialNodes) {
        if (specialNodes.hasOwnProperty(key)) {
            if (Math.abs(specialNodes[key].offsetTop - window.scrollY) < Math.abs(specialNodes[nearestIndex].offsetTop - window.scrollY)) {
                nearestIndex = key;
            }
        }
    }
    let relativeLi = document.querySelector("a[href='#" + specialNodes[nearestIndex].id + "'").parentElement;
    let sonLis = relativeLi.parentElement.children;
    for (const li of sonLis) {
        li.classList.remove("highlight");
    }
    relativeLi.classList.add("highlight");
});

let lis = document.querySelectorAll("div.topNavBar>nav>ul>li");

for (const li of lis) {
    li.onmouseenter = ((event) => {
        event.target.classList.add("active");
    });
    li.onmouseleave = ((event) => {
        event.target.classList.remove("active");
    });
    li.onclick = ((event) => {
        if (event.target.className === "linkOutside") {
            return;
        }
        event.preventDefault();
        try {
            let id = event.target.getAttribute("href");
            let element = document.querySelector(id);
            window.scrollTo({left:0, top: element.offsetTop - 100, behavior:"smooth"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

