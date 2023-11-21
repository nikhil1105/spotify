let songs = [
    { songname: "Believer", filepath: "./resources/songs/1.mp3", coverpath: "/resources/covers/1.jpg" },
    { songname: "Thunder", filepath: "/resources/songs/2.mp3", coverpath: "/resources/covers/2.jpg" },
    { songname: "Girls Like You", filepath: "/resources/songs/3.mp3", coverpath: "/resources/covers/3.jpg" },
    { songname: "Shape of You", filepath: "/resources/songs/4.mp3", coverpath: "/resources/covers/4.jpg" },
    { songname: "Perfect", filepath: "/resources/songs/5.mp3", coverpath: "/resources/covers/5.jpg" },
    { songname: "Baby", filepath: "/resources/songs/6.mp3", coverpath: "/resources/covers/6.jpg" },
    { songname: "Beautiful Mistakes", filepath: "/resources/songs/7.mp3", coverpath: "/resources/covers/7.jpg" },
    { songname: "Memories", filepath: "/resources/songs/8.mp3", coverpath: "/resources/covers/8.jpg" }

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
    sname.id = "songname" + i;
    sname.innerHTML = element.songname;

    const splaylist = document.createElement("span")
    splaylist.classList.add("songlistplay");



    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "songitemplay", "fa-circle-play");
    icon.id = i++;
    splaylist.appendChild(icon);
    sl.appendChild(img);
    sl.appendChild(sname);
    sl.appendChild(splaylist);
    slistmain.appendChild(sl);
});

var audelement = new Audio("/resources/songs/1.mp3");
const gif = document.getElementById("gif");
const playbutton = document.getElementById("playbtn");
const back = document.getElementById("back");
const next = document.getElementById("next");

const bar = document.getElementById("bar");
let songnumber = 0;
let songstart = false;

playbutton.addEventListener("click", () => {
    if (audelement.paused || audelement.currentTime <= 0) {
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        control();

    } else {
        audelement.pause();
        playbutton.classList.remove("fa-circle-pause");
        playbutton.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {

            if (parseInt(audelement.src.slice(-5).charAt(0)) == parseInt(element.id)) {
                makeAllPlays();
                element.classList.remove("fa-circle-pause");
                element.classList.add("fa-circle-play");
                document.getElementById("sname").innerHTML = document.getElementById("songname" + parseInt(element.id)).innerHTML;
            }

        })


    }

})



bar.addEventListener("change", () => {
    console.log(audelement.currentTime);
    console.log(audelement.duration);
    console.log(bar.value);
    console.log(bar.value * audelement.duration / 100);
    audelement.currentTime = parseInt(bar.value * audelement.duration / 100);
    
})


back.addEventListener("click", () => {
    if (songstart==false) {
        songnumber++;
        songstart=true;
    }
    songnumber--;
    if (songnumber < 0) {
        songnumber = songs.length - 1;
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        

    }
    else if (songnumber == 0) {
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        
    }
    else {

        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        
    }

    control();
})


next.addEventListener("click", () => {
    if (songstart==false) {
        songnumber--;
        songstart=true;
    }
    songnumber++;
    if (songnumber == songs.length) {
        songnumber = 0;
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;


    } else if (songnumber == 0) {
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }


    else {
        audelement.src = songs[parseInt(songnumber)].filepath;
        audelement.currentTime = 0;
        audelement.play();
        playbutton.classList.remove("fa-circle-play");
        playbutton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        



    }
    control();
})

audelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audelement.currentTime / audelement.duration) * 100);
    bar.value = progress;
    if (audelement.currentTime == audelement.duration) {
        if (songstart == true) {
            songstart = false;
            songnumber++;
        }
        songnumber++;
        audelement.src = "/resources/songs/" + parseInt(songnumber) + ".mp3";
        audelement.currentTime = 0;
        audelement.play();
        gif.style.opacity = 1;
    }
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener("click", (ele) => {
        if (audelement.played && audelement.src.slice(-5) == (element.id + ".mp3") && !(audelement.paused)) {
            element.classList.remove("fa-circle-pause");
            element.classList.add("fa-circle-play");
            playbutton.classList.remove("fa-circle-pause");
            playbutton.classList.add("fa-circle-play");
            audelement.pause();
            gif.style.opacity = 0;


        } else {
            makeAllPlays();
            element.classList.remove("fa-circle-play");
            element.classList.add("fa-circle-pause");
            playbutton.classList.remove("fa-circle-play");
            playbutton.classList.add("fa-circle-pause");
            audelement.src = "/resources/songs/" + parseInt(element.id) + ".mp3";
            audelement.currentTime = 0;
            audelement.play();
            gif.style.opacity = 1;
        }
        document.getElementById("sname").innerText = songs[parseInt(element.id - 1)].songname;

    })
})

const control = () => {


    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {

        if (parseInt(audelement.src.slice(-5).charAt(0))==(element.id)) {
            makeAllPlays();
            element.classList.remove("fa-circle-play");
            element.classList.add("fa-circle-pause");
            document.getElementById("sname").innerText = songs[parseInt(element.id - 1)].songname;
        }

    })



}

