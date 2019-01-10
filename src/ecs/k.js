(() => {
    let header = document.querySelector('header'),
        slider = document.createElement('div');
    document.getElementById('menu').insertAdjacentHTML(
        'beforeend',
        '<label for="menu-flag" id="hamburger"><div></div><div></div><div></div></label>'
    );
    header.insertAdjacentHTML(
        'beforebegin',
        '<input type="checkbox" id="menu-flag">'
    );
    slider.id = 'slider';
    slider.append(document.querySelector('#menu > ul').cloneNode(true));
    header.after(slider);
    window.onscroll = () => header.className = this.scrollY < 9 ? '' : 'scroll';
})();
