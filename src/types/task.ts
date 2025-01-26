export interface Task {
  id: string
  title: string
  description: string | undefined
  priority: string
  finishAt: string | undefined
  category: number
}
