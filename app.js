// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;


app.use(express.static('public')); // using static files.


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  // use EJS 

// DB connection string 

mongoose.connect('mongodb+srv://talha030:2I5ZoEjxwSljQvm8@capstone-demo.sifosmw.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

  // here i define the internal schema of my user model


  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    brand: String,
    manufactureDate: Date,

  });

 

  // here i assign the schema to user model 

  const User = mongoose.model('User', userSchema);    

  // here i define the model for user account 

  const accountSchema = new mongoose.Schema({ 
    username: String, 
    password: String, 
    phone: String

  });

  // assigning the schema to model 

  const UserAcc = mongoose.model("UserAcc",accountSchema);

// route for restoration form 

  app.post('/restorationForm', async (req, res) => {
    const { name, email, phone, brand, manufactureDate } = req.body;
  
    try {
      // Create a new user instance
      const newUser = new User({
        name,
        email,
        phone,
        brand,
        manufactureDate
      });
  
      // Save the user to MongoDB
      await newUser.save();
  
      // Redirect to a success page or send a success response
      res.render('successPage');
    } catch (error) {
      // Handle errors, redirect to an error page, or send an error response
      res.status(500).send('Internal Server Error');
      

    }
  });

  app.post('/register', async (req, res) => {
    const { username, password, phone } = req.body;
    

    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      

  
      // Create a new user instance
      const newAcc = new UserAcc({
        username,
        password: hashedPassword,
        phone,
      });
  
      // Save the user to MongoDB
      await newAcc.save();
      console.log(newAcc)
  
      // Redirect to a success page or send a success response
      res.render('registration-success');
    } catch (error) {
      // Handle errors, redirect to an error page, or send an error response
      res.status(500).send('Internal Server Error');
      
      
      
    }




  });

  app.post('/restoration-login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user in MongoDB based on the provided email
      const user = await UserAcc.findOne({ username: username });
  
      if (!user) {
        // User not found
        return res.status(401).send('Invalid email or password');
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        // Password does not match
        return res.status(401).send('Invalid email or password');
      }
  
      // Login successful, you can redirect or send a success response
      res.render('restoration_booking_submit');
    } catch (error) {
      // Handle errors, redirect to an error page, or send an error response
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/performance-login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user in MongoDB based on the provided email
      const user = await UserAcc.findOne({ username: username });
  
      if (!user) {
        // User not found
        return res.status(401).send('Invalid email or password');
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        // Password does not match
        return res.status(401).send('Invalid email or password');
      }
  
      // Login successful, you can redirect or send a success response
      res.render('performance_booking');
    } catch (error) {
      // Handle errors, redirect to an error page, or send an error response
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.post('/service-login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user in MongoDB based on the provided email
      const user = await UserAcc.findOne({ username: username });
  
      if (!user) {
        // User not found
        return res.status(401).send('Invalid email or password');
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        // Password does not match
        return res.status(401).send('Invalid email or password');
      }
  
      // Login successful, you can redirect or send a success response
      res.render('service_booking');
    } catch (error) {
      // Handle errors, redirect to an error page, or send an error response
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  });




app.get('/', (req, res) => {
    res.render('index');  // Render the 'index.ejs' 
  });



app.get("/services",(req,res)=>{
    res.render("services")          // render services page 
})


app.get("/contact", (req,res)=>{
  res.render("contact")
})



app.get("/restoration_booking",(req,res)=>{
  res.render("restoration_booking");
})

app.get("/restoration-login", (req,res)=>{
  res.render("restoration-login")
})


app.get("/performance-login",(req,res)=>{
  res.render("performance-login");
})

app.get("/service-login",(req,res)=>{
  res.render("service-login");
})


app.get("/login",(req,res)=>{
  res.render("login");
})

app.get("/register",(req,res)=>{
  res.render("register");
})

app.get("/registration-success",(req,res)=>{
  res.render("registration-success");
})

app.get('/admin', async (req, res) => {
  try {
    // Fetch all entries from the database
    const entries = await UserAcc.find({}, 'username phone'); // Adjust fields as needed
    res.render('admin', { entries });
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.get("/manage_user",async (req,res)=>{
  try {
    // Fetch all entries from the database
    const entries = await UserAcc.find({}, 'username phone'); // Adjust fields as needed
    res.render('manage_user', { entries });
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/admin/delete', async (req, res) => {
  const  username  = req.body.email;
  

  try {
    // Find the user by email
    const user = await UserAcc.findOne({ username });
    

    if (!user) {
      // User not found
      
      return res.status(404).send('User not found');

    }

    // Delete the user
    await UserAcc.findOneAndDelete({ username });

    // Redirect or send a response to refresh the page
    res.redirect('/manage_user'); // You can change this to another URL if needed
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/manage_bookings",async (req,res)=>{
  try {
    // Fetch all entries from the database
    const entries = await User.find(); // Adjust fields as needed
    res.render('manage_bookings', { entries });
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).send('Internal Server Error');
  }
})


app.post('/bookings/delete', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).send('User not found');
    }

    // Delete the user
    await User.findOneAndDelete({ email });

    // Redirect or send a response after deletion
    res.redirect('/manage_bookings'); // You can change this to another URL if needed
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});






app.listen(port, () => {
  console.log(`Server is listening at http://localhost:3000`);
});



//2I5ZoEjxwSljQvm8