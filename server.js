const express = require("express");

const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HQp74IGW7F8CVWPZljRPA8O23U3cYHs90q9rRpPCVPvi0y3rBDVGxViNelm8zLXHVjdUE1Ye3hKIysebFBIFVEQ00m1HNEutO"
);

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: true }));

// API router
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  //below line takes the total from api request url using query below
  const total = request.query.total;

  console.log("Payment Request Recieved total", total);

  //below code send data to stripe and to pamentintent with currency inr and i
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "INR",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(9000, () => console.log(`Node server listening on port ${9000}!`));
