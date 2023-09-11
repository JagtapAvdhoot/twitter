/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				theme: {
					blue: '#1DA1F2',
					green: '#00BA7C',
					red: '#F91880',
					yellow: 'rgb(255, 212, 0)',
					pink: 'rgb(249, 24, 128)',
					purple: 'rgb(120, 86, 255)',
					orange: 'rgb(255, 122, 0)',
          light_bg:"#F5F8FA",
          light_text:"#14171A",
          light_text_secondary:"#536471",
          light_border:"rgba(170, 184, 194,0.5)",
          light_hover:"rgba(225, 232, 237,0.5)",
          dark_bg:"#14171A",
          dark_text:"#F5F8FA",
          dark_text_secondary:"#71767B",
          dark_border:"rgba(101, 119, 134,0.5)",
          dark_hover:"rgba(101, 119, 134,0.2)",
				}
			}
		}
	},
	plugins: []
};
