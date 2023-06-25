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
        console.log("Successful");
      }
    }
  ).catch(exc => {
    console.log("Error", exc);
  })
}

exports.forcedUpdate = () => {
  
}