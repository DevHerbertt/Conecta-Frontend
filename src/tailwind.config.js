/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Garante que o Tailwind escaneie seus arquivos React/TypeScript
    ],
    theme: {
      extend: {
        colors: {
          // Exemplo de uma cor primária se você usa 'text-primary' ou 'bg-primary'
          // Mude para a cor que você desejar
          primary: '#4F46E5', // Um tom de roxo (indigo-600)
        },
      },
    },
    plugins: [],
  }