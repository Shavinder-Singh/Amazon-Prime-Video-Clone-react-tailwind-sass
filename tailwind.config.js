/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      backgroundColor: {
        'primary': '#00050D', //  black
        'secondary': '#191e25;',  //bggray-violet
        "azonwhite": "#FFFFFF",//white
        "azongray": "#AAAAAA",// textgray
        "azonblue": '#0f79af',//blue
        "inputbgcolor": '#33373D',//inputray
        'doublefooter': '#79B8F3', //dobulefooter
        "yellowcolor": '#eeda39',//yellowcolor


      },
      textColor: {
        'primarycolor': '#00050D', //  black
        'secondary': '#191e25',  //bggray-violet
        "azongray": "#AAAAAA",// textgray
        "azonwhite": "#FFFFFF",//white
        "azonblue": '#0f79af',//blue
        "hovercolor": '#222222',//gray
        "inputbgcolor": '#33373D',//inputray
        'azonblue': '#1A98FF', //azonblue
        'doublefooter': '#79B8F3', //dobulefooter
        "yellowcolor": '#eeda39',//yellowcolor
      },
      screens: {
        'vs':'370px',
        'sm': '640px',

        'md': '768px',
        'cs': '880px',

        'lg': '1024px',

        'xl': '1280px',

        '2xl': '1536px',

        '3xl': '1440px',
      }
    },
  },
  plugins: [],
}
