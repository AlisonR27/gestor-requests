<style>
  get,post,put,delete { padding: 2px 5px; color: white; font-weight:bold; border-radius:3px; }
  get {
    background-color: rgba(160,40,180,.8);
  }
  get::after {
    content: "GET";
  }
  post::after {
    content: "POST";
  }
  put::after {
    content: "PUT";
  }
  delete::after {
    content: "DELETE";
  }
  post {
    background-color: rgba(130,190,40,.8);
  }
  put {
    background-color: rgba(255,90,30,.7);
  }
  delete {
    background-color: rgba(255,30,30,.7);
  }
  
</style>
Exemplo de tabela:
| Sufixo | Rota | Método |
---------|------|----------
|/app|x|<get/>|
|/api|x|<post/>|
|/api|x|<put/>|
|/api|x|<delete/>|

