import type { SelectOptionsType } from '@/types/select-options-type'
import { PriorityValuesEnum } from './priority-values-enum'

export const priorityOptions: SelectOptionsType[] = [
  { value: PriorityValuesEnum.LOW, label: 'Baixa' },
  { value: PriorityValuesEnum.MEDIUM, label: 'Media' },
  { value: PriorityValuesEnum.LOW, label: 'Alta' },
]
