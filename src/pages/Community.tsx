import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ThumbsUp, Eye, Search, TrendingUp, Users, Clock } from 'lucide-react'

interface Post {
  id: number
  title: string
  content: string
  author: string
  avatar: string
  likes: number
  views: number
  comments: number
  createdAt: string
  topic: string
}

const Community = () => {
  const [selectedTopic, setSelectedTopic] = useState('all')

  const topics = [
    { id: 'all', name: '全部', icon: '📚' },
    { id: 'english', name: '英语学习', icon: '🇬🇧' },
    { id: 'japanese', name: '日语学习', icon: '🇯🇵' },
    { id: 'korean', name: '韩语学习', icon: '🇰🇷' },
    { id: 'share', name: '学习分享', icon: '💡' },
    { id: 'question', name: '问答求助', icon: '❓' },
  ]

  const posts: Post[] = [
    {
      id: 1,
      title: '坚持学习英语100天的感受分享',
      content: '从完全不会英语到现在能够进行日常对话，这个过程虽然艰辛但收获满满...',
      author: '英语爱好者',
      avatar: '👤',
      likes: 256,
      views: 1520,
      comments: 42,
      createdAt: '2小时前',
      topic: 'english',
    },
    {
      id: 2,
      title: 'JLPT N2 备考经验分享',
      content: '分享一下我的备考计划和一些心得体会，希望能帮助到大家...',
      author: '日语达人',
      avatar: '👤',
      likes: 189,
      views: 980,
      comments: 35,
      createdAt: '5小时前',
      topic: 'japanese',
    },
    {
      id: 3,
      title: '韩语发音技巧总结',
      content: '很多同学在学习韩语发音时都会遇到困难，我来总结一下我的学习方法...',
      author: '韩语小白',
      avatar: '👤',
      likes: 142,
      views: 756,
      comments: 28,
      createdAt: '1天前',
      topic: 'korean',
    },
    {
      id: 4,
      title: '如何克服语言学习瓶颈期',
      content: '相信很多人都遇到过学习到一定程度后进步缓慢的情况，来聊聊我的经验...',
      author: '学习导师',
      avatar: '👤',
      likes: 324,
      views: 2100,
      comments: 56,
      createdAt: '1天前',
      topic: 'share',
    },
    {
      id: 5,
      title: '这个语法点怎么理解？',
      content: '请教一下各位，关于虚拟语气的用法我总是混淆，有没有好的方法...',
      author: '求助者',
      avatar: '👤',
      likes: 23,
      views: 145,
      comments: 18,
      createdAt: '2天前',
      topic: 'question',
    },
  ]

  const filteredPosts = selectedTopic === 'all'
    ? posts
    : posts.filter(post => post.topic === selectedTopic)

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 font-display">学习社区</h1>
        <Link
          to="/auth/register"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          发布帖子
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-6">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`px-5 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedTopic === topic.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{topic.icon}</span>
              {topic.name}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索帖子..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 card-hover cursor-pointer hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {topics.find(t => t.id === post.topic)?.name}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {post.createdAt}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {post.views}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="text-6xl">👥</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">加入学习小组</h2>
            <p className="opacity-90">和志同道合的学习伙伴一起进步，相互鼓励</p>
          </div>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
            <Users className="w-5 h-5" /> 加入小组
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          热门话题
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['#英语学习方法', '#日语N2备考', '#韩语发音技巧', '#口语练习'].map((tag, index) => (
            <div
              key={index}
              className="px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community
