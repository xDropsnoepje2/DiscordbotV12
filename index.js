const discord = require("discord.js");
const botConfig = require("./config.json");
const fs = require('fs');

const active = new Map();


const client = new discord.Client();
client.commands = new discord.Collection();
client.login(botConfig.token);
 

fs.readdir("./commandos/" , (err, files) => {

    if(err) console.log(err);
   
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
   
    if(jsFiles.length <=0) {
       console.log("Kon geen Commandos vinden");
       return;
    }
   
    jsFiles.forEach((f, i) => {
   
      var fileGet = require(`./commandos/${f}`);
      console.log(`De Commando ${f} is geladen`);
   
      client.commands.set(fileGet.help.name, fileGet);
     })




     


client.on("guildMemberAdd", member => {

    var channel = member.guild.channels.cache.get("769703292741091358");
        
    if (!channel) return;

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`Discbot |Waar jij het krijgt!`)
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**. Hier nog meer uitleg.`)
        .setColor("#00FF00")
        .setTimestamp()
        .setFooter("Gebruiker gejoined.");

    channel.send(joinEmbed);

});

client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get("769703292741091358");
        
    if (!channel) return;

    var leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`Discbot |Waar jij het krijgt!`, member.user.displayAvatarURL)
        
        .setDescription(`Hey ${member.user.username}`, "Wat jammer dat je bent weggegaan.")
        .setColor("#FF0000")
        .setTimestamp()
        .setFooter("Gebruiker Geleaved.");

    channel.send(leaveEmbed);

});

client.on("ready", async () => {
 
    console.log(`De bot is ingelogt als ${client.user.username}`);
 
    client.user.setActivity("Netflix", { type: "WATCHING" });
 
});



 
 
client.on("message", async message => {
 
    if(message.author.bot) return;
 
    if(message.channel.type === "dm") return;
 
    var prefix = botConfig.prefix;
 
    var messageArray = message.content.split(" ");
 
    var command = messageArray[0];

    var args = messageArray.slice[1];


    var commands = client.commands.get(command.slice(prefix.length));



    if(commands) commands.run(client, message, args);

 
    if (command === `${prefix}hallo`) {
 
        return message.channel.send("Hallo!!");
    
    }

   
 

});


});