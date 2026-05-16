import React, { useState } from 'react';
import {
  User,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code,
  ExternalLink,
  Video,
  Award,
  Send,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  Languages
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Types ---
type Language = 'en' | 'id' | 'jp';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  category: 'Web' | 'Mobile' | 'Video';
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  school: string;
  major: string;
  year: string;
}

// --- Translations ---
const T = {
  en: {
    nav: { about: "About", exp: "Experience", projects: "Projects", contact: "Contact", hire: "Hire Me", home: "Home" },
    hero: { title: "Tazar", roles: ["Yogyakarta, Indonesia", "Informatics Graduate", "Professional Videographer"], desc: "I'm a passionate web and mobile developer with a background in Informatics and a sharp eye for cinematic storytelling through videography." },
    about: { title: "About Me", p1: "Informatics Engineering graduate with a deep passion for web and mobile development. I am always enthusiastic about learning new technologies and applying them to real-world solutions.", p2: "Beyond IT, I am also a professional videographer. The combination of technical skills and visual creativity allows me to build digital products that are not only functional but also aesthetic.", passion: "Passion", creative: "Creative" },
    sections: { education: "Education", work: "Work Experience", certs: "Certifications", selected: "Selected Projects", selectedDesc: "Discover some of my latest work in technology and visual storytelling.", contactTitle: "Let's build something meaningful together." },
    contact: { email: "Email", phone: "WhatsApp", name: "Name", msgLabel: "Message", msgPlaceholder: "Tell me about your project...", send: "Send Message", copied: "Copied!" }
  },
  id: {
    nav: { about: "Tentang", exp: "Pengalaman", projects: "Proyek", contact: "Kontak", hire: "Hubungi Saya", home: "Beranda" },
    hero: { title: "Tazar", roles: ["Yogyakarta, Indonesia", "Mahasiswa Informatika", "Videografer Profesional"], desc: "Saya adalah pengembang web dan mobile yang bersemangat dengan latar belakang ilmu komputer dan ketertarikan pada penyampaian pesan secara visual." },
    about: { title: "Tentang Saya", p1: "Mahasiswa Teknik Informatika yang memiliki antusiasme mendalam dalam pengembangan web dan mobile. Saya selalu bersemangat untuk mempelajari teknologi baru dan menerapkannya menjadi produk nyata.", p2: "Selain bidang IT, saya juga berkecimpung di dunia videografi profesional. Perpaduan antara kemampuan teknis dan kreativitas visual memungkinkan saya membangun produk digital yang fungsional sekaligus estetis.", passion: "Semangat", creative: "Kreatif" },
    sections: { education: "Pendidikan", work: "Pengalaman Kerja", certs: "Sertifikasi", selected: "Proyek Terpilih", selectedDesc: "Kumpulan karya terbaru saya dalam bidang teknologi dan visual storytelling.", contactTitle: "Mari kita bangun sesuatu yang bermakna." },
    contact: { email: "Email", phone: "WhatsApp", name: "Nama", msgLabel: "Pesan", msgPlaceholder: "Ceritakan tentang proyek Anda...", send: "Kirim Pesan", copied: "Tersalin!" }
  },
  jp: {
    nav: { about: "について", exp: "経験", projects: "プロジェクト", contact: "お問い合わせ", hire: "採用情報", home: "ホーム" },
    hero: { title: "タザール", roles: ["インドネシア、ジョグジャカルタ", "情報工学卒業生", "プロのビデオグラファー"], desc: "私は情報工学の背景を持ち、ビデオグラフィーを通じた映画のようなストーリーテリングに鋭い目を持つ、情熱的なウェブおよびモバイルデベロッパーです。" },
    about: { title: "私について", p1: "ウェブおよびモバイル開発に深い情熱を持つ情報工学の卒業生です。常に新しい技術を学び、それを現実世界のソリューションに適用することに熱心です。", p2: "IT以外にも、プロのビデオグラファーとしても活動しています。技術的なスキルと視覚的な創造性の組み合わせにより、機能的であるだけでなく、美的なデジタル製品を構築することができます。", passion: "情熱", creative: "クリエイティブ" },
    sections: { education: "学歴", work: "職歴", certs: "資格", selected: "主なプロジェクト", selectedDesc: "テクノロジーと視覚的なストーリーテリングにおける私の最新の作品をいくつかご覧ください。", contactTitle: "一緒に有意義なものを作りましょう。" },
    contact: { email: "メール", phone: "WhatsApp", name: "名前", msgLabel: "メッセージ", msgPlaceholder: "プロジェクトについて教えてください...", send: "メッセージを送信", copied: "コピーしました！" }
  }
};

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "CRUD Web App",
    description: "A full-stack e-commerce platform built with React and Node.js featuring real-time inventory management.",
    tags: ["HTML", "PHP"],
    link: "#",
    category: "Web"
  },
  {
    title: "Sakanca Mobile App",
    description: "application to make it easier for clients to find the services they need.",
    tags: ["Java Script", "Xml", "Kotlin"],
    link: "#",
    category: "Mobile"
  },
  {
    title: "Cinematic Short Film",
    description: "Professional videography project showcasing the beauty of Yogyakarta through advanced color grading.",
    tags: ["Premiere Pro", "After Effects", "Capcut Pro"],
    link: "#",
    category: "Video"
  }
];

const EXPERIENCES = (lang: Language): Experience[] => {
  const data = {
    en: [
      { role: "Freelance Web Developer", company: "Self-Employed", period: "2023 - Present", description: "Developing custom web applications for various clients using modern stacks like React and Tailwind CSS." },
      { role: "Videographer", company: "Sakanca Visual", period: "2022 - 2023", description: "Managed high-end video production, from storyboarding to final editing for corporate and promotional videos." }
    ],
    id: [
      { role: "Pengembang Web Freelance", company: "Wiraswasta", period: "2023 - Sekarang", description: "Mengembangkan aplikasi web khusus untuk berbagai klien menggunakan stack modern seperti React dan Tailwind CSS." },
      { role: "Videografer", company: "Sakanca Visual", period: "2022 - 2023", description: "Mengelola produksi video kelas atas, mulai dari storyboard hingga pengeditan akhir untuk video perusahaan dan promosi." }
    ],
    jp: [
      { role: "フリーランスウェブデベロッパー", company: "自営業", period: "2023年 - 現在", description: "ReactやTailwind CSSなどのモダンなスタックを使用して、さまざまなクライアント向けのカスタムウェブアプリケーションを開発しています。" },
      { role: "ビデオグラファー", company: "Sakanca Visual", period: "2022年 - 2023年", description: "企業向けおよびプロモーション用ビデオのストーリーボードから最終編集まで、ハイエンドのビデオ制作を管理しました。" }
    ]
  };
  return data[lang];
};

const EDUCATION = (lang: Language): Education[] => {
  const data = {
    en: [
      {
        school: "Adisudjipto Aerospace University",
        major: "Informatics Engineering",
        year: "2024"
      },
      {
        school: "SMKN 5 Surakarta",
        major: "Computer & Network Engineering",
        year: "2023"
      }
    ],
    id: [
      {
        school: "Universitas Dirgantara Adisudjipto",
        major: "Teknik Informatika",
        year: "2024"
      },
      {
        school: "SMKN 5 Surakarta",
        major: "Teknik Komputer & Jaringan",
        year: "2023"
      }
    ],
    jp: [
      {
        school: "Adisudjipto Aerospace University",
        major: "情報工学",
        year: "2024"
      },
      {
        school: "SMKN 5 Surakarta",
        major: "コンピュータネットワーク工学",
        year: "2023"
      }
    ]
  };
  return data[lang];
};

const CERTIFICATIONS = (lang: Language): string[] => {
  const data = {
    en: [
      "Google Cloud Certified Associate Cloud Engineer",
      "React Developer from Google Stitch",
      "Professional Creative Videography - Adobe"
    ],
    id: [
      "Sertifikasi Google Cloud Associate Cloud Engineer",
      "Pengembang React dari Google Stitch",
      "Videografi Kreatif Profesional - Adobe"
    ],
    jp: [
      "Google Cloud認定アソシエイトクラウドエンジニア",
      "Google Stitch認定Reactデベロッパー",
      "プロフェッショナルクリエイティブビデオグラフィー - Adobe"
    ]
  };
  return data[lang];
};

// --- Components ---

const Glitch = ({ children, className = "", as: Component = "span", ...props }: { children: string, className?: string, as?: any, [key: string]: any }) => (
  <Component className={`glitch-text ${className}`} data-text={children} {...props}>
    {children}
  </Component>
);

const Nav = ({
  lang,
  setLang
}: {
  lang: Language,
  setLang: (l: Language) => void
}) => {
  const content = T[lang].nav;
  return (
    <nav className="glass-nav border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-xl tracking-tight text-neutral-900">TAZAR.</span>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#about" className="text-neutral-600 hover:text-indigo-600 transition-colors"><Glitch>{content.about}</Glitch></a>
          <a href="#experience" className="text-neutral-600 hover:text-indigo-600 transition-colors"><Glitch>{content.exp}</Glitch></a>
          <a href="#projects" className="text-neutral-600 hover:text-indigo-600 transition-colors"><Glitch>{content.projects}</Glitch></a>
          <a href="#contact" className="text-neutral-600 hover:text-indigo-600 transition-colors"><Glitch>{content.contact}</Glitch></a>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switch */}
          <div className="flex bg-neutral-100 p-1 rounded-lg gap-1 border border-neutral-200">
            {(['en', 'id', 'jp'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[10px] font-black uppercase px-2 py-1 rounded transition-all ${lang === l ? 'bg-white shadow-sm text-indigo-600' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="https://wa.me/085198507385"
            target="_blank"
            referrerPolicy="no-referrer"
            className="hidden sm:flex bg-brand-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all items-center gap-2"
          >
            {content.hire}
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const content = T[lang].hero;
  return (
    <section className="section-padding flex flex-col items-center text-center max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <img
            src="aset/profilpic.jpg"
            alt="Tazar Al Ghaffar"
            className="w-48 h-48 md:w-52 md:h-52 rounded-3xl object-cover shadow-2xl border-4 border-white transform rotate-3"
          />
          <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white p-2 rounded-xl shadow-lg">
            <Code size={20} />
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-neutral-900"
      >
        <Glitch as="span">{content.title}</Glitch> <span className="text-indigo-600"><Glitch>Al Ghaffar</Glitch></span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 text-neutral-500 mb-8"
      >
        <div className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-sm">
          <MapPin size={16} />
          <Glitch className="text-sm">{content.roles[0]}</Glitch>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-sm">
          <GraduationCap size={16} />
          <Glitch className="text-sm">{content.roles[1]}</Glitch>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-sm">
          <Video size={16} />
          <Glitch className="text-sm">{content.roles[2]}</Glitch>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed"
      >
        {content.desc.split(' ').map((word, i, arr) => (
          <React.Fragment key={i}>
            <Glitch>{word}</Glitch>
            {i < arr.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </motion.p>
    </section>
  );
};

const About = ({ lang }: { lang: Language }) => {
  const content = T[lang].about;
  const sections = T[lang].sections;
  return (
    <section id="about" className="section-padding bg-white border-y border-neutral-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
            <User className="text-indigo-600" /> <Glitch className="text-neutral-900 font-bold">{content.title}</Glitch>
          </h2>
          <div className="space-y-4 text-neutral-600 leading-relaxed">
            <p>
              <Glitch className="font-bold text-neutral-900">{content.p1.split(' ')[0]}</Glitch>{' '}
              {content.p1.split(' ').slice(1).map((w, i, arr) => (
                <React.Fragment key={i}>
                  <Glitch>{w}</Glitch>
                  {i < arr.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </p>
            <p>
              {content.p2.split(' ').map((w, i, arr) => (
                <React.Fragment key={i}>
                  <Glitch>{w}</Glitch>
                  {i < arr.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
            </p>
            <div className="pt-4 flex gap-4">
              <div className="bg-neutral-50 p-4 rounded-2xl flex-1 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1"><Glitch>{content.passion}</Glitch></h4>
                <p className="text-sm"><Glitch>Web, Mobile & AI</Glitch></p>
              </div>
              <div className="bg-neutral-50 p-4 rounded-2xl flex-1 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1"><Glitch>{content.creative}</Glitch></h4>
                <p className="text-sm"><Glitch>Cinematography & Motion</Glitch></p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <h3 className="font-display font-semibold text-xl text-neutral-900">{sections.education}</h3>
          {EDUCATION(lang).map((edu, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 5 }}
              className="flex gap-4 items-start p-4 bg-neutral-50 rounded-2xl border border-neutral-200"
            >
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <GraduationCap className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 uppercase tracking-tight"><Glitch>{edu.school}</Glitch></h4>
                <p className="text-sm text-neutral-600 font-medium"><Glitch>{edu.major}</Glitch></p>
                <p className="text-xs text-indigo-500 mt-1 uppercase font-black tracking-widest"><Glitch>{edu.year}</Glitch></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Timeline = ({ lang }: { lang: Language }) => {
  const sections = T[lang].sections;
  return (
    <section id="experience" className="section-padding max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-neutral-900">
      <div>
        <h2 className="font-display text-3xl font-bold mb-10 flex items-center gap-3">
          <Briefcase className="text-indigo-600" /> <Glitch className="text-neutral-900 font-bold">{sections.work}</Glitch>
        </h2>
        <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-neutral-200">
          {EXPERIENCES(lang).map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-14"
            >
              <div className="absolute left-4 top-1 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white ring-2 ring-indigo-100" />
              <h4 className="font-bold text-xl"><Glitch className="font-bold text-neutral-900">{exp.role}</Glitch></h4>
              <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold mb-2">
                <Glitch className="font-bold text-indigo-600">{exp.company}</Glitch>
                <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                <Glitch className="font-bold text-indigo-600">{exp.period}</Glitch>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {exp.description.split(' ').map((w, i, arr) => (
                  <React.Fragment key={i}>
                    <Glitch>{w}</Glitch>
                    {i < arr.length - 1 ? ' ' : ''}
                  </React.Fragment>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-3xl font-bold mb-10 flex items-center gap-3">
          <Award className="text-indigo-600" /> <Glitch className="text-neutral-900 font-bold">{sections.certs}</Glitch>
        </h2>
        <div className="grid gap-4">
          {CERTIFICATIONS(lang).map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 bg-white rounded-xl border border-neutral-200 shadow-sm flex items-center gap-4 group hover:border-indigo-200 transition-colors"
            >
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Award size={18} />
              </div>
              <span className="text-sm font-medium text-neutral-700"><Glitch>{cert}</Glitch></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ lang }: { lang: Language }) => {
  const sections = T[lang].sections;
  return (
    <section id="projects" className="section-padding bg-white border-y border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4 text-neutral-900">{sections.selected}</h2>
            <p className="text-neutral-500 max-w-md">{sections.selectedDesc}</p>
          </div>
          <div className="h-px bg-neutral-200 flex-1 hidden md:block mx-12 mb-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-200"
            >
              <div className="aspect-video bg-neutral-200 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                  {proj.category}
                </div>
                <img
                  src={idx === 0 ? 'aset/fotoweb.png' : idx === 1 ? 'aset/mobile.png' : idx === 2 ? 'aset/thumb1.png' : ''}
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-neutral-900"><Glitch className="font-bold text-neutral-900">{proj.title}</Glitch></h3>
                <p className="text-sm text-neutral-500 mb-6 line-clamp-2">
                  {proj.description.split(' ').map((w, i, arr) => (
                    <React.Fragment key={i}>
                      <Glitch>{w}</Glitch>
                      {i < arr.length - 1 ? ' ' : ''}
                    </React.Fragment>
                  ))}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold text-neutral-600 bg-white px-2 py-1 rounded-full border border-neutral-200">
                      <Glitch>{tag}</Glitch>
                    </span>
                  ))}
                </div>
                <a href={proj.link} className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:opacity-80 transition-opacity">
                  View Details <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const content = T[lang].contact;
  const sections = T[lang].sections;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("papatazar@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display text-4xl font-bold mb-8 italic">
            <Glitch className="text-indigo-600 underline font-bold" as="span">{sections.contactTitle}</Glitch>
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-4 bg-white border border-neutral-200 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Mail />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{content.email}</p>
                <button
                  onClick={copyEmail}
                  className="text-lg font-semibold hover:text-indigo-600 transition-colors flex items-center gap-2"
                >
                  papatazar@gmail.com
                  {copied && <span className="text-xs text-green-500 font-bold">{content.copied}</span>}
                </button>
              </div>
            </div>

            <a
              href="https://wa.me/085198507385"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-4 group"
            >
              <div className="p-4 bg-white border border-neutral-200 rounded-2xl group-hover:bg-green-500 group-hover:text-white transition-all shadow-sm">
                <Phone />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{content.phone}</p>
                <p className="text-lg font-semibold hover:text-green-500 transition-colors">0851-9850-7385</p>
              </div>
            </a>
          </div>

          <div className="mt-12 flex gap-4">
            {[
              { Icon: Linkedin, href: "#" },
              { Icon: Github, href: "https://github.com/Tazarag" },
              { Icon: Instagram, href: "https://instagram.com/tazarag_" }
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel={href !== "#" ? "noopener noreferrer" : undefined}
                className="p-3 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-all text-neutral-700"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl">
          <form action="https://formsubmit.co/papatazar@gmail.com" method="POST" className="space-y-5">
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500 ml-1">{content.name}</label>
                <input type="text" name="name" required placeholder="Your Name" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-500 ml-1">{content.email}</label>
                <input type="email" name="email" required placeholder="email@example.com" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-neutral-500 ml-1">{content.msgLabel}</label>
              <textarea name="message" required rows={4} placeholder={content.msgPlaceholder} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
              {content.send} <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const content = T[lang].nav;
  return (
    <footer className="bg-white border-t border-neutral-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="h-48 rounded-2xl overflow-hidden bg-neutral-100 hover:ring-4 hover:ring-indigo-100 transition-all cursor-pointer">
            <img src="aset/footer1.jpg" className="w-full h-full object-cover object-[center_30%] opacity-80" alt="Project space 1" />
          </div>
          <div className="h-48 rounded-2xl overflow-hidden bg-neutral-100 hover:ring-4 hover:ring-indigo-100 transition-all cursor-pointer">
            <img src="aset/footer3.jpg" className="w-full h-full object-cover object-[center_60%] opacity-80" alt="Project space 2" />
          </div>
          <div className="h-48 rounded-2xl overflow-hidden bg-neutral-100 hover:ring-4 hover:ring-indigo-100 transition-all cursor-pointer">
            <img src="aset/footer2.jpg" className="w-full h-full object-cover object-[center_70%] opacity-80" alt="Project space 3" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-neutral-100 pt-8">
          <span className="font-display font-bold text-neutral-400"><Glitch>© 2024 Tazar Al Ghaffar</Glitch></span>
          <div className="flex gap-8 text-sm font-medium text-neutral-500">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-neutral-900 transition-all cursor-pointer outline-none"
            >
              <Glitch>{content.home}</Glitch>
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-neutral-900 transition-all cursor-pointer outline-none"
            >
              <Glitch>{content.about}</Glitch>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="font-sans min-h-screen bg-[#FFF3D7] text-neutral-900 transition-colors duration-300">
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Timeline lang={lang} />
        <Portfolio lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
