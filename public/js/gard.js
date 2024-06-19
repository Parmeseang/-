document.addEventListener("DOMContentLoaded", function() {
    var nametags = document.querySelectorAll('.nametag');
    var popup = document.getElementById('popup');
    var popupImg = document.getElementById('popup-img');
    var popupName = document.getElementById('popup-name');
    var popupUniversity = document.getElementById('popup-university');
    var popupGroup = document.getElementById('popup-group');
    var popupgender = document.getElementById('popup-gender');
    var popupage = document.getElementById('popup-age');
    var popupds = document.getElementById('popup-ds');
    var popupwarp = document.getElementById('popup-warp');
    var closeBtn = document.querySelector('.close-btn');

    nametags.forEach(function(nametag) {
        nametag.addEventListener('click', function() {
            var name = nametag.getAttribute('data-name');
            var university = nametag.getAttribute('data-university');
            var group = nametag.getAttribute('data-group');
            var img = nametag.getAttribute('data-img');
            var gender = nametag.getAttribute('data-gender');
            var age = nametag.getAttribute('data-age');
            var ds = nametag.getAttribute('data-ds');
            var warp = nametag.getAttribute('data-warp');

            popupName.textContent = name;
            popupUniversity.innerHTML = `<p>อยากเข้า:</p><p>${university}</p>`;
            popupGroup.innerHTML = `<p>คณะ:</p><p>${group}</p>`;
            popupImg.src = img;
            popupgender.innerHTML = `<p>เพศ:</p><p>${gender}</p>`;
            popupage.innerHTML = `<p>เลขที่:</p><p>${age}</p>`;
            popupds.innerHTML = `<p>คำอธิบายตัวเอง:</p><p>${ds}</p>`;
            popupwarp.innerHTML = `<a href="https://www.instagram.com/${warp}/" target="_blank"><img src="images/home/pngegg.png" alt="Icon"></a>`;

            popup.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
            popup.classList.add("popup-nav");
        popup.addEventListener('animationend', function() {
            popup.classList.remove('popup-nav');
      }, { once: true });
        }
    });
});