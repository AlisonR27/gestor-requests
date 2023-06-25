const { default: axios } = require("axios");

exports.handleTwitterRequest = () => {
  console.log("Runnin Twitter Requests");
  const postsToQuery = [];
  axios.get(`${process.env.BI_MANAGER_URL}/posts`).then(
    response => {
      console.log("Request em andamento para: BI Manager");
      postsToQuery = response.data.body.map(item => {
        id: item.id
      });
    }
  ).catch( err => {
    console.log(err);
  }).finally(() => {
    axios.post(`${process.env.TWITTER_PROXY_URL}/twitter/multiple_posts`, {
      posts: postsToQuery
    }).then(response => {
      if (response.status == 200) {
        // Recebe os objetos das postagens
        const parsedPostData = response.data;
        for(const post of parsedPostData) {
          // Realiza as requisições para o gestor BI inserir nos gráficos
          axios.put(`${process.env.BI_MANAGER_URL}/${post.id}/`, post)
            .then(
              response => {
                if (response.status != 201) { 
                  console.log("Error in request, status: " + response.status);
                }              
              }
            ).catch(exc => {
              throw new Error();
              console.log(exc);
            })
        }
      }
    });
  });
}