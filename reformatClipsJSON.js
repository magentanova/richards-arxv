// "2003_07%20-%202004_0203.mp4__Ridgewood Christmas": {
//     "start_pos": 2186,
//     "end_pos": "UNK",
//     "title": "Ridgewood Christmas",
//     "mp4_filename": "2003_07%20-%202004_02.mp4"
// },

// 3: {
//     "title": "Ridgewood Christmas",
//     "mp4_filename": "2003_07%20-%202004_02.mp4",
// }


const fs = require('fs');

const clipsObj = JSON.parse(fs.readFileSync('src/data/virtual-clips.json').toString());

for (let dateRange in clipsObj) {
    for (let clipKey in clipsObj[dateRange].clips) {
        const [ mp4Filename, title ] = clipKey.split("__");
        const index = parseInt(mp4Filename.substring(mp4Filename.length - 6, mp4Filename.length - 4))
        clipsObj[dateRange].clips[index] = {
            "title": title,
            "mp4_filename": mp4Filename,
            "index": index
        }
        delete clipsObj[dateRange].clips[clipKey]
    }
}

fs.writeFileSync('src/data/clips.json',JSON.stringify(clipsObj, null, 4))