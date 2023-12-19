import TablePage from './src/Table.vue'
import { ElTable } from 'element-plus'
import { TableSetPropsType } from './src/table'

export interface TableExpose {
  setProps: (props: Recordable<any>) => void
  setColumn: (columnProps: TableSetPropsType[]) => void
  selections: Recordable<any>[]
  elTableRef: ComponentRef<typeof ElTable>
}

export { TablePage }
