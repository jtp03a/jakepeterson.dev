<h1>App Setup and Configuration</h1>
<p>This app requires a MongoDB for data storage and retrieval and a pexel API key for blog images
<h1>Database Setup</h1>
<p>The below instructions are for setting up a free mongodb cloud atlas account which is suitable for testing and development.</p>
<ol>
<li>Go to https://www.mongodb.com/cloud/atlas/signup and create a free mongoDB atlas account
<li>On the "Lets get your account setup" page set a name for your organization and project. Select javascript for the preferred language
<li>Select the free shared cluster option on the "Choose a path" page
<li>Select a cloud provider and a region on the "Create a Starter Cluster page", Make sure you have "M0 Sandbox" with a base price of "Free Forever" selected for your "Cluster Tier", Click "Create Cluster"
<li>Once the Cluster has finished creating click the "Connect" button. The page will tell you that you need to setup your firewall access. Click the option "Allow Access from Anywhere"
<li>Leave the IP address as 0.0.0.0/0 and click "Add IP Address" **Not a secure production configuration**
<li>In the "Create a Database User" section set your username and password as you desire. Click the "Create a Database User" button
<li>Click "Choose a connection method". On the next screen select "Connect your application"
<li>Copy the connection string into a notepad (or something to keep note of it for later steps) replacing the < password > portion (including the < >) with the password you setup on step 10 and replacing < dbname > portion with mydb (or whatever you want to call the database your site data will be inserted into)
<li>It should look something like: mongodb+srv://mydbUser:mypassword@cluster0.abcde.mongodb.net/mydb?retryWrites=true&w=majority
</ol>
<h1>Pexels</h1>
<p>The blog section of this site uses pexel images (free stock photography) for the blog post images. This makes it easy to insert a nice photograph into each blog post because all you need is the pexel ID of the image and the image will be retrived from the pexel API on page render intead of having to be stored in your own server somewhere. Go to https://www.pexels.com/api/ and create an account and setup an API key. You will need the API key later during environmental variable setup.
<h1>Environmental Variables</h1>
<p>This app uses 3 environmental variables</p>
<ol>
<li>In the root folder of the project create a file called .env (be sure to include the leading period)
<li>Open the .env file you created and add the following 3 lines replacing the portions after the = sign with your own information:
<ul>
<li>MONGODB_URL=your mongodb URI
<li>JWT_SECRET=your JWT secret key
<li>PEXELKEY=your pexel API key
</ul>
</ol>
<h1>Admin Account</h1>
<p>To add blog posts and manage contact requests there is an admin section. The default admin username is admin and the default password is password. You will be prompted to change the password on first login to the admin section. If you want to change the user info for the admin account you can go to the server.js file in the root folder of the app and change the userData object that looks like:
<p>        const userData = {
<p>          email: 'admin@admin.com',
<p>          firstname: 'admin',
<p>          lastname: 'admin',
<p>          username: 'admin',
<p>          password: hashedPassword,
<p>          role: 'admin',
<p>          changepassword: true
<p>        };
<p>Only change the values for email, firstname, lastname, and username
<h1>Running on local host</h1>
<ol>
<li>Open a terminal pointed to the root of the project and in the command prompt type npm install
<li>AFter the install process has finished type the command npm start
<li>Open a second terminal pointed to the client folder located in the root of the project and type the command npm install
<li>After the install process has finished type the command npm start
<li>You should have two terminals open, one for the frontend and one for the backend with node started.
