import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Settings, BookOpen, Award, Clock, LogOut, ChevronRight, Bell, Shield, Moon } from 'lucide-react'
import useStore from '../store/useStore'

const Profile = () => {
  const { user, userProgress, logout } = useStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '学习概览', icon: BookOpen },
    { id: 'achievements', label: '我的成就', icon: Award },
    { id: 'settings', label: '设置', icon: Settings },
  ]

  const recentCourses = [
    { id: '1', title: '英语日常会话', progress: 75, lastStudy: '今天 14:30' },
    { id: '2', title: '日语N5备考', progress: 45, lastStudy: '昨天 20:15' },
    { id: '3', title: '韩语发音入门', progress: 30, lastStudy: '3天前' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">登录后查看更多信息</h2>
          <p className="text-gray-600 mb-8">登录语言星球，开启你的学习之旅</p>
          <div className="space-y-3">
            <Link
              to="/auth"
              className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              登录
            </Link>
            <Link
              to="/auth/register"
              className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              注册
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-5xl text-white shadow-xl">
              👤
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  等级 {user.level}
                </span>
                <span className="text-sm text-gray-500">
                  学习 {user.streak} 天
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> 退出
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">
            {userProgress?.todayMinutes || 15}
          </p>
          <p className="text-gray-500">今日学习(分钟)</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">
            {userProgress?.totalWords || 245}
          </p>
          <p className="text-gray-500">已学单词</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-1">
            {userProgress?.achievements?.length || 2}
          </p>
          <p className="text-gray-500">获得成就</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-4">最近学习</h3>
              {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.lastStudy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-indigo-600 font-semibold">{course.progress}%</p>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userProgress?.achievements?.map((achievement) => (
                <div key={achievement.id} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-5xl mb-3">{achievement.icon}</div>
                  <h4 className="font-medium text-gray-800">{achievement.name}</h4>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">学习提醒</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">深色模式</span>
                </div>
                <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">隐私设置</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
