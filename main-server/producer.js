const { kafka } = require("./client");
const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function init() {
//   const producer = kafka.producer();

//   console.log("Connecting Producer");
//   await producer.connect();
//   console.log("Producer Connected Successfully");

//   rl.setPrompt("> ");
//   rl.prompt();

//   rl.on("line", async function (line) {
//     const [riderName, location] = line.split(" ");
//     await producer.send({
//       topic: "rider-updates",
//       messages: [
//         {
//           partition: location.toLowerCase() === "north" ? 0 : 1,
//           key: "location-update",
//           value: JSON.stringify({ name: riderName, location }),
//         },
//       ],
//     });
//   }).on("close", async () => {
//     await producer.disconnect();
//   });
// }

async function init() {
    const producer = kafka.producer()

    await producer.connect();
    await producer.send({
        topic: "rider-updates",
        messages: [{
            partition : 0,
            key: "data", 
            value: JSON.stringify({
                name: "Disha",
                sirname: "mahadik"
            })
        }]
    })
    console.log("produce Successfully")

    await producer.disconnect();


}

async function CategoryUpdates() {
    const producer = kafka.producer()

    await producer.connect();
    await producer.send({
        topic: "category-updates",
        messages: [{
            partition : 0,
            key: "data", 
            value: JSON.stringify({
                name: "T-shirt",
            })
        }]
    })
    console.log("produce Successfully")

    await producer.disconnect();


}


init();
CategoryUpdates();