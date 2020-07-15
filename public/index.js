

const links = ["/Walls16.jpg","/Walls16.jpg","/Walls16.jpg","/Walls16.jpg","/Walls16.jpg","/Walls16.jpg"]

for (link of links) {
    document.getElementById('pix').innerHTML += `<div>
    <a href=${link}>
    <img src=${link} alt="ok" width=120 />
    </a>
    </div>`;
  }