import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, BookOpen, Star, Users } from 'lucide-react'
import useStore from '../store/useStore'

const Courses = () => {
  const { targetLanguage } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState(targetLanguage || 'en')

  const languages = [
    { code: 'en', name: '英语', color: 'from-blue-500 to-blue-700' },
    { code: 'ja', name: '日语', color: 'from-pink-500 to-pink-700' },
    { code: 'ko', name: '韩语', color: 'from-purple-500 to-purple-700' },
  ]

  const levels = [
    { value: 'all', label: '全部级别' },
    { value: 'beginner', label: '零基础' },
    { value: 'elementary', label: '初级' },
    { value: 'intermediate', label: '中级' },
    { value: 'advanced', label: '高级' },
  ]

  const courses = [
    {
      id: '1',
      title: '英语日常会话',
      description: '涵盖日常生活各个场景，让你会说会用',
      language: 'en',
      level: 'beginner',
      lessons: 24,
      rating: 4.8,
      students: 12500,
      duration: '12小时',
      teacher: 'Emily Chen',
    },
    {
      id: '2',
      title: '日语N5备考冲刺',
      description: '针对JLPT N5考试，词汇语法全面覆盖',
      language: 'ja',
      level: 'elementary',
      lessons: 36,
      rating: 4.9,
      students: 8900,
      duration: '20小时',
      teacher: '田中太郎',
    },
    {
      id: '3',
      title: '韩语发音入门',
      description: '从零开始掌握韩语40音，发音纯正',
      language: 'ko',
      level: 'beginner',
      lessons: 18,
      rating: 4.7,
      students: 6200,
      duration: '8小时',
      teacher: '朴敏俊',
    },
    {
      id: '4',
      title: '英语商务写作',
      description: '职场商务邮件、报告撰写技巧',
      language: 'en',
      level: 'intermediate',
      lessons: 20,
      rating: 4.6,
      students: 5800,
      duration: '10小时',
      teacher: 'Michael Brown',
    },
    {
      id: '5',
      title: '日语动漫日语',
      description: '通过动漫学习日语，了解日本文化',
      language: 'ja',
      level: 'intermediate',
      lessons: 30,
      rating: 4.8,
      students: 15000,
      duration: '15小时',
      teacher: '佐藤美咲',
    },
    {
      id: '6',
      title: '韩语TOPIK备考',
      description: '韩语能力考试初级到中级备考课程',
      language: 'ko',
      level: 'intermediate',
      lessons: 40,
      rating: 4.9,
      students: 7800,
      duration: '25小时',
      teacher: '金秀贤',
    },
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage
    return matchesSearch && matchesLevel && matchesLanguage
  })

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-display">课程中心</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">全部语言</option>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {levels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedLanguage === lang.code
                  ? `bg-gradient-to-r ${lang.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const lang = languages.find(l => l.code === course.language)
          return (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover"
            >
              <div className={`h-48 bg-gradient-to-br ${lang?.color || 'from-indigo-500 to-purple-600'} flex items-center justify-center relative overflow-hidden`}>
                <BookOpen className="w-20 h-20 text-white opacity-80" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  {levels.find(l => l.value === course.level)?.label}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{lang?.name === '英语' ? '🇬🇧' : lang?.name === '日语' ? '🇯🇵' : '🇰🇷'}</span>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.lessons} 课时
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">没有找到相关课程</p>
          <p className="text-gray-400">试试调整筛选条件</p>
        </div>
      )}
    </div>
  )
}

export default Courses
