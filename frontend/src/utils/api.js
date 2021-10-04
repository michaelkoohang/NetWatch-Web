
module.exports = {
  login: (username, password) => {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password}),
    })
    .then(response => response.json())
    .then(data => data.success);
  },

  // Logout user
  logout: () => {
    return fetch('/api/auth/logout', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => data.success);
  },

  // Verify user is still logged in
  verify: () => {
    return fetch('/api/auth/verify', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => data.success);
  }
}