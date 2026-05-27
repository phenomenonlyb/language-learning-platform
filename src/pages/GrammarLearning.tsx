import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Trophy, Volume2 } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const GrammarLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      question: 'She _____ to school every day.',
      options: ['go', 'goes', 'going', 'went'],
      correctAnswer: 1,
      explanation: '"She" 是第三人称单数，动词应该用第三人称单数形式 "goes"。'
    },
    {
      id: 2,
      question: 'I have been learning English _____ three years.',
      options: ['for', 'since', 'to', 'at'],
      correctAnswer: 0,
      explanation: '"for" 用于表示一段时间，three years 是一段时间，所以用 "for"。'
    },
    {
      id: 3,
      question: 'If I _____ rich, I would travel the world.',
      options: ['am', 'was', 'were', 'be'],
      correctAnswer: 2,
      explanation: '这是虚拟语气的用法，"if" 条件句中应该用 "were" 表示与现在事实相反的假设。'
    },
    {
      id: 4,
      question: 'The book _____ on the table is mine.',
      options: ['lies', 'lying', 'lay', 'lain'],
      correctAnswer: 1,
      explanation: '空格前有 "The book"，需要现在分词作定语，"lying" 是 "lie" 的现在分词形式。'
    },
    {
      id: 5,
      question: 'Neither the teacher nor the students _____ happy.',
      options: ['is', 'are', 'was', 'were'],
      correctAnswer: 1,
      explanation: '"neither...nor..." 遵循就近原则，students 是复数，所以用 "are"。'
    },
    {
      id: 6,
      question: 'I wish I _____ harder when I was young.',
      options: ['study', 'studied', 'had studied', 'would study'],
      correctAnswer: 2,
      explanation: '这是对过去的虚拟语气，"wish + 过去完成时" 表示对过去事实的后悔。'
    },
  ]

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setIsComplete(false)
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-display">
            {percentage >= 80 ? '太棒了！' : percentage >= 60 ? '做得不错！' : '继续加油！'}
          </h2>
          <div className="bg-indigo-50 rounded-xl p-6 mb-6">
            <p className="text-gray-600 mb-2">你的得分</p>
            <p className="text-5xl font-bold text-indigo-600">{score} / {questions.length}</p>
            <p className="text-xl text-indigo-600 mt-2">{percentage}%</p>
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
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              再练一次
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 font-display">语法练习</h1>
          <p className="text-gray-500">英语语法 · 第 {currentIndex + 1} / {questions.length} 题</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">得分</p>
          <p className="text-xl font-bold text-indigo-600">{score}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>进度</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center gap-3 '
              
              if (selectedAnswer !== null) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass += 'border-emerald-500 bg-emerald-50 text-emerald-700'
                } else if (index === selectedAnswer) {
                  buttonClass += 'border-rose-500 bg-rose-50 text-rose-700'
                } else {
                  buttonClass += 'border-gray-200 bg-gray-50 text-gray-500'
                }
              } else {
                buttonClass += 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {selectedAnswer !== null && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-6 h-6 ml-auto text-emerald-500" />
                  )}
                  {selectedAnswer !== null && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-6 h-6 ml-auto text-rose-500" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-indigo-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-indigo-800">解析</h3>
            </div>
            <p className="text-indigo-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            {currentIndex < questions.length - 1 ? '下一题' : '查看结果'}
          </button>
        )}
      </div>
    </div>
  )
}

export default GrammarLearning
