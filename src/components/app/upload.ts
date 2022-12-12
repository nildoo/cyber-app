import { token } from '../../graphql/storage'
import { api } from '../../services/api'

export type ImageUploadProps = {
  uri: string
  type: string
  name: string
}
interface Props {
  uploadImages: ImageUploadProps
}

export const upload = async ({ uploadImages }: Props) => {
  const clientToken = await token()
  const data = new FormData()

  data.append('file', uploadImages)
  // uploadImages.forEach(item => data.append('files', item))

  try {
    const res = await api.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${clientToken}`,
      },
    })
    return res.data
  } catch (e) {
    console.log('UploadErro:', JSON.stringify(e))
  }
}
