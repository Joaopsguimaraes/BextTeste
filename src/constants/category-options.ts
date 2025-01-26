import type { SelectOptionsType } from '@/types/select-options-type'
import { CategoryValuesEnum } from './category-values-enum'

export const categoryOptions: SelectOptionsType[] = [
  { value: CategoryValuesEnum.PERSONAL, label: 'Pessoal' },
  { value: CategoryValuesEnum.WORK, label: 'Trabalho' },
  { value: CategoryValuesEnum.STUDY, label: 'Estudos' },
]
