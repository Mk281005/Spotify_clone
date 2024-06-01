console.log("hi");
async function getsongs(){
    let a = await fetch("http://127.0.0.1:5500/songs/");

    let response= await a.text();
    let div = document.createElement("div");
    div.innerHTML=response;
    let an = div.getElementsByTagName("a");
    // console.log(an);
    let song = [];
    for(let i=0;i<an.length;i++){
        const ele = an[i];
        // console.log(ele);
        // console.log(ele.href);
        if(ele.href.endsWith(".mp3")){
          song.push(ele.href);
        }
    }

    return song;

    
}
async function main(){
let songs= await getsongs();
console.log(songs)
}
main();