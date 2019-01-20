(() => {
    const $ = query => document.querySelector(query),
          value = (numericValue, s1, s2, s3) => {
            // obtain positive integer
            const i = ~~(Math.abs(numericValue));
            return '<span data-text="' + i +'">' + i + '</span>' + (i == 1 ? s1 : i > 1 && i < 5 ? s2 : s3);
          },
          header = $('header'),
          slider = document.createElement('div'),
          setRibbon = () => {
            // 2019-05-18T13:00:00 UTC = 2019-05-18T15:00:00 CEST
            let diff = new Date() - new Date('2019-05-18T13:00:00');
            $('#counter').innerHTML = diff <= 0 ? 'Do našej svadby ostáva' : 'Sme šťastne svoji už';
            diff /= 10000;
            $('#days').innerHTML = value(diff / 8640, 'deň', 'dni', 'dní');
            diff %= 8640;
            $('#hours').innerHTML = value(diff / 360, 'hodina', 'hodiny', 'hodín');
            diff %= 360;
            $('#minutes').innerHTML = value(diff / 6, 'minúta', 'minúty', 'minút');
          };

    $('#menu').insertAdjacentHTML(
        'beforeend',
        '<label for="menu-flag" id="hamburger"><div></div><div></div><div></div></label>'
    );
    header.insertAdjacentHTML(
        'beforebegin',
        '<input type="checkbox" id="menu-flag">'
    );
    slider.id = 'slider';
    slider.append($('#menu > ul').cloneNode(true));
    header.after(slider);
    onscroll = () => header.className = this.scrollY < 9 ? '' : 'scroll';
    if (days) {
        setRibbon();
        onload = () => setInterval(setRibbon, 1000);
    }
})();
