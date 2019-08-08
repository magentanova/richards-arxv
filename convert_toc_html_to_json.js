const cheerio = require('cheerio');
const fs = require('fs');

const INFILE_PATH = process.argv[2];
const OUTFILE_PATH = process.argv[3];

const infileText = fs.readFileSync(INFILE_PATH).toString();

const $ = cheerio.load(infileText);

const rows = $('table').find('tr')

const jsonOutput = {}


const hhmmssToSeconds = s => {
    const [hrs,mins,secs] = s.split(':')
    return parseInt(hrs) * 3600 + parseInt(mins * 60) + parseInt(secs)
}

let last_start = "UNK"
for (let i = rows.length - 1; i >= 0; i --) {
    const row = rows[i]
    const cells = $(row).find('td')
    const startDate = $(cells[1]).text()
    // ignore some rows
    if (!startDate.trim() || startDate == "Begin Date") {
        continue 
    }
    const endDate = $(cells[2]).text()
    const rangeKey = `${startDate}_to_${endDate}`   
    if (!jsonOutput[rangeKey]) {
        last_start = "UNK";
    } 
    let rangeData = jsonOutput[rangeKey] || {}
    rangeData.start_date = startDate
    rangeData.end_date = endDate 
    rangeData.clips = rangeData.clips || {}
    rangeData.display_title = `${startDate} to ${endDate}`  
    try {
        const startPos = hhmmssToSeconds($(cells[4]).text())
        const endPos = last_start
        last_start = startPos
        const title = $(cells[5]).text()
        const clipPath = $(cells[5]).find('a').attr('href')
        // get filename only
        // remove last two chars before the extension
        const filename = clipPath.split('/')[2]
        const baseFile = filename.split('.')[0].substr(0,filename.length - 6) + ".mp4"
        
        // build clipData object
        const clipData = rangeData.clips[filename + "__" + title] = {}
        clipData.start_pos = startPos
        clipData.end_pos = endPos 
        clipData.title = title 
        clipData.mp4_filename = baseFile

    }
    catch (e) {
        console.log(e)
    }
    jsonOutput[rangeKey] = jsonOutput[rangeKey] || rangeData
}

fs.writeFileSync(OUTFILE_PATH, JSON.stringify(jsonOutput,null,4))

// json structure

// "date_range": {
    // start
    // end
    // clips: 
    // "filename_title": {
        // "start": xxx,
        // "end": xxx,
        // "mp4_filename": xxx,
        // "title": xxx
    // }
// }

// 0 ' '
// 1 'Feb-87'
// 2 'Mar-87'
// 3 ''
// 4 '0:17:05'
// 5 'Helping with Dishes'

