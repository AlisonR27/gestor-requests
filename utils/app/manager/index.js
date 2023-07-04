const { default: axios } = require("axios")

exports.dailyPostUpdate = (id, data) => {
  axios.post(`${process.env.BI_MANAGER_URL}/${id}/daily`, {
    data: {
      ...data,
      at: new Date()
    }
  }).then(
    response => {
      if (response.status == 200) {
        return true
      }
    }
  ).catch(exc => {
    console.log("Error", exc);
    return false;
  })
}

exports.forcedUpdate = (id, data) => {
  axios.post(`${process.env.BI_MANAGER_URL}/${id}/forced`, {
    data: {
      ...data,
      at: new Date()
    }
  }).then(
    response => {
      if (response.status == 200) {
        return true
      }
    }
  ).catch(exc => {
    console.log("Error", exc);
    return false;
  })
}