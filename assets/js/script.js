document.addEventListener("DOMContentLoaded", function() {
    accountForHeader();
});

addEventListener("resize", accountForHeader);

function accountForHeader() {
    let height = document.getElementsByTagName('header')[0].offsetHeight;
    height += 15;
    document.getElementsByTagName('main')[0].style.paddingTop = `${height}px`;
}