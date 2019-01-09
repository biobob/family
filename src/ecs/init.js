(() => {
    let header = document.querySelector('header');
    document.getElementById('menu').insertAdjacentHTML(
        'beforeend',
        `<label for="menu-flag" id="hamburger">
            <div></div>
            <div></div>
            <div></div>
        </label>`
    );
    header.insertAdjacentHTML(
        'beforebegin',
        '<input type="checkbox" id="menu-flag">'
    );
    window.onscroll = () => header.className = this.scrollY < 9 ? '' : 'scroll';
})();
