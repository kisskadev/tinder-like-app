const express = require("express");
const app = express();
const port = 3000;
const Chance = require("chance");
const chance = new Chance();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

let counter = 0;
app.get("/get-person-profile", (req, res) => {
  counter++;
  if (counter < 15) {
    res.send({
      title: chance.name({ gender: "female" }),
      age: chance.age(),
      preview_image_url: "https://picsum.photos/200",
    });
  } else {
    res.send(null);
  }
});

const liked_ids = [1, 4, 7, 9];

app.post("/like-person-profile", (req, res) => {
  if (req?.body?.user_id) {
    res.send(liked_ids.includes(req?.body?.user_id));
  } else {
    res.send(false);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
