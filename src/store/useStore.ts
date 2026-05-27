import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  targetLanguage: string
  level: number
  streak: number
}

interface UserProgress {
  dailyGoal: number
  todayMinutes: number
  totalWords: number
  totalExercises: number
  coursesCompleted: number
  streak: number
  achievements: Achievement[]
}

interface Achievement {
  id: string
  name: string
  icon: string
  unlockedAt?: Date
}

interface Course {
  id: string
  title: string
  language: string
  level: string
  lessons: number
  rating: number
}

interface Store {
  user: User | null
  userProgress: UserProgress | null
  targetLanguage: string
  isAuthenticated: boolean
  
  setUser: (user: User | null) => void
  setTargetLanguage: (language: string) => void
  setUserProgress: (progress: UserProgress | null) => void
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProgress: (progress: Partial<UserProgress>) => void
}

const useStore = create<Store>((set, get) => ({
  user: null,
  userProgress: {
    dailyGoal: 30,
    todayMinutes: 15,
    totalWords: 245,
    totalExercises: 128,
    coursesCompleted: 3,
    streak: 7,
    achievements: [
      { id: '1', name: '初次入门', icon: '🎯', unlockedAt: new Date() },
      { id: '2', name: '连续7天', icon: '🔥' },
    ],
  },
  targetLanguage: 'en',
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setTargetLanguage: (language) => set({ targetLanguage: language }),

  setUserProgress: (progress) => set({ userProgress: progress }),

  login: async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email,
          targetLanguage: get().targetLanguage,
          level: 1,
          streak: 7,
        }
        set({ user: mockUser, isAuthenticated: true })
        return true
      }
      return false
    } catch {
      return false
    }
  },

  register: async (name, email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (name && email && password.length >= 6) {
        const mockUser: User = {
          id: '1',
          name,
          email,
          targetLanguage: get().targetLanguage,
          level: 1,
          streak: 0,
        }
        set({ user: mockUser, isAuthenticated: true })
        return true
      }
      return false
    } catch {
      return false
    }
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  updateProgress: (progress) => {
    const current = get().userProgress
    if (current) {
      set({ userProgress: { ...current, ...progress } })
    }
  },
}))

export default useStore
