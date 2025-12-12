import { Student, Room, Complaint, AttendanceRecord, Message, WardenProfile } from '../types';

const GOOGLE_SHEET_DATA = [
    { "SI.NO": 1, "DATE": "11-03-2024", "NAME": "THATHIREDDY.HARIKRISHNA", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CS-IOT / III", "STUDENT PH.NO": "9390988021", "PARENT NAME": "T.VENKATESWARLU", "PARENT PH.NO": "7013294796", "STUDENT AADHAR": "4947 9189 3758", "ADDRESS": "AVULAVARI PALLI(VIL), H.M PADU(MAND)", "STUDENT G-MAIL": "thathireddyhari7@gmail.com" },
    { "SI.NO": 2, "DATE": "27-07-2024", "NAME": "PALLAPULU.GOVARDHAN REDDY", "COLLEGE": "PACE COLLEGE", "BRANCH/YEAR": "AIDS / III", "STUDENT PH.NO": "9849917703", "PARENT NAME": "P.ANJI REDDY", "PARENT PH.NO": "8639355193", "STUDENT AADHAR": "3348 8470 2964", "ADDRESS": "PAVULRU(VIL),INOLLU(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 3, "DATE": "19-07-2024", "NAME": "AMMIREDDY.PEDDIREDDY", "COLLEGE": "PACE COLLEGE", "BRANCH/YEAR": "CIVIL / III", "STUDENT PH.NO": "8688277742", "PARENT NAME": "A.SRINIVAS REDDY", "PARENT PH.NO": "9491851095", "STUDENT AADHAR": "4296 3939 9161", "ADDRESS": "NUZENDLA(VIL),PALNADU(DIST)", "STUDENT G-MAIL": "" },
    { "SI.NO": 4, "DATE": "08-03-2024", "NAME": "P. LOKESH REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CSE / III", "STUDENT PH.NO": "8142364649", "PARENT NAME": "P.GURREDDY", "PARENT PH.NO": "9849715152", "STUDENT AADHAR": "9362 1884 1633", "ADDRESS": "BETHAMCHERLA(VIL),BETHAMCHERLA(MAND)", "STUDENT G-MAIL": "prathapreddymora8@gmail.com" },
    { "SI.NO": 5, "DATE": "04-12-2024", "NAME": "CHILLAKURU.JAIDEEPREDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CS-IOT / III", "STUDENT PH.NO": "9398162440", "PARENT NAME": "CH.MUNIVARDHAN REDDY", "PARENT PH.NO": "8500554405", "STUDENT AADHAR": "8422 5153 6149", "ADDRESS": "ARLAPADU(VIL),PELLAKURU(MAND)", "STUDENT G-MAIL": "jaideepreddych@gmail.com" },
    { "SI.NO": 6, "DATE": "10-03-2024", "NAME": "MORA.KASI PRATHAP REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CSE / II", "STUDENT PH.NO": "9542934676", "PARENT NAME": "M.PITCHI REDDY(LATE)", "PARENT PH.NO": "9032937974", "STUDENT AADHAR": "8095 8709 8296", "ADDRESS": "MALYAVANTHUNI PADU(VIL), MARKAPUR(MAND)", "STUDENT G-MAIL": "prathapreddymora8@gmail.com" },
    { "SI.NO": 7, "DATE": "11-02-2024", "NAME": "BUNA.MALLIKARJUNA REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "ECE / II", "STUDENT PH.NO": "8074729075", "PARENT NAME": "B.NARASHIMHA REDDY", "PARENT PH.NO": "9666128607", "STUDENT AADHAR": "2337 6316 5029", "ADDRESS": "GANGAPALEM(VIL),MARRIPUDI(MAND)", "STUDENT G-MAIL": "bunamallikarjunareddy9@gmail.com" },
    { "SI.NO": 8, "DATE": "27-01-2024", "NAME": "MUMMADI.RANGA TEJA KUMAR REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "AIDS / II", "STUDENT PH.NO": "8247754067", "PARENT NAME": "M. RAVINDHRA REDDY", "PARENT PH.NO": "9948249769", "STUDENT AADHAR": "3682 5792 4915", "ADDRESS": "BASUVUPALLI(VIL),KOMAROLU(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 9, "DATE": "11-03-2024", "NAME": "SANGAM.SRINIVASULU REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CIVIL / II", "STUDENT PH.NO": "6305086357", "PARENT NAME": "S.VENKAT REDDY", "PARENT PH.NO": "9542956008", "STUDENT AADHAR": "—", "ADDRESS": "PADDARIKATLA(VIL),KONAKALAMITLA(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 10, "DATE": "11-03-2024", "NAME": "M.SIVA NAGAMALLESWARA REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "ECE / II", "STUDENT PH.NO": "8919125271", "PARENT NAME": "M.VENKATA RANGA REDDY", "PARENT PH.NO": "9391450724", "STUDENT AADHAR": "8211 5445 9524", "ADDRESS": "VALUCHARLA(VIL),H.M. PADU(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 11, "DATE": "15-10-2024", "NAME": "KANDULA.KESAVA REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "EEE / II", "STUDENT PH.NO": "9014137107", "PARENT NAME": "K.SRINIVAS REDDY", "PARENT PH.NO": "9849610972", "STUDENT AADHAR": "5741 9168 4220", "ADDRESS": "DAMACHARLA(VIL),NALGONDA(DIST),T.G", "STUDENT G-MAIL": "" },
    { "SI.NO": 12, "DATE": "21-10-2024", "NAME": "LAKKIREDDY.NAGARJUNA REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "ECE / II", "STUDENT PH.NO": "9490570296", "PARENT NAME": "—", "PARENT PH.NO": "6303537845", "STUDENT AADHAR": "—", "ADDRESS": "NAGULAVARAM(VIL),VINUKONDA(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 13, "DATE": "30-09-2024", "NAME": "DUGGA.HARSHAVARDHAN REDDY", "COLLEGE": "RISE COLLEGE", "BRANCH/YEAR": "CSE / II", "STUDENT PH.NO": "9030700692", "PARENT NAME": "—", "PARENT PH.NO": "—", "STUDENT AADHAR": "—", "ADDRESS": "—", "STUDENT G-MAIL": "—" },
    { "SI.NO": 14, "DATE": "01-08-2024", "NAME": "KUNDURU.SIVAREDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "ECE / I", "STUDENT PH.NO": "7993966912", "PARENT NAME": "K.VENKATA REMANA REDDY", "PARENT PH.NO": "7799303912", "STUDENT AADHAR": "6190 0988 9778", "ADDRESS": "NARASARAVU PETA,LINGAMGUNTLA COLOUNY", "STUDENT G-MAIL": "" },
    { "SI.NO": 15, "DATE": "01-08-2024", "NAME": "D.ASHOK REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CS-IT / I", "STUDENT PH.NO": "6302144098", "PARENT NAME": "D. RAJASEKHAR REDDY", "PARENT PH.NO": "9010106515", "STUDENT AADHAR": "3170 9246 7670", "ADDRESS": "IRASALAGUNDAM(VIL),KONAKALAMITLA(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 16, "DATE": "02-08-2024", "NAME": "B.DILIP REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "IT / I", "STUDENT PH.NO": "9391608250", "PARENT NAME": "B.ANJI REDDY", "PARENT PH.NO": "7569115251", "STUDENT AADHAR": "4811 9507 7107", "ADDRESS": "VEMULA(VIL),MUNDAMULURU(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 17, "DATE": "07-08-2024", "NAME": "CH.TIRUPATHI REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CSDS / I", "STUDENT PH.NO": "9381749092", "PARENT NAME": "CH.VELAGONDA REDDY", "PARENT PH.NO": "6304332035", "STUDENT AADHAR": "3525 0428 4794", "ADDRESS": "CHENNAREDDY PALLI(VIL),MARKAPUR(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 18, "DATE": "22-08-2024", "NAME": "K.MALLIKARJUNA REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "ECE / I", "STUDENT PH.NO": "9100869092", "PARENT NAME": "K.RAMANA REDDY", "PARENT PH.NO": "9177049518", "STUDENT AADHAR": "8687 1709 5706", "ADDRESS": "KHAMBALAPADU(VIL),PODILI(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 19, "DATE": "22-08-2024", "NAME": "B.NARAYANA REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "ECE / I", "STUDENT PH.NO": "6301270824", "PARENT NAME": "B.SRI RAM REDDY", "PARENT PH.NO": "9603132523", "STUDENT AADHAR": "4343 9673 4691", "ADDRESS": "KHAMBALAPADU(VIL),PODILI(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 20, "DATE": "08-09-2024", "NAME": "PAMMI.ARUN KUMAR REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "—", "STUDENT PH.NO": "—", "PARENT NAME": "—", "PARENT PH.NO": "—", "STUDENT AADHAR": "—", "ADDRESS": "—", "STUDENT G-MAIL": "—" },
    { "SI.NO": 21, "DATE": "22-08-2024", "NAME": "MALLELA.VAMSI REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "MCA / I", "STUDENT PH.NO": "7760189479", "PARENT NAME": "M.OBUL REDDY", "PARENT PH.NO": "8500614512", "STUDENT AADHAR": "4602 2926 7635", "ADDRESS": "VAGGAMPALLI(VIL),PAMURU(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 22, "DATE": "21-09-2024", "NAME": "A.AVINASH REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "CSE / I", "STUDENT PH.NO": "9908871124", "PARENT NAME": "A.VENKATESWARA REDDY", "PARENT PH.NO": "9640011244", "STUDENT AADHAR": "3922 2745 7304", "ADDRESS": "VEMULA(VIL),MUNDAMULURU(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 23, "DATE": "04-11-2024", "NAME": "CHALLA.VENKATESWARA REDDY", "COLLEGE": "QIS COLLEGE", "BRANCH/YEAR": "—", "STUDENT PH.NO": "—", "PARENT NAME": "—", "PARENT PH.NO": "—", "STUDENT AADHAR": "—", "ADDRESS": "—", "STUDENT G-MAIL": "—" },
    { "SI.NO": 24, "DATE": "28-06-2024", "NAME": "ATLA.VAMSI KRISHNA REDDY", "COLLEGE": "COACHING", "BRANCH/YEAR": "COACHING", "STUDENT PH.NO": "8885858162", "PARENT NAME": "A.VENKATA RAMAKRISHNA REDDY", "PARENT PH.NO": "9666919279", "STUDENT AADHAR": "8581 7308 6311", "ADDRESS": "KANUPARTI(VIL), N.G. PADU(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 25, "DATE": "02-08-2024", "NAME": "K.GOVARDHAN REDDY", "COLLEGE": "HARSHINI DEGREE COLLEGE", "BRANCH/YEAR": "BCA / I", "STUDENT PH.NO": "7780157630", "PARENT NAME": "K.TIRUPATI REDDY", "PARENT PH.NO": "7893780270", "STUDENT AADHAR": "8415 1850 0941", "ADDRESS": "APPAYA PALEM(VIL),DARSI(MAND)", "STUDENT G-MAIL": "" },
    { "SI.NO": 26, "DATE": "01-08-2024", "NAME": "JAVVADI.ADINARAYANA", "COLLEGE": "AKVK", "BRANCH/YEAR": "ITI / I", "STUDENT PH.NO": "9346739626", "PARENT NAME": "J.SEKHAR", "PARENT PH.NO": "9849345746", "STUDENT AADHAR": "—", "ADDRESS": "—", "STUDENT G-MAIL": "—" },
    { "SI.NO": 27, "DATE": "05-08-2024", "NAME": "YAKKANTI.MALLIKARJUNA REDDY", "COLLEGE": "AKVK", "BRANCH/YEAR": "ITI / I", "STUDENT PH.NO": "9603828625", "PARENT NAME": "Y.KASI REDDY", "PARENT PH.NO": "8885203672", "STUDENT AADHAR": null, "ADDRESS": null, "STUDENT G-MAIL": null }
];


const romanToNumber = (roman: string): number | null => {
    switch (roman?.toUpperCase()) {
        case 'I': return 1;
        case 'II': return 2;
        case 'III': return 3;
        default: return null;
    }
}

const formatName = (name: string): string => {
    if (!name || typeof name !== 'string') return 'Unknown';
    return name
        .split('.')
        .map(part => part.trim())
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
};

const cleanData = (value: any): string | null => {
    const str = String(value || '').trim();
    return str === '—' || str === 'null' || !str ? null : str;
}


const parseSheetData = (rawData: any[]): Student[] => {
    return rawData.map((row, index) => {
        const branchYear = String(row["BRANCH/YEAR"] || '');
        const parts = branchYear.split('/').map(p => p.trim());
        const course = cleanData(parts[0]) || 'N/A';
        const year = parts.length > 1 ? romanToNumber(parts[1]) : null;

        const fatherName = cleanData(row["PARENT NAME"]) || 'N/A';

        return {
            id: `GS${1000 + (row["SI.NO"] || index)}`,
            registrationDate: cleanData(row["DATE"]) || new Date().toISOString().split('T')[0],
            name: formatName(row["NAME"]),
            fatherName: fatherName,
            parentContact: cleanData(row["PARENT PH.NO"]),
            collegeName: cleanData(row["COLLEGE"]) || 'N/A',
            course: course,
            year: year,
            contact: cleanData(row["STUDENT PH.NO"]),
            email: cleanData(row["STUDENT G-MAIL"]),
            aadharNumber: cleanData(row["STUDENT AADHAR"])?.replace(/\s/g, '') || null,
            address: cleanData(row["ADDRESS"]),
            photoUrl: `https://i.pravatar.cc/150?u=GS${1000 + (row["SI.NO"] || index)}`,
            roomNumber: null,
            feeStatus: Math.random() > 0.3 ? 'Paid' : 'Pending',
            admissionStatus: 'Confirmed',
            applicationType: 'Google Sheet',
        };
    });
};

export const MOCK_STUDENTS: Student[] = parseSheetData(GOOGLE_SHEET_DATA);

const generateRooms = (): Room[] => {
    const rooms: Room[] = [];
    // First Floor: 20 rooms
    for (let i = 101; i <= 120; i++) {
        rooms.push({ number: i, floor: 1, capacity: 3, occupantIds: [] });
    }
    // Second Floor: 18 rooms
    for (let i = 201; i <= 218; i++) {
        rooms.push({ number: i, floor: 2, capacity: 3, occupantIds: [] });
    }
    return rooms;
};

export const MOCK_ROOMS: Room[] = generateRooms();


export const MOCK_COMPLAINTS: Complaint[] = [
    { id: 'C01', studentId: MOCK_STUDENTS[10].id, studentName: MOCK_STUDENTS[10].name, roomNumber: MOCK_STUDENTS[10].roomNumber || 0, complaint: 'Fan is not working properly.', date: '2024-05-10', status: 'Open', replies: [] },
    { id: 'C02', studentId: MOCK_STUDENTS[12].id, studentName: MOCK_STUDENTS[12].name, roomNumber: MOCK_STUDENTS[12].roomNumber || 0, complaint: 'Water leakage in the bathroom.', date: '2024-05-08', status: 'Resolved', replies: [{ text: 'The plumber has fixed the leakage issue.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }] },
    { id: 'C03', studentId: MOCK_STUDENTS[15].id, studentName: MOCK_STUDENTS[15].name, roomNumber: MOCK_STUDENTS[15].roomNumber || 0, complaint: 'Wi-fi signal is very weak in my room.', date: '2024-05-11', status: 'Open', replies: [] },
];

const generateMonthlyAttendance = (students: Student[]): AttendanceRecord[] => {
    const attendance: AttendanceRecord[] = [];
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const year = now.getFullYear();
    const month = now.getMonth();
    // Only generate up to yesterday
    const lastDayToGenerate = yesterday.getDate();

    const confirmedStudents = students.filter(s => s.admissionStatus === 'Confirmed');

    confirmedStudents.forEach(student => {
        // Only generate for the current month
        if (yesterday.getMonth() === month) {
            for (let day = 1; day <= lastDayToGenerate; day++) {
                const date = new Date(year, month, day).toISOString().split('T')[0];
                attendance.push({
                    studentId: student.id,
                    studentName: student.name,
                    date: date,
                    status: Math.random() > 0.1 ? 'Present' : 'Absent'
                });
            }
        }
    });

    return attendance;
};

export const MOCK_ATTENDANCE: AttendanceRecord[] = generateMonthlyAttendance(MOCK_STUDENTS);

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'M01',
    studentId: MOCK_STUDENTS[8].id,
    studentName: MOCK_STUDENTS[8].name,
    subject: 'Leave of Absence Inquiry',
    status: 'Unread',
    conversation: [{
      id: 'C01-1',
      sender: 'student',
      text: 'Hello, I wanted to inquire about the process for getting a leave of absence for next weekend. Thank you.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    }]
  },
  {
    id: 'M02',
    studentId: MOCK_STUDENTS[10].id,
    studentName: MOCK_STUDENTS[10].name,
    subject: 'Room Light Flickering',
    status: 'Read',
    conversation: [
      {
        id: 'C02-1',
        sender: 'student',
        text: 'My room light is flickering. Can someone from maintenance please take a look? Room 105.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'C02-2',
        sender: 'admin',
        text: 'Hi, we have logged your complaint. An electrician will visit your room this afternoon to resolve the issue.',
        timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
      }
    ]
  }
];

export const MOCK_WARDEN_PROFILE: WardenProfile = {
  name: 'Mr. K. Sudarshan Reddy',
  title: 'Hostel Warden',
  email: 'warden@reddyhostel.org',
  phone: '+919123456789',
  phoneDisplay: '+91 91234 56789',
  officeHours: 'Mon - Fri, 9:00 AM - 5:00 PM',
  bio: 'With over 15 years of experience in student management, Mr. Reddy is dedicated to ensuring a safe, disciplined, and supportive environment for all our students. He is always available to address concerns and provide guidance.',
  imageUrl: 'https://i.pravatar.cc/150?u=warden-admin'
};
