import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, BarChart3, Users, User, GraduationCap } from 'lucide-react'

const Layout = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/courses', icon: BookOpen, label: '课程' },
    { path: '/progress', icon: BarChart3, label: '进度' },
    { path: '/community', icon: Users, label: '社区' },
    { path: '/profile', icon: User, label: '我的' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-display">
                语言星球
              </span>
            </Link>

            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                登录
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around py-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 ${
                location.pathname === item.path ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Layout
