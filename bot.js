// Importar dependencias
const Discord = require('discord.js');
const fs = require('fs');

// Importar JSON de configuraciones, etc
const private = require('./private.json');
const config = require('./config.json');
const prf = config.prefix;

// Inicio programa
var bot = new Discord.Client();

// Eventos cuando esta listo
bot.on('ready', () => {
    console.log('Bot listo');
})

// Eventos al Enviar un Mensaje
bot.on('message', (msg) => {
    // Ahorrando memoria. No responde a sí mismo y tampoco si no tiene el prefijo
    if(msg.author.bot){return};
    if(!msg.content.startsWith(prf)){return};

    // Optimización de comandos
    let command = msg.content.split(" ")[0];
    command = command.slice(prf.length);

    let args = msg.content.split(" ").slice(1);

    // Comandos
})


// Eventos al cambiar el status de presencia
bot.on('presenceUpdate', (oldMember, newMember) => { // Objetos tipo GuildMember
    if(oldMember.presence.equals(newMember.presence)){return};
    if(oldMember.presence.game != newMember.presence.game && oldMember.presence.status === newMember.presence.status){return}; // SÍ FUNCIONA
    if(oldMember.user.bot || newMember.user.bot){return};
    if(!config.log){return};

    let info = {
        user: {
            username: '',
            id: null
        },
        status: {
            old: '',
            new: ''
        },
        date: null
    };

    (function(){ // Función Logger
        // Guardando la info en el objeto info
        info.user.username = newMember.user.tag;
        info.user.id = newMember.user.id;

        info.status.old = oldMember.presence.status;
        info.status.new = newMember.presence.status;

        let fecha = new Date();
        info.date = fecha.toISOString();
        let month = fecha.getMonth() + 1

        let filename;
        filename = './logs/' + fecha.getDate() + "-" + month + "-" + fecha.getFullYear() + ".json";

        // Tratando el archivo JSON y añadiendo el nuevo data
        if(fs.existsSync(filename)){
            let file = fs.readFile(filename, (err, data) => {
                if(err){throw err};
                let log = JSON.parse(data);
                log.push(info);
                let written = JSON.stringify(log, null, 4);


                fs.writeFile(filename, written, (err) => {
                    if(err){throw err};

                    console.log('Datos escritos');
                })
            });
        }else{
            (function(){
                let log = [];
                log.push(info);

                let written = JSON.stringify(log, null, 4);

                fs.writeFile(filename, written, (err) => {
                    if(err){throw err};

                    console.log('Datos escritos');
                })
            })();
        }
    })();
})

// Eventos al actualizar el status de voz
bot.on('voiceStateUpdate', (oldMember, newMember) => {
    
});

// Login final
bot.login(private.token);
