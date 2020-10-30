const styleURLs = [
  "./css/adminlte.css",
  "./css/fontawesome-all.min.css",
  "./webfonts/fonts.css"
];

const sheets = [];
for (let i = 0; i <styleURLs.length; i++) {
  sheets.push(new CSSStyleSheet());
}

Promise.all(styleURLs.map(url => fetch(url)
    .then(response => response.text()))
    )
    .then(styles => {
      for (let i = 0; i <styles.length; i++) {
        sheets[i].replace(styles[i]);
      }

      document.body.style.visibility = 'visible';
    });

export default sheets;
