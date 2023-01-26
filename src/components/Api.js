
export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl
    this.headers = headers
  };

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-58/cards', {
      headers: {authorization: '7c6cea5c-eb7c-4e88-9a77-da060e3d6f29',
      'Content-Type': 'application/json'}
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      }
    )
    .catch((err) => {console.log(err)})
  }

getUserInfo() {
  fetch('https://nomoreparties.co/v1/cohortId/users/me', {
    headers: {authorization: '7c6cea5c-eb7c-4e88-9a77-da060e3d6f29', 'Content-Type': 'application/json'}
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}}