import { SectorDefinition } from '../types/survey';

export const SECTORS: SectorDefinition[] = [
  {
    id: 'sector_01',
    sectorNumber: 1,
    titleEn: 'Sector 01 – Soil & Earth Management',
    titleTa: 'பிரிவு 01 – மண் மற்றும் பூமி மேலாண்மை',
    descriptionEn: 'Assessment of soil fertility, erosion, chemical vs organic inputs, testing history, and regenerative farming practices.',
    descriptionTa: 'மண் வளம், அரிப்பு, ரசாயன மற்றும் இயற்கை உர பயன்பாடு, மண் பரிசோதனை வரலாறு மற்றும் இயற்கை விவசாய நடைமுறைகள் பற்றிய ஆய்வு.',
    iconName: 'Mountain',
    questions: [
      {
        id: 's1_q1',
        num: 1,
        labelEn: 'Land usage',
        labelTa: 'நில பயன்பாடு',
        type: 'select',
        optionsEn: ['Agriculture', 'Residential', 'Commercial', 'Industrial', 'Mixed', 'Vacant'],
        optionsTa: ['விவசாயம்', 'குடியிருப்பு', 'வணிகம்', 'தொழில்துறை', 'கலப்பு', 'தரிசு / காலியிடம்']
      },
      {
        id: 's1_q2',
        num: 2,
        labelEn: 'Total land area (Numeric)',
        labelTa: 'மொத்த நிலப்பரப்பு (எண்)',
        type: 'text',
        optionsEn: ['Acres', 'Hectares', 'Cents'],
        optionsTa: ['ஏக்கர்', 'ஹெக்டேர்', 'சென்ட்'],
        unitEn: 'Enter size & unit (e.g., 3.5 Acres)',
        unitTa: 'அளவையும் அலகையும் உள்ளிடவும்'
      },
      {
        id: 's1_q3',
        num: 3,
        labelEn: 'Cultivation status',
        labelTa: 'பயிரிடும் நிலை',
        type: 'select',
        optionsEn: ['Active', 'Seasonal', 'Fallow', 'Partially cultivated', 'Not applicable'],
        optionsTa: ['தொடர் சாகுபடி', 'பருவகால சாகுபடி', 'தரிசு', 'பகுதி சாகுபடி', 'பொருந்தாது']
      },
      {
        id: 's1_q4',
        num: 4,
        labelEn: 'Main crop',
        labelTa: 'முக்கிய பயிர்',
        type: 'select',
        optionsEn: ['Paddy', 'Banana', 'Sugarcane', 'Coconut', 'Vegetables', 'Pulses', 'Millets', 'Other'],
        optionsTa: ['நெல்', 'வாழை', 'கரும்பு', 'தென்னை', 'காய்கறிகள்', 'பருப்பு வகைகள்', 'சிறு தானியங்கள்', 'மற்றவை']
      },
      {
        id: 's1_q5',
        num: 5,
        labelEn: 'Soil type',
        labelTa: 'மண் வகை',
        type: 'select',
        optionsEn: ['Sandy', 'Clay', 'Loamy', 'Red', 'Black', 'Alluvial', 'Mixed', 'Unknown'],
        optionsTa: ['மணல் மண்', 'களிமண்', 'வண்டல் கலந்த செம்மண்', 'செம்மண்', 'கரிசல் மண்', 'வண்டல் மண்', 'கலப்பு மண்', 'தெரியவில்லை']
      },
      {
        id: 's1_q6',
        num: 6,
        labelEn: 'Last soil test',
        labelTa: 'கடைசி மண் பரிசோதனை',
        type: 'select',
        optionsEn: ['Within 1 year', '1–3 years', 'More than 3 years', 'Never'],
        optionsTa: ['1 வருடத்திற்குள்', '1–3 ஆண்டுகள்', '3 ஆண்டுகளுக்கு மேல்', 'ஒருபோதும் இல்லை']
      },
      {
        id: 's1_q7',
        num: 7,
        labelEn: 'Soil fertility',
        labelTa: 'மண் வளம் நிலை',
        type: 'select',
        optionsEn: ['Very good', 'Good', 'Moderate', 'Poor', 'Unknown'],
        optionsTa: ['மிக நன்று', 'நன்று', 'மிதமானது', 'குறைவு', 'தெரியவில்லை']
      },
      {
        id: 's1_q8',
        num: 8,
        labelEn: 'Soil erosion',
        labelTa: 'மண் அரிப்பு',
        type: 'select',
        optionsEn: ['None', 'Low', 'Moderate', 'Severe', 'Unknown'],
        optionsTa: ['இல்லை', 'குறைவு', 'மிதமானது', 'கடுமையானது', 'தெரியவில்லை']
      },
      {
        id: 's1_q9',
        num: 9,
        labelEn: 'Water stagnation',
        labelTa: 'நீர் தேங்குதல் நிலை',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Always'],
        optionsTa: ['ஒருபோதும் இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'எப்போதும்']
      },
      {
        id: 's1_q10',
        num: 10,
        labelEn: 'Moisture retention',
        labelTa: 'ஈரப்பத தக்கவைப்பு திறன்',
        type: 'select',
        optionsEn: ['Very good', 'Moderate', 'Poor', 'Unknown'],
        optionsTa: ['மிக நன்று', 'மிதமானது', 'குறைவு', 'தெரியவில்லை']
      },
      {
        id: 's1_q11',
        num: 11,
        labelEn: 'Fertiliser used',
        labelTa: 'பயன்படுத்தப்படும் உரம்',
        type: 'select',
        optionsEn: ['Chemical', 'Organic', 'Biofertiliser', 'Mixed', 'None'],
        optionsTa: ['ரசாயன உரம்', 'இயற்கை உரம்', 'உயிர் உரம்', 'கலப்பு உரம்', 'எதுவுமில்லை']
      },
      {
        id: 's1_q12',
        num: 12,
        labelEn: 'Chemical fertiliser frequency',
        labelTa: 'ரசாயன உர பயன்பாட்டு இடைவெளி',
        type: 'select',
        optionsEn: ['Every crop cycle', 'Monthly', 'Seasonally', 'Occasionally', 'Never'],
        optionsTa: ['ஒவ்வொரு பயிர் சுழற்சியிலும்', 'மாதந்தோறும்', 'பருவகாலத்தில்', 'எப்போதாவது', 'ஒருபோதும் இல்லை']
      },
      {
        id: 's1_q13',
        num: 13,
        labelEn: 'Chemical pesticide use',
        labelTa: 'ரசாயன பூச்சிக்கொல்லி பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Rarely', 'Never'],
        optionsTa: ['தவறாமல் / வழக்கமாக', 'எப்போதாவது', 'அரிதாக', 'ஒருபோதும் இல்லை']
      },
      {
        id: 's1_q14',
        num: 14,
        labelEn: 'Compost application',
        labelTa: 'மக்கிய இயற்கை உரம் பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Planning', 'Never'],
        optionsTa: ['தவறாமல்', 'எப்போதாவது', 'திட்டமிடுகிறோம்', 'ஒருபோதும் இல்லை']
      },
      {
        id: 's1_q15',
        num: 15,
        labelEn: 'Crop rotation',
        labelTa: 'பயிர் சுழற்சி முறை',
        type: 'select',
        optionsEn: ['Every season', 'Occasionally', 'Never', 'Not applicable'],
        optionsTa: ['ஒவ்வொரு பருவத்திலும்', 'எப்போதாவது', 'ஒருபோதும் இல்லை', 'பொருந்தாது']
      },
      {
        id: 's1_q16',
        num: 16,
        labelEn: 'Soil cover',
        labelTa: 'மண் மூடாக்கு அமைப்பு',
        type: 'select',
        optionsEn: ['Live cover', 'Mulch', 'Crop residue', 'Bare soil', 'Mixed'],
        optionsTa: ['உயிருள்ள மூடாக்கு', 'இலைதழை மூடாக்கு', 'பயிர் கழிவு', 'வெற்று மண்', 'கலப்பு']
      },
      {
        id: 's1_q17',
        num: 17,
        labelEn: 'Vermicompost',
        labelTa: 'மண்புழு உரம் பயன்பாடு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Interested'],
        optionsTa: ['ஆம்', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's1_q18',
        num: 18,
        labelEn: 'Farm residue management',
        labelTa: 'பண்ணை கழிவுகள் மேலாண்மை',
        type: 'select',
        optionsEn: ['Fully reused', 'Partially reused', 'Burned', 'Disposed', 'Unknown'],
        optionsTa: ['முழுமையாக மறுபயன்பாடு', 'பகுதி மறுபயன்பாடு', 'எரிக்கப்படுகிறது', 'வெளியேற்றப்படுகிறது', 'தெரியவில்லை']
      },
      {
        id: 's1_q19',
        num: 19,
        labelEn: 'Biofertiliser use',
        labelTa: 'உயிர் உரங்கள் பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Interested'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'ஒருபோதும் இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's1_q20',
        num: 20,
        labelEn: 'Soil organic carbon',
        labelTa: 'மண் கரிம கார்பன் அளவு',
        type: 'text',
        optionsEn: ['Enter laboratory result and unit', 'No test', 'Unknown'],
        optionsTa: ['ஆய்வக முடிவை உள்ளிடவும்', 'பரிசோதிக்கவில்லை', 'தெரியவில்லை']
      },
      {
        id: 's1_q21',
        num: 21,
        labelEn: 'Soil salinity',
        labelTa: 'மண் உவர்தன்மை',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Suspected', 'Unknown'],
        optionsTa: ['ஆம் (உவர்ப்பு உள்ளது)', 'இல்லை', 'சந்தேகிக்கப்படுகிறது', 'தெரியவில்லை']
      },
      {
        id: 's1_q22',
        num: 22,
        labelEn: 'Soil restoration requirement',
        labelTa: 'மண் மறுசீரமைப்பு தேவை',
        type: 'select',
        optionsEn: ['High', 'Medium', 'Low', 'Unknown'],
        optionsTa: ['அதிகம்', 'நடுத்தரம்', 'குறைவு', 'தெரியவில்லை']
      },
      {
        id: 's1_q23',
        num: 23,
        labelEn: 'Organic farming',
        labelTa: 'இயற்கை விவசாயம் செய்தல்',
        type: 'select',
        optionsEn: ['Already practising', 'Interested', 'Maybe', 'No'],
        optionsTa: ['ஏற்கனவே செய்கிறோம்', 'ஆர்வமுள்ளது', 'ஒருவேளை எதிர்காலத்தில்', 'இல்லை']
      },
      {
        id: 's1_q24',
        num: 24,
        labelEn: 'Willingness to improve soil',
        labelTa: 'மண் வளத்தை மேம்படுத்த விருப்பம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested in details', 'Not now'],
        optionsTa: ['ஆம்', 'விவரங்களை அறிய ஆர்வம்', 'தற்போது இல்லை']
      },
      {
        id: 's1_q25',
        num: 25,
        labelEn: 'Soil sample collection',
        labelTa: 'மண் மாதிரி சேகரிப்பு அனுமதி',
        type: 'select',
        optionsEn: ['Yes', 'Later', 'No'],
        optionsTa: ['ஆம் (இப்போது சேகரிக்கலாம்)', 'பின்னர்', 'இல்லை']
      }
    ]
  },
  {
    id: 'sector_02',
    sectorNumber: 2,
    titleEn: 'Sector 02 – Water Management',
    titleTa: 'பிரிவு 02 – நீர் மேலாண்மை',
    descriptionEn: 'Water sources, consumption rates, quality, borewell depths, rainwater harvesting, and wastewater conservation.',
    descriptionTa: 'நீர் ஆதாரங்கள், நுகர்வு, தரம், ஆழ்துளை கிணறு ஆழம், மழைநீர் சேகரிப்பு மற்றும் கழிவுநீர் மறுசுழற்சி.',
    iconName: 'Droplets',
    questions: [
      {
        id: 's2_q1',
        num: 1,
        labelEn: 'Water sources',
        labelTa: 'நீர் ஆதாரங்கள் (பல தெரிவுகள்)',
        type: 'multi',
        optionsEn: ['Borewell', 'Open well', 'Municipal tap', 'Panchayat supply', 'River', 'Canal', 'Pond', 'Lake', 'Rainwater harvesting', 'Tanker', 'Other'],
        optionsTa: ['ஆழ்துளை கிணறு', 'திறந்த கிணறு', 'நகராட்சி குழாய்', 'பஞ்சாயத்து குடிநீர்', 'ஆறு', 'கால்வாய்', 'குளம்', 'ஏரி', 'மழைநீர் சேகரிப்பு', 'லாரி தண்ணீர்', 'மற்றவை']
      },
      {
        id: 's2_q2',
        num: 2,
        labelEn: 'Primary water source',
        labelTa: 'முதன்மை நீர் ஆதாரம்',
        type: 'select',
        optionsEn: ['Borewell', 'Open well', 'Municipal tap', 'Panchayat supply', 'Canal / River', 'Rainwater harvesting', 'Tanker'],
        optionsTa: ['ஆழ்துளை கிணறு', 'திறந்த கிணறு', 'நகராட்சி குழாய்', 'பஞ்சாயத்து குடிநீர்', 'கால்வாய் / ஆறு', 'மழைநீர் சேகரிப்பு', 'லாரி தண்ணீர்']
      },
      {
        id: 's2_q3',
        num: 3,
        labelEn: 'Main water use',
        labelTa: 'முக்கிய நீர் பயன்பாடு',
        type: 'select',
        optionsEn: ['Drinking', 'Domestic', 'Agriculture', 'Livestock', 'Industrial', 'Commercial', 'Multiple'],
        optionsTa: ['குடிநீர்', 'வீட்டு பயன்பாடு', 'விவசாயம்', 'கால்நடைகள்', 'தொழில்துறை', 'வணிகம்', 'பல்வேறு தேவைகள்']
      },
      {
        id: 's2_q4',
        num: 4,
        labelEn: 'Number of water sources',
        labelTa: 'நீர் ஆதாரங்களின் எண்ணிக்கை',
        type: 'select',
        optionsEn: ['1', '2', '3', '4', '5 or more'],
        optionsTa: ['1', '2', '3', '4', '5 அல்லது அதற்கு மேல்']
      },
      {
        id: 's2_q5',
        num: 5,
        labelEn: 'Borewell depth (metres / feet)',
        labelTa: 'ஆழ்துளை கிணற்றின் ஆழம் (அடி / மீட்டர்)',
        type: 'text',
        optionsEn: ['Numeric metres', 'Feet', 'Unknown'],
        optionsTa: ['மீட்டரில்', 'அடியில்', 'தெரியவில்லை'],
        unitEn: 'Enter depth (e.g. 350 Feet)',
        unitTa: 'ஆழத்தை உள்ளிடவும்'
      },
      {
        id: 's2_q6',
        num: 6,
        labelEn: 'Borewell water availability',
        labelTa: 'ஆழ்துளை நீர் இருப்பு நிலை',
        type: 'select',
        optionsEn: ['Abundant', 'Adequate', 'Low', 'Very low', 'Dry', 'Seasonal'],
        optionsTa: ['மிக அபரிமிதம்', 'போதுமானது', 'குறைவு', 'மிக குறைவு', 'வற்றியது', 'பருவகாலம் மட்டும்']
      },
      {
        id: 's2_q7',
        num: 7,
        labelEn: 'Water extraction method',
        labelTa: 'நீர் இறைக்கும் முறை',
        type: 'select',
        optionsEn: ['Electric pump', 'Solar pump', 'Manual', 'Other'],
        optionsTa: ['மின்சார மோட்டார்', 'சூரிய சக்தி பம்ப்', 'கைமுறை / கவலை', 'மற்றவை']
      },
      {
        id: 's2_q8',
        num: 8,
        labelEn: 'Pump capacity',
        labelTa: 'மோட்டார் குதிரைத்திறன் (HP)',
        type: 'select',
        optionsEn: ['Below 1 HP', '1–3 HP', '3–5 HP', 'Above 5 HP', 'Unknown'],
        optionsTa: ['1 HPக்கு கீழ்', '1–3 HP', '3–5 HP', '5 HPக்கு மேல்', 'தெரியவில்லை']
      },
      {
        id: 's2_q9',
        num: 9,
        labelEn: 'Source usage frequency',
        labelTa: 'பயன்பாட்டு கால அளவு',
        type: 'select',
        optionsEn: ['Daily', 'Several times a week', 'Weekly', 'Seasonally', 'Occasionally'],
        optionsTa: ['தினமும்', 'வாரத்தில் சில நாட்கள்', 'வாரந்தோறும்', 'பருவகாலத்தில்', 'எப்போதாவது']
      },
      {
        id: 's2_q10',
        num: 10,
        labelEn: 'Groundwater trend over three years',
        labelTa: 'கடந்த 3 ஆண்டு நிலத்தடி நீர் போக்கு',
        type: 'select',
        optionsEn: ['Increased', 'No change', 'Decreased slightly', 'Decreased significantly', 'Unknown'],
        optionsTa: ['அதிகரித்துள்ளது', 'மாற்றமில்லை', 'சற்று குறைந்துள்ளது', 'கணிசமாகக் குறைந்துள்ளது', 'தெரியவில்லை']
      },
      {
        id: 's2_q11',
        num: 11,
        labelEn: 'Daily water consumption (litres)',
        labelTa: 'தினசரி நீர் நுகர்வு (லிட்டர்)',
        type: 'text',
        optionsEn: ['Numeric litres', 'Unknown'],
        optionsTa: ['லிட்டரில் உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'Litres per day (e.g. 500)',
        unitTa: 'ஒரு நாளைக்கு லிட்டர்'
      },
      {
        id: 's2_q12',
        num: 12,
        labelEn: 'Measurement method',
        labelTa: 'அளவிடும் முறை',
        type: 'select',
        optionsEn: ['Meter', 'Pump-hour estimate', 'Tank estimate', 'Not measured'],
        optionsTa: ['நீர் மீட்டரிங்', 'மோட்டார் ஓடும் நேரம் கணக்கீடு', 'தொட்டி கொள்ளளவு கணக்கீடு', 'அளவிடப்படவில்லை']
      },
      {
        id: 's2_q13',
        num: 13,
        labelEn: 'Last water test',
        labelTa: 'கடைசி நீர் பரிசோதனை',
        type: 'select',
        optionsEn: ['Within 1 year', '1–3 years', 'More than 3 years', 'Never'],
        optionsTa: ['1 வருடத்திற்குள்', '1–3 ஆண்டுகள்', '3 ஆண்டுகளுக்கு மேல்', 'ஒருபோதும் இல்லை']
      },
      {
        id: 's2_q14',
        num: 14,
        labelEn: 'Water quality',
        labelTa: 'தண்ணீர் தரம்',
        type: 'select',
        optionsEn: ['Good', 'Acceptable', 'Poor', 'Salty', 'Hard', 'Unpleasant odour', 'Unknown'],
        optionsTa: ['மிக நன்று', 'ஏற்றுக்கொள்ளத்தக்கது', 'மோசம்', 'உப்புத்தன்மை', 'கடின நீர்', 'துர்நாற்றம்', 'தெரியவில்லை']
      },
      {
        id: 's2_q15',
        num: 15,
        labelEn: 'Drinking water treatment',
        labelTa: 'குடிநீர் சுத்திகரிப்பு முறை',
        type: 'select',
        optionsEn: ['Filtered', 'Boiled', 'Other treatment', 'Untreated', 'Not used for drinking'],
        optionsTa: ['வடிகட்டி (RO/UV)', 'காய்ச்சிய நீர்', 'பிற சுத்திகரிப்பு', 'சுத்திகரிக்கப்படாதது', 'குடிநீருக்கு பயன்படுவதில்லை']
      },
      {
        id: 's2_q16',
        num: 16,
        labelEn: 'Contamination signs',
        labelTa: 'மாசுபாட்டின் அறிகுறிகள்',
        type: 'select',
        optionsEn: ['None observed', 'Colour', 'Odour', 'Turbidity', 'Other', 'Unknown'],
        optionsTa: ['எதுவுமில்லை', 'நிற மாற்றம்', 'துர்நாற்றம்', 'கலங்கல் தன்மை', 'பிற', 'தெரியவில்லை']
      },
      {
        id: 's2_q17',
        num: 17,
        labelEn: 'Rainwater harvesting',
        labelTa: 'மழைநீர் சேகரிப்பு கட்டமைப்பு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Under construction', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'கட்டுமானத்தில் உள்ளது', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's2_q18',
        num: 18,
        labelEn: 'Groundwater recharge',
        labelTa: 'நிலத்தடி நீர் செறிவூட்டும் அமைப்பு',
        type: 'select',
        optionsEn: ['Recharge pit', 'Recharge well', 'Percolation pond', 'Other', 'No'],
        optionsTa: ['செறிவூட்டும் குழி', 'செறிவூட்டும் கிணறு', 'கசிவு நீர் குட்டை', 'பிற', 'இல்லை']
      },
      {
        id: 's2_q19',
        num: 19,
        labelEn: 'Water leakage',
        labelTa: 'நீர் கசிவு இழப்புகள்',
        type: 'select',
        optionsEn: ['None', 'Minor', 'Moderate', 'Severe', 'Unknown'],
        optionsTa: ['இல்லை', 'சிறிய கசிவு', 'மிதமானது', 'அதிக இழப்பு', 'தெரியவில்லை']
      },
      {
        id: 's2_q20',
        num: 20,
        labelEn: 'Irrigation method',
        labelTa: 'பாசன முறை',
        type: 'select',
        optionsEn: ['Drip', 'Sprinkler', 'Both', 'Flood irrigation', 'Not applicable'],
        optionsTa: ['சொட்டு நீர் பாசனம்', 'தெளிப்பு நீர்', 'இரண்டும்', 'வாய்க்கால் பாய்ச்சல் முறை', 'பொருந்தாது']
      },
      {
        id: 's2_q21',
        num: 21,
        labelEn: 'Wastewater reuse',
        labelTa: 'கழிவுநீர் மறுபயன்பாடு',
        type: 'select',
        optionsEn: ['Garden', 'Agriculture', 'Cleaning', 'Industrial process', 'Not reused', 'Not applicable'],
        optionsTa: ['தோட்டத்திற்கு', 'விவசாயத்திற்கு', 'கழுவுவதற்கு', 'தொழிற்சாலை பயன்பாடு', 'மறுபயன்பாடு இல்லை', 'பொருந்தாது']
      },
      {
        id: 's2_q22',
        num: 22,
        labelEn: 'Wastewater management',
        labelTa: 'கழிவுநீர் வெளியேற்றம்',
        type: 'select',
        optionsEn: ['Septic tank', 'Sewage connection', 'Treatment plant', 'Open discharge', 'Other', 'Not applicable'],
        optionsTa: ['செப்டிக் டேங்க்', 'பாதாள சாக்கடை இணைப்பு', 'சுத்திகரிப்பு நிலையம்', 'திறந்தவெளி வெளியேற்றம்', 'பிற', 'பொருந்தாது']
      },
      {
        id: 's2_q23',
        num: 23,
        labelEn: 'Water scarcity',
        labelTa: 'தண்ணீர் பற்றாக்குறை நிலை',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Seasonally', 'Frequently', 'Always'],
        optionsTa: ['ஒருபோதும் இல்லை', 'எப்போதாவது', 'கோடைகாலத்தில் மட்டும்', 'அடிக்கடி', 'எப்போதும் பற்றாக்குறை']
      },
      {
        id: 's2_q24',
        num: 24,
        labelEn: 'Priority improvement',
        labelTa: 'முன்னுரிமை தேவைப்படும் சீரமைப்பு',
        type: 'select',
        optionsEn: ['Rainwater harvesting', 'Groundwater recharge', 'Water testing', 'Leak prevention', 'Efficient irrigation', 'Wastewater reuse', 'Conservation', 'None'],
        optionsTa: ['மழைநீர் சேகரிப்பு', 'நிலத்தடி நீர் செறிவூட்டல்', 'நீர் பரிசோதனை', 'கசிவு தடுப்பு', 'நுண் பாசனம்', 'மறுசுழற்சி', 'சேமிப்பு', 'எதுவுமில்லை']
      },
      {
        id: 's2_q25',
        num: 25,
        labelEn: 'Participation in conservation',
        labelTa: 'நீர் சேமிப்பு இயக்கங்களில் பங்களிப்பு',
        type: 'select',
        optionsEn: ['Already practising', 'Yes', 'Interested', 'Not now'],
        optionsTa: ['ஏற்கனவே செய்கிறோம்', 'ஆம்', 'ஆர்வமுள்ளது', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_03',
    sectorNumber: 3,
    titleEn: 'Sector 03 – Energy Management',
    titleTa: 'பிரிவு 03 – ஆற்றல் & மின் மேலாண்மை',
    descriptionEn: 'Grid power, consumption tariffs, solar adoption, backup generators, energy efficiency, and cooking fuels.',
    descriptionTa: 'மின் கட்டமைப்பு, மின் நுகர்வு, சூரிய சக்தி, ஜெனரேட்டர், ஆற்றல் திறன் கொண்ட உபகரணங்கள் மற்றும் சமையல் எரிபொருள்.',
    iconName: 'Zap',
    questions: [
      {
        id: 's3_q1',
        num: 1,
        labelEn: 'Main energy source',
        labelTa: 'முதன்மை ஆற்றல் மூலம்',
        type: 'select',
        optionsEn: ['Grid electricity', 'Solar', 'Diesel generator', 'Biomass', 'LPG', 'Other'],
        optionsTa: ['மின்வாரிய மின்சாரம்', 'சூரிய சக்தி (சோலார்)', 'டீசல் ஜெனரேட்டர்', 'உயிரி எரிபொருள்', 'எரிவாயு (LPG)', 'மற்றவை']
      },
      {
        id: 's3_q2',
        num: 2,
        labelEn: 'Electricity availability',
        labelTa: 'மின்சார கிடைக்கும் நேரம்',
        type: 'select',
        optionsEn: ['24 hours', '12–23 hours', 'Below 12 hours', 'Irregular', 'No connection'],
        optionsTa: ['24 மணி நேரமும்', '12–23 மணி நேரம்', '12 மணி நேரத்திற்கு கீழ்', 'சீரற்ற மின்சாரம்', 'மின் இணைப்பு இல்லை']
      },
      {
        id: 's3_q3',
        num: 3,
        labelEn: 'Electricity connection',
        labelTa: 'மின் இணைப்பு வகை',
        type: 'select',
        optionsEn: ['Domestic', 'Commercial', 'Industrial', 'Agricultural', 'Other'],
        optionsTa: ['வீட்டு இணைப்பு', 'வணிக இணைப்பு', 'தொழில்துறை', 'விவசாய இலவச/மானிய இணைப்பு', 'பிற']
      },
      {
        id: 's3_q4',
        num: 4,
        labelEn: 'Sanctioned load (kW)',
        labelTa: 'ஒப்புதல் அளிக்கப்பட்ட மின் சுமை (kW)',
        type: 'text',
        optionsEn: ['Numeric kW', 'Unknown'],
        optionsTa: ['kW-ல் உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'kW (e.g. 5)'
      },
      {
        id: 's3_q5',
        num: 5,
        labelEn: 'Monthly electricity consumption (kWh)',
        labelTa: 'மாதாந்திர மின் நுகர்வு (யூனிட்கள்)',
        type: 'text',
        optionsEn: ['Numeric kWh', 'Unknown'],
        optionsTa: ['யூனிட்களில் (kWh)', 'தெரியவில்லை'],
        unitEn: 'Units/kWh (e.g. 240)'
      },
      {
        id: 's3_q6',
        num: 6,
        labelEn: 'Monthly electricity bill (INR)',
        labelTa: 'மாதாந்திர மின்கட்டணம் (ரூபாய்)',
        type: 'text',
        optionsEn: ['Numeric INR', 'Unknown'],
        optionsTa: ['ரூபாயில் உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'INR (e.g. 1500)'
      },
      {
        id: 's3_q7',
        num: 7,
        labelEn: 'Electricity bill available',
        labelTa: 'மின்கட்டண ரசீது உள்ளதா?',
        type: 'select',
        optionsEn: ['Yes', 'No'],
        optionsTa: ['ஆம்', 'இல்லை']
      },
      {
        id: 's3_q8',
        num: 8,
        labelEn: 'Rooftop solar',
        labelTa: 'கூரை சோலார் மின் உற்பத்தி',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிட்டுள்ளோம்']
      },
      {
        id: 's3_q9',
        num: 9,
        labelEn: 'Solar capacity (kW)',
        labelTa: 'சோலார் திறன் (kW)',
        type: 'text',
        optionsEn: ['Numeric kW', 'Unknown', 'Not applicable'],
        optionsTa: ['kW-ல்', 'தெரியவில்லை', 'பொருந்தாது'],
        unitEn: 'kW (e.g. 3)'
      },
      {
        id: 's3_q10',
        num: 10,
        labelEn: 'Solar generation monitored',
        labelTa: 'சோலார் உற்பத்தி கண்காணிக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Daily', 'Monthly', 'Occasionally', 'Not monitored'],
        optionsTa: ['தினமும்', 'மாதந்தோறும்', 'எப்போதாவது', 'கண்காணிப்பில்லை']
      },
      {
        id: 's3_q11',
        num: 11,
        labelEn: 'Battery storage',
        labelTa: 'பேட்டரி சேமிப்பு அமைப்பு (Inverter/BESS)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's3_q12',
        num: 12,
        labelEn: 'Battery capacity (kWh)',
        labelTa: 'பேட்டரி திறன் (kWh)',
        type: 'text',
        optionsEn: ['Numeric kWh', 'Unknown', 'Not applicable'],
        optionsTa: ['kWh-ல்', 'தெரியவில்லை', 'பொருந்தாது']
      },
      {
        id: 's3_q13',
        num: 13,
        labelEn: 'Diesel generator usage',
        labelTa: 'டீசல் ஜெனரேட்டர் பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Emergency only', 'Never'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'அவசரத்திற்கு மட்டும்', 'பயன்படுத்துவதில்லை']
      },
      {
        id: 's3_q14',
        num: 14,
        labelEn: 'Generator capacity (kVA)',
        labelTa: 'ஜெனரேட்டர் திறன் (kVA)',
        type: 'text',
        optionsEn: ['Numeric kVA', 'Unknown', 'Not applicable'],
        optionsTa: ['kVA-ல்', 'தெரியவில்லை', 'பொருந்தாது']
      },
      {
        id: 's3_q15',
        num: 15,
        labelEn: 'Lighting type',
        labelTa: 'விளக்குகள் வகை',
        type: 'select',
        optionsEn: ['LED', 'CFL', 'Tube light', 'Incandescent', 'Mixed'],
        optionsTa: ['எல்இடி (LED)', 'CFL', 'டியூப் லைட்', 'பழைய குண்டு பல்பு', 'கலப்பு']
      },
      {
        id: 's3_q16',
        num: 16,
        labelEn: 'Energy-efficient appliances',
        labelTa: 'மின் சேமிப்பு உபகரணங்கள் (5-Star BEE)',
        type: 'select',
        optionsEn: ['All', 'Most', 'Some', 'None'],
        optionsTa: ['அனைத்தும்', 'பெரும்பாலானவை', 'சில மட்டும்', 'எதுவுமில்லை']
      },
      {
        id: 's3_q17',
        num: 17,
        labelEn: 'Efficient motors or pumps',
        labelTa: 'மின் சேமிப்பு மோட்டார் / பம்புகள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially', 'Not applicable'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதி அளவு', 'பொருந்தாது']
      },
      {
        id: 's3_q18',
        num: 18,
        labelEn: 'Motor maintenance',
        labelTa: 'மோட்டார் பராமரிப்பு வழக்கம்',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Not applicable'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'செய்வதில்லை', 'பொருந்தாது']
      },
      {
        id: 's3_q19',
        num: 19,
        labelEn: 'Cooking fuel',
        labelTa: 'சமையல் எரிபொருள்',
        type: 'select',
        optionsEn: ['LPG', 'Electricity', 'Firewood', 'Biomass', 'Biogas', 'Solar', 'Other'],
        optionsTa: ['எல்.பி.ஜி (கேஸ்)', 'மின்சாரம் / இண்டக்ஷன்', 'விறகு', 'பயிர் கழிவு', 'சாண எரிவாயு (Biogas)', 'சோலார்', 'மற்றவை']
      },
      {
        id: 's3_q20',
        num: 20,
        labelEn: 'Clean cooking adoption',
        labelTa: 'தூய சமையல் முறை',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's3_q21',
        num: 21,
        labelEn: 'Energy monitoring',
        labelTa: 'மின் பயன்பாட்டு கண்காணிப்பு',
        type: 'select',
        optionsEn: ['Smart meter', 'Manual meter', 'Electricity bill only', 'Not monitored'],
        optionsTa: ['ஸ்மார்ட் மீட்டர்', 'வழக்கமான மீட்டர்', 'மின்கட்டண ரசீது மட்டும்', 'கண்காணிப்பில்லை']
      },
      {
        id: 's3_q22',
        num: 22,
        labelEn: 'Energy wastage',
        labelTa: 'மின் விரயம் அளவு',
        type: 'select',
        optionsEn: ['None', 'Low', 'Moderate', 'High', 'Unknown'],
        optionsTa: ['இல்லை', 'குறைவு', 'மிதமானது', 'அதிகம்', 'தெரியவில்லை']
      },
      {
        id: 's3_q23',
        num: 23,
        labelEn: 'Energy audit',
        labelTa: 'மின் தணிக்கை (Energy Audit)',
        type: 'select',
        optionsEn: ['Within 1 year', '1–3 years', 'More than 3 years', 'Never'],
        optionsTa: ['1 வருடத்திற்குள்', '1–3 ஆண்டுகள்', '3 ஆண்டுகளுக்கு மேல்', 'ஒருபோதும் இல்லை']
      },
      {
        id: 's3_q24',
        num: 24,
        labelEn: 'Priority improvement',
        labelTa: 'முன்னுரிமை ஆற்றல் தேவை',
        type: 'select',
        optionsEn: ['Solar', 'Battery', 'LED', 'Efficient motors', 'Clean cooking', 'Energy audit', 'Other'],
        optionsTa: ['சோலார் பொருத்துதல்', 'பேட்டரி சேமிப்பு', 'எல்இடி விளக்குகள்', 'திறன்மிகு மோட்டார்', 'தூய சமையல் முறை', 'மின் தணிக்கை', 'பிற']
      },
      {
        id: 's3_q25',
        num: 25,
        labelEn: 'Participation in clean energy',
        labelTa: 'பசுமை ஆற்றல் முன்னெடுப்பில் ஆர்வம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already practising', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செயல்படுத்தப்படுகிறது', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_04',
    sectorNumber: 4,
    titleEn: 'Sector 04 – EV & Clean Mobility',
    titleTa: 'பிரிவு 04 – மின்வாகனம் மற்றும் தூய போக்குவரத்து',
    descriptionEn: 'Vehicle ownership, EV transition, public transit access, charging infrastructure, cycling, and transport fuels.',
    descriptionTa: 'வாகன எண்ணிக்கை, மின்வாகன மாற்றம், பொதுப்போக்குவரத்து அணுகல், சார்ஜிங் வசதி, சைக்கிள் மற்றும் எரிபொருள் செலவுகள்.',
    iconName: 'Bike',
    questions: [
      {
        id: 's4_q1',
        num: 1,
        labelEn: 'Vehicles used',
        labelTa: 'பயன்படுத்தும் வாகனங்கள் (பல தெரிவுகள்)',
        type: 'multi',
        optionsEn: ['Bicycle', 'Two-wheeler', 'Car', 'Auto', 'E-rickshaw', 'Tractor', 'Goods vehicle', 'Bus', 'Other'],
        optionsTa: ['சைக்கிள்', 'இருசக்கர வாகனம்', 'கார்', 'ஆட்டோ', 'மின்-ரிக்ஷா', 'டிராக்டர்', 'சரக்கு வாகனம்', 'பேருந்து', 'பிற']
      },
      {
        id: 's4_q2',
        num: 2,
        labelEn: 'Number of vehicles',
        labelTa: 'வாகனங்களின் மொத்த எண்ணிக்கை',
        type: 'text',
        optionsEn: ['0', '1', '2', '3', '4+'],
        optionsTa: ['0', '1', '2', '3', '4+'],
        unitEn: 'Number of vehicles'
      },
      {
        id: 's4_q3',
        num: 3,
        labelEn: 'Vehicle energy / fuel',
        labelTa: 'வாகன எரிபொருள் வகை',
        type: 'select',
        optionsEn: ['Electric', 'Petrol', 'Diesel', 'CNG', 'LPG', 'Hybrid', 'Human-powered', 'Other'],
        optionsTa: ['மின்சாரம் (EV)', 'பெட்ரோல்', 'டீசல்', 'சி.என்.ஜி (CNG)', 'எல்.பி.ஜி', 'ஹைப்ரிட்', 'மனித சக்தி (சைக்கிள்)', 'பிற']
      },
      {
        id: 's4_q4',
        num: 4,
        labelEn: 'Number of EVs',
        labelTa: 'உள்ள மின்வாகனங்கள் (EV) எண்ணிக்கை',
        type: 'select',
        optionsEn: ['None', '1', '2', '3 or more'],
        optionsTa: ['எதுவுமில்லை', '1', '2', '3 அல்லது அதற்கு மேல்']
      },
      {
        id: 's4_q5',
        num: 5,
        labelEn: 'Daily travel distance',
        labelTa: 'தினசரி பயண தூரம்',
        type: 'select',
        optionsEn: ['Below 5 km', '5–10 km', '11–25 km', '26–50 km', 'Above 50 km'],
        optionsTa: ['5 கி.மீக்கு கீழ்', '5–10 கி.மீ', '11–25 கி.மீ', '26–50 கி.மீ', '50 கி.மீக்கு மேல்']
      },
      {
        id: 's4_q6',
        num: 6,
        labelEn: 'Main travel purpose',
        labelTa: 'முக்கிய பயண நோக்கம்',
        type: 'select',
        optionsEn: ['Work', 'Education', 'Agriculture', 'Business', 'Domestic', 'Goods transport', 'Other'],
        optionsTa: ['வேலை / உத்தியோகம்', 'கல்வி', 'விவசாயப் பணிகள்', 'வியாபாரம்', 'குடும்பத் தேவைகள்', 'சரக்கு போக்குவரத்து', 'பிற']
      },
      {
        id: 's4_q7',
        num: 7,
        labelEn: 'Public transport access',
        labelTa: 'பொதுப்போக்குவரத்து அணுகல் தூரம்',
        type: 'select',
        optionsEn: ['Within 500 m', 'Within 1 km', 'More than 1 km', 'Not available'],
        optionsTa: ['500 மீட்டருக்குள்', '1 கி.மீக்குள்', '1 கி.மீக்கு மேல்', 'வசதி இல்லை']
      },
      {
        id: 's4_q8',
        num: 8,
        labelEn: 'Cycling habit',
        labelTa: 'சைக்கிள் ஓட்டும் பழக்கம்',
        type: 'select',
        optionsEn: ['Daily', 'Occasionally', 'Never'],
        optionsTa: ['தினமும்', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's4_q9',
        num: 9,
        labelEn: 'Walking for short distances',
        labelTa: 'குறுகிய தூரத்திற்கு நடைபயிற்சி',
        type: 'select',
        optionsEn: ['Always', 'Often', 'Sometimes', 'Never'],
        optionsTa: ['எப்போதும் நடப்போம்', 'அடிக்கடி', 'சில நேரங்களில்', 'நடப்பதில்லை']
      },
      {
        id: 's4_q10',
        num: 10,
        labelEn: 'Carpooling or sharing',
        labelTa: 'வாகன பகிர்வு முறை (Carpooling)',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['தொடர்ந்து', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's4_q11',
        num: 11,
        labelEn: 'Charging access',
        labelTa: 'மின்வாகன சார்ஜிங் வசதி',
        type: 'select',
        optionsEn: ['Home', 'Workplace', 'Public', 'None'],
        optionsTa: ['வீட்டில்', 'பணியிடத்தில்', 'பொது சார்ஜிங் நிலையம்', 'வசதி இல்லை']
      },
      {
        id: 's4_q12',
        num: 12,
        labelEn: 'Charging reliability',
        labelTa: 'சார்ஜிங் வசதி நம்பகத்தன்மை',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially', 'Not applicable'],
        optionsTa: ['நம்பகமானது', 'இல்லை', 'பகுதியளவு', 'பொருந்தாது']
      },
      {
        id: 's4_q13',
        num: 13,
        labelEn: 'Future EV purchase',
        labelTa: 'எதிர்காலத்தில் மின்வாகனம் வாங்கும் திட்டம்',
        type: 'select',
        optionsEn: ['Within 1 year', '1–3 years', 'Later', 'No'],
        optionsTa: ['1 ஆண்டிற்குள்', '1–3 ஆண்டுகளில்', 'பின்னர்', 'இல்லை']
      },
      {
        id: 's4_q14',
        num: 14,
        labelEn: 'Electric farm equipment',
        labelTa: 'மின்சார பண்ணை உபகரணங்கள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned', 'Not applicable'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்', 'பொருந்தாது']
      },
      {
        id: 's4_q15',
        num: 15,
        labelEn: 'Electric commercial vehicles',
        labelTa: 'மின்சார வர்த்தக வாகனங்கள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned', 'Not applicable'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்', 'பொருந்தாது']
      },
      {
        id: 's4_q16',
        num: 16,
        labelEn: 'Monthly fuel expense (INR)',
        labelTa: 'மாதாந்திர எரிபொருள் செலவு (ரூபாய்)',
        type: 'text',
        optionsEn: ['Numeric INR', 'Unknown'],
        optionsTa: ['ரூபாயில் உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'INR / Month (e.g. 2500)'
      },
      {
        id: 's4_q17',
        num: 17,
        labelEn: 'Monthly EV charging expense (INR)',
        labelTa: 'மாதாந்திர EV சார்ஜிங் செலவு (ரூபாய்)',
        type: 'text',
        optionsEn: ['Numeric INR', 'Unknown', 'Not applicable'],
        optionsTa: ['ரூபாயில் உள்ளிடவும்', 'தெரியவில்லை', 'பொருந்தாது'],
        unitEn: 'INR / Month'
      },
      {
        id: 's4_q18',
        num: 18,
        labelEn: 'Vehicle maintenance',
        labelTa: 'வாகன பராமரிப்பு ஒழுங்குமுறை',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['முறையாக / சரியான இடைவெளியில்', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's4_q19',
        num: 19,
        labelEn: 'Vehicle pollution concern',
        labelTa: 'வாகன புகை மாசடைவு குறித்த அக்கறை',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'Unknown'],
        optionsTa: ['மிக அதிகம்', 'மிதமானது', 'குறைவு', 'தெரியவில்லை']
      },
      {
        id: 's4_q20',
        num: 20,
        labelEn: 'Property suitability for charging',
        labelTa: 'சார்ஜிங் வசதி அமைக்க இடவசதி',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Requires upgrade', 'Unknown'],
        optionsTa: ['ஏற்ற இடம் உள்ளது', 'இடமில்லை', 'மின் திறன் உயர்த்தப்பட வேண்டும்', 'தெரியவில்லை']
      },
      {
        id: 's4_q21',
        num: 21,
        labelEn: 'Renewable electricity for charging',
        labelTa: 'சூரிய சக்தி மூலம் சார்ஜ் செய்ய ஆர்வம்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned', 'Unknown'],
        optionsTa: ['ஆம்', 'இல்லை', 'திட்டமிடுகிறோம்', 'தெரியவில்லை']
      },
      {
        id: 's4_q22',
        num: 22,
        labelEn: 'Shared mobility options',
        labelTa: 'பொது வாகன பகிர்வு வாய்ப்புகள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Limited'],
        optionsTa: ['உள்ளது', 'இல்லை', 'குறைவாக உள்ளது']
      },
      {
        id: 's4_q23',
        num: 23,
        labelEn: 'Walking and cycling infrastructure',
        labelTa: 'நடைபாதை மற்றும் சைக்கிள் வசதி தரம்',
        type: 'select',
        optionsEn: ['Good', 'Partial', 'Poor', 'None'],
        optionsTa: ['நன்று', 'பகுதி அளவு', 'மோசம்', 'வசதி இல்லை']
      },
      {
        id: 's4_q24',
        num: 24,
        labelEn: 'Priority improvement',
        labelTa: 'முன்னுரிமை போக்குவரத்து தேவை',
        type: 'select',
        optionsEn: ['EV', 'Charging station', 'Cycling', 'Public transport', 'Carpool', 'Electric farm equipment', 'Other'],
        optionsTa: ['மின்வாகனம் வாங்குதல்', 'சார்ஜிங் மையம்', 'சைக்கிள் பயன்பாடு', 'பேருந்து வசதி', 'வாகன பகிர்வு', 'மின் பண்ணை உபகரணங்கள்', 'பிற']
      },
      {
        id: 's4_q25',
        num: 25,
        labelEn: 'Participation in clean mobility',
        labelTa: 'தூய போக்குவரத்து முன்னெடுப்பில் ஆர்வம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already practising', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செயல்படுத்தப்படுகிறது', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_05',
    sectorNumber: 5,
    titleEn: 'Sector 05 – Waste Management',
    titleTa: 'பிரிவு 05 – கழிவு மேலாண்மை',
    descriptionEn: 'Waste segregation, wet/dry volumes, plastic elimination, recycling habits, collection frequency, and zero-burning compliance.',
    descriptionTa: 'கழிவு தரம் பிரித்தல், உலர்/ஈர கழிவு அளவு, பிளாஸ்டிக் மறுசுழற்சி, குப்பை சேகரிப்பு மற்றும் எரிப்பு தவிர்த்தல்.',
    iconName: 'Trash2',
    questions: [
      {
        id: 's5_q1',
        num: 1,
        labelEn: 'Waste types generated',
        labelTa: 'உருவாகும் கழிவு வகைகள் (பல தெரிவுகள்)',
        type: 'multi',
        optionsEn: ['Wet', 'Plastic', 'Paper', 'Metal', 'Glass', 'E-waste', 'Hazardous', 'Biomedical', 'Construction', 'Other'],
        optionsTa: ['ஈர கழிவு', 'பிளாஸ்டிக்', 'காகிதம்', 'உலோகம்', 'கண்ணாடி', 'மின்னணு கழிவு (E-waste)', 'அபாயகர கழிவு', 'மருத்துவ கழிவு', 'கட்டுமான கழிவு', 'பிற']
      },
      {
        id: 's5_q2',
        num: 2,
        labelEn: 'Waste segregation at source',
        labelTa: 'மூலத்திலேயே தரம் பிரிக்கும் வழக்கம்',
        type: 'select',
        optionsEn: ['Always', 'Sometimes', 'Never'],
        optionsTa: ['எப்போதும் பிரிக்கிறோம்', 'சில நேரங்களில்', 'பிரிப்பதில்லை']
      },
      {
        id: 's5_q3',
        num: 3,
        labelEn: 'Number of segregated categories',
        labelTa: 'பிரிக்கப்படும் பிரிவுகளின் எண்ணிக்கை',
        type: 'select',
        optionsEn: ['2', '3', '4', '5 or more', 'None'],
        optionsTa: ['2 (ஈர/உலர்)', '3', '4', '5 அல்லது அதற்கு மேல்', 'பிரிப்பதில்லை']
      },
      {
        id: 's5_q4',
        num: 4,
        labelEn: 'Daily wet waste (kg)',
        labelTa: 'தினசரி ஈரக்கழிவு அளவு (கிலோ)',
        type: 'text',
        optionsEn: ['Numeric kg', 'Unknown'],
        optionsTa: ['கிலோவில் உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'kg / day'
      },
      {
        id: 's5_q5',
        num: 5,
        labelEn: 'Daily dry waste (kg)',
        labelTa: 'தினசரி உலர் கழிவு அளவு (கிலோ)',
        type: 'text',
        optionsEn: ['Numeric kg', 'Unknown'],
        optionsTa: ['கிலோவில் உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'kg / day'
      },
      {
        id: 's5_q6',
        num: 6,
        labelEn: 'Plastic waste generation',
        labelTa: 'பிளாஸ்டிக் கழிவு அளவு',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'None'],
        optionsTa: ['அதிகம்', 'மிதமானது', 'குறைவு', 'இல்லை (பிளாஸ்டிக் தவிர்த்தல்)']
      },
      {
        id: 's5_q7',
        num: 7,
        labelEn: 'Paper recycling',
        labelTa: 'காகித மறுசுழற்சி வழக்கம்',
        type: 'select',
        optionsEn: ['Always', 'Sometimes', 'Never', 'Not applicable'],
        optionsTa: ['எப்போதும்', 'சில நேரங்களில்', 'செய்வதில்லை', 'பொருந்தாது']
      },
      {
        id: 's5_q8',
        num: 8,
        labelEn: 'Metal and glass separated',
        labelTa: 'உலோகம் மற்றும் கண்ணாடி தனியாக பிரித்தல்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's5_q9',
        num: 9,
        labelEn: 'E-waste stored separately',
        labelTa: 'மின்-கழிவு தனித்து சேமிக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Not applicable'],
        optionsTa: ['ஆம்', 'இல்லை', 'பொருந்தாது']
      },
      {
        id: 's5_q10',
        num: 10,
        labelEn: 'Hazardous waste generated',
        labelTa: 'அபாயகரமான கழிவுகள் உருவாகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Unknown'],
        optionsTa: ['ஆம்', 'இல்லை', 'தெரியவில்லை']
      },
      {
        id: 's5_q11',
        num: 11,
        labelEn: 'Biomedical waste generated',
        labelTa: 'மருத்துவ கழிவுகள் உருவாகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Not applicable'],
        optionsTa: ['ஆம்', 'இல்லை', 'பொருந்தாது']
      },
      {
        id: 's5_q12',
        num: 12,
        labelEn: 'Collection frequency',
        labelTa: 'கழிவு சேகரிப்பு இடைவெளி',
        type: 'select',
        optionsEn: ['Daily', 'Weekly', 'Occasionally', 'Never'],
        optionsTa: ['தினமும்', 'வாரந்தோறும்', 'எப்போதாவது', 'சேகரிப்பு இல்லை']
      },
      {
        id: 's5_q13',
        num: 13,
        labelEn: 'Waste collector',
        labelTa: 'கழிவு சேகரிப்பவர் யார்?',
        type: 'select',
        optionsEn: ['Local body', 'Private collector', 'Recycler', 'Self-managed', 'Other'],
        optionsTa: ['பஞ்சாயத்து / நகராட்சி தூய்மை பணியாளர்கள்', 'தனியார் சேகரிப்பாளர்', 'பழைய பொருள் வியாபாரி', 'சுய மேலாண்மை', 'பிற']
      },
      {
        id: 's5_q14',
        num: 14,
        labelEn: 'Waste collection fee',
        labelTa: 'கழிவு சேகரிப்பு கட்டணம்',
        type: 'select',
        optionsEn: ['Monthly', 'Annually', 'No', 'Unknown'],
        optionsTa: ['மாதாந்திர கட்டணம்', 'ஆண்டு கட்டணம்', 'கட்டணமில்லை', 'தெரியவில்லை']
      },
      {
        id: 's5_q15',
        num: 15,
        labelEn: 'Wet waste composted',
        labelTa: 'ஈரக்கழிவு உரமாக மாற்றப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially', 'Planned'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's5_q16',
        num: 16,
        labelEn: 'Dry waste recycled',
        labelTa: 'உலர் கழிவு மறுசுழற்சிக்கு அனுப்பப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['தொடர்ந்து', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's5_q17',
        num: 17,
        labelEn: 'Plastic recycled',
        labelTa: 'பிளாஸ்டிக் மறுசுழற்சி வழக்கம்',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['தொடர்ந்து', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's5_q18',
        num: 18,
        labelEn: 'Open waste burning',
        labelTa: 'குப்பையை திறந்தவெளியில் எரிக்கும் பழக்கம்',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Unknown'],
        optionsTa: ['ஒருபோதும் இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'தெரியவில்லை']
      },
      {
        id: 's5_q19',
        num: 19,
        labelEn: 'Open dumping',
        labelTa: 'திறந்தவெளியில் குப்பை கொட்டுதல்',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Unknown'],
        optionsTa: ['ஒருபோதும் இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'தெரியவில்லை']
      },
      {
        id: 's5_q20',
        num: 20,
        labelEn: 'Wastewater or sludge generated',
        labelTa: 'கழிவுநீர் சேறு உருவாகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Unknown'],
        optionsTa: ['ஆம்', 'இல்லை', 'தெரியவில்லை']
      },
      {
        id: 's5_q21',
        num: 21,
        labelEn: 'Waste measurement',
        labelTa: 'கழிவு அளவிடும் முறை',
        type: 'select',
        optionsEn: ['Weighed', 'Estimated', 'Not measured'],
        optionsTa: ['எடை போடப்படுகிறது', 'தோராய மதிப்பீடு', 'அளவிடப்படுவதில்லை']
      },
      {
        id: 's5_q22',
        num: 22,
        labelEn: 'Waste storage area',
        labelTa: 'கழிவு சேமிப்பு தனியிடம் உள்ளதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partial'],
        optionsTa: ['உள்ளது', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's5_q23',
        num: 23,
        labelEn: 'Main waste problem',
        labelTa: 'முக்கிய கழிவு பிரச்சனை',
        type: 'select',
        optionsEn: ['Segregation', 'Collection', 'Storage', 'Recycling', 'Disposal', 'Awareness', 'None'],
        optionsTa: ['தரம் பிரிப்பது', 'சேகரிப்பு குறைபாடு', 'சேமிப்பிடம் இன்மை', 'மறுசுழற்சி வசதியின்மை', 'முறையற்ற வெளியேற்றம்', 'விழிப்புணர்வின்மை', 'எதுவுமில்லை']
      },
      {
        id: 's5_q24',
        num: 24,
        labelEn: 'Priority improvement',
        labelTa: 'முன்னுரிமை கழிவு மேலாண்மை சீரமைப்பு',
        type: 'select',
        optionsEn: ['Segregation', 'Composting', 'Recycling', 'Collection', 'Waste audit', 'Authorised disposal', 'Other'],
        optionsTa: ['தரம் பிரித்தல் பழக்கம்', 'உரமாக்குதல்', 'மறுசுழற்சி', 'முறையான சேகரிப்பு', 'கழிவு தணிக்கை', 'பாதுகாப்பான வெளியேற்றம்', 'பிற']
      },
      {
        id: 's5_q25',
        num: 25,
        labelEn: 'Participation in waste initiatives',
        labelTa: 'கழிவு இல்லா சமுதாய முன்னெடுப்பில் ஆர்வம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already practising', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செய்கிறோம்', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_06',
    sectorNumber: 6,
    titleEn: 'Sector 06 – Organic Transformation',
    titleTa: 'பிரிவு 06 – இயற்கை விவசாயம் மற்றும் கரிம மாற்றம்',
    descriptionEn: 'Kitchen composting, vermicompost units, bio-inputs, biogas, natural pest management, and organic certification.',
    descriptionTa: 'கரிம கழிவு உரமாக்கல், மண்புழு உரம், பயோ-கேஸ், இயற்கை பூச்சி விரட்டிகள், மூலிகை தோட்டம் மற்றும் இயற்கை சான்றிதழ்.',
    iconName: 'Sprout',
    questions: [
      {
        id: 's6_q1',
        num: 1,
        labelEn: 'Organic waste source',
        labelTa: 'கரிம கழிவு மூலங்கள் (பல தெரிவுகள்)',
        type: 'multi',
        optionsEn: ['Kitchen', 'Garden', 'Farm', 'Livestock', 'Market', 'Food processing', 'Other'],
        optionsTa: ['சமையலறை', 'தோட்டம்', 'பண்ணை', 'கால்நடைகள் (சாணம்)', 'சந்தை', 'உணவு பதப்படுத்துதல்', 'பிற']
      },
      {
        id: 's6_q2',
        num: 2,
        labelEn: 'Daily organic waste quantity (kg)',
        labelTa: 'தினசரி கரிம கழிவு அளவு (கிலோ)',
        type: 'text',
        optionsEn: ['Numeric kg', 'Unknown'],
        optionsTa: ['கிலோவில் உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'kg / day'
      },
      {
        id: 's6_q3',
        num: 3,
        labelEn: 'Organic waste segregation',
        labelTa: 'கரிம கழிவு தனியாக பிரிக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Always', 'Sometimes', 'Never'],
        optionsTa: ['எப்போதும்', 'சில நேரங்களில்', 'இல்லை']
      },
      {
        id: 's6_q4',
        num: 4,
        labelEn: 'Composting practice',
        labelTa: 'உரமாக்கும் பழக்கம்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['ஆம்', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's6_q5',
        num: 5,
        labelEn: 'Composting method',
        labelTa: 'உரமாக்கும் முறை',
        type: 'select',
        optionsEn: ['Pit', 'Heap', 'Vermicompost', 'Bin', 'Mechanical', 'Other', 'None'],
        optionsTa: ['குழி முறை', 'குவியல் முறை', 'மண்புழு உரத்தொட்டி', 'உர வாளி / பின்', 'இயந்திர முறை', 'பிற', 'எதுவுமில்லை']
      },
      {
        id: 's6_q6',
        num: 6,
        labelEn: 'Vermicompost',
        labelTa: 'மண்புழு உரம் தயாரிப்பு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Interested'],
        optionsTa: ['தொடர்ந்து', 'எப்போதாவது', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's6_q7',
        num: 7,
        labelEn: 'Biogas production',
        labelTa: 'பயோ-கேஸ் உற்பத்தி வசதி',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's6_q8',
        num: 8,
        labelEn: 'Biogas feedstock',
        labelTa: 'பயோ-கேஸ் மூலப்பொருள்',
        type: 'select',
        optionsEn: ['Kitchen waste', 'Animal dung', 'Farm residue', 'Mixed', 'Not applicable'],
        optionsTa: ['சமையலறை கழிவு', 'மாட்டு சாணம்', 'பண்ணை கழிவு', 'கலப்பு', 'பொருந்தாது']
      },
      {
        id: 's6_q9',
        num: 9,
        labelEn: 'Farm residue reuse',
        labelTa: 'பண்ணை கழிவு மறுபயன்பாடு',
        type: 'select',
        optionsEn: ['Compost', 'Mulch', 'Fodder', 'Bioenergy', 'Sold', 'Burned', 'Disposed'],
        optionsTa: ['உரம்', 'மூடாக்கு', 'தீவனம்', 'உயிரி எரிபொருள்', 'விற்பனை', 'எரிப்பு', 'கொட்டுதல்']
      },
      {
        id: 's6_q10',
        num: 10,
        labelEn: 'Organic fertilisers use',
        labelTa: 'இயற்கை உரங்கள் பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's6_q11',
        num: 11,
        labelEn: 'Biofertilisers use',
        labelTa: 'உயிர் உரங்கள் (அசோஸ்பைரில்லம், பாஸ்போபாக்டீரியா)',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Interested'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's6_q12',
        num: 12,
        labelEn: 'Biostimulants use',
        labelTa: 'பஞ்சகவ்யா / ஜீவாமிர்தம் போன்ற பயிர் ஊக்கிகள்',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Interested'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's6_q13',
        num: 13,
        labelEn: 'Chemical fertilisers dependency',
        labelTa: 'ரசாயன உரங்கள் சார்ந்திருத்தல்',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['அதிகம் / தொடர்ந்து', 'எப்போதாவது', 'பயன்படுத்துவதில்லை']
      },
      {
        id: 's6_q14',
        num: 14,
        labelEn: 'Chemical pesticides dependency',
        labelTa: 'ரசாயன பூச்சிக்கொல்லிகள் சார்ந்திருத்தல்',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['அதிகம் / தொடர்ந்து', 'எப்போதாவது', 'பயன்படுத்துவதில்லை']
      },
      {
        id: 's6_q15',
        num: 15,
        labelEn: 'Kitchen garden maintained',
        labelTa: 'வீட்டு காய்கறி தோட்டம் உள்ளதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's6_q16',
        num: 16,
        labelEn: 'Herbal garden',
        labelTa: 'மூலிகைத் தோட்டம்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's6_q17',
        num: 17,
        labelEn: 'Microgreens cultivation',
        labelTa: 'மைக்ரோகிரீன்ஸ் (Microgreens) வளர்ப்பு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Interested'],
        optionsTa: ['ஆம்', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's6_q18',
        num: 18,
        labelEn: 'Organic crops cultivation',
        labelTa: 'இயற்கை வேளாண்மை பயிர்கள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['ஆம்', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's6_q19',
        num: 19,
        labelEn: 'Organic certification',
        labelTa: 'இயற்கை சான்றிதழ் (Organic Certificate)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'In process', 'Not applicable'],
        optionsTa: ['உள்ளது', 'இல்லை', 'செயல்முறையில் உள்ளது', 'பொருந்தாது']
      },
      {
        id: 's6_q20',
        num: 20,
        labelEn: 'Organic input self-production',
        labelTa: 'சொந்தமாக இயற்கை இடுபொருள் தயாரிப்பு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Interested'],
        optionsTa: ['ஆம் (சொந்தமாக செய்கிறோம்)', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's6_q21',
        num: 21,
        labelEn: 'Compost testing',
        labelTa: 'உரத் தரம் பரிசோதிக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Unknown'],
        optionsTa: ['ஆம்', 'இல்லை', 'தெரியவில்லை']
      },
      {
        id: 's6_q22',
        num: 22,
        labelEn: 'Organic products sold or distributed',
        labelTa: 'இயற்கை விளைபொருள் விநியோகம்',
        type: 'select',
        optionsEn: ['Sold', 'Shared', 'Used internally', 'Not applicable'],
        optionsTa: ['விற்பனை செய்யப்படுகிறது', 'பகிர்ந்து கொள்ளப்படுகிறது', 'சுய பயன்பாடு', 'பொருந்தாது']
      },
      {
        id: 's6_q23',
        num: 23,
        labelEn: 'Main organic transformation challenge',
        labelTa: 'இயற்கை மாற்றத்தில் முக்கிய சவால்',
        type: 'select',
        optionsEn: ['Space', 'Labour', 'Knowledge', 'Investment', 'Market', 'Quality', 'None'],
        optionsTa: ['இடப்பற்றாக்குறை', 'வேலையாட்கள் பற்றாக்குறை', 'போதிய அறிவின்மை', 'முதலீடு', 'சந்தை வாய்ப்பு', 'தர கட்டுப்பாடு', 'எதுவுமில்லை']
      },
      {
        id: 's6_q24',
        num: 24,
        labelEn: 'Priority transformation',
        labelTa: 'முன்னுரிமை இயற்கை மாற்றம்',
        type: 'select',
        optionsEn: ['Composting', 'Vermicompost', 'Biogas', 'Organic inputs', 'Kitchen garden', 'Microgreens', 'Other'],
        optionsTa: ['உரமாக்குதல்', 'மண்புழு உரம்', 'பயோ-கேஸ்', 'இயற்கை இடுபொருட்கள்', 'வீட்டு காய்கறி தோட்டம்', 'மைக்ரோகிரீன்ஸ்', 'பிற']
      },
      {
        id: 's6_q25',
        num: 25,
        labelEn: 'Participation in organic mission',
        labelTa: 'கரிம மாற்ற இயக்கத்தில் பங்களிப்பு',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already practising', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செய்கிறோம்', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_07',
    sectorNumber: 7,
    titleEn: 'Sector 07 – Biodiversity',
    titleTa: 'பிரிவு 07 – பல்லுயிர் பெருக்கம் & இயற்கை சூழல்',
    descriptionEn: 'Native trees, birds and pollinators, flora and fauna diversity, wetlands, tree protection, and habitat conservation.',
    descriptionTa: 'நாட்டு மரங்கள், பறவைகள், தேனீக்கள், பூச்சிகள், ஈரநிலங்கள், மர பாதுகாப்பு மற்றும் இயற்கை வாழ்விட பாதுகாப்பு.',
    iconName: 'Trees',
    questions: [
      {
        id: 's7_q1',
        num: 1,
        labelEn: 'Trees present on property',
        labelTa: 'இடத்தில் மரங்கள் உள்ளனவா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Few'],
        optionsTa: ['ஆம் (நிறைய உள்ளன)', 'இல்லை', 'சில மட்டும்']
      },
      {
        id: 's7_q2',
        num: 2,
        labelEn: 'Number of trees',
        labelTa: 'மரங்களின் எண்ணிக்கை',
        type: 'text',
        optionsEn: ['Numeric', 'Unknown'],
        optionsTa: ['எண்ணிக்கை உள்ளிடவும்', 'தெரியவில்லை'],
        unitEn: 'Number of trees'
      },
      {
        id: 's7_q3',
        num: 3,
        labelEn: 'Native tree species present',
        labelTa: 'நாட்டு மர வகைகள் உள்ளதா? (வேம்பு, ஆலமரம், புங்கன் முதலியன)',
        type: 'select',
        optionsEn: ['Many', 'Some', 'None', 'Unknown'],
        optionsTa: ['பல வகைகள்', 'சில வகைகள்', 'எதுவுமில்லை', 'தெரியவில்லை']
      },
      {
        id: 's7_q4',
        num: 4,
        labelEn: 'Fruit trees',
        labelTa: 'பழ மரங்கள் உள்ளனவா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளன', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's7_q5',
        num: 5,
        labelEn: 'Medicinal plants',
        labelTa: 'மூலிகை தாவரங்கள் உள்ளனவா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளன', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's7_q6',
        num: 6,
        labelEn: 'Flowering plants for pollinators',
        labelTa: 'பூக்கும் தாவரங்கள் உள்ளனவா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளன', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's7_q7',
        num: 7,
        labelEn: 'Birds observed',
        labelTa: 'பறவைகள் வருகை நிலை',
        type: 'select',
        optionsEn: ['Many', 'Some', 'Rarely', 'Never'],
        optionsTa: ['அதிகம்', 'மிதமாக', 'அரிதாக', 'பார்த்ததில்லை']
      },
      {
        id: 's7_q8',
        num: 8,
        labelEn: 'Pollinators observed',
        labelTa: 'மகரந்த சேர்க்கை பூச்சிகள் (தேனீ, வண்ணத்துப்பூச்சி)',
        type: 'select',
        optionsEn: ['Bees', 'Butterflies', 'Other insects', 'None', 'Unknown'],
        optionsTa: ['தேனீக்கள்', 'வண்ணத்துப்பூச்சிகள்', 'பிற பூச்சிகள்', 'எதுவுமில்லை', 'தெரியவில்லை']
      },
      {
        id: 's7_q9',
        num: 9,
        labelEn: 'Habitat or nesting areas',
        labelTa: 'பறவை கூடுகள் அல்லது வாழ்விட வசதி',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partial'],
        optionsTa: ['உள்ளது', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's7_q10',
        num: 10,
        labelEn: 'Pond or wetland nearby',
        labelTa: 'அருகிலுள்ள குளம் அல்லது ஈரநிலம்',
        type: 'select',
        optionsEn: ['Within 500 m', 'Within 1 km', 'More than 1 km', 'No'],
        optionsTa: ['500 மீட்டருக்குள்', '1 கி.மீக்குள்', '1 கி.மீக்கு மேல்', 'இல்லை']
      },
      {
        id: 's7_q11',
        num: 11,
        labelEn: 'Natural vegetation',
        labelTa: 'இயற்கை தாவர அடர்த்தி',
        type: 'select',
        optionsEn: ['Good', 'Moderate', 'Poor', 'None'],
        optionsTa: ['நன்று', 'மிதமானது', 'குறைவு', 'இல்லை']
      },
      {
        id: 's7_q12',
        num: 12,
        labelEn: 'Invasive species (e.g. Prosopis juliflora)',
        labelTa: 'ஆக்கிரமிப்பு தாவரங்கள் (சீமைக்கருவேல் போன்றவை)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Unknown'],
        optionsTa: ['உள்ளது', 'இல்லை', 'தெரியவில்லை']
      },
      {
        id: 's7_q13',
        num: 13,
        labelEn: 'Native species protected',
        labelTa: 'நாட்டு மரங்கள் / தாவரங்கள் பாதுகாக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's7_q14',
        num: 14,
        labelEn: 'Chemical impact on biodiversity',
        labelTa: 'ரசாயனங்களால் பல்லுயிர் இழப்பு தாக்கம்',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'Unknown'],
        optionsTa: ['அதிகம்', 'மிதமானது', 'குறைவு', 'தெரியவில்லை']
      },
      {
        id: 's7_q15',
        num: 15,
        labelEn: 'Tree cutting',
        labelTa: 'மரம் வெட்டும் நிகழ்வுகள்',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Unknown'],
        optionsTa: ['ஒருபோதும் இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'தெரியவில்லை']
      },
      {
        id: 's7_q16',
        num: 16,
        labelEn: 'Annual tree planting',
        labelTa: 'ஆண்டுதோறும் மரக்கன்று நடும் வழக்கம்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Sometimes'],
        optionsTa: ['ஆம் (வழக்கமாக நடுகிறோம்)', 'இல்லை', 'சில நேரங்களில்']
      },
      {
        id: 's7_q17',
        num: 17,
        labelEn: 'Community planting programme',
        labelTa: 'சமூக மர நடுகை திட்டங்களில் பங்களிப்பு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['பங்கேற்கிறோம்', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's7_q18',
        num: 18,
        labelEn: 'Wildlife observed',
        labelTa: 'சிறு வனவிலங்குகள் / ஊர்வன வருகை',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Unknown'],
        optionsTa: ['தொடர்ந்து காணப்படுகிறது', 'எப்போதாவது', 'இல்லை', 'தெரியவில்லை']
      },
      {
        id: 's7_q19',
        num: 19,
        labelEn: 'Biodiversity records maintained',
        labelTa: 'பல்லுயிர் குறிப்பேடு பராமரிக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Informally'],
        optionsTa: ['ஆம் (முறையாக)', 'இல்லை', 'சாதாரணமாக நினைவில்']
      },
      {
        id: 's7_q20',
        num: 20,
        labelEn: 'Local species identified',
        labelTa: 'உள்ளூர் தாவர இனங்கள் அடையாளம் காணப்பட்டுள்ளதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's7_q21',
        num: 21,
        labelEn: 'People biodiversity register (PBR)',
        labelTa: 'ஊராட்சி பல்லுயிர் பதிவேடு விழிப்புணர்வு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['அறிவோம்', 'தெரியாது', 'பங்கேற்க விருப்பம்']
      },
      {
        id: 's7_q22',
        num: 22,
        labelEn: 'Pollinator habitats protected',
        labelTa: 'தேனீ கூடுகள் / மகரந்த வாழிட பாதுகாப்பு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['பாதுகாக்கிறோம்', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's7_q23',
        num: 23,
        labelEn: 'Main threat to biodiversity',
        labelTa: 'பல்லுயிர்க்கு முதன்மை அச்சுறுத்தல்',
        type: 'select',
        optionsEn: ['Habitat loss', 'Chemicals', 'Tree cutting', 'Pollution', 'Invasive species', 'Other'],
        optionsTa: ['வாழிடம் அழிவு', 'ரசாயன நச்சு', 'மரம் வெட்டுதல்', 'மாசுபாடு', 'சீமைக்கருவேல் ஆக்கிரமிப்பு', 'பிற']
      },
      {
        id: 's7_q24',
        num: 24,
        labelEn: 'Restoration needed',
        labelTa: 'தேவைப்படும் இயற்கை மீட்டெடுப்பு',
        type: 'select',
        optionsEn: ['Native trees', 'Pollinator garden', 'Wetland restoration', 'Habitat protection', 'Species documentation', 'Other'],
        optionsTa: ['நாட்டு மரங்கள் நடுதல்', 'பூக்கள் தோட்டம்', 'நீர்நிலைகள் மீட்டல்', 'வாழிட பாதுகாப்பு', 'ஆவணப்படுத்துதல்', 'பிற']
      },
      {
        id: 's7_q25',
        num: 25,
        labelEn: 'Participation in conservation',
        labelTa: 'பல்லுயிர் பாதுகாப்பு முன்னெடுப்பில் ஆர்வம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already practising', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செய்கிறோம்', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_08',
    sectorNumber: 8,
    titleEn: 'Sector 08 – Air Quality',
    titleTa: 'பிரிவு 08 – காற்று தரம் & தூய்மை',
    descriptionEn: 'Pollution sources, road/industrial proximity, dust, smoke, indoor ventilation, PM2.5/PM10 readings, and green buffers.',
    descriptionTa: 'காற்று மாசு காரணிகள், சாலை/தொழிற்சாலை தூரம், தூசி, புகை, சமையலறை காற்றோட்டம் மற்றும் பசுமை காற்று தடுப்புகள்.',
    iconName: 'Wind',
    questions: [
      {
        id: 's8_q1',
        num: 1,
        labelEn: 'Pollution sources nearby',
        labelTa: 'அருகிலுள்ள காற்று மாசு மூலங்கள் (பல தெரிவுகள்)',
        type: 'multi',
        optionsEn: ['Traffic', 'Industry', 'Construction', 'Waste burning', 'Agricultural burning', 'Cooking smoke', 'Dust', 'None', 'Other'],
        optionsTa: ['வாகன நெரிசல்', 'தொழிற்சாலைகள்', 'கட்டுமான பணி', 'குப்பை எரிப்பு', 'பயிர் கழிவு எரிப்பு', 'சமையல் புகை', 'தூசி', 'எதுவுமில்லை', 'பிற']
      },
      {
        id: 's8_q2',
        num: 2,
        labelEn: 'Major road distance',
        labelTa: 'பிரதான சாலையிலிருந்து தூரம்',
        type: 'select',
        optionsEn: ['Below 100 m', '100–500 m', 'More than 500 m', 'Unknown'],
        optionsTa: ['100 மீட்டருக்குள்', '100–500 மீட்டர்', '500 மீட்டருக்கு மேல்', 'தெரியவில்லை']
      },
      {
        id: 's8_q3',
        num: 3,
        labelEn: 'Industry distance',
        labelTa: 'தொழிற்சாலையிலிருந்து தூரம்',
        type: 'select',
        optionsEn: ['Below 500 m', '500 m–1 km', 'More than 1 km', 'Unknown'],
        optionsTa: ['500 மீட்டருக்குள்', '500 மீ – 1 கி.மீ', '1 கி.மீக்கு மேல்', 'தொழிற்சாலை இல்லை']
      },
      {
        id: 's8_q4',
        num: 4,
        labelEn: 'Dust frequency',
        labelTa: 'தூசி ஏற்படும் கால அளவு',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Always'],
        optionsTa: ['இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'எப்போதும் தூசி']
      },
      {
        id: 's8_q5',
        num: 5,
        labelEn: 'Smoke frequency',
        labelTa: 'புகை ஏற்படும் கால அளவு',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Always'],
        optionsTa: ['இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'எப்போதும் புகை']
      },
      {
        id: 's8_q6',
        num: 6,
        labelEn: 'Open burning nearby',
        labelTa: 'அருகில் கழிவு எரித்தல் நிகழ்கிறதா?',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Always'],
        optionsTa: ['ஒருபோதும் இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'எப்போதும்']
      },
      {
        id: 's8_q7',
        num: 7,
        labelEn: 'Indoor ventilation',
        labelTa: 'உட்புற காற்றோட்டம் நிலை',
        type: 'select',
        optionsEn: ['Good', 'Moderate', 'Poor'],
        optionsTa: ['மிக நன்று', 'மிதமானது', 'மோசம் (காற்றோட்டம் குறைவு)']
      },
      {
        id: 's8_q8',
        num: 8,
        labelEn: 'Cooking fuel used indoors',
        labelTa: 'வீட்டிற்குள் பயன்படும் சமையல் எரிபொருள்',
        type: 'select',
        optionsEn: ['LPG', 'Electricity', 'Firewood', 'Biomass', 'Biogas', 'Other'],
        optionsTa: ['எல்.பி.ஜி (கேஸ்)', 'மின்சாரம்', 'விறகு அடுப்பு', 'பயோமாஸ்', 'பயோ-கேஸ்', 'பிற']
      },
      {
        id: 's8_q9',
        num: 9,
        labelEn: 'Smoke ventilation system',
        labelTa: 'புகைபோக்கி வசதி (Chimney / Exhaust)',
        type: 'select',
        optionsEn: ['Chimney', 'Exhaust', 'Open ventilation', 'No ventilation', 'Not applicable'],
        optionsTa: ['சிம்னி', 'எக்சாஸ்ட் ஃபேன்', 'திறந்த ஜன்னல் காற்றோட்டம்', 'காற்றோட்டமில்லை', 'பொருந்தாது']
      },
      {
        id: 's8_q10',
        num: 10,
        labelEn: 'Indoor combustion or smoking',
        labelTa: 'உட்புற புகைபிடித்தல் அல்லது எரித்தல்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Unknown'],
        optionsTa: ['ஆம்', 'இல்லை', 'தெரியவில்லை']
      },
      {
        id: 's8_q11',
        num: 11,
        labelEn: 'Worker exposure to dust or fumes',
        labelTa: 'பணியாளர்கள் தூசி / புகைக்கு ஆளாதல்',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Not applicable'],
        optionsTa: ['தொடர்ந்து', 'எப்போதாவது', 'இல்லை', 'பொருந்தாது']
      },
      {
        id: 's8_q12',
        num: 12,
        labelEn: 'Protective equipment (masks)',
        labelTa: 'முகக்கவசம் / பாதுகாப்பு கவசங்கள் பயன்பாடு',
        type: 'select',
        optionsEn: ['Always', 'Sometimes', 'Never', 'Not applicable'],
        optionsTa: ['எப்போதும்', 'சில நேரங்களில்', 'பயன்படுத்துவதில்லை', 'பொருந்தாது']
      },
      {
        id: 's8_q13',
        num: 13,
        labelEn: 'Green buffers (tree barriers)',
        labelTa: 'பசுமை மரத் தடுப்பு அரண்',
        type: 'select',
        optionsEn: ['Dense', 'Moderate', 'Few', 'None'],
        optionsTa: ['அடர்த்தியான மரங்கள்', 'மிதமானது', 'குறைவான மரங்கள்', 'எதுவுமில்லை']
      },
      {
        id: 's8_q14',
        num: 14,
        labelEn: 'Traffic pollution concern',
        labelTa: 'வாகன புகை மாசு குறித்த கவலை',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'Unknown'],
        optionsTa: ['அதிகம்', 'மிதமானது', 'குறைவு', 'தெரியவில்லை']
      },
      {
        id: 's8_q15',
        num: 15,
        labelEn: 'Industrial pollution concern',
        labelTa: 'தொழிற்சாலை காற்று மாசு குறித்த கவலை',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'Unknown'],
        optionsTa: ['அதிகம்', 'மிதமானது', 'குறைவு', 'தெரியவில்லை']
      },
      {
        id: 's8_q16',
        num: 16,
        labelEn: 'Construction dust control',
        labelTa: 'கட்டுமான தூசி தடுப்பு நடவடிக்கைகள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially', 'Not applicable'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு', 'பொருந்தாது']
      },
      {
        id: 's8_q17',
        num: 17,
        labelEn: 'Air monitoring instrument available',
        labelTa: 'காற்று கண்காணிப்பு கருவி உள்ளதா?',
        type: 'select',
        optionsEn: ['Yes', 'No'],
        optionsTa: ['ஆம்', 'இல்லை']
      },
      {
        id: 's8_q18',
        num: 18,
        labelEn: 'PM2.5 reading (µg/m³)',
        labelTa: 'PM2.5 காற்று மாசு அளவு',
        type: 'text',
        optionsEn: ['Numeric µg/m³', 'Not measured'],
        optionsTa: ['µg/m³-ல் உள்ளிடவும்', 'அளவிடப்படவில்லை'],
        unitEn: 'µg/m³ (e.g. 28)'
      },
      {
        id: 's8_q19',
        num: 19,
        labelEn: 'PM10 reading (µg/m³)',
        labelTa: 'PM10 காற்று மாசு அளவு',
        type: 'text',
        optionsEn: ['Numeric µg/m³', 'Not measured'],
        optionsTa: ['µg/m³-ல் உள்ளிடவும்', 'அளவிடப்படவில்லை'],
        unitEn: 'µg/m³ (e.g. 55)'
      },
      {
        id: 's8_q20',
        num: 20,
        labelEn: 'Reading source',
        labelTa: 'அளவீட்டு மூலம்',
        type: 'select',
        optionsEn: ['Instrument', 'Official monitoring source', 'Not measured'],
        optionsTa: ['கள ஆய்வு கருவி', 'அரசு வானிலை/மாசு கட்டுப்பாடு தகவல்', 'அளவிடப்படவில்லை']
      },
      {
        id: 's8_q21',
        num: 21,
        labelEn: 'Measurement date and time',
        labelTa: 'அளவீடு செய்த நேரம்',
        type: 'text',
        optionsEn: ['Date/time', 'Not measured'],
        optionsTa: ['தேதி மற்றும் நேரம்', 'அளவிடப்படவில்லை']
      },
      {
        id: 's8_q22',
        num: 22,
        labelEn: 'Air-quality records maintained',
        labelTa: 'காற்று தர பதிவேடு பராமரிக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's8_q23',
        num: 23,
        labelEn: 'Main air quality problem',
        labelTa: 'முக்கிய காற்று பிரச்சனை',
        type: 'select',
        optionsEn: ['Dust', 'Smoke', 'Traffic', 'Industrial emissions', 'Indoor pollution', 'Other', 'None'],
        optionsTa: ['தூசி', 'புகை', 'வாகன நெரிசல்', 'தொழிற்சாலை புகை', 'உட்புற அடுப்பு புகை', 'பிற', 'எதுவுமில்லை']
      },
      {
        id: 's8_q24',
        num: 24,
        labelEn: 'Priority air improvement',
        labelTa: 'முன்னுரிமை காற்று சீரமைப்பு நடவடிக்கை',
        type: 'select',
        optionsEn: ['Green buffer', 'Clean cooking', 'Dust control', 'Emission reduction', 'Monitoring', 'Other'],
        optionsTa: ['மரங்கள் நடுதல்', 'புகை இல்லாத அடுப்பு', 'தூசி கட்டுப்பாடு', 'புகை குறைப்பு', 'தொடர் கண்காணிப்பு', 'பிற']
      },
      {
        id: 's8_q25',
        num: 25,
        labelEn: 'Participation in clean air initiatives',
        labelTa: 'தூய காற்று முன்னெடுப்பில் ஆர்வம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already practising', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செய்கிறோம்', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_09',
    sectorNumber: 9,
    titleEn: 'Sector 09 – Self Vegetation & Green Cover',
    titleTa: 'பிரிவு 09 – பசுமை மூடாக்கு & சுய தாவர வளர்ப்பு',
    descriptionEn: 'Kitchen, terrace, and vertical gardens, herbal plants, microgreens, native tree canopy, and green area ratios.',
    descriptionTa: 'வீட்டு காய்கறி, மாடித் தோட்டம், செங்குத்து தோட்டம், மூலிகை தாவரங்கள், பசுமை பரப்பளவு மற்றும் நீர் பாசனம்.',
    iconName: 'Leaf',
    questions: [
      {
        id: 's9_q1',
        num: 1,
        labelEn: 'Vegetation maintained on premises',
        labelTa: 'வளாகத்தில் தாவரங்கள் பராமரிக்கப்படுகிறதா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['ஆம்', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q2',
        num: 2,
        labelEn: 'Kitchen garden',
        labelTa: 'காய்கறி தோட்டம்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q3',
        num: 3,
        labelEn: 'Terrace garden',
        labelTa: 'மாடித் தோட்டம் (Terrace Garden)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q4',
        num: 4,
        labelEn: 'Vertical garden',
        labelTa: 'செங்குத்து தோட்டம் (Vertical Garden)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q5',
        num: 5,
        labelEn: 'Herbal garden',
        labelTa: 'மூலிகை தோட்டம் (துளசி, தூதுவளை, ஆடாதோடை)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q6',
        num: 6,
        labelEn: 'Microgreens',
        labelTa: 'மைக்ரோகிரீன்ஸ் வளர்ப்பு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளது', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q7',
        num: 7,
        labelEn: 'Fruit trees',
        labelTa: 'பழ மரங்கள் (மா, பலா, கொய்யா, மாதுளை)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளன', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q8',
        num: 8,
        labelEn: 'Native shade trees',
        labelTa: 'நாட்டு நிழல் தரும் மரங்கள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளன', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q9',
        num: 9,
        labelEn: 'Green area size (sq.m / cents / acres)',
        labelTa: 'பசுமை பரப்பளவு (சென்ட் / சதுர மீட்டர்)',
        type: 'text',
        optionsEn: ['Numeric square metres', 'Cents', 'Acres'],
        optionsTa: ['சதுர மீட்டர்', 'சென்ட்', 'ஏக்கர்'],
        unitEn: 'e.g. 5 Cents / 150 sq.m'
      },
      {
        id: 's9_q10',
        num: 10,
        labelEn: 'Number of plants',
        labelTa: 'செடிகளின் எண்ணிக்கை',
        type: 'text',
        optionsEn: ['Numeric', 'Unknown'],
        optionsTa: ['எண்ணிக்கை', 'தெரியவில்லை'],
        unitEn: 'Number of plants'
      },
      {
        id: 's9_q11',
        num: 11,
        labelEn: 'Plant types grown',
        labelTa: 'வளர்க்கப்படும் தாவர வகைகள் (பல தெரிவுகள்)',
        type: 'multi',
        optionsEn: ['Vegetables', 'Fruits', 'Herbs', 'Flowers', 'Native trees', 'Mixed'],
        optionsTa: ['காய்கறிகள்', 'பழங்கள்', 'மூலிகைகள்', 'பூக்கள்', 'நாட்டு மரங்கள்', 'கலப்பு']
      },
      {
        id: 's9_q12',
        num: 12,
        labelEn: 'Organic growing media (cocopeat/soil mix)',
        labelTa: 'இயற்கை வளர்ப்பு ஊடகம் (தேங்காய் நார் / இயற்கை மண்)',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Partially'],
        optionsTa: ['ஆம்', 'இல்லை', 'பகுதியளவு']
      },
      {
        id: 's9_q13',
        num: 13,
        labelEn: 'Compost use for plants',
        labelTa: 'செடிகளுக்கு இயற்கை உரம் பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's9_q14',
        num: 14,
        labelEn: 'Chemical fertiliser use on plants',
        labelTa: 'செடிகளுக்கு ரசாயன உரம் பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's9_q15',
        num: 15,
        labelEn: 'Chemical pesticide use on plants',
        labelTa: 'செடிகளுக்கு ரசாயன பூச்சிக்கொல்லி பயன்பாடு',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'இல்லை']
      },
      {
        id: 's9_q16',
        num: 16,
        labelEn: 'Irrigation method for plants',
        labelTa: 'செடிகளுக்கான பாசன முறை',
        type: 'select',
        optionsEn: ['Drip', 'Sprinkler', 'Manual', 'Reused water', 'Rain-fed'],
        optionsTa: ['சொட்டு நீர் பாசனம்', 'தெளிப்பான்', 'கைமுறை பாசனம்', 'மறுசுழற்சி நீர்', 'மழை சார்ந்தது']
      },
      {
        id: 's9_q17',
        num: 17,
        labelEn: 'Rainwater used for plants',
        labelTa: 'மழைநீர் சேமித்து செடிகளுக்கு பயன்படுகிறதா?',
        type: 'select',
        optionsEn: ['Always', 'Sometimes', 'Never'],
        optionsTa: ['எப்போதும்', 'சில நேரங்களில்', 'இல்லை']
      },
      {
        id: 's9_q18',
        num: 18,
        labelEn: 'Plant maintenance frequency',
        labelTa: 'செடி பராமரிப்பு இடைவெளி',
        type: 'select',
        optionsEn: ['Daily', 'Weekly', 'Monthly', 'Irregular'],
        optionsTa: ['தினமும்', 'வாரந்தோறும்', 'மாதந்தோறும்', 'ஒழுங்கற்றது']
      },
      {
        id: 's9_q19',
        num: 19,
        labelEn: 'Plant survival rate',
        labelTa: 'செடிகள் உயிர் வாழும் விகிதம்',
        type: 'select',
        optionsEn: ['Above 90%', '70–90%', 'Below 70%', 'Unknown'],
        optionsTa: ['90%க்கு மேல்', '70–90%', '70%க்கு கீழ்', 'தெரியவில்லை']
      },
      {
        id: 's9_q20',
        num: 20,
        labelEn: 'Cooling or shade benefit experienced',
        labelTa: 'குளிர்ச்சி மற்றும் நிழல் பயன் உணரப்படுகிறதா?',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'None'],
        optionsTa: ['அதிகம்', 'மிதமானது', 'குறைவு', 'இல்லை']
      },
      {
        id: 's9_q21',
        num: 21,
        labelEn: 'Pollinator-friendly plants',
        labelTa: 'தேனீ/வண்ணத்துப்பூச்சி கவரும் தாவரங்கள்',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Planned'],
        optionsTa: ['உள்ளன', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's9_q22',
        num: 22,
        labelEn: 'Green cover trend over time',
        labelTa: 'பசுமை பரப்பளவு போக்கு',
        type: 'select',
        optionsEn: ['Expanding', 'Maintaining', 'Declining', 'Unknown'],
        optionsTa: ['அதிகரித்து வருகிறது', 'சீராக உள்ளது', 'குறைந்து வருகிறது', 'தெரியவில்லை']
      },
      {
        id: 's9_q23',
        num: 23,
        labelEn: 'Main gardening challenge',
        labelTa: 'செடி வளர்ப்பில் முக்கிய சவால்',
        type: 'select',
        optionsEn: ['Space', 'Water', 'Cost', 'Maintenance', 'Knowledge', 'Pests', 'Other'],
        optionsTa: ['இடப்பற்றாக்குறை', 'தண்ணீர் பற்றாக்குறை', 'செலவு', 'நேரமின்மை / பராமரிப்பு', 'அறிவின்மை', 'பூச்சி தாக்குதல்', 'பிற']
      },
      {
        id: 's9_q24',
        num: 24,
        labelEn: 'Priority green improvement',
        labelTa: 'முன்னுரிமை பசுமை தேவை',
        type: 'select',
        optionsEn: ['Kitchen garden', 'Terrace garden', 'Native trees', 'Herbal garden', 'Microgreens', 'Vertical garden', 'Other'],
        optionsTa: ['வீட்டு காய்கறி தோட்டம்', 'மாடித் தோட்டம்', 'நாட்டு மரங்கள் நடுதல்', 'மூலிகைத் தோட்டம்', 'மைக்ரோகிரீன்ஸ்', 'செங்குத்து தோட்டம்', 'பிற']
      },
      {
        id: 's9_q25',
        num: 25,
        labelEn: 'Participation in greening initiatives',
        labelTa: 'பசுமை முன்னெடுப்புகளில் ஆர்வம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already practising', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செய்கிறோம்', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_10',
    sectorNumber: 10,
    titleEn: 'Sector 10 – Disaster Management & Climate Resilience',
    titleTa: 'பிரிவு 10 – பேரிடர் மேலாண்மை & காலநிலை நெகிழ்வுத்தன்மை',
    descriptionEn: 'Flood/drought risk, heatwaves, cyclones, building resilience, emergency reserves, backup water/power, and community preparedness.',
    descriptionTa: 'வெள்ளம், வறட்சி, தீவிர வெப்பம், புயல் அபாயம், அவசர கால சேமிப்பு, மாற்று மின்சாரம்/நீர் மற்றும் பேரிடர் தயார்நிலை.',
    iconName: 'ShieldAlert',
    questions: [
      {
        id: 's10_q1',
        num: 1,
        labelEn: 'Flood experience',
        labelTa: 'வெள்ள பாதிப்பு அனுபவம்',
        type: 'select',
        optionsEn: ['Never', 'Once', 'Occasionally', 'Frequently'],
        optionsTa: ['ஒருபோதும் இல்லை', 'ஒருமுறை', 'எப்போதாவது', 'அடிக்கடி']
      },
      {
        id: 's10_q2',
        num: 2,
        labelEn: 'Drought or water scarcity experience',
        labelTa: 'வறட்சி அல்லது கடுமையான தண்ணீர் தட்டுப்பாடு',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently', 'Severe'],
        optionsTa: ['இல்லை', 'எப்போதாவது', 'அடிக்கடி', 'மிகக் கடுமையானது']
      },
      {
        id: 's10_q3',
        num: 3,
        labelEn: 'Extreme heat exposure',
        labelTa: 'கோடை வெப்ப அலை பாதிப்பு',
        type: 'select',
        optionsEn: ['Low', 'Moderate', 'High', 'Severe'],
        optionsTa: ['குறைவு', 'மிதமானது', 'அதிகம்', 'மிகக் கடுமையானது']
      },
      {
        id: 's10_q4',
        num: 4,
        labelEn: 'Cyclone or storm damage history',
        labelTa: 'புயல் அல்லது பலத்த காற்று சேதம் (கஜா புயல் போன்றவை)',
        type: 'select',
        optionsEn: ['Never', 'Occasionally', 'Frequently'],
        optionsTa: ['இல்லை', 'எப்போதாவது', 'அடிக்கடி சேதம்']
      },
      {
        id: 's10_q5',
        num: 5,
        labelEn: 'Soil erosion or land degradation risk',
        labelTa: 'மண் அரிப்பு அல்லது நிலச் சீர்கேடு அபாயம்',
        type: 'select',
        optionsEn: ['None', 'Low', 'Moderate', 'Severe'],
        optionsTa: ['இல்லை', 'குறைவு', 'மிதமானது', 'கடுமையானது']
      },
      {
        id: 's10_q6',
        num: 6,
        labelEn: 'Early warning access',
        labelTa: 'முன்னெச்சரிக்கை எச்சரிக்கை அறிவிப்பு கிடைப்பது',
        type: 'select',
        optionsEn: ['Always', 'Usually', 'Rarely', 'Never'],
        optionsTa: ['எப்போதும் சரியாக கிடைக்கிறது', 'வழக்கமாக', 'அரிதாக', 'கிடைப்பதில்லை']
      },
      {
        id: 's10_q7',
        num: 7,
        labelEn: 'Stormwater drainage capacity',
        labelTa: 'மழைநீர் வடிகால் திறன்',
        type: 'select',
        optionsEn: ['Good', 'Adequate', 'Poor', 'No drainage'],
        optionsTa: ['நன்று', 'போதுமானது', 'மோசம்', 'வடிகால் வசதி இல்லை']
      },
      {
        id: 's10_q8',
        num: 8,
        labelEn: 'Emergency supplies maintained (first aid/torch)',
        labelTa: 'அவசர கால பொருட்கள் இருப்பு (முதலுதவி பெட்டி, டார்ச்)',
        type: 'select',
        optionsEn: ['Yes', 'Partial', 'No'],
        optionsTa: ['உள்ளது', 'பகுதியளவு', 'இல்லை']
      },
      {
        id: 's10_q9',
        num: 9,
        labelEn: 'Emergency shelter access nearby',
        labelTa: 'அருகிலுள்ள பேரிடர் நிவாரண மையம் / பள்ளி',
        type: 'select',
        optionsEn: ['Within 500 m', 'Within 1 km', 'Far away', 'Unknown'],
        optionsTa: ['500 மீட்டருக்குள்', '1 கி.மீக்குள்', 'மிக தொலைவு', 'தெரியவில்லை']
      },
      {
        id: 's10_q10',
        num: 10,
        labelEn: 'Disaster insurance coverage',
        labelTa: 'பயிர் / வீடு பேரிடர் காப்பீடு வசதி',
        type: 'select',
        optionsEn: ['Fully insured', 'Crop insurance only', 'Property insurance only', 'None'],
        optionsTa: ['முழு காப்பீடு உண்டு', 'பயிர் காப்பீடு மட்டும்', 'வீட்டுக் காப்பீடு மட்டும்', 'எதுவுமில்லை']
      },
      {
        id: 's10_q11',
        num: 11,
        labelEn: 'Evacuation plan in place',
        labelTa: 'அவசர வெளியேற்றத் திட்டம் உள்ளதா?',
        type: 'select',
        optionsEn: ['Yes', 'Informal', 'No'],
        optionsTa: ['ஆம் (தெளிவான திட்டம் உண்டு)', 'ஓரளவு தெரியும்', 'இல்லை']
      },
      {
        id: 's10_q12',
        num: 12,
        labelEn: 'Building structure resilience',
        labelTa: 'கட்டடத்தின் இயற்கை சீற்ற தாங்குதிறன்',
        type: 'select',
        optionsEn: ['Pucca (Concrete/Reinforced)', 'Semi-Pucca', 'Kutcha (Thatch/Mud)', 'Industrial shed'],
        optionsTa: ['கான்கிரீட் தளம் (பக்கா)', 'பகுதி கான்கிரீட் / ஓடு', 'கூரை வீடு / மண் சுவர்', 'தகர கொட்டகை']
      },
      {
        id: 's10_q13',
        num: 13,
        labelEn: 'Backup water storage for emergencies',
        labelTa: 'அவசர கால குடிநீர் சேமிப்பு வசதி',
        type: 'select',
        optionsEn: ['Over 3 days', '1–3 days', 'Below 1 day', 'None'],
        optionsTa: ['3 நாட்களுக்கு மேல்', '1–3 நாட்கள்', '1 நாளுக்கு கீழ்', 'சேமிப்பு இல்லை']
      },
      {
        id: 's10_q14',
        num: 14,
        labelEn: 'Backup power capability',
        labelTa: 'மின் தடையின் போது மாற்று மின் வசதி',
        type: 'select',
        optionsEn: ['Solar + Battery', 'Inverter battery', 'Generator', 'None'],
        optionsTa: ['சோலார் + பேட்டரி', 'இன்வெர்ட்டர் பேட்டரி', 'ஜெனரேட்டர்', 'எதுவுமில்லை']
      },
      {
        id: 's10_q15',
        num: 15,
        labelEn: 'Emergency food grains reserve',
        labelTa: 'அவசர கால தானிய சேமிப்பு இருப்பு',
        type: 'select',
        optionsEn: ['Ample (1+ month)', 'Moderate (1-2 weeks)', 'Minimal (Few days)', 'None'],
        optionsTa: ['1 மாதத்திற்கு மேல்', '1-2 வாரங்களுக்கு', 'சில நாட்கள் மட்டும்', 'இல்லை']
      },
      {
        id: 's10_q16',
        num: 16,
        labelEn: 'Community disaster preparedness',
        labelTa: 'கிராம / வார்டு பேரிடர் தயார்நிலை',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'None'],
        optionsTa: ['மிக நன்று', 'மிதமானது', 'குறைவு', 'இல்லை']
      },
      {
        id: 's10_q17',
        num: 17,
        labelEn: 'Local relief volunteers / SHG groups',
        labelTa: 'உள்ளூர் தொண்டர்கள் / சுய உதவிக் குழு உதவி',
        type: 'select',
        optionsEn: ['Active and available', 'Present but limited', 'Not available'],
        optionsTa: ['செயலில் உள்ளனர்', 'குறைவாக உள்ளனர்', 'இல்லை']
      },
      {
        id: 's10_q18',
        num: 18,
        labelEn: 'Financial emergency buffer',
        labelTa: 'பேரிடர் கால அவசர நிதி இருப்பு',
        type: 'select',
        optionsEn: ['Adequate', 'Partial', 'None', 'Dependent on loans'],
        optionsTa: ['போதுமானது', 'பகுதியளவு', 'இல்லை', 'கடன் வாங்க வேண்டிய நிலை']
      },
      {
        id: 's10_q19',
        num: 19,
        labelEn: 'Climate vulnerability level',
        labelTa: 'காலநிலை பாதிப்பு அபாய நிலை',
        type: 'select',
        optionsEn: ['High risk zone', 'Moderate risk', 'Low risk', 'Unknown'],
        optionsTa: ['அதி தீவிர அபாய பகுதி', 'மிதமான பகுதி', 'பாதுகாப்பான பகுதி', 'தெரியவில்லை']
      },
      {
        id: 's10_q20',
        num: 20,
        labelEn: 'Historical disaster damage suffered',
        labelTa: 'கடந்த கால பேரிடர் இழப்புகள்',
        type: 'select',
        optionsEn: ['Severe financial/property loss', 'Moderate loss', 'Minor loss', 'Never affected'],
        optionsTa: ['கடுமையான இழப்பு', 'மிதமான இழப்பு', 'சிறிய இழப்பு', 'பாதிப்பு ஏற்பட்டதில்லை']
      },
      {
        id: 's10_q21',
        num: 21,
        labelEn: 'Recovery time after disasters',
        labelTa: 'பேரிடருக்குப் பின் இயல்பு நிலைக்கு திரும்பும் காலம்',
        type: 'select',
        optionsEn: ['Within 1 week', '1–4 weeks', '1–6 months', 'More than 6 months'],
        optionsTa: ['1 வாரத்திற்குள்', '1–4 வாரங்கள்', '1–6 மாதங்கள்', '6 மாதங்களுக்கு மேல்']
      },
      {
        id: 's10_q22',
        num: 22,
        labelEn: 'Climate adaptation measures implemented',
        labelTa: 'காலநிலை மாற்ற ஏற்பு நடவடிக்கைகள்',
        type: 'select',
        optionsEn: ['Multiple measures', 'Few measures', 'None', 'Interested'],
        optionsTa: ['பல நடவடிக்கைகள்', 'சில நடவடிக்கைகள்', 'எதுவுமில்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's10_q23',
        num: 23,
        labelEn: 'Disaster management training received',
        labelTa: 'பேரிடர் பயிற்சி பெற்றுள்ளீர்களா?',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Interested'],
        optionsTa: ['ஆம் (பயிற்சி பெற்றுள்ளோம்)', 'இல்லை', 'பயிற்சி பெற விருப்பம்']
      },
      {
        id: 's10_q24',
        num: 24,
        labelEn: 'Priority resilience need',
        labelTa: 'முன்னுரிமை பேரிடர் பாதுகாப்பு தேவை',
        type: 'select',
        optionsEn: ['Drainage improvement', 'Flood barrier', 'Drought-resistant crops', 'Backup power/water', 'Insurance coverage', 'Early warning alert', 'Other'],
        optionsTa: ['வடிகால் சீரமைப்பு', 'வெள்ளத் தடுப்பு', 'வறட்சி தாங்கும் பயிர்', 'மாற்று மின்சாரம்/நீர்', 'காப்பீடு பெறுதல்', 'முன்னெச்சரிக்கை அலர்ட்', 'பிற']
      },
      {
        id: 's10_q25',
        num: 25,
        labelEn: 'Participation in disaster relief',
        labelTa: 'சமூக மீட்புப் பணிகளில் பங்களிக்கும் விருப்பம்',
        type: 'select',
        optionsEn: ['Yes', 'Interested', 'Already active', 'Not now'],
        optionsTa: ['ஆம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே தொண்டராக உள்ளோம்', 'தற்போது இல்லை']
      }
    ]
  },
  {
    id: 'sector_11',
    sectorNumber: 11,
    titleEn: 'Sector 11 – Carbon & Climate Impact',
    titleTa: 'பிரிவு 11 – கார்பன் & காலநிலை தாக்கம்',
    descriptionEn: 'Carbon literacy, fossil fuel dependency, tree carbon sinks, composting mitigation, local food sourcing, and emission reductions.',
    descriptionTa: 'கார்பன் விழிப்புணர்வு, புதைபடிவ எரிபொருள் பயன்பாடு, மரம் கார்பன் உறிஞ்சுதல், உள்ளூர் உணவு மற்றும் உமிழ்வு குறைப்பு.',
    iconName: 'Flame',
    questions: [
      {
        id: 's11_q1',
        num: 1,
        labelEn: 'Awareness of carbon footprint',
        labelTa: 'கார்பன் தடம் (Carbon Footprint) விழிப்புணர்வு',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Basic', 'No awareness'],
        optionsTa: ['அதிகம்', 'மிதமானது', 'அடிப்படை புரிதல்', 'தெரியாது']
      },
      {
        id: 's11_q2',
        num: 2,
        labelEn: 'Fossil fuel dependence',
        labelTa: 'புதைபடிவ எரிபொருள் (பெட்ரோல்/டீசல்) சார்ந்திருத்தல்',
        type: 'select',
        optionsEn: ['High', 'Moderate', 'Low', 'None'],
        optionsTa: ['மிக அதிகம்', 'மிதமானது', 'குறைவு', 'இல்லை']
      },
      {
        id: 's11_q3',
        num: 3,
        labelEn: 'Trees planted as carbon sink',
        labelTa: 'கார்பன் உறிஞ்ச மரங்கள் வளர்ப்பு',
        type: 'select',
        optionsEn: ['Substantial', 'Few', 'None', 'Planning'],
        optionsTa: ['நிறைய மரங்கள் உள்ளன', 'சில மரங்கள்', 'இல்லை', 'திட்டமிடுகிறோம்']
      },
      {
        id: 's11_q4',
        num: 4,
        labelEn: 'Composting to prevent landfill methane',
        labelTa: 'மீத்தேன் வாயுவை தடுக்க உரம் தயாரித்தல்',
        type: 'select',
        optionsEn: ['Yes', 'Partially', 'No'],
        optionsTa: ['ஆம்', 'பகுதியளவு', 'இல்லை']
      },
      {
        id: 's11_q5',
        num: 5,
        labelEn: 'Local food sourcing ratio',
        labelTa: 'உள்ளூர் உணவுப் பொருட்கள் வாங்கும் விகிதம்',
        type: 'select',
        optionsEn: ['Above 75%', '50–75%', 'Below 50%', 'Unknown'],
        optionsTa: ['75%க்கு மேல்', '50–75%', '50%க்கு கீழ்', 'தெரியவில்லை']
      },
      {
        id: 's11_q6',
        num: 6,
        labelEn: 'Energy conservation practices',
        labelTa: 'மின் சிக்கனம் மற்றும் சேமிப்பு பழக்கம்',
        type: 'select',
        optionsEn: ['Strictly practiced', 'Occasionally', 'Rarely', 'None'],
        optionsTa: ['கண்டிப்பாக பின்பற்றுகிறோம்', 'எப்போதாவது', 'அரிதாக', 'இல்லை']
      },
      {
        id: 's11_q7',
        num: 7,
        labelEn: 'Carbon reduction goals defined',
        labelTa: 'கார்பன் உமிழ்வு குறைப்பு இலக்குகள் உள்ளனவா?',
        type: 'select',
        optionsEn: ['Yes', 'Informal', 'No', 'Interested'],
        optionsTa: ['ஆம்', 'முறைசாரா திட்டம்', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's11_q8',
        num: 8,
        labelEn: 'Observed local climate changes',
        labelTa: 'உள்ளூர் காலநிலை மாற்றங்களை கவனித்துள்ளீர்களா?',
        type: 'select',
        optionsEn: ['Substantial weather shift', 'Moderate changes', 'Minimal changes', 'No changes'],
        optionsTa: ['பருவமழை/வெப்பத்தில் பெரும் மாற்றம்', 'மிதமான மாற்றம்', 'குறைவான மாற்றம்', 'மாற்றமில்லை']
      },
      {
        id: 's11_q9',
        num: 9,
        labelEn: 'Eco-friendly product procurement',
        labelTa: 'சூழல் நட்பு பொருட்கள் வாங்குதல்',
        type: 'select',
        optionsEn: ['Always prioritize', 'Sometimes', 'Rarely', 'Never'],
        optionsTa: ['முன்னுரிமை அளிக்கிறோம்', 'சில நேரங்களில்', 'அரிதாக', 'இல்லை']
      },
      {
        id: 's11_q10',
        num: 10,
        labelEn: 'Packaging waste reduction',
        labelTa: 'பேக்கிங் பிளாஸ்டிக் கழிவு குறைப்பு பழக்கம்',
        type: 'select',
        optionsEn: ['Bring own cloth bag', 'Reusable containers', 'Single-use plastic still used', 'No reduction'],
        optionsTa: ['துணிப்பை பயன்படுத்துகிறோம்', 'பாத்திரங்கள் கொண்டு செல்கிறோம்', 'ஒருமுறை பிளாஸ்டிக் பயன்பாடு', 'குறைப்பில்லை']
      },
      {
        id: 's11_q11',
        num: 11,
        labelEn: 'Transport emission reduction actions',
        labelTa: 'போக்குவரத்து உமிழ்வு குறைக்கும் நடவடிக்கைகள்',
        type: 'select',
        optionsEn: ['Cycling / Walking', 'Public transit', 'Electric vehicle', 'Carpooling', 'None'],
        optionsTa: ['நடைபயிற்சி / சைக்கிள்', 'பேருந்து', 'மின்வாகனம்', 'வாகனப் பகிர்வு', 'எதுவுமில்லை']
      },
      {
        id: 's11_q12',
        num: 12,
        labelEn: 'Renewable energy share',
        labelTa: 'புதுப்பிக்கத்தக்க ஆற்றல் பங்கு',
        type: 'select',
        optionsEn: ['Over 50%', '20–50%', 'Below 20%', 'Zero'],
        optionsTa: ['50%க்கு மேல்', '20–50%', '20%க்கு கீழ்', 'பூஜ்ஜியம்']
      },
      {
        id: 's11_q13',
        num: 13,
        labelEn: 'Interest in carbon credits or offset',
        labelTa: 'கார்பன் கிரெடிட் / ஈடுசெய்வதில் ஆர்வம்',
        type: 'select',
        optionsEn: ['High interest', 'Somewhat interested', 'Not interested', 'Need explanation'],
        optionsTa: ['மிகுந்த ஆர்வம்', 'ஓரளவு ஆர்வம்', 'ஆர்வமில்லை', 'விளக்கம் தேவை']
      },
      {
        id: 's11_q14',
        num: 14,
        labelEn: 'Participation in climate workshops',
        labelTa: 'காலநிலை விழிப்புணர்வு கருத்தரங்குகளில் பங்கேற்பு',
        type: 'select',
        optionsEn: ['Attended', 'Interested to attend', 'Never attended'],
        optionsTa: ['பங்கேற்றுள்ளேன்', 'பங்கேற்க ஆர்வம்', 'பங்கேற்றதில்லை']
      },
      {
        id: 's11_q15',
        num: 15,
        labelEn: 'Green building or cool roof techniques',
        labelTa: 'குளிர் கூரை (Cool Roof) / பசுமை கட்டட முறை',
        type: 'select',
        optionsEn: ['Adopted', 'Partially', 'Planned', 'None'],
        optionsTa: ['செயல்படுத்தியுள்ளோம்', 'பகுதியளவு', 'திட்டமிடுகிறோம்', 'எதுவுமில்லை']
      },
      {
        id: 's11_q16',
        num: 16,
        labelEn: 'Methane mitigation in agriculture/livestock',
        labelTa: 'விவசாயத்தில் மீத்தேன் உமிழ்வு குறைப்பு (DSR/AWD முறை)',
        type: 'select',
        optionsEn: ['Practiced', 'Partial', 'Not applicable', 'Unknown'],
        optionsTa: ['பின்பற்றுகிறோம்', 'பகுதியளவு', 'பொருந்தாது', 'தெரியவில்லை']
      },
      {
        id: 's11_q17',
        num: 17,
        labelEn: 'Circular economy practices (reuse / repair)',
        labelTa: 'பொருட்களை பழுதுபார்த்து மறுபயன்பாடு செய்தல்',
        type: 'select',
        optionsEn: ['Extensively', 'Frequently', 'Rarely', 'Never'],
        optionsTa: ['அதிகளவில்', 'அடிக்கடி', 'அரிதாக', 'செய்வதில்லை']
      },
      {
        id: 's11_q18',
        num: 18,
        labelEn: 'Water heating emissions reduction',
        labelTa: 'சூரிய சக்தி வாட்டர் ஹீட்டர் பயன்பாடு',
        type: 'select',
        optionsEn: ['Solar water heater', 'Electric geyser', 'Firewood/gas', 'Cold water only'],
        optionsTa: ['சோலார் வாட்டர் ஹீட்டர்', 'எலக்ட்ரிக் கீசர்', 'விறகு / கேஸ்', 'சுடுநீர் பயன்பாடில்லை']
      },
      {
        id: 's11_q19',
        num: 19,
        labelEn: 'Green procurement standards',
        labelTa: 'சுற்றுச்சூழல் சான்றளிக்கப்பட்ட பொருட்கள் தேர்வு',
        type: 'select',
        optionsEn: ['Yes', 'Sometimes', 'No'],
        optionsTa: ['ஆம்', 'சில நேரங்களில்', 'இல்லை']
      },
      {
        id: 's11_q20',
        num: 20,
        labelEn: 'Carbon audit readiness',
        labelTa: 'கார்பன் தணிக்கை மேற்கொள்ள தயார்நிலை',
        type: 'select',
        optionsEn: ['Ready', 'Need guidance', 'Not now'],
        optionsTa: ['தயாராக உள்ளோம்', 'வழிகாட்டுதல் தேவை', 'தற்போது இல்லை']
      },
      {
        id: 's11_q21',
        num: 21,
        labelEn: 'Community climate mitigation action',
        labelTa: 'கிராம / பகுதி அளவிலான காலநிலை திட்டம்',
        type: 'select',
        optionsEn: ['Active', 'Planned', 'None'],
        optionsTa: ['செயலில் உள்ளது', 'திட்டமிடப்பட்டுள்ளது', 'இல்லை']
      },
      {
        id: 's11_q22',
        num: 22,
        labelEn: 'Emissions tracking tools used',
        labelTa: 'உமிழ்வு அளவிடும் செயலிகள் / கணக்கீடு பயன்பாடு',
        type: 'select',
        optionsEn: ['Yes', 'No', 'Interested in ECOPOLY.LIFE'],
        optionsTa: ['ஆம்', 'இல்லை', 'ECOPOLY.LIFE மூலம் அறிய விருப்பம்']
      },
      {
        id: 's11_q23',
        num: 23,
        labelEn: 'Main barrier to carbon reduction',
        labelTa: 'கார்பன் உமிழ்வு குறைப்பில் முக்கிய தடை',
        type: 'select',
        optionsEn: ['Cost / Investment', 'Lack of alternatives', 'Convenience', 'Lack of awareness', 'Other'],
        optionsTa: ['முதலீட்டு செலவு', 'மாற்று வழிகள் இன்மை', 'வசதி பழக்கம்', 'போதிய விழிப்புணர்வின்மை', 'பிற']
      },
      {
        id: 's11_q24',
        num: 24,
        labelEn: 'Priority climate action',
        labelTa: 'முன்னுரிமை காலநிலை நடவடிக்கை',
        type: 'select',
        optionsEn: ['Solar energy', 'Tree planting', 'Waste composting', 'Electric mobility', 'Energy saving appliances', 'Other'],
        optionsTa: ['சூரிய மின்சக்தி', 'மரக்கன்றுகள் நடுதல்', 'கழிவு உரம் தயாரித்தல்', 'மின்சார வாகனம்', 'மின் சேமிப்பு உபகரணங்கள்', 'பிற']
      },
      {
        id: 's11_q25',
        num: 25,
        labelEn: 'Commitment to net-zero pathway',
        labelTa: 'கார்பன் நடுநிலை (Net-Zero) இலக்குக்கு ஆதரவு',
        type: 'select',
        optionsEn: ['Committed', 'Interested', 'Already working on it', 'Need more info'],
        optionsTa: ['ஆதரவளிக்கிறோம்', 'ஆர்வமுள்ளது', 'ஏற்கனவே செயலாற்றுகிறோம்', 'கூடுதல் விவரம் தேவை']
      }
    ]
  },
  {
    id: 'sector_12',
    sectorNumber: 12,
    titleEn: 'Sector 12 – Community & Environmental Governance',
    titleTa: 'பிரிவு 12 – சமுதாயம் & சுற்றுச்சூழல் ஆளுகை',
    descriptionEn: 'Panchayat eco-initiatives, lake/canal rejuvenation, plastic ban compliance, SHG green leadership, and civic participation.',
    descriptionTa: 'ஊராட்சி சுற்றுச்சூழல் திட்டங்கள், ஏரி/குளம் தூர்வாருதல், பிளாஸ்டிக் தடை, மகளிர் குழுக்களின் பங்களிப்பு மற்றும் மக்கள் பங்கேற்பு.',
    iconName: 'Users',
    questions: [
      {
        id: 's12_q1',
        num: 1,
        labelEn: 'Local panchayat / ward environmental initiatives',
        labelTa: 'உள்ளூர் ஊராட்சி / வார்டு சுற்றுச்சூழல் திட்டங்கள்',
        type: 'select',
        optionsEn: ['Very active', 'Occasionally active', 'Inactive', 'Unknown'],
        optionsTa: ['மிக தீவிரமாக நடைபெறுகிறது', 'எப்போதாவது', 'செயல்பாடில்லை', 'தெரியவில்லை']
      },
      {
        id: 's12_q2',
        num: 2,
        labelEn: 'Protection of common water bodies (ponds/lakes)',
        labelTa: 'பொது நீர்நிலைகள் (குளம், கண்மாய்) பாதுகாப்பு',
        type: 'select',
        optionsEn: ['Well protected & desilted', 'Partially protected', 'Encroached / Polluted', 'Unknown'],
        optionsTa: ['நன்கு தூர்வாரி பராமரிக்கப்படுகிறது', 'பகுதியளவு பாதுகாப்பு', 'ஆக்கிரமிப்பு / மாசுபட்டுள்ளது', 'தெரியவில்லை']
      },
      {
        id: 's12_q3',
        num: 3,
        labelEn: 'Communal clean-up drives',
        labelTa: 'கூட்டுத் தூய்மைப் பணிகள் (சுவச் பாரத் / உழவாரப்பணி)',
        type: 'select',
        optionsEn: ['Regularly held', 'Occasionally held', 'Never held', 'Participate actively'],
        optionsTa: ['வழக்கமாக நடைபெறுகிறது', 'எப்போதாவது', 'நடைபெறுவதில்லை', 'தீவிரமாக பங்கேற்கிறோம்']
      },
      {
        id: 's12_q4',
        num: 4,
        labelEn: 'Green volunteerism in locality',
        labelTa: 'உள்ளூர் பசுமை தொண்டர்கள் பங்களிப்பு',
        type: 'select',
        optionsEn: ['Active youth / SHG groups', 'Few volunteers', 'None', 'Interested to form group'],
        optionsTa: ['இளைஞர் / மகளிர் குழுக்கள் தீவிரமாக', 'சிலர் மட்டும்', 'இல்லை', 'குழு அமைக்க ஆர்வம்']
      },
      {
        id: 's12_q5',
        num: 5,
        labelEn: 'Environmental laws & ban awareness',
        labelTa: 'சுற்றுச்சூழல் சட்டங்கள் & பிளாஸ்டிக் தடை விழிப்புணர்வு',
        type: 'select',
        optionsEn: ['Good awareness', 'Basic awareness', 'Low awareness', 'No awareness'],
        optionsTa: ['நன்கு அறிவோம்', 'அடிப்படை புரிதல்', 'குறைவான அறிவு', 'தெரியாது']
      },
      {
        id: 's12_q6',
        num: 6,
        labelEn: 'Sacred groves or common lands protection',
        labelTa: 'கோவில் காடுகள் (Sacred Groves) / பொது நிலங்கள் பாதுகாப்பு',
        type: 'select',
        optionsEn: ['Protected by community', 'Partially protected', 'Degraded', 'None nearby'],
        optionsTa: ['சமூகத்தால் பாதுகாக்கப்படுகிறது', 'பகுதியளவு', 'சீர்குலைந்துள்ளது', 'அருகில் இல்லை']
      },
      {
        id: 's12_q7',
        num: 7,
        labelEn: 'SHG green enterprise involvement',
        labelTa: 'சுய உதவிக் குழுக்களின் பசுமை தொழில் (மஞ்சப்பை, இயற்கை உரம்)',
        type: 'select',
        optionsEn: ['Active in green products', 'Interested in starting', 'Not involved', 'Not applicable'],
        optionsTa: ['பசுமை தொழில் செய்கிறார்கள்', 'தொடங்க ஆர்வம்', 'ஈடுபடவில்லை', 'பொருந்தாது']
      },
      {
        id: 's12_q8',
        num: 8,
        labelEn: 'School / college eco-clubs active in village',
        labelTa: 'பள்ளி / கல்லூரி தேசிய பசுமைப் படை (Eco-Club) செயல்பாடுகள்',
        type: 'select',
        optionsEn: ['Very active', 'Somewhat active', 'Not active', 'Unknown'],
        optionsTa: ['மிகவும் சுறுசுறுப்பாக', 'ஓரளவு செயல்பாடு', 'செயல்பாடில்லை', 'தெரியவில்லை']
      },
      {
        id: 's12_q9',
        num: 9,
        labelEn: 'Single-use plastic ban enforcement',
        labelTa: 'ஒருமுறை பயன்படுத்தும் பிளாஸ்டிக் தடை அமலாக்கம்',
        type: 'select',
        optionsEn: ['Strictly enforced', 'Partially enforced', 'Ignored', 'Unknown'],
        optionsTa: ['கண்டிப்பாக அமல்படுத்தப்படுகிறது', 'பகுதியளவு அமல்', 'கண்டுகொள்ளப்படுவதில்லை', 'தெரியவில்லை']
      },
      {
        id: 's12_q10',
        num: 10,
        labelEn: 'Environmental grievance redressal system',
        labelTa: 'சுற்றுச்சூழல் புகார்கள் தெரிவிக்கும் வசதி (Panchayat / CPGRAMS)',
        type: 'select',
        optionsEn: ['Effective & responsive', 'Slow response', 'No mechanism', 'Unknown'],
        optionsTa: ['விரைவான தீர்வு கிடைக்கிறது', 'தாமதமான தீர்வு', 'புகார் வசதி இல்லை', 'தெரியவில்லை']
      },
      {
        id: 's12_q11',
        num: 11,
        labelEn: 'Community tree plantation drives',
        labelTa: 'கூட்டு மரக்கன்று நடும் விழாக்கள்',
        type: 'select',
        optionsEn: ['Every year', 'Occasionally', 'Never', 'Participate actively'],
        optionsTa: ['ஆண்டுதோறும் நடக்கிறது', 'எப்போதாவது', 'நடந்ததில்லை', 'ஆர்வத்துடன் பங்கேற்கிறோம்']
      },
      {
        id: 's12_q12',
        num: 12,
        labelEn: 'Water sharing & dispute resolution',
        labelTa: 'நீர்ப்பாசன பகிர்வு & நீர் தகராறு தீர்வு முறை',
        type: 'select',
        optionsEn: ['Harmonious / Neerani system', 'Informal agreements', 'Frequent disputes', 'Not applicable'],
        optionsTa: ['நீராணிக்காரர் முறை / சுமூகமானது', 'முறைசாரா உடன்பாடு', 'தகராறுகள் ஏற்படுகின்றன', 'பொருந்தாது']
      },
      {
        id: 's12_q13',
        num: 13,
        labelEn: 'Community composting or biogas facility',
        labelTa: 'சமூக பொது உரம் அல்லது பயோ-கேஸ் ஆலை',
        type: 'select',
        optionsEn: ['Available & functioning', 'Constructed but defunct', 'None', 'Planning to request'],
        optionsTa: ['செயல்படுகிறது', 'கட்டப்பட்டு முடங்கியுள்ளது', 'இல்லை', 'கோரிக்கை வைக்க திட்டம்']
      },
      {
        id: 's12_q14',
        num: 14,
        labelEn: 'Public sanitation campaigns',
        labelTa: 'பொது சுகாதார விழிப்புணர்வு பிரச்சாரங்கள்',
        type: 'select',
        optionsEn: ['Regularly', 'Occasionally', 'Never', 'Well maintained'],
        optionsTa: ['வழக்கமாக', 'எப்போதாவது', 'இல்லை', 'நன்கு பராமரிக்கப்படுகிறது']
      },
      {
        id: 's12_q15',
        num: 15,
        labelEn: 'Eco-tourism or cultural nature heritage',
        labelTa: 'சூழல் சுற்றுலா / இயற்கை பாரம்பரிய பாதுகாப்பு',
        type: 'select',
        optionsEn: ['Promoted sustainably', 'Potential exists', 'Degraded', 'None'],
        optionsTa: ['பாதுகாப்பாக மேம்படுத்தப்படுகிறது', 'வாய்ப்புள்ளது', 'பாதிக்கப்பட்டுள்ளது', 'இல்லை']
      },
      {
        id: 's12_q16',
        num: 16,
        labelEn: 'Community participation in Gram Sabha meetings',
        labelTa: 'கிராம சபை கூட்டங்களில் சுற்றுச்சூழல் விவாதம்',
        type: 'select',
        optionsEn: ['Actively discussed & resolved', 'Discussed occasionally', 'Rarely discussed', 'Never attended'],
        optionsTa: ['தீவிரமாக விவாதிக்கப்பட்டு தீர்வு', 'எப்போதாவது விவாதம்', 'விவாதிக்கப்படுவதில்லை', 'பங்கேற்றதில்லை']
      },
      {
        id: 's12_q17',
        num: 17,
        labelEn: 'Local environmental leadership',
        labelTa: 'உள்ளூர் சுற்றுச்சூழல் முன்னோடிகள் / தலைவர்கள்',
        type: 'select',
        optionsEn: ['Strong local champions', 'Few individuals', 'None', 'Youth showing interest'],
        optionsTa: ['முன்னோடி தலைவர்கள் உள்ளனர்', 'சிலர் மட்டும்', 'யாரும் இல்லை', 'இளைஞர்கள் ஆர்வம் காட்டுகின்றனர்']
      },
      {
        id: 's12_q18',
        num: 18,
        labelEn: 'Women leadership in environmental conservation',
        labelTa: 'சுற்றுச்சூழல் பாதுகாப்பில் பெண்கள் தலைமைத்துவம்',
        type: 'select',
        optionsEn: ['High participation & leadership', 'Moderate', 'Low', 'None'],
        optionsTa: ['அதிக தலைமைத்துவ பங்களிப்பு', 'மிதமானது', 'குறைவு', 'இல்லை']
      },
      {
        id: 's12_q19',
        num: 19,
        labelEn: 'Traditional ecological knowledge preserved',
        labelTa: 'பாரம்பரிய இயற்கை பாதுகாப்பு முறை பேணப்படுதல்',
        type: 'select',
        optionsEn: ['Well preserved & practiced', 'Partially remembered', 'Forgotten', 'Being revived'],
        optionsTa: ['முறையாக பின்பற்றப்படுகிறது', 'பகுதியளவு நினைவில்', 'மறக்கப்பட்டுவிட்டது', 'மீண்டும் புத்துயிர் பெறுகிறது']
      },
      {
        id: 's12_q20',
        num: 20,
        labelEn: 'Farmer Producer Organisations (FPO) eco-practices',
        labelTa: 'விவசாய உற்பத்தியாளர் நிறுவனங்கள் (FPO) இயற்கை முறை',
        type: 'select',
        optionsEn: ['Promoting organic & sustainable', 'Standard commercial', 'Not member', 'Not applicable'],
        optionsTa: ['இயற்கை முறையை ஊக்குவிக்கிறார்கள்', 'வழக்கமான வர்த்தகம்', 'உறுப்பினர் இல்லை', 'பொருந்தாது']
      },
      {
        id: 's12_q21',
        num: 21,
        labelEn: 'Transparency in local environmental spending',
        labelTa: 'சுற்றுச்சூழல் நிதி பயன்பாட்டில் வெளிப்படைத்தன்மை',
        type: 'select',
        optionsEn: ['Transparent', 'Moderate', 'Low transparency', 'Unknown'],
        optionsTa: ['வெளிப்படையானது', 'மிதமானது', 'குறைவான வெளிப்படைத்தன்மை', 'தெரியவில்லை']
      },
      {
        id: 's12_q22',
        num: 22,
        labelEn: 'Environmental education in village',
        labelTa: 'கிராமத்தில் சுற்றுச்சூழல் கல்வி மற்றும் பயிற்சிகள்',
        type: 'select',
        optionsEn: ['Frequent programs', 'Occasional', 'None', 'Interested'],
        optionsTa: ['அடிக்கடி பயிற்சிகள்', 'எப்போதாவது', 'இல்லை', 'ஆர்வமுள்ளது']
      },
      {
        id: 's12_q23',
        num: 23,
        labelEn: 'Main governance challenge',
        labelTa: 'சுற்றுச்சூழல் ஆளுகையில் முதன்மை சவால்',
        type: 'select',
        optionsEn: ['Lack of enforcement', 'Insufficient funds', 'Low public cooperation', 'Political interference', 'Lack of awareness', 'Other'],
        optionsTa: ['சட்ட அமலாக்கமின்மை', 'நிதி பற்றாக்குறை', 'பொதுமக்கள் ஒத்துழைப்பின்மை', 'அரசியல் தலையீடுகள்', 'விழிப்புணர்வின்மை', 'பிற']
      },
      {
        id: 's12_q24',
        num: 24,
        labelEn: 'Priority governance improvement',
        labelTa: 'முன்னுரிமை சமுதாய சீரமைப்பு தேவை',
        type: 'select',
        optionsEn: ['Water body rejuvenation', 'Waste collection infrastructure', 'Strict plastic ban', 'Eco-club promotion', 'Green incentives', 'Other'],
        optionsTa: ['நீர்நிலைகள் தூர்வாருதல்', 'முறையான குப்பை சேகரிப்பு கட்டமைப்பு', 'பிளாஸ்டிக் தடை அமல்', 'பசுமை மன்றங்கள் ஊக்குவிப்பு', 'பசுமை ஊக்கத்தொகை', 'பிற']
      },
      {
        id: 's12_q25',
        num: 25,
        labelEn: 'Willingness to join ECOPOLY Community Council',
        labelTa: 'ECOPOLY சமுதாய பசுமை மன்றத்தில் இணைய விருப்பம்',
        type: 'select',
        optionsEn: ['Yes, definitely', 'Interested in details', 'Maybe later', 'Not now'],
        optionsTa: ['ஆம், கண்டிப்பாக இணைவோம்', 'விவரங்களை அறிய ஆர்வம்', 'பின்னர் ஒருவேளை', 'தற்போது இல்லை']
      }
    ]
  }
];

export const STAGE_CONFIG = [
  {
    num: 1,
    titleEn: 'Surveyor & Respondent',
    titleTa: 'கள ஆய்வாளர் & பதிலளிப்பவர்',
    shortEn: 'Registration',
    shortTa: 'பதிவு'
  },
  {
    num: 2,
    titleEn: 'Property & Location',
    titleTa: 'சொத்து & நில அமைவிடம்',
    shortEn: 'Properties',
    shortTa: 'சொத்துக்கள்'
  },
  {
    num: 3,
    titleEn: 'Assessment: Sectors 01–04',
    titleTa: 'ஆய்வு: பிரிவுகள் 01–04',
    shortEn: 'Sectors 01–04',
    shortTa: 'பிரிவு 01-04'
  },
  {
    num: 4,
    titleEn: 'Assessment: Sectors 05–08',
    titleTa: 'ஆய்வு: பிரிவுகள் 05–08',
    shortEn: 'Sectors 05–08',
    shortTa: 'பிரிவு 05-08'
  },
  {
    num: 5,
    titleEn: 'Assessment: Sectors 09–12',
    titleTa: 'ஆய்வு: பிரிவுகள் 09–12',
    shortEn: 'Sectors 09–12',
    shortTa: 'பிரிவு 09-12'
  },
  {
    num: 6,
    titleEn: 'Evidence, Measurements & Samples',
    titleTa: 'சான்றுகள், அளவீடுகள் & மாதிரிகள்',
    shortEn: 'Samples & Evidence',
    shortTa: 'மாதிரிகள்'
  },
  {
    num: 7,
    titleEn: 'Review, Confirmation & Submission',
    titleTa: 'மதிப்பாய்வு, கையொப்பம் & சமர்ப்பித்தல்',
    shortEn: 'Submission',
    shortTa: 'சமர்ப்பிப்பு'
  }
];
