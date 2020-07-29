const style = document.createElement('style')
const importUrl = import.meta.url;
style.textContent=`
@font-face {
  font-family: 'NotoSans';
  src: url(${new URL(
    'fonts/NotoSans/NotoSans-Regular.ttf',
    importUrl)}) format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'NotoSans';
  src: url(${new URL(
    'fonts/NotoSans/NotoSans-Italic.ttf',
    importUrl)}) format("truetype");
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: 'NotoSans';
  src: url(${new URL(
    'fonts/NotoSans/NotoSans-Bold.ttf',
    importUrl)}) format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: 'NotoSans';
  src: url(${new URL(
    'fonts/NotoSans/NotoSans-BoldItalic.ttf',
    importUrl)}) format("truetype");
  font-weight: bold;
  font-style: italic;
}
@font-face {
  font-family: 'NotoMono';
  src: url(${new URL(
    'fonts/NotoMono/NotoMono-Regular.ttf',
    importUrl)}) format("truetype");
  font-weight: normal;
  font-style: normal;
}
`
document.head.appendChild(style);
