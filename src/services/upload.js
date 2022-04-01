const baseUrl = process.env.REACT_APP_API_URL

export const fetchUploadImage = (formData) => {
  const url = `${baseUrl}/uploads`
  const requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  }

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => result.images)
    .catch((error) => console.log('error', error))
}
