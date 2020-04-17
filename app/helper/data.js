import { sortBy } from "lodash";

export const listError = [
  {
    name: "name",
    error: [2041, 5000, 5001, 5002, 5003, 5004, 5005]
  },
  {
    name: "email",
    error: [2002, 2003, 2026]
  },
  {
    name: "password",
    error: [2022, 2023, 2024, 2025, 2026, 90003]
  },
  {
    name: "currentPassword",
    error: [2023]
  },
  {
    name: "passwordConfirm",
    error: [2024]
  },
  {
    name: "recentPassword",
    error: [2022, 2023, 2024, 2025, 2026]
  },
  {
    name: "phoneNumber",
    error: [2051, 21614, 21211]
  },
  {
    name: "countryCode",
    error: [2052]
  },
  {
    name: "code",
    error: [2031, 6021]
  },
  {
    name: "appoinmentTime",
    error: [6045, 6055]
  },
  {
    name: "accountNumber",
    error: [5025, 5026, 5027]
  }
];

export const listCard = [
  {
    title: "Earnings",
    date: "sep 2018",
    number: "$12,072.00",
    lastTime: "82% of last month"
  },
  {
    title: "Rating",
    date: "sep 2018",
    number: "4.5",
    lastTime: "338 reviews in total"
  },
  {
    title: "Accepted Jobs",
    date: "sep 2018",
    number: "192",
    lastTime: ""
  },
  {
    title: "Completed Jobs",
    date: "sep 2018",
    number: "128",
    lastTime: ""
  }
];

export const timeZone = [
  {
    "value": -12,
    "label": "(GMT -12:00) Eniwetok, Kwajalein"
  },
  {
    "value": -11,
    "label": "(GMT -11:00) Midway Island, Samoa"
  },
  {
    "value": -10,
    "label": "(GMT -10:00) Hawaii"
  },
  {
    "value": -9,
    "label": "(GMT -9:00) Alaska"
  },
  {
    "value": -8,
    "label": "(GMT -8:00) Pacific Time (US & Canada)"
  },
  {
    "value": -7,
    "label": "(GMT -7:00) Mountain Time (US & Canada)"
  },
  {
    "value": -6,
    "label": "(GMT -6:00) Central Time (US & Canada), Mexico City"
  },
  {
    "value": -5,
    "label": "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima"
  },
  {
    "value": -4,
    "label": "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz"
  },
  {
    "value": -3.5,
    "label": "(GMT -3:30) Newfoundland"
  },
  {
    "value": -3,
    "label": "(GMT -3:00) Brazil, Buenos Aires, Georgetown"
  },
  {
    "value": -2,
    "label": "(GMT -2:00) Mid-Atlantic"
  },
  {
    "value": -1,
    "label": "(GMT -1:00) Azores, Cape Verde Islands"
  },
  {
    "value": 0,
    "label": "(GMT) Western Europe Time, London, Lisbon, Casablanca"
  },
  {
    "value": 1,
    "label": "(GMT +1:00) Brussels, Copenhagen, Madrid, Paris"
  },
  {
    "value": 2,
    "label": "(GMT +2:00) Kaliningrad, South Africa"
  },
  {
    "value": 3,
    "label": "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg"
  },
  {
    "value": 3.5,
    "label": "(GMT +3:30) Tehran"
  },
  {
    "value": 4,
    "label": "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi"
  },
  {
    "value": 4.5,
    "label": "(GMT +4:30) Kabul"
  },
  {
    "value": 5,
    "label": "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent"
  },
  {
    "value": 5.5,
    "label": "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi"
  },
  {
    "value": 5.75,
    "label": "(GMT +5:45) Kathmandu"
  },
  {
    "value": 6,
    "label": "(GMT +6:00) Almaty, Dhaka, Colombo"
  },
  {
    "value": 7,
    "label": "(GMT +7:00) Bangkok, Hanoi, Jakarta"
  },
  {
    "value": 8,
    "label": "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong"
  },
  {
    "value": 9,
    "label": "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
  },
  {
    "value": 9.5,
    "label": "(GMT +9:30) Adelaide, Darwin"
  },
  {
    "value": 10,
    "label": "(GMT +10:00) Eastern Australia, Guam, Vladivostok"
  },
  {
    "value": 11,
    "label": "(GMT +11:00) Magadan, Solomon Islands, New Caledonia"
  },
  {
    "value": 12,
    "label": "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka"
  }
];

export const countries = [
  {
    "value": 235,
    "label": "Zambia",
    "local_name": "Zambia",
    "region": "Eastern Africa",
    "alpha2_code": "ZM",
    "country_code": "263",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 234,
    "label": "Yemen",
    "local_name": "Al Yaman",
    "region": "Arabian Peninsula, Middle East",
    "alpha2_code": "YE",
    "country_code": "260",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 233,
    "label": "Western Sahara",
    "local_name": "Aṣ-Ṣaḥrā’ al-Gharbīyah",
    "region": "Northern Africa",
    "alpha2_code": "EH",
    "country_code": "967",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 232,
    "label": "Wallis and Futuna Islands",
    "local_name": "Wallis et Futuna",
    "region": "Polynesia, Oceania",
    "alpha2_code": "WF",
    "country_code": "681",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 231,
    "label": "Virgin Islands [U.S.]",
    "local_name": "Virgin Islands",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "VI",
    "country_code": "1340",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 230,
    "label": "Virgin Islands [British]",
    "local_name": "",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "VG",
    "country_code": "1284",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 229,
    "label": "Vietnam",
    "local_name": "Viet Nam",
    "region": "South-East Asia",
    "alpha2_code": "VN",
    "country_code": "84",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 228,
    "label": "Venezuela",
    "local_name": "Venezuela",
    "region": "Northern South America",
    "alpha2_code": "VE",
    "country_code": "58",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 226,
    "label": "Vanuatu",
    "local_name": "Vanuatu",
    "region": "Melanesia, Oceania",
    "alpha2_code": "VU",
    "country_code": "678",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 225,
    "label": "Uzbekistan",
    "local_name": "Uzbekiston Respublikasi",
    "region": "Central Asia",
    "alpha2_code": "UZ",
    "country_code": "998",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 224,
    "label": "Uruguay",
    "local_name": "Republica Oriental del Uruguay",
    "region": "Central East South America",
    "alpha2_code": "UY",
    "country_code": "598",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 223,
    "label": "United States",
    "local_name": "United States",
    "region": "North America",
    "alpha2_code": "US",
    "country_code": "1",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 222,
    "label": "United Kingdom",
    "local_name": "United Kingdom",
    "region": "Northern Europe",
    "alpha2_code": "GB",
    "country_code": "44",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 221,
    "label": "United Arab Emirates",
    "local_name": "Al Imarat al Arabiyah al Muttahidah",
    "region": "Arabian Peninsula, Mvaluedle East",
    "alpha2_code": "AE",
    "country_code": "971",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 220,
    "label": "Ukraine",
    "local_name": "Ukrayina",
    "region": "Eastern Europe",
    "alpha2_code": "UA",
    "country_code": "380",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 219,
    "label": "Ugandax",
    "local_name": "Uganda",
    "region": "Eastern Africa",
    "alpha2_code": "UG",
    "country_code": "256",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 218,
    "label": "Tuvalu",
    "local_name": "Tuvalu",
    "region": "Polynesia, Oceania",
    "alpha2_code": "TV",
    "country_code": "688",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 217,
    "label": "Turks and Caicos Islands",
    "local_name": "Turks and Caicos Islands",
    "region": "Caribbean, parts of the Bahamas island chain.",
    "alpha2_code": "TC",
    "country_code": "1649",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 216,
    "label": "Turkmenistan",
    "local_name": "Turkmenistan",
    "region": "Central Asia",
    "alpha2_code": "TM",
    "country_code": "993",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 215,
    "label": "Turkey",
    "local_name": "Turkiye",
    "region": "Southeastern Europe, Western Asia",
    "alpha2_code": "TR",
    "country_code": "90",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 214,
    "label": "Tunisia",
    "local_name": "Tunis",
    "region": "Northern Africa",
    "alpha2_code": "TN",
    "country_code": "216",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 213,
    "label": "Trinidad and Tobago",
    "local_name": "Trinidad, Tobago",
    "region": "Northern South America, Caribbean",
    "alpha2_code": "TT",
    "country_code": "1868",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 212,
    "label": "Tonga",
    "local_name": "Tonga",
    "region": "Polynesia, Oceania",
    "alpha2_code": "TO",
    "country_code": "676",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 211,
    "label": "Tokelau",
    "local_name": "Tokelau",
    "region": "Oceania/Australia",
    "alpha2_code": "TK",
    "country_code": "690",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 210,
    "label": "Togo",
    "local_name": "Republique Togolaise",
    "region": "West Africa",
    "alpha2_code": "TG",
    "country_code": "228",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 209,
    "label": "Timor-Leste [East Timor]",
    "local_name": "Timor",
    "region": "Maritime South-East Asia",
    "alpha2_code": "TL",
    "country_code": "670",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 207,
    "label": "Thailand",
    "local_name": "Prathet Thai",
    "region": "South-East Asia",
    "alpha2_code": "TH",
    "country_code": "66",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 206,
    "label": "Tanzania; officially the United Republic of Tanzania",
    "local_name": "Jamhuri ya Muungano wa Tanzania",
    "region": "Eastern Africa",
    "alpha2_code": "TZ",
    "country_code": "255",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 205,
    "label": "Tajikistan",
    "local_name": "Jumhurii Tojikiston",
    "region": "Central Asia",
    "alpha2_code": "TJ",
    "country_code": "992",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 204,
    "label": "Taiwan [Republic of China]",
    "local_name": "T''ai-wan",
    "region": "Eastern Asia",
    "alpha2_code": "TW",
    "country_code": "886",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 203,
    "label": "Syria, Syrian Arab Republic",
    "local_name": "Suriyah",
    "region": "Middle East, Western Asia",
    "alpha2_code": "SY",
    "country_code": "963",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 202,
    "label": "Switzerland",
    "local_name": "Schweiz [German], Suisse [French], Svizzera [Italian)",
    "region": "Western Europe",
    "alpha2_code": "CH",
    "country_code": "41",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 201,
    "label": "Sweden",
    "local_name": "Sverige",
    "region": "Northern Europe",
    "alpha2_code": "SE",
    "country_code": "46",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 200,
    "label": "Swaziland",
    "local_name": "Swaziland",
    "region": "Southern Africa",
    "alpha2_code": "SZ",
    "country_code": "47",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 199,
    "label": "Suriname",
    "local_name": "Suriname",
    "region": "North-Eastern South America",
    "alpha2_code": "SR",
    "country_code": "597",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 198,
    "label": "Sudan",
    "local_name": "As-Sudan",
    "region": "Northern Africa",
    "alpha2_code": "SD",
    "country_code": "249",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 197,
    "label": "Sri Lanka",
    "local_name": "Sri Lanka",
    "region": "South-Central Asia",
    "alpha2_code": "LK",
    "country_code": "94",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 196,
    "label": "Spain",
    "local_name": "España",
    "region": "Southern Europe",
    "alpha2_code": "ES",
    "country_code": "34",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 195,
    "label": "South Sudan",
    "local_name": "South Sudan",
    "region": "East-Central Africa",
    "alpha2_code": "SS",
    "country_code": "211",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 194,
    "label": "South Africa",
    "local_name": "South Africa",
    "region": "Southern Africa",
    "alpha2_code": "ZA",
    "country_code": "27",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 193,
    "label": "Somalia",
    "local_name": "Somalia",
    "region": "Eastern Africa",
    "alpha2_code": "SO",
    "country_code": "252",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 192,
    "label": "Solomon Islands",
    "local_name": "Solomon Islands",
    "region": "Melanesia, Oceania",
    "alpha2_code": "SB",
    "country_code": "677",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 191,
    "label": "Slovenia",
    "local_name": "Slovenija",
    "region": "Southern Europe",
    "alpha2_code": "SI",
    "country_code": "386",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 190,
    "label": "Slovakia [Slovak Republic]",
    "local_name": "Slovensko",
    "region": "Eastern Europe",
    "alpha2_code": "SK",
    "country_code": "421",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 189,
    "label": "Singapore",
    "local_name": "Singapore",
    "region": "Southeast Asia",
    "alpha2_code": "SG",
    "country_code": "65",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 188,
    "label": "Sierra Leone",
    "local_name": "Sierra Leone",
    "region": "West Africa",
    "alpha2_code": "SL",
    "country_code": "232",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 187,
    "label": "Seychelles",
    "local_name": "Seychelles",
    "region": "Eastern Africa",
    "alpha2_code": "SC",
    "country_code": "248",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 186,
    "label": "Serbia",
    "local_name": "Srbija",
    "region": "Southern Europe",
    "alpha2_code": "RS",
    "country_code": "381",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 185,
    "label": "Senegal",
    "local_name": "Senegal",
    "region": "West Africa",
    "alpha2_code": "SN",
    "country_code": "221",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 184,
    "label": "Saudi Arabia",
    "local_name": "Al Arabiyah as Suudiyah",
    "region": "Arabian Peninsula, Middle East",
    "alpha2_code": "SA",
    "country_code": "966",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 183,
    "label": "Sao Tome and Principe",
    "local_name": "Sao Tome e Principe",
    "region": "Central Africa",
    "alpha2_code": "ST",
    "country_code": "239",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 182,
    "label": "San Marino",
    "local_name": "San Marino",
    "region": "Southern Europe within Italy",
    "alpha2_code": "SM",
    "country_code": "378",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 181,
    "label": "Samoa",
    "local_name": "Samoa",
    "region": "Polynesia, Oceania",
    "alpha2_code": "WS",
    "country_code": "685",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 180,
    "label": "Saint Vincent and the Grenadines",
    "local_name": "",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "VC",
    "country_code": "1784",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 179,
    "label": "Saint Lucia",
    "local_name": "Saint Lucia",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "LC",
    "country_code": "1758",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 178,
    "label": "Saint Kitts and Nevis",
    "local_name": "",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "KN",
    "country_code": "1869",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 177,
    "label": "Rwanda",
    "local_name": "Rwanda",
    "region": "Eastern Africa, African Great Lakes",
    "alpha2_code": "RW",
    "country_code": "250",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 176,
    "label": "Russian Federation",
    "local_name": "Rossiya",
    "region": "Eastern Europe - Northern Asia",
    "alpha2_code": "RU",
    "country_code": "7",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 175,
    "label": "Romania",
    "local_name": "Romania",
    "region": "Eastern Europe",
    "alpha2_code": "RO",
    "country_code": "40",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 174,
    "label": "Reunion Island",
    "local_name": "Ile de la Réunion",
    "region": "Eastern Africa",
    "alpha2_code": "RE",
    "country_code": "262",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 173,
    "label": "Qatar",
    "local_name": "Dawlat Qatar",
    "region": "Arabian Peninsula, Middle East",
    "alpha2_code": "QA",
    "country_code": "974",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 172,
    "label": "Puerto Rico",
    "local_name": "Puerto Rico",
    "region": "Greater Antilles, Caribbean",
    "alpha2_code": "PR",
    "country_code": "1787",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 171,
    "label": "Portugal",
    "local_name": "Portugal",
    "region": "Southern Europe",
    "alpha2_code": "PT",
    "country_code": "351",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 170,
    "label": "Poland",
    "local_name": "Polska",
    "region": "Eastern Europe",
    "alpha2_code": "PL",
    "country_code": "48",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 169,
    "label": "Pitcairn Island",
    "local_name": "Pitcairn Island",
    "region": "Polynesia, Oceania",
    "alpha2_code": "PN",
    "country_code": "870",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 168,
    "label": "Philippines",
    "local_name": "Pilipinas",
    "region": "Southeast Asia",
    "alpha2_code": "PH",
    "country_code": "63",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 167,
    "label": "Peru",
    "local_name": "Peru",
    "region": "Western South America",
    "alpha2_code": "PE",
    "country_code": "51",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 166,
    "label": "Paraguay",
    "local_name": "Paraguay",
    "region": "Central South America",
    "alpha2_code": "PY",
    "country_code": "595",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 165,
    "label": "Papua New Guinea",
    "local_name": "Papua Niu Gini",
    "region": "Maritime Southeast Asia, Melanesia, Oceania",
    "alpha2_code": "PG",
    "country_code": "675",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 164,
    "label": "Panama",
    "local_name": "Panama",
    "region": "Central America",
    "alpha2_code": "PA",
    "country_code": "507",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 163,
    "label": "Palestinian territories",
    "local_name": "Filastin",
    "region": "Middle East, Western Asia",
    "alpha2_code": "PS",
    "country_code": "970",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 162,
    "label": "Palau",
    "local_name": "Belau",
    "region": "Micronesia, Oceania",
    "alpha2_code": "PW",
    "country_code": "680",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 161,
    "label": "Pakistan",
    "local_name": "Pakistan",
    "region": "South-Central Asia",
    "alpha2_code": "PK",
    "country_code": "92",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 160,
    "label": "Oman",
    "local_name": "Saltanat Uman",
    "region": "Middle East",
    "alpha2_code": "OM",
    "country_code": "968",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 159,
    "label": "Norway",
    "local_name": "Norge",
    "region": "Northern Europe",
    "alpha2_code": "NO",
    "country_code": "47",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 158,
    "label": "Northern Mariana Islands",
    "local_name": "Northern Mariana Islands",
    "region": "Micronesia, Oceania",
    "alpha2_code": "MP",
    "country_code": "1670",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 157,
    "label": "Niue",
    "local_name": "Niue",
    "region": "Polynesia, Oceania",
    "alpha2_code": "NU",
    "country_code": "683",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 156,
    "label": "Nigeria",
    "local_name": "Nigeria",
    "region": "West Africa",
    "alpha2_code": "NG",
    "country_code": "234",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 155,
    "label": "Niger",
    "local_name": "Niger",
    "region": "West Africa",
    "alpha2_code": "NE",
    "country_code": "227",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 154,
    "label": "Nicaragua",
    "local_name": "Nicaragua",
    "region": "Central America",
    "alpha2_code": "NI",
    "country_code": "505",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 153,
    "label": "New Zealand",
    "local_name": "Aotearoa",
    "region": "Oceania; Australia",
    "alpha2_code": "NZ",
    "country_code": "64",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 152,
    "label": "New Caledonia",
    "local_name": "Nouvelle-Calédonie",
    "region": "Melanesia, Oceania",
    "alpha2_code": "NC",
    "country_code": "687",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 151,
    "label": "Netherlands Antilles",
    "local_name": "Nederlandse Antillen",
    "region": "Caribbean",
    "alpha2_code": "AN",
    "country_code": "599",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 150,
    "label": "Netherlands",
    "local_name": "Nederland/Holland",
    "region": "Western Europe",
    "alpha2_code": "NL",
    "country_code": "31",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 149,
    "label": "Nepal",
    "local_name": "Nepal",
    "region": "South-Central Asia",
    "alpha2_code": "NP",
    "country_code": "977",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 148,
    "label": "Nauru",
    "local_name": "Nauru",
    "region": "Micronesia, Oceania",
    "alpha2_code": "NR",
    "country_code": "674",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 147,
    "label": "Namibia",
    "local_name": "Namibia",
    "region": "Southern Africa",
    "alpha2_code": "NA",
    "country_code": "264",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 146,
    "label": "Myanmar, Burma",
    "local_name": "Myanma Naingngandaw",
    "region": "Southeast Asia",
    "alpha2_code": "MM",
    "country_code": "95",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 145,
    "label": "Mozambique",
    "local_name": "Mocambique",
    "region": "Eastern Africa",
    "alpha2_code": "MZ",
    "country_code": "258",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 144,
    "label": "Morocco",
    "local_name": "Al Maghrib",
    "region": "Northern Africa",
    "alpha2_code": "MA",
    "country_code": "212",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 143,
    "label": "Montserrat",
    "local_name": "Montserrat",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "MS",
    "country_code": "1664",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 142,
    "label": "Montenegro",
    "local_name": "Crna Gora",
    "region": "Southern Europe",
    "alpha2_code": "ME",
    "country_code": "382",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 141,
    "label": "Mongolia",
    "local_name": "Mongol Uls",
    "region": "Eastern Asia",
    "alpha2_code": "MN",
    "country_code": "976",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 140,
    "label": "Monaco",
    "local_name": "Monaco",
    "region": "Southern Europe",
    "alpha2_code": "MC",
    "country_code": "377",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 139,
    "label": "Moldova, Republic of",
    "local_name": "Moldova",
    "region": "Eastern Europe",
    "alpha2_code": "MD",
    "country_code": "373",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 138,
    "label": "Micronesia, Federal States of",
    "local_name": "Micronesia",
    "region": "Micronesia, Oceania",
    "alpha2_code": "FM",
    "country_code": "691",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 137,
    "label": "Mexico",
    "local_name": "Estados Unidos Mexicanos",
    "region": "North America",
    "alpha2_code": "MX",
    "country_code": "52",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 136,
    "label": "Mayotte",
    "local_name": "Mayotte",
    "region": "Eastern Africa",
    "alpha2_code": "YT",
    "country_code": "262",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 135,
    "label": "Mauritius",
    "local_name": "Mauritius",
    "region": "Eastern Africa",
    "alpha2_code": "MU",
    "country_code": "230",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 134,
    "label": "Mauritania",
    "local_name": "Muritaniyah",
    "region": "West Africa",
    "alpha2_code": "MR",
    "country_code": "222",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 133,
    "label": "Martinique",
    "local_name": "Martinique",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "MQ",
    "country_code": "596",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 132,
    "label": "Marshall Islands",
    "local_name": "Marshall Islands",
    "region": "Micronesia, Oceania",
    "alpha2_code": "MH",
    "country_code": "692",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 131,
    "label": "Malta",
    "local_name": "Malta",
    "region": "Southern Europe",
    "alpha2_code": "MT",
    "country_code": "356",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 130,
    "label": "Mali",
    "local_name": "Mali",
    "region": "West Africa",
    "alpha2_code": "ML",
    "country_code": "223",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 129,
    "label": "Maldives",
    "local_name": "Dhivehi Raajje",
    "region": "South-Central Asia",
    "alpha2_code": "MV",
    "country_code": "960",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 128,
    "label": "Malaysia",
    "local_name": "Malaysia",
    "region": "Southeast Asia",
    "alpha2_code": "MY",
    "country_code": "60",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 127,
    "label": "Malawi",
    "local_name": "Malawi",
    "region": "Eastern Africa",
    "alpha2_code": "MW",
    "country_code": "265",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 126,
    "label": "Madagascar",
    "local_name": "Madagascar",
    "region": "Eastern Africa",
    "alpha2_code": "MG",
    "country_code": "261",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 125,
    "label": "Macedonia, Rep. of",
    "local_name": "Makedonija",
    "region": "Southern Europe",
    "alpha2_code": "MK",
    "country_code": "389",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 124,
    "label": "Macau",
    "local_name": "Aomen",
    "region": "Eastern Asia",
    "alpha2_code": "MO",
    "country_code": "853",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 123,
    "label": "Luxembourg",
    "local_name": "Luxembourg, Letzebuerg",
    "region": "Western Europe",
    "alpha2_code": "LU",
    "country_code": "352",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 122,
    "label": "Lithuania",
    "local_name": "Lietuva",
    "region": "Northern Europe",
    "alpha2_code": "LT",
    "country_code": "370",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 121,
    "label": "Liechtenstein",
    "local_name": "Liechtenstein",
    "region": "Western Europe",
    "alpha2_code": "LI",
    "country_code": "423",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 120,
    "label": "Libya",
    "local_name": "Libiyah",
    "region": "Northern Africa",
    "alpha2_code": "LY",
    "country_code": "218",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 119,
    "label": "Liberia",
    "local_name": "Liberia",
    "region": "West Africa",
    "alpha2_code": "LR",
    "country_code": "231",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 118,
    "label": "Lesotho",
    "local_name": "Lesotho",
    "region": "Southern Africa",
    "alpha2_code": "LS",
    "country_code": "266",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 117,
    "label": "Lebanon",
    "local_name": "Lubnan",
    "region": "Middle East, Western Asia",
    "alpha2_code": "LB",
    "country_code": "961",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 116,
    "label": "Latvia",
    "local_name": "Latvija",
    "region": "Northern Europe",
    "alpha2_code": "LV",
    "country_code": "371",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 115,
    "label": "Lao, People''s Democratic Republic",
    "local_name": "Lao",
    "region": "South-East Asia",
    "alpha2_code": "LA",
    "country_code": "856",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 114,
    "label": "Kyrgyzstan",
    "local_name": "Kyrgyz Respublikasy",
    "region": "Central Asia",
    "alpha2_code": "KG",
    "country_code": "996",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 113,
    "label": "Kuwait",
    "local_name": "Al Kuwayt",
    "region": "Middle East, Western Asia",
    "alpha2_code": "KW",
    "country_code": "965",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 112,
    "label": "Korea, Republic of [South Korea]",
    "local_name": "Han-guk",
    "region": "Eastern Asia",
    "alpha2_code": "KR",
    "country_code": "82",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 111,
    "label": "Korea, Democratic People''s Rep. [North Korea]",
    "local_name": "Choson",
    "region": "Eastern Asia",
    "alpha2_code": "KP",
    "country_code": "850",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 110,
    "label": "Kiribati",
    "local_name": "Kiribati, Kiribas",
    "region": "Micronesia, Oceania",
    "alpha2_code": "KI",
    "country_code": "686",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 109,
    "label": "Kenya",
    "local_name": "Kenya",
    "region": "Eastern Africa",
    "alpha2_code": "KE",
    "country_code": "254",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 108,
    "label": "Kazakhstan",
    "local_name": "Qazaqstan",
    "region": "Central Asia",
    "alpha2_code": "KZ",
    "country_code": "7",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 107,
    "label": "Jordan",
    "local_name": "Al Urdun",
    "region": "Middle East, Western Asia",
    "alpha2_code": "JO",
    "country_code": "962",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 106,
    "label": "Japan",
    "local_name": "Nippon",
    "region": "Eastern Asia",
    "alpha2_code": "JP",
    "country_code": "81",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 105,
    "label": "Jamaica",
    "local_name": "Jamaica",
    "region": "Greater Antilles, Caribbean",
    "alpha2_code": "JM",
    "country_code": "1876",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 104,
    "label": "Italy",
    "local_name": "Italia",
    "region": "Southern Europe",
    "alpha2_code": "IT",
    "country_code": "39",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 103,
    "label": "Israel",
    "local_name": "Yisra''el",
    "region": "Middle East, Western Asia",
    "alpha2_code": "IL",
    "country_code": "972",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 102,
    "label": "Ireland",
    "local_name": "Éire",
    "region": "Northern Europe",
    "alpha2_code": "IE",
    "country_code": "353",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 101,
    "label": "Iraq",
    "local_name": "Iraq",
    "region": "Middle East, Western Asia",
    "alpha2_code": "IQ",
    "country_code": "964",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 100,
    "label": "Iran [Islamic Republic of]",
    "local_name": "Iran",
    "region": "South-Central Asia",
    "alpha2_code": "IR",
    "country_code": "98",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 99,
    "label": "Indonesia",
    "local_name": "Indonesia",
    "region": "Maritime South-East Asia",
    "alpha2_code": "value",
    "country_code": "62",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 98,
    "label": "India",
    "local_name": "Bharat",
    "region": "South-Central Asia",
    "alpha2_code": "IN",
    "country_code": "91",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 97,
    "label": "Iceland",
    "local_name": "Lyoveldio Island",
    "region": "Northern Europe",
    "alpha2_code": "IS",
    "country_code": "354",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 96,
    "label": "Hungary",
    "local_name": "Magyarorszag",
    "region": "Eastern Europe",
    "alpha2_code": "HU",
    "country_code": "36",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 95,
    "label": "Hong Kong",
    "local_name": "Xianggang",
    "region": "Eastern Asia",
    "alpha2_code": "HK",
    "country_code": "852",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 94,
    "label": "Honduras",
    "local_name": "Honduras",
    "region": "Central America",
    "alpha2_code": "HN",
    "country_code": "504",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 93,
    "label": "Holy See",
    "local_name": "Status Civitatis Vaticanæ",
    "region": "Southern Europe within Italy",
    "alpha2_code": "VA",
    "country_code": "379",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 92,
    "label": "Haiti",
    "local_name": "Haiti",
    "region": "Greater Antilles, Caribbean",
    "alpha2_code": "HT",
    "country_code": "509",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 91,
    "label": "Guyana",
    "local_name": "Guyana",
    "region": "North Eastern South America",
    "alpha2_code": "GY",
    "country_code": "592",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 90,
    "label": "Guinea-Bissau",
    "local_name": "Guine-Bissau",
    "region": "West Africa",
    "alpha2_code": "GW",
    "country_code": "245",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 89,
    "label": "Guinea",
    "local_name": "Guinee",
    "region": "West Africa",
    "alpha2_code": "GN",
    "country_code": "224",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 88,
    "label": "Guatemala",
    "local_name": "Guatemala",
    "region": "Central America",
    "alpha2_code": "GG",
    "country_code": "502",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 87,
    "label": "Guam",
    "local_name": "Guam",
    "region": "Micronesia, Oceania",
    "alpha2_code": "GT",
    "country_code": "1671",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 86,
    "label": "Guadeloupe",
    "local_name": "Guadeloupe",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "GU",
    "country_code": "590",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 85,
    "label": "Grenada",
    "local_name": "Grenada",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "GP",
    "country_code": "1473",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 84,
    "label": "Greenland",
    "local_name": "Kalaallit Nunaat",
    "region": "North America",
    "alpha2_code": "GD",
    "country_code": "299",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 83,
    "label": "Greece",
    "local_name": "Ellas or Ellada",
    "region": "Southern Europe",
    "alpha2_code": "GL",
    "country_code": "30",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 82,
    "label": "Great Britain",
    "local_name": "Great Britain",
    "region": "Northern Europe",
    "alpha2_code": "GR",
    "country_code": "44",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 81,
    "label": "Gibraltar",
    "local_name": "Gibraltar",
    "region": "Southern Europe",
    "alpha2_code": "GI",
    "country_code": "350",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 80,
    "label": "Ghana",
    "local_name": "Ghana",
    "region": "West Africa",
    "alpha2_code": "GH",
    "country_code": "233",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 79,
    "label": "Germany",
    "local_name": "Deutschland",
    "region": "Western Europe",
    "alpha2_code": "DE",
    "country_code": "49",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 78,
    "label": "Georgia",
    "local_name": "Sak''art''velo",
    "region": "Western Asia",
    "alpha2_code": "GE",
    "country_code": "995",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 77,
    "label": "Gambia",
    "local_name": "The Gambia",
    "region": "West Africa",
    "alpha2_code": "GM",
    "country_code": "220",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 76,
    "label": "Gabon",
    "local_name": "Gabon",
    "region": "Central Africa",
    "alpha2_code": "GA",
    "country_code": "241",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 75,
    "label": "French Southern Territories",
    "local_name": "Terres Australes et Antarctiques Françaises",
    "region": "Southern South America, Antarctic",
    "alpha2_code": "TF",
    "country_code": "262",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 74,
    "label": "French Polynesia",
    "local_name": "Polynésie Française",
    "region": "Polynesia, Oceania",
    "alpha2_code": "PF",
    "country_code": "689",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 73,
    "label": "French Guiana",
    "local_name": "Guyane",
    "region": "Northern South America",
    "alpha2_code": "GF",
    "country_code": "594",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 72,
    "label": "France",
    "local_name": "France",
    "region": "Western Europe",
    "alpha2_code": "FR",
    "country_code": "33",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 71,
    "label": "Finland",
    "local_name": "Suomen Tasavalta",
    "region": "Northern Europe",
    "alpha2_code": "FI",
    "country_code": "358",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 70,
    "label": "Fiji",
    "local_name": "Fiji",
    "region": "Melanesia, Oceania",
    "alpha2_code": "FJ",
    "country_code": "679",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 69,
    "label": "Faroe Islands",
    "local_name": "Foroyar",
    "region": "Northern Europe",
    "alpha2_code": "FO",
    "country_code": "298",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 68,
    "label": "Falkland Islands",
    "local_name": "Islas Malvinas",
    "region": "Southern South America",
    "alpha2_code": "FK",
    "country_code": "500",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 67,
    "label": "Ethiopia",
    "local_name": "Ityop''iya",
    "region": "Eastern Africa",
    "alpha2_code": "ET",
    "country_code": "251",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 66,
    "label": "Estonia",
    "local_name": "Eesti Vabariik",
    "region": "Northern Europe",
    "alpha2_code": "EE",
    "country_code": "372",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 65,
    "label": "Eritrea",
    "local_name": "Hagere Ertra",
    "region": "Eastern Africa",
    "alpha2_code": "ER",
    "country_code": "291",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 64,
    "label": "Equatorial Guinea",
    "local_name": "Guinea Ecuatorial",
    "region": "Central Africa",
    "alpha2_code": "GQ",
    "country_code": "240",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 63,
    "label": "El Salvador",
    "local_name": "El Salvador",
    "region": "Central America",
    "alpha2_code": "SV",
    "country_code": "503",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 62,
    "label": "Egypt",
    "local_name": "Misr",
    "region": "Africa, Middle East",
    "alpha2_code": "EG",
    "country_code": "20",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 61,
    "label": "Ecuador",
    "local_name": "Ecuador",
    "region": "North West South America",
    "alpha2_code": "EC",
    "country_code": "593",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 60,
    "label": "East Timor [Timor-Leste]",
    "local_name": "Timor",
    "region": "South-East Asia",
    "alpha2_code": "TL",
    "country_code": "670",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 59,
    "label": "Dominican Republic",
    "local_name": "Dominicana, Republica",
    "region": "Greater Antilles, Caribbean",
    "alpha2_code": "DO",
    "country_code": "1809",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 58,
    "label": "Dominica",
    "local_name": "Dominica",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "DM",
    "country_code": "1767",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 57,
    "label": "Djibouti",
    "local_name": "Djibouti",
    "region": "Eastern Africa",
    "alpha2_code": "DJ",
    "country_code": "253",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 56,
    "label": "Denmark",
    "local_name": "Danmark",
    "region": "Northern Europe",
    "alpha2_code": "DK",
    "country_code": "45",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 55,
    "label": "Czech Republic",
    "local_name": "Ceska Republika",
    "region": "Eastern Europe",
    "alpha2_code": "CZ",
    "country_code": "420",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 54,
    "label": "Cyprus",
    "local_name": "Kibris, Kypros",
    "region": "Mediterranean, Western Asia",
    "alpha2_code": "CY",
    "country_code": "357",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 53,
    "label": "Cuba",
    "local_name": "Cuba",
    "region": "Greater Antilles, Caribbean",
    "alpha2_code": "CU",
    "country_code": "53",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 52,
    "label": "Croatia",
    "local_name": "Hrvatska",
    "region": "Southern Europe",
    "alpha2_code": "HR",
    "country_code": "385",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 51,
    "label": "Ivory Coast",
    "local_name": "Cote d''Ivoire",
    "region": "West Africa",
    "alpha2_code": "CI",
    "country_code": "225",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 50,
    "label": "Costa Rica",
    "local_name": "Costa Rica",
    "region": "Central America",
    "alpha2_code": "CR",
    "country_code": "506",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 49,
    "label": "Cook Islands",
    "local_name": "Cook Islands",
    "region": "Polynesia, Oceania",
    "alpha2_code": "CK",
    "country_code": "682",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 48,
    "label": "Congo, Republic of [Brazzaville]",
    "local_name": "République du Congo",
    "region": "Central Africa",
    "alpha2_code": "CG",
    "country_code": "242",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 47,
    "label": "Democratic Republic of the Congo [Kinshasa]",
    "local_name": "République Démocratique du Congo",
    "region": "Central Africa",
    "alpha2_code": "CD",
    "country_code": "243",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 46,
    "label": "Comoros",
    "local_name": "Comores",
    "region": "Eastern Africa",
    "alpha2_code": "KM",
    "country_code": "269",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 45,
    "label": "Colombia",
    "local_name": "Colombia",
    "region": "North West South America",
    "alpha2_code": "CO",
    "country_code": "57",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 44,
    "label": "Cocos [Keeling] Islands",
    "local_name": "Cocos [Keeling) Islands",
    "region": "South-East Asia, Australia",
    "alpha2_code": "CC",
    "country_code": "618",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 43,
    "label": "Christmas Island",
    "local_name": "Christmas Island",
    "region": "Southeast Asia",
    "alpha2_code": "CX",
    "country_code": "618",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 42,
    "label": "China",
    "local_name": "Zhong Guo",
    "region": "Eastern Asia",
    "alpha2_code": "CN",
    "country_code": "86",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 41,
    "label": "Chile",
    "local_name": "Chile",
    "region": "Western South America",
    "alpha2_code": "CL",
    "country_code": "56",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 40,
    "label": "Chad",
    "local_name": "Tchad",
    "region": "Central Africa",
    "alpha2_code": "TD",
    "country_code": "235",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 39,
    "label": "Central African Republic",
    "local_name": "Republique Centrafricaine",
    "region": "Central Africa",
    "alpha2_code": "CF",
    "country_code": "236",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 38,
    "label": "Cayman Islands",
    "local_name": "Cayman Islands",
    "region": "Greater Antilles, Caribbean",
    "alpha2_code": "KY",
    "country_code": "1345",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 37,
    "label": "Cape Verde",
    "local_name": "Cabo Verde",
    "region": "West Africa",
    "alpha2_code": "CV",
    "country_code": "238",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 36,
    "label": "Canada",
    "local_name": "Canada",
    "region": "North North America",
    "alpha2_code": "CA",
    "country_code": "1",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 35,
    "label": "Cameroon",
    "local_name": "Cameroon",
    "region": "Central Africa",
    "alpha2_code": "CM",
    "country_code": "237",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 34,
    "label": "Cambodia",
    "local_name": "Kampuchea",
    "region": "South-East Asia",
    "alpha2_code": "KH",
    "country_code": "855",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 33,
    "label": "Burundi",
    "local_name": "Burundi",
    "region": "Eastern Africa, African Great Lakes",
    "alpha2_code": "BI",
    "country_code": "257",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 32,
    "label": "Burkina Faso",
    "local_name": "Burkina Faso",
    "region": "West Africa",
    "alpha2_code": "BF",
    "country_code": "226",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 31,
    "label": "Bulgaria",
    "local_name": "Bulgaria",
    "region": "Balkan, Eastern Europe",
    "alpha2_code": "BG",
    "country_code": "359",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 30,
    "label": "Brunei Darussalam",
    "local_name": "Negara Brunei Darussalam",
    "region": "Southeast Asia",
    "alpha2_code": "BN",
    "country_code": "673",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 29,
    "label": "Brazil",
    "local_name": "Brasil",
    "region": "Central Eastern South America",
    "alpha2_code": "BR",
    "country_code": "55",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 28,
    "label": "Botswana",
    "local_name": "Botswana",
    "region": "Southern Africa",
    "alpha2_code": "BW",
    "country_code": "267",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 27,
    "label": "Bosnia and Herzegovina",
    "local_name": "Bosna i Hercegovina",
    "region": "Southern Europe",
    "alpha2_code": "BA",
    "country_code": "387",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 26,
    "label": "Bolivia",
    "local_name": "Bolivia",
    "region": "Central South America",
    "alpha2_code": "BO",
    "country_code": "591",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 25,
    "label": "Bhutan",
    "local_name": "Bhutan",
    "region": "South-Central Asia",
    "alpha2_code": "BT",
    "country_code": "975",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 24,
    "label": "Bermuda",
    "local_name": "Bermuda",
    "region": "North America",
    "alpha2_code": "BM",
    "country_code": "1441",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 23,
    "label": "Benin",
    "local_name": "Benin",
    "region": "West Africa",
    "alpha2_code": "BJ",
    "country_code": "229",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 22,
    "label": "Belize",
    "local_name": "Belize",
    "region": "Central America",
    "alpha2_code": "BZ",
    "country_code": "501",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 21,
    "label": "Belgium",
    "local_name": "Belgique/Belgie",
    "region": "Western Europe",
    "alpha2_code": "BE",
    "country_code": "32",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 20,
    "label": "Belarus",
    "local_name": "Byelarus",
    "region": "Eastern Europe",
    "alpha2_code": "BY",
    "country_code": "375",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 19,
    "label": "Barbados",
    "local_name": "Barbados",
    "region": "Lesser Antilles, Caribbean",
    "alpha2_code": "BB",
    "country_code": "1246",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 18,
    "label": "Bangladesh",
    "local_name": "Bangladesh",
    "region": "South-Central Asia",
    "alpha2_code": "BD",
    "country_code": "880",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 17,
    "label": "Bahrain",
    "local_name": "Al Bahrayn",
    "region": "Arabian Peninsula, Middle East",
    "alpha2_code": "BH",
    "country_code": "973",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 16,
    "label": "Bahamas",
    "local_name": "Bahamas",
    "region": "Caribbean",
    "alpha2_code": "BS",
    "country_code": "1242",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 15,
    "label": "Azerbaijan",
    "local_name": "Azarbaycan",
    "region": "Caucasus, Western Asia",
    "alpha2_code": "AZ",
    "country_code": "994",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 14,
    "label": "Austria",
    "local_name": "Österreich",
    "region": "Western Europe",
    "alpha2_code": "AT",
    "country_code": "43",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 13,
    "label": "Australia",
    "local_name": "Australia",
    "region": "Australia/Oceania",
    "alpha2_code": "AU",
    "country_code": "61",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 12,
    "label": "Aruba",
    "local_name": "Aruba",
    "region": "Leeward Islands, Caribbean",
    "alpha2_code": "AW",
    "country_code": "297",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 11,
    "label": "Armenia",
    "local_name": "Hayastan",
    "region": "Western Asia",
    "alpha2_code": "AM",
    "country_code": "374",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 10,
    "label": "Argentina",
    "local_name": "Argentina",
    "region": "Southern South America",
    "alpha2_code": "AR",
    "country_code": "54",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 9,
    "label": "Antigua and Barbuda",
    "local_name": "Antigua and Barbuda",
    "region": "Leeward Islands, Caribbean",
    "alpha2_code": "AG",
    "country_code": "1268",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 8,
    "label": "Antarctica",
    "local_name": "Antarctica",
    "region": "Antarctica",
    "alpha2_code": "AQ",
    "country_code": "672",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 7,
    "label": "Anguilla",
    "local_name": "Anguilla",
    "region": "Leeward Islands, Caribbean",
    "alpha2_code": "AI",
    "country_code": "1264",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 6,
    "label": "Angola",
    "local_name": "Angola",
    "region": "Central Africa",
    "alpha2_code": "AO",
    "country_code": "244",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 5,
    "label": "Andorra",
    "local_name": "Andorra",
    "region": "Southern Europe",
    "alpha2_code": "AD",
    "country_code": "376",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 4,
    "label": "American Samoa",
    "local_name": "American Samoa",
    "region": "Polynesia, Oceania",
    "alpha2_code": "AS",
    "country_code": "1684",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 3,
    "label": "Algeria",
    "local_name": "Al Jaza''ir",
    "region": "Northern Africa",
    "alpha2_code": "DZ",
    "country_code": "213",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 2,
    "label": "Albania",
    "local_name": "Shqiperia",
    "region": "Southern Europe",
    "alpha2_code": "AL",
    "country_code": "355",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  },
  {
    "value": 1,
    "label": "Afghanistan",
    "local_name": "Afghanestan",
    "region": "South-Central Asia",
    "alpha2_code": "AF",
    "country_code": "93",
    "created_at": "2017-04-12 13:06:47",
    "updated_at": "2017-04-12 13:06:47",
    "values": []
  }
];

export const country = sortBy(countries, val => val.value);
export const countryCode = sortBy(countries, val => val.country_code).map(country => "+" + country.country_code);

export const city = [
  {
    value: "hanoi",
    label: "Ha Noi"
  },
  {
    value: "hcm",
    label: "Ho Chi Minh"
  }
];

export const formatTime = [
  {
    value: "12-hour day",
    label: "12-hour day"
  },
  {
    value: "24-hour day",
    label: "24-hour day"
  }
];

export const suburbs = [
  {
    value: 'North Perth',
    label: 'North Perth'
  },
  {
    value: 'South Perth',
    label: 'South Perth'
  },
];

export const formatDate = [
  {
    value: "dd mmm yyyy",
    label: "dd mmm yyyy"
  },
  {
    value: "mmm dd yyyy",
    label: "mmm dd yyyy"
  },
  {
    value: "yyyy/mmm/dd",
    label: "yyyy/mmm/dd"
  },
  {
    value: "dd/mm/yy",
    label: "dd/mm/yy"
  }
];

export const jobStatus = [
  {
    label: "All",
    value: "all"
  },
  {
    label: "New Lead",
    value: "newLead"
  },
  {
    label: "Accepted",
    value: "accepted"
  },
  {
    label: "On way",
    value: "onWay"
  },
  {
    label: "Paid",
    value: "paid"
  },
  {
    label: "Deposit Paid",
    value: "depositPaid"
  },
  {
    label: "Completed",
    value: "completed"
  },
  {
    label: "Cancelled",
    value: "cancelled"
  }
];

export const monthList = [
  {
    label: "All",
    value: ""
  },
  {
    label: "JAN",
    value: "01"
  },
  {
    label: "FEB",
    value: "02"
  },
  {
    label: "MAR",
    value: "03"
  },
  {
    label: "APR",
    value: "04"
  },
  {
    label: "MAY",
    value: "05"
  },
  {
    label: "JUN",
    value: "06"
  },
  {
    label: "JUL",
    value: "07"
  },
  {
    label: "AUG",
    value: "08"
  },
  {
    label: "SEP",
    value: "09"
  },
  {
    label: "OCT",
    value: "10"
  },
  {
    label: "NOV",
    value: "11"
  },
  {
    label: "DEC",
    value: "12"
  }
];

export const monthLabel = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const showWithType = [
  {
    label: "Daily",
    value: "daily"
  },
  {
    label: "Weekly",
    value: "weekly"
  },
  {
    label: "Monthly",
    value: "monthly"
  }
];
