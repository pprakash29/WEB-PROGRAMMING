/**
 * Country Capital Finder & Quiz Challenge
 * Features 195+ countries worldwide with real-time search, continent filters,
 * detailed statistics, speech pronunciation, clipboard copy, and interactive trivia quiz.
 */

// Comprehensive Dataset of 195 Countries
const countriesData = [
  // --- ASIA (48) ---
  { name: "Afghanistan", capital: "Kabul", continent: "Asia", flag: "🇦🇫", currency: "AFN (Afghani)", population: "41.1 Million", fact: "Home to the historic Khyber Pass and ancient Buddhist caves." },
  { name: "Armenia", capital: "Yerevan", continent: "Asia", flag: "🇦🇲", currency: "AMD (Dram)", population: "2.8 Million", fact: "One of the oldest continuously inhabited cities in the world, founded in 782 BC." },
  { name: "Azerbaijan", capital: "Baku", continent: "Asia", flag: "🇦🇿", currency: "AZN (Manat)", population: "10.3 Million", fact: "Known as the 'Land of Fire' with natural burning gas vents at Yanar Dag." },
  { name: "Bahrain", capital: "Manama", continent: "Asia", flag: "🇧🇭", currency: "BHD (Dinar)", population: "1.5 Million", fact: "An island nation connected to Saudi Arabia by the 25 km King Fahd Causeway." },
  { name: "Bangladesh", capital: "Dhaka", continent: "Asia", flag: "🇧🇩", currency: "BDT (Taka)", population: "171 Million", fact: "Dhaka is known as the 'City of Mosques' and the rickshaw capital of the world." },
  { name: "Bhutan", capital: "Thimphu", continent: "Asia", flag: "🇧🇹", currency: "BTN (Ngultrum)", population: "782 Thousand", fact: "Measures national progress using Gross National Happiness (GNH) instead of GDP." },
  { name: "Brunei", capital: "Bandar Seri Begawan", continent: "Asia", flag: "🇧🇳", currency: "BND (Dollar)", population: "450 Thousand", fact: "Home to Kampong Ayer, one of the world's largest water villages built on stilts." },
  { name: "Cambodia", capital: "Phnom Penh", continent: "Asia", flag: "🇰🇭", currency: "KHR (Riel)", population: "16.8 Million", fact: "Features Angkor Wat, the largest religious monument in the world." },
  { name: "China", capital: "Beijing", continent: "Asia", flag: "🇨🇳", currency: "CNY (Yuan)", population: "1.41 Billion", fact: "The Forbidden City in Beijing contains over 980 surviving historic buildings." },
  { name: "Cyprus", capital: "Nicosia", continent: "Asia", flag: "🇨🇾", currency: "EUR (€)", population: "1.2 Million", fact: "Nicosia is the world's last divided capital city, split between Greek and Turkish areas." },
  { name: "Georgia", capital: "Tbilisi", continent: "Asia", flag: "🇬🇪", currency: "GEL (Lari)", population: "3.7 Million", fact: "Recognized as the birthplace of winemaking with an 8,000-year history." },
  { name: "India", capital: "New Delhi", continent: "Asia", flag: "🇮🇳", currency: "INR (₹)", population: "1.43 Billion", fact: "World's most populous democracy and origin of yoga, chess, and algebra." },
  { name: "Indonesia", capital: "Jakarta", continent: "Asia", flag: "🇮🇩", currency: "IDR (Rupiah)", population: "277 Million", fact: "The world's largest archipelago state with over 17,500 tropical islands." },
  { name: "Iran", capital: "Tehran", continent: "Asia", flag: "🇮🇷", currency: "IRR (Rial)", population: "88 Million", fact: "Tehran sits beneath Mount Damavand, the highest volcano in Asia." },
  { name: "Iraq", capital: "Baghdad", continent: "Asia", flag: "🇮🇶", currency: "IQD (Dinar)", population: "43 Million", fact: "Baghdad was a global center of learning during the Islamic Golden Age with the House of Wisdom." },
  { name: "Israel", capital: "Jerusalem", continent: "Asia", flag: "🇮🇱", currency: "ILS (Shekel)", population: "9.7 Million", fact: "A holy city revered by Judaism, Christianity, and Islam with over 3,000 years of history." },
  { name: "Japan", capital: "Tokyo", continent: "Asia", flag: "🇯🇵", currency: "JPY (¥)", population: "125 Million", fact: "Greater Tokyo is the most populous metropolitan area on Earth with ~37 million residents." },
  { name: "Jordan", capital: "Amman", continent: "Asia", flag: "🇯🇴", currency: "JOD (Dinar)", population: "11.3 Million", fact: "Amman was originally built across 7 hills, similar to ancient Rome." },
  { name: "Kazakhstan", capital: "Astana", continent: "Asia", flag: "🇰🇿", currency: "KZT (Tenge)", population: "19.6 Million", fact: "The largest landlocked country in the world and home to the Baikonur Cosmodrome spaceport." },
  { name: "Kuwait", capital: "Kuwait City", continent: "Asia", flag: "🇰🇼", currency: "KWD (Dinar)", population: "4.3 Million", fact: "The Kuwaiti Dinar is consistently the highest-valued currency unit in the world." },
  { name: "Kyrgyzstan", capital: "Bishkek", continent: "Asia", flag: "🇰🇬", currency: "KGS (Som)", population: "6.7 Million", fact: "Over 90% of Kyrgyzstan is covered by spectacular snow-capped mountain ranges." },
  { name: "Laos", capital: "Vientiane", continent: "Asia", flag: "🇱🇦", currency: "LAK (Kip)", population: "7.5 Million", fact: "The only landlocked country in Southeast Asia, traversed by the scenic Mekong River." },
  { name: "Lebanon", capital: "Beirut", continent: "Asia", flag: "🇱🇧", currency: "LBP (Pound)", population: "5.5 Million", fact: "Beirut has been inhabited for over 5,000 years and nicknamed the 'Paris of the Middle East'." },
  { name: "Malaysia", capital: "Kuala Lumpur", continent: "Asia", flag: "🇲🇾", currency: "MYR (Ringgit)", population: "33.9 Million", fact: "The iconic 88-story Petronas Twin Towers were once the tallest buildings in the world." },
  { name: "Maldives", capital: "Malé", continent: "Asia", flag: "🇲🇻", currency: "MVR (Rufiyaa)", population: "520 Thousand", fact: "The lowest country on Earth, with an average natural ground level of just 1.5 meters." },
  { name: "Mongolia", capital: "Ulaanbaatar", continent: "Asia", flag: "🇲🇳", currency: "MNT (Tögrög)", population: "3.4 Million", fact: "Ulaanbaatar is officially the coldest national capital city on Earth by average temperature." },
  { name: "Myanmar", capital: "Naypyidaw", continent: "Asia", flag: "🇲🇲", currency: "MMK (Kyat)", population: "54 Million", fact: "Naypyidaw was built from scratch as a purpose-built capital and has 20-lane superhighways." },
  { name: "Nepal", capital: "Kathmandu", continent: "Asia", flag: "🇳🇵", currency: "NPR (Rupee)", population: "30.5 Million", fact: "Home to Mount Everest, the world's highest peak at 8,848.86 meters above sea level." },
  { name: "North Korea", capital: "Pyongyang", continent: "Asia", flag: "🇰🇵", currency: "KPW (Won)", population: "26 Million", fact: "Pyongyang Metro is one of the deepest underground transit systems in the world." },
  { name: "Oman", capital: "Muscat", continent: "Asia", flag: "🇴🇲", currency: "OMR (Rial)", population: "4.6 Million", fact: "Famous for pristine frankincense trade, dramatic fjords of Musandam, and desert oases." },
  { name: "Pakistan", capital: "Islamabad", continent: "Asia", flag: "🇵🇰", currency: "PKR (Rupee)", population: "235 Million", fact: "Islamabad is a meticulously planned green city located against the Margalla Hills." },
  { name: "Palestine", capital: "Ramallah", continent: "Asia", flag: "🇵🇸", currency: "ILS / JOD", population: "5.2 Million", fact: "Rich in olive heritage, historic holy sites, and ancient stone architecture." },
  { name: "Philippines", capital: "Manila", continent: "Asia", flag: "🇵🇭", currency: "PHP (Peso)", population: "115 Million", fact: "Composed of over 7,640 islands and one of the world's mega-biodiverse nations." },
  { name: "Qatar", capital: "Doha", continent: "Asia", flag: "🇶🇦", currency: "QAR (Riyal)", population: "2.7 Million", fact: "Doha hosted the 2022 FIFA World Cup and boasts the futuristic Museum of Islamic Art." },
  { name: "Saudi Arabia", capital: "Riyadh", continent: "Asia", flag: "🇸🇦", currency: "SAR (Riyal)", population: "36.4 Million", fact: "Home to the two holiest cities in Islam, Mecca and Medina, and the vast Rub' al Khali desert." },
  { name: "Singapore", capital: "Singapore", continent: "Asia", flag: "🇸🇬", currency: "SGD (Dollar)", population: "5.9 Million", fact: "A global financial hub and island city-state with the futuristic Gardens by the Bay." },
  { name: "South Korea", capital: "Seoul", continent: "Asia", flag: "🇰🇷", currency: "KRW (Won)", population: "51.8 Million", fact: "Seoul features 5 UNESCO World Heritage palaces alongside cutting-edge high-tech infrastructure." },
  { name: "Sri Lanka", capital: "Sri Jayawardenepura Kotte", continent: "Asia", flag: "🇱🇰", currency: "LKR (Rupee)", population: "22.2 Million", fact: "Known as the 'Pearl of the Indian Ocean', renowned for Ceylon tea and historic Sigiriya." },
  { name: "Syria", capital: "Damascus", continent: "Asia", flag: "🇸🇾", currency: "SYP (Pound)", population: "22 Million", fact: "Widely regarded as one of the oldest continuously inhabited cities on the planet." },
  { name: "Taiwan", capital: "Taipei", continent: "Asia", flag: "🇹🇼", currency: "TWD (New Dollar)", population: "23.9 Million", fact: "Taipei 101 was the world's tallest building from 2004 to 2010 and has a giant pendulum damper." },
  { name: "Tajikistan", capital: "Dushanbe", continent: "Asia", flag: "🇹🇯", currency: "TJS (Somoni)", population: "10 Million", fact: "Home to the Pamir Mountains, often called the 'Roof of the World'." },
  { name: "Thailand", capital: "Bangkok", continent: "Asia", flag: "🇹🇭", currency: "THB (Baht)", population: "71.6 Million", fact: "Bangkok's full ceremonial ceremonial name contains 168 letters, the longest place name!" },
  { name: "Timor-Leste", capital: "Dili", continent: "Asia", flag: "🇹🇱", currency: "USD ($)", population: "1.3 Million", flag: "🇹🇱", fact: "Became the first new sovereign state of the 21st century on May 20, 2002." },
  { name: "Turkey", capital: "Ankara", continent: "Asia", flag: "🇹🇷", currency: "TRY (Lira)", population: "85 Million", fact: "A transcontinental bridge connecting Europe and Asia, famous for Cappadocia and Troy." },
  { name: "Turkmenistan", capital: "Ashgabat", continent: "Asia", flag: "🇹🇲", currency: "TMT (Manat)", population: "6.4 Million", fact: "Ashgabat holds the Guinness World Record for the highest concentration of white marble buildings." },
  { name: "United Arab Emirates", capital: "Abu Dhabi", continent: "Asia", flag: "🇦🇪", currency: "AED (Dirham)", population: "9.4 Million", fact: "Abu Dhabi houses the stunning Sheikh Zayed Grand Mosque and Louvre Abu Dhabi." },
  { name: "Uzbekistan", capital: "Tashkent", continent: "Asia", flag: "🇺🇿", currency: "UZS (So'm)", population: "36 Million", fact: "One of only two doubly-landlocked countries globally, home to legendary Silk Road cities." },
  { name: "Vietnam", capital: "Hanoi", continent: "Asia", flag: "🇻🇳", currency: "VND (Dong)", population: "98 Million", fact: "Hanoi is celebrated for centuries-old architecture and rich street food like Phở." },
  { name: "Yemen", capital: "Sana'a", continent: "Asia", flag: "🇾🇪", currency: "YER (Rial)", population: "33 Million", fact: "Old City of Sana'a has multi-story clay tower houses built centuries ago." },

  // --- EUROPE (44) ---
  { name: "Albania", capital: "Tirana", continent: "Europe", flag: "🇦🇱", currency: "ALL (Lek)", population: "2.8 Million", fact: "Has over 173,000 concrete military defense bunkers scattered across the country." },
  { name: "Andorra", capital: "Andorra la Vella", continent: "Europe", flag: "🇦🇩", currency: "EUR (€)", population: "80 Thousand", fact: "The highest capital city in Europe, located in the Pyrenees at 1,023 meters elevation." },
  { name: "Austria", capital: "Vienna", continent: "Europe", flag: "🇦🇹", currency: "EUR (€)", population: "9.1 Million", fact: "Regularly ranked the world's most livable city, renowned for Mozart, Beethoven, and coffee." },
  { name: "Belarus", capital: "Minsk", continent: "Europe", flag: "🇧🇾", currency: "BYN (Ruble)", population: "9.2 Million", fact: "Home to the primeval Belovezhskaya Pushcha forest where wild European bison roam." },
  { name: "Belgium", capital: "Brussels", continent: "Europe", flag: "🇧🇪", currency: "EUR (€)", population: "11.7 Million", fact: "De facto capital of the European Union and headquarters of NATO." },
  { name: "Bosnia and Herzegovina", capital: "Sarajevo", continent: "Europe", flag: "🇧🇦", currency: "BAM (Mark)", population: "3.2 Million", fact: "Sarajevo was the first European city to have a full-time electric tram network in 1885." },
  { name: "Bulgaria", capital: "Sofia", continent: "Europe", flag: "🇧🇬", currency: "BGN (Lev)", population: "6.5 Million", fact: "One of Europe's oldest states that hasn't changed its name since founding in 681 AD." },
  { name: "Croatia", capital: "Zagreb", continent: "Europe", flag: "🇭🇷", currency: "EUR (€)", population: "3.9 Million", fact: "Origin of the necktie (cravat) and home to over 1,000 breathtaking Adriatic islands." },
  { name: "Czech Republic", capital: "Prague", continent: "Europe", flag: "🇨🇿", currency: "CZK (Koruna)", population: "10.5 Million", fact: "Prague Castle is listed as the largest ancient castle complex in the world." },
  { name: "Denmark", capital: "Copenhagen", continent: "Europe", flag: "🇩🇰", currency: "DKK (Krone)", population: "5.9 Million", fact: "More bicycles than inhabitants in Copenhagen, and birthplace of LEGO." },
  { name: "Estonia", capital: "Tallinn", continent: "Europe", flag: "🇪🇪", currency: "EUR (€)", population: "1.3 Million", fact: "Pioneer in digital governance; 99% of government services are online, and Skype was created here." },
  { name: "Finland", capital: "Helsinki", continent: "Europe", flag: "🇫🇮", currency: "EUR (€)", population: "5.5 Million", fact: "Ranked as the happiest country in the world for several consecutive years." },
  { name: "France", capital: "Paris", continent: "Europe", flag: "🇫🇷", currency: "EUR (€)", population: "68 Million", fact: "The Eiffel Tower in Paris was originally intended to stand for only 20 years." },
  { name: "Germany", capital: "Berlin", continent: "Europe", flag: "🇩🇪", currency: "EUR (€)", population: "84 Million", fact: "Berlin has more bridges (over 1,700) and waterways than Venice, Italy!" },
  { name: "Greece", capital: "Athens", continent: "Europe", flag: "🇬🇷", currency: "EUR (€)", population: "10.4 Million", fact: "Regarded as the cradle of Western civilization and birthplace of democracy." },
  { name: "Hungary", capital: "Budapest", continent: "Europe", flag: "🇭🇺", currency: "HUF (Forint)", population: "9.7 Million", fact: "Formed by uniting two distinct historic cities on opposite sides of the Danube: Buda and Pest." },
  { name: "Iceland", capital: "Reykjavik", continent: "Europe", flag: "🇮🇸", currency: "ISK (Króna)", population: "390 Thousand", fact: "World's northernmost capital of a sovereign state, powered almost entirely by geothermal energy." },
  { name: "Ireland", capital: "Dublin", continent: "Europe", flag: "🇮🇪", currency: "EUR (€)", population: "5.1 Million", fact: "Dublin was founded by Vikings over 1,000 years ago, famous for Trinity College and Guinness." },
  { name: "Italy", capital: "Rome", continent: "Europe", flag: "🇮🇹", currency: "EUR (€)", population: "59 Million", fact: "Surrounds Vatican City, an independent country entirely enclosed within Rome." },
  { name: "Kosovo", capital: "Pristina", continent: "Europe", flag: "🇽🇰", currency: "EUR (€)", population: "1.8 Million", fact: "Europe's youngest nation, having declared independence in 2008." },
  { name: "Latvia", capital: "Riga", continent: "Europe", flag: "🇱🇻", currency: "EUR (€)", population: "1.9 Million", fact: "Riga has the highest concentration of Art Nouveau architecture in the world." },
  { name: "Liechtenstein", capital: "Vaduz", continent: "Europe", flag: "🇱🇮", currency: "CHF (Franc)", population: "39 Thousand", fact: "A double-landlocked microstate tucked in the Alps between Switzerland and Austria." },
  { name: "Lithuania", capital: "Vilnius", continent: "Europe", flag: "🇱🇹", currency: "EUR (€)", population: "2.8 Million", fact: "Old Town Vilnius is one of the largest surviving medieval quarters in Northern Europe." },
  { name: "Luxembourg", capital: "Luxembourg", continent: "Europe", flag: "🇱🇺", currency: "EUR (€)", population: "660 Thousand", fact: "The first country in the world to make all public transportation completely free nationwide." },
  { name: "Malta", capital: "Valletta", continent: "Europe", flag: "🇲🇹", currency: "EUR (€)", population: "530 Thousand", fact: "Valletta is Europe's smallest capital city by area (0.8 sq km) and a UNESCO site." },
  { name: "Moldova", capital: "Chișinău", continent: "Europe", flag: "🇲🇩", currency: "MDL (Leu)", population: "2.6 Million", fact: "Home to Mileștii Mici, the world's largest underground wine cellar spanning 200 km." },
  { name: "Monaco", capital: "Monaco", continent: "Europe", flag: "🇲🇨", currency: "EUR (€)", population: "39 Thousand", fact: "The second-smallest independent state in the world after the Vatican, famous for Formula 1." },
  { name: "Montenegro", capital: "Podgorica", continent: "Europe", flag: "🇲🇪", currency: "EUR (€)", population: "620 Thousand", fact: "Features the Bay of Kotor and Tara River Canyon, Europe's deepest river canyon." },
  { name: "Netherlands", capital: "Amsterdam", continent: "Europe", flag: "🇳🇱", currency: "EUR (€)", population: "17.8 Million", fact: "Amsterdam rests on over 11 million wooden piles to prevent sinking in the marshy soil." },
  { name: "North Macedonia", capital: "Skopje", continent: "Europe", flag: "🇲🇰", currency: "MKD (Denar)", population: "1.8 Million", fact: "Birthplace of Mother Teresa and known for hundreds of neoclassical monuments in Skopje." },
  { name: "Norway", capital: "Oslo", continent: "Europe", flag: "🇳🇴", currency: "NOK (Krone)", population: "5.5 Million", fact: "Awarded the Nobel Peace Prize annually in Oslo City Hall." },
  { name: "Poland", capital: "Warsaw", continent: "Europe", flag: "🇵🇱", currency: "PLN (Złoty)", population: "38 Million", fact: "Warsaw's historic center was meticulously rebuilt brick-by-brick after World War II." },
  { name: "Portugal", capital: "Lisbon", continent: "Europe", flag: "🇵🇹", currency: "EUR (€)", population: "10.3 Million", fact: "Lisbon is older than Rome by roughly four centuries, built on seven dramatic hills." },
  { name: "Romania", capital: "Bucharest", continent: "Europe", flag: "🇷🇴", currency: "RON (Leu)", population: "19 Million", fact: "The Palace of the Parliament in Bucharest is the world's heaviest building." },
  { name: "Russia", capital: "Moscow", continent: "Europe", flag: "🇷🇺", currency: "RUB (Ruble)", population: "144 Million", fact: "The largest country on Earth by area, spanning eleven time zones across two continents." },
  { name: "San Marino", capital: "San Marino", continent: "Europe", flag: "🇸🇲", currency: "EUR (€)", population: "34 Thousand", fact: "The world's oldest continuous constitutional republic, founded in 301 AD." },
  { name: "Serbia", capital: "Belgrade", continent: "Europe", flag: "🇷🇸", currency: "RSD (Dinar)", population: "6.7 Million", fact: "Belgrade sits right at the scenic confluence of the Danube and Sava rivers." },
  { name: "Slovakia", capital: "Bratislava", continent: "Europe", flag: "🇸🇰", currency: "EUR (€)", population: "5.4 Million", fact: "The only national capital bordering two other sovereign nations: Austria and Hungary." },
  { name: "Slovenia", capital: "Ljubljana", continent: "Europe", flag: "🇸🇮", currency: "EUR (€)", population: "2.1 Million", fact: "More than half of Slovenia is blanketed by lush green forests and alpine lakes." },
  { name: "Spain", capital: "Madrid", continent: "Europe", flag: "🇪🇸", currency: "EUR (€)", population: "48 Million", fact: "Madrid is home to Sobrino de Botín, certified as the oldest continuously operating restaurant." },
  { name: "Sweden", capital: "Stockholm", continent: "Europe", flag: "🇸🇪", currency: "SEK (Krona)", population: "10.5 Million", fact: "Stockholm is built across 14 islands linked by 57 bridges where Lake Mälaren meets the sea." },
  { name: "Switzerland", capital: "Bern", continent: "Europe", flag: "🇨🇭", currency: "CHF (Franc)", population: "8.8 Million", fact: "Switzerland technically does not have an official de jure capital, but Bern acts as federal city." },
  { name: "Ukraine", capital: "Kyiv", continent: "Europe", flag: "🇺🇦", currency: "UAH (Hryvnia)", population: "38 Million", fact: "Kyiv is home to Arsenalna station, one of the deepest metro stations on Earth (105.5 meters deep)." },
  { name: "United Kingdom", capital: "London", continent: "Europe", flag: "🇬🇧", currency: "GBP (£)", population: "67 Million", fact: "London Underground opened in 1863, making it the oldest underground passenger railway." },
  { name: "Vatican City", capital: "Vatican City", continent: "Europe", flag: "🇻🇦", currency: "EUR (€)", population: "800", fact: "The smallest independent state in the world, ruled by the Pope." },

  // --- AFRICA (54) ---
  { name: "Algeria", capital: "Algiers", continent: "Africa", flag: "🇩🇿", currency: "DZD (Dinar)", population: "45 Million", fact: "The largest country in Africa by land mass, dominated by the Sahara Desert." },
  { name: "Angola", capital: "Luanda", continent: "Africa", flag: "🇦🇴", currency: "AOA (Kwanza)", population: "36 Million", fact: "Rich in petroleum and diamonds with the famous Kalandula Falls." },
  { name: "Benin", capital: "Porto-Novo", continent: "Africa", flag: "🇧🇯", currency: "XOF (CFA Franc)", population: "13.4 Million", fact: "Historical birthplace of Vodun (Voodoo) culture and Dahomey Kingdom." },
  { name: "Botswana", capital: "Gaborone", continent: "Africa", flag: "🇧🇼", currency: "BWP (Pula)", population: "2.6 Million", fact: "Home to the inland Okavango Delta and largest elephant population on Earth." },
  { name: "Burkina Faso", capital: "Ouagadougou", continent: "Africa", flag: "🇧🇫", currency: "XOF (CFA Franc)", population: "22.7 Million", fact: "Its name translates to 'Land of Honest People'." },
  { name: "Burundi", capital: "Gitega", continent: "Africa", flag: "🇧🇮", currency: "BIF (Franc)", population: "12.9 Million", fact: "Moved its political capital from Bujumbura to historic Gitega in 2019." },
  { name: "Cabo Verde", capital: "Praia", continent: "Africa", flag: "🇨🇻", currency: "CVE (Escudo)", population: "590 Thousand", fact: "An Atlantic archipelago with rich Creole Portuguese-African music and culture." },
  { name: "Cameroon", capital: "Yaoundé", continent: "Africa", flag: "🇨🇲", currency: "XAF (CFA Franc)", population: "28 Million", fact: "Often called 'Africa in miniature' for its diverse landscapes and cultures." },
  { name: "Central African Republic", capital: "Bangui", continent: "Africa", flag: "🇨🇫", currency: "XAF (CFA Franc)", population: "5.6 Million", fact: "Bangui is situated along the Ubangi River, rich in biodiversity and forests." },
  { name: "Chad", capital: "N'Djamena", continent: "Africa", flag: "🇹🇩", currency: "XAF (CFA Franc)", population: "17.7 Million", fact: "Named after Lake Chad, once one of the largest freshwater bodies in Africa." },
  { name: "Comoros", capital: "Moroni", continent: "Africa", flag: "🇰🇲", currency: "KMF (Franc)", population: "836 Thousand", fact: "Volcanic island nation and one of the leading global producers of ylang-ylang perfume oil." },
  { name: "Democratic Republic of the Congo", capital: "Kinshasa", continent: "Africa", flag: "🇨🇩", currency: "CDF (Franc)", population: "99 Million", fact: "Kinshasa and Brazzaville are the closest pair of capital cities in the world across a river." },
  { name: "Republic of the Congo", capital: "Brazzaville", continent: "Africa", flag: "🇨🇬", currency: "XAF (CFA Franc)", population: "6 Million", fact: "Known for the elegant 'Sapeurs' fashion subculture of Brazzaville." },
  { name: "Djibouti", capital: "Djibouti", continent: "Africa", flag: "🇩🇯", currency: "DJF (Franc)", population: "1.1 Million", fact: "Lake Assal in Djibouti is the lowest point in Africa at 155 meters below sea level." },
  { name: "Egypt", capital: "Cairo", continent: "Africa", flag: "🇪🇬", currency: "EGP (Pound)", population: "109 Million", fact: "Cairo is home to the Great Pyramids of Giza, the only surviving Ancient Wonder of the World." },
  { name: "Equatorial Guinea", capital: "Malabo", continent: "Africa", flag: "🇬🇶", currency: "XAF (CFA Franc)", population: "1.6 Million", fact: "The only sovereign nation in mainland Africa where Spanish is an official language." },
  { name: "Eritrea", capital: "Asmara", continent: "Africa", flag: "🇪🇷", currency: "ERN (Nakfa)", population: "3.6 Million", fact: "Asmara is a UNESCO World Heritage site celebrated for Italian modernist architecture." },
  { name: "Eswatini", capital: "Mbabane", continent: "Africa", flag: "🇸🇿", currency: "SZL (Lilangeni)", population: "1.2 Million", fact: "One of the last absolute monarchies in Africa, formerly known as Swaziland." },
  { name: "Ethiopia", capital: "Addis Ababa", continent: "Africa", flag: "🇪🇹", currency: "ETB (Birr)", population: "123 Million", fact: "Only African country never colonized during the Scramble for Africa, origin of coffee." },
  { name: "Gabon", capital: "Libreville", continent: "Africa", flag: "🇬🇦", currency: "XAF (CFA Franc)", population: "2.4 Million", fact: "Over 80% of Gabon is covered in lush rainforest, home to forest elephants and gorillas." },
  { name: "Gambia", capital: "Banjul", continent: "Africa", flag: "🇬🇲", currency: "GMD (Dalasi)", population: "2.7 Million", fact: "The smallest country in mainland Africa, tracing the winding banks of the Gambia River." },
  { name: "Ghana", capital: "Accra", continent: "Africa", flag: "🇬🇭", currency: "GHS (Cedi)", population: "33.5 Million", fact: "First sub-Saharan African country to declare independence from European colonial rule in 1957." },
  { name: "Guinea", capital: "Conakry", continent: "Africa", flag: "🇬🇳", currency: "GNF (Franc)", population: "13.9 Million", fact: "Holds over a quarter of the world's known bauxite (aluminum ore) reserves." },
  { name: "Guinea-Bissau", capital: "Bissau", continent: "Africa", flag: "🇬🇼", currency: "XOF (CFA Franc)", population: "2.1 Million", fact: "Includes the Bijagós Archipelago, an internationally recognized biosphere reserve." },
  { name: "Ivory Coast", capital: "Yamoussoukro", continent: "Africa", flag: "🇨🇮", currency: "XOF (CFA Franc)", population: "29 Million", fact: "World's leading producer of cocoa beans; Yamoussoukro has the world's largest church." },
  { name: "Kenya", capital: "Nairobi", continent: "Africa", flag: "🇰🇪", currency: "KES (Shilling)", population: "54 Million", fact: "Nairobi is the only global capital city with a national wildlife park within its city limits." },
  { name: "Lesotho", capital: "Maseru", continent: "Africa", flag: "🇱🇸", currency: "LSL (Loti)", population: "2.3 Million", fact: "The 'Kingdom in the Sky' is the only independent state located entirely above 1,000 meters elevation." },
  { name: "Liberia", capital: "Monrovia", continent: "Africa", flag: "🇱🇷", currency: "LRD (Dollar)", population: "5.3 Million", fact: "Africa's oldest modern republic, named Monrovia after US President James Monroe." },
  { name: "Libya", capital: "Tripoli", continent: "Africa", flag: "🇱🇾", currency: "LYD (Dinar)", population: "6.8 Million", fact: "Home to spectacular Roman archaeological ruins at Leptis Magna and Sabratha." },
  { name: "Madagascar", capital: "Antananarivo", continent: "Africa", flag: "🇲🇬", currency: "MGA (Ariary)", population: "29 Million", fact: "Over 90% of all wildlife in Madagascar is found nowhere else on Earth, including all lemurs." },
  { name: "Malawi", capital: "Lilongwe", continent: "Africa", flag: "🇲🇼", currency: "MWK (Kwacha)", population: "20 Million", fact: "Known as the 'Warm Heart of Africa' and home to fish-rich Lake Malawi." },
  { name: "Mali", capital: "Bamako", continent: "Africa", flag: "🇲🇱", currency: "XOF (CFA Franc)", population: "22 Million", fact: "Home to ancient Timbuktu, a renowned center of Islamic scholarship and trade." },
  { name: "Mauritania", capital: "Nouakchott", continent: "Africa", flag: "🇲🇷", currency: "MRU (Ouguiya)", population: "4.7 Million", fact: "Features the Eye of the Sahara (Richat Structure), a massive 40 km geological dome visible from space." },
  { name: "Mauritius", capital: "Port Louis", continent: "Africa", flag: "🇲🇺", currency: "MUR (Rupee)", population: "1.3 Million", fact: "The only known historical habitat of the extinct flightless bird, the Dodo." },
  { name: "Morocco", capital: "Rabat", continent: "Africa", flag: "🇲🇦", currency: "MAD (Dirham)", population: "37.5 Million", fact: "University of al-Qarawiyyin in Fez, Morocco is recognized as the world's oldest university." },
  { name: "Mozambique", capital: "Maputo", continent: "Africa", flag: "🇲🇿", currency: "MZN (Metical)", population: "33 Million", fact: "The only national flag in the world featuring a modern assault rifle (AK-47)." },
  { name: "Namibia", capital: "Windhoek", continent: "Africa", flag: "🇳🇦", currency: "NAD (Dollar)", population: "2.6 Million", fact: "Contains the Namib Desert, recognized as the oldest desert on Earth (at least 55 million years old)." },
  { name: "Niger", capital: "Niamey", continent: "Africa", flag: "🇳🇪", currency: "XOF (CFA Franc)", population: "26 Million", fact: "Named after the Niger River, home to dinosaur fossil grounds in the Sahara." },
  { name: "Nigeria", capital: "Abuja", continent: "Africa", flag: "🇳🇬", currency: "NGN (Naira)", population: "220 Million", fact: "Most populous country in Africa and origin of Nollywood, a massive global film industry." },
  { name: "Rwanda", capital: "Kigali", continent: "Africa", flag: "🇷🇼", currency: "RWF (Franc)", population: "13.8 Million", fact: "Known as the 'Land of a Thousand Hills', celebrated as one of the cleanest, safest nations in Africa." },
  { name: "São Tomé and Príncipe", capital: "São Tomé", continent: "Africa", flag: "🇸🇹", currency: "STN (Dobra)", population: "227 Thousand", fact: "Volcanic twin-island nation situated right on the equator in the Gulf of Guinea." },
  { name: "Senegal", capital: "Dakar", continent: "Africa", flag: "🇸🇳", currency: "XOF (CFA Franc)", population: "17.3 Million", fact: "Westernmost city of the African mainland, historically known for the Dakar Rally." },
  { name: "Seychelles", capital: "Victoria", continent: "Africa", flag: "🇸🇨", currency: "SCR (Rupee)", population: "100 Thousand", fact: "An archipelago of 115 granite and coral islands; smallest country in Africa by population." },
  { name: "Sierra Leone", capital: "Freetown", continent: "Africa", flag: "🇸🇱", currency: "SLE (Leone)", population: "8.6 Million", fact: "Freetown was founded in 1792 by freed African-American and Caribbean slaves." },
  { name: "Somalia", capital: "Mogadishu", continent: "Africa", flag: "🇸🇴", currency: "SOS (Shilling)", population: "17.6 Million", fact: "Boasts the longest continuous coastline of any country on the African mainland." },
  { name: "South Africa", capital: "Pretoria", continent: "Africa", flag: "🇿🇦", currency: "ZAR (Rand)", population: "60 Million", fact: "Has three capital cities: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial)." },
  { name: "South Sudan", capital: "Juba", continent: "Africa", flag: "🇸🇸", currency: "SSP (Pound)", population: "11 Million", fact: "The youngest recognized sovereign nation on Earth, gaining independence in July 2011." },
  { name: "Sudan", capital: "Khartoum", continent: "Africa", flag: "🇸🇩", currency: "SDG (Pound)", population: "46 Million", fact: "Contains over 200 ancient Nubian pyramids, more than Egypt!" },
  { name: "Tanzania", capital: "Dodoma", continent: "Africa", flag: "🇹🇿", currency: "TZS (Shilling)", population: "65 Million", fact: "Home to Mount Kilimanjaro (highest mountain in Africa) and the Serengeti wildlife migration." },
  { name: "Togo", capital: "Lomé", continent: "Africa", flag: "🇹🇬", currency: "XOF (CFA Franc)", population: "8.8 Million", fact: "Lomé is situated directly on the Gulf of Guinea coastline, known for its Grand Marché." },
  { name: "Tunisia", capital: "Tunis", continent: "Africa", flag: "🇹🇳", currency: "TND (Dinar)", population: "12.3 Million", fact: "Northernmost country in Africa, home to the ruins of legendary Carthage." },
  { name: "Uganda", capital: "Kampala", continent: "Africa", flag: "🇺🇬", currency: "UGX (Shilling)", population: "47 Million", fact: "Nicknamed the 'Pearl of Africa' by Winston Churchill, home to rare mountain gorillas." },
  { name: "Zambia", capital: "Lusaka", continent: "Africa", flag: "🇿🇲", currency: "ZMW (Kwacha)", population: "20 Million", fact: "Shares Victoria Falls (Mosi-oa-Tunya, 'The Smoke That Thunders') with Zimbabwe." },
  { name: "Zimbabwe", capital: "Harare", continent: "Africa", flag: "🇿🇼", currency: "ZWL (Dollar)", population: "16 Million", fact: "Named after Great Zimbabwe, a massive stone ruin city built between the 11th and 15th centuries." },

  // --- AMERICAS (35) ---
  { name: "Antigua and Barbuda", capital: "St. John's", continent: "Americas", flag: "🇦🇬", currency: "XCD (EC Dollar)", population: "94 Thousand", fact: "Famous for having 365 distinct beaches—one for every single day of the year." },
  { name: "Argentina", capital: "Buenos Aires", continent: "Americas", flag: "🇦🇷", currency: "ARS (Peso)", population: "46 Million", fact: "Birthplace of the tango, 3-time FIFA World Cup champions, and home to Iguazu Falls." },
  { name: "Bahamas", capital: "Nassau", continent: "Americas", flag: "🇧🇸", currency: "BSD (Dollar)", population: "410 Thousand", fact: "Consists of over 700 islands and cays with crystal-clear waters and swimming pigs at Exuma." },
  { name: "Barbados", capital: "Bridgetown", continent: "Americas", flag: "🇧🇧", currency: "BBD (Dollar)", population: "281 Thousand", fact: "Birthplace of rum and pop icon Rihanna, declared a republic in 2021." },
  { name: "Belize", capital: "Belmopan", continent: "Americas", flag: "🇧🇿", currency: "BZD (Dollar)", population: "405 Thousand", fact: "The only country in Central America with English as its official language, home to the Great Blue Hole." },
  { name: "Bolivia", capital: "Sucre", continent: "Americas", flag: "🇧🇴", currency: "BOB (Boliviano)", population: "12.2 Million", fact: "Sucre is the constitutional capital, while La Paz is the highest seat of government (3,640 m)." },
  { name: "Brazil", capital: "Brasília", continent: "Americas", flag: "🇧🇷", currency: "BRL (Real)", population: "215 Million", fact: "Brasília was planned and built in just 41 months, famously shaped like a giant airplane from above." },
  { name: "Canada", capital: "Ottawa", continent: "Americas", flag: "🇨🇦", currency: "CAD (Dollar)", population: "39 Million", fact: "Has the longest coastline in the world (243,042 km) and more lakes than all other countries combined." },
  { name: "Chile", capital: "Santiago", continent: "Americas", flag: "🇨🇱", currency: "CLP (Peso)", population: "19.5 Million", fact: "The longest north-south country in the world, spanning over 4,300 km from the Atacama to Antarctica." },
  { name: "Colombia", capital: "Bogotá", continent: "Americas", flag: "🇨🇴", currency: "COP (Peso)", population: "52 Million", fact: "Second most biodiverse country on Earth and world's top producer of emeralds." },
  { name: "Costa Rica", capital: "San José", continent: "Americas", flag: "🇨🇷", currency: "CRC (Colón)", population: "5.2 Million", fact: "Abolished its military army in 1948 and runs on nearly 100% renewable electricity." },
  { name: "Cuba", capital: "Havana", continent: "Americas", flag: "🇨🇺", currency: "CUP (Peso)", population: "11.2 Million", fact: "Known for classic 1950s American vintage cars cruising through pastel-colored Havana." },
  { name: "Dominica", capital: "Roseau", continent: "Americas", flag: "🇩🇲", currency: "XCD (EC Dollar)", population: "72 Thousand", fact: "Known as the 'Nature Isle of the Caribbean' with natural boiling lakes and geothermal springs." },
  { name: "Dominican Republic", capital: "Santo Domingo", continent: "Americas", flag: "🇩🇴", currency: "DOP (Peso)", population: "11 Million", fact: "Santo Domingo was the first European permanent settlement in the Americas, founded in 1496." },
  { name: "Ecuador", capital: "Quito", continent: "Americas", flag: "🇪🇨", currency: "USD ($)", population: "18 Million", fact: "Quito is the closest capital city to the equator and home to the Galápagos Islands." },
  { name: "El Salvador", capital: "San Salvador", continent: "Americas", flag: "🇸🇻", currency: "USD ($)", population: "6.3 Million", fact: "Known as the 'Land of Volcanoes' with over 20 active volcanoes across a compact area." },
  { name: "Grenada", capital: "St. George's", continent: "Americas", flag: "🇬🇩", currency: "XCD (EC Dollar)", population: "125 Thousand", fact: "Known as the 'Spice Isle' because it is one of the world's largest exporters of nutmeg." },
  { name: "Guatemala", capital: "Guatemala City", continent: "Americas", flag: "🇬🇹", currency: "GTQ (Quetzal)", population: "18 Million", fact: "Heart of the ancient Maya civilization with soaring ancient pyramids at Tikal." },
  { name: "Guyana", capital: "Georgetown", continent: "Americas", flag: "🇬🇾", currency: "GYD (Dollar)", population: "800 Thousand", fact: "Home to Kaieteur Falls, the world's widest single-drop waterfall by volume." },
  { name: "Haiti", capital: "Port-au-Prince", continent: "Americas", flag: "🇭🇹", currency: "HTG (Gourde)", population: "11.5 Million", fact: "The world's first independent Black republic, successfully rebelling in 1804." },
  { name: "Honduras", capital: "Tegucigalpa", continent: "Americas", flag: "🇭🇳", currency: "HNL (Lempira)", population: "10.4 Million", fact: "Home to the ancient Maya city of Copán, celebrated for elaborate carved stone stelae." },
  { name: "Jamaica", capital: "Kingston", continent: "Americas", flag: "🇯🇲", currency: "JMD (Dollar)", population: "2.8 Million", fact: "Birthplace of reggae music, Bob Marley, and world-record sprinters like Usain Bolt." },
  { name: "Mexico", capital: "Mexico City", continent: "Americas", flag: "🇲🇽", currency: "MXN (Peso)", population: "128 Million", fact: "Mexico City was built on the ruins of the Aztec capital Tenochtitlan over an ancient lake." },
  { name: "Nicaragua", capital: "Managua", continent: "Americas", flag: "🇳🇮", currency: "NIO (Córdoba)", population: "6.9 Million", fact: "Lake Nicaragua is the only freshwater lake in the world inhabited by freshwater bull sharks." },
  { name: "Panama", capital: "Panama City", continent: "Americas", flag: "🇵🇦", currency: "PAB / USD", population: "4.4 Million", fact: "The Panama Canal links the Atlantic and Pacific oceans, a marvel of modern engineering." },
  { name: "Paraguay", capital: "Asunción", continent: "Americas", flag: "🇵🇾", currency: "PYG (Guaraní)", population: "6.8 Million", fact: "Guaraní is an official indigenous language spoken by over 85% of the population." },
  { name: "Peru", capital: "Lima", continent: "Americas", flag: "🇵🇪", currency: "PEN (Sol)", population: "34 Million", fact: "Home to the Incan citadel of Machu Picchu and more than 4,000 native varieties of potato." },
  { name: "Saint Kitts and Nevis", capital: "Basseterre", continent: "Americas", flag: "🇰🇳", currency: "XCD (EC Dollar)", population: "48 Thousand", fact: "The smallest sovereign country in the Western Hemisphere both in area and population." },
  { name: "Saint Lucia", capital: "Castries", continent: "Americas", flag: "🇱🇨", currency: "XCD (EC Dollar)", population: "180 Thousand", fact: "The only country in the world named after a historical woman (Saint Lucy of Syracuse)." },
  { name: "Saint Vincent and the Grenadines", capital: "Kingstown", continent: "Americas", flag: "🇻🇨", currency: "XCD (EC Dollar)", population: "104 Thousand", fact: "Comprises 32 scenic islands, famous as filming locations for Pirates of the Caribbean." },
  { name: "Suriname", capital: "Paramaribo", continent: "Americas", flag: "🇸🇷", currency: "SRD (Dollar)", population: "618 Thousand", fact: "The only independent nation in South America where Dutch is the official national language." },
  { name: "Trinidad and Tobago", capital: "Port of Spain", continent: "Americas", flag: "🇹🇹", currency: "TTD (Dollar)", population: "1.5 Million", fact: "Birthplace of the steelpan drum (only acoustic instrument invented in the 20th century) and Calypso." },
  { name: "United States", capital: "Washington, D.C.", continent: "Americas", flag: "🇺🇸", currency: "USD ($)", population: "335 Million", fact: "Washington, D.C. is a federal district named after George Washington, not part of any US state." },
  { name: "Uruguay", capital: "Montevideo", continent: "Americas", flag: "🇺🇾", currency: "UYU (Peso)", population: "3.4 Million", fact: "Hosted and won the very first FIFA World Cup in 1930 in Montevideo." },
  { name: "Venezuela", capital: "Caracas", continent: "Americas", flag: "🇻🇪", currency: "VES (Bolívar)", population: "29 Million", fact: "Home to Angel Falls, the world's highest uninterrupted waterfall dropping 979 meters." },

  // --- OCEANIA (14) ---
  { name: "Australia", capital: "Canberra", continent: "Oceania", flag: "🇦🇺", currency: "AUD (Dollar)", population: "26 Million", fact: "Canberra was chosen as a compromise capital in 1908 because Sydney and Melbourne couldn't agree." },
  { name: "Fiji", capital: "Suva", continent: "Oceania", flag: "🇫🇯", currency: "FJD (Dollar)", population: "930 Thousand", fact: "An archipelago of over 330 tropical islands, celebrated for coral reefs and rugby prowess." },
  { name: "Kiribati", capital: "South Tarawa", continent: "Oceania", flag: "🇰🇮", currency: "AUD (Dollar)", population: "131 Thousand", fact: "The only nation in the world situated in all four hemispheres (Northern, Southern, Eastern, Western)." },
  { name: "Marshall Islands", capital: "Majuro", continent: "Oceania", flag: "🇲🇭", currency: "USD ($)", population: "42 Thousand", fact: "Made up of 29 low-lying coral atolls spanning over 750,000 square miles of the Pacific." },
  { name: "Micronesia", capital: "Palikir", continent: "Oceania", flag: "🇫🇲", currency: "USD ($)", population: "115 Thousand", fact: "Home to Nan Madol, a mysterious ancient city built entirely of basalt logs on coral reefs." },
  { name: "Nauru", capital: "Yaren", continent: "Oceania", flag: "🇳🇷", currency: "AUD (Dollar)", population: "12 Thousand", fact: "World's smallest island nation (21 sq km); Yaren serves as the de facto capital district." },
  { name: "New Zealand", capital: "Wellington", continent: "Oceania", flag: "🇳🇿", currency: "NZD (Dollar)", population: "5.2 Million", fact: "Wellington is the southernmost national capital city in the entire world." },
  { name: "Palau", capital: "Ngerulmud", continent: "Oceania", flag: "🇵🇼", currency: "USD ($)", population: "18 Thousand", fact: "Ngerulmud is the least populous national capital in the world with under 400 residents." },
  { name: "Papua New Guinea", capital: "Port Moresby", continent: "Oceania", flag: "🇵🇬", currency: "PGK (Kina)", population: "10 Million", fact: "Most linguistically diverse nation in the world with over 840 distinct living languages!" },
  { name: "Samoa", capital: "Apia", continent: "Oceania", flag: "🇼🇸", currency: "WST (Tālā)", population: "220 Thousand", fact: "In 2011, Samoa skipped December 30th entirely by moving west across the International Date Line." },
  { name: "Solomon Islands", capital: "Honiara", continent: "Oceania", flag: "🇸🇧", currency: "SBD (Dollar)", population: "720 Thousand", fact: "Site of the historic World War II Battle of Guadalcanal, with world-famous diving wrecks." },
  { name: "Tonga", capital: "Nuku'alofa", continent: "Oceania", flag: "🇹🇴", currency: "TOP (Paʻanga)", population: "106 Thousand", fact: "The only monarchy in the Pacific that was never colonized by any foreign power." },
  { name: "Tuvalu", capital: "Funafuti", continent: "Oceania", flag: "🇹🇻", currency: "AUD (Dollar)", population: "11 Thousand", fact: "One of the smallest nations on Earth, earns significant national revenue from the '.tv' web domain." },
  { name: "Vanuatu", capital: "Port Vila", continent: "Oceania", flag: "🇻🇺", currency: "VUV (Vatu)", population: "320 Thousand", fact: "Birthplace of land diving (Naghol) on Pentecost Island, the ancestral inspiration for bungee jumping." }
];

// Current State
let currentFilterContinent = "All";
let activeTab = "finder"; // "finder" or "quiz"
let selectedCountryObj = null;

// Quiz State
let quizScore = 0;
let quizStreak = 0;
let quizBestStreak = parseInt(localStorage.getItem("capitals_best_streak") || "0", 10);
let currentQuizQuestion = null;
let isAnswered = false;

// Audio synth context for positive/negative audio chimes
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
}

function playChime(isCorrect) {
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (isCorrect) {
      // Pleasant upward two-tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      // Gentle downward buzz
      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // Graceful fallback if Web Audio is blocked or not supported
  }
}

/**
 * Populate the country select element dynamically while maintaining optgroups by continent.
 */
function populateCountrySelect() {
  const select = document.getElementById("country");
  if (!select) return;

  const currentVal = select.value;
  select.innerHTML = '<option value="">-- Select a Country (195 Available) --</option>';

  // Group countries by continent
  const continents = ["Asia", "Europe", "Africa", "Americas", "Oceania"];
  const filter = currentFilterContinent;

  continents.forEach(continent => {
    if (filter !== "All" && filter !== continent) return;

    const group = document.createElement("optgroup");
    group.label = `🌍 ${continent}`;

    const continentCountries = countriesData
      .filter(c => c.continent === continent)
      .sort((a, b) => a.name.localeCompare(b.name));

    continentCountries.forEach(c => {
      const opt = document.createElement("option");
      // VALUE is the Capital name to strictly satisfy the original assignment's contract:
      // capital.textContent = "Capital: " + country.value;
      opt.value = c.capital;
      opt.textContent = `${c.flag} ${c.name}`;
      opt.setAttribute("data-country", c.name);
      group.appendChild(opt);
    });

    select.appendChild(group);
  });

  // Restore previous selection if still available
  if (currentVal) {
    select.value = currentVal;
  }
}

/**
 * Original Viva Core Function: showCapital()
 * Fully preserves:
 * 1. Reads document.getElementById("country")
 * 2. Reads document.getElementById("capital")
 * 3. capital.textContent = "Capital: " + country.value
 * Enhanced to simultaneously update the rich interactive detail card!
 */
function showCapital() {
  const countrySelect = document.getElementById("country");
  const capital = document.getElementById("capital");
  if (!countrySelect || !capital) return;

  if (countrySelect.value === "") {
    capital.textContent = "";
    selectedCountryObj = null;
    updateDetailCard(null);
  } else {
    // Preserve exact assignment behavior
    capital.textContent = "Capital: " + countrySelect.value;

    // Find the corresponding country object
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];
    const countryName = selectedOption ? selectedOption.getAttribute("data-country") : null;

    let match = null;
    if (countryName) {
      match = countriesData.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    }
    if (!match) {
      match = countriesData.find(c => c.capital.toLowerCase() === countrySelect.value.toLowerCase());
    }

    selectedCountryObj = match || null;
    updateDetailCard(selectedCountryObj);
  }
}

/**
 * Updates the interactive details card display with rich metadata
 */
function updateDetailCard(country) {
  const card = document.getElementById("countryCard");
  if (!card) return;

  if (!country) {
    card.classList.add("hidden");
    return;
  }

  card.classList.remove("hidden");

  // Populate card details
  const flagEl = document.getElementById("cardFlag");
  const nameEl = document.getElementById("cardCountryName");
  const continentBadgeEl = document.getElementById("cardContinentBadge");
  const capitalEl = document.getElementById("cardCapital");
  const currencyEl = document.getElementById("cardCurrency");
  const populationEl = document.getElementById("cardPopulation");
  const factEl = document.getElementById("cardFact");
  const mapsLinkEl = document.getElementById("cardMapsLink");

  if (flagEl) flagEl.textContent = country.flag;
  if (nameEl) nameEl.textContent = country.name;
  if (continentBadgeEl) continentBadgeEl.textContent = country.continent;
  if (capitalEl) capitalEl.textContent = country.capital;
  if (currencyEl) currencyEl.textContent = country.currency;
  if (populationEl) populationEl.textContent = country.population;
  if (factEl) factEl.textContent = country.fact;

  if (mapsLinkEl) {
    mapsLinkEl.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.capital + ", " + country.name)}`;
  }

  // Trigger slight reveal animation
  card.classList.remove("card-pulse");
  void card.offsetWidth; // Reflow
  card.classList.add("card-pulse");
}

/**
 * Surprise Me: Pick a Random Country
 */
function pickRandomCountry() {
  let pool = countriesData;
  if (currentFilterContinent !== "All") {
    pool = countriesData.filter(c => c.continent === currentFilterContinent);
  }
  if (pool.length === 0) pool = countriesData;

  const randomIndex = Math.floor(Math.random() * pool.length);
  const randomCountry = pool[randomIndex];

  const select = document.getElementById("country");
  if (select) {
    // If the random country is filtered out, reset filter to 'All'
    if (currentFilterContinent !== "All" && randomCountry.continent !== currentFilterContinent) {
      setContinentFilter("All");
    }

    // Set select value
    select.value = randomCountry.capital;
    showCapital();

    showToast(`Selected: ${randomCountry.flag} ${randomCountry.name}!`);
  }
}

/**
 * Continent Filter Buttons
 */
function setContinentFilter(continent) {
  currentFilterContinent = continent;
  const buttons = document.querySelectorAll(".continent-pill");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-continent") === continent) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  populateCountrySelect();
  showCapital();
}

/**
 * Search Autocomplete / Quick Filter input
 */
function handleSearchInput(event) {
  const query = event.target.value.trim().toLowerCase();
  const select = document.getElementById("country");
  if (!select) return;

  if (query === "") {
    populateCountrySelect();
    return;
  }

  // Filter countries matching query
  const matches = countriesData.filter(c => {
    const matchesContinent = currentFilterContinent === "All" || c.continent === currentFilterContinent;
    const matchesQuery = c.name.toLowerCase().includes(query) || c.capital.toLowerCase().includes(query);
    return matchesContinent && matchesQuery;
  });

  select.innerHTML = `<option value="">-- Matching (${matches.length}) --</option>`;
  matches.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.capital;
    opt.textContent = `${c.flag} ${c.name} → ${c.capital}`;
    opt.setAttribute("data-country", c.name);
    select.appendChild(opt);
  });

  // If exact match or 1 result, auto-select
  if (matches.length === 1) {
    select.value = matches[0].capital;
    showCapital();
  }
}

function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = "";
    populateCountrySelect();
    showCapital();
    searchInput.focus();
  }
}

/**
 * Toast Notification Popup
 */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/**
 * Theme Toggle (Light / Dark Mode)
 */
function initTheme() {
  const savedTheme = localStorage.getItem("country_finder_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButtonUI(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  const newTheme = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("country_finder_theme", newTheme);
  updateThemeButtonUI(newTheme);
}

function updateThemeButtonUI(theme) {
  const icon = document.getElementById("themeIcon");
  const label = document.getElementById("themeLabel");
  if (icon) icon.textContent = theme === "light" ? "🌙" : "☀️";
  if (label) label.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
}

/**
 * Mode Switcher: "finder" vs "quiz"
 */
function switchTab(tabName) {
  activeTab = tabName;
  const finderTabBtn = document.getElementById("tabFinder");
  const quizTabBtn = document.getElementById("tabQuiz");
  const finderSection = document.getElementById("finderSection");
  const quizSection = document.getElementById("quizSection");

  if (tabName === "finder") {
    finderTabBtn?.classList.add("active");
    quizTabBtn?.classList.remove("active");
    finderSection?.classList.remove("hidden");
    quizSection?.classList.add("hidden");
  } else {
    finderTabBtn?.classList.remove("active");
    quizTabBtn?.classList.add("active");
    finderSection?.classList.add("hidden");
    quizSection?.classList.remove("hidden");
    startNextQuizQuestion();
  }
}

/**
 * ----------------------------------------------------
 * INTERACTIVE CAPITAL QUIZ CHALLENGE GAME ENGINE
 * ----------------------------------------------------
 */
function startNextQuizQuestion() {
  isAnswered = false;
  const feedbackEl = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("quizNextBtn");
  if (feedbackEl) feedbackEl.innerHTML = "";
  if (nextBtn) nextBtn.style.display = "none";

  // Pick random target country
  const targetIndex = Math.floor(Math.random() * countriesData.length);
  const targetCountry = countriesData[targetIndex];

  // Pick 3 random distinct distractors
  const distractors = [];
  while (distractors.length < 3) {
    const r = Math.floor(Math.random() * countriesData.length);
    if (r !== targetIndex && !distractors.includes(countriesData[r].capital)) {
      distractors.push(countriesData[r].capital);
    }
  }

  // Shuffle target capital into options
  const options = [...distractors, targetCountry.capital].sort(() => Math.random() - 0.5);

  currentQuizQuestion = {
    country: targetCountry,
    correctCapital: targetCountry.capital,
    options: options
  };

  // Render question
  const flagEl = document.getElementById("quizFlag");
  const questionEl = document.getElementById("quizQuestion");
  const continentEl = document.getElementById("quizContinent");
  const optionsGrid = document.getElementById("quizOptions");

  if (flagEl) flagEl.textContent = targetCountry.flag;
  if (questionEl) questionEl.textContent = `What is the capital of ${targetCountry.name}?`;
  if (continentEl) continentEl.textContent = `Region: ${targetCountry.continent}`;

  if (optionsGrid) {
    optionsGrid.innerHTML = "";
    options.forEach((optCapital, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.innerHTML = `<span class="opt-num">${idx + 1}</span> <span class="opt-text">${optCapital}</span>`;
      btn.onclick = () => handleQuizAnswer(optCapital, btn);
      optionsGrid.appendChild(btn);
    });
  }

  updateQuizStatsUI();
}

function handleQuizAnswer(selectedCapital, clickedBtn) {
  if (isAnswered || !currentQuizQuestion) return;
  isAnswered = true;

  const isCorrect = selectedCapital === currentQuizQuestion.correctCapital;
  const feedbackEl = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("quizNextBtn");
  const optionButtons = document.querySelectorAll(".quiz-option-btn");

  initAudio();
  playChime(isCorrect);

  optionButtons.forEach(btn => {
    btn.disabled = true;
    const textSpan = btn.querySelector(".opt-text");
    if (textSpan && textSpan.textContent === currentQuizQuestion.correctCapital) {
      btn.classList.add("correct-option");
    }
  });

  if (isCorrect) {
    clickedBtn.classList.add("selected-correct");
    quizScore += 10;
    quizStreak += 1;
    if (quizStreak > quizBestStreak) {
      quizBestStreak = quizStreak;
      localStorage.setItem("capitals_best_streak", quizBestStreak.toString());
    }
    if (feedbackEl) {
      feedbackEl.innerHTML = `<span class="feedback-badge correct">✨ Spot on! ${currentQuizQuestion.correctCapital} is the capital of ${currentQuizQuestion.country.name}. (+10 pts)</span>`;
    }
  } else {
    clickedBtn.classList.add("selected-wrong");
    quizStreak = 0;
    if (feedbackEl) {
      feedbackEl.innerHTML = `<span class="feedback-badge wrong">❌ Not quite! The capital of ${currentQuizQuestion.country.name} is <strong>${currentQuizQuestion.correctCapital}</strong>.</span>`;
    }
  }

  updateQuizStatsUI();
  if (nextBtn) {
    nextBtn.style.display = "inline-flex";
    nextBtn.focus();
  }
}

function updateQuizStatsUI() {
  const scoreEl = document.getElementById("quizScore");
  const streakEl = document.getElementById("quizStreak");
  const bestEl = document.getElementById("quizBestStreak");
  if (scoreEl) scoreEl.textContent = quizScore.toString();
  if (streakEl) streakEl.textContent = quizStreak.toString();
  if (bestEl) bestEl.textContent = quizBestStreak.toString();
}

function resetQuizGame() {
  quizScore = 0;
  quizStreak = 0;
  updateQuizStatsUI();
  startNextQuizQuestion();
  showToast("Quiz scores reset! Good luck 🎯");
}

// Keyboard navigation for search shortcut and quiz options 1-4
document.addEventListener("keydown", (e) => {
  // Press '/' to jump to search
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    document.getElementById("searchInput")?.focus();
  }

  // In Quiz mode, 1, 2, 3, 4 selects option
  if (activeTab === "quiz" && !isAnswered) {
    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= 4) {
      const optionButtons = document.querySelectorAll(".quiz-option-btn");
      if (optionButtons[num - 1]) {
        optionButtons[num - 1].click();
      }
    }
  }

  // In Quiz mode, press 'Enter' or 'Space' to advance when next button is visible
  if (activeTab === "quiz" && isAnswered && (e.key === "Enter" || e.key === " ")) {
    const nextBtn = document.getElementById("quizNextBtn");
    if (nextBtn && nextBtn.style.display !== "none") {
      e.preventDefault();
      nextBtn.click();
    }
  }
});

/**
 * Initialize on DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  populateCountrySelect();

  // Set total count in header
  const countBadge = document.getElementById("totalCountriesBadge");
  if (countBadge) {
    countBadge.textContent = `${countriesData.length} Countries`;
  }
});

/*
 * Global Capital Explorer UI
 * These functions sit on top of the original assignment helpers so the
 * 195-country dataset and the original showCapital() contract stay intact.
 */
let explorerFilter = "All";
let recentCountries = JSON.parse(localStorage.getItem("capital_recent") || "[]");
let favoriteCountries = JSON.parse(localStorage.getItem("capital_favorites") || "[]");

const northAmerica = ["Canada", "United States", "Mexico", "Guatemala", "Belize", "El Salvador", "Honduras", "Nicaragua", "Costa Rica", "Panama", "Cuba", "Jamaica", "Haiti", "Dominican Republic", "The Bahamas", "Barbados", "Trinidad and Tobago", "Saint Lucia", "Saint Vincent and the Grenadines", "Grenada", "Antigua and Barbuda", "Dominica", "Saint Kitts and Nevis"];
const southAmerica = ["Brazil", "Argentina", "Colombia", "Peru", "Venezuela", "Chile", "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Guyana", "Suriname"];

function countryMatchesFilter(country) {
  if (explorerFilter === "All") return true;
  if (explorerFilter === "North America") return northAmerica.includes(country.name);
  if (explorerFilter === "South America") return southAmerica.includes(country.name);
  return country.continent === explorerFilter;
}

function filteredCountries(query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  return countriesData.filter(country => countryMatchesFilter(country) &&
    (!normalizedQuery || country.name.toLowerCase().includes(normalizedQuery) || country.capital.toLowerCase().includes(normalizedQuery)));
}

function renderExplorerSelect(query = "") {
  const select = document.getElementById("country");
  if (!select) return;
  const selectedName = selectedCountryObj ? selectedCountryObj.name : "";
  select.innerHTML = '<option value="">-- Select a country --</option>';
  filteredCountries(query).sort((a, b) => a.name.localeCompare(b.name)).forEach(country => {
    const option = document.createElement("option");
    option.value = country.capital;
    option.dataset.country = country.name;
    option.textContent = `${country.flag} ${country.name}`;
    if (country.name === selectedName) option.selected = true;
    select.appendChild(option);
  });
  const count = filteredCountries(query).length;
  const countEl = document.getElementById("resultCount");
  if (countEl) countEl.textContent = `${count} ${count === 1 ? "country" : "countries"}`;
}

function countryCode(country) {
  return [...country.flag].map(char => String.fromCharCode(char.codePointAt(0) - 127397)).join("");
}

function showCapital() {
  const select = document.getElementById("country");
  const capital = document.getElementById("capital");
  if (!select || !capital) return;
  const option = select.options[select.selectedIndex];
  const country = option && option.dataset.country ? countriesData.find(item => item.name === option.dataset.country) : null;
  if (!country) {
    capital.textContent = "";
    selectedCountryObj = null;
    updateDetailCard(null);
    return;
  }
  selectedCountryObj = country;
  capital.textContent = `Capital: ${country.capital}`;
  updateDetailCard(country);
  addRecentCountry(country);
}

function selectCountry(country) {
  const select = document.getElementById("country");
  if (!select || !country) return;
  if (!countryMatchesFilter(country)) {
    explorerFilter = "All";
    updateFilterButtons();
    renderExplorerSelect();
  }
  select.value = country.capital;
  if (select.value !== country.capital) {
    renderExplorerSelect(country.name);
    select.value = country.capital;
  }
  showCapital();
  document.getElementById("countryCard")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function updateDetailCard(country) {
  const card = document.getElementById("countryCard");
  if (!card) return;
  card.classList.toggle("hidden", !country);
  if (!country) return;
  document.getElementById("cardFlag").textContent = country.flag;
  document.getElementById("cardCountryName").textContent = country.name;
  document.getElementById("cardContinentBadge").textContent = country.continent;
  document.getElementById("cardCapital").textContent = country.capital;
  document.getElementById("cardCode").textContent = countryCode(country) || "—";
  document.getElementById("cardCurrency").textContent = country.currency;
  document.getElementById("cardPopulation").textContent = country.population;
  document.getElementById("cardFact").textContent = country.fact;
  document.getElementById("cardMapsLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${country.capital}, ${country.name}`)}`;
  const favoriteButton = document.getElementById("favoriteBtn");
  const isFavorite = favoriteCountries.includes(country.name);
  favoriteButton.classList.toggle("is-favorite", isFavorite);
  favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  favoriteButton.innerHTML = `${isFavorite ? "★" : "☆"} <span>${isFavorite ? "Favorited" : "Favorite"}</span>`;
  card.classList.remove("card-pulse");
  void card.offsetWidth;
  card.classList.add("card-pulse");
}

function addRecentCountry(country) {
  recentCountries = [country.name, ...recentCountries.filter(name => name !== country.name)].slice(0, 5);
  localStorage.setItem("capital_recent", JSON.stringify(recentCountries));
  renderRecentCountries();
}

function renderRecentCountries() {
  renderCountryList("recentList", recentCountries, "Your discoveries will appear here.");
}

function renderFavorites() {
  renderCountryList("favoritesList", favoriteCountries, "Save a country to build your list.");
  const favoriteCount = document.getElementById("favoriteCount");
  if (favoriteCount) favoriteCount.textContent = favoriteCountries.length;
}

function renderCountryList(elementId, names, emptyMessage) {
  const list = document.getElementById(elementId);
  if (!list) return;
  list.innerHTML = "";
  if (!names.length) {
    list.innerHTML = `<p class="empty-list">${emptyMessage}</p>`;
    return;
  }
  names.forEach(name => {
    const country = countriesData.find(item => item.name === name);
    if (!country) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "list-item";
    button.innerHTML = `<span class="list-flag">${country.flag}</span><span>${country.name}</span><small>${country.capital}</small>`;
    button.addEventListener("click", () => selectCountry(country));
    list.appendChild(button);
  });
}

function toggleFavorite() {
  if (!selectedCountryObj) return;
  const index = favoriteCountries.indexOf(selectedCountryObj.name);
  if (index >= 0) {
    favoriteCountries.splice(index, 1);
    showToast(`${selectedCountryObj.name} removed from favorites`);
  } else {
    favoriteCountries.unshift(selectedCountryObj.name);
    showToast(`${selectedCountryObj.name} saved to favorites`);
  }
  localStorage.setItem("capital_favorites", JSON.stringify(favoriteCountries));
  updateDetailCard(selectedCountryObj);
  renderFavorites();
}

function randomCountry() {
  const pool = filteredCountries();
  const country = pool[Math.floor(Math.random() * pool.length)] || countriesData[Math.floor(Math.random() * countriesData.length)];
  selectCountry(country);
}

function updateFilterButtons() {
  document.querySelectorAll(".continent-pill").forEach(button => button.classList.toggle("active", button.dataset.continent === explorerFilter));
  const label = document.getElementById("activeFilterLabel");
  if (label) label.textContent = explorerFilter === "All" ? "All countries" : `${explorerFilter} countries`;
}

function searchCountries() {
  const query = document.getElementById("searchInput").value;
  renderExplorerSelect(query);
  const suggestions = document.getElementById("countrySuggestions");
  const clearButton = document.getElementById("clearSearch");
  clearButton.classList.toggle("visible", Boolean(query));
  suggestions.innerHTML = "";
  filteredCountries(query).slice(0, 8).forEach(country => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion";
    button.setAttribute("role", "option");
    button.innerHTML = `<span>${country.flag}</span><strong>${country.name}</strong><small>${country.capital}</small>`;
    button.addEventListener("click", () => {
      document.getElementById("searchInput").value = country.name;
      suggestions.innerHTML = "";
      selectCountry(country);
    });
    suggestions.appendChild(button);
  });
  if (query && !filteredCountries(query).length) suggestions.innerHTML = '<p class="empty-list">No country found. Try another search.</p>';
}

document.addEventListener("DOMContentLoaded", () => {
  renderExplorerSelect();
  updateDetailCard(null);
  renderRecentCountries();
  renderFavorites();
  document.getElementById("searchInput").addEventListener("input", searchCountries);
  document.getElementById("clearSearch").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    searchCountries();
    document.getElementById("searchInput").focus();
  });
  document.querySelectorAll(".continent-pill").forEach(button => button.addEventListener("click", () => {
    explorerFilter = button.dataset.continent;
    updateFilterButtons();
    renderExplorerSelect(document.getElementById("searchInput").value);
    searchCountries();
  }));
  document.getElementById("randomBtn").addEventListener("click", randomCountry);
  document.getElementById("favoriteBtn").addEventListener("click", toggleFavorite);
  document.querySelectorAll("[data-count]").forEach(element => {
    const target = Number(element.dataset.count);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(target, current + Math.ceil(target / 20));
      element.textContent = current;
      if (current === target) clearInterval(timer);
    }, 45);
  });
});
