
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'width': 'width',
      }
    }
  }
}