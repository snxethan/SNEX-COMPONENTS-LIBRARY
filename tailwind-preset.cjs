module.exports = {
  theme: {
    extend: {
      keyframes: {
        'elastic-in': { '0%': { transform:'scale(.96)', opacity:'0' }, '100%': { transform:'scale(1)', opacity:'1' } },
        'elastic-out': { '0%': { transform:'scale(1)', opacity:'1' }, '100%': { transform:'scale(.98)', opacity:'0' } }
      },
      animation: {
        'elastic-in': 'elastic-in 300ms cubic-bezier(.2,.8,.2,1)',
        'elastic-out': 'elastic-out 250ms cubic-bezier(.2,.8,.2,1)'
      }
    }
  },
  plugins: []
}
