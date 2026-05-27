import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Star, Users, Clock, Play, CheckCircle } from 'lucide-react'

const CourseDetail = () => {
  const { id } = useParams()

  const courseData = {
    '1': {
      title: '英语日常会话',
      description: '涵盖日常生活各个场景，从问候、购物、旅行到工作交流，让你全面掌握英语会话技能。课程采用情景对话模式，模拟真实交流环境。',
      language: 'en',
      level: 'beginner',
      lessons: 24,
      rating: 4.8,
      students: 12500,
      duration: '12小时',
      teacher: 'Emily Chen',
      modules: [
        { id: 1, title: '问候与介绍', lessons: 4, completed: true },
        { id: 2, title: '购物与餐饮', lessons: 6, completed: true },
        { id: 3, title: '交通与出行', lessons: 5, completed: false },
        { id: 4, title: '工作与职场', lessons: 6, completed: false },
        { id: 5, title: '休闲娱乐', lessons: 3, completed: false },
      ],
    },
    '2': {
      title: '日语N5备考冲刺',
      description: '针对JLPT N5考试，词汇语法全面覆盖，历年真题精讲，配合大量练习，助你顺利通过N5考试。',
      language: 'ja',
      level: 'elementary',
      lessons: 36,
      rating: 4.9,
      students: 8900,
      duration: '20小时',
      teacher: '田中太郎',
      modules: [
        { id: 1, title: '五十音图', lessons: 6, completed: true },
        { id: 2, title: '基础语法', lessons: 8, completed: false },
        { id: 3, title: '核心词汇', lessons: 10, completed: false },
        { id: 4, title: '阅读理解', lessons: 6, completed: false },
        { id: 5, title: '真题演练', lessons: 6, completed: false },
      ],
    },
    '3': {
      title: '韩语发音入门',
      description: '从零开始掌握韩语40音，发音纯正。详细讲解每个音的发音技巧，配合大量跟读练习。',
      language: 'ko',
      level: 'beginner',
      lessons: 18,
      rating: 4.7,
      students: 6200,
      duration: '8小时',
      teacher: '朴敏俊',
      modules: [
        { id: 1, title: '韩语简介', lessons: 2, completed: false },
        { id: 2, title: '元音学习', lessons: 6, completed: false },
        { id: 3, title: '辅音学习', lessons: 6, completed: false },
        { id: 4, title: '收音练习', lessons: 4, completed: false },
      ],
    },
  }

  const course = courseData[id as keyof typeof courseData] || courseData['1']

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <Link to="/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        返回课程列表
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className={`h-64 bg-gradient-to-br ${
          course.language === 'en' ? 'from-blue-500 to-blue-700' :
          course.language === 'ja' ? 'from-pink-500 to-pink-700' :
          'from-purple-500 to-purple-700'
        } flex items-center justify-center relative`}>
          <BookOpen className="w-32 h-32 text-white opacity-30" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
              <Play className="w-8 h-8 text-indigo-600 ml-1" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium">
              {course.level === 'beginner' ? '零基础' :
               course.level === 'elementary' ? '初级' : '中级'}
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" /> {course.duration}
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> {course.lessons} 课时
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-display">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b">
            <span className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">👤</div>
              {course.teacher}
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              {course.rating} 评分
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {course.students.toLocaleString()} 学生
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">课程章节</h2>
            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    module.completed
                      ? 'bg-emerald-50 border-2 border-emerald-200'
                      : 'bg-gray-50 hover:bg-indigo-50 cursor-pointer'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    module.completed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {module.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{module.title}</h3>
                    <p className="text-sm text-gray-500">{module.lessons} 课时</p>
                  </div>
                  <Link
                    to="/learn/words"
                    className={`px-5 py-2 rounded-lg font-medium transition-all ${
                      module.completed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {module.completed ? '复习' : '开始学习'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
