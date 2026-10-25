const legalTerms = [
  {
    term: "Bail",
    translations: {
      english: "Bail",
      malayalam: "ജാമ്യം",
      hindi: "जमानत",
      tamil: "பிணை",
    },
    definitions: {
      english:
        "Conditional release of an accused person while proceedings continue.",
      malayalam:
        "നിയമനടപടികൾ തുടരുന്നതിനിടെ പ്രതിയെ നിശ്ചിത നിബന്ധനകളോടെ വിട്ടയക്കുന്നതാണ് ജാമ്യം.",
      hindi:
        "कानूनी कार्यवाही जारी रहने के दौरान आरोपी को निर्धारित शर्तों पर रिहा करना जमानत कहलाता है।",
      tamil:
        "சட்ட நடவடிக்கைகள் தொடரும் நிலையில், குற்றம் சாட்டப்பட்டவரை குறிப்பிட்ட நிபந்தனைகளுடன் விடுவிப்பது பிணை எனப்படும்.",
    },
    simplifiedMeaning: {
      english:
        "Permission for an accused person to remain out of custody under specified conditions.",
      malayalam:
        "ചില നിബന്ധനകൾ പാലിച്ചുകൊണ്ട് പ്രതിക്ക് കസ്റ്റഡിക്ക് പുറത്തു കഴിയാനുള്ള അനുമതി.",
      hindi:
        "कुछ शर्तों का पालन करते हुए आरोपी को हिरासत से बाहर रहने की अनुमति।",
      tamil:
        "சில நிபந்தனைகளைப் பின்பற்றி, குற்றம் சாட்டப்பட்டவர் காவலுக்கு வெளியே இருக்க அனுமதி.",
    },
    category: "Criminal Law",
  },
  {
    term: "Anticipatory Bail",
    translations: {
      english: "Anticipatory Bail",
      malayalam: "മുൻകൂർ ജാമ്യം",
      hindi: "अग्रिम जमानत",
      tamil: "முன்பிணை",
    },
    definitions: {
      english:
        "Pre-arrest protection from arrest in circumstances allowed by law.",
      malayalam:
        "നിയമം അനുവദിക്കുന്ന സാഹചര്യങ്ങളിൽ അറസ്റ്റ് ചെയ്യപ്പെടുമെന്ന ആശങ്കയുള്ള വ്യക്തിക്ക് മുൻകൂട്ടി ലഭിക്കുന്ന ജാമ്യസംരക്ഷണം.",
      hindi:
        "कानून द्वारा अनुमत परिस्थितियों में गिरफ्तारी की आशंका होने पर पहले से प्राप्त गिरफ्तारी से संरक्षण।",
      tamil:
        "சட்டம் அனுமதிக்கும் சூழ்நிலைகளில் கைது செய்யப்படலாம் என்ற அச்சம் உள்ளவருக்கு முன்கூட்டியே வழங்கப்படும் பிணைப் பாதுகாப்பு.",
    },
    simplifiedMeaning: {
      english: "Legal protection sought in advance when a person fears arrest.",
      malayalam:
        "അറസ്റ്റ് ചെയ്യപ്പെടുമെന്ന ഭയമുള്ള ഒരാൾ മുൻകൂട്ടി തേടുന്ന നിയമസംരക്ഷണം.",
      hindi:
        "गिरफ्तारी की आशंका होने पर व्यक्ति द्वारा पहले से माँगी जाने वाली कानूनी सुरक्षा।",
      tamil:
        "கைது செய்யப்படலாம் என அஞ்சும் ஒருவர் முன்கூட்டியே கோரும் சட்டப் பாதுகாப்பு.",
    },
    category: "Criminal Law",
  },
  {
    term: "Regular Bail",
    translations: {
      english: "Regular Bail",
      malayalam: "സാധാരണ ജാമ്യം",
      hindi: "नियमित जमानत",
      tamil: "வழக்கமான பிணை",
    },
    definitions: {
      english: "Release from custody on bail after arrest.",
      malayalam:
        "അറസ്റ്റിനും കസ്റ്റഡിയിലാകുന്നതിനും ശേഷം ജാമ്യത്തിൽ വിട്ടയക്കുന്നതാണ് സാധാരണ ജാമ്യം.",
      hindi:
        "गिरफ्तारी और हिरासत में लिए जाने के बाद जमानत पर रिहा किया जाना नियमित जमानत कहलाता है।",
      tamil:
        "கைது செய்யப்பட்டு காவலில் வைக்கப்பட்ட பிறகு பிணையில் விடுவிக்கப்படுவது வழக்கமான பிணை எனப்படும்.",
    },
    simplifiedMeaning: {
      english: "Applying to be released on bail after being arrested.",
      malayalam: "അറസ്റ്റിലായ ശേഷം ജാമ്യം നേടി പുറത്തിറങ്ങാൻ അപേക്ഷിക്കുന്നത്.",
      hindi: "गिरफ्तार होने के बाद जमानत पर रिहा होने के लिए आवेदन करना।",
      tamil: "கைது செய்யப்பட்ட பிறகு பிணையில் வெளியே வர விண்ணப்பிப்பது.",
    },
    category: "Criminal Law",
  },
  {
    term: "Bail Bond",
    translations: {
      english: "Bail Bond",
      malayalam: "ജാമ്യബോണ്ട്",
      hindi: "जमानत बंधपत्र",
      tamil: "பிணைப் பத்திரம்",
    },
    definitions: {
      english: "A bond undertaking compliance with bail requirements.",
      malayalam: "ജാമ്യത്തിലെ നിബന്ധനകൾ പാലിക്കാമെന്ന് ഉറപ്പുനൽകുന്ന ബോണ്ട്.",
      hindi: "जमानत की शर्तों का पालन करने का वचन देने वाला बंधपत्र।",
      tamil: "பிணை நிபந்தனைகளைப் பின்பற்றுவதாக உறுதியளிக்கும் பத்திரம்.",
    },
    simplifiedMeaning: {
      english: "A formal undertaking to follow the conditions of bail.",
      malayalam: "ജാമ്യനിബന്ധനകൾ പാലിക്കാമെന്ന ഔപചാരിക ഉറപ്പ്.",
      hindi: "जमानत की शर्तें मानने का औपचारिक वचन।",
      tamil:
        "பிணை நிபந்தனைகளைப் பின்பற்றுவதாக அளிக்கப்படும் முறையான உறுதிமொழி.",
    },
    category: "Criminal Law",
  },
  {
    term: "Surety",
    translations: {
      english: "Surety",
      malayalam: "ജാമ്യക്കാരൻ",
      hindi: "जमानतदार",
      tamil: "பிணையாளர்",
    },
    definitions: {
      english:
        "A person who undertakes responsibility for another person's compliance with specified conditions.",
      malayalam:
        "മറ്റൊരാൾ നിശ്ചിത നിബന്ധനകൾ പാലിക്കുമെന്ന് ഉറപ്പുനൽകുന്ന വ്യക്തി.",
      hindi:
        "वह व्यक्ति जो किसी अन्य व्यक्ति द्वारा निर्धारित शर्तों का पालन करने की जिम्मेदारी लेता है।",
      tamil:
        "மற்றொருவர் குறிப்பிட்ட நிபந்தனைகளைப் பின்பற்றுவார் எனப் பொறுப்பேற்கும் நபர்.",
    },
    simplifiedMeaning: {
      english: "A person who provides a guarantee for someone else.",
      malayalam: "മറ്റൊരാൾക്കുവേണ്ടി ഉറപ്പുനൽകുന്ന വ്യക്തി.",
      hindi: "किसी दूसरे व्यक्ति के लिए गारंटी देने वाला व्यक्ति।",
      tamil: "மற்றொருவருக்காக உத்தரவாதம் அளிக்கும் நபர்.",
    },
    category: "Criminal Law",
  },
  {
    term: "Surety Bond",
    translations: {
      english: "Surety Bond",
      malayalam: "ജാമ്യക്കാരന്റെ ബോണ്ട്",
      hindi: "जमानतदार का बंधपत्र",
      tamil: "பிணையாளரின் பிணைப் பத்திரம்",
    },
    definitions: {
      english:
        "A bond executed by a surety to secure compliance with specified obligations.",
      malayalam:
        "നിശ്ചിത ബാധ്യതകൾ പാലിക്കുമെന്ന് ഉറപ്പാക്കാൻ ജാമ്യക്കാരൻ നൽകുന്ന ബോണ്ട്.",
      hindi:
        "निर्धारित दायित्वों के पालन की गारंटी के लिए जमानतदार द्वारा दिया गया बंधपत्र।",
      tamil:
        "குறிப்பிட்ட கடமைகள் பின்பற்றப்படுவதை உறுதிசெய்ய பிணையாளர் வழங்கும் பத்திரம்.",
    },
    simplifiedMeaning: {
      english:
        "A written guarantee given by a person accepting responsibility for another.",
      malayalam:
        "മറ്റൊരാളുടെ ഉത്തരവാദിത്തം ഏറ്റെടുത്ത് ഒരാൾ നൽകുന്ന രേഖാമൂലമുള്ള ഉറപ്പ്.",
      hindi: "किसी दूसरे की जिम्मेदारी लेते हुए दिया गया लिखित आश्वासन।",
      tamil:
        "மற்றொருவருக்குப் பொறுப்பேற்று ஒருவர் வழங்கும் எழுத்துப்பூர்வ உத்தரவாதம்.",
    },
    category: "Criminal Law",
  },
  {
    term: "Petitioner",
    translations: {
      english: "Petitioner",
      malayalam: "ഹർജിക്കാരൻ",
      hindi: "याचिकाकर्ता",
      tamil: "மனுதாரர்",
    },
    definitions: {
      english: "A person who files a petition before a court.",
      malayalam: "കോടതിയിൽ ഹർജി സമർപ്പിക്കുന്ന വ്യക്തി.",
      hindi: "वह व्यक्ति जो न्यायालय में याचिका दायर करता है।",
      tamil: "நீதிமன்றத்தில் மனு தாக்கல் செய்யும் நபர்.",
    },
    simplifiedMeaning: {
      english: "The person who asks the court to consider a request.",
      malayalam:
        "ഒരു അപേക്ഷ പരിഗണിക്കണമെന്ന് കോടതിയോട് ആവശ്യപ്പെടുന്ന വ്യക്തി.",
      hindi: "वह व्यक्ति जो न्यायालय से किसी अनुरोध पर विचार करने को कहता है।",
      tamil: "ஒரு கோரிக்கையைப் பரிசீலிக்குமாறு நீதிமன்றத்தைக் கேட்கும் நபர்.",
    },
    category: "Court Proceedings",
  },
  {
    term: "Respondent",
    translations: {
      english: "Respondent",
      malayalam: "എതിർകക്ഷി",
      hindi: "प्रतिवादी",
      tamil: "எதிர்மனுதாரர்",
    },
    definitions: {
      english: "A party against whom a petition or appeal is brought.",
      malayalam: "ഒരു ഹർജിയോ അപ്പീലോ ഉന്നയിക്കപ്പെടുന്ന എതിർകക്ഷി.",
      hindi: "वह पक्ष जिसके विरुद्ध याचिका या अपील दायर की जाती है।",
      tamil: "ஒரு மனு அல்லது மேல்முறையீடு தாக்கல் செய்யப்படும் எதிர்த் தரப்பு.",
    },
    simplifiedMeaning: {
      english: "The party that must respond to a petition or appeal.",
      malayalam: "ഹർജിക്കോ അപ്പീലിനോ മറുപടി നൽകേണ്ട കക്ഷി.",
      hindi: "वह पक्ष जिसे याचिका या अपील का जवाब देना होता है।",
      tamil: "மனு அல்லது மேல்முறையீட்டிற்குப் பதிலளிக்க வேண்டிய தரப்பு.",
    },
    category: "Court Proceedings",
  },
  {
    term: "Appellant",
    translations: {
      english: "Appellant",
      malayalam: "അപ്പീലുകാരൻ",
      hindi: "अपीलकर्ता",
      tamil: "மேல்முறையீட்டாளர்",
    },
    definitions: {
      english: "A party who appeals a court decision to a higher court.",
      malayalam:
        "കോടതിയുടെ തീരുമാനത്തിനെതിരെ ഉയർന്ന കോടതിയിൽ അപ്പീൽ നൽകുന്ന കക്ഷി.",
      hindi:
        "वह पक्ष जो न्यायालय के निर्णय के विरुद्ध उच्च न्यायालय में अपील करता है।",
      tamil:
        "நீதிமன்றத் தீர்ப்பை எதிர்த்து உயர் நீதிமன்றத்தில் மேல்முறையீடு செய்யும் தரப்பு.",
    },
    simplifiedMeaning: {
      english: "The party asking a higher court to review a decision.",
      malayalam:
        "ഒരു തീരുമാനത്തെ വീണ്ടും പരിശോധിക്കണമെന്ന് ഉയർന്ന കോടതിയോട് ആവശ്യപ്പെടുന്ന കക്ഷി.",
      hindi:
        "किसी निर्णय की समीक्षा करने के लिए उच्च न्यायालय से अनुरोध करने वाला पक्ष।",
      tamil:
        "ஒரு தீர்ப்பை மறுபரிசீலனை செய்யுமாறு உயர் நீதிமன்றத்தைக் கோரும் தரப்பு.",
    },
    category: "Court Proceedings",
  },
  {
    term: "Appeal",
    translations: {
      english: "Appeal",
      malayalam: "അപ്പീൽ",
      hindi: "अपील",
      tamil: "மேல்முறையீடு",
    },
    definitions: {
      english:
        "A request for a higher court to review a lower court's decision.",
      malayalam:
        "താഴ്ന്ന കോടതിയുടെ തീരുമാനത്തെ ഉയർന്ന കോടതി പരിശോധിക്കണമെന്നുള്ള അപേക്ഷ.",
      hindi:
        "निचली अदालत के निर्णय की समीक्षा करने के लिए उच्च न्यायालय से किया गया अनुरोध।",
      tamil:
        "கீழமை நீதிமன்றத்தின் தீர்ப்பை உயர் நீதிமன்றம் மறுபரிசீலனை செய்யக் கோரும் மனு.",
    },
    simplifiedMeaning: {
      english: "Asking a higher court to reconsider a court decision.",
      malayalam:
        "കോടതിയുടെ തീരുമാനം വീണ്ടും പരിശോധിക്കണമെന്ന് ഉയർന്ന കോടതിയോട് ആവശ്യപ്പെടുന്നത്.",
      hindi:
        "किसी अदालत के फैसले पर दोबारा विचार करने के लिए उच्च अदालत से कहना।",
      tamil:
        "ஒரு நீதிமன்றத் தீர்ப்பை மீண்டும் பரிசீலிக்குமாறு உயர் நீதிமன்றத்தைக் கேட்பது.",
    },
    category: "Court Proceedings",
  },

  {
    term: "Accused",
    translations: {
      english: "Accused",
      malayalam: "പ്രതി",
      hindi: "अभियुक्त",
      tamil: "குற்றம் சாட்டப்பட்டவர்",
    },
    definitions: {
      english: "A person alleged to have committed an offence.",
      malayalam: "ഒരു കുറ്റം ചെയ്തതായി ആരോപിക്കപ്പെടുന്ന വ്യക്തി.",
      hindi: "वह व्यक्ति जिस पर किसी अपराध को करने का आरोप लगाया गया हो।",
      tamil: "ஒரு குற்றத்தைச் செய்ததாகக் குற்றம் சாட்டப்படும் நபர்.",
    },
    simplifiedMeaning: {
      english: "A person who is alleged to have committed a crime.",
      malayalam: "ഒരു കുറ്റം ചെയ്തുവെന്ന് ആരോപിക്കപ്പെടുന്ന വ്യക്തി.",
      hindi: "वह व्यक्ति जिस पर अपराध करने का आरोप है।",
      tamil: "குற்றம் செய்ததாகக் கூறப்படும் நபர்.",
    },
    category: "Criminal Law",
  },
  {
    term: "Conviction",
    translations: {
      english: "Conviction",
      malayalam: "കുറ്റസ്ഥാപനം",
      hindi: "दोषसिद्धि",
      tamil: "குற்றத் தீர்ப்பு",
    },
    definitions: {
      english:
        "A judicial determination that a person is guilty of an offence.",
      malayalam: "ഒരു വ്യക്തി കുറ്റക്കാരനാണെന്ന് കോടതി തീരുമാനിക്കുന്ന നടപടി.",
      hindi: "न्यायालय द्वारा किसी व्यक्ति को अपराध का दोषी ठहराने का निर्णय।",
      tamil: "ஒருவர் குற்றவாளி என நீதிமன்றம் தீர்மானிக்கும் முடிவு.",
    },
    simplifiedMeaning: {
      english: "When a court finds a person guilty of an offence.",
      malayalam: "ഒരു വ്യക്തി കുറ്റക്കാരനാണെന്ന് കോടതി കണ്ടെത്തുന്നത്.",
      hindi: "जब अदालत किसी व्यक्ति को अपराधी ठहराती है।",
      tamil: "ஒருவர் குற்றவாளி என நீதிமன்றம் முடிவு செய்வது.",
    },
    category: "Criminal Law",
  },
  {
    term: "Acquittal",
    translations: {
      english: "Acquittal",
      malayalam: "കുറ്റവിമുക്തി",
      hindi: "दोषमुक्ति",
      tamil: "குற்றமற்றவர் என விடுவித்தல்",
    },
    definitions: {
      english:
        "A court's decision that an accused person is not guilty of the charged offence.",
      malayalam:
        "ആരോപിക്കപ്പെട്ട കുറ്റത്തിൽ പ്രതി കുറ്റക്കാരനല്ലെന്ന് കോടതി വിധിക്കുന്ന തീരുമാനം.",
      hindi:
        "न्यायालय का वह निर्णय जिसमें आरोपी को लगाए गए अपराध में दोषी नहीं माना जाता।",
      tamil:
        "சுமத்தப்பட்ட குற்றத்தில் குற்றம் சாட்டப்பட்டவர் குற்றவாளி அல்ல என நீதிமன்றம் தீர்மானிப்பது.",
    },
    simplifiedMeaning: {
      english:
        "When a court finds that the accused has not been proved guilty of the charge.",
      malayalam:
        "ആരോപിച്ച കുറ്റം തെളിയിക്കപ്പെട്ടിട്ടില്ലെന്ന് കോടതി കണ്ടെത്തുന്നത്.",
      hindi: "जब अदालत में आरोपी के विरुद्ध लगाया गया आरोप सिद्ध नहीं होता।",
      tamil:
        "குற்றச்சாட்டு நிரூபிக்கப்படாததால் ஒருவர் குற்றவாளி அல்ல என நீதிமன்றம் முடிவு செய்வது.",
    },
    category: "Criminal Law",
  },
  {
    term: "FIR",
    translations: {
      english: "First Information Report (FIR)",
      malayalam: "പ്രഥമ വിവര റിപ്പോർട്ട്",
      hindi: "प्रथम सूचना रिपोर्ट",
      tamil: "முதல் தகவல் அறிக்கை",
    },
    definitions: {
      english:
        "A report recording information about a cognizable offence, as provided under applicable criminal procedure law.",
      malayalam:
        "ബാധകമായ ക്രിമിനൽ നടപടിക്രമ നിയമപ്രകാരം തിരിച്ചറിയാവുന്ന കുറ്റത്തെക്കുറിച്ചുള്ള വിവരം രേഖപ്പെടുത്തുന്ന റിപ്പോർട്ട്.",
      hindi:
        "लागू आपराधिक प्रक्रिया कानून के अनुसार संज्ञेय अपराध से संबंधित सूचना दर्ज करने वाली रिपोर्ट।",
      tamil:
        "பொருந்தும் குற்றவியல் நடைமுறைச் சட்டத்தின்படி, காவல்துறை நேரடியாக விசாரிக்கக்கூடிய குற்றம் தொடர்பான தகவலைப் பதிவு செய்யும் அறிக்கை.",
    },
    simplifiedMeaning: {
      english: "A police record of information about a cognizable offence.",
      malayalam:
        "തിരിച്ചറിയാവുന്ന കുറ്റത്തെക്കുറിച്ചുള്ള വിവരം രേഖപ്പെടുത്തുന്ന പോലീസ് റിപ്പോർട്ട്.",
      hindi: "संज्ञेय अपराध की सूचना दर्ज करने वाली पुलिस रिपोर्ट।",
      tamil:
        "காவல்துறையால் விசாரிக்கக்கூடிய குற்றம் பற்றிய தகவலைப் பதிவு செய்யும் அறிக்கை.",
    },
    category: "Criminal Procedure",
  },
  {
    term: "Charge Sheet",
    translations: {
      english: "Charge Sheet",
      malayalam: "കുറ്റപത്രം",
      hindi: "आरोपपत्र",
      tamil: "குற்றப்பத்திரிகை",
    },
    definitions: {
      english:
        "A police report submitted after investigation, setting out the alleged offence and supporting material where applicable.",
      malayalam:
        "അന്വേഷണത്തിനുശേഷം ആരോപിക്കപ്പെടുന്ന കുറ്റവും ബന്ധപ്പെട്ട തെളിവുകളും ഉൾപ്പെടുത്തി പോലീസ് സമർപ്പിക്കുന്ന റിപ്പോർട്ട്.",
      hindi:
        "जाँच के बाद पुलिस द्वारा प्रस्तुत की जाने वाली रिपोर्ट, जिसमें कथित अपराध और संबंधित सामग्री दी जाती है।",
      tamil:
        "விசாரணைக்குப் பிறகு, குற்றச்சாட்டு மற்றும் தொடர்புடைய ஆதாரங்களை விவரித்து காவல்துறை சமர்ப்பிக்கும் அறிக்கை.",
    },
    simplifiedMeaning: {
      english: "A report submitted by police after investigating a case.",
      malayalam: "ഒരു കേസ് അന്വേഷിച്ചശേഷം പോലീസ് സമർപ്പിക്കുന്ന റിപ്പോർട്ട്.",
      hindi: "मामले की जाँच के बाद पुलिस द्वारा दी जाने वाली रिपोर्ट।",
      tamil: "ஒரு வழக்கை விசாரித்த பிறகு காவல்துறை சமர்ப்பிக்கும் அறிக்கை.",
    },
    category: "Criminal Procedure",
  },
  {
    term: "Witness",
    translations: {
      english: "Witness",
      malayalam: "സാക്ഷി",
      hindi: "गवाह",
      tamil: "சாட்சி",
    },
    definitions: {
      english:
        "A person who gives evidence about facts relevant to legal proceedings.",
      malayalam:
        "നിയമനടപടികൾക്ക് പ്രസക്തമായ വസ്തുതകളെക്കുറിച്ച് തെളിവ് നൽകുന്ന വ്യക്തി.",
      hindi:
        "वह व्यक्ति जो कानूनी कार्यवाही से संबंधित तथ्यों के बारे में साक्ष्य देता है।",
      tamil:
        "சட்ட நடவடிக்கைகளுக்குத் தொடர்புடைய உண்மைகள் குறித்து சாட்சியம் அளிக்கும் நபர்.",
    },
    simplifiedMeaning: {
      english: "A person who tells the court what they know about a case.",
      malayalam:
        "ഒരു കേസിനെക്കുറിച്ച് അറിയാവുന്ന കാര്യങ്ങൾ കോടതിയിൽ പറയുന്ന വ്യക്തി.",
      hindi:
        "वह व्यक्ति जो किसी मामले के बारे में अपनी जानकारी अदालत को बताता है।",
      tamil:
        "ஒரு வழக்கைப் பற்றி தனக்குத் தெரிந்தவற்றை நீதிமன்றத்தில் தெரிவிக்கும் நபர்.",
    },
    category: "Court Proceedings",
  },
  {
    term: "Evidence",
    translations: {
      english: "Evidence",
      malayalam: "തെളിവ്",
      hindi: "साक्ष्य",
      tamil: "சான்று",
    },
    definitions: {
      english:
        "Material or information presented or considered to establish or disprove facts in legal proceedings.",
      malayalam:
        "നിയമനടപടികളിൽ വസ്തുതകൾ സ്ഥാപിക്കാനോ നിഷേധിക്കാനോ അവതരിപ്പിക്കുകയോ പരിഗണിക്കുകയോ ചെയ്യുന്ന വിവരങ്ങളോ വസ്തുക്കളോ.",
      hindi:
        "कानूनी कार्यवाही में तथ्यों को सिद्ध या असिद्ध करने के लिए प्रस्तुत या विचार की जाने वाली सामग्री या जानकारी।",
      tamil:
        "சட்ட நடவடிக்கைகளில் உண்மைகளை நிரூபிக்க அல்லது மறுக்க முன்வைக்கப்படும் அல்லது பரிசீலிக்கப்படும் தகவல் அல்லது பொருள்.",
    },
    simplifiedMeaning: {
      english: "Information or material used to help establish what happened.",
      malayalam:
        "എന്താണ് സംഭവിച്ചതെന്ന് മനസ്സിലാക്കാൻ സഹായിക്കുന്ന വിവരങ്ങളോ വസ്തുക്കളോ.",
      hindi:
        "क्या हुआ यह समझने या साबित करने में मदद करने वाली जानकारी या सामग्री।",
      tamil:
        "என்ன நடந்தது என்பதை அறிய அல்லது நிரூபிக்க உதவும் தகவல் அல்லது பொருள்.",
    },
    category: "Evidence Law",
  },
  {
    term: "Cross-Examination",
    translations: {
      english: "Cross-Examination",
      malayalam: "എതിർവിസ്താരം",
      hindi: "प्रतिपरीक्षा",
      tamil: "குறுக்கு விசாரணை",
    },
    definitions: {
      english:
        "Questioning a witness by the opposing party during legal proceedings.",
      malayalam: "നിയമനടപടികളിൽ എതിർകക്ഷി ഒരു സാക്ഷിയെ ചോദ്യം ചെയ്യുന്ന നടപടി.",
      hindi:
        "कानूनी कार्यवाही में विरोधी पक्ष द्वारा गवाह से प्रश्न पूछने की प्रक्रिया।",
      tamil:
        "சட்ட நடவடிக்கைகளின்போது எதிர்த் தரப்பு சாட்சியிடம் கேள்விகள் கேட்கும் நடைமுறை.",
    },
    simplifiedMeaning: {
      english: "When the opposing side questions a witness.",
      malayalam: "എതിർകക്ഷി സാക്ഷിയോട് ചോദ്യങ്ങൾ ചോദിക്കുന്നത്.",
      hindi: "जब दूसरा पक्ष गवाह से सवाल पूछता है।",
      tamil: "எதிர்த் தரப்பு சாட்சியிடம் கேள்விகள் கேட்பது.",
    },
    category: "Court Proceedings",
  },
  {
    term: "Affidavit",
    translations: {
      english: "Affidavit",
      malayalam: "സത്യവാങ്മൂലം",
      hindi: "शपथपत्र",
      tamil: "உறுதிமொழிப் பத்திரம்",
    },
    definitions: {
      english:
        "A written statement of facts sworn or affirmed by the person making it.",
      malayalam:
        "പ്രസ്താവിക്കുന്ന വ്യക്തി സത്യപ്രതിജ്ഞ ചെയ്തോ സ്ഥിരീകരിച്ചോ സമർപ്പിക്കുന്ന വസ്തുതകളുടെ രേഖാമൂലമുള്ള പ്രസ്താവന.",
      hindi:
        "तथ्यों का ऐसा लिखित बयान जिसे देने वाला व्यक्ति शपथ लेकर या पुष्टि करके प्रस्तुत करता है।",
      tamil:
        "அதை வழங்கும் நபர் உறுதிமொழி அளித்து அல்லது உறுதிப்படுத்தி சமர்ப்பிக்கும் உண்மைகள் அடங்கிய எழுத்துப்பூர்வ அறிக்கை.",
    },
    simplifiedMeaning: {
      english:
        "A written statement that a person formally confirms to be true.",
      malayalam:
        "സത്യമാണെന്ന് ഒരാൾ ഔപചാരികമായി സ്ഥിരീകരിക്കുന്ന എഴുത്തുപരമായ പ്രസ്താവന.",
      hindi: "ऐसा लिखित बयान जिसे कोई व्यक्ति औपचारिक रूप से सत्य बताता है।",
      tamil:
        "உண்மையானது என ஒருவர் முறையாக உறுதிப்படுத்தும் எழுத்துப்பூர்வ அறிக்கை.",
    },
    category: "Legal Documents",
  },
  {
    term: "Summons",
    translations: {
      english: "Summons",
      malayalam: "സമൻസ്",
      hindi: "समन",
      tamil: "அழைப்பாணை",
    },
    definitions: {
      english:
        "A formal legal notice requiring a person to appear before a court or other competent authority.",
      malayalam:
        "കോടതിയിലോ അധികാരപ്പെട്ട മറ്റൊരു സ്ഥാപനത്തിലോ ഹാജരാകാൻ ഒരാളോട് ആവശ്യപ്പെടുന്ന ഔദ്യോഗിക നിയമനോട്ടീസ്.",
      hindi:
        "किसी व्यक्ति को न्यायालय या अन्य सक्षम प्राधिकारी के समक्ष उपस्थित होने के लिए जारी की गई औपचारिक कानूनी सूचना।",
      tamil:
        "நீதிமன்றம் அல்லது உரிய அதிகார அமைப்பின் முன் ஆஜராகுமாறு ஒருவருக்கு வழங்கப்படும் முறையான சட்ட அறிவிப்பு.",
    },
    simplifiedMeaning: {
      english:
        "An official notice telling someone to appear at a specified place and time.",
      malayalam:
        "നിശ്ചിത സ്ഥലത്തും സമയത്തും ഹാജരാകണമെന്ന് അറിയിക്കുന്ന ഔദ്യോഗിക നോട്ടീസ്.",
      hindi:
        "किसी निश्चित स्थान और समय पर उपस्थित होने के लिए दिया गया आधिकारिक नोटिस।",
      tamil:
        "குறிப்பிட்ட இடத்திலும் நேரத்திலும் ஆஜராகுமாறு தெரிவிக்கும் அதிகாரப்பூர்வ அறிவிப்பு.",
    },
    category: "Court Proceedings",
  },

  {
    term: "Warrant",
    translations: {
      english: "Warrant",
      malayalam: "വാറണ്ട്",
      hindi: "वारंट",
      tamil: "கைது ஆணை",
    },
    definitions: {
      english:
        "A written order issued by a competent authority authorizing a specified legal action.",
      malayalam:
        "നിശ്ചിത നിയമനടപടി നടത്താൻ അധികാരപ്പെട്ട സ്ഥാപനം പുറപ്പെടുവിക്കുന്ന രേഖാമൂലമുള്ള ഉത്തരവ്.",
      hindi:
        "किसी निर्दिष्ट कानूनी कार्रवाई की अनुमति देने के लिए सक्षम प्राधिकारी द्वारा जारी लिखित आदेश।",
      tamil:
        "குறிப்பிட்ட சட்ட நடவடிக்கையை மேற்கொள்ள உரிய அதிகார அமைப்பு வழங்கும் எழுத்துப்பூர்வ உத்தரவு.",
    },
    simplifiedMeaning: {
      english: "An official written order authorizing a particular action.",
      malayalam:
        "ഒരു പ്രത്യേക നടപടി നടത്താൻ അനുമതി നൽകുന്ന ഔദ്യോഗിക രേഖാമൂലമുള്ള ഉത്തരവ്.",
      hindi: "किसी विशेष कार्रवाई की अनुमति देने वाला आधिकारिक लिखित आदेश।",
      tamil:
        "ஒரு குறிப்பிட்ட நடவடிக்கைக்கு அனுமதி வழங்கும் அதிகாரப்பூர்வ எழுத்துப்பூர்வ உத்தரவு.",
    },
    category: "Criminal Procedure",
  },
  {
    term: "Arrest",
    translations: {
      english: "Arrest",
      malayalam: "അറസ്റ്റ്",
      hindi: "गिरफ्तारी",
      tamil: "கைது",
    },
    definitions: {
      english:
        "The lawful act of taking a person into custody under applicable legal authority.",
      malayalam:
        "ബാധകമായ നിയമാധികാരപ്രകാരം ഒരാളെ കസ്റ്റഡിയിലെടുക്കുന്ന നിയമാനുസൃത നടപടി.",
      hindi:
        "लागू कानूनी अधिकार के अंतर्गत किसी व्यक्ति को हिरासत में लेने की वैध कार्रवाई।",
      tamil:
        "பொருந்தும் சட்ட அதிகாரத்தின் அடிப்படையில் ஒருவரைக் காவலில் எடுக்கும் சட்டபூர்வ நடவடிக்கை.",
    },
    simplifiedMeaning: {
      english: "Taking a person into custody according to law.",
      malayalam: "നിയമപ്രകാരം ഒരാളെ കസ്റ്റഡിയിലെടുക്കുന്നത്.",
      hindi: "कानून के अनुसार किसी व्यक्ति को हिरासत में लेना।",
      tamil: "சட்டப்படி ஒருவரைக் காவலில் எடுப்பது.",
    },
    category: "Criminal Procedure",
  },
  {
    term: "Custody",
    translations: {
      english: "Custody",
      malayalam: "കസ്റ്റഡി",
      hindi: "अभिरक्षा",
      tamil: "காவல்",
    },
    definitions: {
      english:
        "Legal control or detention of a person by an authorized individual or authority.",
      malayalam:
        "അധികാരപ്പെട്ട വ്യക്തിയുടെയോ സ്ഥാപനത്തിന്റെയോ നിയമപരമായ നിയന്ത്രണത്തിലോ തടങ്കലിലോ ഒരാൾ കഴിയുന്ന അവസ്ഥ.",
      hindi:
        "किसी अधिकृत व्यक्ति या प्राधिकारी के कानूनी नियंत्रण या हिरासत में रहने की स्थिति।",
      tamil:
        "அங்கீகரிக்கப்பட்ட நபர் அல்லது அதிகார அமைப்பின் சட்டபூர்வக் கட்டுப்பாட்டில் அல்லது காவலில் ஒருவர் இருக்கும் நிலை.",
    },
    simplifiedMeaning: {
      english:
        "Being under the control or supervision of a legally authorized authority.",
      malayalam:
        "നിയമപരമായി അധികാരമുള്ള സ്ഥാപനത്തിന്റെ നിയന്ത്രണത്തിലോ മേൽനോട്ടത്തിലോ കഴിയുന്നത്.",
      hindi:
        "कानूनी अधिकार रखने वाले प्राधिकारी के नियंत्रण या निगरानी में होना।",
      tamil:
        "சட்ட அதிகாரம் கொண்ட அமைப்பின் கட்டுப்பாட்டில் அல்லது கண்காணிப்பில் இருப்பது.",
    },
    category: "Criminal Procedure",
  },
  {
    term: "Investigation",
    translations: {
      english: "Investigation",
      malayalam: "അന്വേഷണം",
      hindi: "जाँच",
      tamil: "விசாரணை",
    },
    definitions: {
      english:
        "The process of collecting and examining information and evidence relating to an alleged offence.",
      malayalam:
        "ആരോപിക്കപ്പെട്ട കുറ്റവുമായി ബന്ധപ്പെട്ട വിവരങ്ങളും തെളിവുകളും ശേഖരിച്ച് പരിശോധിക്കുന്ന നടപടി.",
      hindi:
        "कथित अपराध से संबंधित जानकारी और साक्ष्य एकत्र करने तथा उनकी जाँच करने की प्रक्रिया।",
      tamil:
        "குற்றச்சாட்டுடன் தொடர்புடைய தகவல்கள் மற்றும் சான்றுகளைச் சேகரித்து ஆய்வு செய்யும் நடைமுறை.",
    },
    simplifiedMeaning: {
      english:
        "Finding out the facts of a case by gathering and checking evidence.",
      malayalam:
        "തെളിവുകൾ ശേഖരിച്ച് പരിശോധിച്ച് ഒരു കേസിലെ വസ്തുതകൾ കണ്ടെത്തുന്നത്.",
      hindi: "साक्ष्य जुटाकर और जाँचकर मामले के तथ्यों का पता लगाना।",
      tamil:
        "சான்றுகளைச் சேகரித்து ஆய்வு செய்து வழக்கின் உண்மைகளைக் கண்டறிதல்.",
    },
    category: "Criminal Procedure",
  },
  {
    term: "Prosecution",
    translations: {
      english: "Prosecution",
      malayalam: "പ്രോസിക്യൂഷൻ",
      hindi: "अभियोजन",
      tamil: "குற்றவழக்கு தொடர்தல்",
    },
    definitions: {
      english:
        "The legal process of presenting a criminal case against an accused person on behalf of the state or other legally authorized party.",
      malayalam:
        "സംസ്ഥാനത്തിനുവേണ്ടിയോ നിയമപരമായി അധികാരപ്പെടുത്തിയ കക്ഷിക്കുവേണ്ടിയോ പ്രതിക്കെതിരെ ക്രിമിനൽ കേസ് കോടതിയിൽ അവതരിപ്പിക്കുന്ന നടപടി.",
      hindi:
        "राज्य या अन्य अधिकृत पक्ष की ओर से आरोपी के विरुद्ध आपराधिक मामला प्रस्तुत करने की कानूनी प्रक्रिया।",
      tamil:
        "அரசின் சார்பிலோ சட்டப்படி அதிகாரம் பெற்ற தரப்பின் சார்பிலோ குற்றம் சாட்டப்பட்டவருக்கு எதிராகக் குற்றவழக்கை முன்வைக்கும் சட்ட நடைமுறை.",
    },
    simplifiedMeaning: {
      english:
        "The legal side that presents a criminal case against the accused.",
      malayalam:
        "പ്രതിക്കെതിരായ ക്രിമിനൽ കേസ് കോടതിയിൽ അവതരിപ്പിക്കുന്ന നിയമനടപടിയുടെ ഭാഗം.",
      hindi:
        "आरोपी के विरुद्ध आपराधिक मामला अदालत में प्रस्तुत करने वाला पक्ष।",
      tamil:
        "குற்றம் சாட்டப்பட்டவருக்கு எதிராக வழக்கை நீதிமன்றத்தில் முன்வைக்கும் தரப்பு.",
    },
    category: "Criminal Law",
  },
  {
    term: "Defence",
    translations: {
      english: "Defence",
      malayalam: "പ്രതിരോധം",
      hindi: "बचाव पक्ष",
      tamil: "தற்காப்புத் தரப்பு",
    },
    definitions: {
      english:
        "The arguments and legal representation used to answer or challenge allegations in legal proceedings.",
      malayalam:
        "നിയമനടപടികളിലെ ആരോപണങ്ങൾക്ക് മറുപടി നൽകാനോ അവയെ ചോദ്യം ചെയ്യാനോ ഉപയോഗിക്കുന്ന വാദങ്ങളും നിയമപ്രാതിനിധ്യവും.",
      hindi:
        "कानूनी कार्यवाही में आरोपों का उत्तर देने या उन्हें चुनौती देने के लिए प्रस्तुत तर्क और कानूनी प्रतिनिधित्व।",
      tamil:
        "சட்ட நடவடிக்கைகளில் குற்றச்சாட்டுகளுக்குப் பதிலளிக்க அல்லது அவற்றை எதிர்க்க முன்வைக்கப்படும் வாதங்களும் சட்டப் பிரதிநிதித்துவமும்.",
    },
    simplifiedMeaning: {
      english:
        "The arguments and legal help used to respond to a case against someone.",
      malayalam:
        "ഒരാൾക്കെതിരായ കേസിന് മറുപടി നൽകാൻ ഉപയോഗിക്കുന്ന വാദങ്ങളും നിയമസഹായവും.",
      hindi:
        "किसी व्यक्ति के विरुद्ध मामले का जवाब देने के लिए दिए जाने वाले तर्क और कानूनी सहायता।",
      tamil:
        "ஒருவருக்கு எதிரான வழக்கிற்குப் பதிலளிக்கப் பயன்படுத்தப்படும் வாதங்களும் சட்ட உதவியும்.",
    },
    category: "Criminal Law",
  },
  {
    term: "Complaint",
    translations: {
      english: "Complaint",
      malayalam: "പരാതി",
      hindi: "शिकायत",
      tamil: "புகார்",
    },
    definitions: {
      english:
        "An allegation or statement submitted to an appropriate authority seeking legal action or relief.",
      malayalam:
        "നിയമനടപടിയോ പരിഹാരമോ ആവശ്യപ്പെട്ട് അധികാരപ്പെട്ട സ്ഥാപനത്തിന് സമർപ്പിക്കുന്ന ആരോപണമോ പ്രസ്താവനയോ.",
      hindi:
        "कानूनी कार्रवाई या राहत की माँग करते हुए उपयुक्त प्राधिकारी को दिया गया आरोप या निवेदन।",
      tamil:
        "சட்ட நடவடிக்கை அல்லது நிவாரணம் கோரி உரிய அதிகார அமைப்பிடம் அளிக்கப்படும் குற்றச்சாட்டு அல்லது அறிக்கை.",
    },
    simplifiedMeaning: {
      english:
        "A statement reporting a problem or alleged wrongdoing to an authority.",
      malayalam:
        "ഒരു പ്രശ്നമോ തെറ്റായ പ്രവൃത്തിയോ അധികാരപ്പെട്ട സ്ഥാപനത്തെ അറിയിക്കുന്ന പ്രസ്താവന.",
      hindi: "किसी समस्या या कथित गलत कार्य की सूचना प्राधिकारी को देना।",
      tamil:
        "ஒரு பிரச்சினை அல்லது தவறான செயல் குறித்து அதிகார அமைப்பிடம் தெரிவிப்பது.",
    },
    category: "Legal Procedure",
  },
  {
    term: "Jurisdiction",
    translations: {
      english: "Jurisdiction",
      malayalam: "അധികാരപരിധി",
      hindi: "अधिकारिता",
      tamil: "நீதித்துறை அதிகார வரம்பு",
    },
    definitions: {
      english:
        "The legal authority of a court or other body to hear, decide, or deal with a matter.",
      malayalam:
        "ഒരു വിഷയം പരിഗണിക്കാനും തീരുമാനിക്കാനും കൈകാര്യം ചെയ്യാനും കോടതിക്കോ മറ്റ് സ്ഥാപനത്തിനോ ഉള്ള നിയമപരമായ അധികാരം.",
      hindi:
        "किसी मामले की सुनवाई, निर्णय या निपटारा करने का न्यायालय या अन्य निकाय का कानूनी अधिकार।",
      tamil:
        "ஒரு விவகாரத்தை விசாரிக்கவும் தீர்மானிக்கவும் கையாளவும் நீதிமன்றம் அல்லது பிற அமைப்புக்கு உள்ள சட்ட அதிகாரம்.",
    },
    simplifiedMeaning: {
      english: "The matters and areas a court has legal power to deal with.",
      malayalam:
        "ഒരു കോടതിക്ക് നിയമപരമായി കൈകാര്യം ചെയ്യാൻ അധികാരമുള്ള വിഷയങ്ങളും പ്രദേശങ്ങളും.",
      hindi: "वे मामले और क्षेत्र जिन पर किसी अदालत को कानूनी अधिकार होता है।",
      tamil:
        "ஒரு நீதிமன்றம் சட்டப்படி கையாள அதிகாரம் பெற்றுள்ள வழக்குகளும் பகுதிகளும்.",
    },
    category: "Court Proceedings",
  },
  {
    term: "Petition",
    translations: {
      english: "Petition",
      malayalam: "ഹർജി",
      hindi: "याचिका",
      tamil: "மனு",
    },
    definitions: {
      english:
        "A formal written request submitted to a court or other competent authority seeking a decision or remedy.",
      malayalam:
        "ഒരു തീരുമാനമോ പരിഹാരമോ ആവശ്യപ്പെട്ട് കോടതിയിലോ അധികാരപ്പെട്ട സ്ഥാപനത്തിലോ സമർപ്പിക്കുന്ന ഔദ്യോഗിക രേഖാമൂലമുള്ള അപേക്ഷ.",
      hindi:
        "किसी निर्णय या राहत की माँग करते हुए न्यायालय या सक्षम प्राधिकारी को दिया गया औपचारिक लिखित अनुरोध।",
      tamil:
        "ஒரு தீர்வு அல்லது முடிவைக் கோரி நீதிமன்றம் அல்லது உரிய அதிகார அமைப்பிடம் சமர்ப்பிக்கப்படும் முறையான எழுத்துப்பூர்வ மனு.",
    },
    simplifiedMeaning: {
      english: "A formal request asking a court or authority to take action.",
      malayalam:
        "നടപടി സ്വീകരിക്കണമെന്ന് കോടതിയോടോ അധികാരപ്പെട്ട സ്ഥാപനത്തോടോ ഔദ്യോഗികമായി ആവശ്യപ്പെടുന്ന അപേക്ഷ.",
      hindi: "किसी अदालत या प्राधिकारी से कार्रवाई करने का औपचारिक अनुरोध।",
      tamil:
        "நடவடிக்கை எடுக்குமாறு நீதிமன்றம் அல்லது அதிகார அமைப்பிடம் முறையாகக் கோரும் மனு.",
    },
    category: "Court Proceedings",
  },
  {
    term: "Injunction",
    translations: {
      english: "Injunction",
      malayalam: "നിരോധന ഉത്തരവ്",
      hindi: "निषेधाज्ञा",
      tamil: "தடை உத்தரவு",
    },
    definitions: {
      english:
        "A court order requiring a person to do or refrain from doing a specified act.",
      malayalam:
        "ഒരു നിശ്ചിത പ്രവൃത്തി ചെയ്യാനോ ചെയ്യാതിരിക്കാനോ ഒരാളോട് നിർദേശിക്കുന്ന കോടതി ഉത്തരവ്.",
      hindi:
        "किसी व्यक्ति को कोई निर्दिष्ट कार्य करने या उससे दूर रहने का निर्देश देने वाला न्यायालय का आदेश।",
      tamil:
        "ஒரு குறிப்பிட்ட செயலைச் செய்யவோ செய்யாமல் இருக்கவோ ஒருவருக்கு நீதிமன்றம் வழங்கும் உத்தரவு.",
    },
    simplifiedMeaning: {
      english:
        "A court order telling someone to do something or stop doing something.",
      malayalam: "ഒരു കാര്യം ചെയ്യാനോ നിർത്താനോ കോടതി നൽകുന്ന ഉത്തരവ്.",
      hindi: "किसी काम को करने या रोकने का अदालत का आदेश।",
      tamil: "ஒரு செயலைச் செய்ய அல்லது நிறுத்த நீதிமன்றம் வழங்கும் உத்தரவு.",
    },
    category: "Civil Law",
  },
  
  {
    term: "Contract",
    translations: {
      english: "Contract",
      malayalam: "കരാർ",
      hindi: "अनुबंध",
      tamil: "ஒப்பந்தம்"
    },
    definitions: {
      english: "An agreement enforceable by law.",
      malayalam: "നിയമപ്രകാരം നടപ്പാക്കാൻ കഴിയുന്ന ഒരു ഉടമ്പടി.",
      hindi: "ऐसा समझौता जिसे कानून द्वारा लागू कराया जा सकता है।",
      tamil: "சட்டத்தின் மூலம் நடைமுறைப்படுத்தக்கூடிய ஓர் ஒப்பந்தம்."
    },
    simplifiedMeaning: {
      english: "An agreement that the law recognizes and can enforce.",
      malayalam: "നിയമപരമായി അംഗീകരിക്കപ്പെടുകയും നടപ്പാക്കാൻ കഴിയുകയും ചെയ്യുന്ന ഉടമ്പടി.",
      hindi: "ऐसा समझौता जिसे कानून मान्यता देता है और लागू करा सकता है।",
      tamil: "சட்டம் அங்கீகரித்து நடைமுறைப்படுத்தக்கூடிய ஒப்பந்தம்."
    },
    category: "Contract Law"
  },
  {
    term: "Breach of Contract",
    translations: {
      english: "Breach of Contract",
      malayalam: "കരാർലംഘനം",
      hindi: "अनुबंध का उल्लंघन",
      tamil: "ஒப்பந்த மீறல்"
    },
    definitions: {
      english: "Failure to perform a contractual obligation without a legally sufficient excuse.",
      malayalam: "നിയമപരമായി മതിയായ ന്യായീകരണമില്ലാതെ കരാറിലെ ബാധ്യത നിറവേറ്റാതിരിക്കുന്നത്.",
      hindi: "पर्याप्त कानूनी कारण के बिना अनुबंध में निर्धारित दायित्व पूरा न करना।",
      tamil: "சட்டப்படி போதுமான காரணமின்றி ஒப்பந்தத்தில் உள்ள கடமையை நிறைவேற்றத் தவறுதல்."
    },
    simplifiedMeaning: {
      english: "When a party fails to do what the contract requires.",
      malayalam: "കരാർ ആവശ്യപ്പെടുന്ന കാര്യം ഒരു കക്ഷി ചെയ്യാതിരിക്കുന്നത്.",
      hindi: "जब कोई पक्ष अनुबंध के अनुसार अपना काम पूरा नहीं करता।",
      tamil: "ஒப்பந்தப்படி செய்ய வேண்டிய செயலை ஒரு தரப்பு செய்யத் தவறுவது."
    },
    category: "Contract Law"
  },
  {
    term: "Consideration",
    translations: {
      english: "Consideration",
      malayalam: "പ്രതിഫലം",
      hindi: "प्रतिफल",
      tamil: "ஒப்பந்தப் பிரதிபலன்"
    },
    definitions: {
      english: "Something of value given, promised, or undertaken in exchange for a promise, as required under applicable contract law.",
      malayalam: "ബാധകമായ കരാർനിയമപ്രകാരം ഒരു വാഗ്ദാനത്തിന് പകരമായി നൽകുകയോ വാഗ്ദാനം ചെയ്യുകയോ ഏറ്റെടുക്കുകയോ ചെയ്യുന്ന മൂല്യമുള്ള കാര്യം.",
      hindi: "लागू अनुबंध कानून के अनुसार किसी वचन के बदले दिया, वादा किया या स्वीकार किया गया मूल्यवान प्रतिफल।",
      tamil: "பொருந்தும் ஒப்பந்தச் சட்டத்தின்படி, ஒரு வாக்குறுதிக்குப் பதிலாக வழங்கப்படும், வாக்களிக்கப்படும் அல்லது ஏற்றுக்கொள்ளப்படும் மதிப்புள்ள பலன்."
    },
    simplifiedMeaning: {
      english: "Something of value exchanged as part of an agreement.",
      malayalam: "ഒരു ഉടമ്പടിയുടെ ഭാഗമായി കൈമാറുന്ന മൂല്യമുള്ള കാര്യം.",
      hindi: "किसी समझौते के हिस्से के रूप में दिया या प्राप्त किया जाने वाला मूल्य।",
      tamil: "ஓர் ஒப்பந்தத்தின் பகுதியாகப் பரிமாறப்படும் மதிப்புள்ள பலன்."
    },
    category: "Contract Law"
  },
  {
    term: "Indemnity",
    translations: {
      english: "Indemnity",
      malayalam: "നഷ്ടപരിഹാര ഉറപ്പ്",
      hindi: "क्षतिपूर्ति",
      tamil: "இழப்பீட்டு உறுதி"
    },
    definitions: {
      english: "An obligation to compensate another person for specified losses or liabilities.",
      malayalam: "നിശ്ചിത നഷ്ടങ്ങൾക്കോ ബാധ്യതകൾക്കോ മറ്റൊരാൾക്ക് നഷ്ടപരിഹാരം നൽകാനുള്ള ബാധ്യത.",
      hindi: "निर्दिष्ट हानि या देनदारियों के लिए किसी अन्य व्यक्ति को क्षतिपूर्ति देने का दायित्व।",
      tamil: "குறிப்பிட்ட இழப்புகள் அல்லது பொறுப்புகளுக்காக மற்றொருவருக்கு இழப்பீடு வழங்க வேண்டிய கடமை."
    },
    simplifiedMeaning: {
      english: "A promise or obligation to cover certain losses.",
      malayalam: "ചില നഷ്ടങ്ങൾ നികത്താമെന്ന വാഗ്ദാനമോ ബാധ്യതയോ.",
      hindi: "कुछ हानियों की भरपाई करने का वादा या दायित्व।",
      tamil: "குறிப்பிட்ட இழப்புகளை ஈடுசெய்வதாக அளிக்கப்படும் வாக்குறுதி அல்லது கடமை."
    },
    category: "Contract Law"
  },
  {
    term: "Guarantee",
    translations: {
      english: "Guarantee",
      malayalam: "ഗ്യാരണ്ടി",
      hindi: "गारंटी",
      tamil: "உத்தரவாதம்"
    },
    definitions: {
      english: "An undertaking to answer for the performance or default of another person or for a specified obligation.",
      malayalam: "മറ്റൊരാളുടെ ബാധ്യത നിറവേറ്റുന്നതിനോ വീഴ്ചയ്ക്കോ ഉത്തരവാദിത്വം ഏറ്റെടുക്കുന്ന ഉറപ്പ്.",
      hindi: "किसी अन्य व्यक्ति के दायित्व के पालन या चूक के लिए जिम्मेदारी लेने का वचन।",
      tamil: "மற்றொருவரின் கடமை நிறைவேற்றப்படுவதற்கோ தவறுதலுக்கோ பொறுப்பேற்கும் உறுதிமொழி."
    },
    simplifiedMeaning: {
      english: "A promise to take responsibility if a specified obligation is not fulfilled.",
      malayalam: "ഒരു ബാധ്യത നിറവേറ്റിയില്ലെങ്കിൽ ഉത്തരവാദിത്വം ഏറ്റെടുക്കാമെന്ന ഉറപ്പ്.",
      hindi: "निर्धारित दायित्व पूरा न होने पर जिम्मेदारी लेने का वादा।",
      tamil: "குறிப்பிட்ட கடமை நிறைவேற்றப்படாவிட்டால் பொறுப்பேற்பதாக அளிக்கும் வாக்குறுதி."
    },
    category: "Contract Law"
  },
  {
    term: "Liability",
    translations: {
      english: "Liability",
      malayalam: "ബാധ്യത",
      hindi: "दायित्व",
      tamil: "பொறுப்பு"
    },
    definitions: {
      english: "A legal responsibility or obligation recognized by law.",
      malayalam: "നിയമം അംഗീകരിക്കുന്ന നിയമപരമായ ഉത്തരവാദിത്വമോ ബാധ്യതയോ.",
      hindi: "कानून द्वारा मान्यता प्राप्त कानूनी जिम्मेदारी या दायित्व।",
      tamil: "சட்டத்தால் அங்கீகரிக்கப்படும் சட்டபூர்வப் பொறுப்பு அல்லது கடமை."
    },
    simplifiedMeaning: {
      english: "A responsibility that a person or organization must meet under the law.",
      malayalam: "നിയമപ്രകാരം ഒരു വ്യക്തിയോ സ്ഥാപനമോ നിറവേറ്റേണ്ട ഉത്തരവാദിത്വം.",
      hindi: "वह जिम्मेदारी जिसे किसी व्यक्ति या संस्था को कानून के अनुसार पूरा करना होता है।",
      tamil: "சட்டப்படி ஒருவர் அல்லது நிறுவனம் நிறைவேற்ற வேண்டிய பொறுப்பு."
    },
    category: "General Law"
  },
  {
    term: "Negligence",
    translations: {
      english: "Negligence",
      malayalam: "അശ്രദ്ധ",
      hindi: "लापरवाही",
      tamil: "அலட்சியம்"
    },
    definitions: {
      english: "Failure to exercise the legally required standard of care, resulting in legally recognized harm where the required elements are established.",
      malayalam: "നിയമപരമായി ആവശ്യമായ ജാഗ്രത പാലിക്കാതിരിക്കുകയും അതിലൂടെ നിയമം അംഗീകരിക്കുന്ന ഹാനി സംഭവിക്കുകയും ചെയ്യുന്ന അവസ്ഥ; ആവശ്യമായ ഘടകങ്ങൾ തെളിയിക്കണം.",
      hindi: "कानून द्वारा अपेक्षित सावधानी न बरतना, जिससे कानूनी रूप से मान्य हानि हो और आवश्यक तत्व सिद्ध हों।",
      tamil: "சட்டம் எதிர்பார்க்கும் கவனத்தைப் பின்பற்றத் தவறி, சட்டம் அங்கீகரிக்கும் பாதிப்பு ஏற்படும் நிலை; தேவையான கூறுகள் நிரூபிக்கப்பட வேண்டும்."
    },
    simplifiedMeaning: {
      english: "Failing to take the care that the law reasonably requires.",
      malayalam: "നിയമം പ്രതീക്ഷിക്കുന്ന ആവശ്യമായ ജാഗ്രത പാലിക്കാതിരിക്കുന്നത്.",
      hindi: "कानून के अनुसार आवश्यक सावधानी न बरतना।",
      tamil: "சட்டப்படி தேவையான கவனத்தைப் பின்பற்றத் தவறுவது."
    },
    category: "Civil Law"
  },
  {
    term: "Damages",
    translations: {
      english: "Damages",
      malayalam: "നഷ്ടപരിഹാരത്തുക",
      hindi: "हर्जाना",
      tamil: "நஷ்டஈட்டுத் தொகை"
    },
    definitions: {
      english: "Monetary compensation awarded by a court for legally recognized loss or injury.",
      malayalam: "നിയമം അംഗീകരിക്കുന്ന നഷ്ടത്തിനോ ഹാനിക്കോ പകരമായി കോടതി അനുവദിക്കുന്ന പണപരമായ നഷ്ടപരിഹാരം.",
      hindi: "कानून द्वारा मान्य हानि या क्षति के लिए न्यायालय द्वारा दिया जाने वाला आर्थिक मुआवजा।",
      tamil: "சட்டம் அங்கீகரிக்கும் இழப்பு அல்லது பாதிப்புக்காக நீதிமன்றம் வழங்கும் பண இழப்பீடு."
    },
    simplifiedMeaning: {
      english: "Money awarded to compensate someone for a legally recognized loss.",
      malayalam: "നിയമം അംഗീകരിക്കുന്ന നഷ്ടത്തിന് പകരമായി ഒരാൾക്ക് നൽകുന്ന പണം.",
      hindi: "कानूनी रूप से मान्य नुकसान की भरपाई के लिए दिया जाने वाला पैसा।",
      tamil: "சட்டம் அங்கீகரிக்கும் இழப்பை ஈடுசெய்ய வழங்கப்படும் பணம்."
    },
    category: "Civil Law"
  },
  {
    term: "Specific Performance",
    translations: {
      english: "Specific Performance",
      malayalam: "കരാർ നിർവഹിക്കാനുള്ള കോടതി ഉത്തരവ്",
      hindi: "विशिष्ट पालन",
      tamil: "ஒப்பந்தத்தை குறிப்பாக நிறைவேற்றச் செய்தல்"
    },
    definitions: {
      english: "A court-ordered remedy requiring a party to perform a contractual obligation, where legally available.",
      malayalam: "നിയമപരമായി അനുവദനീയമായ സാഹചര്യത്തിൽ കരാറിലെ ബാധ്യത നിറവേറ്റാൻ ഒരു കക്ഷിയോട് കോടതി നിർദേശിക്കുന്ന പരിഹാരം.",
      hindi: "जहाँ कानून अनुमति देता है, वहाँ किसी पक्ष को अनुबंध का दायित्व पूरा करने का न्यायालय द्वारा दिया गया आदेश।",
      tamil: "சட்டம் அனுமதிக்கும் சூழலில், ஒப்பந்தக் கடமையை நிறைவேற்றுமாறு ஒரு தரப்புக்கு நீதிமன்றம் வழங்கும் தீர்வு."
    },
    simplifiedMeaning: {
      english: "A court directs a party to do what the contract requires instead of relying only on money compensation.",
      malayalam: "പണപരിഹാരത്തിന് പകരം കരാറിൽ പറഞ്ഞിരിക്കുന്ന செயൽ നിർവഹിക്കാൻ കോടതി നിർദേശിക്കുന്നത്.",
      hindi: "केवल धन मुआवजे के बजाय अदालत किसी पक्ष को अनुबंध के अनुसार कार्य करने का निर्देश देती है।",
      tamil: "பண இழப்பீட்டில் மட்டும் நம்பாமல், ஒப்பந்தப்படி செயல்படுமாறு நீதிமன்றம் உத்தரவிடுவது."
    },
    category: "Contract Law"
  },
  {
    term: "Breach of Duty",
    translations: {
      english: "Breach of Duty",
      malayalam: "കടമലംഘനം",
      hindi: "कर्तव्य का उल्लंघन",
      tamil: "கடமை மீறல்"
    },
    definitions: {
      english: "Failure to perform a duty imposed by law or recognized legal principles.",
      malayalam: "നിയമമോ അംഗീകരിക്കപ്പെട്ട നിയമതത്വങ്ങളോ ചുമത്തുന്ന കടമ നിറവേറ്റാതിരിക്കുന്നത്.",
      hindi: "कानून या मान्य कानूनी सिद्धांतों द्वारा लगाए गए कर्तव्य को पूरा न करना।",
      tamil: "சட்டம் அல்லது அங்கீகரிக்கப்பட்ட சட்டக் கொள்கைகள் விதிக்கும் கடமையை நிறைவேற்றத் தவறுதல்."
    },
    simplifiedMeaning: {
      english: "Failing to do something that the law requires a person to do.",
      malayalam: "നിയമപ്രകാരം ചെയ്യേണ്ട കാര്യം ചെയ്യാതിരിക്കുന്നത്.",
      hindi: "कानून के अनुसार आवश्यक काम न करना।",
      tamil: "சட்டப்படி செய்ய வேண்டிய செயலைச் செய்யத் தவறுவது."
    },
    category: "Civil Law"
  },
  
  {
    term: "Fundamental Rights",
    translations: {
      english: "Fundamental Rights",
      malayalam: "മൗലികാവകാശങ്ങൾ",
      hindi: "मौलिक अधिकार",
      tamil: "அடிப்படை உரிமைகள்"
    },
    definitions: {
      english: "Basic rights guaranteed by the Constitution, subject to their applicable provisions and limitations.",
      malayalam: "ഭരണഘടനയിലെ ബാധകമായ വ്യവസ്ഥകൾക്കും നിയന്ത്രണങ്ങൾക്കും വിധേയമായി ഉറപ്പുനൽകുന്ന അടിസ്ഥാന അവകാശങ്ങൾ.",
      hindi: "संविधान द्वारा उसकी लागू शर्तों और सीमाओं के अधीन सुनिश्चित किए गए बुनियादी अधिकार।",
      tamil: "அரசியலமைப்பின் பொருந்தக்கூடிய விதிகள் மற்றும் வரம்புகளுக்கு உட்பட்டு உறுதி செய்யப்படும் அடிப்படை உரிமைகள்."
    },
    simplifiedMeaning: {
      english: "Basic rights protected by the Constitution.",
      malayalam: "ഭരണഘടന സംരക്ഷിക്കുന്ന അടിസ്ഥാന അവകാശങ്ങൾ.",
      hindi: "संविधान द्वारा सुरक्षित बुनियादी अधिकार।",
      tamil: "அரசியலமைப்பால் பாதுகாக்கப்படும் அடிப்படை உரிமைகள்."
    },
    category: "Constitutional Law"
  },
  {
    term: "Constitution",
    translations: {
      english: "Constitution",
      malayalam: "ഭരണഘടന",
      hindi: "संविधान",
      tamil: "அரசியலமைப்பு"
    },
    definitions: {
      english: "The fundamental legal framework that establishes the structure, powers, and limits of government.",
      malayalam: "സർക്കാരിന്റെ ഘടനയും അധികാരങ്ങളും അവയുടെ പരിധികളും നിർവചിക്കുന്ന അടിസ്ഥാന നിയമചട്ടക്കൂട്.",
      hindi: "सरकार की संरचना, शक्तियों और सीमाओं को निर्धारित करने वाला मूल कानूनी ढाँचा।",
      tamil: "அரசின் அமைப்பு, அதிகாரங்கள் மற்றும் வரம்புகளை வரையறுக்கும் அடிப்படைச் சட்டக் கட்டமைப்பு."
    },
    simplifiedMeaning: {
      english: "The basic set of rules that explains how a country is governed.",
      malayalam: "ഒരു രാജ്യം എങ്ങനെ ഭരിക്കപ്പെടണമെന്ന് വ്യക്തമാക്കുന്ന അടിസ്ഥാന നിയമങ്ങൾ.",
      hindi: "देश का शासन कैसे चलेगा, यह बताने वाले मूल नियम।",
      tamil: "ஒரு நாடு எவ்வாறு ஆளப்பட வேண்டும் என்பதை விளக்கும் அடிப்படை விதிகள்."
    },
    category: "Constitutional Law"
  },
  {
    term: "Fundamental Duties",
    translations: {
      english: "Fundamental Duties",
      malayalam: "മൗലിക കടമകൾ",
      hindi: "मौलिक कर्तव्य",
      tamil: "அடிப்படைக் கடமைகள்"
    },
    definitions: {
      english: "Duties of citizens specified in the Constitution of India.",
      malayalam: "ഇന്ത്യൻ ഭരണഘടനയിൽ വ്യക്തമാക്കിയിട്ടുള്ള പൗരന്മാരുടെ കടമകൾ.",
      hindi: "भारत के संविधान में निर्दिष्ट नागरिकों के कर्तव्य।",
      tamil: "இந்திய அரசியலமைப்பில் குறிப்பிடப்பட்டுள்ள குடிமக்களின் கடமைகள்."
    },
    simplifiedMeaning: {
      english: "Responsibilities that the Constitution identifies for citizens.",
      malayalam: "പൗരന്മാർക്കായി ഭരണഘടന വ്യക്തമാക്കുന്ന ഉത്തരവാദിത്വങ്ങൾ.",
      hindi: "संविधान द्वारा नागरिकों के लिए बताए गए दायित्व।",
      tamil: "குடிமக்களுக்காக அரசியலமைப்பு குறிப்பிடும் பொறுப்புகள்."
    },
    category: "Constitutional Law"
  },
  {
    term: "Directive Principles of State Policy",
    translations: {
      english: "Directive Principles of State Policy",
      malayalam: "രാജ്യനയത്തിന്റെ നിർദ്ദേശക തത്വങ്ങൾ",
      hindi: "राज्य के नीति-निर्देशक तत्व",
      tamil: "அரசின் வழிகாட்டும் நெறிமுறைகள்"
    },
    definitions: {
      english: "Constitutional principles that guide the State in making laws and policies; they are not enforceable by courts in the same way as Fundamental Rights.",
      malayalam: "നിയമങ്ങളും നയങ്ങളും രൂപീകരിക്കുമ്പോൾ സംസ്ഥാനത്തെ നയിക്കുന്ന ഭരണഘടനാ തത്വങ്ങൾ; മൗലികാവകാശങ്ങളെപ്പോലെ ഇവ കോടതികളിലൂടെ നേരിട്ട് നടപ്പാക്കാൻ കഴിയില്ല.",
      hindi: "कानून और नीतियाँ बनाते समय राज्य का मार्गदर्शन करने वाले संवैधानिक सिद्धांत; इन्हें मौलिक अधिकारों की तरह न्यायालय द्वारा लागू नहीं कराया जा सकता।",
      tamil: "சட்டங்களையும் கொள்கைகளையும் உருவாக்கும்போது அரசுக்கு வழிகாட்டும் அரசியலமைப்புக் கொள்கைகள்; அடிப்படை உரிமைகளைப் போல இவற்றை நீதிமன்றத்தின் மூலம் நேரடியாகச் செயல்படுத்த முடியாது."
    },
    simplifiedMeaning: {
      english: "Guidelines in the Constitution that help the government make policies for public welfare.",
      malayalam: "പൊതുക്ഷേമത്തിനായി നയങ്ങൾ രൂപീകരിക്കാൻ സർക്കാരിനെ സഹായിക്കുന്ന ഭരണഘടനാ മാർഗനിർദ്ദേശങ്ങൾ.",
      hindi: "जनकल्याण के लिए नीतियाँ बनाने में सरकार की मदद करने वाले संवैधानिक दिशानिर्देश।",
      tamil: "பொதுநலனுக்கான கொள்கைகளை உருவாக்க அரசுக்கு உதவும் அரசியலமைப்பு வழிகாட்டுதல்கள்."
    },
    category: "Constitutional Law"
  },
  {
    term: "Writ",
    translations: {
      english: "Writ",
      malayalam: "റിട്ട്",
      hindi: "रिट",
      tamil: "நீதிப்பேராணை"
    },
    definitions: {
      english: "A formal order issued by a court exercising constitutional or other lawful authority.",
      malayalam: "ഭരണഘടനാപരമോ മറ്റ് നിയമപരമോ ആയ അധികാരം വിനിയോഗിച്ച് കോടതി പുറപ്പെടുവിക്കുന്ന ഔദ്യോഗിക ഉത്തരവ്.",
      hindi: "संवैधानिक या अन्य वैध अधिकार का प्रयोग करते हुए न्यायालय द्वारा जारी औपचारिक आदेश।",
      tamil: "அரசியலமைப்பு அல்லது பிற சட்ட அதிகாரத்தைப் பயன்படுத்தி நீதிமன்றம் வழங்கும் முறையான உத்தரவு."
    },
    simplifiedMeaning: {
      english: "A formal court order requiring or directing a particular legal action.",
      malayalam: "ഒരു പ്രത്യേക നിയമനടപടി ആവശ്യപ്പെടുകയോ നിർദേശിക്കുകയോ ചെയ്യുന്ന കോടതി ഉത്തരവ്.",
      hindi: "किसी विशेष कानूनी कार्रवाई का निर्देश देने वाला औपचारिक न्यायालय आदेश।",
      tamil: "குறிப்பிட்ட சட்ட நடவடிக்கையை மேற்கொள்ளுமாறு அறிவுறுத்தும் முறையான நீதிமன்ற உத்தரவு."
    },
    category: "Constitutional Law"
  },
  {
    term: "Habeas Corpus",
    translations: {
      english: "Habeas Corpus",
      malayalam: "ഹേബിയസ് കോർപ്പസ്",
      hindi: "बंदी प्रत्यक्षीकरण",
      tamil: "ஆட்கொணர்வு நீதிப்பேராணை"
    },
    definitions: {
      english: "A judicial remedy used to examine the legality of a person's detention.",
      malayalam: "ഒരാളുടെ തടങ്കൽ നിയമാനുസൃതമാണോ എന്ന് പരിശോധിക്കാൻ ഉപയോഗിക്കുന്ന നീതിന്യായ പരിഹാരം.",
      hindi: "किसी व्यक्ति की हिरासत की वैधता की जाँच के लिए उपयोग किया जाने वाला न्यायिक उपाय।",
      tamil: "ஒருவரின் காவல் சட்டபூர்வமானதா என்பதை ஆய்வு செய்யப் பயன்படும் நீதிமுறைத் தீர்வு."
    },
    simplifiedMeaning: {
      english: "A legal procedure through which a court examines whether someone's detention is lawful.",
      malayalam: "ഒരാളെ തടങ്കലിൽ വെച്ചിരിക്കുന്നത് നിയമാനുസൃതമാണോ എന്ന് കോടതി പരിശോധിക്കുന്ന നടപടി.",
      hindi: "किसी व्यक्ति को हिरासत में रखना कानूनी है या नहीं, इसकी जाँच करने की न्यायिक प्रक्रिया।",
      tamil: "ஒருவரைக் காவலில் வைத்திருப்பது சட்டப்படி சரியா என்பதை நீதிமன்றம் ஆய்வு செய்யும் நடைமுறை."
    },
    category: "Constitutional Law"
  },
  {
    term: "Mandamus",
    translations: {
      english: "Mandamus",
      malayalam: "മാൻഡമസ് റിട്ട്",
      hindi: "परमादेश",
      tamil: "செயலுறுத்தும் நீதிப்பேராணை"
    },
    definitions: {
      english: "A writ directing a public authority to perform a public or legal duty it is required to perform.",
      malayalam: "നിർവഹിക്കേണ്ട പൊതുകടമയോ നിയമപരമായ കടമയോ നിർവഹിക്കാൻ പൊതുഅധികാരിയെ നിർദേശിക്കുന്ന റിട്ട്.",
      hindi: "किसी सार्वजनिक प्राधिकारी को उसका आवश्यक सार्वजनिक या कानूनी कर्तव्य निभाने का निर्देश देने वाली रिट।",
      tamil: "நிறைவேற்ற வேண்டிய பொதுக் கடமை அல்லது சட்டக் கடமையைச் செய்யுமாறு பொது அதிகார அமைப்புக்கு உத்தரவிடும் நீதிப்பேராணை."
    },
    simplifiedMeaning: {
      english: "A court order telling a public authority to carry out a duty required by law.",
      malayalam: "നിയമപ്രകാരം നിർവഹിക്കേണ്ട കടമ ചെയ്യാൻ പൊതുഅധികാരിയോട് കോടതി നിർദേശിക്കുന്നത്.",
      hindi: "कानून के अनुसार आवश्यक कर्तव्य निभाने के लिए सार्वजनिक अधिकारी को दिया गया न्यायालय का आदेश।",
      tamil: "சட்டப்படி செய்ய வேண்டிய கடமையை நிறைவேற்றுமாறு பொது அதிகாரிக்கு நீதிமன்றம் வழங்கும் உத்தரவு."
    },
    category: "Constitutional Law"
  },
  {
    term: "Certiorari",
    translations: {
      english: "Certiorari",
      malayalam: "സെർഷ്യോററി റിട്ട്",
      hindi: "उत्प्रेषण",
      tamil: "ஆவணங்களை வரவழைத்து மறுஆய்வு செய்யும் நீதிப்பேராணை"
    },
    definitions: {
      english: "A writ through which a higher court may quash an order of a lower court, tribunal, or authority on legally recognized grounds.",
      malayalam: "നിയമപരമായി അംഗീകരിക്കപ്പെട്ട കാരണങ്ങളാൽ കീഴ്കോടതിയുടെയോ ട്രൈബ്യൂണലിന്റെയോ അധികാരസ്ഥാപനത്തിന്റെയോ ഉത്തരവ് റദ്ദാക്കാൻ ഉയർന്ന കോടതിക്ക് ഉപയോഗിക്കാവുന്ന റിട്ട്.",
      hindi: "कानून द्वारा मान्य आधारों पर निचली अदालत, अधिकरण या प्राधिकारी के आदेश को रद्द करने के लिए उच्च न्यायालय द्वारा जारी की जा सकने वाली रिट।",
      tamil: "சட்டம் அங்கீகரிக்கும் காரணங்களின் அடிப்படையில் கீழமை நீதிமன்றம், தீர்ப்பாயம் அல்லது அதிகார அமைப்பின் உத்தரவை ரத்து செய்ய உயர் நீதிமன்றம் பயன்படுத்தக்கூடிய நீதிப்பேராணை."
    },
    simplifiedMeaning: {
      english: "A higher court uses this writ to review and, where justified, cancel an unlawful order.",
      malayalam: "നിയമവിരുദ്ധമായ ഉത്തരവ് പരിശോധിച്ച് ആവശ്യമായ സാഹചര്യത്തിൽ റദ്ദാക്കാൻ ഉയർന്ന കോടതി ഉപയോഗിക്കുന്ന റിട്ട്.",
      hindi: "अवैध आदेश की समीक्षा करके उचित स्थिति में उसे रद्द करने के लिए उच्च न्यायालय द्वारा उपयोग की जाने वाली रिट।",
      tamil: "சட்டவிரோதமான உத்தரவை ஆய்வு செய்து, தேவையான நிலையில் ரத்து செய்ய உயர் நீதிமன்றம் பயன்படுத்தும் நீதிப்பேராணை."
    },
    category: "Constitutional Law"
  },
  {
    term: "Prohibition",
    translations: {
      english: "Prohibition",
      malayalam: "പ്രൊഹിബിഷൻ റിട്ട്",
      hindi: "प्रतिषेध",
      tamil: "தடைசெய்யும் நீதிப்பேராணை"
    },
    definitions: {
      english: "A writ issued by a higher court to prevent a lower court or tribunal from proceeding beyond its lawful jurisdiction.",
      malayalam: "നിയമപരമായ അധികാരപരിധി ലംഘിച്ച് നടപടികൾ തുടരുന്നത് തടയാൻ ഉയർന്ന കോടതി കീഴ്കോടതിക്കോ ട്രൈബ്യൂണലിനോ നൽകുന്ന റിട്ട്.",
      hindi: "निचली अदालत या अधिकरण को अपने कानूनी अधिकार क्षेत्र से बाहर कार्यवाही करने से रोकने के लिए उच्च न्यायालय द्वारा जारी रिट।",
      tamil: "சட்ட அதிகார வரம்பை மீறி நடவடிக்கைகளைத் தொடர்வதைத் தடுக்க கீழமை நீதிமன்றம் அல்லது தீர்ப்பாயத்திற்கு உயர் நீதிமன்றம் வழங்கும் நீதிப்பேராணை."
    },
    simplifiedMeaning: {
      english: "A higher court orders a lower court or tribunal not to continue a matter it has no authority to handle.",
      malayalam: "കൈകാര്യം ചെയ്യാൻ അധികാരമില്ലാത്ത വിഷയം തുടരരുതെന്ന് ഉയർന്ന കോടതി കീഴ്കോടതിയോടോ ട്രൈബ്യൂണലിനോടോ നിർദേശിക്കുന്നത്.",
      hindi: "जिस मामले को सुनने का अधिकार नहीं है, उसमें आगे न बढ़ने का निर्देश उच्च न्यायालय द्वारा देना।",
      tamil: "தனக்கு அதிகாரமில்லாத வழக்கில் தொடரக்கூடாது என கீழமை நீதிமன்றம் அல்லது தீர்ப்பாயத்திற்கு உயர் நீதிமன்றம் உத்தரவிடுவது."
    },
    category: "Constitutional Law"
  },
  {
    term: "Quo Warranto",
    translations: {
      english: "Quo Warranto",
      malayalam: "ക്വോ വാറന്റോ റിട്ട്",
      hindi: "अधिकार-पृच्छा",
      tamil: "பதவி வகிக்கும் அதிகாரத்தை வினவும் நீதிப்பேராணை"
    },
    definitions: {
      english: "A writ used to question the legal authority by which a person holds a public office.",
      malayalam: "ഒരാൾ പൊതുപദവി വഹിക്കുന്നതിനുള്ള നിയമപരമായ അധികാരത്തെ ചോദ്യം ചെയ്യാൻ ഉപയോഗിക്കുന്ന റിട്ട്.",
      hindi: "किसी व्यक्ति के सार्वजनिक पद पर बने रहने के कानूनी अधिकार को चुनौती देने के लिए उपयोग की जाने वाली रिट।",
      tamil: "ஒருவர் பொதுப் பதவியை வகிப்பதற்கான சட்ட அதிகாரத்தை வினவப் பயன்படுத்தப்படும் நீதிப்பேராணை."
    },
    simplifiedMeaning: {
      english: "A court examines whether a person is legally entitled to hold a particular public office.",
      malayalam: "ഒരു വ്യക്തിക്ക് പ്രത്യേക പൊതുപദവി നിയമപരമായി വഹിക്കാനുള്ള അവകാശമുണ്ടോ എന്ന് കോടതി പരിശോധിക്കുന്നത്.",
      hindi: "अदालत जाँच करती है कि कोई व्यक्ति किसी सार्वजनिक पद पर कानूनी रूप से नियुक्त या आसीन हो सकता है या नहीं।",
      tamil: "ஒருவர் குறிப்பிட்ட பொதுப் பதவியைச் சட்டப்படி வகிக்க உரிமையுள்ளவரா என்பதை நீதிமன்றம் ஆய்வு செய்வது."
    },
    category: "Constitutional Law"
  },
  {
    term: "Judicial Review",
    translations: {
      english: "Judicial Review",
      malayalam: "നീതിന്യായ പുനഃപരിശോധന",
      hindi: "न्यायिक समीक्षा",
      tamil: "நீதித்துறை மறுஆய்வு"
    },
    definitions: {
      english: "The power of courts to examine the constitutional or legal validity of laws, executive actions, and decisions.",
      malayalam: "നിയമങ്ങളുടെയും ഭരണനിർവഹണ നടപടികളുടെയും തീരുമാനങ്ങളുടെയും ഭരണഘടനാപരമോ നിയമപരമോ ആയ സാധുത പരിശോധിക്കാനുള്ള കോടതികളുടെ അധികാരം.",
      hindi: "कानूनों, कार्यपालिका की कार्रवाइयों और निर्णयों की संवैधानिक या कानूनी वैधता की जाँच करने की न्यायालयों की शक्ति।",
      tamil: "சட்டங்கள், நிர்வாக நடவடிக்கைகள் மற்றும் முடிவுகளின் அரசியலமைப்பு அல்லது சட்டபூர்வத் தன்மையை ஆய்வு செய்யும் நீதிமன்றங்களின் அதிகாரம்."
    },
    simplifiedMeaning: {
      english: "Courts check whether laws and government actions comply with the Constitution and law.",
      malayalam: "നിയമങ്ങളും സർക്കാർ നടപടികളും ഭരണഘടനയ്ക്കും നിയമത്തിനും അനുസൃതമാണോ എന്ന് കോടതികൾ പരിശോധിക്കുന്നത്.",
      hindi: "अदालतें जाँच करती हैं कि कानून और सरकारी कार्य संविधान तथा कानून के अनुरूप हैं या नहीं।",
      tamil: "சட்டங்களும் அரசின் நடவடிக்கைகளும் அரசியலமைப்புக்கும் சட்டத்திற்கும் ஏற்ப உள்ளனவா என நீதிமன்றங்கள் ஆய்வு செய்வது."
    },
    category: "Constitutional Law"
  },
  
  {
    term: "Civil Law",
    translations: {
      english: "Civil Law",
      malayalam: "സിവിൽ നിയമം",
      hindi: "दीवानी कानून",
      tamil: "உரிமையியல் சட்டம்"
    },
    definitions: {
      english: "The branch of law dealing primarily with disputes involving private rights, obligations, and remedies.",
      malayalam: "സ്വകാര്യ അവകാശങ്ങൾ, ബാധ്യതകൾ, പരിഹാരങ്ങൾ എന്നിവയുമായി ബന്ധപ്പെട്ട തർക്കങ്ങൾ പ്രധാനമായും കൈകാര്യം ചെയ്യുന്ന നിയമശാഖ.",
      hindi: "कानून की वह शाखा जो मुख्यतः निजी अधिकारों, दायित्वों और कानूनी उपचारों से जुड़े विवादों से संबंधित है।",
      tamil: "தனிநபர் உரிமைகள், கடமைகள் மற்றும் சட்ட நிவாரணங்கள் தொடர்பான தகராறுகளைக் கையாளும் சட்டப் பிரிவு."
    },
    simplifiedMeaning: {
      english: "Law that generally deals with disputes between individuals or organizations.",
      malayalam: "വ്യക്തികൾക്കോ സ്ഥാപനങ്ങൾക്കോ ഇടയിലുള്ള തർക്കങ്ങൾ സാധാരണയായി കൈകാര്യം ചെയ്യുന്ന നിയമം.",
      hindi: "व्यक्तियों या संस्थाओं के बीच होने वाले विवादों से सामान्यतः संबंधित कानून।",
      tamil: "தனிநபர்கள் அல்லது நிறுவனங்களுக்கு இடையிலான தகராறுகளைப் பொதுவாகக் கையாளும் சட்டம்."
    },
    category: "Civil Law"
  },
  {
    term: "Criminal Law",
    translations: {
      english: "Criminal Law",
      malayalam: "ക്രിമിനൽ നിയമം",
      hindi: "आपराधिक कानून",
      tamil: "குற்றவியல் சட்டம்"
    },
    definitions: {
      english: "The branch of law defining criminal offences and governing their investigation, prosecution, and punishment.",
      malayalam: "ക്രിമിനൽ കുറ്റങ്ങൾ നിർവചിക്കുകയും അവയുടെ അന്വേഷണവും പ്രോസിക്യൂഷനും ശിക്ഷയും നിയന്ത്രിക്കുകയും ചെയ്യുന്ന നിയമശാഖ.",
      hindi: "कानून की वह शाखा जो आपराधिक अपराधों को परिभाषित करती है और उनकी जाँच, अभियोजन तथा दंड को नियंत्रित करती है।",
      tamil: "குற்றங்களை வரையறுத்து அவற்றின் விசாரணை, வழக்குத் தொடர்தல் மற்றும் தண்டனையை ஒழுங்குபடுத்தும் சட்டப் பிரிவு."
    },
    simplifiedMeaning: {
      english: "Law that explains which acts are crimes and how they are handled and punished.",
      malayalam: "ഏതൊക്കെ പ്രവൃത്തികളാണ് കുറ്റങ്ങളെന്നും അവ എങ്ങനെ കൈകാര്യം ചെയ്യപ്പെടുകയും ശിക്ഷിക്കപ്പെടുകയും ചെയ്യുമെന്നും വ്യക്തമാക്കുന്ന നിയമം.",
      hindi: "कौन-से कार्य अपराध हैं और उनसे कैसे निपटा जाता है तथा दंड दिया जाता है, यह बताने वाला कानून।",
      tamil: "எந்தச் செயல்கள் குற்றங்கள், அவை எவ்வாறு கையாளப்பட்டு தண்டிக்கப்படுகின்றன என்பதை விளக்கும் சட்டம்."
    },
    category: "Criminal Law"
  },
  {
    term: "Tort",
    translations: {
      english: "Tort",
      malayalam: "സിവിൽ തെറ്റായ പ്രവൃത്തി",
      hindi: "अपकृत्य",
      tamil: "குடிமையியல் தவறு"
    },
    definitions: {
      english: "A civil wrong, other than a breach of contract, for which the law may provide a remedy.",
      malayalam: "കരാർലംഘനത്തിൽ നിന്ന് വ്യത്യസ്തമായ, നിയമപരമായ പരിഹാരം ലഭിക്കാവുന്ന സിവിൽ തെറ്റായ പ്രവൃത്തി.",
      hindi: "अनुबंध के उल्लंघन से अलग ऐसा दीवानी गलत कार्य जिसके लिए कानून उपचार प्रदान कर सकता है।",
      tamil: "ஒப்பந்த மீறலிலிருந்து வேறுபட்ட, சட்டத்தின் கீழ் நிவாரணம் கிடைக்கக்கூடிய குடிமையியல் தவறு."
    },
    simplifiedMeaning: {
      english: "A wrongful act that may give another person a legal right to seek compensation or another remedy.",
      malayalam: "മറ്റൊരാൾക്ക് നഷ്ടപരിഹാരമോ മറ്റൊരു നിയമപരമായ പരിഹാരമോ ആവശ്യപ്പെടാനുള്ള അവകാശം നൽകാവുന്ന തെറ്റായ പ്രവൃത്തി.",
      hindi: "ऐसा गलत कार्य जिसके कारण किसी अन्य व्यक्ति को मुआवजे या अन्य कानूनी उपाय की माँग करने का अधिकार मिल सकता है।",
      tamil: "மற்றொருவர் இழப்பீடு அல்லது பிற சட்ட நிவாரணம் கோருவதற்கான உரிமையை ஏற்படுத்தக்கூடிய தவறான செயல்."
    },
    category: "Tort Law"
  },
  {
    term: "Defamation",
    translations: {
      english: "Defamation",
      malayalam: "മാനനഷ്ടം",
      hindi: "मानहानि",
      tamil: "அவதூறு"
    },
    definitions: {
      english: "The communication of a statement that unlawfully harms another person's reputation under applicable law.",
      malayalam: "ബാധകമായ നിയമപ്രകാരം മറ്റൊരാളുടെ പ്രശസ്തിക്ക് നിയമവിരുദ്ധമായി ഹാനി വരുത്തുന്ന പ്രസ്താവന പ്രചരിപ്പിക്കൽ.",
      hindi: "लागू कानून के अंतर्गत किसी व्यक्ति की प्रतिष्ठा को अवैध रूप से नुकसान पहुँचाने वाले कथन का संप्रेषण।",
      tamil: "பொருந்தும் சட்டத்தின்படி மற்றொருவரின் நற்பெயருக்குச் சட்டவிரோதமாகத் தீங்கு விளைவிக்கும் கூற்றைத் தெரிவிப்பது."
    },
    simplifiedMeaning: {
      english: "Making or sharing a statement that unlawfully damages someone's reputation.",
      malayalam: "ഒരാളുടെ പ്രശസ്തിക്ക് നിയമവിരുദ്ധമായി ഹാനി വരുത്തുന്ന പ്രസ്താവന പറയുകയോ പ്രചരിപ്പിക്കുകയോ ചെയ്യുന്നത്.",
      hindi: "किसी की प्रतिष्ठा को अवैध रूप से नुकसान पहुँचाने वाला कथन कहना या फैलाना।",
      tamil: "ஒருவரின் நற்பெயருக்குச் சட்டவிரோதமாகத் தீங்கு விளைவிக்கும் கூற்றைக் கூறுவது அல்லது பரப்புவது."
    },
    category: "Tort Law"
  },
  {
    term: "Injunction Order",
    translations: {
      english: "Injunction Order",
      malayalam: "നിരോധന ഉത്തരവ്",
      hindi: "निषेधाज्ञा आदेश",
      tamil: "தடை உத்தரவு"
    },
    definitions: {
      english: "A judicial order directing a party to perform or refrain from a specified act.",
      malayalam: "ഒരു കക്ഷി നിശ്ചിത പ്രവൃത്തി ചെയ്യണമെന്നോ ചെയ്യരുതെന്നോ നിർദേശിക്കുന്ന കോടതി ഉത്തരവ്.",
      hindi: "किसी पक्ष को निर्दिष्ट कार्य करने या उससे दूर रहने का निर्देश देने वाला न्यायिक आदेश।",
      tamil: "ஒரு தரப்பு குறிப்பிட்ட செயலைச் செய்யவோ செய்யாமல் இருக்கவோ உத்தரவிடும் நீதிமன்ற ஆணை."
    },
    simplifiedMeaning: {
      english: "A court order requiring someone to do something or stop doing it.",
      malayalam: "ഒരു കാര്യം ചെയ്യാനോ നിർത്താനോ ഒരാളോട് കോടതി നിർദേശിക്കുന്നത്.",
      hindi: "किसी काम को करने या रोकने के लिए अदालत का आदेश।",
      tamil: "ஒரு செயலைச் செய்ய அல்லது நிறுத்துமாறு நீதிமன்றம் வழங்கும் உத்தரவு."
    },
    category: "Civil Procedure"
  },
  {
    term: "Limitation Period",
    translations: {
      english: "Limitation Period",
      malayalam: "കാലപരിധി",
      hindi: "परिसीमा अवधि",
      tamil: "காலவரம்புக் காலம்"
    },
    definitions: {
      english: "The legally prescribed period within which a proceeding or claim must be initiated, subject to applicable exceptions.",
      malayalam: "ബാധകമായ ഒഴിവുകൾക്ക് വിധേയമായി ഒരു നിയമനടപടിയോ അവകാശവാദമോ ആരംഭിക്കേണ്ട നിയമപരമായി നിശ്ചയിച്ച കാലയളവ്.",
      hindi: "लागू अपवादों के अधीन वह कानूनी अवधि जिसके भीतर कोई कार्यवाही या दावा शुरू किया जाना चाहिए।",
      tamil: "பொருந்தக்கூடிய விதிவிலக்குகளுக்கு உட்பட்டு, ஒரு வழக்கையோ கோரிக்கையையோ தொடங்க வேண்டிய சட்டத்தால் நிர்ணயிக்கப்பட்ட காலம்."
    },
    simplifiedMeaning: {
      english: "The deadline set by law for starting a legal case or claim.",
      malayalam: "ഒരു നിയമകേസ് അല്ലെങ്കിൽ അവകാശവാദം ആരംഭിക്കാൻ നിയമം നിശ്ചയിച്ച സമയപരിധി.",
      hindi: "कानूनी मामला या दावा शुरू करने के लिए कानून द्वारा तय की गई समय-सीमा।",
      tamil: "சட்ட வழக்கு அல்லது கோரிக்கையைத் தொடங்கச் சட்டம் நிர்ணயித்த காலக்கெடு."
    },
    category: "Civil Procedure"
  },
  {
    term: "Legal Heir",
    translations: {
      english: "Legal Heir",
      malayalam: "നിയമപരമായ അവകാശി",
      hindi: "कानूनी वारिस",
      tamil: "சட்டப்பூர்வ வாரிசு"
    },
    definitions: {
      english: "A person recognized under applicable law as entitled to inherit or succeed to another person's estate or rights.",
      malayalam: "ബാധകമായ നിയമപ്രകാരം മറ്റൊരാളുടെ സ്വത്തോ അവകാശങ്ങളോ അനന്തരമായി ലഭിക്കാൻ അർഹതയുള്ള വ്യക്തി.",
      hindi: "लागू कानून के अनुसार किसी अन्य व्यक्ति की संपत्ति या अधिकारों का उत्तराधिकारी बनने का हकदार व्यक्ति।",
      tamil: "பொருந்தும் சட்டத்தின்படி மற்றொருவரின் சொத்து அல்லது உரிமைகளைப் பெறத் தகுதியுடைய வாரிசு."
    },
    simplifiedMeaning: {
      english: "A person legally entitled to inherit property or certain rights from someone who has died.",
      malayalam: "മരിച്ച ഒരാളുടെ സ്വത്തോ ചില അവകാശങ്ങളോ നിയമപ്രകാരം ലഭിക്കാൻ അർഹതയുള്ള വ്യക്തി.",
      hindi: "किसी मृत व्यक्ति की संपत्ति या कुछ अधिकार विरासत में पाने का कानूनी हक रखने वाला व्यक्ति।",
      tamil: "இறந்த ஒருவரின் சொத்து அல்லது சில உரிமைகளைச் சட்டப்படி பெறத் தகுதியுள்ள நபர்."
    },
    category: "Property and Succession Law"
  },
  {
    term: "Will",
    translations: {
      english: "Will",
      malayalam: "വിൽപത്രം",
      hindi: "वसीयत",
      tamil: "உயில்"
    },
    definitions: {
      english: "A legally recognized declaration of a person's intentions concerning the distribution of property after death.",
      malayalam: "മരണാനന്തര സ്വത്ത് വിഭജനത്തെക്കുറിച്ചുള്ള ഒരാളുടെ ഉദ്ദേശ്യങ്ങൾ വ്യക്തമാക്കുന്ന നിയമപരമായി അംഗീകരിക്കപ്പെട്ട രേഖ.",
      hindi: "मृत्यु के बाद संपत्ति के वितरण के संबंध में किसी व्यक्ति की इच्छाओं को व्यक्त करने वाला कानूनी रूप से मान्य दस्तावेज़।",
      tamil: "இறப்புக்குப் பிறகு சொத்துகள் எவ்வாறு பகிரப்பட வேண்டும் என்பதைக் குறிப்பிடும் சட்ட அங்கீகாரம் பெற்ற ஆவணம்."
    },
    simplifiedMeaning: {
      english: "A document stating who should receive a person's property after their death.",
      malayalam: "മരണശേഷം ഒരാളുടെ സ്വത്ത് ആർക്കാണ് ലഭിക്കേണ്ടതെന്ന് വ്യക്തമാക്കുന്ന രേഖ.",
      hindi: "मृत्यु के बाद किसी व्यक्ति की संपत्ति किसे मिलनी चाहिए, यह बताने वाला दस्तावेज़।",
      tamil: "ஒருவர் இறந்த பிறகு அவரது சொத்து யாருக்குச் செல்ல வேண்டும் என்பதைக் குறிப்பிடும் ஆவணம்."
    },
    category: "Property and Succession Law"
  },
  {
    term: "Probate",
    translations: {
      english: "Probate",
      malayalam: "വിൽപത്രത്തിന്റെ പ്രാമാണീകരണം",
      hindi: "वसीयत का न्यायिक प्रमाणन",
      tamil: "உயிலின் நீதிமன்ற அங்கீகாரம்"
    },
    definitions: {
      english: "The legal process by which a competent court establishes the validity of a will and, where applicable, authorizes its administration.",
      malayalam: "വിൽപത്രത്തിന്റെ സാധുത കോടതി സ്ഥിരീകരിക്കുകയും ബാധകമായ സാഹചര്യങ്ങളിൽ അതിന്റെ നടത്തിപ്പിന് അധികാരം നൽകുകയും ചെയ്യുന്ന നിയമനടപടി.",
      hindi: "वह कानूनी प्रक्रिया जिसमें सक्षम न्यायालय वसीयत की वैधता प्रमाणित करता है और जहाँ लागू हो, उसके प्रशासन की अनुमति देता है।",
      tamil: "உயிலின் செல்லுபடியாக்தன்மையை உரிய நீதிமன்றம் உறுதிப்படுத்தி, பொருந்தும் சூழலில் அதை நிர்வகிக்க அனுமதிக்கும் சட்ட நடைமுறை."
    },
    simplifiedMeaning: {
      english: "A court process for confirming a will's validity, where required by law.",
      malayalam: "നിയമം ആവശ്യപ്പെടുന്ന സാഹചര്യത്തിൽ വിൽപത്രത്തിന്റെ സാധുത കോടതി സ്ഥിരീകരിക്കുന്ന നടപടി.",
      hindi: "जहाँ कानून आवश्यक समझे, वहाँ वसीयत की वैधता की पुष्टि करने वाली न्यायालयीन प्रक्रिया।",
      tamil: "சட்டம் தேவைப்படுத்தும் இடங்களில் உயிலின் செல்லுபடியாக்தன்மையை உறுதிப்படுத்தும் நீதிமன்ற நடைமுறை."
    },
    category: "Property and Succession Law"
  },
  {
    term: "Power of Attorney",
    translations: {
      english: "Power of Attorney",
      malayalam: "മുഖ്ത്യാർനാമം",
      hindi: "मुख्तारनामा",
      tamil: "அதிகாரப் பத்திரம்"
    },
    definitions: {
      english: "A legal instrument authorizing another person to act on one's behalf within the powers granted.",
      malayalam: "നൽകിയിരിക്കുന്ന അധികാരപരിധിക്കുള്ളിൽ സ്വന്തം പേരിൽ പ്രവർത്തിക്കാൻ മറ്റൊരാളെ അധികാരപ്പെടുത്തുന്ന നിയമരേഖ.",
      hindi: "एक कानूनी दस्तावेज़ जो किसी अन्य व्यक्ति को दिए गए अधिकारों की सीमा के भीतर अपनी ओर से कार्य करने की अनुमति देता है।",
      tamil: "வழங்கப்பட்ட அதிகார வரம்பிற்குள் தமக்குப் பதிலாகச் செயல்பட மற்றொருவரை அங்கீகரிக்கும் சட்ட ஆவணம்."
    },
    simplifiedMeaning: {
      english: "A document that allows someone to handle specified matters on another person's behalf.",
      malayalam: "മറ്റൊരാളുടെ പേരിൽ നിശ്ചിത കാര്യങ്ങൾ കൈകാര്യം ചെയ്യാൻ ഒരാളെ അനുവദിക്കുന്ന രേഖ.",
      hindi: "किसी दूसरे व्यक्ति की ओर से निर्धारित काम करने की अनुमति देने वाला दस्तावेज़।",
      tamil: "மற்றொருவரின் சார்பில் குறிப்பிட்ட பணிகளைச் செய்ய அனுமதிக்கும் ஆவணம்."
    },
    category: "Legal Documents"
  },
  {
    term: "Sale Deed",
    translations: {
      english: "Sale Deed",
      malayalam: "വിൽപ്പന ആധാരം",
      hindi: "विक्रय विलेख",
      tamil: "விற்பனைப் பத்திரம்"
    },
    definitions: {
      english: "A legal instrument recording the transfer of ownership of property from a seller to a buyer.",
      malayalam: "വിൽപ്പനക്കാരനിൽ നിന്ന് വാങ്ങുന്നയാളിലേക്ക് സ്വത്തിന്റെ ഉടമസ്ഥാവകാശം കൈമാറുന്നത് രേഖപ്പെടുത്തുന്ന നിയമരേഖ.",
      hindi: "विक्रेता से खरीदार को संपत्ति का स्वामित्व हस्तांतरित करने का विवरण देने वाला कानूनी दस्तावेज़।",
      tamil: "விற்பனையாளரிடமிருந்து வாங்குபவருக்கு சொத்தின் உரிமை மாற்றப்படுவதைப் பதிவு செய்யும் சட்ட ஆவணம்."
    },
    simplifiedMeaning: {
      english: "A legal document recording the sale and transfer of property ownership.",
      malayalam: "സ്വത്ത് വിൽക്കുന്നതും ഉടമസ്ഥാവകാശം കൈമാറുന്നതും രേഖപ്പെടുത്തുന്ന നിയമരേഖ.",
      hindi: "संपत्ति की बिक्री और स्वामित्व हस्तांतरण को दर्ज करने वाला कानूनी दस्तावेज़।",
      tamil: "சொத்து விற்பனையையும் உரிமை மாற்றத்தையும் பதிவு செய்யும் சட்ட ஆவணம்."
    },
    category: "Property Law"
  },
  
  {
    term: "Intellectual Property",
    translations: {
      english: "Intellectual Property",
      malayalam: "ബൗദ്ധിക സ്വത്ത്",
      hindi: "बौद्धिक संपदा",
      tamil: "அறிவுசார் சொத்து"
    },
    definitions: {
      english: "Creations of the mind, such as inventions, literary and artistic works, designs, and symbols, that may receive legal protection.",
      malayalam: "കണ്ടുപിടിത്തങ്ങൾ, സാഹിത്യ-കലാസൃഷ്ടികൾ, രൂപകൽപ്പനകൾ, ചിഹ്നങ്ങൾ തുടങ്ങിയ നിയമപരമായ സംരക്ഷണം ലഭിക്കാവുന്ന ബൗദ്ധിക സൃഷ്ടികൾ.",
      hindi: "मन की रचनाएँ, जैसे आविष्कार, साहित्यिक और कलात्मक कार्य, डिज़ाइन तथा प्रतीक, जिन्हें कानूनी संरक्षण मिल सकता है।",
      tamil: "கண்டுபிடிப்புகள், இலக்கிய மற்றும் கலைப் படைப்புகள், வடிவமைப்புகள், குறியீடுகள் போன்ற சட்டப் பாதுகாப்பைப் பெறக்கூடிய அறிவுசார் படைப்புகள்."
    },
    simplifiedMeaning: {
      english: "Ideas and creations that may be protected by law.",
      malayalam: "നിയമപരമായി സംരക്ഷിക്കപ്പെടാവുന്ന ആശയങ്ങളും സൃഷ്ടികളും.",
      hindi: "ऐसे विचार और रचनाएँ जिन्हें कानून से सुरक्षा मिल सकती है।",
      tamil: "சட்டத்தால் பாதுகாக்கப்படக்கூடிய கருத்துகளும் படைப்புகளும்."
    },
    category: "Intellectual Property Law"
  },
  {
    term: "Copyright",
    translations: {
      english: "Copyright",
      malayalam: "പകർപ്പവകാശം",
      hindi: "कॉपीराइट",
      tamil: "பதிப்புரிமை"
    },
    definitions: {
      english: "A legal right protecting qualifying original literary, artistic, musical, and other works against certain unauthorized uses.",
      malayalam: "യോഗ്യതയുള്ള മൗലിക സാഹിത്യ, കലാ, സംഗീത, മറ്റ് സൃഷ്ടികളെ ചില അനധികൃത ഉപയോഗങ്ങളിൽ നിന്ന് സംരക്ഷിക്കുന്ന നിയമാവകാശം.",
      hindi: "मौलिक साहित्यिक, कलात्मक, संगीत और अन्य पात्र रचनाओं को कुछ अनधिकृत उपयोगों से बचाने वाला कानूनी अधिकार।",
      tamil: "தகுதியுள்ள அசல் இலக்கிய, கலை, இசை மற்றும் பிற படைப்புகளைச் சில அனுமதியற்ற பயன்பாடுகளிலிருந்து பாதுகாக்கும் சட்ட உரிமை."
    },
    simplifiedMeaning: {
      english: "A legal right that protects original creative works from certain unauthorized uses.",
      malayalam: "മൗലിക സൃഷ്ടികളെ ചില അനധികൃത ഉപയോഗങ്ങളിൽ നിന്ന് സംരക്ഷിക്കുന്ന നിയമാവകാശം.",
      hindi: "मौलिक रचनाओं को कुछ अनधिकृत उपयोगों से बचाने वाला कानूनी अधिकार।",
      tamil: "அசல் படைப்புகளைச் சில அனுமதியற்ற பயன்பாடுகளிலிருந்து பாதுகாக்கும் சட்ட உரிமை."
    },
    category: "Intellectual Property Law"
  },
  {
    term: "Trademark",
    translations: {
      english: "Trademark",
      malayalam: "വ്യാപാരമുദ്ര",
      hindi: "व्यापार चिह्न",
      tamil: "வணிகக் குறியீடு"
    },
    definitions: {
      english: "A sign capable of distinguishing the goods or services of one business from those of others and eligible for protection under applicable law.",
      malayalam: "ഒരു സ്ഥാപനത്തിന്റെ ഉൽപ്പന്നങ്ങളെയോ സേവനങ്ങളെയോ മറ്റുള്ളവയുടേതിൽ നിന്ന് തിരിച്ചറിയാൻ സഹായിക്കുകയും ബാധകമായ നിയമപ്രകാരം സംരക്ഷണം ലഭിക്കാവുന്നതുമായ അടയാളം.",
      hindi: "ऐसा चिह्न जो एक व्यवसाय की वस्तुओं या सेवाओं को दूसरों से अलग पहचान सके और लागू कानून के तहत संरक्षण के योग्य हो।",
      tamil: "ஒரு நிறுவனத்தின் பொருட்கள் அல்லது சேவைகளை மற்றவர்களிடமிருந்து வேறுபடுத்திக் காட்டி, பொருந்தும் சட்டத்தின் கீழ் பாதுகாப்பைப் பெறக்கூடிய குறியீடு."
    },
    simplifiedMeaning: {
      english: "A protected name, logo, or sign that identifies a business's goods or services.",
      malayalam: "ഒരു സ്ഥാപനത്തിന്റെ ഉൽപ്പന്നങ്ങളെയോ സേവനങ്ങളെയോ തിരിച്ചറിയിക്കുന്ന സംരക്ഷിത നാമം, ലോഗോ, അല്ലെങ്കിൽ അടയാളം.",
      hindi: "किसी व्यवसाय की वस्तुओं या सेवाओं की पहचान बताने वाला संरक्षित नाम, लोगो या चिह्न।",
      tamil: "ஒரு நிறுவனத்தின் பொருட்கள் அல்லது சேவைகளை அடையாளம் காட்டும் பாதுகாக்கப்பட்ட பெயர், சின்னம் அல்லது குறியீடு."
    },
    category: "Intellectual Property Law"
  },
  {
    term: "Patent",
    translations: {
      english: "Patent",
      malayalam: "പേറ്റന്റ്",
      hindi: "पेटेंट",
      tamil: "காப்புரிமைச் சான்றுரிமம்"
    },
    definitions: {
      english: "A legal right granted for an invention that meets the applicable requirements, allowing the patent holder to exclude others from specified uses for a limited period.",
      malayalam: "ബാധകമായ നിബന്ധനകൾ പാലിക്കുന്ന കണ്ടുപിടിത്തത്തിന് പരിമിതമായ കാലയളവിൽ നിശ്ചിത ഉപയോഗങ്ങളിൽ നിന്ന് മറ്റുള്ളവരെ തടയാനുള്ള അവകാശം നൽകുന്ന നിയമസംരക്ഷണം.",
      hindi: "निर्धारित शर्तें पूरी करने वाले आविष्कार के लिए दिया गया सीमित अवधि का कानूनी अधिकार, जो पेटेंट धारक को निर्दिष्ट उपयोगों से दूसरों को रोकने की अनुमति देता है।",
      tamil: "பொருந்தும் நிபந்தனைகளைப் பூர்த்தி செய்யும் கண்டுபிடிப்புக்கு வழங்கப்படும் வரையறுக்கப்பட்ட காலச் சட்ட உரிமை; இது குறிப்பிட்ட பயன்பாடுகளில் பிறரைத் தடுக்க உரிமையாளரை அனுமதிக்கிறது."
    },
    simplifiedMeaning: {
      english: "A time-limited legal right that protects a qualifying invention.",
      malayalam: "യോഗ്യതയുള്ള കണ്ടുപിടിത്തത്തെ പരിമിതമായ കാലത്തേക്ക് സംരക്ഷിക്കുന്ന നിയമാവകാശം.",
      hindi: "योग्य आविष्कार को सीमित समय तक सुरक्षा देने वाला कानूनी अधिकार।",
      tamil: "தகுதியுள்ள கண்டுபிடிப்பை வரையறுக்கப்பட்ட காலத்திற்கு பாதுகாக்கும் சட்ட உரிமை."
    },
    category: "Intellectual Property Law"
  },
  {
    term: "Trade Secret",
    translations: {
      english: "Trade Secret",
      malayalam: "വ്യാപാര രഹസ്യം",
      hindi: "व्यापार रहस्य",
      tamil: "வணிக ரகசியம்"
    },
    definitions: {
      english: "Confidential business information that derives value from being secret and is subject to reasonable measures to preserve its secrecy.",
      malayalam: "രഹസ്യമായി നിലനിൽക്കുന്നതിനാൽ മൂല്യം ലഭിക്കുകയും രഹസ്യത്വം സംരക്ഷിക്കാൻ ന്യായമായ നടപടികൾ സ്വീകരിക്കുകയും ചെയ്യുന്ന രഹസ്യ വ്യാപാരവിവരം.",
      hindi: "ऐसी गोपनीय व्यावसायिक जानकारी जिसका मूल्य उसके गुप्त रहने से उत्पन्न होता है और जिसकी गोपनीयता बनाए रखने के लिए उचित उपाय किए जाते हैं।",
      tamil: "ரகசியமாக இருப்பதால் மதிப்பைப் பெறும் மற்றும் அதன் ரகசியத்தன்மையைப் பாதுகாக்க நியாயமான நடவடிக்கைகள் எடுக்கப்படும் வணிகத் தகவல்."
    },
    simplifiedMeaning: {
      english: "Valuable business information kept confidential.",
      malayalam: "രഹസ്യമായി സൂക്ഷിക്കുന്ന മൂല്യമുള്ള വ്യാപാരവിവരം.",
      hindi: "गोपनीय रखी जाने वाली मूल्यवान व्यावसायिक जानकारी।",
      tamil: "ரகசியமாகப் பாதுகாக்கப்படும் மதிப்புள்ள வணிகத் தகவல்."
    },
    category: "Intellectual Property Law"
  },
  {
    term: "Data Privacy",
    translations: {
      english: "Data Privacy",
      malayalam: "ഡാറ്റാ സ്വകാര്യത",
      hindi: "डेटा गोपनीयता",
      tamil: "தரவு தனியுரிமை"
    },
    definitions: {
      english: "The principles and rules governing how personal data is collected, used, stored, disclosed, and protected.",
      malayalam: "വ്യക്തിഗത ഡാറ്റ എങ്ങനെ ശേഖരിക്കണം, ഉപയോഗിക്കണം, സൂക്ഷിക്കണം, വെളിപ്പെടുത്തണം, സംരക്ഷിക്കണം എന്നിവ നിയന്ത്രിക്കുന്ന തത്വങ്ങളും നിയമങ്ങളും.",
      hindi: "व्यक्तिगत डेटा के संग्रह, उपयोग, भंडारण, प्रकटीकरण और सुरक्षा को नियंत्रित करने वाले सिद्धांत और नियम।",
      tamil: "தனிப்பட்ட தரவு எவ்வாறு சேகரிக்கப்பட வேண்டும், பயன்படுத்தப்பட வேண்டும், சேமிக்கப்பட வேண்டும், பகிரப்பட வேண்டும் மற்றும் பாதுகாக்கப்பட வேண்டும் என்பதை நிர்ணயிக்கும் கொள்கைகளும் விதிகளும்."
    },
    simplifiedMeaning: {
      english: "Rules and practices for handling people's personal information responsibly.",
      malayalam: "ആളുകളുടെ വ്യക്തിഗത വിവരങ്ങൾ ഉത്തരവാദിത്വത്തോടെ കൈകാര്യം ചെയ്യുന്നതിനുള്ള നിയമങ്ങളും രീതികളും.",
      hindi: "लोगों की व्यक्तिगत जानकारी को जिम्मेदारी से संभालने के नियम और तरीके।",
      tamil: "மக்களின் தனிப்பட்ட தகவல்களைப் பொறுப்புடன் கையாள்வதற்கான விதிகளும் நடைமுறைகளும்."
    },
    category: "Technology and Privacy Law"
  },
  {
    term: "Personal Data",
    translations: {
      english: "Personal Data",
      malayalam: "വ്യക്തിഗത ഡാറ്റ",
      hindi: "व्यक्तिगत डेटा",
      tamil: "தனிப்பட்ட தரவு"
    },
    definitions: {
      english: "Data about an identifiable individual, as defined by applicable law.",
      malayalam: "ബാധകമായ നിയമത്തിൽ നിർവചിച്ചിരിക്കുന്നതുപോലെ തിരിച്ചറിയാൻ കഴിയുന്ന ഒരു വ്യക്തിയെക്കുറിച്ചുള്ള ഡാറ്റ.",
      hindi: "लागू कानून में परिभाषित किसी पहचान योग्य व्यक्ति से संबंधित डेटा।",
      tamil: "பொருந்தும் சட்டத்தில் வரையறுக்கப்பட்டபடி அடையாளம் காணக்கூடிய ஒரு நபரைப் பற்றிய தரவு."
    },
    simplifiedMeaning: {
      english: "Information that identifies a person or relates to an identifiable person.",
      malayalam: "ഒരു വ്യക്തിയെ തിരിച്ചറിയുന്നതോ തിരിച്ചറിയാൻ കഴിയുന്ന വ്യക്തിയുമായി ബന്ധപ്പെട്ടതോ ആയ വിവരം.",
      hindi: "ऐसी जानकारी जिससे किसी व्यक्ति की पहचान हो सके या जो किसी पहचान योग्य व्यक्ति से संबंधित हो।",
      tamil: "ஒருவரை அடையாளம் காண உதவும் அல்லது அடையாளம் காணக்கூடிய நபருடன் தொடர்புடைய தகவல்."
    },
    category: "Technology and Privacy Law"
  },
  {
    term: "Consent",
    translations: {
      english: "Consent",
      malayalam: "സമ്മതം",
      hindi: "सहमति",
      tamil: "ஒப்புதல்"
    },
    definitions: {
      english: "Agreement or permission given by a person, whose legal validity depends on the applicable law and circumstances.",
      malayalam: "ഒരു വ്യക്തി നൽകുന്ന അംഗീകാരമോ അനുമതിയോ; അതിന്റെ നിയമസാധുത ബാധകമായ നിയമത്തെയും സാഹചര്യങ്ങളെയും ആശ്രയിക്കുന്നു.",
      hindi: "किसी व्यक्ति द्वारा दी गई स्वीकृति या अनुमति, जिसकी कानूनी वैधता लागू कानून और परिस्थितियों पर निर्भर करती है।",
      tamil: "ஒருவர் வழங்கும் இசைவு அல்லது அனுமதி; அதன் சட்டச் செல்லுபடியாக்தன்மை பொருந்தும் சட்டத்தையும் சூழ்நிலைகளையும் சார்ந்தது."
    },
    simplifiedMeaning: {
      english: "Permission freely given, when the law's requirements for valid consent are met.",
      malayalam: "സാധുവായ സമ്മതത്തിനുള്ള നിയമനിബന്ധനകൾ പാലിച്ചുകൊണ്ട് സ്വമേധയാ നൽകുന്ന അനുമതി.",
      hindi: "वैध सहमति की कानूनी शर्तें पूरी होने पर स्वेच्छा से दी गई अनुमति।",
      tamil: "செல்லுபடியாகும் ஒப்புதலுக்கான சட்ட நிபந்தனைகள் பூர்த்தியாகும்போது விருப்பத்துடன் வழங்கப்படும் அனுமதி."
    },
    category: "General Law"
  },
  {
    term: "Cybercrime",
    translations: {
      english: "Cybercrime",
      malayalam: "സൈബർ കുറ്റകൃത്യം",
      hindi: "साइबर अपराध",
      tamil: "இணையக் குற்றம்"
    },
    definitions: {
      english: "Criminal activity involving computers, digital systems, networks, or electronic data, as defined by applicable law.",
      malayalam: "ബാധകമായ നിയമപ്രകാരം കമ്പ്യൂട്ടറുകൾ, ഡിജിറ്റൽ സംവിധാനങ്ങൾ, നെറ്റ്‌വർക്കുകൾ, അല്ലെങ്കിൽ ഇലക്ട്രോണിക് ഡാറ്റ എന്നിവ ഉൾപ്പെടുന്ന കുറ്റകൃത്യം.",
      hindi: "लागू कानून के अनुसार कंप्यूटर, डिजिटल प्रणालियों, नेटवर्क या इलेक्ट्रॉनिक डेटा से संबंधित आपराधिक गतिविधि।",
      tamil: "பொருந்தும் சட்டத்தின்படி கணினிகள், மின்னணு அமைப்புகள், வலைப்பின்னல்கள் அல்லது மின்னணுத் தரவுகளைச் சார்ந்த குற்றச் செயல்."
    },
    simplifiedMeaning: {
      english: "A crime involving computers, networks, or digital information.",
      malayalam: "കമ്പ്യൂട്ടറുകൾ, നെറ്റ്‌വർക്കുകൾ, അല്ലെങ്കിൽ ഡിജിറ്റൽ വിവരങ്ങൾ ഉൾപ്പെടുന്ന കുറ്റകൃത്യം.",
      hindi: "कंप्यूटर, नेटवर्क या डिजिटल जानकारी से जुड़ा अपराध।",
      tamil: "கணினிகள், வலைப்பின்னல்கள் அல்லது மின்னணுத் தகவல்களைச் சார்ந்த குற்றம்."
    },
    category: "Cyber Law"
  },
  {
    term: "Electronic Signature",
    translations: {
      english: "Electronic Signature",
      malayalam: "ഇലക്ട്രോണിക് ഒപ്പ്",
      hindi: "इलेक्ट्रॉनिक हस्ताक्षर",
      tamil: "மின்னணுக் கையொப்பம்"
    },
    definitions: {
      english: "Electronic data or a method used to sign or authenticate an electronic record, subject to the requirements of applicable law.",
      malayalam: "ബാധകമായ നിയമത്തിലെ നിബന്ധനകൾക്ക് വിധേയമായി ഇലക്ട്രോണിക് രേഖയിൽ ഒപ്പിടാനോ അത് പ്രാമാണീകരിക്കാനോ ഉപയോഗിക്കുന്ന ഇലക്ട്രോണിക് ഡാറ്റയോ രീതിയോ.",
      hindi: "लागू कानून की शर्तों के अधीन इलेक्ट्रॉनिक रिकॉर्ड पर हस्ताक्षर करने या उसे प्रमाणित करने के लिए उपयोग किया जाने वाला इलेक्ट्रॉनिक डेटा या तरीका।",
      tamil: "பொருந்தும் சட்ட நிபந்தனைகளுக்கு உட்பட்டு மின்னணுப் பதிவில் கையொப்பமிட அல்லது அதைச் சரிபார்க்கப் பயன்படுத்தப்படும் மின்னணுத் தரவு அல்லது முறை."
    },
    simplifiedMeaning: {
      english: "An electronic method of signing or confirming a digital document.",
      malayalam: "ഡിജിറ്റൽ രേഖയിൽ ഒപ്പിടാനോ അത് സ്ഥിരീകരിക്കാനോ ഉപയോഗിക്കുന്ന ഇലക്ട്രോണിക് രീതി.",
      hindi: "डिजिटल दस्तावेज़ पर हस्ताक्षर करने या उसकी पुष्टि करने का इलेक्ट्रॉनिक तरीका।",
      tamil: "மின்னணு ஆவணத்தில் கையொப்பமிட அல்லது அதை உறுதிப்படுத்தும் மின்னணு முறை."
    },
    category: "Cyber Law"
  },
  {
    term: "Digital Evidence",
    translations: {
      english: "Digital Evidence",
      malayalam: "ഡിജിറ്റൽ തെളിവ്",
      hindi: "डिजिटल साक्ष्य",
      tamil: "மின்னணுச் சான்று"
    },
    definitions: {
      english: "Information stored or transmitted in digital form that is relevant to a legal proceeding and handled according to applicable evidentiary rules.",
      malayalam: "നിയമനടപടിക്ക് പ്രസക്തമായതും ബാധകമായ തെളിവുനിയമങ്ങൾക്കനുസരിച്ച് കൈകാര്യം ചെയ്യപ്പെടുന്നതുമായ ഡിജിറ്റൽ രൂപത്തിൽ സൂക്ഷിച്ചോ കൈമാറിയോ ചെയ്യുന്ന വിവരം.",
      hindi: "डिजिटल रूप में संग्रहीत या प्रेषित ऐसी जानकारी जो कानूनी कार्यवाही के लिए प्रासंगिक हो और लागू साक्ष्य नियमों के अनुसार संभाली जाए।",
      tamil: "சட்ட நடவடிக்கைக்குத் தொடர்புடையதும் பொருந்தும் சான்று விதிகளின்படி கையாளப்படுவதுமான மின்னணு வடிவில் சேமிக்கப்பட்ட அல்லது அனுப்பப்பட்ட தகவல்."
    },
    simplifiedMeaning: {
      english: "Digital information used to help prove or disprove facts in a case.",
      malayalam: "ഒരു കേസിലെ വസ്തുതകൾ തെളിയിക്കാനോ നിഷേധിക്കാനോ ഉപയോഗിക്കുന്ന ഡിജിറ്റൽ വിവരം.",
      hindi: "किसी मामले के तथ्यों को सिद्ध या असिद्ध करने में उपयोग की जाने वाली डिजिटल जानकारी।",
      tamil: "ஒரு வழக்கின் உண்மைகளை நிரூபிக்க அல்லது மறுக்கப் பயன்படும் மின்னணுத் தகவல்."
    },
    category: "Cyber Law"
  },
  
  {
    term: "Cyberstalking",
    translations: {
      english: "Cyberstalking",
      malayalam: "സൈബർ പിന്തുടരൽ",
      hindi: "साइबर पीछा करना",
      tamil: "இணையவழித் தொடர் கண்காணிப்பு"
    },
    definitions: {
      english: "Repeated use of electronic communications or digital technologies to harass, monitor, or threaten a person, where prohibited by applicable law.",
      malayalam: "ബാധകമായ നിയമപ്രകാരം നിരോധിക്കപ്പെട്ട രീതിയിൽ ഒരാളെ ഉപദ്രവിക്കാനോ നിരീക്ഷിക്കാനോ ഭീഷണിപ്പെടുത്താനോ ഇലക്ട്രോണിക് ആശയവിനിമയങ്ങളോ ഡിജിറ്റൽ സാങ്കേതികവിദ്യകളോ ആവർത്തിച്ച് ഉപയോഗിക്കുന്നത്.",
      hindi: "लागू कानून द्वारा निषिद्ध परिस्थितियों में किसी व्यक्ति को परेशान करने, निगरानी करने या धमकाने के लिए इलेक्ट्रॉनिक संचार या डिजिटल तकनीक का बार-बार उपयोग करना।",
      tamil: "பொருந்தும் சட்டத்தால் தடைசெய்யப்பட்ட வகையில் ஒருவரைத் துன்புறுத்த, கண்காணிக்க அல்லது அச்சுறுத்த மின்னணுத் தொடர்புகள் அல்லது மின்னணுத் தொழில்நுட்பங்களை மீண்டும் மீண்டும் பயன்படுத்துதல்."
    },
    simplifiedMeaning: {
      english: "Repeatedly using digital tools to harass or threaten someone.",
      malayalam: "ഡിജിറ്റൽ ഉപകരണങ്ങൾ ഉപയോഗിച്ച് ഒരാളെ ആവർത്തിച്ച് ഉപദ്രവിക്കുകയോ ഭീഷണിപ്പെടുത്തുകയോ ചെയ്യുന്നത്.",
      hindi: "डिजिटल साधनों से किसी को बार-बार परेशान करना या धमकाना।",
      tamil: "மின்னணுக் கருவிகளைப் பயன்படுத்தி ஒருவரைத் தொடர்ந்து துன்புறுத்துவது அல்லது அச்சுறுத்துவது."
    },
    category: "Cyber Law"
  },
  {
    term: "Identity Theft",
    translations: {
      english: "Identity Theft",
      malayalam: "വ്യക്തിത്വ മോഷണം",
      hindi: "पहचान की चोरी",
      tamil: "அடையாளத் திருட்டு"
    },
    definitions: {
      english: "The unauthorized acquisition or use of another person's identifying information, often for fraudulent purposes.",
      malayalam: "വഞ്ചനാപരമായ ആവശ്യങ്ങൾക്കായി മറ്റൊരാളുടെ തിരിച്ചറിയൽ വിവരങ്ങൾ അനുമതിയില്ലാതെ കൈവശപ്പെടുത്തുകയോ ഉപയോഗിക്കുകയോ ചെയ്യുന്നത്.",
      hindi: "अक्सर धोखाधड़ी के उद्देश्य से किसी अन्य व्यक्ति की पहचान संबंधी जानकारी को बिना अनुमति प्राप्त करना या उपयोग करना।",
      tamil: "பெரும்பாலும் மோசடி நோக்கத்திற்காக மற்றொருவரின் அடையாளத் தகவலை அனுமதியின்றிப் பெறுதல் அல்லது பயன்படுத்துதல்."
    },
    simplifiedMeaning: {
      english: "Using someone else's personal details without permission, often to commit fraud.",
      malayalam: "മറ്റൊരാളുടെ വ്യക്തിഗത വിവരങ്ങൾ അനുമതിയില്ലാതെ, പലപ്പോഴും തട്ടിപ്പിനായി, ഉപയോഗിക്കുന്നത്.",
      hindi: "किसी दूसरे की निजी जानकारी का बिना अनुमति, अक्सर धोखाधड़ी के लिए, उपयोग करना।",
      tamil: "மற்றொருவரின் தனிப்பட்ட விவரங்களை அனுமதியின்றி, பெரும்பாலும் மோசடிக்காக, பயன்படுத்துவது."
    },
    category: "Cyber Law"
  },
  {
    term: "Phishing",
    translations: {
      english: "Phishing",
      malayalam: "ഫിഷിംഗ് തട്ടിപ്പ്",
      hindi: "फ़िशिंग",
      tamil: "தகவல் திருடும் இணைய மோசடி"
    },
    definitions: {
      english: "A deceptive attempt to obtain sensitive information by impersonating a trustworthy person or organization through electronic communications or websites.",
      malayalam: "വിശ്വസനീയമായ വ്യക്തിയെയോ സ്ഥാപനത്തെയോ അനുകരിച്ച് ഇലക്ട്രോണിക് സന്ദേശങ്ങളിലൂടെയോ വെബ്‌സൈറ്റുകളിലൂടെയോ രഹസ്യവിവരങ്ങൾ കൈക്കലാക്കാനുള്ള വഞ്ചനാപരമായ ശ്രമം.",
      hindi: "विश्वसनीय व्यक्ति या संस्था का रूप धारण करके इलेक्ट्रॉनिक संदेशों या वेबसाइटों के माध्यम से संवेदनशील जानकारी प्राप्त करने का धोखापूर्ण प्रयास।",
      tamil: "நம்பகமான நபர் அல்லது நிறுவனத்தைப் போல நடித்து மின்னணுச் செய்திகள் அல்லது இணையதளங்கள் மூலம் ரகசியத் தகவல்களைப் பெறும் மோசடி முயற்சி."
    },
    simplifiedMeaning: {
      english: "A scam that tricks people into revealing passwords, bank details, or other sensitive information.",
      malayalam: "പാസ്‌വേഡുകളോ ബാങ്ക് വിവരങ്ങളോ മറ്റ് രഹസ്യവിവരങ്ങളോ വെളിപ്പെടുത്താൻ ആളുകളെ കബളിപ്പിക്കുന്ന തട്ടിപ്പ്.",
      hindi: "लोगों को पासवर्ड, बैंक विवरण या अन्य संवेदनशील जानकारी बताने के लिए धोखा देने वाला घोटाला।",
      tamil: "கடவுச்சொற்கள், வங்கித் தகவல்கள் அல்லது பிற ரகசிய விவரங்களைப் பெற மக்களை ஏமாற்றும் மோசடி."
    },
    category: "Cyber Law"
  },
  {
    term: "Hacking",
    translations: {
      english: "Hacking",
      malayalam: "ഹാക്കിംഗ്",
      hindi: "हैकिंग",
      tamil: "கணினி ஊடுருவல்"
    },
    definitions: {
      english: "Accessing, manipulating, or interfering with computer systems or data; whether it is unlawful depends on authorization and applicable law.",
      malayalam: "കമ്പ്യൂട്ടർ സംവിധാനങ്ങളിലേക്കോ ഡാറ്റയിലേക്കോ പ്രവേശിക്കുകയോ അവയിൽ മാറ്റം വരുത്തുകയോ തടസ്സപ്പെടുത്തുകയോ ചെയ്യുന്നത്; അതിന്റെ നിയമസാധുത അനുമതിയെയും ബാധകമായ നിയമത്തെയും ആശ്രയിക്കുന്നു.",
      hindi: "कंप्यूटर प्रणालियों या डेटा तक पहुँचना, उनमें बदलाव करना या हस्तक्षेप करना; इसकी वैधता अनुमति और लागू कानून पर निर्भर करती है।",
      tamil: "கணினி அமைப்புகள் அல்லது தரவுகளை அணுகுதல், மாற்றுதல் அல்லது தலையிடுதல்; அது சட்டவிரோதமா என்பது அனுமதி மற்றும் பொருந்தும் சட்டத்தைப் பொறுத்தது."
    },
    simplifiedMeaning: {
      english: "Accessing or changing computer systems or data; unauthorized access may be illegal.",
      malayalam: "കമ്പ്യൂട്ടർ സംവിധാനങ്ങളിലേക്കോ ഡാറ്റയിലേക്കോ പ്രവേശിക്കുകയോ മാറ്റം വരുത്തുകയോ ചെയ്യുന്നത്; അനധികൃത പ്രവേശനം നിയമവിരുദ്ധമായേക്കാം.",
      hindi: "कंप्यूटर प्रणाली या डेटा तक पहुँचना या उसमें बदलाव करना; बिना अनुमति ऐसा करना गैरकानूनी हो सकता है।",
      tamil: "கணினி அமைப்புகள் அல்லது தரவுகளை அணுகுவது அல்லது மாற்றுவது; அனுமதியற்ற அணுகல் சட்டவிரோதமாக இருக்கலாம்."
    },
    category: "Cyber Law"
  },
  {
    term: "Electronic Record",
    translations: {
      english: "Electronic Record",
      malayalam: "ഇലക്ട്രോണിക് രേഖ",
      hindi: "इलेक्ट्रॉनिक अभिलेख",
      tamil: "மின்னணுப் பதிவு"
    },
    definitions: {
      english: "Data, information, or a document created, stored, received, or transmitted in electronic form, as recognized by applicable law.",
      malayalam: "ബാധകമായ നിയമം അംഗീകരിക്കുന്ന രീതിയിൽ ഇലക്ട്രോണിക് രൂപത്തിൽ സൃഷ്ടിക്കപ്പെടുകയോ സൂക്ഷിക്കപ്പെടുകയോ സ്വീകരിക്കപ്പെടുകയോ കൈമാറപ്പെടുകയോ ചെയ്യുന്ന ഡാറ്റയോ വിവരമോ രേഖയോ.",
      hindi: "लागू कानून के अनुसार इलेक्ट्रॉनिक रूप में बनाया, संग्रहीत, प्राप्त या प्रेषित डेटा, जानकारी या दस्तावेज़।",
      tamil: "பொருந்தும் சட்டத்தால் அங்கீகரிக்கப்படும் வகையில் மின்னணு வடிவில் உருவாக்கப்படும், சேமிக்கப்படும், பெறப்படும் அல்லது அனுப்பப்படும் தரவு, தகவல் அல்லது ஆவணம்."
    },
    simplifiedMeaning: {
      english: "A document or information kept or exchanged electronically.",
      malayalam: "ഇലക്ട്രോണിക് രീതിയിൽ സൂക്ഷിക്കുകയോ കൈമാറുകയോ ചെയ്യുന്ന രേഖയോ വിവരമോ.",
      hindi: "इलेक्ट्रॉनिक रूप में रखी या साझा की गई जानकारी या दस्तावेज़।",
      tamil: "மின்னணு வடிவில் சேமிக்கப்படும் அல்லது பரிமாறப்படும் தகவல் அல்லது ஆவணம்."
    },
    category: "Cyber Law"
  },
  {
    term: "Bail Application",
    translations: {
      english: "Bail Application",
      malayalam: "ജാമ്യാപേക്ഷ",
      hindi: "जमानत आवेदन",
      tamil: "பிணை மனு"
    },
    definitions: {
      english: "A formal application asking a competent court or authority to release an accused person on bail.",
      malayalam: "പ്രതിയെ ജാമ്യത്തിൽ വിട്ടയക്കണമെന്ന് ആവശ്യപ്പെട്ട് അധികാരപ്പെട്ട കോടതിയിലോ അധികാരിയിലോ സമർപ്പിക്കുന്ന ഔദ്യോഗിക അപേക്ഷ.",
      hindi: "आरोपी को जमानत पर रिहा करने का अनुरोध करते हुए सक्षम न्यायालय या प्राधिकारी को दिया गया औपचारिक आवेदन।",
      tamil: "குற்றம் சாட்டப்பட்டவரைப் பிணையில் விடுவிக்குமாறு உரிய நீதிமன்றம் அல்லது அதிகார அமைப்பிடம் சமர்ப்பிக்கப்படும் முறையான மனு."
    },
    simplifiedMeaning: {
      english: "A request to the court for release on bail.",
      malayalam: "ജാമ്യത്തിൽ വിട്ടയക്കണമെന്ന് കോടതിയോട് ആവശ്യപ്പെടുന്ന അപേക്ഷ.",
      hindi: "जमानत पर रिहाई के लिए अदालत से किया गया अनुरोध।",
      tamil: "பிணையில் விடுவிக்குமாறு நீதிமன்றத்திடம் கோரும் மனு."
    },
    category: "Criminal Procedure"
  },
  {
    term: "Charge",
    translations: {
      english: "Charge",
      malayalam: "കുറ്റാരോപണം",
      hindi: "आरोप",
      tamil: "குற்றச்சாட்டு"
    },
    definitions: {
      english: "A formal accusation that a person has committed an offence, framed according to applicable criminal procedure.",
      malayalam: "ബാധകമായ ക്രിമിനൽ നടപടിക്രമപ്രകാരം ഒരാൾ കുറ്റം ചെയ്തതായി ഔദ്യോഗികമായി ഉന്നയിക്കുന്ന ആരോപണം.",
      hindi: "लागू आपराधिक प्रक्रिया के अनुसार किसी व्यक्ति पर अपराध करने का औपचारिक आरोप।",
      tamil: "பொருந்தும் குற்றவியல் நடைமுறையின்படி ஒருவர் குற்றம் செய்ததாக அதிகாரப்பூர்வமாக முன்வைக்கப்படும் குற்றச்சாட்டு."
    },
    simplifiedMeaning: {
      english: "A formal statement identifying the offence a person is alleged to have committed.",
      malayalam: "ഒരാൾ ചെയ്തതായി ആരോപിക്കപ്പെടുന്ന കുറ്റം വ്യക്തമാക്കുന്ന ഔദ്യോഗിക പ്രസ്താവന.",
      hindi: "किसी व्यक्ति पर लगाए गए अपराध को बताने वाला औपचारिक कथन।",
      tamil: "ஒருவர் செய்ததாகக் கூறப்படும் குற்றத்தை அடையாளப்படுத்தும் அதிகாரப்பூர்வ அறிக்கை."
    },
    category: "Criminal Procedure"
  },
  {
    term: "Accomplice",
    translations: {
      english: "Accomplice",
      malayalam: "കുറ്റത്തിലെ കൂട്ടാളി",
      hindi: "सह-अपराधी",
      tamil: "குற்றத்தில் உடந்தையாளர்"
    },
    definitions: {
      english: "A person who knowingly participates in or assists the commission of an offence.",
      malayalam: "ഒരു കുറ്റകൃത്യം അറിഞ്ഞുകൊണ്ട് ചെയ്യുന്നതിൽ പങ്കെടുക്കുകയോ സഹായിക്കുകയോ ചെയ്യുന്ന വ്യക്തി.",
      hindi: "वह व्यक्ति जो जानबूझकर किसी अपराध को करने में भाग लेता है या सहायता करता है।",
      tamil: "ஒரு குற்றத்தை அறிந்தே செய்வதில் பங்கேற்கும் அல்லது உதவும் நபர்."
    },
    simplifiedMeaning: {
      english: "Someone who knowingly helps another person commit an offence.",
      malayalam: "മറ്റൊരാൾ കുറ്റം ചെയ്യുന്നതിൽ അറിഞ്ഞുകൊണ്ട് സഹായിക്കുന്ന വ്യക്തി.",
      hindi: "वह व्यक्ति जो जानबूझकर दूसरे को अपराध करने में मदद करता है।",
      tamil: "மற்றொருவர் குற்றம் செய்யத் தெரிந்தே உதவும் நபர்."
    },
    category: "Criminal Law"
  },
  {
    term: "Perjury",
    translations: {
      english: "Perjury",
      malayalam: "കള്ളസാക്ഷ്യം",
      hindi: "झूठी गवाही",
      tamil: "பொய்ச் சாட்சியம்"
    },
    definitions: {
      english: "Knowingly making a materially false statement under oath or in another legally recognized setting where truth is required.",
      malayalam: "സത്യം പറയേണ്ട നിയമപരമായ സാഹചര്യത്തിൽ അറിഞ്ഞുകൊണ്ട് പ്രധാനപ്പെട്ട തെറ്റായ പ്രസ്താവന നടത്തുന്നത്.",
      hindi: "जहाँ सत्य बोलना कानूनी रूप से आवश्यक हो, वहाँ जानबूझकर महत्वपूर्ण झूठा बयान देना।",
      tamil: "உண்மை கூறுவது சட்டப்படி அவசியமான சூழலில், அறிந்தே முக்கியமான பொய்யான அறிக்கையை வழங்குதல்."
    },
    simplifiedMeaning: {
      english: "Knowingly giving false testimony or a materially false statement where the law requires truth.",
      malayalam: "നിയമപ്രകാരം സത്യം പറയേണ്ടിടത്ത് അറിഞ്ഞുകൊണ്ട് കള്ളസാക്ഷ്യം നൽകുന്നത്.",
      hindi: "जहाँ कानून के अनुसार सच बोलना आवश्यक है, वहाँ जानबूझकर झूठी गवाही देना।",
      tamil: "சட்டப்படி உண்மை கூற வேண்டிய இடத்தில் அறிந்தே பொய்ச் சாட்சியம் அளிப்பது."
    },
    category: "Criminal Law"
  },
  {
    term: "Contempt of Court",
    translations: {
      english: "Contempt of Court",
      malayalam: "കോടതിയലക്ഷ്യം",
      hindi: "न्यायालय की अवमानना",
      tamil: "நீதிமன்ற அவமதிப்பு"
    },
    definitions: {
      english: "Conduct that interferes with the administration of justice or otherwise falls within the legal definition of contempt of court.",
      malayalam: "നീതിന്യായ നിർവഹണത്തെ തടസ്സപ്പെടുത്തുന്നതോ നിയമപരമായ കോടതിയലക്ഷ്യത്തിന്റെ നിർവചനത്തിൽപ്പെടുന്നതോ ആയ പെരുമാറ്റം.",
      hindi: "ऐसा आचरण जो न्याय प्रशासन में बाधा डालता है या कानून में न्यायालय की अवमानना की परिभाषा के अंतर्गत आता है।",
      tamil: "நீதி நிர்வாகத்தில் தலையிடும் அல்லது சட்டத்தில் நீதிமன்ற அவமதிப்பாக வரையறுக்கப்படும் நடத்தை."
    },
    simplifiedMeaning: {
      english: "Behaviour that unlawfully obstructs or undermines the proper functioning of a court.",
      malayalam: "കോടതിയുടെ ശരിയായ പ്രവർത്തനത്തെ നിയമവിരുദ്ധമായി തടസ്സപ്പെടുത്തുകയോ ദുർബലപ്പെടുത്തുകയോ ചെയ്യുന്ന പെരുമാറ്റം.",
      hindi: "अदालत के उचित कामकाज में गैरकानूनी बाधा डालने या उसे कमजोर करने वाला व्यवहार।",
      tamil: "நீதிமன்றத்தின் முறையான செயல்பாட்டைச் சட்டவிரோதமாகத் தடுக்கின்ற அல்லது பாதிக்கின்ற நடத்தை."
    },
    category: "Court Proceedings"
  },
  {
    term: "Mediation",
    translations: {
      english: "Mediation",
      malayalam: "മധ്യസ്ഥത",
      hindi: "मध्यस्थता",
      tamil: "மத்தியஸ்தம்"
    },
    definitions: {
      english: "A dispute-resolution process in which a neutral third party helps the disputing parties seek a mutually acceptable settlement.",
      malayalam: "തർക്കത്തിലുള്ള കക്ഷികൾക്ക് പരസ്പരം അംഗീകരിക്കാവുന്ന ഒത്തുതീർപ്പിലെത്താൻ നിഷ്പക്ഷനായ മൂന്നാമൻ സഹായിക്കുന്ന തർക്കപരിഹാര നടപടി.",
      hindi: "विवादित पक्षों को पारस्परिक रूप से स्वीकार्य समझौते तक पहुँचने में एक निष्पक्ष तीसरा व्यक्ति सहायता करता है।",
      tamil: "தகராறில் உள்ள தரப்புகள் பரஸ்பரம் ஏற்றுக்கொள்ளக்கூடிய தீர்வை அடைய நடுநிலையான மூன்றாம் நபர் உதவும் நடைமுறை."
    },
    simplifiedMeaning: {
      english: "A neutral person helps both sides try to reach an agreement.",
      malayalam: "ഇരുകക്ഷികളും ധാരണയിലെത്താൻ നിഷ്പക്ഷനായ ഒരാൾ സഹായിക്കുന്നു.",
      hindi: "एक निष्पक्ष व्यक्ति दोनों पक्षों को समझौते पर पहुँचने में मदद करता है।",
      tamil: "இரு தரப்பினரும் உடன்பாட்டை எட்ட நடுநிலையான ஒருவர் உதவுகிறார்."
    },
    category: "Alternative Dispute Resolution"
  },
  
  {
    term: "Arbitration",
    translations: {
      english: "Arbitration",
      malayalam: "മധ്യസ്ഥ തീർപ്പാക്കൽ",
      hindi: "मध्यस्थ निर्णय प्रक्रिया",
      tamil: "நடுவர் தீர்வு"
    },
    definitions: {
      english: "A dispute-resolution process in which the parties submit their dispute to an arbitrator who gives a decision.",
      malayalam: "തർക്കത്തിലുള്ള കക്ഷികൾ തങ്ങളുടെ തർക്കം ഒരു മധ്യസ്ഥന് സമർപ്പിക്കുകയും അദ്ദേഹം തീരുമാനമെടുക്കുകയും ചെയ്യുന്ന തർക്കപരിഹാര നടപടി.",
      hindi: "विवाद समाधान की वह प्रक्रिया जिसमें पक्ष अपना विवाद एक मध्यस्थ निर्णायक को सौंपते हैं और वह निर्णय देता है।",
      tamil: "தகராறில் உள்ள தரப்புகள் தங்கள் தகராறை நடுவரிடம் ஒப்படைத்து அவர் தீர்மானம் வழங்கும் தீர்வு நடைமுறை."
    },
    simplifiedMeaning: {
      english: "A neutral decision-maker resolves a dispute outside the ordinary court process.",
      malayalam: "സാധാരണ കോടതി നടപടിക്ക് പുറത്തായി ഒരു നിഷ്പക്ഷ വ്യക്തി തർക്കത്തിൽ തീരുമാനമെടുക്കുന്നു.",
      hindi: "एक निष्पक्ष निर्णायक सामान्य अदालत की प्रक्रिया से बाहर विवाद का समाधान करता है।",
      tamil: "சாதாரண நீதிமன்ற நடைமுறைக்கு வெளியே நடுநிலையான ஒருவர் தகராறுக்குத் தீர்வு வழங்குகிறார்."
    },
    category: "Alternative Dispute Resolution"
  },
  {
    term: "Conciliation",
    translations: {
      english: "Conciliation",
      malayalam: "അനുരഞ്ജനം",
      hindi: "सुलह",
      tamil: "சமரசம்"
    },
    definitions: {
      english: "A dispute-resolution process in which a conciliator assists parties in reaching a settlement.",
      malayalam: "കക്ഷികൾക്ക് ഒത്തുതീർപ്പിലെത്താൻ അനുരഞ്ജകൻ സഹായിക്കുന്ന തർക്കപരിഹാര നടപടി.",
      hindi: "विवाद समाधान की वह प्रक्रिया जिसमें सुलहकर्ता पक्षों को समझौते तक पहुँचने में सहायता करता है।",
      tamil: "தகராறில் உள்ள தரப்புகள் உடன்பாட்டை அடைய சமரசப்படுத்துபவர் உதவும் நடைமுறை."
    },
    simplifiedMeaning: {
      english: "A neutral person helps the parties find a mutually acceptable solution.",
      malayalam: "ഇരുകക്ഷികൾക്കും അംഗീകരിക്കാവുന്ന പരിഹാരം കണ്ടെത്താൻ നിഷ്പക്ഷനായ ഒരാൾ സഹായിക്കുന്നു.",
      hindi: "एक निष्पक्ष व्यक्ति दोनों पक्षों को स्वीकार्य समाधान खोजने में मदद करता है।",
      tamil: "இரு தரப்பினரும் ஏற்றுக்கொள்ளக்கூடிய தீர்வைக் கண்டறிய நடுநிலையான ஒருவர் உதவுகிறார்."
    },
    category: "Alternative Dispute Resolution"
  },
  {
    term: "Settlement",
    translations: {
      english: "Settlement",
      malayalam: "ഒത്തുതീർപ്പ്",
      hindi: "समझौता",
      tamil: "தீர்வொப்பந்தம்"
    },
    definitions: {
      english: "An agreement resolving some or all disputed issues between parties.",
      malayalam: "കക്ഷികൾക്കിടയിലെ ചിലതോ എല്ലാ തർക്കവിഷയങ്ങളോ പരിഹരിക്കുന്ന കരാർ.",
      hindi: "पक्षों के बीच कुछ या सभी विवादित मुद्दों का समाधान करने वाला समझौता।",
      tamil: "தரப்புகளுக்கிடையிலான சில அல்லது அனைத்து தகராறு விவகாரங்களையும் தீர்க்கும் உடன்பாடு."
    },
    simplifiedMeaning: {
      english: "An agreement between parties to resolve a dispute.",
      malayalam: "ഒരു തർക്കം പരിഹരിക്കാൻ കക്ഷികൾ തമ്മിൽ ഉണ്ടാക്കുന്ന ധാരണ.",
      hindi: "विवाद सुलझाने के लिए पक्षों के बीच किया गया समझौता।",
      tamil: "ஒரு தகராறைத் தீர்க்கத் தரப்புகள் செய்துகொள்ளும் உடன்பாடு."
    },
    category: "Alternative Dispute Resolution"
  },
  {
    term: "Decree",
    translations: {
      english: "Decree",
      malayalam: "ഡിക്രി",
      hindi: "डिक्री",
      tamil: "நீதிமன்றத் தீர்ப்பாணை"
    },
    definitions: {
      english: "The formal expression of an adjudication by a civil court conclusively determining the rights of parties regarding matters in controversy, as defined by applicable procedural law.",
      malayalam: "ബാധകമായ നടപടിക്രമ നിയമപ്രകാരം തർക്കത്തിലുള്ള വിഷയങ്ങളിൽ കക്ഷികളുടെ അവകാശങ്ങൾ നിർണായകമായി തീരുമാനിക്കുന്ന സിവിൽ കോടതിയുടെ വിധിയുടെ ഔദ്യോഗിക രൂപം.",
      hindi: "लागू प्रक्रिया कानून के अनुसार विवादित विषयों पर पक्षों के अधिकारों का निर्णायक निर्धारण करने वाले दीवानी न्यायालय के निर्णय की औपचारिक अभिव्यक्ति।",
      tamil: "பொருந்தும் நடைமுறைச் சட்டத்தின்படி, தகராறிலுள்ள விவகாரங்களில் தரப்புகளின் உரிமைகளைத் தீர்மானிக்கும் உரிமையியல் நீதிமன்றத் தீர்ப்பின் முறையான வடிவம்."
    },
    simplifiedMeaning: {
      english: "A formal civil court determination of the rights of the parties in a case.",
      malayalam: "ഒരു കേസിൽ കക്ഷികളുടെ അവകാശങ്ങൾ ഔദ്യോഗികമായി നിർണയിക്കുന്ന സിവിൽ കോടതി ഉത്തരവ്.",
      hindi: "किसी मामले में पक्षों के अधिकारों का औपचारिक निर्धारण करने वाला दीवानी न्यायालय का आदेश।",
      tamil: "ஒரு வழக்கில் தரப்புகளின் உரிமைகளை முறையாகத் தீர்மானிக்கும் உரிமையியல் நீதிமன்ற ஆணை."
    },
    category: "Civil Procedure"
  },
  {
    term: "Judgment",
    translations: {
      english: "Judgment",
      malayalam: "വിധിന്യായം",
      hindi: "निर्णय",
      tamil: "தீர்ப்பு"
    },
    definitions: {
      english: "A judge's statement of the grounds for a decision or decree in a legal proceeding.",
      malayalam: "നിയമനടപടിയിൽ ഒരു തീരുമാനത്തിന്റെയോ ഡിക്രിയുടെയോ കാരണങ്ങൾ വിശദീകരിക്കുന്ന ജഡ്ജിയുടെ പ്രസ്താവന.",
      hindi: "कानूनी कार्यवाही में निर्णय या डिक्री के आधारों को बताने वाला न्यायाधीश का कथन।",
      tamil: "சட்ட நடவடிக்கையில் வழங்கப்படும் முடிவு அல்லது தீர்ப்பாணைக்கான காரணங்களை விளக்கும் நீதிபதியின் அறிக்கை."
    },
    simplifiedMeaning: {
      english: "The court's explanation of its decision and the reasons behind it.",
      malayalam: "കോടതിയുടെ തീരുമാനവും അതിന്റെ കാരണങ്ങളും വിശദീകരിക്കുന്ന പ്രസ്താവന.",
      hindi: "अदालत के निर्णय और उसके पीछे के कारणों की व्याख्या।",
      tamil: "நீதிமன்றத்தின் முடிவையும் அதற்கான காரணங்களையும் விளக்கும் அறிக்கை."
    },
    category: "Court Proceedings"
  },
  {
    term: "Deponent",
    translations: {
      english: "Deponent",
      malayalam: "സത്യവാങ്മൂലം നൽകുന്ന വ്യക്തി",
      hindi: "शपथपत्र देने वाला व्यक्ति",
      tamil: "உறுதிமொழி வழங்குபவர்"
    },
    definitions: {
      english: "A person who makes or gives a statement in an affidavit or deposition.",
      malayalam: "സത്യവാങ്മൂലത്തിലോ മൊഴിയിലോ പ്രസ്താവന നൽകുന്ന വ്യക്തി.",
      hindi: "वह व्यक्ति जो शपथपत्र या बयान में कथन देता है।",
      tamil: "உறுதிமொழிப் பத்திரம் அல்லது வாக்குமூலத்தில் அறிக்கை வழங்கும் நபர்."
    },
    simplifiedMeaning: {
      english: "The person who formally makes a statement in a sworn document or testimony.",
      malayalam: "സത്യപ്രതിജ്ഞയോടെയുള്ള രേഖയിലോ മൊഴിയിലോ ഔദ്യോഗികമായി പ്രസ്താവന നൽകുന്ന വ്യക്തി.",
      hindi: "शपथपूर्वक दिए गए दस्तावेज़ या बयान में औपचारिक कथन देने वाला व्यक्ति।",
      tamil: "உறுதிமொழியுடன் வழங்கப்படும் ஆவணம் அல்லது சாட்சியத்தில் முறையாக அறிக்கை அளிக்கும் நபர்."
    },
    category: "Legal Documents"
  },
  {
    term: "Notary",
    translations: {
      english: "Notary",
      malayalam: "നോട്ടറി",
      hindi: "नोटरी",
      tamil: "நோட்டரி"
    },
    definitions: {
      english: "A person legally authorized to perform specified notarial acts, such as attesting signatures or administering oaths.",
      malayalam: "ഒപ്പുകൾ സാക്ഷ്യപ്പെടുത്തുക, സത്യപ്രതിജ്ഞ നടത്തുക തുടങ്ങിയ നിശ്ചിത നോട്ടറി നടപടികൾ ചെയ്യാൻ നിയമപരമായി അധികാരമുള്ള വ്യക്തി.",
      hindi: "हस्ताक्षरों को प्रमाणित करने या शपथ दिलाने जैसे निर्दिष्ट नोटरी कार्य करने के लिए कानूनी रूप से अधिकृत व्यक्ति।",
      tamil: "கையொப்பங்களைச் சான்றளித்தல் அல்லது உறுதிமொழி பெறுதல் போன்ற குறிப்பிட்ட நோட்டரி நடவடிக்கைகளைச் செய்யச் சட்டப்படி அதிகாரம் பெற்ற நபர்."
    },
    simplifiedMeaning: {
      english: "An authorized person who verifies or certifies certain legal documents and signatures.",
      malayalam: "ചില നിയമരേഖകളും ഒപ്പുകളും പരിശോധിച്ച് സാക്ഷ്യപ്പെടുത്താൻ അധികാരമുള്ള വ്യക്തി.",
      hindi: "कुछ कानूनी दस्तावेज़ों और हस्ताक्षरों की पुष्टि या प्रमाणन करने के लिए अधिकृत व्यक्ति।",
      tamil: "சில சட்ட ஆவணங்களையும் கையொப்பங்களையும் சரிபார்த்துச் சான்றளிக்க அதிகாரம் பெற்ற நபர்."
    },
    category: "Legal Documents"
  },
  {
    term: "Attestation",
    translations: {
      english: "Attestation",
      malayalam: "സാക്ഷ്യപ്പെടുത്തൽ",
      hindi: "प्रमाणीकरण",
      tamil: "சான்றளித்தல்"
    },
    definitions: {
      english: "The act of witnessing or certifying the execution or authenticity of a document or signature, as required by law.",
      malayalam: "നിയമം ആവശ്യപ്പെടുന്ന രീതിയിൽ ഒരു രേഖയുടെയോ ഒപ്പിന്റെയോ നിർവഹണമോ ആധികാരികതയോ സാക്ഷ്യപ്പെടുത്തുന്ന നടപടി.",
      hindi: "कानून के अनुसार किसी दस्तावेज़ या हस्ताक्षर के निष्पादन या प्रामाणिकता की गवाही देने या पुष्टि करने की प्रक्रिया।",
      tamil: "சட்டப்படி ஒரு ஆவணம் அல்லது கையொப்பத்தின் நிறைவேற்றம் அல்லது உண்மைத்தன்மையைச் சாட்சியமளித்து உறுதிப்படுத்தும் நடைமுறை."
    },
    simplifiedMeaning: {
      english: "Officially confirming that a document or signature has been witnessed or verified.",
      malayalam: "ഒരു രേഖയോ ഒപ്പോ സാക്ഷ്യപ്പെടുത്തിയതോ പരിശോധിച്ചതോ ആണെന്ന് ഔദ്യോഗികമായി സ്ഥിരീകരിക്കുന്നത്.",
      hindi: "किसी दस्तावेज़ या हस्ताक्षर के सत्यापन या गवाही की आधिकारिक पुष्टि करना।",
      tamil: "ஒரு ஆவணம் அல்லது கையொப்பம் சாட்சியமளிக்கப்பட்டது அல்லது சரிபார்க்கப்பட்டது என அதிகாரப்பூர்வமாக உறுதிப்படுத்துதல்."
    },
    category: "Legal Documents"
  },
  {
    term: "Notice",
    translations: {
      english: "Notice",
      malayalam: "നോട്ടീസ്",
      hindi: "नोटिस",
      tamil: "சட்ட அறிவிப்பு"
    },
    definitions: {
      english: "A formal communication notifying a person or organization of a legal claim, demand, or intended action.",
      malayalam: "നിയമപരമായ അവകാശവാദം, ആവശ്യം, അല്ലെങ്കിൽ ഉദ്ദേശിക്കുന്ന നടപടി എന്നിവയെക്കുറിച്ച് വ്യക്തിയെയോ സ്ഥാപനത്തെയോ ഔദ്യോഗികമായി അറിയിക്കുന്ന സന്ദേശം.",
      hindi: "किसी व्यक्ति या संस्था को कानूनी दावा, माँग या प्रस्तावित कार्रवाई की औपचारिक सूचना देने वाला संदेश।",
      tamil: "சட்டக் கோரிக்கை, உரிமைக் கோரல் அல்லது திட்டமிடப்பட்ட நடவடிக்கை குறித்து ஒருவருக்கோ நிறுவனத்திற்கோ முறையாகத் தெரிவிக்கும் அறிவிப்பு."
    },
    simplifiedMeaning: {
      english: "A formal notice informing someone about a legal issue or demand.",
      malayalam: "ഒരു നിയമപ്രശ്നത്തെക്കുറിച്ചോ ആവശ്യത്തെക്കുറിച്ചോ ഔദ്യോഗികമായി അറിയിക്കുന്ന നോട്ടീസ്.",
      hindi: "किसी कानूनी मुद्दे या माँग के बारे में औपचारिक रूप से सूचित करने वाला नोटिस।",
      tamil: "சட்டப் பிரச்சினை அல்லது கோரிக்கை குறித்து முறையாகத் தெரிவிக்கும் அறிவிப்பு."
    },
    category: "Legal Documents"
  },
  {
    term: "Affidavit of Support",
    translations: {
      english: "Affidavit of Support",
      malayalam: "സാമ്പത്തിക പിന്തുണയ്ക്കുള്ള സത്യവാങ്മൂലം",
      hindi: "आर्थिक सहायता का शपथपत्र",
      tamil: "நிதி ஆதரவு உறுதிமொழிப் பத்திரம்"
    },
    definitions: {
      english: "A sworn statement in which a person declares an undertaking to provide financial or other specified support.",
      malayalam: "സാമ്പത്തികമോ മറ്റ് നിശ്ചിതമോ ആയ പിന്തുണ നൽകാമെന്ന് ഒരാൾ സത്യപ്രതിജ്ഞയോടെ പ്രഖ്യാപിക്കുന്ന രേഖ.",
      hindi: "एक शपथपत्र जिसमें कोई व्यक्ति आर्थिक या अन्य निर्दिष्ट सहायता देने का वचन देता है।",
      tamil: "நிதி அல்லது பிற குறிப்பிட்ட ஆதரவை வழங்குவதாக ஒருவர் உறுதிமொழி அளிக்கும் ஆவணம்."
    },
    simplifiedMeaning: {
      english: "A sworn written promise to provide specified support to another person.",
      malayalam: "മറ്റൊരാൾക്ക് നിശ്ചിത പിന്തുണ നൽകാമെന്ന സത്യപ്രതിജ്ഞയോടെയുള്ള രേഖാമൂലമുള്ള ഉറപ്പ്.",
      hindi: "किसी अन्य व्यक्ति को निर्धारित सहायता देने का शपथपूर्वक लिखित वादा।",
      tamil: "மற்றொருவருக்கு குறிப்பிட்ட ஆதரவை வழங்குவதாக உறுதிமொழியுடன் அளிக்கப்படும் எழுத்துப்பூர்வ வாக்குறுதி."
    },
    category: "Legal Documents"
  },
  
  {
    term: "Plaintiff",
    translations: {
      english: "Plaintiff",
      malayalam: "വാദി",
      hindi: "वादी",
      tamil: "வாதி"
    },
    definitions: {
      english: "A person or entity that initiates a civil lawsuit against another party.",
      malayalam: "മറ്റൊരു കക്ഷിക്കെതിരെ സിവിൽ കേസ് ആരംഭിക്കുന്ന വ്യക്തിയോ സ്ഥാപനമോ.",
      hindi: "वह व्यक्ति या संस्था जो किसी अन्य पक्ष के विरुद्ध दीवानी मुकदमा शुरू करती है।",
      tamil: "மற்றொரு தரப்புக்கு எதிராக உரிமையியல் வழக்கைத் தொடங்கும் நபர் அல்லது நிறுவனம்."
    },
    simplifiedMeaning: {
      english: "The person or organization that brings a civil case to court.",
      malayalam: "സിവിൽ കേസ് കോടതിയിൽ ഫയൽ ചെയ്യുന്ന വ്യക്തിയോ സ്ഥാപനമോ.",
      hindi: "वह व्यक्ति या संस्था जो दीवानी मामला अदालत में लाती है।",
      tamil: "உரிமையியல் வழக்கை நீதிமன்றத்தில் தொடுக்கும் நபர் அல்லது நிறுவனம்."
    },
    category: "Civil Procedure"
  },
  {
    term: "Defendant",
    translations: {
      english: "Defendant",
      malayalam: "പ്രതിവാദി",
      hindi: "प्रतिवादी",
      tamil: "எதிர்வாதி"
    },
    definitions: {
      english: "A person or entity against whom a civil lawsuit is brought.",
      malayalam: "ഒരു സിവിൽ കേസ് ഉന്നയിക്കപ്പെടുന്ന വ്യക്തിയോ സ്ഥാപനമോ.",
      hindi: "वह व्यक्ति या संस्था जिसके विरुद्ध दीवानी मुकदमा दायर किया जाता है।",
      tamil: "உரிமையியல் வழக்கு தொடரப்படும் நபர் அல்லது நிறுவனம்."
    },
    simplifiedMeaning: {
      english: "The person or organization being sued in a civil case.",
      malayalam: "സിവിൽ കേസിൽ എതിർകക്ഷിയായി കേസ് നേരിടുന്ന വ്യക്തിയോ സ്ഥാപനമോ.",
      hindi: "वह व्यक्ति या संस्था जिसके विरुद्ध दीवानी मुकदमा चलाया जाता है।",
      tamil: "உரிமையியல் வழக்கில் வழக்கை எதிர்கொள்ளும் நபர் அல்லது நிறுவனம்."
    },
    category: "Civil Procedure"
  },
  {
    term: "Cause of Action",
    translations: {
      english: "Cause of Action",
      malayalam: "വ്യവഹാരകാരണം",
      hindi: "वाद हेतु कारण",
      tamil: "வழக்குக்கான காரணம்"
    },
    definitions: {
      english: "The facts that give a person the legal basis to bring a claim or lawsuit.",
      malayalam: "ഒരു അവകാശവാദമോ കേസോ ഉന്നയിക്കാൻ വ്യക്തിക്ക് നിയമപരമായ അടിസ്ഥാനം നൽകുന്ന വസ്തുതകൾ.",
      hindi: "वे तथ्य जो किसी व्यक्ति को दावा या मुकदमा दायर करने का कानूनी आधार देते हैं।",
      tamil: "ஒருவர் உரிமைக் கோரிக்கை அல்லது வழக்கைத் தொடங்குவதற்கான சட்ட அடிப்படையை வழங்கும் உண்மைகள்."
    },
    simplifiedMeaning: {
      english: "The facts that give someone a legal reason to file a case.",
      malayalam: "ഒരു കേസ് ഫയൽ ചെയ്യാൻ നിയമപരമായ കാരണം നൽകുന്ന വസ്തുതകൾ.",
      hindi: "वे तथ्य जो किसी को मुकदमा दायर करने का कानूनी कारण देते हैं।",
      tamil: "ஒருவர் வழக்குத் தொடர சட்டபூர்வமான காரணத்தை வழங்கும் உண்மைகள்."
    },
    category: "Civil Procedure"
  },
  {
    term: "Burden of Proof",
    translations: {
      english: "Burden of Proof",
      malayalam: "തെളിവിന്റെ ഭാരം",
      hindi: "प्रमाण का भार",
      tamil: "நிரூபணச் சுமை"
    },
    definitions: {
      english: "The legal obligation to prove facts or allegations in a proceeding.",
      malayalam: "ഒരു നിയമനടപടിയിൽ വസ്തുതകളോ ആരോപണങ്ങളോ തെളിയിക്കാനുള്ള നിയമപരമായ ബാധ്യത.",
      hindi: "किसी कार्यवाही में तथ्यों या आरोपों को सिद्ध करने का कानूनी दायित्व।",
      tamil: "ஒரு சட்ட நடவடிக்கையில் உண்மைகள் அல்லது குற்றச்சாட்டுகளை நிரூபிக்க வேண்டிய சட்டபூர்வக் கடமை."
    },
    simplifiedMeaning: {
      english: "The responsibility to provide enough evidence to prove a claim or allegation.",
      malayalam: "ഒരു അവകാശവാദമോ ആരോപണമോ തെളിയിക്കാൻ മതിയായ തെളിവുകൾ നൽകേണ്ട ഉത്തരവാദിത്വം.",
      hindi: "किसी दावे या आरोप को साबित करने के लिए पर्याप्त साक्ष्य देने की जिम्मेदारी।",
      tamil: "ஒரு கோரிக்கை அல்லது குற்றச்சாட்டை நிரூபிக்கப் போதுமான சான்றுகளை வழங்க வேண்டிய பொறுப்பு."
    },
    category: "Evidence Law"
  },
  {
    term: "Prima Facie",
    translations: {
      english: "Prima Facie",
      malayalam: "പ്രഥമദൃഷ്ട്യാ",
      hindi: "प्रथम दृष्टया",
      tamil: "முதற்கண் பார்வையில்"
    },
    definitions: {
      english: "Based on the initial appearance of facts, sufficient to support a conclusion unless rebutted or disproved.",
      malayalam: "വസ്തുതകളുടെ പ്രാഥമിക പരിശോധനയിൽ നിന്ന് ലഭിക്കുന്ന, എതിർതെളിവുകളാൽ ഖണ്ഡിക്കപ്പെടാത്തിടത്തോളം ഒരു നിഗമനത്തെ പിന്തുണയ്ക്കുന്ന അവസ്ഥ.",
      hindi: "तथ्यों के प्रारंभिक रूप से दिखाई देने वाले स्वरूप के आधार पर निकला निष्कर्ष, जिसे विपरीत साक्ष्य से खंडित किया जा सकता है।",
      tamil: "உண்மைகளின் ஆரம்பத் தோற்றத்தின் அடிப்படையில் உருவாகும், எதிர்ச் சான்றுகளால் மறுக்கப்படாவிட்டால் ஒரு முடிவை ஆதரிக்கும் நிலை."
    },
    simplifiedMeaning: {
      english: "At first sight, the available facts appear to support a claim.",
      malayalam: "ആദ്യനോട്ടത്തിൽ ലഭ്യമായ വസ്തുതകൾ ഒരു അവകാശവാദത്തെ പിന്തുണയ്ക്കുന്നതായി തോന്നുന്നത്.",
      hindi: "पहली नज़र में उपलब्ध तथ्य किसी दावे का समर्थन करते दिखाई देते हैं।",
      tamil: "முதற்கண் பார்வையில் கிடைக்கும் உண்மைகள் ஒரு கோரிக்கையை ஆதரிப்பதாகத் தோன்றுவது."
    },
    category: "Legal Principles"
  },
  {
    term: "Natural Justice",
    translations: {
      english: "Natural Justice",
      malayalam: "സ്വാഭാവിക നീതിയുടെ തത്വങ്ങൾ",
      hindi: "प्राकृतिक न्याय",
      tamil: "இயற்கை நீதி"
    },
    definitions: {
      english: "Principles of procedural fairness, including a fair opportunity to be heard and an impartial decision-maker.",
      malayalam: "ന്യായമായി വാദം കേൾക്കാനുള്ള അവസരവും നിഷ്പക്ഷമായ തീരുമാനമെടുക്കുന്ന വ്യക്തിയും ഉൾപ്പെടുന്ന നടപടിക്രമ നീതിയുടെ തത്വങ്ങൾ.",
      hindi: "प्रक्रियात्मक निष्पक्षता के सिद्धांत, जिनमें सुनवाई का उचित अवसर और निष्पक्ष निर्णयकर्ता शामिल हैं।",
      tamil: "நியாயமாகக் கருத்துத் தெரிவிக்கும் வாய்ப்பும் பாரபட்சமற்ற முடிவெடுப்பவரும் அடங்கிய நடைமுறை நியாயக் கொள்கைகள்."
    },
    simplifiedMeaning: {
      english: "Fair procedures that give people a chance to be heard and require impartial decisions.",
      malayalam: "ആളുകൾക്ക് വാദം പറയാൻ അവസരം നൽകുകയും നിഷ്പക്ഷമായ തീരുമാനങ്ങൾ ഉറപ്പാക്കുകയും ചെയ്യുന്ന നീതിപൂർവമായ നടപടികൾ.",
      hindi: "ऐसी निष्पक्ष प्रक्रिया जिसमें लोगों को अपनी बात रखने का अवसर मिले और निर्णय निष्पक्ष हो।",
      tamil: "மக்கள் தங்கள் கருத்தைத் தெரிவிக்க வாய்ப்பளித்து, பாரபட்சமற்ற முடிவுகளை உறுதிசெய்யும் நியாயமான நடைமுறைகள்."
    },
    category: "Legal Principles"
  },
  {
    term: "Estoppel",
    translations: {
      english: "Estoppel",
      malayalam: "എസ്റ്റോപ്പൽ",
      hindi: "विबंध",
      tamil: "மறுப்புத் தடைக் கோட்பாடு"
    },
    definitions: {
      english: "A legal principle that may prevent a person from denying or contradicting a position or representation when the applicable legal requirements are met.",
      malayalam: "ബാധകമായ നിയമനിബന്ധനകൾ പാലിക്കപ്പെടുമ്പോൾ, ഒരാൾ മുമ്പ് സ്വീകരിച്ച നിലപാടോ നൽകിയ പ്രസ്താവനയോ നിഷേധിക്കുന്നതിൽ നിന്ന് തടയാവുന്ന നിയമതത്വം.",
      hindi: "ऐसा कानूनी सिद्धांत जो निर्धारित कानूनी शर्तें पूरी होने पर किसी व्यक्ति को अपनी पूर्व स्थिति या कथन से मुकरने से रोक सकता है।",
      tamil: "பொருந்தும் சட்ட நிபந்தனைகள் பூர்த்தியாகும்போது, ஒருவர் முன்பு எடுத்த நிலைப்பாட்டை அல்லது கூறிய கூற்றை மறுப்பதைத் தடுக்கக்கூடிய சட்டக் கொள்கை."
    },
    simplifiedMeaning: {
      english: "In certain circumstances, a person may be prevented from contradicting an earlier statement or position.",
      malayalam: "ചില സാഹചര്യങ്ങളിൽ ഒരാൾക്ക് മുമ്പ് പറഞ്ഞതിനെതിരായി പിന്നീട് നിലപാട് സ്വീകരിക്കുന്നത് തടയാം.",
      hindi: "कुछ परिस्थितियों में किसी व्यक्ति को अपने पहले के कथन के विपरीत बात कहने से रोका जा सकता है।",
      tamil: "சில சூழ்நிலைகளில் ஒருவர் முன்பு கூறியதற்கு முரணாகப் பேசுவதைத் தடுக்கலாம்."
    },
    category: "Legal Principles"
  },
  {
    term: "Mens Rea",
    translations: {
      english: "Mens Rea",
      malayalam: "കുറ്റകരമായ മാനസികാവസ്ഥ",
      hindi: "आपराधिक मनःस्थिति",
      tamil: "குற்ற நோக்க மனநிலை"
    },
    definitions: {
      english: "The mental element required for a particular offence, such as intention or knowledge, where required by law.",
      malayalam: "നിയമം ആവശ്യപ്പെടുന്നിടത്ത് ഉദ്ദേശ്യമോ അറിവോ പോലുള്ള ഒരു പ്രത്യേക കുറ്റത്തിന് ആവശ്യമായ മാനസിക ഘടകം.",
      hindi: "जहाँ कानून आवश्यक मानता है, वहाँ किसी विशेष अपराध के लिए अपेक्षित मानसिक तत्व, जैसे इरादा या जानकारी।",
      tamil: "சட்டம் தேவைப்படுத்தும் இடங்களில், நோக்கம் அல்லது அறிவு போன்ற குறிப்பிட்ட குற்றத்திற்குத் தேவையான மனநிலைக் கூறு."
    },
    simplifiedMeaning: {
      english: "The guilty state of mind that the law may require for an offence.",
      malayalam: "ഒരു കുറ്റത്തിന് നിയമം ആവശ്യപ്പെടാവുന്ന കുറ്റകരമായ മാനസികാവസ്ഥ.",
      hindi: "वह दोषपूर्ण मानसिक स्थिति जिसकी किसी अपराध के लिए कानून को आवश्यकता हो सकती है।",
      tamil: "ஒரு குற்றத்திற்கு சட்டம் தேவைப்படுத்தக்கூடிய குற்ற நோக்க மனநிலை."
    },
    category: "Criminal Law"
  },
  {
    term: "Actus Reus",
    translations: {
      english: "Actus Reus",
      malayalam: "കുറ്റകരമായ പ്രവൃത്തി",
      hindi: "आपराधिक कृत्य",
      tamil: "குற்றச் செயல்"
    },
    definitions: {
      english: "The conduct or external element of an offence that must be established under the applicable law.",
      malayalam: "ബാധകമായ നിയമപ്രകാരം തെളിയിക്കേണ്ട കുറ്റത്തിന്റെ പ്രവൃത്തിപരമായ അല്ലെങ്കിൽ ബാഹ്യ ഘടകം.",
      hindi: "अपराध का वह आचरण या बाहरी तत्व जिसे लागू कानून के अनुसार सिद्ध करना आवश्यक है।",
      tamil: "பொருந்தும் சட்டத்தின்படி நிரூபிக்கப்பட வேண்டிய குற்றத்தின் செயல்பாட்டு அல்லது வெளிப்புறக் கூறு."
    },
    simplifiedMeaning: {
      english: "The act or conduct that forms part of a criminal offence.",
      malayalam: "ഒരു ക്രിമിനൽ കുറ്റത്തിന്റെ ഭാഗമായ പ്രവൃത്തിയോ പെരുമാറ്റമോ.",
      hindi: "वह कार्य या आचरण जो आपराधिक अपराध का हिस्सा होता है।",
      tamil: "குற்றத்தின் ஒரு பகுதியாக அமையும் செயல் அல்லது நடத்தை."
    },
    category: "Criminal Law"
  },
  {
    term: "Double Jeopardy",
    translations: {
      english: "Double Jeopardy",
      malayalam: "ഒരേ കുറ്റത്തിന് വീണ്ടും വിചാരണ നേരിടുന്നതിൽ നിന്നുള്ള സംരക്ഷണം",
      hindi: "दोहरा दंडनिषेध",
      tamil: "ஒரே குற்றத்திற்காக இருமுறை விசாரிக்கப்படுவதிலிருந்து பாதுகாப்பு"
    },
    definitions: {
      english: "A legal protection against being prosecuted or punished more than once for the same offence in circumstances prohibited by law.",
      malayalam: "നിയമം നിരോധിക്കുന്ന സാഹചര്യങ്ങളിൽ ഒരേ കുറ്റത്തിന് ഒന്നിലധികം തവണ പ്രോസിക്യൂഷനോ ശിക്ഷയോ നേരിടുന്നതിൽ നിന്നുള്ള നിയമസംരക്ഷണം.",
      hindi: "कानून द्वारा निषिद्ध परिस्थितियों में एक ही अपराध के लिए एक से अधिक बार अभियोजन या दंड से बचाने वाला कानूनी संरक्षण।",
      tamil: "சட்டம் தடைசெய்யும் சூழ்நிலைகளில் ஒரே குற்றத்திற்காக ஒன்றுக்கு மேற்பட்ட முறை வழக்குத் தொடரப்படுதல் அல்லது தண்டிக்கப்படுதல் ஆகியவற்றிலிருந்து வழங்கப்படும் சட்டப் பாதுகாப்பு."
    },
    simplifiedMeaning: {
      english: "Protection against being tried or punished twice for the same offence where the law prohibits it.",
      malayalam: "നിയമം നിരോധിക്കുന്ന സാഹചര്യത്തിൽ ഒരേ കുറ്റത്തിന് രണ്ടുതവണ വിചാരണ ചെയ്യപ്പെടുകയോ ശിക്ഷിക്കപ്പെടുകയോ ചെയ്യുന്നതിൽ നിന്നുള്ള സംരക്ഷണം.",
      hindi: "जहाँ कानून रोकता है, वहाँ एक ही अपराध के लिए दोबारा मुकदमा या दंड होने से सुरक्षा।",
      tamil: "சட்டம் தடைசெய்யும் நிலையில் ஒரே குற்றத்திற்காக மீண்டும் விசாரிக்கப்படுதல் அல்லது தண்டிக்கப்படுதல் ஆகியவற்றிலிருந்து பாதுகாப்பு."
    },
    category: "Criminal Law"
  },
  {
    term: "Legal Remedy",
    translations: {
      english: "Legal Remedy",
      malayalam: "നിയമപരമായ പരിഹാരം",
      hindi: "कानूनी उपचार",
      tamil: "சட்ட நிவாரணம்"
    },
    definitions: {
      english: "A form of relief or enforcement available through law or a court to address a legal wrong or protect a right.",
      malayalam: "നിയമലംഘനം പരിഹരിക്കാനോ അവകാശം സംരക്ഷിക്കാനോ നിയമത്തിലൂടെയോ കോടതിയിലൂടെയോ ലഭിക്കുന്ന പരിഹാരമോ നടപ്പാക്കൽ നടപടിയോ.",
      hindi: "कानूनी गलत कार्य का समाधान करने या किसी अधिकार की रक्षा के लिए कानून या न्यायालय के माध्यम से उपलब्ध राहत या प्रवर्तन।",
      tamil: "சட்டத் தவறைச் சரிசெய்ய அல்லது உரிமையைப் பாதுகாக்கச் சட்டம் அல்லது நீதிமன்றத்தின் மூலம் கிடைக்கும் நிவாரணம் அல்லது அமலாக்க நடவடிக்கை."
    },
    simplifiedMeaning: {
      english: "A lawful way to address a wrong or protect a person's rights.",
      malayalam: "ഒരു തെറ്റ് പരിഹരിക്കാനോ ഒരാളുടെ അവകാശങ്ങൾ സംരക്ഷിക്കാനോ ഉള്ള നിയമപരമായ മാർഗം.",
      hindi: "किसी गलत कार्य का समाधान करने या अधिकारों की रक्षा करने का कानूनी तरीका।",
      tamil: "ஒரு தவறைச் சரிசெய்ய அல்லது ஒருவரின் உரிமைகளைப் பாதுகாக்கும் சட்டபூர்வமான வழி."
    },
    category: "Legal Principles"
  }
];

module.exports = legalTerms;

