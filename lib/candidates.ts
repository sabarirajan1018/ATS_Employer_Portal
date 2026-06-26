import type { Candidate } from './types';

export const candidates: Candidate[] = [
  {
    id: 'c-001',
    redactedName: 'Raj K.',
    occupation: 'Welder',
    country: 'India',
    yearsExperience: 7,
    skills: [
      'TIG Welding',
      'MIG Welding',
      'Pipe Welding',
      'Structural Fabrication',
      'Blueprint Reading',
      'Weld Inspection',
    ],
    certifications: [
      { name: 'AWS D1.1 Structural Welding', issuer: 'American Welding Society', year: '2022', verified: true },
      { name: 'ISO 9606-1 Pipe Welding', issuer: 'International Standards Org', year: '2021', verified: true },
      { name: '6G Welding Certification', issuer: 'Indian Institute of Welding', year: '2020', verified: true },
    ],
    occupationCode: 'ANZSCO 322313',
    matchScore: 94,
    aiConfidence: 96,
    aiSummary:
      'Experienced Welder with 7+ years of expertise in structural fabrication, industrial construction, and pipeline welding projects across GCC countries. Proven track record delivering high-pressure systems and structural steel to Australian and international standards.',
    aiExperience: [
      {
        role: 'Lead Structural Welder',
        company: 'Gulf Fabrication Industries',
        country: 'United Arab Emirates',
        duration: '2020 - 2024',
        summary:
          'Led a team of 8 welders on industrial construction projects including oil refineries and power plants. Maintained zero-defect rate across 40+ structural fabrications.',
      },
      {
        role: 'Pipe Welder',
        company: 'Reliance Industries',
        country: 'India',
        duration: '2017 - 2020',
        summary:
          'Specialised in high-pressure pipeline welding for petrochemical facilities. Completed advanced 6G position welds to ASME IX standards.',
      },
    ],
    languages: ['English (Fluent)', 'Hindi (Native)', 'Malayalam (Native)'],
    availability: '2-4 Weeks',
    ieltsScore: 6.5,
    regionExperience: ['GCC Countries', 'South Asia'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nExperienced Welder specialising in structural and pipe fabrication with 7+ years across India and the UAE.\n\nCORE COMPETENCIES\n• TIG, MIG and Stick welding\n• Structural steel fabrication\n• Blueprint interpretation\n• Quality inspection and NDT\n\nCERTIFICATIONS\n• AWS D1.1 Structural Welding (Verified)\n• ISO 9606-1 Pipe Welding (Verified)\n• 6G Welding Certification (Verified)\n\nEMPLOYMENT HISTORY\nLead Structural Welder — Gulf Fabrication Industries, UAE (2020-2024)\nPipe Welder — Reliance Industries, India (2017-2020)\n\nLANGUAGES\nEnglish (Fluent), Hindi, Malayalam',
    contact: {
      fullName: 'Rajesh Krishnan',
      email: 'rajesh.krishnan@example.com',
      phone: '+91 98765 43210',
    },
    createdAt: '2025-05-10',
  },
  {
    id: 'c-002',
    redactedName: 'Miguel S.',
    occupation: 'Electrician',
    country: 'Philippines',
    yearsExperience: 9,
    skills: [
      'Industrial Wiring',
      'Switchboard Installation',
      'PLC Programming',
      'Preventive Maintenance',
      'Electrical Safety Compliance',
      'Solar Installation',
    ],
    certifications: [
      { name: 'Licensed Master Electrician', issuer: 'Philippine Technical Board', year: '2019', verified: true },
      { name: 'IEC 60364 Electrical Installations', issuer: 'IEC', year: '2021', verified: true },
      { name: 'Solar PV Installation', issuer: 'TESDA Philippines', year: '2023', verified: true },
    ],
    occupationCode: 'ANZSCO 341111',
    matchScore: 97,
    aiConfidence: 94,
    aiSummary:
      'Licensed Electrician with 9 years across commercial and industrial electrical systems. Strong background in PLC automation, solar PV, and switchboard installation with demonstrated compliance to IEC standards.',
    aiExperience: [
      {
        role: 'Industrial Electrician',
        company: 'Manila Manufacturing Corp',
        country: 'Philippines',
        duration: '2019 - 2024',
        summary:
          'Maintained and installed electrical systems across 3 manufacturing plants. Upgraded 12 switchboards and reduced downtime by 32% through preventive maintenance program.',
      },
      {
        role: 'Electrical Technician',
        company: 'SolarTech Philippines',
        country: 'Philippines',
        duration: '2015 - 2019',
        summary:
          'Installed commercial solar PV systems totalling 4.2MW capacity. Commissioned inverters and performed grid connection testing.',
      },
    ],
    languages: ['English (Fluent)', 'Filipino (Native)'],
    availability: 'Immediate',
    ieltsScore: 7.0,
    regionExperience: ['Southeast Asia'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nLicensed Electrician with 9 years in industrial, commercial and solar PV installations.\n\nCOMPETENCIES\n• Industrial wiring and switchboards\n• PLC programming and troubleshooting\n• Solar PV system installation\n• Preventive maintenance\n\nLICENSES & CERTIFICATIONS\n• Licensed Master Electrician (Verified)\n• IEC 60364 Electrical Installations (Verified)\n• Solar PV Installation (Verified)\n\nEMPLOYMENT\nIndustrial Electrician — Manila Manufacturing Corp (2019-2024)\nElectrical Technician — SolarTech Philippines (2015-2019)\n\nLANGUAGES\nEnglish (Fluent), Filipino',
    contact: {
      fullName: 'Miguel Santos',
      email: 'miguel.santos@example.com',
      phone: '+63 917 123 4567',
    },
    createdAt: '2025-05-08',
  },
  {
    id: 'c-003',
    redactedName: 'Ahmed R.',
    occupation: 'Carpenter',
    country: 'Pakistan',
    yearsExperience: 5,
    skills: [
      'Formwork Carpentry',
      'Finishing Carpentry',
      'Door & Window Installation',
      'Timber Framing',
      'Concrete Formwork',
    ],
    certifications: [
      { name: 'Carpentry Trade Certificate', issuer: 'Punjab Vocational Council', year: '2020', verified: true },
      { name: 'Dropped Tool Certification', issuer: 'Site Safety Council', year: '2022', verified: false },
    ],
    occupationCode: 'ANZSCO 331212',
    matchScore: 81,
    aiConfidence: 90,
    aiSummary:
      'Skilled Carpenter with 5 years experience in formwork and finishing carpentry for residential and commercial construction. Demonstrated precision work on multi-storey projects.',
    aiExperience: [
      {
        role: 'Carpenter',
        company: 'Lahore Construction Group',
        country: 'Pakistan',
        duration: '2020 - 2024',
        summary:
          'Delivered formwork for 4 residential towers and one commercial building. Specialised in finishing carpentry for doors, windows and fixtures.',
      },
      {
        role: 'Apprentice Carpenter',
        company: 'Faisal Builders',
        country: 'Pakistan',
        duration: '2019 - 2020',
        summary: 'Completed 12-month apprenticeship covering timber framing and concrete formwork fundamentals.',
      },
    ],
    languages: ['English (Intermediate)', 'Urdu (Native)', 'Punjabi (Native)'],
    availability: '1-2 Months',
    ieltsScore: 5.5,
    regionExperience: ['South Asia'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nCarpenter with 5 years in formwork and finishing for residential and commercial construction.\n\nSKILLS\n• Concrete formwork\n• Finishing carpentry\n• Door & window installation\n• Timber framing\n\nCERTIFICATIONS\n• Carpentry Trade Certificate (Verified)\n• Dropped Tool Certification (Pending)\n\nEMPLOYMENT\nCarpenter — Lahore Construction Group (2020-2024)\nApprentice — Faisal Builders (2019-2020)',
    contact: {
      fullName: 'Ahmed Raza',
      email: 'ahmed.raza@example.com',
      phone: '+92 300 1234567',
    },
    createdAt: '2025-05-12',
  },
  {
    id: 'c-004',
    redactedName: 'Carlos M.',
    occupation: 'Diesel Mechanic',
    country: 'Philippines',
    yearsExperience: 11,
    skills: [
      'Heavy Equipment Repair',
      'Hydraulic Systems',
      'Engine Diagnostics',
      'Fleet Maintenance',
      'Preventive Maintenance',
      'Earthmoving Equipment',
    ],
    certifications: [
      { name: 'Heavy Equipment Mechanic Certificate', issuer: 'TESDA Philippines', year: '2018', verified: true },
      { name: 'Cummins Engine Certification', issuer: 'Cummins', year: '2020', verified: true },
    ],
    occupationCode: 'ANZSCO 321212',
    matchScore: 92,
    aiConfidence: 98,
    aiSummary:
      'Senior Diesel Mechanic with 11 years maintaining heavy earthmoving equipment and fleet vehicles for mining and construction operations. Strong diagnostics capability on Cummins, Caterpillar and Komatsu systems.',
    aiExperience: [
      {
        role: 'Senior Diesel Mechanic',
        company: 'Atlas Mining Services',
        country: 'Philippines',
        duration: '2018 - 2024',
        summary:
          'Maintained a fleet of 40+ heavy earthmoving machines. Reduced breakdown incidents by 45% through structured preventive maintenance scheduling.',
      },
      {
        role: 'Diesel Mechanic',
        company: 'Cebu Trucking Co',
        country: 'Philippines',
        duration: '2013 - 2018',
        summary:
          'Repaired and maintained a 60-vehicle trucking fleet. Performed in-field diagnostics and engine overhauls.',
      },
    ],
    languages: ['English (Fluent)', 'Filipino (Native)'],
    availability: 'Immediate',
    ieltsScore: 6.0,
    regionExperience: ['Southeast Asia'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nSenior Diesel Mechanic, 11 years on heavy earthmoving equipment and fleet vehicles.\n\nSKILLS\n• Heavy equipment & engine repair\n• Hydraulic systems\n• Engine diagnostics\n• Preventive maintenance\n\nCERTIFICATIONS\n• Heavy Equipment Mechanic Certificate (Verified)\n• Cummins Engine Certification (Verified)\n\nEMPLOYMENT\nSenior Diesel Mechanic — Atlas Mining Services (2018-2024)\nDiesel Mechanic — Cebu Trucking Co (2013-2018)',
    contact: {
      fullName: 'Carlos Mendoza',
      email: 'carlos.mendoza@example.com',
      phone: '+63 918 555 1212',
    },
    createdAt: '2025-05-09',
  },
  {
    id: 'c-005',
    redactedName: 'Anushka P.',
    occupation: 'Registered Nurse',
    country: 'Sri Lanka',
    yearsExperience: 6,
    skills: [
      'Acute Care',
      'Patient Assessment',
      'IV Therapy',
      'Wound Care',
      'Medication Management',
      'Emergency Triage',
    ],
    certifications: [
      { name: 'Registered Nurse (Sri Lanka)', issuer: 'Sri Lanka Medical Council', year: '2019', verified: true },
      { name: 'BLS & ACLS Certified', issuer: 'American Heart Association', year: '2023', verified: true },
      { name: 'AHPRA Registration Eligible', issuer: 'AHPRA Australia', year: '2025', verified: true },
    ],
    occupationCode: 'ANZSCO 254412',
    matchScore: 89,
    aiConfidence: 95,
    aiSummary:
      'Registered Nurse with 6 years across acute care and emergency departments. AHPRA-eligible and fully certified for Australian practice. Strong triage and IV therapy background.',
    aiExperience: [
      {
        role: 'Emergency Department Nurse',
        company: 'Colombo General Hospital',
        country: 'Sri Lanka',
        duration: '2021 - 2024',
        summary:
          'Managed acute patient care in a high-volume emergency department. Performed triage for 60+ daily patients and led IV therapy protocols.',
      },
      {
        role: 'Acute Care Nurse',
        company: 'Kandy Teaching Hospital',
        country: 'Sri Lanka',
        duration: '2018 - 2021',
        summary:
          'Delivered post-operative and acute care. Maintained medication management for 24-bed ward with zero adverse events.',
      },
    ],
    languages: ['English (Fluent)', 'Sinhala (Native)', 'Tamil (Professional)'],
    availability: '2-4 Weeks',
    ieltsScore: 7.5,
    regionExperience: ['South Asia'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nRegistered Nurse, 6 years in acute and emergency care.\n\nSKILLS\n• Acute & emergency care\n• IV therapy\n• Wound care\n• Medication management\n\nREGISTRATION & CERTIFICATIONS\n• Registered Nurse Sri Lanka (Verified)\n• BLS & ACLS (Verified)\n• AHPRA Eligible (Verified)\n\nEMPLOYMENT\nED Nurse — Colombo General Hospital (2021-2024)\nAcute Care Nurse — Kandy Teaching Hospital (2018-2021)',
    contact: {
      fullName: 'Anushka Perera',
      email: 'anushka.perera@example.com',
      phone: '+94 77 123 4567',
    },
    createdAt: '2025-05-11',
  },
  {
    id: 'c-006',
    redactedName: 'Tomasz K.',
    occupation: 'Plumber',
    country: 'Poland',
    yearsExperience: 8,
    skills: [
      'Commercial Plumbing',
      'Pipefitting',
      'Drainage Systems',
      'Gas Fitting',
      'Hot Water Systems',
      'Backflow Prevention',
    ],
    certifications: [
      { name: 'Licensed Gas Fitter', issuer: 'Polish Chamber of Crafts', year: '2019', verified: true },
      { name: 'Commercial Plumbing License', issuer: 'Polish Construction Authority', year: '2017', verified: true },
    ],
    occupationCode: 'ANZSCO 334111',
    matchScore: 88,
    aiConfidence: 92,
    aiSummary:
      'Licensed Plumber and Gas Fitter with 8 years across commercial construction and residential fit-outs. EU-qualified with strong drainage and gas fitting expertise.',
    aiExperience: [
      {
        role: 'Commercial Plumber',
        company: 'Warsaw Building Services',
        country: 'Poland',
        duration: '2020 - 2024',
        summary:
          'Delivered plumbing for 9 commercial fit-outs including office buildings and ahotel complexes. Installed gas and hot water systems to EU standards.',
      },
      {
        role: 'Plumber / Gas Fitter',
        company: 'Krakow Plumbing Co',
        country: 'Poland',
        duration: '2016 - 2020',
        summary: 'Residential and commercial plumbing including drainage, gas fitting and backflow prevention.',
      },
    ],
    languages: ['English (Fluent)', 'Polish (Native)', 'German (Professional)'],
    availability: '1-2 Months',
    ieltsScore: 6.5,
    regionExperience: ['European Union'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nLicensed Plumber and Gas Fitter, 8 years commercial and residential.\n\nSKILLS\n• Commercial plumbing & pipefitting\n• Drainage systems\n• Gas fitting\n• Hot water systems\n\nCERTIFICATIONS\n• Licensed Gas Fitter (Verified)\n• Commercial Plumbing License (Verified)\n\nEMPLOYMENT\nCommercial Plumber — Warsaw Building Services (2020-2024)\nPlumber / Gas Fitter — Krakow Plumbing Co (2016-2020)',
    contact: {
      fullName: 'Tomasz Kowalski',
      email: 'tomasz.kowalski@example.com',
      phone: '+48 600 123 456',
    },
    createdAt: '2025-05-07',
  },
  {
    id: 'c-007',
    redactedName: 'Grace W.',
    occupation: 'Civil Engineer',
    country: 'Kenya',
    yearsExperience: 10,
    skills: [
      'Site Supervision',
      'Structural Design',
      'Project Management',
      'Quantity Surveying',
      'AutoCAD',
      'Stakeholder Coordination',
    ],
    certifications: [
      { name: 'Professional Engineer (Kenya)', issuer: 'Engineers Board of Kenya', year: '2018', verified: true },
      { name: 'PRINCE2 Practitioner', issuer: 'AXELOS', year: '2021', verified: true },
    ],
    occupationCode: 'ANZSCO 233211',
    matchScore: 90,
    aiConfidence: 93,
    aiSummary:
      'Chartered Civil Engineer with 10 years supervising infrastructure projects across road, bridge and water works sectors. PRINCE2-certified project manager proven in stakeholder coordination.',
    aiExperience: [
      {
        role: 'Project Civil Engineer',
        company: 'Nairobi Infrastructure Group',
        country: 'Kenya',
        duration: '2018 - 2024',
        summary:
          'Supervised delivery of 3 major road infrastructure projects valued at AUD 40M+. Managed 25+ on-site staff and coordinated 12 subcontractors.',
      },
      {
        role: 'Site Engineer',
        company: 'Mombasa Construction Ltd',
        country: 'Kenya',
        duration: '2014 - 2018',
        summary: 'Delivered structural design and site supervision for residential and commercial builds.',
      },
    ],
    languages: ['English (Fluent)', 'Swahili (Native)'],
    availability: '3-6 Months',
    ieltsScore: 8.0,
    regionExperience: ['East Africa'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nChartered Civil Engineer, 10 years in road, bridge and water infrastructure.\n\nSKILLS\n• Site supervision & structural design\n• Project management\n• Quantity surveying & AutoCAD\n\nCERTIFICATIONS\n• Professional Engineer Kenya (Verified)\n• PRINCE2 Practitioner (Verified)\n\nEMPLOYMENT\nProject Civil Engineer — Nairobi Infrastructure Group (2018-2024)\nSite Engineer — Mombasa Construction Ltd (2014-2018)',
    contact: {
      fullName: 'Grace Wanjiru',
      email: 'grace.wanjiru@example.com',
      phone: '+254 712 345 678',
    },
    createdAt: '2025-05-06',
  },
  {
    id: 'c-008',
    redactedName: 'Duc N.',
    occupation: 'Chef',
    country: 'Vietnam',
    yearsExperience: 7,
    skills: [
      'Asian Cuisine',
      'Modern Australian Cuisine',
      'Menu Development',
      'Kitchen Management',
      'Food Safety Compliance',
      'Pastry',
    ],
    certifications: [
      { name: 'Commercial Cookery Certificate IV', issuer: 'Vietnamese Culinary Institute', year: '2019', verified: true },
      { name: 'Food Safety Supervisor', issuer: 'WHO Vietnam', year: '2022', verified: true },
    ],
    occupationCode: 'ANZSCO 351313',
    matchScore: 85,
    aiConfidence: 91,
    aiSummary:
      'Experienced Chef with 7 years spanning Vietnamese cuisine and modern Australian menus. Strong menu development and kitchen management capability for commercial kitchens.',
    aiExperience: [
      {
        role: 'Head Chef',
        company: 'Saigon Modern Kitchen',
        country: 'Vietnam',
        duration: '2021 - 2024',
        summary:
          'Led a 14-person kitchen, developed seasonal menus, and maintained 5-star food safety record across 360 covers per service.',
      },
      {
        role: 'Sous Chef',
        company: 'Hanoi Riverside Hotel',
        country: 'Vietnam',
        duration: '2017 - 2021',
        summary: 'Supported international cuisine service for a 200-room hotel, including banquet operations.',
      },
    ],
    languages: ['English (Professional)', 'Vietnamese (Native)'],
    availability: '2-4 Weeks',
    ieltsScore: 6.0,
    regionExperience: ['Southeast Asia'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nChef, 7 years across Vietnamese and modern Australian cuisine.\n\nSKILLS\n• Asian & modern Australian cuisine\n• Menu development\n• Kitchen management & food safety\n\nCERTIFICATIONS\n• Commercial Cookery Certificate IV (Verified)\n• Food Safety Supervisor (Verified)\n\nEMPLOYMENT\nHead Chef — Saigon Modern Kitchen (2021-2024)\nSous Chef — Hanoi Riverside Hotel (2017-2021)',
    contact: {
      fullName: 'Duc Nguyen',
      email: 'duc.nguyen@example.com',
      phone: '+84 91 234 5678',
    },
    createdAt: '2025-05-05',
  },
  {
    id: 'c-009',
    redactedName: 'Liam O.',
    occupation: 'Automotive Electrician',
    country: 'Ireland',
    yearsExperience: 4,
    skills: [
      'Vehicle Diagnostics',
      'CAN Bus Systems',
      'EV Battery Systems',
      'Wiring Looms',
      'Alternator & Starter Repair',
    ],
    certifications: [
      { name: 'EV High Voltage Certification', issuer: 'IMI UK', year: '2023', verified: true },
      { name: 'Automotive Electrician Apprenticeship', issuer: 'SOLAS Ireland', year: '2021', verified: true },
    ],
    occupationCode: 'ANZSCO 321111',
    matchScore: 78,
    aiConfidence: 88,
    aiSummary:
      'Automotive Electrician with 4 years across passenger and light commercial vehicles. EV high-voltage certified, with growing capability in modern CAN bus and battery systems.',
    aiExperience: [
      {
        role: 'Automotive Electrician',
        company: 'Dublin Auto Electrical',
        country: 'Ireland',
        duration: '2021 - 2024',
        summary:
          'Diagnosed and repaired electrical faults across 8 vehicle brands. Installed tow-bar wiring, reverse cameras and EV battery diagnostics.',
      },
      {
        role: 'Apprentice Auto Electrician',
        company: 'Cork Motors',
        country: 'Ireland',
        duration: '2020 - 2021',
        summary: 'Completed apprenticeship covering wiring looms, alternators and starter motor overhauls.',
      },
    ],
    languages: ['English (Native)'],
    availability: 'Immediate',
    ieltsScore: 8.5,
    regionExperience: ['European Union'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nAutomotive Electrician, 4 years on passenger and light commercial vehicles.\n\nSKILLS\n• Vehicle diagnostics & CAN bus\n• EV battery systems\n• Wiring looms\n\nCERTIFICATIONS\n• EV High Voltage Certification (Verified)\n• Automotive Electrician Apprenticeship (Verified)\n\nEMPLOYMENT\nAutomotive Electrician — Dublin Auto Electrical (2021-2024)\nApprentice — Cork Motors (2020-2021)',
    contact: {
      fullName: 'Liam O\u2019Connor',
      email: 'liam.oconnor@example.com',
      phone: '+353 86 123 4567',
    },
    createdAt: '2025-05-04',
  },
  {
    id: 'c-010',
    redactedName: 'Fatima A.',
    occupation: 'Software Developer',
    country: 'Egypt',
    yearsExperience: 6,
    skills: [
      'React',
      'Node.js',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'AWS',
    ],
    certifications: [
      { name: 'AWS Certified Developer Associate', issuer: 'Amazon Web Services', year: '2023', verified: true },
      { name: 'Professional Scrum Master I', issuer: 'Scrum.org', year: '2022', verified: true },
    ],
    occupationCode: 'ANZSCO 261312',
    matchScore: 83,
    aiConfidence: 96,
    aiSummary:
      'Full-stack Software Developer with 6 years building production React/Node.js applications. AWS-certified with strong TypeScript and database design capability.',
    aiExperience: [
      {
        role: 'Senior Developer',
        company: 'Cairo Tech Solutions',
        country: 'Egypt',
        duration: '2021 - 2024',
        summary:
          'Led development of a SaaS analytics platform serving 12,000+ users. Designed the PostgreSQL schema and migrated 2 services to AWS Lambda.',
      },
      {
        role: 'Software Developer',
        company: 'Alexandria Software House',
        country: 'Egypt',
        duration: '2018 - 2021',
        summary: 'Built React frontends and Node.js APIs for fintech and e-commerce clients.',
      },
    ],
    languages: ['English (Fluent)', 'Arabic (Native)'],
    availability: '3-6 Months',
    ieltsScore: 7.0,
    regionExperience: ['North Africa', 'Middle East'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nFull-stack Developer, 6 years building React/Node.js production apps.\n\nSKILLS\n• React, Node.js, TypeScript\n• Python & PostgreSQL\n• AWS\n\nCERTIFICATIONS\n• AWS Developer Associate (Verified)\n• Professional Scrum Master I (Verified)\n\nEMPLOYMENT\nSenior Developer — Cairo Tech Solutions (2021-2024)\nSoftware Developer — Alexandria Software House (2018-2021)',
    contact: {
      fullName: 'Fatima Aly',
      email: 'fatima.aly@example.com',
      phone: '+20 100 123 4567',
    },
    createdAt: '2025-05-03',
  },
  {
    id: 'c-011',
    redactedName: 'Sven L.',
    occupation: 'Bricklayer',
    country: 'Germany',
    yearsExperience: 12,
    skills: [
      'Brick & Block Laying',
      'Stone Masonry',
      'Refractory Lining',
      'Restoration',
      'Mortar Mixing',
    ],
    certifications: [
      { name: 'Master Bricklayer (Meister)', issuer: 'German Chamber of Crafts', year: '2016', verified: true },
      { name: 'Refractory Specialist', issuer: 'VDZ Germany', year: '2019', verified: true },
    ],
    occupationCode: 'ANZSCO 331111',
    matchScore: 95,
    aiConfidence: 97,
    aiSummary:
      'Master Bricklayer (Meister) with 12 years across residential, restoration and industrial refractory work. German-trade qualified with strong refractory lining capability for industrial furnaces.',
    aiExperience: [
      {
        role: 'Master Bricklayer',
        company: 'Munich Restoration Crafts',
        country: 'Germany',
        duration: '2018 - 2024',
        summary:
          'Led heritage restoration of 6 listed buildings. Delivered specialist stonework and bricklaying to conservation standards.',
      },
      {
        role: 'Refractory Mason',
        company: 'Rheinland Industrial Services',
        country: 'Germany',
        duration: '2012 - 2018',
        summary: 'Installed refractory linings for cement kilns and steel furnaces across 14 industrial sites.',
      },
    ],
    languages: ['English (Fluent)', 'German (Native)'],
    availability: '1-2 Months',
    ieltsScore: 7.0,
    regionExperience: ['European Union'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nMaster Bricklayer (Meister), 12 years across restoration and refractory work.\n\nSKILLS\n• Brick & block laying\n• Stone masonry & restoration\n• Refractory lining\n\nCERTIFICATIONS\n• Master Bricklayer Meister (Verified)\n• Refractory Specialist (Verified)\n\nEMPLOYMENT\nMaster Bricklayer — Munich Restoration Crafts (2018-2024)\nRefractory Mason — Rheinland Industrial Services (2012-2018)',
    contact: {
      fullName: 'Sven Lehmann',
      email: 'sven.lehmann@example.com',
      phone: '+49 170 1234567',
    },
    createdAt: '2025-05-02',
  },
  {
    id: 'c-012',
    redactedName: 'Josefa V.',
    occupation: 'Painter & Decorator',
    country: 'Fiji',
    yearsExperience: 6,
    skills: [
      'Interior Painting',
      'Exterior Painting',
      'Spray Painting',
      'Wallpapering',
      'Surface Preparation',
    ],
    certifications: [
      { name: 'Trade Certificate Painting & Decorating', issuer: 'Fiji Training & Productivity Authority', year: '2020', verified: true },
    ],
    occupationCode: 'ANZSCO 332211',
    matchScore: 79,
    aiConfidence: 89,
    aiSummary:
      'Painter & Decorator with 6 years across residential and commercial interiors and exteriors. Strong spray painting and surface preparation capability for fit-out work.',
    aiExperience: [
      {
        role: 'Painter & Decorator',
        company: 'Suva Paintworks',
        country: 'Fiji',
        duration: '2019 - 2024',
        summary: 'Delivered interiors and exteriors for hotels and residential complexes. Specialised in spray application.',
      },
      {
        role: 'Apprentice Painter',
        company: 'Nadi Builders',
        country: 'Fiji',
        duration: '2018 - 2019',
        summary: 'Completed apprenticeship covering surface preparation, wallpapering and brush finish work.',
      },
    ],
    languages: ['English (Fluent)', 'Fijian (Native)', 'Hindi (Conversational)'],
    availability: 'Immediate',
    ieltsScore: 6.5,
    regionExperience: ['Pacific Islands'],
    redactedResume:
      'PROFESSIONAL SUMMARY\nPainter & Decorator, 6 years residential and commercial.\n\nSKILLS\n• Interior & exterior painting\n• Spray painting & wallpapering\n• Surface preparation\n\nCERTIFICATIONS\n• Trade Certificate Painting & Decorating (Verified)\n\nEMPLOYMENT\nPainter & Decorator — Suva Paintworks (2019-2024)\nApprentice — Nadi Builders (2018-2019)',
    contact: {
      fullName: 'Josefa Vakasere',
      email: 'josefa.vakasere@example.com',
      phone: '+679 912 3456',
    },
    createdAt: '2025-05-01',
  },
];

export function getCandidate(id: string): Candidate | undefined {
  return candidates.find((c) => c.id === id);
}

export const occupations = Array.from(
  new Set(candidates.map((c) => c.occupation)),
).sort();
export const countries = Array.from(
  new Set(candidates.map((c) => c.country)),
).sort();
export const allSkills = Array.from(
  new Set(candidates.flatMap((c) => c.skills)),
).sort();
export const allLanguages = Array.from(
  new Set(candidates.flatMap((c) => c.languages.map((l) => l.split(' ')[0]))),
).sort();
export const allCertifications = Array.from(
  new Set(candidates.flatMap((c) => c.certifications.map((cert) => cert.name))),
).sort();
