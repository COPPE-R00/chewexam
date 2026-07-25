import { useState, useEffect, useRef } from "react";

function generateId() {
  return Math.random().toString(36).substring(2,10) + Date.now().toString(36);
}

const PAPERS = {
  "1":{name:"Paper 1",color:"#0ea5e9",gradient:"linear-gradient(135deg,#0c4a6e,#0369a1)",icon:"📋",
    subjects:["CHE 211","CHE 213","CHE 215","CHE 218","GNP 123","CHE 254","CHE 262","CHE 214","ENT 111","CHE 240","CHE 233","CHE 221","CHE 226"]},
  "2":{name:"Paper 2",color:"#10b981",gradient:"linear-gradient(135deg,#064e3b,#059669)",icon:"📗",
    subjects:["CHE 246","CHE 223","CHE 224","CHE 225","CHE 231","CHE 241","CHE 261","CHE 263","CHE 264","CHE 253","CHE 242"]},
  "3":{name:"Paper 3",color:"#f59e0b",gradient:"linear-gradient(135deg,#78350f,#d97706)",icon:"📙",
    subjects:["CHE 234","CHE 232","CHE 235","CHE 236","CHE 225","CHE 244","CHE 245","CHE 251","CHE 252","CHE 237","CHE 257","CHE 239"]},
};

const ALL_Q = [
  // PAPER 1
  {p:"1",s:"CHE 211",q:"CHPRBN was established by:",o:["Decree 60 of 1992","Decree 61 of 1992","Decree 61 of 1990","Decree 60 of 1990"],a:1,e:"CHPRBN = Decree 61 of 1992. Registers, licenses and disciplines all CHEWs and JCHEWs in Nigeria."},
  {p:"1",s:"CHE 211",q:"NACHPN stands for:",o:["National Association of Country Health Practitioners","National Association of Community Health Practitioners of Nigeria","National Association of Community Health Practitioners of the Nation","National Association of Concerned Health Practitioners"],a:1,e:"NACHPN = National Association of Community Health Practitioners of Nigeria."},
  {p:"1",s:"CHE 211",q:"Etiquette is best defined as:",o:["System guiding moral behaviour","Code of manners, behaviours and action","Qualities a person believes important","Occupation demanding high education"],a:1,e:"Etiquette = Code of manners, behaviours and action. Being warm and attentive IS etiquette."},
  {p:"1",s:"CHE 211",q:"One NOT acceptable professional behaviour for CHEW:",o:["Positive attitude to work","Genuine desire to help people","Honest explanation of charges","Flare up with patients"],a:3,e:"Flaring up with patients is completely unacceptable professional behaviour for a CHEW."},
  {p:"1",s:"CHE 211",q:"Ethics breach is viewed with:",o:["Approval by whole society","Disapproval by selected few","Disapproval by totality of society","Approval by professional body"],a:2,e:"Ethics breach = disapproval by TOTALITY of society — universal professional standard."},
  {p:"1",s:"CHE 211",q:"NOT a form of defence mechanism:",o:["Denial","Projection","Institution","Regression"],a:2,e:"Institution is NOT a defence mechanism. Real ones: Denial, Projection, Regression, Repression, Rationalisation, Displacement."},
  {p:"1",s:"CHE 211",q:"NOT a professional responsibility of CHEW:",o:["Caring for the sick","Calculate money spent on each client","Training others","Evaluating and conducting research"],a:1,e:"Calculating money spent per client is NOT a CHEW professional responsibility."},
  {p:"1",s:"CHE 211",q:"NOT a code of conduct of community health practitioner:",o:["Set a high standard","Use of standing orders","Knowing your colleague","Maintaining two-way referral"],a:2,e:"'Knowing your colleague' is not a formal code of conduct item for CHEWs."},
  {p:"1",s:"CHE 213",q:"A person who sends a message is known as:",o:["Decoder","Encoder","Receiver","Messenger"],a:1,e:"Encoder = SENDER of message. Decoder = receiver. In health education the CHEW is usually the encoder."},
  {p:"1",s:"CHE 213",q:"NOT an advantage of teaching aids:",o:["Arouse interest","Welcoming of participants","Help make points clear","Help consolidate points"],a:1,e:"Welcoming participants = NOT an advantage of teaching aids — it is basic courtesy, not a teaching aid benefit."},
  {p:"1",s:"CHE 213",q:"NOT a barrier to effective communication:",o:["Personality","Poor listening","Poor planning","Adequate knowledge"],a:3,e:"Adequate knowledge = NOT a barrier — it FACILITATES communication. Poor listening and planning are barriers."},
  {p:"1",s:"CHE 213",q:"To promote effective group discussion you must:",o:["Believe time and place not relevant","Greet group in English only","Listen more than talk","Permit participants to introduce any topic"],a:2,e:"Listen MORE than talk = key principle of effective group discussion."},
  {p:"1",s:"CHE 213",q:"Example of audio-visual method of communication:",o:["Blackboard","Television","Tapes","Radio"],a:1,e:"Television = audio-visual (both sound + image). Radio = audio only. Blackboard = visual only."},
  {p:"1",s:"CHE 213",q:"A person who does NOT conform with norms of society:",o:["Uncompromising","Deviant","Extrovert","Aggressive"],a:1,e:"DEVIANT = person who consistently does not conform to the norms of society."},
  {p:"1",s:"CHE 213",q:"Principle of health education NOT one of these:",o:["Clarity","Simplicity","Adaptability","Personality"],a:3,e:"Personality is NOT a principle of health education. Principles include: Clarity, Simplicity, Adaptability."},
  {p:"1",s:"CHE 215",q:"PHC approach of Nigerian Health System emphasizes:",o:["Out-in approach","Bottom-up approach","In-out approach","Up-down approach"],a:1,e:"PHC = BOTTOM-UP. Communities involved in planning, implementation AND evaluation."},
  {p:"1",s:"CHE 215",q:"Nigeria formally launched PHC in:",o:["1975","1978","1985","1988"],a:3,e:"Nigeria formally launched PHC in 1988 under Prof. Olikoye Ransome-Kuti. Alma-Ata = 1978."},
  {p:"1",s:"CHE 215",q:"NOT a component of PHC:",o:["MCH including Family Planning","Exclusive breastfeeding","Treatment of common diseases","Provision of essential drugs"],a:1,e:"EBF is NOT one of the 8 PHC components. The 8: Education, Nutrition, Safe water/sanitation, MCH/FP, Immunization, Endemic prevention, Common disease treatment, Essential drugs."},
  {p:"1",s:"CHE 215",q:"Community involvement means:",o:["Identifying demographic pattern","Community participation in planning and implementation","Identify social factors","Identify work done by community"],a:1,e:"Community involvement = participation in PLANNING AND IMPLEMENTATION of programmes."},
  {p:"1",s:"CHE 215",q:"Clinic based functions of CHEW does NOT include:",o:["Spending 70% of time in clinic","Carry out day-to-day clinic admin with CHO","Collect monitoring data","Provide integrated PHC services"],a:0,e:"CHEWs spend 30% in clinic, 70% COMMUNITY. NOT 70% in clinic."},
  {p:"1",s:"CHE 218",q:"Steps in planning situation analysis EXCEPT:",o:["Contacting development committee","Obtaining materials and instruments","Excluding members of community","Arranging logistics"],a:2,e:"Community members must NEVER be excluded from planning — inclusion is a core PHC principle."},
  {p:"1",s:"CHE 218",q:"Common method used in community diagnosis:",o:["Role play","Interview","Lecture","Story telling"],a:1,e:"INTERVIEW = most common method used in community diagnosis to gather data."},
  {p:"1",s:"CHE 218",q:"Resources available in community include all EXCEPT:",o:["Industries","Markets","School children","Health facilities"],a:2,e:"School CHILDREN are NOT a community resource — they are beneficiaries. Resources: industries, markets, health facilities."},
  {p:"1",s:"CHE 218",q:"PHC House Numbering System format:",o:["PHC/2/15/099","PHC/002/015/099","PHC/02/015/099","PHC/02/15/99"],a:2,e:"PHC House Numbering = PHC/02/015/099 format (PHC/LGA code/Ward/House number)."},
  {p:"1",s:"GNP 123",q:"Pharmacovigilance is also known as:",o:["Drug interaction","Drug safety","Drug composition","Drug allergy"],a:1,e:"Pharmacovigilance = DRUG SAFETY — detecting and preventing adverse drug reactions. Report ADRs to NAFDAC."},
  {p:"1",s:"GNP 123",q:"Drug NOT classified by function:",o:["Antimalarial","Antibiotics","Capsule","Antiemetics"],a:2,e:"Capsule = dosage FORM (how drug is presented), NOT a functional classification."},
  {p:"1",s:"GNP 123",q:"Drug sources do NOT include:",o:["Recombinant DNA","Plant source","Biodegradable source","Animal source"],a:2,e:"Biodegradable source DOES NOT EXIST as a drug source. Real sources: Plant, Animal, Mineral, Microbiological, Synthetic, Recombinant DNA."},
  {p:"1",s:"GNP 123",q:"Principle of drug administration NOT one of these:",o:["Right time","Right dose","Right patient","Right cost"],a:3,e:"Right COST is NOT a principle. The 6 Rights: Patient, Drug, Dose, Route, Time, Documentation."},
  {p:"1",s:"GNP 123",q:"Which vitamin is NOT fat-soluble:",o:["Vitamin E","Vitamin A","Vitamin B","Vitamin D"],a:2,e:"Vitamin B = WATER-SOLUBLE. Fat-soluble: ADEK (A,D,E,K). Very common exam trap!"},
  {p:"1",s:"GNP 123",q:"Example of antifungal agent:",o:["Chloroquine","Nystatin","Pyrimethamine","Aspirin"],a:1,e:"Nystatin = ANTIFUNGAL. Chloroquine = antimalarial. Aspirin = analgesic/antipyretic."},
  {p:"1",s:"GNP 123",q:"Fastest route of drug administration:",o:["Oral","Sublingual","Intramuscular","Intravenous (IV)"],a:3,e:"IV = fastest — directly into bloodstream. Order: IV→Sublingual→IM→SC→Oral→Rectal."},
  {p:"1",s:"CHE 254",q:"In PHC essential drugs are:",o:["Expensive drugs","Drugs in adequate dosage","Drugs for rare diseases","Drugs indispensable for health needs of majority"],a:3,e:"Essential drugs = satisfy healthcare needs of the MAJORITY of the population."},
  {p:"1",s:"CHE 254",q:"DRF seed fund means:",o:["Monies planted in drug store","Funds from drug sales","Initial fund used to procure drugs","Initial profit deposited in bank"],a:2,e:"Seed fund = INITIAL FUND used to procure the first set of drugs — creates a revolving system."},
  {p:"1",s:"CHE 254",q:"NOT an anticonvulsant drug:",o:["Diazepam","Paraldehyde","Bisacodyl","Phenobarbitone"],a:2,e:"Bisacodyl = LAXATIVE. Anticonvulsants: Diazepam, Paraldehyde, Phenobarbitone."},
  {p:"1",s:"CHE 254",q:"NOT an antihelminthic drug:",o:["Levamisole","Niclosamide","Piperazine","Atropine"],a:3,e:"Atropine = anticholinergic/antispasmodic. Antihelminthics: Levamisole, Niclosamide, Piperazine."},
  {p:"1",s:"CHE 262",q:"Two-way referral is complete when:",o:["Patient fully recovered","Patient dies","There is feedback","Patient partially recovered"],a:2,e:"Two-way referral complete = FEEDBACK received from higher level. Purpose = CONTINUITY OF CARE."},
  {p:"1",s:"CHE 262",q:"Purpose of two-way referral is to:",o:["Make good flow of patients","Ensure continuity of care","Make supervision easy","Explain drugs to patient"],a:1,e:"Two-way referral purpose = ENSURE CONTINUITY OF CARE."},
  {p:"1",s:"CHE 262",q:"Complaint NOT in JCHEW standing orders managed by:",o:["Refer to a CHEW","Refer to traditional healer","Use past experience","Keep trying"],a:0,e:"JCHEW → CHEW (one step up). Pathway: JCHEW→CHEW→CHO→Doctor→Secondary→Tertiary."},
  {p:"1",s:"CHE 262",q:"Service NOT managed during outreach:",o:["ANC","Urine testing","Immunization","Dilation and curettage"],a:3,e:"D&C = surgical procedure. CANNOT be done at outreach. Outreach: ANC, immunization, FP, urine tests."},
  {p:"1",s:"CHE 262",q:"Cases handled at PHC level EXCEPT:",o:["Malaria","Worm infestation","Minor wound dressing","Ectopic pregnancy"],a:3,e:"Ectopic pregnancy = surgical emergency → cannot be handled at PHC level."},
  {p:"1",s:"CHE 262",q:"Places that CANNOT be used for outreach stations:",o:["Village head compound","Airport","Classrooms","Market place"],a:1,e:"Airport is NOT a suitable outreach location. Good locations: village compounds, schools, markets."},
  {p:"1",s:"CHE 214",q:"Body-building foods include all EXCEPT:",o:["Fish","Beans","Meat","Sweet potato"],a:3,e:"Sweet potato = ENERGY food (carbohydrate). Body-building = PROTEINS: fish, beans, meat, eggs."},
  {p:"1",s:"CHE 214",q:"When MUAC strip reads yellow it means:",o:["Mildly/moderately malnourished","Baby is well fed","Baby is under age","Baby is sick"],a:0,e:"YELLOW (11.5-12.5cm) = MAM (Mild/Moderate Acute Malnutrition). RED = SAM. GREEN = Normal."},
  {p:"1",s:"CHE 214",q:"Factors affecting nutritional status EXCEPT:",o:["Frequency of feeds","Political factors","Family size","Seasonal variation"],a:1,e:"Political factors do NOT directly affect nutritional status. Factors: frequency of feeds, family size, seasonal variation."},
  {p:"1",s:"CHE 214",q:"MUAC RED colour means:",o:["Normal nutrition","MAM","SAM — severe acute malnutrition","Overnutrition"],a:2,e:"RED (<11.5cm) = SAM → RUTF (Ready-to-Use Therapeutic Food) immediately."},
  {p:"1",s:"ENT 111",q:"Unit for measurement of noise:",o:["Barometer","Dosimeter","Decibel","Sound level meter"],a:2,e:"DECIBEL (dB) = unit for measuring noise. Safe level = <85 dB for 8 hours."},
  {p:"1",s:"ENT 111",q:"Solid waste of food, vegetables and animal products called:",o:["Rubbish","Trash","Garbage","Waste"],a:2,e:"GARBAGE = solid waste from food, vegetables and animal products. Rubbish = non-food dry waste."},
  {p:"1",s:"ENT 111",q:"Sources of noise pollution EXCEPT:",o:["Night clubs","Hospitals","Quarries","Factories"],a:1,e:"Hospitals should be QUIET — they are NOT sources of noise pollution."},
  {p:"1",s:"ENT 111",q:"Harmful traditions influencing health EXCEPT:",o:["Female genital cutting","Drinking blue for family planning","Male circumcision","Taboo marks/Scarification"],a:2,e:"Male circumcision = BENEFICIAL (reduces HIV risk, UTIs). The others listed are harmful practices."},
  {p:"1",s:"ENT 111",q:"Cultural factors affecting health EXCEPT:",o:["Literacy level","Taboos","Beliefs","Tradition"],a:0,e:"Literacy level = NOT a cultural factor — it is a social/educational factor. Cultural: taboos, beliefs, tradition."},
  {p:"1",s:"CHE 240",q:"NOT within scope of occupational health:",o:["Pre-employment medical exam","Control of work environment","Providing accommodation for workers","Control of workplace effluent"],a:2,e:"Providing accommodation = HR/welfare function, NOT occupational health scope."},
  {p:"1",s:"CHE 240",q:"ILO/WHO occupational health aim (1950):",o:["Maximum productivity only","Maintain highest physical, mental and social wellbeing of workers","Provide entertainment","Manage hospital services"],a:1,e:"ILO/WHO (1950) = Maintain HIGHEST degree of physical, mental and social wellbeing of ALL workers."},
  {p:"1",s:"CHE 240",q:"NOT a factor affecting health in Nigeria:",o:["Environmental factors","Social factors","Cultural factors","Professional factors"],a:3,e:"Professional factors are NOT recognized as health-affecting factors. Real factors: environmental, social, cultural, economic."},
  {p:"1",s:"CHE 233",q:"NOT a form of defence mechanism:",o:["Denial","Projection","Institution","Regression"],a:2,e:"Institution is NOT a defence mechanism. Real ones: Denial, Projection, Regression, Repression, Rationalisation, Displacement."},
  {p:"1",s:"CHE 233",q:"Disadvantage of village system of mental health care:",o:["Reduces rate of relapse","Allows relatives to participate","Patients refusal of drugs","Promotes effective rehabilitation"],a:2,e:"Patients' refusal of drugs = a disadvantage of the village system of mental health care."},
  {p:"1",s:"CHE 233",q:"Medical sociology involves study of all EXCEPT:",o:["Medical education","Conflict and conflict management","Health policy and politics","Social and community psychiatry"],a:1,e:"Conflict and conflict management is NOT a core subject of medical sociology."},
  {p:"1",s:"CHE 221",q:"Symptom can be described as:",o:["Objective evidence of disease","What observer sees","Subjective evidence felt by patient","What doctor measures"],a:2,e:"Symptom = SUBJECTIVE evidence — only the patient can feel it (pain, dizziness, nausea)."},
  {p:"1",s:"CHE 221",q:"Tetanus is caused by:",o:["Poliomyelitis virus","Salmonella","Shigella","Clostridium tetani"],a:3,e:"Tetanus = Clostridium tetani. Typhoid = Salmonella typhi. Dysentery = Shigella."},
  {p:"1",s:"CHE 221",q:"NOT a type of teeth in human:",o:["Molars","Pre-molars","Pre-canines","Canines"],a:2,e:"Pre-canines do NOT exist. Human teeth: Incisors, Canines, Premolars, Molars."},
  {p:"1",s:"CHE 221",q:"Factor that CANNOT influence teeth eruption:",o:["Diet and nutrition","Stress","Congenital problems","Infections"],a:1,e:"Stress does NOT directly influence teeth eruption."},
  {p:"1",s:"CHE 226",q:"Emergency conditions EXCEPT:",o:["Shock","Dysentery","Asphyxia","3rd degree burns"],a:1,e:"Dysentery = NOT an emergency condition. Emergencies: shock, asphyxia, 3rd degree burns, fractures."},
  {p:"1",s:"CHE 226",q:"NOT a type of fracture:",o:["Greenstick","Contused fracture","Depressed","Pathological"],a:1,e:"Contused fracture DOES NOT EXIST. Real types: Greenstick, Compound, Comminuted, Depressed, Pathological."},
  {p:"1",s:"CHE 226",q:"NOT a symptom of snake bite:",o:["Deformity","Pain","Fainting","Difficulty breathing"],a:0,e:"DEFORMITY = sign of FRACTURE, NOT snake bite. Snake bite: pain, swelling, fang marks, dizziness."},
  {p:"1",s:"CHE 226",q:"Shock from severe pain is called:",o:["Haemorrhagic shock","Hypovolaemic shock","Septicaemic shock","Neurogenic shock"],a:3,e:"Neurogenic shock = from SEVERE PAIN or emotional trauma → vasodilation."},
  {p:"1",s:"CHE 226",q:"Instrument used for measuring blood pressure:",o:["Thermometer and tape","Sphygmomanometer and stethoscope","Stethoscope and thermometer","Auroscope and sphygmomanometer"],a:1,e:"BP = Sphygmomanometer + Stethoscope. Normal: 120/80 mmHg. Hypertension: ≥140/90 mmHg."},
  // PAPER 2
  {p:"2",s:"CHE 246",q:"Cases NOT in standing orders are usually:",o:["Managed off-hand","Referred to higher level","Sent patient home","Refused treatment"],a:1,e:"Cases NOT in standing orders = REFERRED TO HIGHER LEVEL. JCHEW→CHEW, CHEW→CHO/Doctor."},
  {p:"2",s:"CHE 246",q:"Albustix is used to test urine for:",o:["Glucose","Albumin/protein","Blood","Ketones"],a:1,e:"Albustix = tests urine for ALBUMIN/PROTEIN. Positive = proteinuria (pre-eclampsia, UTI, nephritis)."},
  {p:"2",s:"CHE 246",q:"Mantoux test PPD is injected:",o:["Subcutaneously","Intramuscularly","Intradermally","Intravenously"],a:2,e:"Mantoux test = INTRADERMALLY. PPD = 0.1ml/10,000 dilution (1 tuberculin unit). Read after 24-72 hours."},
  {p:"2",s:"CHE 246",q:"Normal eardrum on auroscopy appears:",o:["Red and inflamed","White and opaque","Grey and shiny","Yellow with discharge"],a:2,e:"Normal eardrum = GREY AND SHINY. Red = infection. Yellow = pus/infection."},
  {p:"2",s:"CHE 246",q:"Ear canal cleaned by all EXCEPT:",o:["Wicking","Dry mopping","Syringing","Cotton buds"],a:3,e:"Cotton buds NEVER in ear canal — pushes wax deeper, damages tympanic membrane."},
  {p:"2",s:"CHE 246",q:"JCHEW complaint not in standing orders managed by:",o:["Refer to a CHEW","Refer to traditional healer","Use past experience","Keep trying"],a:0,e:"JCHEW → CHEW (one step up). Pathway: JCHEW→CHEW→CHO→Doctor→Secondary→Tertiary."},
  {p:"2",s:"CHE 223",q:"MUAC measurement uses:",o:["Tape measure","Ruler","Shakir's strip","Weighing scale"],a:2,e:"MUAC uses SHAKIR'S STRIP applied at MIDPOINT between elbow and shoulder."},
  {p:"2",s:"CHE 223",q:"Normal visual acuity on Snellen chart:",o:["6/9","6/6","6/12","6/18"],a:1,e:"Normal visual acuity = 6/6. Measured at 6 metres. <3/60 = legal blindness."},
  {p:"2",s:"CHE 223",q:"Auroscope speculum size for adults:",o:["Small aperture","Medium aperture","Large aperture","No speculum needed"],a:2,e:"Auroscope speculum: SMALL = children, MEDIUM = adolescents, LARGE = adults."},
  {p:"2",s:"CHE 223",q:"Normal temperature range:",o:["35-36 degrees C","36.5-37.5 degrees C","38-39 degrees C","37.5-38.5 degrees C"],a:1,e:"Normal temperature = 36.5-37.5 degrees C. Below 36.5 = hypothermia. Above 37.5 = fever."},
  {p:"2",s:"CHE 223",q:"Normal pulse rate per minute:",o:["40-60 bpm","60-100 bpm","100-120 bpm","120-140 bpm"],a:1,e:"Normal pulse = 60-100 bpm. Bradycardia = below 60 bpm. Tachycardia = above 100 bpm."},
  {p:"2",s:"CHE 223",q:"Haemoglobin (Tallquist method) — blood sample from:",o:["Vein","Artery","Finger prick","Earlobe only"],a:2,e:"Tallquist paper method = blood from FINGER PRICK. Compare blood stain with colour reference chart."},
  {p:"2",s:"CHE 224",q:"Pentavalent vaccine constitutes:",o:["3 vaccines in 1","6 vaccines in 1","5 vaccines in 1","4 vaccines in 1"],a:2,e:"Pentavalent = 5 vaccines: Diphtheria+Pertussis+Tetanus+Hepatitis B+Hib. Given at 6, 10, 14 weeks."},
  {p:"2",s:"CHE 224",q:"Cold box is:",o:["Container with ice cubes","Van for transportation","Equipment for vaccine storage to maintain potency","Equipment for distributing materials"],a:2,e:"Cold box = equipment for STORING vaccines to MAINTAIN POTENCY (+2 to +8 degrees C)."},
  {p:"2",s:"CHE 224",q:"Vaccine that should NOT be frozen EXCEPT:",o:["Pentavalent","Tetanus toxoid","Hepatitis B","Oral polio vaccine"],a:3,e:"OPV (Oral Polio Vaccine) CAN be frozen. NEVER freeze: Pentavalent, TT, HepB, PCV."},
  {p:"2",s:"CHE 224",q:"Active immunity is characterized by:",o:["Ready-made antibodies from outside","Short-lasting protection","Body producing OWN antibodies","Antibodies via breast milk"],a:2,e:"Active immunity = body produces OWN antibodies = LONG-LASTING. Passive = ready-made = SHORT-LASTING."},
  {p:"2",s:"CHE 224",q:"Causative agent of plague:",o:["Plague virus","Treponema pallidum","Yersinia pestis","Chlamydia trachomatis"],a:2,e:"Plague = Yersinia pestis. Syphilis = Treponema pallidum. Trachoma = Chlamydia trachomatis."},
  {p:"2",s:"CHE 224",q:"Passive natural immunity refers to:",o:["Induced by vaccine","Long-lasting immunity","Antibodies from serums","Antibodies via placenta or breast milk"],a:3,e:"Passive Natural = antibodies from MOTHER via placenta/breast milk. SHORT-LASTING."},
  {p:"2",s:"CHE 225",q:"Master endocrine gland:",o:["Adrenal gland","Thyroid gland","Thyroxin","Pituitary gland"],a:3,e:"Pituitary = MASTER endocrine gland. Controls thyroid, adrenal, gonads. Located at base of brain."},
  {p:"2",s:"CHE 225",q:"10th cranial nerve is called:",o:["Trochlear nerve","Abducens nerve","Hypoglossal nerve","Vagus nerve"],a:3,e:"10th cranial nerve = VAGUS nerve. Controls heart rate, digestion, breathing."},
  {p:"2",s:"CHE 225",q:"Rods and cones are present on:",o:["Optic nerve","Lens","Cornea","Retina"],a:3,e:"Rods and cones = on the RETINA. Rods = dim light/motion. Cones = colour/bright light."},
  {p:"2",s:"CHE 225",q:"Inner layer of skin contains all EXCEPT:",o:["Sweat glands","Dermis","Blood vessels","Epidermis"],a:3,e:"Epidermis = OUTER layer (avascular). Dermis = INNER layer (blood vessels, sweat glands, hair follicles)."},
  {p:"2",s:"CHE 225",q:"NOT a long bone:",o:["Femur","Innominate bone","Humerus","Tibia"],a:1,e:"Innominate bone (hip bone) = IRREGULAR bone. Long bones: Femur, Humerus, Tibia, Fibula."},
  {p:"2",s:"CHE 225",q:"NOT a gram-negative organism:",o:["Klebsiella pneumoniae","Neisseria gonorrhoeae","Yersinia pestis","Streptococcus pneumoniae"],a:3,e:"Streptococcus pneumoniae = GRAM-POSITIVE. Gram-negative: Klebsiella, Neisseria, Yersinia, E. coli."},
  {p:"2",s:"CHE 231",q:"Hormone initiating breast milk production:",o:["Oxytocin","Adrenaline","Progesterone","Prolactin"],a:3,e:"Prolactin = milk PRODUCTION. Oxytocin = milk EJECTION + uterine contractions."},
  {p:"2",s:"CHE 231",q:"NOT part of female reproductive system:",o:["Fallopian tube","Testis","Uterus","Urethra"],a:1,e:"Testis is part of MALE reproductive system. Female: Fallopian tubes, uterus, ovaries, vagina."},
  {p:"2",s:"CHE 231",q:"Largest artery in human body:",o:["Pulmonary artery","Thoracic artery","Abdominal aorta","Aorta"],a:3,e:"AORTA = largest artery. Arises from left ventricle, carries oxygenated blood to whole body."},
  {p:"2",s:"CHE 231",q:"Ventricular contraction is called:",o:["Diastolic","Pulse","Cardiac output","Systolic"],a:3,e:"SYSTOLIC = ventricular CONTRACTION. DIASTOLIC = relaxation. Normal BP: 120/80 mmHg."},
  {p:"2",s:"CHE 261",q:"Comparison of achievement with target is called:",o:["Monitoring","Decision making","Programming","Evaluation"],a:0,e:"MONITORING = ongoing comparison of ACHIEVEMENT with TARGET. EVALUATION = coverage, outcome, efficiency."},
  {p:"2",s:"CHE 261",q:"Coverage, outcome and efficiency measured at:",o:["Implementation","Planning","Supervision","Evaluation"],a:3,e:"EVALUATION measures: Coverage (proportion reached), Outcome (changes achieved), Efficiency (cost-effectiveness)."},
  {p:"2",s:"CHE 261",q:"Standard job description does NOT contain:",o:["Job summary","Qualification","Duties","Curriculum vitae"],a:3,e:"Curriculum vitae submitted by APPLICANT — not part of job description."},
  {p:"2",s:"CHE 261",q:"Training implies:",o:["Going to school for certificate","Learning a skill only","Way of preparing someone to acquire knowledge and skills","Act of learning a job"],a:2,e:"Training = systematic preparation to acquire KNOWLEDGE, SKILLS AND ATTITUDES for effective job performance."},
  {p:"2",s:"CHE 261",q:"Function of management applicable to ALL levels:",o:["Organization","Controlling","Staffing","Planning"],a:3,e:"PLANNING = function applicable to ALL levels of management."},
  {p:"2",s:"CHE 261",q:"NOT a true description of a health team:",o:["Group working towards a goal","Group working for personal goals","Group working for common purpose","Group working together for common objective"],a:1,e:"Working for PERSONAL goals is the OPPOSITE of teamwork — a team works for COMMON goals."},
  {p:"2",s:"CHE 261",q:"Advantage of teamwork in healthcare delivery:",o:["Difficult to operate","Creates vacuum","Personality differences","Promotes effective health care"],a:3,e:"Teamwork = promotes effective health care delivery through collaboration."},
  {p:"2",s:"CHE 263",q:"Principal book of account is:",o:["Cash book","Ledger","Journal","Petty cash book"],a:1,e:"LEDGER = principal book of account. Cash book, journal, petty cash = subsidiary books."},
  {p:"2",s:"CHE 263",q:"NOT a book of account:",o:["Trial balance","Balance sheet","Allocation Ledger","Day book"],a:0,e:"Trial balance is NOT a book of account — it is a checking mechanism."},
  {p:"2",s:"CHE 264",q:"Statistics of events relating to birth, death and marriage:",o:["Health statistics","Biostatistics","Vital statistics","Demography statistics"],a:2,e:"VITAL STATISTICS = records of birth, death, marriage and similar events."},
  {p:"2",s:"CHE 264",q:"Registers necessary for data collection EXCEPT:",o:["Laboratory register","Family planning register","Out-patient register","TBA labour and delivery register"],a:3,e:"TBA labour and delivery register is NOT a standard HMIS register for formal PHC facilities."},
  {p:"2",s:"CHE 253",q:"Allocation of subjects to reduce bias in research:",o:["Randomization","Manipulation","Experimentation","Sampling"],a:0,e:"RANDOMIZATION = allocation to reduce element of bias in research."},
  {p:"2",s:"CHE 253",q:"Vital statistics deals primarily with records of:",o:["Death","Sickness","Out-patient record","Number of health facilities"],a:0,e:"Vital statistics = deals primarily with DEATH (and birth, marriage) records."},
  {p:"2",s:"CHE 253",q:"Factors that do NOT affect population:",o:["Increase in birth rate","Immigration","Decrease in birth rate","Census"],a:3,e:"Census COUNTS population — it does NOT change population size. Factors: birth rate, death rate, migration."},
  {p:"2",s:"CHE 242",q:"NOT indicative of pre-eclampsia:",o:["Protein in urine","Raised blood pressure","Glucose in urine","Bilateral pitting pedal oedema"],a:2,e:"GLUCOSE in urine = DIABETES, NOT pre-eclampsia! Pre-eclampsia: BP 140/90+PROTEINURIA+OEDEMA."},
  {p:"2",s:"CHE 242",q:"Obstetric drug NO LONGER in use because of BP effect:",o:["Ergometrine","Misoprostol","Oxytocin","Magnesium Sulphate"],a:0,e:"Ergometrine = NO LONGER USED because of dangerous blood pressure effects."},
  {p:"2",s:"CHE 242",q:"APH caused by all EXCEPT:",o:["Placenta praevia","Uterine trauma","Placenta abruptio","Abnormal presentation"],a:3,e:"Abnormal presentation does NOT cause APH. APH: Placenta praevia, Abruptio, Uterine trauma."},
  {p:"2",s:"CHE 242",q:"Delay in second stage of labour caused by all EXCEPT:",o:["Pre-eclampsia","Poor maternal effort","Cord around neck","Compound presentation"],a:0,e:"Pre-eclampsia does NOT cause delay in 2nd stage. Causes: poor effort, cord, CPD, malposition."},
  {p:"2",s:"CHE 242",q:"KMC (Kangaroo Mother Care) is:",o:["Regular temperature check","KAP assessment","Skin-to-skin contact mother and newborn","Knowledge assessment"],a:2,e:"KMC = skin-to-skin contact between mother and newborn. Benefits: prevents hypothermia, promotes bonding."},
  {p:"2",s:"CHE 242",q:"Normal full-term baby at birth — all EXCEPT:",o:["Cries immediately","Weight 3.5kg","Active movement","Colour blue"],a:3,e:"Colour BLUE = cyanosis = ABNORMAL → immediate neonatal resuscitation needed."},
  {p:"2",s:"CHE 242",q:"Weaning is defined as:",o:["Total withdrawal from breast milk","Giving artificial food","Introducing family food","Systematic withdrawal from the breast"],a:3,e:"Weaning = SYSTEMATIC (gradual) withdrawal from the breast."},
  // PAPER 3
  {p:"3",s:"CHE 234",q:"Coitus interruptus is:",o:["Test of infertility","The safe period","Withdrawal before ejaculation","Avoidance of mineral food"],a:2,e:"Coitus interruptus = withdrawal BEFORE ejaculation. A natural family planning method."},
  {p:"3",s:"CHE 234",q:"LAM requires all THREE of these:",o:["Partial breastfeeding+amenorrhoea+<12 months","EBF+less than 6 months+amenorrhoea","EBF+less than 12 months+amenorrhoea","Partial breastfeeding+6 months+menstruation"],a:1,e:"LAM requires: Exclusive Breastfeeding + baby less than 6 months + amenorrhoea (all 3 must be present)."},
  {p:"3",s:"CHE 234",q:"High risk group for HIV EXCEPT:",o:["Faithful wedded couples","Commercial sex workers","People with multiple sex partners","Adolescents"],a:0,e:"Faithful monogamous couples = LOWEST risk. High risk: CSWs, multiple partners, adolescents, IDUs."},
  {p:"3",s:"CHE 234",q:"HIV/AIDS spread is enhanced by:",o:["Prompt treatment of gonorrhoea","Prompt treatment of UTI","Use of condom","Inappropriate HIV/AIDS counselling"],a:3,e:"HIV spread ENHANCED by inappropriate counselling. NOT enhanced by: STI treatment, condom use."},
  {p:"3",s:"CHE 234",q:"GATHER approach is used for:",o:["Nutrition counselling","Family planning counselling","Mental health assessment","Community diagnosis"],a:1,e:"GATHER = Greet, Ask, Tell, Help, Explain, Return — used for FAMILY PLANNING counselling."},
  {p:"3",s:"CHE 234",q:"Contraceptive method EXCEPT:",o:["Jaundice","Condom","Voluntary surgical contraceptive","Lactating amenorrhoea method"],a:0,e:"Jaundice = a DISEASE, not a contraceptive method. Methods: condom, VSC, LAM."},
  {p:"3",s:"CHE 232",q:"Common cause of gingivitis in rural community:",o:["Mouth odour","Sinusitis","Deposits on teeth","Poor oral hygiene"],a:3,e:"Poor oral hygiene = most common cause of gingivitis. Prevention: twice-daily brushing."},
  {p:"3",s:"CHE 232",q:"NOT a type of human tooth:",o:["Molars","Pre-molars","Pre-canines","Canines"],a:2,e:"Pre-canines do NOT exist. Human teeth: Incisors, Canines, Premolars, Molars."},
  {p:"3",s:"CHE 232",q:"Factor CANNOT influence teeth eruption:",o:["Diet and nutrition","Stress","Congenital problems","Infections"],a:1,e:"Stress does NOT directly influence teeth eruption."},
  {p:"3",s:"CHE 235",q:"EBF (Exclusive Breastfeeding) means:",o:["Breast milk only for 6 months","Breast milk only for 2-3 months","Breast milk only for 1 year","Breast milk for 5 months"],a:0,e:"EBF = breast milk ONLY for first 6 months — NO water, juice, food, or anything else."},
  {p:"3",s:"CHE 235",q:"A child is in GRAVE danger if:",o:["Feeding well","Haemoglobin above 12g/dl","Has moderate anaemia","Has stiff neck"],a:3,e:"STIFF NECK = meningitis = GRAVE DANGER → IMMEDIATE referral."},
  {p:"3",s:"CHE 235",q:"Growth monitoring importance EXCEPT:",o:["Monitor nutrition","Monitor weight gain","Identify children at risk","Monitor mother's nutrition status"],a:3,e:"Growth monitoring is for the CHILD — NOT to monitor the mother's nutrition status."},
  {p:"3",s:"CHE 235",q:"In marasmus management, feed child with:",o:["Rice, maize, beans, plantain, groundnut","Beans, yam, rice, meat, carrot","Rice, porridge, potatoes, vegetable","Millet, vegetable, beans, fish"],a:0,e:"Marasmus: Rice + Maize + Beans + Plantain + Groundnut — energy-dense + protein-rich combination."},
  {p:"3",s:"CHE 235",q:"Direct method of assessing child nutritional status:",o:["Breastfeeding pattern","Pattern of weight gain","Family food budget","Mother's level of education"],a:1,e:"Pattern of weight gain = DIRECT method of nutritional assessment. Others are indirect indicators."},
  {p:"3",s:"CHE 235",q:"Main unit of socialization of a child:",o:["School","Society","Family","Mosque/Church"],a:2,e:"FAMILY = main (primary) unit of socialization of a child."},
  {p:"3",s:"CHE 235",q:"EBF promotes all EXCEPT:",o:["Love and affection","Immunity against diseases","Juvenile delinquency","Growth and development"],a:2,e:"Juvenile delinquency is NOT promoted by EBF — there is no link. EBF promotes: love, immunity, growth."},
  {p:"3",s:"CHE 236",q:"Medical conditions in school physical exam EXCEPT:",o:["Tinea capitis","Conjunctivitis","Nasal discharge","Arthritis"],a:3,e:"ARTHRITIS not typically a condition in school health exam. Checks: Tinea capitis, conjunctivitis, nasal discharge."},
  {p:"3",s:"CHE 236",q:"School services evaluated through all EXCEPT:",o:["Interviewing market women","Interviewing teachers","Direct observation","Use of existing records"],a:0,e:"Interviewing MARKET WOMEN = NOT a way to evaluate school health services."},
  {p:"3",s:"CHE 236",q:"Component of school health programme:",o:["Punctuality to school","School meal services","Student discipline","Classroom management"],a:1,e:"School meal services = school health programme component. Punctuality, discipline = school administration."},
  {p:"3",s:"CHE 236",q:"NOT a delinquent behaviour among adolescents:",o:["Increased appetite","Truancy","Aggressiveness in community","Hanging around dark corners"],a:0,e:"Increased appetite = NORMAL adolescent behaviour, NOT delinquent."},
  {p:"3",s:"CHE 225",q:"NOT a helminthic disease:",o:["Paragonomiasis","Bilharziasis","Onchocerciasis","Amoebiasis"],a:3,e:"Amoebiasis = PROTOZOAN (Entamoeba histolytica). Helminths: Paragonomiasis, Bilharziasis, Onchocerciasis."},
  {p:"3",s:"CHE 225",q:"Arthropods of public health importance are generally known as:",o:["Insects","Vectors","Rodents","Mosquitoes"],a:1,e:"Arthropods = VECTORS. They transmit diseases from one host to another."},
  {p:"3",s:"CHE 225",q:"Cultural theory of disease causation EXCEPT:",o:["Male circumcision","Act of God","Prolonged breast feeding","Forbidden hardwork for pregnant mothers"],a:1,e:"Act of God = a cultural/religious theory of disease causation."},
  {p:"3",s:"CHE 244",q:"Ear canal cleaned by all EXCEPT:",o:["Wicking","Dry mopping","Syringing","Cotton buds"],a:3,e:"Cotton buds NEVER in ear canal — pushes wax deeper, damages tympanic membrane."},
  {p:"3",s:"CHE 244",q:"Sources of noise pollution EXCEPT:",o:["Night clubs","Hospitals","Quarries","Factories"],a:1,e:"Hospitals should be QUIET — they are NOT sources of noise pollution."},
  {p:"3",s:"CHE 244",q:"Normal eardrum on auroscopy:",o:["Red and inflamed","White and opaque","Grey and shiny","Yellow with discharge"],a:2,e:"Normal eardrum = GREY AND SHINY. Red = infection. Yellow = pus."},
  {p:"3",s:"CHE 245",q:"Signs of cataract EXCEPT:",o:["Clouded vision","Blurred vision","Difficulty with vision at night","Itching of the conjunctiva"],a:3,e:"Itching of conjunctiva = NOT a cataract sign. Cataract: clouded vision, blurred, difficulty at night."},
  {p:"3",s:"CHE 245",q:"Causes of blindness EXCEPT:",o:["Using dark glasses to protect the eyes","Diabetes","Macular degeneration","Traumatic injury to the eye"],a:0,e:"Using dark glasses to PROTECT eyes = PREVENTS blindness, not a cause."},
  {p:"3",s:"CHE 245",q:"SAFE strategy is used for:",o:["Cataract","Glaucoma","Trachoma","Diabetic retinopathy"],a:2,e:"SAFE = Surgery+Antibiotics+Facial cleanliness+Environmental improvement = TRACHOMA strategy."},
  {p:"3",s:"CHE 245",q:"Normal visual acuity:",o:["6/9","6/6","6/12","6/18"],a:1,e:"Normal visual acuity = 6/6 (Snellen chart at 6 metres). Less than 3/60 = legal blindness."},
  {p:"3",s:"CHE 251",q:"Medical problem of older persons — all EXCEPT:",o:["Idleness","Deafness","Arthritis","Poor sight"],a:0,e:"Idleness = SOCIAL problem, NOT medical. Medical: deafness, arthritis, poor eyesight, hypertension."},
  {p:"3",s:"CHE 251",q:"Health benefits of exercise in elderly EXCEPT:",o:["Improvement of cardiorespiratory functions","Increase muscle strength and flexibility","Increased sociability","Provide financial support"],a:3,e:"Exercise does NOT provide financial support. Benefits: cardiorespiratory improvement, muscle strength."},
  {p:"3",s:"CHE 251",q:"Handicapping conditions found in community EXCEPT:",o:["Mental retardation","Malnutrition","Sickle cell disease","Deafness"],a:1,e:"Malnutrition is NOT a handicapping condition — it is a nutritional disorder. Handicapping: mental retardation, sickle cell, deafness."},
  {p:"3",s:"CHE 251",q:"Gerontology is the study of:",o:["Genetics","Handicapped persons","Adolescents","Ageing process"],a:3,e:"Gerontology = scientific study of the AGEING process and elderly people. Old age = from 65 years."},
  {p:"3",s:"CHE 252",q:"Persons with special needs desire all EXCEPT:",o:["Desire to be pitied and given alms","Going to school","Attending religious functions","Being listened to"],a:0,e:"Persons with disabilities want INCLUSION — not pity or alms. They want education, employment, dignity."},
  {p:"3",s:"CHE 252",q:"Male circumcision is:",o:["Widening of urethral orifice","Removal of glans of penis","Removal of prepuce of penis","Removal of clitoris"],a:2,e:"Male circumcision = removal of PREPUCE (foreskin). FGM = removal of clitoris = harmful practice."},
  {p:"3",s:"CHE 252",q:"Person consistently NOT conforming to society norms:",o:["Uncompromising","Deviant","Extrovert","Aggressive"],a:1,e:"DEVIANT = person who consistently does not conform to society's norms."},
  {p:"3",s:"CHE 252",q:"CHEW NOT likely to earn client confidence through:",o:["Maintaining privacy","Neglect of client","Reassurance","Professional dress"],a:1,e:"Neglect of client = DESTROYS confidence. Confidence earned by: privacy, reassurance, professional appearance."},
  {p:"3",s:"CHE 237",q:"Features of NCDs EXCLUDE:",o:["Multi-factorial origin","Long period of care","Permanent residual effects","Must be of pathogenic cause"],a:3,e:"NCDs = NOT caused by pathogens. Features: multi-factorial, long duration, permanent effects."},
  {p:"3",s:"CHE 237",q:"Hypertension is defined as BP:",o:["120/80 mmHg","130/85 mmHg","140/90 mmHg or above","150/95 mmHg"],a:2,e:"Hypertension = BP 140/90 mmHg or above on two separate occasions. Normal = 120/80 mmHg."},
  {p:"3",s:"CHE 237",q:"Glucose in urine indicates:",o:["Pre-eclampsia","Proteinuria","Diabetes mellitus","UTI"],a:2,e:"Glucose in urine = GLYCOSURIA = DIABETES MELLITUS. NOT pre-eclampsia (which = proteinuria)."},
  {p:"3",s:"CHE 237",q:"NCDs are NOT transmitted person-to-person. They include all EXCEPT:",o:["Hypertension","Malaria","Diabetes mellitus","Sickle cell disease"],a:1,e:"Malaria is a COMMUNICABLE disease caused by Plasmodium parasite, transmitted by Anopheles mosquito."},
  {p:"3",s:"CHE 257",q:"Normal full-term baby at birth — all EXCEPT:",o:["Colour blue","Cry immediately","Weight 3.5kg","Active movement"],a:0,e:"Colour BLUE = cyanosis = ABNORMAL → immediate neonatal resuscitation needed."},
  {p:"3",s:"CHE 257",q:"Vaccine given at birth in Nigeria EPI:",o:["Pentavalent","BCG and OPV0","Measles","PCV"],a:1,e:"At BIRTH: BCG (tuberculosis) + OPV0 (Oral Polio Vaccine). Given immediately after delivery."},
  {p:"3",s:"CHE 257",q:"KMC (Kangaroo Mother Care) is:",o:["Regular temperature check","KAP assessment","Skin-to-skin contact mother and newborn","Knowledge assessment"],a:2,e:"KMC = skin-to-skin contact. Benefits: prevents hypothermia, promotes bonding, encourages breastfeeding."},
  {p:"3",s:"CHE 257",q:"Normal newborn temperature range:",o:["35-36 degrees C","36.5-37.5 degrees C","38-39 degrees C","37.5-38.5 degrees C"],a:1,e:"Normal newborn temperature = 36.5-37.5 degrees C. Below 36.5 = hypothermia (danger sign)."},
  {p:"3",s:"CHE 239",q:"High risk group for HIV EXCEPT:",o:["Faithful wedded couples","Commercial sex workers","People with multiple sex partners","Adolescents"],a:0,e:"Faithful monogamous couples = LOWEST risk. High risk: CSWs, multiple partners, adolescents, IDUs."},
  {p:"3",s:"CHE 239",q:"HIV/AIDS spread enhanced by:",o:["Prompt treatment of gonorrhoea","Prompt treatment of UTI","Use of condom","Inappropriate HIV/AIDS counselling"],a:3,e:"HIV spread ENHANCED by inappropriate counselling. NOT enhanced by STI treatment or condom use."},
  {p:"3",s:"CHE 239",q:"Function of the family EXCEPT:",o:["Sexual regulation","Economic support","Socialization","Mechanical function"],a:3,e:"Mechanical function is NOT a family function. Family functions: sexual regulation, economic support, socialization."},
  {p:"3",s:"CHE 239",q:"What does NOT promote effective health education:",o:["Respect for tradition","Being a good listener","Lack of electricity","Favorable environment"],a:2,e:"Lack of electricity = BARRIER to health education (cannot use audiovisual aids). Others promote it."},
];

const ADS=[
  {brand:"NCDC Nigeria",text:"Stay updated on disease outbreaks across Nigeria.",cta:"Visit NCDC",color:"#0ea5e9"},
  {brand:"NAFDAC",text:"Report fake drugs and adverse reactions. Protect your community.",cta:"Report Now",color:"#10b981"},
  {brand:"WHO Nigeria",text:"Free WHO online courses for health workers. Earn certificates.",cta:"Start Free",color:"#8b5cf6"},
  {brand:"Advertise Here",text:"Reach 50,000+ CHEW students monthly. Contact us today.",cta:"Contact Us",color:"#f59e0b"},
];

function AdBanner({dark,idx=0}){
  const [v,setV]=useState(true);
  const ad=ADS[idx%ADS.length];
  if(!v)return null;
  const bg=dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)";
  const br=dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)";
  return(
    <div style={{background:bg,border:`1px dashed ${br}`,borderRadius:10,padding:"10px 14px",margin:"10px 0",position:"relative",display:"flex",alignItems:"center",gap:10}}>
      <div style={{fontSize:8,color:"#94a3b8",position:"absolute",top:3,left:8,fontWeight:600}}>ADVERTISEMENT</div>
      <button onClick={()=>setV(false)} style={{position:"absolute",top:2,right:6,background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:17,lineHeight:1}}>x</button>
      <div style={{paddingTop:10,flex:1}}>
        <div style={{fontSize:10,fontWeight:700,color:ad.color}}>{ad.brand}</div>
        <div style={{fontSize:12,color:dark?"#94a3b8":"#64748b"}}>{ad.text}</div>
      </div>
      <button style={{background:ad.color,color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>{ad.cta}</button>
    </div>
  );
}

function ScoreRing({score,total,size=110,color="#10b981"}){
  const pct=total>0?score/total:0;
  const r=size/2-8;
  const circ=2*Math.PI*r;
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e2e8f0" strokeWidth="7" fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="7" fill="none"
        strokeDasharray={`${circ*pct} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dasharray 1.2s ease"}}/>
      <text x={size/2} y={size/2-5} textAnchor="middle" fontSize="20" fontWeight="800" fill={color}>{score}</text>
      <line x1={size/2-10} y1={size/2+3} x2={size/2+10} y2={size/2+3} stroke="#e2e8f0" strokeWidth="1"/>
      <text x={size/2} y={size/2+18} textAnchor="middle" fontSize="13" fill="#94a3b8">{total}</text>
    </svg>
  );
}

function PctRing({pct,size=90,color="#10b981"}){
  const r=size/2-8;
  const circ=2*Math.PI*r;
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e2e8f0" strokeWidth="7" fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="7" fill="none"
        strokeDasharray={`${circ*pct/100} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dasharray 1.2s ease"}}/>
      <text x={size/2} y={size/2+6} textAnchor="middle" fontSize="17" fontWeight="800" fill={color}>{pct}%</text>
    </svg>
  );
}

export default function App(){
  const [dark,setDark]=useState(false);
  const [screen,setScreen]=useState("home");
  const [activePaper,setActivePaper]=useState(null);
  const [activePost,setActivePost]=useState(null);
  const [studentName,setStudentName]=useState("");
  const [sessionId,setSessionId]=useState("");
  const [quizPool,setQuizPool]=useState([]);
  const [qIdx,setQIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [rev,setRev]=useState(false);
  const [score,setScore]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [done,setDone]=useState(false);
  const [timeLeft,setTimeLeft]=useState(3600);
  const [timeTaken,setTimeTaken]=useState(0);
  const [showAdmin,setShowAdmin]=useState(false);
  const [copiedId,setCopiedId]=useState(null);
  const [showSheet,setShowSheet]=useState(true);
  const [posts,setPosts]=useState([
    {id:"post_p1_2026",paper:"1",title:"CHEW Paper 1 — Mock Exam 2026",desc:"100 questions covering all Paper 1 subjects per CHPRBN 2026 national exam timetable.",date:"Jul 2026",attempts:247,active:true},
    {id:"post_p2_2026",paper:"2",title:"CHEW Paper 2 — Mock Exam 2026",desc:"100 questions covering all Paper 2 subjects per CHPRBN 2026 national exam timetable.",date:"Jul 2026",attempts:189,active:true},
    {id:"post_p3_2026",paper:"3",title:"CHEW Paper 3 — Mock Exam 2026",desc:"100 questions covering all Paper 3 subjects per CHPRBN 2026 national exam timetable.",date:"Jul 2026",attempts:201,active:true},
  ]);
  const [newPost,setNewPost]=useState({paper:"1",title:"",desc:""});
  const timerRef=useRef(null);

  const c={
    bg:dark?"#0f172a":"#f1f5f9",
    card:dark?"#1e293b":"#ffffff",
    text:dark?"#f1f5f9":"#0f172a",
    sub:dark?"#94a3b8":"#64748b",
    border:dark?"#334155":"#e2e8f0",
  };

  useEffect(()=>{
    if(screen==="quiz"&&!done){
      timerRef.current=setInterval(()=>{
        setTimeLeft(t=>{if(t<=1){clearInterval(timerRef.current);setDone(true);return 0;}return t-1;});
        setTimeTaken(t=>t+1);
      },1000);
    }
    return()=>clearInterval(timerRef.current);
  },[screen,done]);

  function openPost(post){
    setActivePost(post);
    setActivePaper(post.paper);
    setStudentName("");
    setScreen("register");
  }

  function startQuiz(){
    if(!studentName.trim()){alert("Please enter your name to continue.");return;}
    const sid=generateId();
    setSessionId(sid);
    const pool=ALL_Q.filter(q=>q.p===activePaper).sort(()=>Math.random()-0.5).slice(0,100);
    setQuizPool(pool);
    setQIdx(0);setSel(null);setRev(false);
    setScore(0);setAnswers([]);setDone(false);
    setTimeLeft(3600);setTimeTaken(0);
    setPosts(prev=>prev.map(p=>p.id===activePost.id?{...p,attempts:p.attempts+1}:p));
    setScreen("quiz");
  }

  function pick(i){
    if(rev)return;
    setSel(i);setRev(true);
    const correct=i===quizPool[qIdx].a;
    if(correct)setScore(s=>s+1);
    setAnswers(a=>[...a,{ok:correct,q:quizPool[qIdx].q,sub:quizPool[qIdx].s,correct:quizPool[qIdx].o[quizPool[qIdx].a],selected:i>=0?quizPool[qIdx].o[i]:"(Time up)",exp:quizPool[qIdx].e}]);
  }

  function next(){
    if(qIdx+1>=quizPool.length){clearInterval(timerRef.current);setDone(true);return;}
    setQIdx(i=>i+1);setSel(null);setRev(false);
  }

  function copyLink(post){
    const link=`${window.location.origin}${window.location.pathname}?post=${post.id}&paper=${post.paper}`;
    if(navigator.clipboard){
      navigator.clipboard.writeText(link).then(()=>{setCopiedId(post.id);setTimeout(()=>setCopiedId(null),2500);});
    }else{
      alert("Share this link with students:\n\n"+link);
    }
  }

  function addPost(){
    if(!newPost.title.trim()){alert("Please enter a title.");return;}
    const p={...newPost,id:`post_${newPost.paper}_${generateId()}`,date:new Date().toLocaleDateString("en-NG",{month:"short",year:"numeric"}),attempts:0,active:true};
    setPosts(prev=>[p,...prev]);
    setNewPost({paper:"1",title:"",desc:""});
    alert(`Post created!\nTitle: ${p.title}\n\nNow click Copy Link and share with students on WhatsApp.`);
  }

  const mins=Math.floor(timeLeft/60);
  const secs=timeLeft%60;
  const timerCol=timeLeft>600?"#10b981":timeLeft>300?"#f59e0b":"#ef4444";

  const CSS=`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Outfit',sans-serif;}
    ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#0ea5e930;border-radius:4px;}
    button,select,input,textarea{font-family:inherit;}
    input:focus,select:focus,textarea:focus{outline:none;}textarea{resize:none;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  `;

  // ── RESULT ──
  if(screen==="quiz"&&done){
    const final=answers.filter(a=>a.ok).length;
    const pct=quizPool.length>0?Math.round(final/quizPool.length*100):0;
    const wrong=quizPool.length-final;
    const grade=pct>=80?"Excellent! 🏆":pct>=60?"Good Pass 👍":pct>=50?"Pass 📚":"Below Pass 💪";
    const gc=pct>=80?"#10b981":pct>=60?"#0ea5e9":pct>=50?"#f59e0b":"#ef4444";
    const tm=Math.floor(timeTaken/60);const ts=timeTaken%60;
    const pInfo=PAPERS[activePaper];
    const shareUrl=`${window.location.href.split("?")[0]}?result=${sessionId}&name=${encodeURIComponent(studentName)}&score=${final}&total=${quizPool.length}&paper=${activePaper}`;
    return(
      <div style={{minHeight:"100vh",background:c.bg,fontFamily:"'Outfit',sans-serif"}}>
        <style>{CSS}</style>
        <div style={{background:pInfo.gradient,padding:"13px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
          <div>
            <div style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>{pInfo.name} Result</div>
            <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{studentName}</div>
          </div>
          <button onClick={()=>setScreen("home")} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,padding:"7px 14px",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Home</button>
        </div>
        <div style={{padding:"16px",maxWidth:520,margin:"0 auto"}}>
          <div style={{background:c.card,borderRadius:20,padding:"24px 20px",marginBottom:14,border:`1px solid ${c.border}`,boxShadow:dark?"0 8px 40px rgba(0,0,0,0.4)":"0 8px 40px rgba(0,0,0,0.1)"}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:c.text,textAlign:"center",marginBottom:3}}>CBT Tutorial</h2>
            <div style={{fontSize:12,color:c.sub,textAlign:"center",marginBottom:3}}>NAME : {studentName}</div>
            <div style={{fontSize:11,color:c.sub,textAlign:"center",marginBottom:18}}>{new Date().toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"})} — {tm}m {ts}s</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,marginBottom:20}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:11,color:c.sub,marginBottom:6}}>Your Score</div>
                <ScoreRing score={final} total={quizPool.length} size={110} color={gc}/>
              </div>
              <div style={{textAlign:"center"}}>
                <PctRing pct={pct} size={90} color={gc}/>
                <div style={{fontSize:12,fontWeight:700,color:gc,marginTop:6}}>{grade}</div>
              </div>
            </div>
            <div style={{border:`1px solid ${c.border}`,borderRadius:12,overflow:"hidden",marginBottom:16}}>
              {[{ico:"🟢",lbl:"Correct",val:final,pct2:pct+"%",col:"#10b981"},{ico:"🔴",lbl:"Wrong",val:wrong,pct2:(100-pct)+"%",col:"#ef4444"},{ico:"🟡",lbl:"Skipped",val:0,pct2:"0%",col:"#f59e0b"}].map((r,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",padding:"12px 16px",borderBottom:i<2?`1px solid ${c.border}`:"none",gap:10}}>
                  <span style={{fontSize:14}}>{r.ico}</span>
                  <span style={{flex:1,fontSize:14,fontWeight:600,color:c.text}}>{r.lbl}</span>
                  <span style={{fontSize:14,color:r.col,fontWeight:700,minWidth:42,textAlign:"right"}}>{r.pct2}</span>
                  <span style={{fontSize:14,color:c.sub,minWidth:20,textAlign:"right"}}>{r.val}</span>
                </div>
              ))}
            </div>
            <div style={{background:dark?"rgba(16,185,129,0.1)":"#f0fdf4",border:"1px solid #86efac",borderRadius:10,padding:"9px 14px",marginBottom:16,textAlign:"center",fontSize:12,color:"#10b981",fontWeight:600}}>
              Note: This score is not final
            </div>
            <div style={{display:"flex",gap:10,marginBottom:10}}>
              <button onClick={startQuiz} style={{flex:1,background:pInfo.gradient,color:"#fff",border:"none",borderRadius:12,padding:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Retry</button>
              <button onClick={()=>setScreen("home")} style={{flex:1,background:c.card,border:`1.5px solid ${c.border}`,color:c.text,borderRadius:12,padding:"13px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Home</button>
            </div>
            <button onClick={()=>{if(navigator.clipboard){navigator.clipboard.writeText(shareUrl).then(()=>alert("Result link copied! Share with anyone:\n"+shareUrl));}else{alert("Your result link:\n"+shareUrl);}}}
              style={{width:"100%",background:dark?"#334155":"#f1f5f9",border:`1px solid ${c.border}`,color:c.text,borderRadius:12,padding:"11px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              Share My Result Link
            </button>
          </div>
          <AdBanner dark={dark} idx={1}/>
          <div style={{background:c.card,borderRadius:16,border:`1px solid ${c.border}`,overflow:"hidden",marginBottom:14}}>
            <button onClick={()=>setShowSheet(s=>!s)} style={{width:"100%",padding:"14px 18px",borderBottom:showSheet?`1px solid ${c.border}`:"none",display:"flex",alignItems:"center",justifyContent:"space-between",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",color:c.text,fontWeight:700,fontSize:15}}>
              <span>{showSheet?"Hide":"Show"} Answer Sheet</span>
              <span style={{fontSize:18}}>{showSheet?"^":"v"}</span>
            </button>
            {showSheet&&answers.map((ans,i)=>(
              <div key={i} style={{padding:"14px 18px",borderBottom:i<answers.length-1?`1px solid ${c.border}`:"none"}}>
                <div style={{fontSize:10,color:pInfo.color,fontWeight:700,marginBottom:3}}>{quizPool[i]?.s}</div>
                <div style={{fontSize:13,fontWeight:600,color:c.text,marginBottom:8,lineHeight:1.5}}>{i+1}. {ans.q}</div>
                <div style={{background:dark?"rgba(16,185,129,0.1)":"#f0fdf4",borderRadius:8,padding:"7px 12px",marginBottom:ans.ok?0:6,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:12,color:"#10b981",fontWeight:700}}>Correct: {ans.correct}</span>
                  <span style={{fontSize:11,color:c.sub,fontWeight:600}}>1/1 Marks</span>
                </div>
                {!ans.ok&&<>
                  <div style={{background:dark?"rgba(239,68,68,0.1)":"#fef2f2",borderRadius:8,padding:"7px 12px",marginBottom:6}}>
                    <span style={{fontSize:12,color:"#ef4444",fontWeight:700}}>Your answer: {ans.selected}</span>
                  </div>
                  <div style={{background:dark?"rgba(14,165,233,0.1)":"#eff6ff",borderRadius:8,padding:"8px 12px",fontSize:12,color:c.sub,lineHeight:1.6}}>{ans.exp}</div>
                </>}
              </div>
            ))}
          </div>
          <AdBanner dark={dark} idx={2}/>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  if(screen==="quiz"){
    const q=quizPool[qIdx];
    if(!q)return null;
    const pInfo=PAPERS[activePaper];
    return(
      <div style={{height:"100vh",display:"flex",flexDirection:"column",background:c.bg,fontFamily:"'Outfit',sans-serif",overflow:"hidden"}}>
        <style>{CSS}</style>
        <div style={{background:c.card,borderBottom:`1px solid ${c.border}`,padding:"10px 16px",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:c.text}}>{pInfo.name} — Q {qIdx+1}/{quizPool.length}</div>
              <div style={{fontSize:10,color:pInfo.color,fontWeight:700,marginTop:2}}>{q.s} — {studentName}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:12,color:"#10b981",fontWeight:700}}>{score} correct</span>
              <div style={{display:"flex",alignItems:"center",gap:5,background:dark?"#1e293b":"#f8fafc",border:`2px solid ${timerCol}`,borderRadius:10,padding:"6px 11px"}}>
                <span style={{fontSize:11,color:"#94a3b8"}}>Time</span>
                <span style={{fontWeight:800,fontSize:16,color:timerCol,fontVariantNumeric:"tabular-nums"}}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</span>
              </div>
            </div>
          </div>
          <div style={{height:5,background:dark?"#334155":"#e2e8f0",borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${(qIdx/quizPool.length)*100}%`,background:`linear-gradient(90deg,${pInfo.color},${pInfo.color}aa)`,borderRadius:3,transition:"width 0.4s"}}/>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
          {qIdx>0&&qIdx%20===0&&!rev&&<AdBanner dark={dark} idx={qIdx}/>}
          <div style={{background:c.card,borderRadius:16,padding:"18px 16px",marginBottom:14,border:`1px solid ${c.border}`}}>
            <div style={{fontSize:10,fontWeight:700,color:pInfo.color,textTransform:"uppercase",marginBottom:8,letterSpacing:"0.05em"}}>Past Exam Question — {pInfo.name}</div>
            <p style={{fontSize:15,color:c.text,lineHeight:1.75,fontWeight:500}}>{q.q}</p>
          </div>
          {q.o.map((opt,i)=>{
            let bg=c.card,bc=c.border,col=c.text,ico=null;
            if(rev){if(i===q.a){bg=dark?"#14532d":"#f0fdf4";bc="#22c55e";col="#16a34a";ico="Correct";}else if(i===sel){bg=dark?"#450a0a":"#fef2f2";bc="#ef4444";col="#dc2626";ico="Wrong";}}
            return(
              <button key={i} onClick={()=>pick(i)} disabled={rev}
                style={{width:"100%",background:bg,border:`1.5px solid ${bc}`,borderRadius:13,padding:"13px 15px",marginBottom:10,cursor:rev?"default":"pointer",textAlign:"left",fontSize:14,color:col,fontFamily:"inherit",display:"flex",alignItems:"center",gap:12,transition:"all 0.2s"}}>
                <span style={{width:28,height:28,borderRadius:"50%",background:rev&&i===q.a?"#22c55e":rev&&i===sel?"#ef4444":dark?"#334155":"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:rev&&(i===q.a||i===sel)?"#fff":c.sub,flexShrink:0}}>
                  {["A","B","C","D"][i]}
                </span>{opt}
              </button>
            );
          })}
          {rev&&<>
            <div style={{background:dark?"#1e3a5f":"#eff6ff",border:"1px solid #93c5fd",borderRadius:13,padding:"14px 16px",marginBottom:12,animation:"fadeUp 0.3s ease-out"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#0ea5e9",marginBottom:6}}>EXPLANATION — 1/1 Marks</div>
              <p style={{fontSize:13,color:c.text,lineHeight:1.7}}>{q.e}</p>
            </div>
            <button onClick={next} style={{width:"100%",background:pInfo.gradient,color:"#fff",border:"none",borderRadius:13,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 20px ${pInfo.color}44`}}>
              {qIdx+1>=quizPool.length?"View Results and Answer Sheet":"Next Question"}
            </button>
          </>}
        </div>
      </div>
    );
  }

  // ── REGISTER ──
  if(screen==="register"){
    const pInfo=PAPERS[activePaper];
    return(
      <div style={{minHeight:"100vh",background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'Outfit',sans-serif"}}>
        <style>{CSS}</style>
        <div style={{width:"100%",maxWidth:400}}>
          <div style={{background:pInfo.gradient,borderRadius:"18px 18px 0 0",padding:"24px 22px",textAlign:"center"}}>
            <div style={{fontSize:36,marginBottom:10}}>{pInfo.icon}</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",color:"#fff",fontSize:22,fontWeight:800,marginBottom:6}}>{activePost?.title}</h2>
            <p style={{color:"rgba(255,255,255,0.82)",fontSize:13,lineHeight:1.5,marginBottom:14}}>{activePost?.desc}</p>
            <div style={{display:"flex",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
              {["60 Minutes","100 Questions","Instant Results","Shareable Link"].map((t,i)=>(
                <span key={i} style={{background:"rgba(255,255,255,0.2)",color:"#fff",fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:20}}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{background:c.card,borderRadius:"0 0 18px 18px",padding:"24px 22px",border:`1px solid ${c.border}`,borderTop:"none",boxShadow:dark?"0 8px 40px rgba(0,0,0,0.4)":"0 8px 40px rgba(0,0,0,0.1)"}}>
            <h3 style={{fontWeight:700,fontSize:16,color:c.text,marginBottom:6}}>Enter Your Full Name</h3>
            <p style={{fontSize:13,color:c.sub,marginBottom:18,lineHeight:1.5}}>Your name will appear on your result sheet and shareable result link.</p>
            <input value={studentName} onChange={e=>setStudentName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&startQuiz()}
              placeholder="e.g. Dahiru Ibrahim" autoFocus
              style={{width:"100%",padding:"13px 14px",border:`1.5px solid ${studentName?pInfo.color:c.border}`,borderRadius:12,background:dark?"#0f172a":"#f8fafc",color:c.text,fontSize:15,fontFamily:"inherit",marginBottom:14,transition:"border-color 0.2s"}}/>
            <AdBanner dark={dark} idx={0}/>
            <button onClick={startQuiz} disabled={!studentName.trim()}
              style={{width:"100%",background:studentName.trim()?pInfo.gradient:"#e2e8f0",color:studentName.trim()?"#fff":"#94a3b8",border:"none",borderRadius:13,padding:"15px",fontSize:16,fontWeight:800,cursor:studentName.trim()?"pointer":"not-allowed",fontFamily:"inherit",boxShadow:studentName.trim()?`0 6px 24px ${pInfo.color}44`:"none",marginBottom:10,transition:"all 0.2s"}}>
              Start Exam Now
            </button>
            <button onClick={()=>setScreen("home")} style={{width:"100%",background:"none",border:`1px solid ${c.border}`,color:c.sub,borderRadius:13,padding:"11px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // ── HOME ──
  return(
    <div style={{minHeight:"100vh",background:c.bg,fontFamily:"'Outfit',sans-serif"}}>
      <style>{CSS}</style>
      <header style={{background:"linear-gradient(135deg,#0c4a6e,#0369a1)",padding:"12px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:20,boxShadow:"0 2px 20px rgba(3,105,161,0.4)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📋</div>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",color:"#fff",fontSize:16,fontWeight:800,lineHeight:1}}>CHEW Past Questions Hub</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.65)"}}>Nigeria — CHPRBN 2026 National Exam</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setDark(d=>!d)} style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:20,width:30,height:30,color:"rgba(255,255,255,0.85)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,cursor:"pointer"}}>{dark?"☀":"🌙"}</button>
          <button onClick={()=>{const p=prompt("Admin Password:");if(p==="chew2026")setShowAdmin(a=>!a);else if(p)alert("Incorrect password.");}}
            style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:8,padding:"6px 12px",color:"rgba(255,255,255,0.85)",fontSize:11,fontWeight:600,cursor:"pointer"}}>Admin</button>
        </div>
      </header>

      {showAdmin&&(
        <div style={{background:dark?"#0f172a":"#eff6ff",borderBottom:"3px solid #0ea5e9",padding:"20px 18px"}}>
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
              <h3 style={{fontWeight:800,fontSize:17,color:"#0ea5e9"}}>Admin Panel</h3>
              <button onClick={()=>setShowAdmin(false)} style={{background:"none",border:"none",color:c.sub,fontSize:22,cursor:"pointer"}}>x</button>
            </div>
            <div style={{background:c.card,borderRadius:16,padding:"18px",marginBottom:14,border:`1px solid ${c.border}`}}>
              <div style={{fontSize:13,fontWeight:700,color:c.text,marginBottom:14}}>Create New Exam Post</div>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:c.sub,display:"block",marginBottom:5}}>SELECT PAPER</label>
                  <select value={newPost.paper} onChange={e=>setNewPost(p=>({...p,paper:e.target.value}))}
                    style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${c.border}`,borderRadius:10,background:dark?"#0f172a":"#fff",color:c.text,fontSize:14}}>
                    <option value="1">Paper 1 — CHE 211, 213, 215, 218, GNP 123, CHE 254, 262, 214, ENT 111, 240, 233, 221, 226</option>
                    <option value="2">Paper 2 — CHE 246, 223, 224, 225, 231, 241, 261, 263, 264, 253, 242</option>
                    <option value="3">Paper 3 — CHE 234, 232, 235, 236, 225, 244, 245, 251, 252, 237, 257, 239</option>
                  </select>
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:c.sub,display:"block",marginBottom:5}}>POST TITLE</label>
                  <input value={newPost.title} onChange={e=>setNewPost(p=>({...p,title:e.target.value}))}
                    placeholder="e.g. CHEW Paper 1 Practice — August 2026"
                    style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${c.border}`,borderRadius:10,background:dark?"#0f172a":"#fff",color:c.text,fontSize:14}}/>
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:c.sub,display:"block",marginBottom:5}}>DESCRIPTION (optional)</label>
                  <textarea value={newPost.desc} onChange={e=>setNewPost(p=>({...p,desc:e.target.value}))}
                    placeholder="Brief description for students..." rows={2}
                    style={{width:"100%",padding:"11px 13px",border:`1.5px solid ${c.border}`,borderRadius:10,background:dark?"#0f172a":"#fff",color:c.text,fontSize:14}}/>
                </div>
                <button onClick={addPost} style={{background:"linear-gradient(135deg,#0ea5e9,#10b981)",color:"#fff",border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                  Create Post and Generate Link
                </button>
              </div>
            </div>
            <div style={{background:c.card,borderRadius:16,border:`1px solid ${c.border}`,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:`1px solid ${c.border}`,fontWeight:700,fontSize:14,color:c.text}}>Manage Posts</div>
              {posts.map((post,i)=>(
                <div key={post.id} style={{padding:"13px 18px",borderBottom:i<posts.length-1?`1px solid ${c.border}`:"none",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:18}}>{PAPERS[post.paper].icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:c.text}}>{post.title}</div>
                    <div style={{fontSize:11,color:c.sub}}>{post.attempts} attempts — {post.date}</div>
                  </div>
                  <button onClick={()=>copyLink(post)}
                    style={{background:copiedId===post.id?"#10b981":PAPERS[post.paper].color,color:"#fff",border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"background 0.3s"}}>
                    {copiedId===post.id?"Copied!":"Copy Link"}
                  </button>
                  <button onClick={()=>setPosts(prev=>prev.filter(p=>p.id!==post.id))}
                    style={{background:"none",border:"1px solid #fecaca",borderRadius:8,padding:"6px 10px",fontSize:11,color:"#ef4444",cursor:"pointer"}}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{background:"linear-gradient(160deg,#0c4a6e 0%,#0369a1 50%,#059669 100%)",padding:"24px 18px 30px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <div style={{position:"relative",maxWidth:600,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:"#fff",fontSize:22,fontWeight:800,marginBottom:6,lineHeight:1.25}}>CHPRBN 2026 National Exam Practice</h2>
          <p style={{color:"rgba(255,255,255,0.82)",fontSize:13,lineHeight:1.65,marginBottom:18}}>Click any exam below. Enter your name. Answer 100 questions in 1 hour. Get instant results with full answer sheet and shareable link.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[{v:`${ALL_Q.length}+`,l:"Questions"},{v:"3",l:"Papers"},{v:"1hr",l:"Per Exam"},{v:"100",l:"Qs Per Exam"}].map((s,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.14)",backdropFilter:"blur(6px)",borderRadius:12,padding:"10px 14px",textAlign:"center",border:"1px solid rgba(255,255,255,0.18)"}}>
                <div style={{color:"#fff",fontWeight:800,fontSize:17,lineHeight:1}}>{s.v}</div>
                <div style={{color:"rgba(255,255,255,0.7)",fontSize:10,marginTop:3}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:"0 16px 24px",maxWidth:600,margin:"0 auto"}}>
        <AdBanner dark={dark} idx={0}/>
        <div style={{fontSize:11,fontWeight:700,color:c.sub,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:14,marginTop:4}}>Click an Exam to Attempt</div>

        {posts.filter(p=>p.active).map((post,i)=>{
          const pInfo=PAPERS[post.paper];
          return(
            <div key={post.id} style={{background:c.card,borderRadius:18,border:`1.5px solid ${pInfo.color}22`,marginBottom:16,overflow:"hidden",boxShadow:dark?"0 4px 24px rgba(0,0,0,0.3)":"0 4px 24px rgba(0,0,0,0.08)",animation:`fadeUp 0.4s ease-out ${i*0.1}s both`}}>
              <div style={{background:pInfo.gradient,padding:"16px 18px"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                  <span style={{fontSize:28,flexShrink:0}}>{pInfo.icon}</span>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",marginBottom:2}}>CHPRBN 2026 — {pInfo.name}</div>
                    <h3 style={{color:"#fff",fontWeight:800,fontSize:16,lineHeight:1.25,marginBottom:6}}>{post.title}</h3>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {["1 Hour","100 Questions",post.date,`${post.attempts} attempts`].map((t,j)=>(
                        <span key={j} style={{background:"rgba(255,255,255,0.18)",color:"#fff",fontSize:9,fontWeight:700,padding:"3px 9px",borderRadius:20}}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{padding:"12px 18px",borderBottom:`1px solid ${c.border}`}}>
                <div style={{fontSize:11,fontWeight:600,color:c.sub,marginBottom:6}}>Subjects in this paper:</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {pInfo.subjects.map((sub,j)=>(
                    <span key={j} style={{background:`${pInfo.color}12`,color:pInfo.color,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{sub}</span>
                  ))}
                </div>
              </div>
              {post.desc&&<div style={{padding:"10px 18px",borderBottom:`1px solid ${c.border}`}}>
                <p style={{fontSize:13,color:c.sub,lineHeight:1.5}}>{post.desc}</p>
              </div>}
              <div style={{padding:"14px 18px",display:"flex",gap:10}}>
                <button onClick={()=>openPost(post)}
                  style={{flex:1,background:pInfo.gradient,color:"#fff",border:"none",borderRadius:13,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 20px ${pInfo.color}44`,transition:"transform 0.18s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                  Attempt {pInfo.name}
                </button>
                <button onClick={()=>copyLink(post)}
                  style={{background:copiedId===post.id?"#10b981":dark?"#334155":"#f1f5f9",border:`1px solid ${copiedId===post.id?"#10b981":c.border}`,color:copiedId===post.id?"#fff":c.text,borderRadius:13,padding:"14px 16px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",flexShrink:0,transition:"all 0.3s"}}>
                  {copiedId===post.id?"Copied!":"Copy Link"}
                </button>
              </div>
            </div>
          );
        })}

        <AdBanner dark={dark} idx={2}/>

        <div style={{background:c.card,borderRadius:16,border:`1px solid ${c.border}`,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"14px 18px",borderBottom:`1px solid ${c.border}`,fontWeight:700,fontSize:14,color:c.text}}>CHPRBN 2026 Official Paper Distribution</div>
          {Object.entries(PAPERS).map(([key,p],idx2)=>(
            <div key={key} style={{padding:"14px 18px",borderBottom:idx2<2?`1px solid ${c.border}`:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:18}}>{p.icon}</span>
                <span style={{fontWeight:700,fontSize:14,color:p.color}}>{p.name}</span>
                <span style={{fontSize:11,color:c.sub}}>({p.subjects.length} subjects)</span>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {p.subjects.map((sub,j)=>(
                  <span key={j} style={{background:`${p.color}12`,color:p.color,fontSize:10,fontWeight:600,padding:"3px 9px",borderRadius:20}}>{sub}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{background:c.card,borderRadius:16,padding:"16px 18px",border:`1px solid ${c.border}`,marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:700,color:c.text,marginBottom:12}}>How It Works</div>
          {[["1","Click Attempt Paper above"],["2","Enter your full name"],["3","Answer 100 questions in 60 minutes"],["4","Get instant score with full answer sheet"],["5","Copy and share your result link"],["6","Admin creates new exam posts anytime"]].map(([n,txt],i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
              <span style={{width:22,height:22,borderRadius:"50%",background:"linear-gradient(135deg,#0ea5e9,#10b981)",color:"#fff",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{n}</span>
              <span style={{fontSize:13,color:c.sub}}>{txt}</span>
            </div>
          ))}
        </div>

        <AdBanner dark={dark} idx={3}/>
      </div>
    </div>
  );
}
