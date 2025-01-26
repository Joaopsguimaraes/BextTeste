export interface Task {
  id: string
  title: string
  description: string | undefined
  priority: number
  finishAt: string | undefined
  category: number
}
