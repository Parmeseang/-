

toggleDropdown=()=>{
    let dp = document.getElementById("myDropdown")
    dp.classList.toggle("chang");
    dp.classList.add("popup-nav");
    dp.addEventListener('animationend', function() {
        target.classList.remove('popup-nav');
      }, { once: true });
}