const { tlang, cmd, sleep, getBuffer, prefix, Config } = require('../lib')
const ytdl = require('ytdl-secktor')
const yts = require('secktor-pack')
const fs = require('fs')
var videotime = 60000 // 1000 min
var dlsize = 250 // 250mb


cmd({
            pattern: "playlist",
            desc: "Downloads video from playlist.",
            category: "downloader",
            filename: __filename,
            use: '<yt playlist url>',
        },
        async(Void, citel, text) => {
  
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            if (!text) {
                citel.reply(`❌ᴘʟᴇᴀᴄᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ʏᴏᴛᴜʙᴇ ʟɪɴᴋ🔥`);
                return;
            }
let urlYtt = text.split('=')[1]
console.log(urlYtt)
var opts = { listId: urlYtt }
yts( opts, async function ( err, playlist ) {
	if ( err ) throw err
  citel.reply('ᴛʜɪꜱ ᴘʀᴏꜱꜱᴇᴅ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ ꜰᴏʀ ᴅᴏᴡɴʟᴏᴅɪɴɢ.');
  for (let i=0;i<playlist.videos.length;i++){
    if(playlist.videos[i].videoId===undefined) continue
    let urlYt = playlist.videos[i].videoId
    try {
      
                let infoYt = await ytdl.getInfo(urlYt);
                if (infoYt.videoDetails.lengthSeconds >= videotime) continue
                let titleYt = infoYt.videoDetails.title;
                let randomName = getRandom(".mp4");

                const stream = ytdl(urlYt, {
                        filter: (info) => info.itag == 22 || info.itag == 18,
                    })
                    .pipe(fs.createWriteStream(`./${randomName}`));
                await new Promise((resolve, reject) => {
                    stream.on("ᴇʀʀᴏᴡ", reject);
                    stream.on("ꜰɪɴꜱʜᴇᴅ ᴅᴏᴡɴʟᴏᴀᴅ", resolve);
                });
                let stats = fs.statSync(`./${randomName}`);
                let fileSizeInBytes = stats.size;
                let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes <= dlsize) {
                    let yts = require("secktor-pack");
                    let search = await yts(text);
                    let buttonMessage = {
                        video: fs.readFileSync(`./${randomName}`),
                        jpegThumbnail: log0,
                        mimetype: 'ᴠɪᴅᴇᴏ/ᴍᴘ4',
                        fileName: `${titleYt}.ᴍᴘ4`,
                        caption: ` ⿻ ᴛɪᴛʟᴇ : ${titleYt}\n ⿻ ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileSizeInMegabytes} ᴍʙ`,
                        headerType: 4,
                        contextInfo: {
                            externalAdReply: {
                                title: titleYt,
                                body: citel.pushName,
                                thumbnail: log0,
                                renderLargerThumbnail: true,
                                mediaType: 2,
                                mediaUrl: 'https://github.com/SamPandey001/Secktor-Md',
                                sourceUrl: 'https://github.com/SamPandey001/Secktor-Md'
                            }
                        }
                    }
                   Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                } else {
                    citel.reply(`❌ ꜰɪʟᴇ ᴄᴀɴ'ᴛ ᴅᴏᴡɴʟᴏᴅ ꜰɪʟᴇ ꜱɪᴢᴇ ʙɪɢɢᴇʀ ᴛʜᴀɴ ${dlsize}ᴍʙ.`);
                }

                fs.unlinkSync(`./${randomName}`);
            } catch (e) {
                console.log(e)
            }
            }})
        }
    )
