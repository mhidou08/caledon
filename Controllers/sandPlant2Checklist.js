const path = require('path');
const { google } = require('googleapis');


module.exports.renderSandPlant2Checklist = (req, res) => {
    res.sendFile(path.join(__dirname, '/..', 'Views', 'sandPlant2Checklist.html'))
};

module.exports.postSandPlant2Checklist = async (req, res) => {

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
        g7071, hg7071, d7071, hd7071, p7071,
        g7272, hg7272, d7272, hd7272, p7272,
        g1101, hg1101, d1101, hd1101, p1101,
        gTunnel, hgTunnel, dTunnel, hdTunnel, pTunnel,
        gCLAM, hgCLAM, dCLAM, hdCLAM, pCLAM,
        gCLAM1, hgCLAM1, dCLAM1, hdCLAM1, pCLAM1,
        gCLAM2, hgCLAM2, dCLAM2, hdCLAM2, pCLAM2,
        gCLAM3, hgCLAM3, dCLAM3, hdCLAM3, pCLAM3,
        gCLAM4, hgCLAM4, dCLAM4, hdCLAM4, pCLAM4,
        gCLAM5, hgCLAM5, dCLAM5, hdCLAM5, pCLAM5,
        gTank, hgTank, dTank, hdTank, pTank,
        g4116, hg4116, d4116, hd4116, p4116,
        g4275, hg4275, d4275, hd4275, p4275,
        gMCCS, hgMCCS, dMCCS, hdMCCS, pMCCS,
        gScreens, hgScreens, dScreens, hdScreens, pScreens,
        g1332, hg1332, d1332, hd1332, p1332,
        g1331, hg1331, d1331, hd1331, p1331,
        gSCALE, hgSCALE, dSCALE, hdSCALE, pSCALE,
        gCS, hgCS, dCS, hdCS, pCS,
        g4165, hg4165, d4165, hd4165, p4165,
        g4166, hg4166, d4166, hd4166, p4166,
        g2108, hg2108, d2108, hd2108, p2108,
        g4169, hg4169, d4169, hd4169, p4169,
        g2110, hg2110, d2110, hd2110, p2110,
        g4168, hg4168, d4168, hd4168, p4168,
        g4170, hg4170, d4170, hd4170, p4170,
        g2108_2, hg2108_2, d2108_2, hd2108_2, p2108_2,
        g4172, hg4172, d4172, hd4172, p4172,
        g2109, hg2109, d2109, hd2109, p2109,
        g4167, hg4167, d4167, hd4167, p4167,
        g4277, hg4277, d4277, hd4277, p4277,
        g2113, hg2113, d2113, hd2113, p2113,


    } = req.body;



    const defectives = {
        // d4180: d4180, d4179: d4179, d4178: d4178,
        // d0004: d0004, d9046: d9046
        dPumps: dPumps, d7071: d7071, d7272: d7272, d1101: d1101,
        dTunnel: dTunnel, dCLAM: dCLAM, dCLAM1: dCLAM1, dCLAM2: dCLAM2,
        dCLAM3: dCLAM3, dCLAM4: dCLAM4, dCLAM5: dCLAM5, dTank: dTank,
        d4116: d4116, d4275: d4275, dMCCS: dMCCS, dScreens: dScreens,
        d1332: d1332, d1331: d1331, dSCALE: dSCALE,
        dCS: dCS, d4165: d4165, d4166: d4166, d2108: d2108,
        d4169: d4169, d2110: d2110, d4168: d4168, d4170: d4170,
        d2108_2: d2108_2, d4172: d4172, d2109: d2109, d4167: d4167,
        d4277: d4277, d2113: d2113,
    }
    const guards = {
        // g4180: g4180, g4179: g4179, g4178: g4178,
        // g0004: g0004, g9046: g9046, gHydrBreaker: gHydrBreaker,
        // gBeltScale: gBeltScale
        gPumps: gPumps, g7071: g7071, g7272: g7272, g1101: g1101,
        gTunnel: gTunnel, gCLAM: gCLAM, gCLAM1: gCLAM1, gCLAM2: gCLAM2,
        gCLAM3: gCLAM3, gCLAM4: gCLAM4, gCLAM5: gCLAM5, gTank: gTank,
        g4116: g4116, g4275: g4275, gMCCS: gMCCS, gScreens: gScreens,
        g1332: g1332, g1331: g1331, gSCALE: gSCALE,
        gCS: gCS, g4165: g4165, g4166: g4166, g2108: g2108,
        g4169: g4169, g2110: g2110, g4168: g4168, g4170: g4170,
        g2108_2: g2108_2, g4172: g4172, g2109: g2109, g4167: g4167,
        g4277: g4277, g2113: g2113,
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
        range: "Sand-Plant2!A:F4", //state the horizontal range and which sheet you are appending data to
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
        hdPumps, hd7071, hd7272, hd1101, hdTunnel, hdCLAM, hdCLAM1, hdCLAM2, hdCLAM3, hdCLAM4, hdCLAM5,
        hdTank, hd4116, hd4275, hdMCCS, hdScreens, hd1332, hd1331, hdSCALE, hdCS, hd4165, hd4166, hd2108,
        hd4169, hd2110, hd4168, hd4170, hd2108_2, hd4172, hd2109, hd4167, hd4277, hd2113,

        hgPumps, hg7071, hg7272, hg1101, hgTunnel, hgCLAM, hgCLAM1, hgCLAM2, hgCLAM3, hgCLAM4, hgCLAM5,
        hgTank, hg4116, hg4275, hgMCCS, hgScreens, hg1332, hg1331, hgSCALE, hgCS, hg4165, hg4166, hg2108,
        hg4169, hg2110, hg4168, hg4170, hg2108_2, hg4172, hg2109, hg4167, hg4277, hg2113,

    ]

    const prefixes = [
        'Pumps', '1747071', '1447272', '51101', 'Tunnel', 'Clam Gates(visual)', 'CLAM 1',
        'CLAM 2', 'CLAM 3', 'CLAM 4', 'CLAM 5', 'Classifying Tank', '1464116', '1464275',
        'M.C.C and Substation', 'Screens', '1441332', '1441331', '1444155', 'Conveyors and Stackers',
        '1444165', '1444166', '1442108', '1444169', '1442110', '1444168', '1444170', '1442108',
        '1444172', '1442109', '1444167', '1444277', '1442113'
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
        pPumps, p7071, p7272, p1101, pTunnel, pCLAM, pCLAM1, pCLAM2, pCLAM3, pCLAM4, pCLAM5,
        pTank, p4116, p4275, pMCCS, pScreens, p1332, p1331, pSCALE, pCS, p4165, p4166, p2108,
        p4169, p2110, p4168, p4170, p2108_2, p4172, p2109, p4167, p4277, p2113,
    ]
    const allPrioritiesString = allPriorities.filter(Boolean).join("\n");

    if (defectArray.length) {

        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "BackLog-SP2!A:E",
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
    res.redirect("/sandPlant2Checklist");
}