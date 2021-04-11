import { useState, useEffect } from 'react'

import { get } from './api'

const useServerStatus = (host, port) => {
	const [status, setStatus] = useState()

	useEffect(() => {
		get('/status')
			.then(res => setStatus(res.data))
	}, [])

	return status
}

export default useServerStatus
