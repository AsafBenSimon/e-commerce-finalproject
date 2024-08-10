document.addEventListener("DOMContentLoaded", function () {
  const navBar = document.querySelector(".NavBar");
  const miniNavHeight = document.querySelector(".MiniNav").offsetHeight;

  const handleScroll = () => {
    if (window.scrollY > miniNavHeight) {
      navBar.style.top = "0"; // Remove the 40px padding when scrolling past MiniNav
    } else {
      navBar.style.top = "40px"; // Restore the 40px padding when at the top
    }
  };

  window.addEventListener("scroll", handleScroll);
});
