const path = require('path');
const { google } = require('googleapis');


module.exports.renderPrimaryChecklist = (req, res) => {
    res.sendFile(path.join(__dirname, '/..', 'Views', 'primaryChecklist.html'))
};

module.exports.postPrimaryChecklist = async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "API-Credentials/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    //Create client instance for auth
    const client = await auth.getClient();

    //Instance of googlesheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });


    const spreadsheetId = process.env.SPREADSHEET_ID;

    //collect data from req.body by destructuring the object. These are the variables that represent each section of the form filled
    const {
        employee, date, shift, sections,
        g4779, hg4779, d4779, hd4779, p4779,
        hgc9023, g9023, hg9023, d9023, hd9023, p9023,
        hgc6700, g6700, hg6700, d6700, hd6700, p6700,
        hgc8001, g8001, hg8001, d8001, hd8001, p8001,
        g4402, hg4402, d4402, hd4402, p4402,
        hgc1324, g1324, hg1324, d1324, hd1324, p1324,
        hgc1325, g1325, hg1325, d1325, hd1325, p1325,
        hgc1326, g1326, hg1326, d1326, hd1326, p1326,
        gBelt, hgBelt, dBelt, hdBelt, pBelt,
        g4143, hg4143, d4143, hd4143, p4143,
        g4144, hg4144, d4144, hd4144, p4144,
        g4171, hg4171, d4171, hd4171, p4171,
        g4145, hg4145, d4145, hd4145, p4145,
        g4146, hg4146, d4146, hd4146, p4146,
        g4147, hg4147, d4147, hd4147, p4147,
        g4150, hg4150, d4150, hd4150, p4150,
        g4151, hg4151, d4151, hd4151, p4151,
        g2101, hg2101, d2101, hd2101, p2101,
        g4148, hg4148, d4148, hd4148, p4148,
        g4149, hg4149, d4149, hd4149, p4149,
        g6015, hg6015, d6015, hd6015, p6015,
        g2675, hg2675, d2675, hd2675, p2675,
        g4276, hg4276, d4276, hd4276, p4276,
    } = req.body;



    const defectives = {
        d4779: d4779, d9023: d9023, d6700: d6700, d8001: d8001,
        d4402: d4402, d1324: d1324, d1325: d1325, d1326: d1326,
        dBelt: dBelt, d4143: d4143, d4144: d4144, d4171: d4171,
        d4145: d4145, d4146: d4146, d4147: d4147, d4150: d4150,
        d4151: d4151, d2101: d2101, d4148: d4148, d4149: d4149,
        d6015: d6015, d2675: d2675, d4276: d4276
    }
    const guards = {
        g4779: g4779, g9023: g9023, g6700: g6700, g8001: g8001,
        g4402: g4402, g1324: g1324, g1325: g1325, g1326: g1326,
        gBelt: gBelt, g4143: g4143, g4144: g4144, g4171: g4171,
        g4145: g4145, g4146: g4146, g4147: g4147, g4150: g4150,
        g4151: g4151, g2101: g2101, g4148: g4148, g4149: g4149,
        g6015: g6015, g2675: g2675, g4276: g4276
    }

    //analyzes if defectives are checked or if guards are unchecked
    const defectArray = []; //array is empty, but will systematically input any defects or issues into it
    let isAllGuardsChecked = 'Yes';
    let defectsExist = 'No';

    for (let key in defectives) {
        if (defectives[key]) {
            defectArray.push(key)
            defectsExist = 'Yes'
        }
    }

    for (let key in guards) {
        if (!guards[key]) {
            defectArray.push(key)
            isAllGuardsChecked = 'No'
        };
    };
    // ^^ function is done, defectArray will have guards or defects that had issues stored

    //write rows to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Primary!A:M", //state the horizontal range and which sheet you are appending data to
        valueInputOption: "USER_ENTERED", //This will convert data into proper formats (like date into date not string), so won't take raw data
        resource: {
            values: [
                [
                    date, employee, shift,
                    hgc9023, hgc6700, hgc8001, hgc1324, hgc1325, hgc1326,
                    isAllGuardsChecked, defectsExist, "-"

                ], //these are the values that will be input into a single row, order matters
            ]
        }
    });

    const allDefects = [
        // hd4180, hd4179, hd4178, hd0004, hd9046, hg4180, hg4179,
        // hg4178, hg0004, hgHydrBreaker, hg9046,
        // hgBeltScale,
        hd4779, hd9023, hd6700, hd8001, hd4402, hd1324, hd1325, hd1326, hdBelt, hd4143, hd4144, hd4171,
        hd4145, hd4146, hd4147, hd4150, hd4151, hd2101, hd4148, hd4149, hd6015, hd2675, hd4276,

        hg4779, hg9023, hg6700, hg8001, hg4402, hg1324, hg1325, hg1326, hgBelt, hg4143, hg4144, hg4171,
        hg4145, hg4146, hg4147, hg4150, hg4151, hg2101, hg4148, hg4149, hg6015, hg2675, hg4276

    ]

    const prefixes = [
        '1464779', '1439023', '1556700', '1738001', '1464402', '1441324',
        '1441325', '1441326', 'Belt Scale', '1444143', '1444144', '1444171',
        '1444145', '1444146', '1444147', '1444150', '1444151', '1442101',
        '1444148', '1444149', '10146015', '5022675', '1444276'] // An array of prefixes for each defect

    //The for loop is used to cycle through 5 defects (hence why i = 0 and increases up to 5), 
    // and for each defect that has a message (giving it a truthy value), the corresponding prefix is then
    // addded infront of the defect message. It's important that the correct index of the prefix and defect match.
    for (let i = 0; i < 23; i++) {
        if (allDefects[i]) {
            allDefects[i] = `${prefixes[i]}: ${allDefects[i]}`;
        }
    }

    const allDefectsString = allDefects.filter(Boolean).join("\n");

    const allPriorities = [
        p4779, p9023, p6700, p8001, p4402, p1324, p1325, p1326, pBelt, p4143, p4144, p4171,
        p4145, p4146, p4147, p4150, p4151, p2101, p4148, p4149, p6015, p2675, p4276
    ]
    const allPrioritiesString = allPriorities.filter(Boolean).join("\n");

    if (defectArray.length) {

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BackLog-P!A:E",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [date, employee, sections, allPrioritiesString, allDefectsString, '-',
                    ]
                ]
            }
        })
    }

    // res.redirect("/");
    res.redirect("/primaryChecklist");
}