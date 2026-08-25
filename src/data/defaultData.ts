import { CompanyConfig, QuickMessagePreset, ProductItem, TestimonialItem, ServiceItem } from '../types';

export const DEFAULT_COMPANY_DATA: CompanyConfig = {
  companyNameAr: 'المكاوي هوم UPVC (الرسمي)',
  companyNameEn: 'Al-mekawy Home Upvc Official',
  subtitleAr: 'للأبواب والشبابيك وقطاعات الـ UPVC العازلة للصوت والحرارة',
  subtitleEn: 'Doors, Windows & High Insulation UPVC Profiles',
  taglineAr: 'راحة منزلك تبدأ من العزل التام للضوضاء والأتربة وحرارة الجو بأعلى مواصفات ألمانية وتركية',
  taglineEn: 'Maximum acoustic and thermal insulation with certified international UPVC profiles',
  establishedYear: '2016',
  warrantyYears: '10',
  soundInsulationRate: '95%',
  heatInsulationRate: '85%',
  mainAddressAr: 'الفرع الرئيسي والمصنع: جمهورية مصر العربية - القاهرة / الجيزة - المعاينة متاحة لجميع المحافظات',
  mainAddressEn: 'Main Showroom & Factory: Cairo / Giza, Egypt - Site inspections available nationwide',
  googleMapsUrl: 'https://maps.google.com/?q=Al-Mekawy+Home+UPVC',
  workingHoursAr: 'يومياً من 9:00 صباحاً حتى 10:00 مساءً (الواتساب متاح 24/7)',
  workingHoursEn: 'Daily: 9:00 AM - 10:00 PM (WhatsApp available 24/7)',
  emergencyHotline: '01000000000',
  officialEmail: 'info@almekawy-upvc.com',
  phones: [
    {
      id: 'phone-1',
      titleAr: 'رقم الاتصال والمبيعات الرئيسي',
      titleEn: 'Main Sales & Inquiries Line',
      number: '01060524985',
      displayNumber: '01060524985',
      departmentAr: 'قسم المبيعات والمقايسات الفنية',
      departmentEn: 'Sales & Site Survey Department',
      isPrimary: true,
      isWhatsapp: false,
      noteAr: 'متاح للاتصال الهاتفي المباشر لجميع الاستفسارات والمقايسات',
      noteEn: 'Available for direct phone calls and inquiries',
      workingHoursAr: '9 ص - 10 م',
      workingHoursEn: '9 AM - 10 PM'
    },
    {
      id: 'phone-2',
      titleAr: 'رقم الاتصال وخدمة العملاء',
      titleEn: 'Customer Service & Contact Line',
      number: '01141761261',
      displayNumber: '01141761261',
      departmentAr: 'خدمة العملاء والتواصل المباشر',
      departmentEn: 'Customer Support & Inquiries',
      isPrimary: false,
      isWhatsapp: true,
      noteAr: 'متاح للاتصال المباشر والتواصل عبر الواتساب',
      noteEn: 'Available for phone calls & WhatsApp messaging',
      workingHoursAr: '9 ص - 10 م',
      workingHoursEn: '9 AM - 10 PM'
    }
  ],
  socials: [
    {
      id: 'soc-facebook',
      platform: 'facebook',
      titleAr: 'صفحة الفيسبوك',
      titleEn: 'Facebook Page',
      username: 'المكاوي هوم UPVC',
      url: 'https://www.facebook.com/share/1Ahx9gnHY6/',
      badgeAr: 'الصفحة الرسمية',
      badgeEn: 'Official Page',
      color: 'bg-blue-600 hover:bg-blue-500 text-white',
      descriptionAr: 'تابع أحدث الأعمال والمشاريع المنفذة والعروض الحصرية على فيسبوك',
      descriptionEn: 'Follow our latest projects, updates, and exclusive offers',
      followerCount: 'صفحة معتمدة'
    },
    {
      id: 'soc-instagram',
      platform: 'instagram',
      titleAr: 'صفحة الانستجرام',
      titleEn: 'Instagram Page',
      username: '@almekawy.home',
      url: 'https://www.instagram.com/almekawy.home?igsi=bXBqZmw3NGt4bzVs',
      badgeAr: 'معرض الصور',
      badgeEn: 'Photo Gallery',
      color: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-90 text-white',
      descriptionAr: 'معرض صور وفيديوهات لأحدث تصاميم وألوان قطاعات UPVC',
      descriptionEn: 'Photos & reels showcasing our high quality UPVC installations',
      followerCount: 'معرض متجدد'
    },
    {
      id: 'soc-tiktok',
      platform: 'tiktok',
      titleAr: 'صفحة التيك توك',
      titleEn: 'TikTok Page',
      username: '@almekawy.home',
      url: 'https://www.tiktok.com/@almekawy.home?_r=1&_t=ZS-99BUVgTpcmX',
      badgeAr: 'فيديوهات التجارب',
      badgeEn: 'Insulation Videos',
      color: 'bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white',
      descriptionAr: 'فيديوهات حية وتجارب عزل الصوت والأتربة من أرض الواقع',
      descriptionEn: 'Real soundproofing and acoustic testing videos on TikTok',
      followerCount: 'فيديوهات حية'
    }
  ]
};

export const QUICK_MESSAGE_PRESETS: QuickMessagePreset[] = [
  {
    id: 'qm-quote',
    titleAr: 'طلب مقايسة وعرض سعر سريع',
    titleEn: 'Request Quote & Measurements',
    icon: 'Calculator',
    messageAr: 'السلام عليكم، أرغب في طلب معاينة ومقايسة لمنزلي لمعرفة أسعار شبابيك وأبواب UPVC من المكاوي هوم. تفاصيل طلبي:\n- المنطقة / العنوان:\n- عدد الشبابيك التقريبي:\n- موعد المعاينة المناسب:',
    messageEn: 'Hello, I would like to request a measurement inspection and price quotation for UPVC windows and doors from Al-Mekawy Home.'
  },
  {
    id: 'qm-sound',
    titleAr: 'استفسار عن عزل الصوت والضوضاء',
    titleEn: 'Soundproofing & Noise Inquiry',
    icon: 'VolumeX',
    messageAr: 'مرحباً، أعاني من ضوضاء الشارع الشديدة وأريد معرفة أفضل قطاع ونوع زجاج (دبل/سيكوريت) يحقق أقصى عزل صوتي بنسبة 95% من المكاوي هوم.',
    messageEn: 'Hi, I want to inquire about the best UPVC profile and acoustic double-glazing solution for high noise reduction.'
  },
  {
    id: 'qm-colors',
    titleAr: 'طلب كتالوج الألوان والقطاعات',
    titleEn: 'Color Catalog & Profiles',
    icon: 'Palette',
    messageAr: 'أهلاً بكم، هل يمكن إرسال كتالوج ألوان UPVC المتوفرة لديكم (الأبيض، الخشمونيوم، الماهوجني، الرمادي الأنثراسيت) والقطاعات المعتمدة؟',
    messageEn: 'Hello, please send the color catalog (White, Oak, Mahogany, Anthracite Gray) and available certified profiles.'
  },
  {
    id: 'qm-maintenance',
    titleAr: 'خدمات الصيانة والضمان',
    titleEn: 'Warranty & Maintenance',
    icon: 'ShieldCheck',
    messageAr: 'السلام عليكم، أنا عميل لدى المكاوي هوم وأرغب في الاستفسار بخصوص الصيانة الدورية / شهادة الضمان الـ 10 سنوات.',
    messageEn: 'Hello, I am a client of Al-Mekawy Home inquiring about warranty service and periodic maintenance.'
  }
];

export const UPVC_PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-sliding',
    titleAr: 'شبابيك UPVC جرار عازلة (Sliding)',
    titleEn: 'Sliding UPVC Windows',
    categoryAr: 'شبابيك عازلة',
    categoryEn: 'Insulated Windows',
    descriptionAr: 'تصميم انسيابي يوفر المساحة مع عزل تام للهواء والأتربة باستخدام فراشي حماية مزدوجة وإطارات تسليح فولاذي مجلفن.',
    descriptionEn: 'Space-saving smooth sliding system with dual weather brushes and galvanized steel core reinforcement.',
    featuresAr: ['عزل صوتي 90-95%', 'سلك بليسيه مدمج مانع للحشرات', 'كاوتش EPDM تركي وألماني', 'إمكانية زجاج دبل مع جورجيا ديكورية'],
    featuresEn: ['90-95% Acoustic Insulation', 'Integrated Pleated Insect Screen', 'Premium EPDM Weather Seals', 'Double Glazing with Georgia Bars'],
    insulationRate: '95%',
    warranty: '10 سنوات ضمان',
    imageType: 'sliding-window'
  },
  {
    id: 'prod-casement',
    titleAr: 'شبابيك UPVC مفصلي وقلاب (Tilt & Turn)',
    titleEn: 'Casement & Tilt-Turn Windows',
    categoryAr: 'شبابيك عازلة',
    categoryEn: 'Insulated Windows',
    descriptionAr: 'أعلى مستوى إحكام غلق بالعالم بنظام إغلاق متعدد النقاط (Multi-Lock) لعزل الصوت بنسبة تقارب 98% وعزل حراري كامل.',
    descriptionEn: 'Ultimate airtight sealing with German multi-point locking system for near 98% acoustic insulation.',
    featuresAr: ['فتح جانبي وعمودي للتهوية الآمنة', 'إحكام غلق كلي ضد تسريب مياه الأمطار', 'إكسسوارات ROTO و G-U الألمانية', 'مقاومة تامة لاصفرار اللون'],
    featuresEn: ['Side & Tilt opening for secure airflow', '100% Rain & Water Tightness', 'Certified German Hardware', 'UV Color Resistance'],
    insulationRate: '98%',
    warranty: '10 سنوات ضمان',
    imageType: 'casement-window'
  },
  {
    id: 'prod-balcony',
    titleAr: 'أبواب بلكونات ومداخل UPVC مودرن',
    titleEn: 'Balcony & Entrance UPVC Doors',
    categoryAr: 'أبواب عازلة',
    categoryEn: 'Insulated Doors',
    descriptionAr: 'أبواب قوية بتسليح حديدي داخلي سميك، تقاوم الصدأ والتآكل وعوامل الرطوبة وتمنع دخول ذرات الغبار وحرارة الصيف.',
    descriptionEn: 'Heavy-duty doors with robust inner steel reinforcement, anti-corrosive and heat-blocking.',
    featuresAr: ['مقاومة الرطوبة وبخار الماء', 'مفصلات 3D قابلة للضبط الدقيق', 'عتبة ألومنيوم أرضية محكمة', 'زجاج سيكوريت عالي الأمان'],
    featuresEn: ['Moisture & Humidity Resistant', 'Adjustable 3D Heavy Hinges', 'Low-profile airtight threshold', 'Toughened Tempered Glass'],
    insulationRate: '95%',
    warranty: '10 سنوات ضمان',
    imageType: 'balcony-door'
  },
  {
    id: 'prod-insect-screen',
    titleAr: 'سلك بليسيه مودرن مانع للحشرات (Pleated Screen)',
    titleEn: 'Modern Pleated Insect Screen',
    categoryAr: 'إكسسوارات وشبكات',
    categoryEn: 'Accessories & Screens',
    descriptionAr: 'شبك حريري مقاوم للقطع والأشعة فوق البنفسجية ينسحب بسلاسة ويختفي تماماً عند الفتح، مناسب لجميع الشبابيك والأبواب.',
    descriptionEn: 'Tear-resistant UV-proof pleated mesh that retracts smoothly, keeping insects out without blocking view.',
    featuresAr: ['لا يشغل مساحة إضافية', 'سهل التنظيف ومقاوم للتمزق', 'ألوان تتناسق مع القطاع', 'حركة انزلاق هادئة جداً'],
    featuresEn: ['Zero extra space required', 'Easy wash & tear proof', 'Color matching frames', 'Silent glide system'],
    insulationRate: 'حماية 100%',
    warranty: '5 سنوات ضمان',
    imageType: 'insect-screen'
  }
];

export const UPVC_VS_ALUMINUM_COMPARISON = [
  {
    featureAr: 'عزل الصوت والضوضاء الخارجية',
    featureEn: 'Acoustic Sound Insulation',
    upvcAr: 'عزل فائق يصل إلى 95% بفضل تعدد الغرف الهوائية',
    upvcEn: 'Up to 95% noise reduction via multi-chamber structure',
    aluminumAr: 'عزل ضعيف (ينقل الذبذبات الصوتية)',
    aluminumEn: 'Low isolation (metal transmits vibration)',
    isUpvcWinner: true
  },
  {
    featureAr: 'عزل الحرارة وتوفير فواتير التكييف',
    featureEn: 'Thermal Insulation & Energy Saving',
    upvcAr: 'مادة عازلة غير موصلة للحرارة (يوفر 35% من الكهرباء)',
    upvcEn: 'Non-conductive polymer (saves 35% on AC energy)',
    aluminumAr: 'معدن سريع التوصيل لحرارة الشمس وبرودة الشتاء',
    aluminumEn: 'High metal thermal conductivity',
    isUpvcWinner: true
  },
  {
    featureAr: 'منع دخول الأتربة ومياه الأمطار',
    featureEn: 'Dust & Water Tightness',
    upvcAr: 'لحام حراري زوايا 100% مصمت مع كاوتش EPDM مزدوج',
    upvcEn: '100% Fusion-welded leakproof corners + EPDM seals',
    aluminumAr: 'تجميع مسامير يسمح بتسريب الغبار مع الوقت',
    aluminumEn: 'Screwed corners with possible micro gaps',
    isUpvcWinner: true
  },
  {
    featureAr: 'مقاومة الصدأ والتآكل والرطوبة',
    featureEn: 'Rust & Humidity Resistance',
    upvcAr: 'لا يصدأ ولا يتأثر بالأملاح والرطوبة ومناطق الساحل',
    upvcEn: 'Never corrodes, perfect for coastal & humid areas',
    aluminumAr: 'قد يتعرض للتقشير أو التأكسد مع الرطوبة',
    aluminumEn: 'Can oxidize or flake with salty air over years',
    isUpvcWinner: true
  },
  {
    featureAr: 'العمر الافتراضي والضمان',
    featureEn: 'Lifespan & Warranty',
    upvcAr: 'ضمان 10 سنوات وعمر افتراضي يتجاوز 40 عاماً',
    upvcEn: '10-Year Warranty, lifespan exceeding 40+ years',
    aluminumAr: 'يحتاج صيانة متكررة للفراشي والمسامير',
    aluminumEn: 'Requires frequent maintenance of screws & brushes',
    isUpvcWinner: true
  }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    clientNameAr: 'م. أحمد الشناوي',
    clientNameEn: 'Eng. Ahmed El-Shennawy',
    quoteAr: 'ركبت شبابيك UPVC دبل جلاس للفيلا بالكامل في التجمع الخامس مع المكاوي هوم. النتيجة في عزل صوت الشارع وحرارة الصيف مبهرة جداً! الالتزام بالمواعيد وجودة الفينش والمفصلات ممتازة وأنصح بالتعامل معهم بشدة.',
    quoteEn: 'Installed double-glazed UPVC windows for my whole villa in New Cairo. The soundproofing against street noise and heat insulation is unbelievable! Punctual delivery and flawless hardware finish.',
    locationAr: 'التجمع الخامس، القاهرة الجديدة',
    locationEn: '5th Settlement, New Cairo',
    serviceTypeAr: 'شبابيك UPVC عازلة وزجاج دبل',
    serviceTypeEn: 'Insulated UPVC Windows & Double Glass',
    rating: 5,
    date: '2026-06-15',
    avatarSeed: 'ahmed',
    projectHighlights: 'فيلا كاملة (14 شباك + 4 أبواب)',
    verified: true
  },
  {
    id: 'test-2',
    clientNameAr: 'د. سارة عبد الرحمن',
    clientNameEn: 'Dr. Sara Abdelrahman',
    quoteAr: 'كنت أعاني من الأتربة وصوت السيارات على المحور بشكل لا يطاق. بعد استبدال ألوميتال الشقة بقطاعات UPVC من المكاوي هوم مع سلك بليسيه، البيت أصبح هادئاً تماماً ونظيفاً. خدمة العملاء والمتابعة محترمة جداً.',
    quoteEn: 'I suffered from non-stop traffic noise and dust along the highway. Replacing the old aluminum with Al-Mekawy UPVC and pleated screens brought complete silence and cleanliness. Top-notch customer care!',
    locationAr: 'الشيخ زايد، الجيزة',
    locationEn: 'Sheikh Zayed, Giza',
    serviceTypeAr: 'استبدال قطاعات قديمة وسلك بليسيه',
    serviceTypeEn: 'Retrofitting & Pleated Insect Screens',
    rating: 5,
    date: '2026-07-02',
    avatarSeed: 'sara',
    projectHighlights: 'شقة سكنية (عزل صوتي 95%)',
    verified: true
  },
  {
    id: 'test-3',
    clientNameAr: 'أ. طارق عبد العزيز',
    clientNameEn: 'Mr. Tarek Abdelaziz',
    quoteAr: 'اللون الخشمونيوم السنديان متطابق تماماً مع ديكور الفيلا الكلاسيك وجودة اللحام الحراري لا تترك أي أثر. فريق التركيب محترف جداً ونظفوا المكان بعد الانتهاء، وضمان 10 سنوات معتمد رسمياً.',
    quoteEn: 'The Oak Woodgrain finish matches our classic interior flawlessly and the fusion welds are completely seamless. Professional technicians who left the site spotless. Received the certified 10-year warranty.',
    locationAr: 'مدينة 6 أكتوبر',
    locationEn: '6th of October City',
    serviceTypeAr: 'أبواب وشبابيك UPVC خشمونيوم سنديان',
    serviceTypeEn: 'Oak Woodgrain Windows & Doors',
    rating: 5,
    date: '2026-07-28',
    avatarSeed: 'tarek',
    projectHighlights: 'قطاعات ملونة عازلة مع مفصلات ألمانية',
    verified: true
  },
  {
    id: 'test-4',
    clientNameAr: 'م. حسام الدين عثمان',
    clientNameEn: 'Arch. Hossam El-Din Osman',
    quoteAr: 'كمهندس ديكور تعاملت مع المكاوي هوم في أكثر من 6 مشاريع شقق ومقرات إدارية. دقة رفع المقاسات بالليزر وسرعة التصنيع وتسليم الموقع في الموعد المحدد جعلتهم شريكي الدائم في جميع أعمال الـ UPVC.',
    quoteEn: 'As an interior architect, I collaborated with Al-Mekawy on over 6 residential and office projects. Laser precision measurements and punctual deliveries make them my go-to UPVC contractor.',
    locationAr: 'المعادي، القاهرة',
    locationEn: 'Maadi, Cairo',
    serviceTypeAr: 'استشارات هندسية وتوريد مشروعات',
    serviceTypeEn: 'Architectural Supply & Engineering',
    rating: 5,
    date: '2026-08-10',
    avatarSeed: 'hossam',
    projectHighlights: 'مقر إداري ومشاريع ديكور',
    verified: true
  },
  {
    id: 'test-5',
    clientNameAr: 'أ. نادية المنياوي',
    clientNameEn: 'Mrs. Nadia El-Meniawy',
    quoteAr: 'أبواب الحمامات والمطابخ الـ UPVC حلت مشكلة الرطوبة وانتفاخ الخشب نهائياً. التصميم عصري وسهل التنظيف والكاوتش عازل تام للروائح وبخار الماء. شكراً لفريق المكاوي هوم على الذوق والاحترافية.',
    quoteEn: 'The UPVC bathroom and kitchen doors permanently solved moisture and water damage. Elegant, easy to clean, and airtight against moisture and steam. Thank you for the exceptional craftsmanship!',
    locationAr: 'الشروق، القاهرة',
    locationEn: 'El Shorouk, Cairo',
    serviceTypeAr: 'أبواب حمامات ومطابخ مقاومة للمياه',
    serviceTypeEn: 'Waterproof Bathroom & Kitchen Doors',
    rating: 5,
    date: '2026-08-18',
    avatarSeed: 'nadia',
    projectHighlights: 'أبواب داخلية مقاومة للرطوبة 100%',
    verified: true
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'serv-windows',
    titleAr: 'شبابيك الـ UPVC العازلة المتطورة',
    titleEn: 'Advanced Insulated UPVC Windows',
    categoryKey: 'windows',
    categoryAr: 'شبابيك UPVC',
    categoryEn: 'UPVC Windows',
    descriptionAr: 'توريد وتركيب أحدث أنظمة الشبابيك الجرار والمفصلي والقلاب (Tilt & Turn) بقطاعات معتمدة متعددة الغرف الهوائية وعزل صوتي يصل لـ 95%.',
    descriptionEn: 'Supply & installation of sliding, casement and Tilt & Turn multi-chamber UPVC windows with up to 95% noise reduction.',
    iconName: 'LayoutGrid',
    featuresAr: [
      'أنظمة جرار سحاب ناعم بمجاري مقاومة للتآكل',
      'أنظمة مفصلي وقلاب ألماني بإحكام غلق متعدد النقاط (Multi-Lock)',
      'زجاج دبل وثلاثي مفرغ معزول بغاز الأرجون',
      'فراشي حماية مزدوجة وكاوتش EPDM أصلي'
    ],
    featuresEn: [
      'Smooth sliding with anti-wear tracks',
      'German Tilt-Turn system with multi-point locking',
      'Argon-filled double & triple glazed glass',
      'Dual weather brushes and original EPDM seals'
    ],
    idealForAr: 'الشقق المطلة على شوارع رئيسية، الفلل، والمباني المعرضة لأشعة الشمس المباشرة',
    idealForEn: 'Apartments facing busy avenues, villas, and noise/heat-exposed buildings',
    badgeAr: 'الأكثر طلباً',
    badgeEn: 'Best Seller'
  },
  {
    id: 'serv-doors',
    titleAr: 'أبواب الـ UPVC السكنية والتجارية',
    titleEn: 'Residential & Commercial UPVC Doors',
    categoryKey: 'doors',
    categoryAr: 'أبواب UPVC',
    categoryEn: 'UPVC Doors',
    descriptionAr: 'أبواب بلكونات ومداخل وحمامات فائقة التحمل بتسليح فولاذي مجلفن، مقاومة للماء 100%، ولا تتأثر بالرطوبة أو الحشرات أو تغيرات المناخ.',
    descriptionEn: 'Heavy-duty balcony, entrance, and bathroom doors with galvanized steel core, 100% waterproof and termite-resistant.',
    iconName: 'DoorClosed',
    featuresAr: [
      'أبواب بلكونات جرار ومفصلي بعتبة عازلة للأتربة',
      'أبواب حمامات ومطابخ مقاومة للمياه وبخار الماء 100%',
      'مفصلات 3D ثقيلة قابلة للوزن والضبط الدقيق',
      'أقفال وكوالين سيكيورتي متعددة الألسنة'
    ],
    featuresEn: [
      'Balcony sliding & hinged doors with sealed thresholds',
      '100% moisture-proof bathroom & kitchen doors',
      'Heavy-duty 3D adjustable security hinges',
      'Multi-bolt security locks and hardware'
    ],
    idealForAr: 'البلكونات، التراسات، غرف النوم، والحمامات والمطابخ الرطبة',
    idealForEn: 'Balconies, terraces, bedrooms, and humid bathroom spaces',
    badgeAr: 'مقاوم للماء 100%',
    badgeEn: '100% Waterproof'
  },
  {
    id: 'serv-custom',
    titleAr: 'حلول معمارية مخصصة وألوان ديكورية',
    titleEn: 'Custom Architectural & Decorative Profiles',
    categoryKey: 'custom',
    categoryAr: 'حلول مخصصة',
    categoryEn: 'Custom Solutions',
    descriptionAr: 'تفصيل قطاعات بألوان خشبية فاخرة (خشمونيوم سنديان وماهوجني ورمادي مودرن)، وشبابيك دوران وأقواس معمارية وزجاج جورجيا الديكوري.',
    descriptionEn: 'Bespoke laminated profiles in woodgrain (Oak, Mahogany, Anthracite Grey), arched/curved shapes, and decorative Georgia bar glass.',
    iconName: 'Palette',
    featuresAr: [
      'تغليف ألماني رينوليت مقاوم للتقشير وأشعة UV',
      'شبابيك دائرية وأقواس منحنية بأحدث مكابس الثني الحراري',
      'قواطع جورجيا ديكورية داخل الزجاج الدبل بأشكال هندسية',
      'زجاج سيكوريت عاكس ومصنفر وزجاج ملون راقي'
    ],
    featuresEn: [
      'German Renolit lamination UV-resistant film',
      'Thermal bending for arches & custom geometric shapes',
      'Internal decorative Georgia bars inside sealed glass',
      'Tempered, frosted, reflective and tinted glass varieties'
    ],
    idealForAr: 'الفلل والقصور، الواجهات الكلاسيكية والمودرن، والوحدات ذات الطابع الخاص',
    idealForEn: 'Villas, luxury residences, classical & contemporary architectural facades',
    badgeAr: 'تصاميم حسب الطلب',
    badgeEn: 'Bespoke Design'
  },
  {
    id: 'serv-screens',
    titleAr: 'سلك بليسيه مودرن وشبكات الحماية',
    titleEn: 'Modern Pleated Screens & Insect Barriers',
    categoryKey: 'screens',
    categoryAr: 'سلك وحماية',
    categoryEn: 'Insect Screens',
    descriptionAr: 'تركيب أنظمة سلك البليسيه القابل للطي والحركة الانسيابية المانع للناموس والحشرات مع الحفاظ على الرؤية النقية وتدفق الهواء الطبيعي.',
    descriptionEn: 'Foldable pleated mesh screens that slide effortlessly to block insects while preserving outdoor panoramic views and ventilation.',
    iconName: 'ShieldCheck',
    featuresAr: [
      'شبك فايبر جلاس معالج حرارياً ضد القطع والتمزق',
      'حركة سحاب ناعمة بدون صوت مع إمكانية التوقف في أي موضع',
      'إطارات ألومنيوم و UPVC متناسقة بنفس لون الشباك',
      'سهولة تامة في الفك والتنظيف بالماء'
    ],
    featuresEn: [
      'Heat-treated fiberglass mesh resistant to tearing',
      'Whisper-quiet sliding action with stop-anywhere feature',
      'Matching color-coordinated frame finishes',
      'Effortless maintenance and water washability'
    ],
    idealForAr: 'كافة مقاسات الشبابيك والأبواب الكبيرة للبلكونات والتراسات',
    idealForEn: 'All window sizes and wide terrace/balcony door openings'
  },
  {
    id: 'serv-consultation',
    titleAr: 'المعاينة الهندسية ورفع المقاسات بالليزر',
    titleEn: 'Engineering Site Survey & Laser Measuring',
    categoryKey: 'consultation',
    categoryAr: 'معاينة واستشارات',
    categoryEn: 'Site Survey',
    descriptionAr: 'زيارة هندسية مجانية لموقعك لرفع المقاسات بأجهزة الليزر الدقيقة، واختبار مستويات الضوضاء وتحديد أفضل قطاع وسماكة زجاج مناسبة لاحتياجك.',
    descriptionEn: 'Free on-site engineering visit with high-precision laser tools, acoustic testing, and custom specification recommendations.',
    iconName: 'Compass',
    featuresAr: [
      'رفع مقاسات هندسي بالليزر بدقة المليمتر',
      'فحص اتجاهات الرياح وأشعة الشمس لتحديد أفضل نوع زجاج',
      'عرض عينات حية من القطاعات والألوان والزجاج في موقعك',
      'إعداد مقايسة فنية ومالية تفصيلية فورية'
    ],
    featuresEn: [
      'Millimeter-precision laser dimension measurement',
      'Wind load & sunlight orientation analysis',
      'Physical samples of profiles, colors and glass on-site',
      'Instant itemized technical and financial quotation'
    ],
    idealForAr: 'العملاء قبل الشروع في التشطيب أو عند الرغبة في تجديد الشبابيك القائمة',
    idealForEn: 'Homeowners during finishing phases or replacing existing windows',
    badgeAr: 'معاينة لجميع المحافظات',
    badgeEn: 'Nationwide'
  },
  {
    id: 'serv-maintenance',
    titleAr: 'خدمات الصيانة والضمان المعتمد 10 سنوات',
    titleEn: 'Certified Maintenance & 10-Year Warranty',
    categoryKey: 'maintenance',
    categoryAr: 'صيانة وضمان',
    categoryEn: 'Maintenance & Warranty',
    descriptionAr: 'فريق صيانة متخصص لخدمة ما بعد البيع، مع تقديم شهادة ضمان رسمي موثق لمدة 10 سنوات ضد عيوب الصناعة وتغير اللون وتآكل الإكسسوارات.',
    descriptionEn: 'Dedicated after-sales support team with an official certified 10-year warranty covering manufacturing, color stability and hardware.',
    iconName: 'Wrench',
    featuresAr: [
      'شهادة ضمان معتمدة ومختومة لمدة 10 سنوات',
      'ضبط وصيانة دورية للمفصلات والمقابض ومجاري الانزلاق',
      'استبدال فوري لقطع الغيار والإكسسوارات الأصلية',
      'استجابة سريعة لبلاغات الصيانة عبر خط الدعم المخصص'
    ],
    featuresEn: [
      'Official stamped 10-year warranty certificate',
      'Periodic calibration of hinges, handles and sliding tracks',
      'Direct replacement with authentic manufacturer hardware',
      'Rapid response via dedicated customer support line'
    ],
    idealForAr: 'جميع عملاء المكاوي هوم والمشروعات السكنية والتجارية',
    idealForEn: 'All Al-Mekawy clients, residential compounds and commercial towers',
    badgeAr: 'ضمان 10 سنوات',
    badgeEn: '10-Year Warranty'
  }
];

