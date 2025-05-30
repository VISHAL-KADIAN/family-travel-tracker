import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "vishal",
  password: "kenny69",
  port: 5433,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON users.id=user_id WHERE user_id=$1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser(){
  const result=await db.query("SELECT * FROM users");
  users=result.rows;
  return users.find((user)=>user.id===currentUserId);
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser=await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color:currentUser.color,
  });
});


app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
  
});

app.post("/new", async (req, res) => {
  const newuser={
    id:users.length+1,
    name:req.body.name,
    color:req.body.color,
  };

  await db.query("INSERT INTO users (name,color) VALUES($1,$2)",
    [newuser.name ,newuser.color]
  )
  currentUserId = newuser.id;
  users.push(newuser);

  res.redirect("/");
 
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
