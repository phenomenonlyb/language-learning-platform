import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globe, BookOpen, Mic, Headphones, Award, Users, ArrowRight, Star } from 'lucide-react'
import useStore from '../store/useStore'

const Home = () => {
  const { targetLanguage, setTargetLanguage, userProgress } = useStore()
  const [selectedLevel, setSelectedLevel] = useState('beginner')

  const languages = [
    { code: 'en', name: '英语', flag: '🇬🇧', icon: '🇬🇧', color: 'from-blue-500 to-blue-700' },
    { code: 'ja', name: '日语', flag: '🇯🇵', icon: '🇯🇵', color: 'from-pink-500 to-pink-700' },
    { code: 'ko', name: '韩语', flag: '🇰🇷', icon: '🇰🇷', color: 'from-purple-500 to-purple-700' },
  ]

  const learningModules = [
    { icon: BookOpen, title: '单词记忆', desc: '闪卡式记忆，高效背词', color: 'bg-indigo-500', path: '/learn/words' },
    { icon: Mic, title: '口语跟读', desc: 'AI评测，发音打分', color: 'bg-emerald-500', path: '/learn/speaking' },
    { icon: Headphones, title: '听力训练', desc: '情境听力，沉浸学习', color: 'bg-amber-500', path: '/learn/listening' },
    { icon: BookOpen, title: '语法练习', desc: '即时反馈，稳步提升', color: 'bg-rose-500', path: '/learn/grammar' },
  ]

  const recommendedCourses = [
    { id: '1', title: '英语日常会话', level: '初级', lessons: 24, rating: 4.8, students: 12500 },
    { id: '2', title: '日语N5备考', level: '入门', lessons: 36, rating: 4.9, students: 8900 },
    { id: '3', title: '韩语发音入门', level: '零基础', lessons: 18, rating: 4.7, students: 6200 },
  ]

  const dailyGoal = userProgress?.dailyGoal || 30
  const todayProgress = userProgress?.todayMinutes || 15

  return (
    <div className="space-y-12 pb-20 md:pb-0">
      <section className="relative overflow-hidden rounded-3xl gradient-primary text-white py-16 px-8">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <Globe
              key={i}
              className="absolute text-white animate-float language-icon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${20 + Math.random() * 30}px`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold font-display">
            开启你的语言学习之旅
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            选择你想学习的语言，开启沉浸式学习体验
          </p>

          <div className="flex justify-center gap-6 mt-8">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setTargetLanguage(lang.code)}
                className={`group relative px-8 py-6 rounded-2xl transition-all duration-300 ${
                  targetLanguage === lang.code
                    ? 'bg-white shadow-2xl scale-110'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <div className={`text-6xl mb-2 transition-transform ${targetLanguage === lang.code ? 'bg-gradient-to-br ' + lang.color + ' rounded-xl p-2' : 'group-hover:scale-110'}`}>
                  {lang.icon}
                </div>
                <div className={`font-semibold ${targetLanguage === lang.code ? 'text-indigo-600' : 'text-white'}`}>
                  {lang.name}
                </div>
                {targetLanguage === lang.code && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            开始学习 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">今日学习目标</h2>
          <span className="text-indigo-600 font-semibold">{todayProgress}/{dailyGoal} 分钟</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((todayProgress / dailyGoal) * 100, 100)}%` }}
          />
        </div>
        <p className="mt-4 text-gray-600">
          {todayProgress >= dailyGoal
            ? '🎉 恭喜完成今日目标！'
            : `再坚持 ${dailyGoal - todayProgress} 分钟就能达成目标啦！`}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">学习模块</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningModules.map((module) => (
            <Link
              key={module.title}
              to={module.path}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 card-hover"
            >
              <div className={`${module.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <module.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{module.title}</h3>
              <p className="text-gray-600">{module.desc}</p>
              <div className="mt-4 text-indigo-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                开始学习 <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">为你推荐</h2>
          <Link to="/courses" className="text-indigo-600 font-medium hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${languages.find(l => course.title.includes(l.name))?.color || 'from-indigo-500 to-purple-600'} flex items-center justify-center`}>
                <BookOpen className="w-16 h-16 text-white opacity-80" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                  <span className="text-sm text-gray-500">{course.lessons} 课时</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
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
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-6">
          <Award className="w-16 h-16 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-2">成就系统</h2>
            <p className="opacity-90">
              完成学习任务，解锁专属徽章。连续学习天数越多，徽章越稀有！
            </p>
          </div>
          <Link
            to="/progress"
            className="ml-auto px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            查看成就
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
