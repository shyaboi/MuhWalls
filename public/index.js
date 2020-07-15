

const links = ["Walls391489384080308.jpg","Walls391489384080308.jpg"]

for (link of links) {
  const benis = link.slice(0,5)
    document.getElementById('pix').innerHTML += `<div id="picBox">
    <a href=${link}>
    <img src=${link} alt="ok" />${benis}
    </a>
    </div>`;
  }



  