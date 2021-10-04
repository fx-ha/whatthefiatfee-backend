import axios from 'axios'

const triggerIsr = async (url: string): Promise<void> => {
  const { status } = await axios.get(url)

  if (status === 200) {
    console.log('requesting Incremental Static Regeneration on frontend')
  }
}

export default triggerIsr
