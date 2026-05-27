import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Volume2, Heart, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import useStore from '../store/useStore'

interface Word {
  id: number
  word: string
  meaning: string
  pronunciation: string
  example: string
  known: boolean
}

const WordLearning = () => {
  const { targetLanguage, updateProgress } = useStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownWords, setKnownWords] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const words: Word[] = [
    { id: 1, word: 'Beautiful', meaning: '美丽的，漂亮的', pronunciation: '/ˈbjuːtɪfəl/', example: 'She has a beautiful smile.', known: false },
    { id: 2, word: 'Adventure', meaning: '冒险，冒险经历', pronunciation: '/ədˈventʃər/', example: 'Life is an adventure.', known: false },
    { id: 3, word: 'Courage', meaning: '勇气，胆量', pronunciation: '/ˈkʌrɪdʒ/', example: 'It takes courage to try new things.', known: false },
    { id: 4, word: 'Journey', meaning: '旅程，旅途', pronunciation: '/ˈdʒɜːrni/', example: 'The journey is more important than the destination.', known: false },
    { id: 5, word: 'Dream', meaning: '梦想，愿望', pronunciation: '/driːm/', example: 'Follow your dreams.', known: false },
    { id: 6, word: 'Wisdom', meaning: '智慧，才智', pronunciation: '/ˈwɪzdəm/', example: 'Wisdom comes from experience.', known: false },
    { id: 7, word: 'Happiness', meaning: '幸福，快乐', pronunciation: '/ˈhæpinəs/', example: 'Happiness is a choice.', known: false },
    { id: 8, word: 'Passion', meaning: '热情，激情', pronunciation: '/ˈpæʃən/', example: 'Follow your passion.', known: false },
  ]

  const currentWord = words[currentIndex]
  const accuracy = knownWords.length > 0 ? Math.round((knownWords.length / (currentIndex + 1)) * 100) : 0

  const handleKnown = () => {
    setKnownWords([...knownWords, currentWord.id])
    updateProgress({ totalWords: knownWords.length + 1 })
    nextWord()
  }

  const nextWord = () => {
    setIsFlipped(false)
    if (currentIndex < words.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownWords([])
    setShowResult(false)
  }

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word)
    utterance.lang = 'en-US'
    speechSynthesis.speak(utterance)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-display">学习完成！</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-indigo-50 rounded-xl p-4">
              <p className="text-gray-600 mb-2">本轮学习</p>
              <p className="text-4xl font-bold text-indigo-600">{words.length} 个单词</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-emerald-600 font-semibold">已掌握</p>
                <p className="text-2xl font-bold text-emerald-600">{knownWords.length}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-amber-600 font-semibold">还需巩固</p>
                <p className="text-2xl font-bold text-amber-600">{words.length - knownWords.length}</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-purple-600 font-semibold">正确率</p>
              <p className="text-4xl font-bold text-purple-600">{accuracy}%</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              返回首页
            </Link>
            <button
              onClick={handleRestart}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> 再学一遍
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 font-display">单词记忆</h1>
          <p className="text-gray-500">
            {targetLanguage === 'en' ? '英语' : targetLanguage === 'ja' ? '日语' : '韩语'} · 第 {currentIndex + 1} / {words.length}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">正确率</p>
          <p className="text-xl font-bold text-indigo-600">{accuracy}%</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div
          className={`word-card cursor-pointer ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="word-card-inner relative">
            <div className="word-card-front bg-white rounded-3xl shadow-xl p-12 min-h-[400px] flex flex-col items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  speakWord()
                }}
                className="absolute top-6 right-6 p-3 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors"
              >
                <Volume2 className="w-6 h-6 text-indigo-600" />
              </button>
              <p className="text-5xl font-bold text-gray-800 mb-4">{currentWord.word}</p>
              <p className="text-xl text-indigo-600 mb-2">{currentWord.pronunciation}</p>
              <p className="text-gray-500 mt-8">点击卡片查看释义</p>
            </div>

            <div className="word-card-back bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-12 min-h-[400px] flex flex-col items-center justify-center text-white">
              <p className="text-4xl font-bold mb-6">{currentWord.meaning}</p>
              <div className="bg-white/20 rounded-xl p-6 w-full">
                <p className="text-sm opacity-80 mb-2">例句</p>
                <p className="text-lg italic">{currentWord.example}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={nextWord}
            className="flex-1 py-4 bg-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="w-6 h-6" /> 不认识
          </button>
          <button
            onClick={handleKnown}
            className="flex-1 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-6 h-6" /> 认识
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {words.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-indigo-600 scale-125'
                  : index < currentIndex
                  ? knownWords.includes(words[index].id)
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WordLearning
