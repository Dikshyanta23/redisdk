const { createClient } = require("redis");

const client = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-12456.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 12456,
  },
});

client.on("connect", () => {
  console.log("connected to redis");
});
client.on("error", (error) => {
  console.log("error on reddis", error);
});

module.exports = client;
