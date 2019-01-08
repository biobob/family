(() => {
    document
        .getElementById('menu')
        .insertAdjacentHTML(
            'beforeend',
            '<label for="menu-flag" id="hamburger"><div></div><div></div><div></div></label>'
        );
    window.onscroll = () => document.querySelector('header').className = this.scrollY < 9 ? '' : 'scroll';
})();
