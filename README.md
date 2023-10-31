# bacaaa

Buat lihat struktur direktori agar lebih jelas buka file README.md aja

## struktur direktori Project

my-api
  |-node_modules
  |-package-lock.json
  |-package.json
  |-server.js // File Utama API
node_modules
public
src
  |-components
	|-common
		|-header.js //template header
		|-sidebar.css 
		|-sidebar.js  //template sidebar
	|-dashboard
		|-dashboard.js //template dashboard
	|-datamaster
		|-adddata.js // form add data
		|-datamaster.js // template datamaster
		|-editdata.js // form edit data
	|-login
		|-login.js // template login
	|-report
		|-printreport.js // halaman tempat menampilkan data yang ingin di print
		|-report.js // template report
	|-user
		|-user.js //template halaman user
  |-App.js
  |-index.css
  |-index.js
  |-reportWebVitals.js
.gitignore
package-lock.json
packacge.json
postcss.config.js
README.md
tailwind.config.js
test.html  //test code doang



## Error & bug 
 - Canvas is already in use. Chart with ID '0' must be destroyed before the canvas with ID '' can be reused.  ( ketika setiap kali ingin mengubah grafik muncul eror)
 - The above error occurred in the <Dashboard> component: bundle.js:31698
