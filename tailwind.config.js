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

      },
      textColor: {
        'primarycolor': '#00050D', //  black
        'secondary': '#191e25',  //bggray-violet
        "azongray": "#AAAAAA",// textgray
        "azonwhite": "#FFFFFF",//white
        "azonblue": '#0f79af',//blue
        "hovercolor": '#222222',//gray
        "inputbgcolor": '#33373D',//inputray


      },
    },
  },
  plugins: [],
}
