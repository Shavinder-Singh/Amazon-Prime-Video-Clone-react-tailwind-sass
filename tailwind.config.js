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

      },
      textColor: {
        'primarycolor': '#00050D', //  black
        'secondary': '#191e25',  //bggray-violet
        "azongray": "#AAAAAA",// textgray
        "azonwhite": "#FFFFFF",//white
        "azonblue": '#0f79af',//blue
        $hovercolor:'#222222',//gray


      },
    },
  },
  plugins: [],
}
