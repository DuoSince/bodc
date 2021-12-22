const Discord = require("discord.js");
const samp = require("samp-query");
require("dotenv").config();
const client = new Discord.Client({
  intents: 32767,
});

client.on("ready", (client) => {
  client.user.setActivity("SAMP BOT ", { type: "PLAYING" });
  console.log(`Ready ${client.user.tag}`);
});
client.on("messageCreate", (message) => {
  let msgArray = message.content.split(" "); // Splits the message content with space as a delimiter
  let prefix = "<";
  let command = msgArray[0].replace(prefix, ""); // Gets the first element of msgArray and removes the prefix
  let args = msgArray.slice(1); // Remove the first element of msgArray/command and this basically returns the arguments


  if (command === "samp") {
    const split = args.join(" ").split(":");
    const ip = split[0];
    const port = split[1];
    if (!ip || !port) return message.reply("Masukin ip port contoh 123.0.0.1:7777");
    var options = {
      host: ip,
      port: port,
    };
    samp(options, function (error, response) {
      if (error) {
        console.log("Error");
        message.channel.send("Gagal Menghubungkan:(")
      } else {
        let Players = response["players"].map(p => `[${p.id}] ${p.name} [${p.score}] [${p.ping}]`).slice(0, 10).join('\n').toString();
        const embed = new Discord.MessageEmbed()
          .setColor("#ff0505OM")
          .setThumbnail("https://media.discordapp.net/attachments/887976325674065950/899024342174797874/Screenshot_2021_1013_101724.png")
          .setAuthor(response["hostname"])
          .addField("JenisGM", `${response["gamemode"]}`)
          .addField("NamaMap", `${response["mapname"]}`)
          .addField("Versi", `${response["rules"].version}`)
          .addField("SemuaPlayer", `${response["online"]}/${response["maxplayers"]}`)
          .addField("Website", `${response["rules"].weburl}`)
          .addField("Waktu", `${response["rules"].worldtime}`)
          .addField("Map", `${response["rules"].mapname}`)
          .addField("PlayerOnline", `\`\`\`${Players}\`\`\``)
          .setFooter("Bot Created By DevXyZ");
        message.reply({ embeds: [embed] });
      }
    });
  }
});

client.login(process.env.TOKEN);
