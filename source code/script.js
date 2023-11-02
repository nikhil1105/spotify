let songs = [
    { songname: "Bohemian Rhapsody", filepath: "/Spotify/resources/songs/1.mp3", coverpath: "/Spotify/resources/covers/1.jpg" },
    { songname: "Smells Like Teen Spirit", filepath: "/Spotify/resources/songs/2.mp3", coverpath: "/Spotify/resources/covers/2.jpg" },
    { songname: "Imagine", filepath: "/Spotify/resources/songs/3.mp3", coverpath: "/Spotify/resources/covers/3.jpg" },
    { songname: "Billie Jean", filepath: "/Spotify/resources/songs/4.mp3", coverpath: "/Spotify/resources/covers/4.jpg" },
    { songname: "Like a Rolling Stone", filepath: "/Spotify/resources/songs/5.mp3", coverpath: "/Spotify/resources/covers/5.jpg" },
    { songname: "Hey Jude", filepath: "/Spotify/resources/songs/6.mp3", coverpath: "/Spotify/resources/covers/6.jpg" },
    { songname: "I Will Always Love You", filepath: "/Spotify/resources/songs/7.mp3", coverpath: "/Spotify/resources/covers/7.jpg" },
    { songname: "Hallelujah", filepath: "/Spotify/resources/songs/8.mp3", coverpath: "/Spotify/resources/covers/8.jpg" },
    { songname: "Shape of You", filepath: "/Spotify/resources/songs/9.mp3", coverpath: "/Spotify/resources/covers/9.jpg" },
    { songname: "Gangnam Style", filepath: "/Spotify/resources/songs/10.mp3", coverpath: "/Spotify/resources/covers/10.jpg" }
]

const slistmain = document.getElementById("songlistmain");
let i = 1;

songs.forEach(element => {
    const sl = document.createElement("div");
    sl.classList.add("songlist");
    const img = document.createElement("img");
    img.src = element.coverpath;
    img.alt = "";
    const sname = document.createElement("span");
    sname.innerHTML = element.songname;

    const splaylist = document.createElement("span")
    splaylist.classList.add("songlistplay");

    const tstamp = document.createElement("span");
    tstamp.innerHTML = "05.33";


    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "songitemplay", "fa-circle-play");
    icon.id = i++;
    splaylist.appendChild(tstamp);
    splaylist.appendChild(icon);
    sl.appendChild(img);
    sl.appendChild(sname);
    sl.appendChild(splaylist);
    slistmain.appendChild(sl);
});

var audelement = new Audio("/Spotify/resources/songs/1.mp3");
const gif = document.getElementById("gif");
const playbutton = document.getElementById("playbtn");
const back = document.getElementById("back");
const next = document.getElementById("next");

const bar = document.getElementById("bar");
let songnumber = 0;

playbutton.addEventListener("click", () => {
    if (audelement.paused || audelement.currentTime <= 0) {
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

    } else {
        audelement.pause();
        playbutton.classList.remove("fa-circle-pause");
        playbutton.classList.add("fa-circle-play");
        gif.style.opacity = 0;

    }
})



bar.addEventListener("change", () => {
    audelement.currentTime = (bar.value * audelement.duration / 100);
})


back.addEventListener("click", () => {
    if (songnumber > 0) {
        songnumber = parseInt(songnumber);
        songnumber--;
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        songnumber = parseInt(songnumber);
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

    }

})


next.addEventListener("click", () => {
    if (songnumber == songs.length - 1) {
        songnumber = parseInt(songnumber);
        songnumber = 0;
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;


    } else if (songnumber == 0) {

        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        songnumber = 0.1;


    }
    else {
        songnumber = parseInt(songnumber);

        songnumber++;
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;


    }
})

audelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audelement.currentTime / audelement.duration) * 100);
    bar.value = progress;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener("click", (ele) => {
        if (audelement.played && audelement.src.slice(-5)==(element.id+".mp3" ) && !(audelement.paused) ) {
            element.classList.remove("fa-circle-pause");
            element.classList.add("fa-circle-play");
            playbutton.classList.add("fa-circle-play");
            audelement.pause();
            gif.style.opacity = 0;

        } else {
            console.log("in else ",audelement.played,audelement.src);
            makeAllPlays();
            element.classList.remove("fa-circle-play");
            element.classList.add("fa-circle-pause");
            playbutton.classList.add("fa-circle-pause");
            audelement.src = "/Spotify/resources/songs/" + parseInt(element.id) + ".mp3";
            audelement.currentTime = 0;
            audelement.play();
            gif.style.opacity = 1;
        }


    })
})

