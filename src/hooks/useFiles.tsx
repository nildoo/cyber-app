import { FilesContext } from '../context/setFiles'
import { useContext } from 'react'

export function useFiles() {
  const files = useContext(FilesContext)
  return files
}
