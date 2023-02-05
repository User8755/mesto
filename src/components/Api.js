
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      }
      )
      .catch((error) => {console.log(error)})
  };

  UserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => {console.log(error)})
  };

  updateUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {console.log(error)})
  };

  loadImg(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.placename,
        link: item.urlimg
      })
    })
      .then(res =>  {
        if (res.ok) {
          return res.json();
        }
      })
    .catch((error) => {console.log(error)})
  };

  deleteCards(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
   })
   .then(res =>  {
    if (res.ok) {
      return res.json();
    }
  })
.catch((error) => {console.log(error)})
  };

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
  })
  .then(res =>  {
    if (res.ok) {
      return res.json();
    }})
    .catch((error) => {console.log(error)})
}

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
  })
  .then(res =>  {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((error) => {console.log(error)})
};

loadAvatar(link) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: link.urlAvatar
    })
})
.then(res =>  {
  if (res.ok) {
    return res.json();
  }
})
.catch((error) => {console.log(error)})
};

}// конец файла