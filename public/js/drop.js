

toggleDropdown=()=>{
    let dp = document.getElementById("myDropdown")
    dp.classList.toggle("chang");
    dp.classList.add("popup");
    dp.addEventListener('animationend', function() {
        target.classList.remove('popup');
      }, { once: true });
}