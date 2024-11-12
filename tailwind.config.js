/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
     
    // Flowbite 컴포넌트 경로 추가 
     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', //타입스크립트 지원
     "./node_modules/flowbite/**/*.js" //자바스크립트 지원

  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ["'Noto Sans KR'", "sans-serif"], // 전체 글꼴을 Noto Sans KR로 설정
    },
  },
  },
  plugins: [
      // Flowbite 플러그인 추가
      require('flowbite/plugin')
  ],
});