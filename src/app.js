// app.js

const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public')); // using static files.
app.set('view engine', 'ejs');  // use EJS 






app.get('/', (req, res) => {
    res.render('index');  // Render the 'index.ejs' 
  });



app.get("/services",(req,res)=>{
    res.render("services")          // render services page 
})

app.get("/restoration_booking",(req,res)=>{
  res.render("restoration_booking");
})


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:3000`);
});



//2I5ZoEjxwSljQvm8