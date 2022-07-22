$(window).on('load', function () {
  $('.preloader-div').delay(5200).fadeOut(1000);
  // $(".navbar").addClass("fixed-top");
});

$(document).ready(function () {
  // banner slider
  VanillaTilt.init(document.querySelectorAll('.cards-music'), {
    max: 25,
    speed: 400,
  });
});
$(document).ready(function () {
  $('.navbar li').click(function () {
    $('.navbar li').removeClass('active');
    var $this = $(this);
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });
});

// Start Music Section
let curr_track = document.createElement('audio');
let isPlaying = false;
let isRandom = false;
let track_index = 0;

let updateTimer;

const music_list = [
  {
    img: '../assets/img/marting.jpg',
    name: 'Martin Garrix',
    song: 'so-far-away',
    music: '../assets/music/1.mp3',
  },
  {
    img: '../assets/img/kygo.jpg',
    name: 'Avicii',
    song: 'song name',
    music: '../assets/music/2.mp3',
  },
  {
    img: '../assets/img/illenium.jpg',
    name: 'chainsmoker',
    song: 'song name',
    music: '../assets/music/3.mp3',
  },
];
loadTrack(track_index);
function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();
  seekTo();
  curr_track.src = music_list[track_index].music;
  curr_track.load();
  $('.photo').css(
    'background-image',
    'url(' + music_list[track_index].img + ')'
  );
  $('.track_song').text(music_list[track_index].song);
  $('.track_artist').text(music_list[track_index].name);
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener('ended', nextTrack);
  random_bg_color();
}
function random_bg_color() {
  var colorR = Math.floor(Math.random() * 256);
  var colorG = Math.floor(Math.random() * 256);
  var colorB = Math.floor(Math.random() * 256);
  var angle = 'to right';
  $('.music-section').css(
    'background-color',
    'rgb(' + colorR + ',' + colorG + ',' + colorB + ')'
  );
  $('.stoker').css(
    'background',
    'rgb(' + colorR + ',' + colorG + ',' + colorB + ')'
  );
}

function reset() {
  $('.current-time').text('00:00');
  $('.total-duration').text('00:00');
  $('.seek-slider').val('12');
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  $('.randomIcon').addClass('randomActive');
}
function pauseRandom() {
  isRandom = false;
  $('.randomIcon').removeClass('randomActive');
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  $('#wave').addClass('loader');
  $('.playpause-track').html('<i class="fa fa-pause-circle fa-5x fs-5"></i>');
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  $('#wave').removeClass('loader');
  $('.playpause-track').html('<i class="fa fa-play-circle fa-5x fs-5"></i>');
}
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom == false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom == true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
var total_duration = document.querySelector('.total-duration');
var current_time = document.querySelector('.current-time');
let seek_slider = document.querySelector('.seek-slider');
function seekTo() {
  let seek_slider = document.querySelector('.seek-slider');
  let seekto = curr_track.duration * (seek_slider.value / 100);
  // curr_track.currentTime = seekTo;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = '0' + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = '0' + durationMinutes;
    }

    current_time.textContent = currentMinutes + ':' + currentSeconds;
    total_duration.textContent = durationMinutes + ':' + durationMinutes;
  }
}
// End Music Section
// Start AboutUs
$(document).ready(function () {
  let slickPrimary = {
    autoplay: true,
    autoplaySpeed: 2400,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 1800,
    cssEase: 'cubic-bezier(.84, 0, .08, .99)',
    asNavFor: '.aboutUs-text-content',
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  };
  let slickSecondary = {
    autoplay: true,
    autoplaySpeed: 2400,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 1800,
    asNavFor: '.aboutUs-image-slider',
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  };
  $('.aboutUs-image-slider').slick(slickPrimary);
  $('.aboutUs-text-content').slick(slickSecondary);
});
// End AboutUs
