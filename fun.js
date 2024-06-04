console.log("hi");
let cur= new Audio();
async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");

  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let an = div.getElementsByTagName("a");
  let song = [];
  for (let i = 0; i < an.length; i++) {
    const ele = an[i];

    if (ele.href.endsWith(".mp3")) {
      song.push(ele.href.split("/songs/")[1]);
    }
  }

  return song;
}
const playnow=(tra)=>{
  //  let audio = new Audio("/songs/"+tra+"mp3");
  cur.src="/songs/"+tra+"mp3";
   cur.play();
}
async function main() {
  let songs = await getsongs();
  console.log(songs);

  let playlist = document.getElementsByClassName("playlist")[0];
  let ul = playlist.getElementsByTagName("ul")[0];
  
  for (const son of songs) {
    let li = document.createElement("li");
    let s = son.replaceAll("%20", " ").replaceAll("mp3", "");
    li.innerHTML = ` 
  <img src="music.svg" class="invert" alt="">
  <div class="info">
      <div class="in">${s}</div>
  </div>
  <div class="playnow">
     
      <img src="play2.svg" class="invert" alt="">
  </div>`;
    ul.appendChild(li);
  }
  //play the song
  // var audio = new Audio(songs[0]);
  // audio.play();
  Array.from(document.querySelector(".playlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{
      playnow( e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
    
  });
}
main();

