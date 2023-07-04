const { default: axios } = require("axios");
require("../../routes/app/manager/index")

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
    for(const p of postsToQuery) {
      axios.get(`${process.env.TWITTER_PROXY_URL}/post/${p.id}`).then(response => {
        if (response.status == 200) {
          // Recebe os objetos das postagens
          const parsedPostData = response.data;
          for(const post of parsedPostData) {
            // Realiza as requisições para o gestor BI inserir nos gráficos
            dailyPostUpdate(post.id, post);
          }
        }
      });
    }
  });
}