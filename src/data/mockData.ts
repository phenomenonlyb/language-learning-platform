export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: number;
  coverImage: string;
  chapters: number;
  duration: string;
}

export interface Word {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  example: string;
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface ListeningExercise {
  id: string;
  audioUrl: string;
  transcript: string;
  questions: string[];
  answers: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  nativeLanguage: string;
  targetLanguage: string;
  level: number;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedChapters: number;
  totalWordsLearned: number;
  totalTimeSpent: number;
  lastStudiedAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  topic: string;
  likes: number;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

export const levels = [
  { level: 1, name: 'Beginner', description: '入门级', color: 'green' },
  { level: 2, name: 'Elementary', description: '初级', color: 'blue' },
  { level: 3, name: 'Intermediate', description: '中级', color: 'yellow' },
  { level: 4, name: 'Upper-Intermediate', description: '中高级', color: 'orange' },
  { level: 5, name: 'Advanced', description: '高级', color: 'red' },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'English for Beginners',
    description: 'Learn basic English vocabulary and grammar with interactive lessons.',
    language: 'en',
    level: 1,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=English%20language%20learning%20concept%20with%20books%20and%20globe&image_size=landscape_16_9',
    chapters: 12,
    duration: '40 hours',
  },
  {
    id: '2',
    title: 'Japanese Basics',
    description: 'Master Hiragana, Katakana, and basic Japanese phrases.',
    language: 'ja',
    level: 1,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20language%20learning%20with%20kanji%20characters&image_size=landscape_16_9',
    chapters: 15,
    duration: '50 hours',
  },
  {
    id: '3',
    title: 'Korean for Beginners',
    description: 'Learn Hangul and basic Korean conversation skills.',
    language: 'ko',
    level: 1,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Korean%20language%20learning%20with%20hangul%20letters&image_size=landscape_16_9',
    chapters: 10,
    duration: '35 hours',
  },
  {
    id: '4',
    title: 'English Intermediate',
    description: 'Build on your foundation with more advanced grammar and vocabulary.',
    language: 'en',
    level: 3,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20English%20learning%20with%20books%20and%20notebook&image_size=landscape_16_9',
    chapters: 18,
    duration: '60 hours',
  },
  {
    id: '5',
    title: 'Japanese N5 Preparation',
    description: 'Prepare for the JLPT N5 exam with comprehensive practice.',
    language: 'ja',
    level: 2,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=JLPT%20exam%20preparation%20Japanese%20study%20materials&image_size=landscape_16_9',
    chapters: 20,
    duration: '70 hours',
  },
  {
    id: '6',
    title: 'Korean TOPIK Level 1',
    description: 'Prepare for TOPIK Level 1 with structured lessons.',
    language: 'ko',
    level: 2,
    coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=TOPIK%20Korean%20exam%20preparation%20study%20desk&image_size=landscape_16_9',
    chapters: 16,
    duration: '55 hours',
  },
];

export const words: Record<string, Word[]> = {
  en: [
    { id: '1', word: 'apple', meaning: '苹果', pronunciation: '/ˈæp.əl/', example: 'I eat an apple every day.' },
    { id: '2', word: 'beautiful', meaning: '美丽的', pronunciation: '/ˈbjuː.tɪ.fəl/', example: 'What a beautiful day!' },
    { id: '3', word: 'computer', meaning: '电脑', pronunciation: '/kəmˈpjuː.tər/', example: 'I work on my computer.' },
    { id: '4', word: 'delicious', meaning: '美味的', pronunciation: '/dɪˈlɪʃ.əs/', example: 'This cake is delicious.' },
    { id: '5', word: 'elephant', meaning: '大象', pronunciation: '/ˈel.ɪ.fənt/', example: 'The elephant is huge.' },
    { id: '6', word: 'friend', meaning: '朋友', pronunciation: '/frend/', example: 'She is my best friend.' },
    { id: '7', word: 'garden', meaning: '花园', pronunciation: '/ˈɡɑː.dən/', example: 'We have flowers in the garden.' },
    { id: '8', word: 'happiness', meaning: '幸福', pronunciation: '/ˈhæp.i.nəs/', example: 'Money cannot buy happiness.' },
  ],
  ja: [
    { id: '1', word: 'こんにちは', meaning: '你好', pronunciation: 'konnichiwa', example: 'こんにちは、元気ですか？' },
    { id: '2', word: 'ありがとう', meaning: '谢谢', pronunciation: 'arigatou', example: 'ありがとうございます' },
    { id: '3', word: 'すみません', meaning: '对不起/打扰一下', pronunciation: 'sumimasen', example: 'すみません、トイレはどこですか？' },
    { id: '4', word: '食べる', meaning: '吃', pronunciation: 'taberu', example: 'ご飯を食べる' },
    { id: '5', word: '飲む', meaning: '喝', pronunciation: 'nomu', example: 'コーヒーを飲む' },
    { id: '6', word: '行く', meaning: '去', pronunciation: 'iku', example: '学校に行く' },
    { id: '7', word: '見る', meaning: '看', pronunciation: 'miru', example: 'テレビを見る' },
    { id: '8', word: '話す', meaning: '说', pronunciation: 'hanasu', example: '日本語を話す' },
  ],
  ko: [
    { id: '1', word: '안녕하세요', meaning: '你好', pronunciation: 'annyeonghaseyo', example: '안녕하세요! 잘 지냈어요?' },
    { id: '2', word: '감사합니다', meaning: '谢谢', pronunciation: 'gamsahamnida', example: '도와주셔서 감사합니다' },
    { id: '3', word: '죄송합니다', meaning: '对不起', pronunciation: 'joesonghamnida', example: '지각해서 죄송합니다' },
    { id: '4', word: '먹다', meaning: '吃', pronunciation: 'meokda', example: '밥을 먹다' },
    { id: '5', word: '마시다', meaning: '喝', pronunciation: 'masida', example: '커피를 마시다' },
    { id: '6', word: '가다', meaning: '去', pronunciation: 'gada', example: '학교에 가다' },
    { id: '7', word: '보다', meaning: '看', pronunciation: 'boda', example: '텔레비전을 보다' },
    { id: '8', word: '말하다', meaning: '说', pronunciation: 'malhada', example: '한국어를 말하다' },
  ],
};

export const grammarExercises: Record<string, GrammarExercise[]> = {
  en: [
    {
      id: '1',
      question: 'She ___ to school every day.',
      options: ['go', 'goes', 'going', 'went'],
      answer: 'goes',
      explanation: 'Use present simple tense for habits. Subject "she" takes verb + s/es.',
    },
    {
      id: '2',
      question: 'I have been learning English ___ 3 years.',
      options: ['since', 'for', 'in', 'during'],
      answer: 'for',
      explanation: '"For" is used with a period of time (3 years). "Since" is used with a specific point in time.',
    },
    {
      id: '3',
      question: 'If I ___ rich, I would travel the world.',
      options: ['am', 'was', 'were', 'be'],
      answer: 'were',
      explanation: 'In conditional sentences (second conditional), use "were" for all subjects.',
    },
    {
      id: '4',
      question: 'The book ___ by many students.',
      options: ['reads', 'read', 'is read', 'reading'],
      answer: 'is read',
      explanation: 'Passive voice: subject + be + past participle.',
    },
  ],
  ja: [
    {
      id: '1',
      question: '私は毎日コー