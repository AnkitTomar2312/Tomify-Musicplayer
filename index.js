console.log("Welcome")

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('icon-below-gif');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "The-Search", filePath: "./songs/1.mp3", coverpath: "./covers/the-search.jpg"},
    {songName: "Fight Back", filePath: "./songs/2.mp3", coverpath: "./covers/fightback.jpg"},
    {songName: "Gangsta Secret", filePath: "./songs/3.mp3", coverpath: "./covers/secret.jpg"},
    {songName: "Begging", filePath: "./songs/4.mp3", coverpath: "./covers/begging.jpg"},
    {songName: "No Retreat", filePath: "./songs/5.mp3", coverpath: "./covers/retreat.jpg"},
    {songName: "Cold", filePath: "./songs/6.mp3", coverpath: "./covers/cold.jpg"},
]

songItems.forEach((element, i)=>{
    
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//handel Play/Pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused ||  audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.visibility="visible";
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity=0;
    }
       
})

//listen to events

audioElement.addEventListener('timeupdate', ()=>{
    
    //update Seekbar

progress = parseInt((audioElement.currentTime/audioElement.duration)*100)

myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.visibility="visible";
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })

    
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>5){
    songIndex = 0 ;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<0){
    songIndex = 0 ;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})