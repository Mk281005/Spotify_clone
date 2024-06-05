console.log("hi");
let cur = new Audio();

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

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



const playnow = (tra) => {
  cur.src = "/songs/" + tra + "mp3";
  let pl = document.getElementById("play");

  pl.src = "pause.svg";
  cur.play();
  document.querySelector(".songinfo").innerHTML = tra;
  document.querySelector(".songdur").innerHTML="00:00/00:00"
 
  
};



async function main() {
  let songs = await getsongs();
  console.log(songs);

  let playlist = document.getElementsByClassName("playlist")[0];
  let ul = playlist.getElementsByTagName("ul")[0];
let i=0;
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
  Array.from(
    document.querySelector(".playlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playnow(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });
  let pl = document.getElementById("play");
  pl.addEventListener("click", () => {
    if (!cur.src) {
      let firstSong = document
        .querySelector(".playlist ul li .info .in")
        .innerHTML.trim();
      playnow(firstSong);
    } else if (cur.paused) {
      cur.play();
      pl.src = "pause.svg";
    } else {
      cur.pause();
      pl.src = "play2.svg";
    }
  });
  cur.addEventListener("timeupdate", () => {
    document.querySelector(".songdur").innerHTML=`${secondsToMinutesSeconds(cur.currentTime)}/ ${secondsToMinutesSeconds(cur.duration)}`;
    document.querySelector(".seek").style.left = `${(cur.currentTime/cur.duration)*100}%`;
    document.querySelector(".col").style.width = `${(cur.currentTime/cur.duration)*100}%`;
  });

 
  document.querySelector(".seekbar").addEventListener('click',e=>{
      let per=(e.offsetX/e.target.getBoundingClientRect().width)*100;
      document.querySelector(".seek").style.left = per+"%";
      cur.currentTime=((cur.duration)*per)/100;
  })}

main();
