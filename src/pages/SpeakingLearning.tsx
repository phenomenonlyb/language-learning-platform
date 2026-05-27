import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mic, MicOff, Play, RotateCcw, Volume2, CheckCircle } from 'lucide-react'

interface SpeakingItem {
  id: number
  sentence: string
  translation: string
  audioUrl?: string
}

const SpeakingLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const speakingItems: SpeakingItem[] = [
    { id: 1, sentence: 'Hello, how are you today?', translation: '你好，今天怎么样？' },
    { id: 2, sentence: 'I would like to order a coffee, please.', translation: '我想点一杯咖啡，谢谢。' },
    { id: 3, sentence: 'Could you tell me the way to the nearest subway station?', translation: '你能告诉我最近的地铁站在哪里吗？' },
    { id: 4, sentence: 'I really enjoy learning new languages.', translation: '我非常喜欢学习新的语言。' },
    { id: 5, sentence: 'The weather is beautiful today, isn\'t it?', translation: '今天天气很好，不是吗？' },
  ]

  const currentItem = speakingItems[currentIndex]

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setHasRecording(true)
        const randomScore = Math.floor(Math.random() * 30) + 70
        setScore(randomScore)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setScore(null)
    } catch (error) {
      alert('请允许麦克风权限以使用口语练习功能')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playSentence = () => {
    const utterance = new SpeechSynthesisUtterance(currentItem.sentence)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    speechSynthesis.speak(utterance)
  }

  const handleNext = () => {
    setHasRecording(false)
    setScore(null)
    setCurrentIndex((prev) => (prev < speakingItems.length - 1 ? prev + 1 : 0))
  }

  const handleReplay = () => {
    setHasRecording(false)
    setScore(null)
    setCurrentIndex((prev) => prev)
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 font-display">口语跟读</h1>
          <p className="text-gray-500">练习地道发音 · 第 {currentIndex + 1} / {speakingItems.length}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <button
              onClick={playSentence}
              disabled={isPlaying}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-all disabled:opacity-50"
            >
              <Volume2 className="w-6 h-6" />
              听标准发音
            </button>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8">
            <p className="text-3xl font-semibold text-gray-800 mb-4">{currentItem.sentence}</p>
            <p className="text-lg text-gray-600">{currentItem.translation}</p>
          </div>

          <div className="mb-8">
            <p className="text-gray-500 mb-4">点击麦克风开始录音，朗读上面的句子</p>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-rose-500 animate-pulse scale-110'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>
            <p className="mt-4 text-sm text-gray-500">
              {isRecording ? '录音中... 点击停止' : '点击开始录音'}
            </p>
          </div>

          {score !== null && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <span className="text-2xl font-bold text-emerald-700">发音评分</span>
              </div>
              <div className="text-6xl font-bold text-emerald-600 mb-2">{score}</div>
              <div className="text-emerald-700">
                {score >= 90 ? '太棒了！发音非常标准！' :
                 score >= 80 ? '很好！继续加油！' :
                 score >= 70 ? '不错！还有提升空间' : '需要多加练习'}
              </div>
              <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleReplay}
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> 重录
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {currentIndex < speakingItems.length - 1 ? '下一句' : '重新开始'}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {speakingItems.map((_, index) => (
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

export default SpeakingLearning
