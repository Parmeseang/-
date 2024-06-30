

toggleDropdown=()=>{
    let dp = document.getElementById("myDropdown")
    dp.classList.toggle("chang");
    dp.classList.add("popup-nav");
    dp.addEventListener('animationend', function() {
        target.classList.remove('popup-nav');
      }, { once: true });
}


slide =()=>{
  let slide = document.getElementById("mypage2")
  slide.classList.toggle("chang");
  slide.classList.add("slide");
  slide.addEventListener('animationend', function() {
  target.classList.remove('slide');
}, { once: true });
}
