import { Link } from 'react-router-dom'
import { Award, Trophy, Flame, BookOpen, Clock, Target, Star, TrendingUp } from 'lucide-react'
import useStore from '../store/useStore'

const Progress = () => {
  const { userProgress } = useStore()

  const achievements = [
    { id: '1', name: '初次入门', icon: '🎯', unlocked: true, description: '完成第一课学习' },
    { id: '2', name: '单词达人', icon: '📚', unlocked: true, description: '学习100个单词' },
    { id: '3', name: '连续7天', icon: '🔥', unlocked: true, description: '连续学习7天' },
    { id: '4', name: '口语新星', icon: '⭐', unlocked: false, description: '完成10次口语练习' },
    { id: '5', name: '听力大师', icon: '🎧', unlocked: false, description: '完成20次听力练习' },
    { id: '6', name: '学习达人', icon: '🏆', unlocked: false, description: '学习总时长超过100小时' },
  ]

  const weeklyData = [
    { day: '周一', minutes: 45 },
    { day: '周二', minutes: 30 },
    { day: '周三', minutes: 60 },
    { day: '周四', minutes: 25 },
    { day: '周五', minutes: 50 },
    { day: '周六', minutes: 40 },
    { day: '周日', minutes: 15 },
  ]

  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes))

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 font-display">学习进度</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full">
          <Flame className="w-5 h-5" />
          <span className="font-bold">{userProgress?.streak || 7} 天连续学习</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">今日学习</p>
              <p className="text-2xl font-bold text-gray-800">{userProgress?.todayMinutes || 15} 分钟</p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${((userProgress?.todayMinutes || 15) / (userProgress?.dailyGoal || 30)) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">目标: {userProgress?.dailyGoal || 30} 分钟</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">已学单词</p>
              <p className="text-2xl font-bold text-gray-800">{userProgress?.totalWords || 245}</p>
            </div>
          </div>
          <p className="text-sm text-emerald-600">较上周 +23</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">完成练习</p>
              <p className="text-2xl font-bold text-gray-800">{userProgress?.totalExercises || 128}</p>
            </div>
          </div>
          <p className="text-sm text-amber-600">正确率 87%</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">完成课程</p>
              <p className="text-2xl font-bold text-gray-800">{userProgress?.coursesCompleted || 3}</p>
            </div>
          </div>
          <p className="text-sm text-purple-600">进行中 2 课程</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">本周学习趋势</h2>
        <div className="flex items-end justify-between gap-4 h-48">
          {weeklyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-lg overflow-hidden flex items-end" style={{ height: '120px' }}>
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(data.minutes / maxMinutes) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{data.day}</span>
              <span className="text-xs text-gray-400">{data.minutes}分钟</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-600" />
          成就徽章
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white rounded-2xl shadow-lg p-6 text-center transition-all ${
                achievement.unlocked
                  ? 'achievement-badge cursor-pointer'
                  : 'opacity-50 grayscale'
              }`}
            >
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{achievement.name}</h3>
              <p className="text-xs text-gray-500">{achievement.description}</p>
              {achievement.unlocked && (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-medium">
                    <Trophy className="w-3 h-3" /> 已获得
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="text-6xl">🏆</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">学习排行榜</h2>
            <p className="opacity-90">你目前排名第 42 位，继续加油！</p>
          </div>
          <Link
            to="/community"
            className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            查看榜单
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Progress
