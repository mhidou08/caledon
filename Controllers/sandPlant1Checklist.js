const path = require('path');
const { google } = require('googleapis');


module.exports.renderSandPlant1Checklist = (req, res) => {
    res.sendFile(path.join(__dirname, '/..', 'Views', 'sandPlant1Checklist.html'))
};

module.exports.postSandPlant1Checklist = async (req, res) => {

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
        gPumps, hgPumps, dPumps, hdPumps, pPumps,
        g4280, hg4280, d4280, hd4280, p4280,
        g7269, hg7269, d7269, hd7269, p7269,
        g1101, hg1101, d1101, hd1101, p1101,
        gTunnel, hgTunnel, dTunnel, hdTunnel, pTunnel,
        gCLAM, hgCLAM, dCLAM, hdCLAM, pCLAM,
        gCLAM1, hgCLAM1, dCLAM1, hdCLAM1, pCLAM1,
        gCLAM2, hgCLAM2, dCLAM2, hdCLAM2, pCLAM2,
        gCLAM3, hgCLAM3, dCLAM3, hdCLAM3, pCLAM3,
        gCLAM4, hgCLAM4, dCLAM4, hdCLAM4, pCLAM4,
        gCLAM5, hgCLAM5, dCLAM5, hdCLAM5, pCLAM5,
        gTank, hgTank, dTank, hdTank, pTank,
        g4273, hg4273, d4273, hd4273, p4273,
        g4275, hg4275, d4275, hd4275, p4275,
        gMCCS, hgMCCS, dMCCS, hdMCCS, pMCCS,
        gScreens, hgScreens, dScreens, hdScreens, pScreens,
        g1328, hg1328, d1328, hd1328, p1328,
        g1329, hg1329, d1329, hd1329, p1329,
        gSCALE, hgSCALE, dSCALE, hdSCALE, pSCALE,
        gCS, hgCS, dCS, hdCS, pCS,
        g4154, hg4154, d4154, hd4154, p4154,
        g4155, hg4155, d4155, hd4155, p4155,
        g4156, hg4156, d4156, hd4156, p4156,
        g4159, hg4159, d4159, hd4159, p4159,
        g2104, hg2104, d2104, hd2104, p2104,
        g2106, hg2106, d2106, hd2106, p2106,
        g4157, hg4157, d4157, hd4157, p4157,
        g4158, hg4158, d4158, hd4158, p4158,
        g2103, hg2103, d2103, hd2103, p2103,
        g4161, hg4161, d4161, hd4161, p4161,
        g4160, hg4160, d4160, hd4160, p4160,
        g2107, hg2107, d2107, hd2107, p2107,
        g4163, hg4163, d4163, hd4163, p4163,
        g4163_2, hg4163_2, d4163_2, hd4163_2, p4163_2,
        g2105, hg2105, d2105, hd2105, p2105,


    } = req.body;



    const defectives = {
        // d4180: d4180, d4179: d4179, d4178: d4178,
        // d0004: d0004, d9046: d9046
        dPumps: dPumps, d4280: d4280, d7269: d7269, d1101: d1101,
        dTunnel: dTunnel, dCLAM: dCLAM, dCLAM1: dCLAM1, dCLAM2: dCLAM2,
        dCLAM3: dCLAM3, dCLAM4: dCLAM4, dCLAM5: dCLAM5, dTank: dTank,
        d4273: d4273, d4275: d4275, dMCCS: dMCCS, dScreens: dScreens,
        d1328: d1328, d1329: d1329, dSCALE: dSCALE, dCS: dCS, d4154: d4154,
        d4155: d4155, d4156: d4156, d4159: d4159, d2104: d2104,
        d2106: d2106, d4157: d4157, d4158: d4158, d2103: d2103,
        d4161: d4161, d4160: d4160, d2107: d2107, d4163: d4163,
        d4163_2: d4163_2, d2105: d2105,
    }
    const guards = {
        // g4180: g4180, g4179: g4179, g4178: g4178,
        // g0004: g0004, g9046: g9046, gHydrBreaker: gHydrBreaker,
        // gBeltScale: gBeltScale
        gPumps: gPumps, g4280: g4280, g7269: g7269, g1101: g1101,
        gTunnel: gTunnel, gCLAM: gCLAM, gCLAM1: gCLAM1, gCLAM2: gCLAM2,
        gCLAM3: gCLAM3, gCLAM4: gCLAM4, gCLAM5: gCLAM5, gTank: gTank,
        g4273: g4273, g4275: g4275, gMCCS: gMCCS, gScreens: gScreens,
        g1328: g1328, g1329: g1329, gSCALE: gSCALE, gCS: gCS, g4154: g4154,
        g4155: g4155, g4156: g4156, g4159: g4159, g2104: g2104,
        g2106: g2106, g4157: g4157, g4158: g4158, g2103: g2103,
        g4161: g4161, g4160: g4160, g2107: g2107, g4163: g4163,
        g4163_2: g4163_2, g2105: g2105,
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
        range: "Sand-Plant1!A:F4", //state the horizontal range and which sheet you are appending data to
        valueInputOption: "USER_ENTERED", //This will convert data into proper formats (like date into date not string), so won't take raw data
        resource: {
            values: [
                [
                    date, employee, shift,
                    isAllGuardsChecked, defectsExist, '-',

                ], //these are the values that will be input into a single row, order matters
            ]
        }
    });

    const allDefects = [
        // hd4180, hd4179, hd4178, hd0004, hd9046, hg4180, hg4179,
        // hg4178, hg0004, hgHydrBreaker, hg9046,
        // hgBeltScale,
        hdPumps, hd4280, hd7269, hd1101, hdTunnel, hdCLAM,
        hdCLAM1, hdCLAM2, hdCLAM3, hdCLAM4, hdCLAM5, hdTank,
        hd4273, hd4275, hdMCCS, hdScreens, hd1328, hd1329,
        hdSCALE, hdCS, hd4154, hd4155, hd4156, hd4159,
        hd2104, hd2106, hd4157, hd4158, hd2103, hd4161,
        hd4160, hd2107, hd4163, hd4163_2, hd2105,

        hgPumps, hg4280, hg7269, hg1101, hgTunnel, hgCLAM,
        hgCLAM1, hgCLAM2, hgCLAM3, hgCLAM4, hgCLAM5, hgTank,
        hg4273, hg4275, hgMCCS, hgScreens, hg1328, hg1329,
        hgSCALE, hgCS, hg4154, hg4155, hg4156, hg4159, hg2104,
        hg2106, hg4157, hg4158, hg2103, hg4161, hg4160, hg2107,
        hg4163, hg4163_2, hg2105,
    ]

    const prefixes = [
        'Pumps', '1444280', '1447269', '51101', 'Tunnel', 'Clam Gates(visual)', 'CLAM 1',
        'CLAM 2', 'CLAM 3', 'CLAM 4', 'CLAM 5', 'Classifying Tank', '1464273', '1464275',
        'M.C.C and Substation', 'Screens', '1441328', '1441329', '1444155', 'Conveyors and Stackers',
        '1444154', '1444155', '1444156', '1444159', '1442104', '1442106', '1444157', '1444158',
        '1442103', '1444161', '1444160', '1442107', '1444163', '1444163', '14442105'
    ] // An array of prefixes for each defect

    //The for loop is used to cycle through 5 defects (hence why i = 0 and increases up to 5), 
    // and for each defect that has a message (giving it a truthy value), the corresponding prefix is then
    // addded infront of the defect message. It's important that the correct index of the prefix and defect match.
    for (let i = 0; i < 5; i++) {
        if (allDefects[i]) {
            allDefects[i] = `${prefixes[i]}: ${allDefects[i]}`;
        }
    }

    const allDefectsString = allDefects.filter(Boolean).join("\n");

    const allPriorities = [
        // p4180, p4179, p4178, p0004, p9046,
        pPumps, p4280, p7269, p1101, pTunnel, pCLAM,
        pCLAM1, pCLAM2, pCLAM3, pCLAM4, pCLAM5, pTank,
        p4273, p4275, pMCCS, pScreens, p1328, p1329,
        pSCALE, pCS, p4154, p4155, p4156, p4159, p2104,
        p2106, p4157, p4158, p2103, p4161, p4160, p2107,
        p4163, p4163_2, p2105,
    ]
    const allPrioritiesString = allPriorities.filter(Boolean).join("\n");

    if (defectArray.length) {

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BackLog-SP1!A:E",
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
    res.redirect("/sandPlant1Checklist");
}