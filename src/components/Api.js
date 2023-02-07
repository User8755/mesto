
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  };

_checkRes(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Error: ${res.status}`)
  }
  
};

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(
        this._checkRes
      )
  };

  userInfoApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((
      this._checkRes
    ))
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
    .then((
      this._checkRes
    ))
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
    .then((
      this._checkRes
    ))
  };

  deleteCards(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
   })
   .then((
    this._checkRes
  ))
  };

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
  })
  .then((
    this._checkRes
  ))
}

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
  })
   .then((
    this._checkRes
  ))
};

loadAvatar(link) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: link.urlAvatar
    })
})
  .then((
    this._checkRes
  ))
};
}