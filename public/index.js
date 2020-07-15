

const links = ["Walls391489384080308.jpg","Walls391489384080308.jpg","Walls391489384080308.jpg","Walls391489384080308.jpg","Walls391489384080308.jpg","Walls391489384080308.jpg",]

for (link of links) {
    document.getElementById('pix').innerHTML += `<div>
    <a href=${link}>
    <img src=${link} alt="ok" width=120 />
    </a>
    </div>`;
  }