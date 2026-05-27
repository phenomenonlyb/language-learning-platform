import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Play, Pause, Volume2, RotateCcw, CheckCircle } from 'lucide-react'

interface ListeningItem {
  id: number
  audio: string
  transcript: string
  question: string
  options: string[]
  answer: number
}

const ListeningLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const listeningItems: ListeningItem[] = [
    {
      id: 1,
      audio: '',
      transcript: 'Welcome to our language learning platform. Today we will learn about greetings.',
      question: 'What is the main topic of this audio?',
      options: ['Greetings', 'Food', 'Travel', 'Shopping'],
      answer: 0,
    },
    {
      id: 2,
      audio: '',
      transcript: 'The weather is beautiful today. I think we should go outside and enjoy the sunshine.',
      question: 'What does the speaker suggest?',
      options: ['Stay home', 'Go outside', 'Study English', 'Watch a movie'],
      answer: 1,
    },
    {
      id: 3,
      audio: '',
      transcript: 'My favorite subject is mathematics. I enjoy solving complex problems.',
      question: 'What is the speaker\'s favorite subject?',
      options: ['English', 'Science', 'Mathematics', 'History'],
      answer: 2,
    },
  ]

  const currentItem = listeningItems[currentIndex]

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        speechSynthesis.cancel()
      } else {
        const utterance = new SpeechSynthesisUtterance(currentItem.transcript)
        utterance.lang = 'en-US'
        utterance.rate = 0.8
        utterance.onstart = () => setIsPlaying(true)
        utterance.onend = () => setIsPlaying(false)
        speechSynthesis.speak(utterance)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAnswerSelect = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    setShowResult(true)
    if (selectedAnswer === currentItem.answer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < listeningItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsPlaying(false)
      speechSynthesis.cancel()
    } else {
      setIsComplete(true)
    }
  }

  const handleReplay = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsPlaying(false)
    speechSynthesis.cancel()
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 pb-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-8xl mb-6">🎧</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-display">听力练习完成！</h2>
          <div className="bg-indigo-50 rounded-xl p-6 mb-6">
            <p className="text-gray-600 mb-2">你的得分</p>
            <p className="text-5xl font-bold text-indigo-600">{score} / {listeningItems.length}</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/"
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              返回首页
            </Link>
            <button
              onClick={() => {
                setCurrentIndex(0)
                setScore(0)
                setIsComplete(false)
                setSelectedAnswer(null)
                setShowResult(false)
              }}
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
          <h1 className="text-2xl font-bold text-gray-800 font-display">听力训练</h1>
          <p className="text-gray-500">仔细聆听音频 · 第 {currentIndex + 1} / {listeningItems.length}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 text-center">
            <button
              onClick={handlePlay}
              className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center hover:shadow-xl transition-all hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </button>
            <p className="mt-6 text-gray-600">点击播放音频</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentItem.question}</h3>
            <div className="space-y-3">
              {currentItem.options.map((option, index) => {
                let buttonClass = 'w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center gap-3 '
                
                if (showResult) {
                  if (index === currentItem.answer) {
                    buttonClass += 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  } else if (index === selectedAnswer && index !== currentItem.answer) {
                    buttonClass += 'border-rose-500 bg-rose-50 text-rose-700'
                  } else {
                    buttonClass += 'border-gray-200 bg-gray-50 text-gray-500'
                  }
                } else {
                  buttonClass += selectedAnswer === index
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {showResult && index === currentItem.answer && (
                      <CheckCircle className="w-6 h-6 ml-auto text-emerald-500" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {showResult && (
            <div className="bg-indigo-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-indigo-600 font-semibold mb-2">听力原文</p>
              <p className="text-indigo-800">{currentItem.transcript}</p>
            </div>
          )}

          <div className="flex gap-4">
            {!showResult ? (
              <>
                <button
                  onClick={handleReplay}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> 重听
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  提交答案
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                {currentIndex < listeningItems.length - 1 ? '下一题' : '完成练习'}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {listeningItems.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-indigo-600 scale-125'
                  : index < currentIndex
                  ? 'bg-emerald-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListeningLearning
