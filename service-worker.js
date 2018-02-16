let version = {
  current : '5.6',
  earlier : '5.5'
}

let files = [
  '/',
  'css/estilos.css',
  'css/opcoesDaPagina.css',
  'css/opcoesDoCartao.css',
  'css/cabecalho.css',
  'css/login.css',
  'css/loginForm.css',
  'css/loginStatus.css',
  'css/cartao.css',
  'css/novoCartao.css',
  'css/mural.css',
  'js/lib/jquery.js',
  'js/lib/eventemitter2.js',
  'js/lib/KeyBoardNavigation.js',
  'js/tags/Tags.js',
  'js/cabecalho/mudaLayout.js',
  'js/cabecalho/busca.js',
  'js/filtro/Filtro.js',
  'js/tipos/TiposCartao.js',
  'js/login/LoginUsuario_render.js',
  'js/login/LoginUsuario.js',
  'js/cartao/render/Cartao_renderHelpers.js',
  'js/cartao/render/CartaoOpcoes_render.js',
  'js/cartao/render/CartaoConteudo_render.js',
  'js/cartao/render/Cartao_render.js',
  'js/cartao/Cartao.js',
  'js/mural/render/Mural_render.js',
  'js/mural/Mural.js',
  'js/cabecalho/novoCartao.js',
  'img/bin2.svg',
  'img/edit.svg'
]

self.addEventListener("install", () => {

  //*** */
  // Condicionar o cacheamento dos arquivos ao evento 'install' pode provocar
  // inconsistencia de versões quando dua ou mais abas do navegador são abertas.
  // Para evitar isto, condicionamos ao evento 'activate'
  //*** */

  // caches.open(`kards-files-${version.current}`).then(cache => {
  //   cache.addAll(files).then(() => {
  //     caches.delete('kards-files');
  //     caches.delete(`kards-files-${version.earlier}`)
  //   });
  // }) 

})


self.addEventListener("activate", ()=>{

  caches.open(`kards-files-${version.current}`).then(cache => {
    cache.addAll(files).then(() => {
      caches.delete('kards-files');
      caches.delete(`kards-files-${version.earlier}`)
    });
  }) 

})


self.addEventListener("fetch", function(event){ 

  let req = event.request
  let cacheRes = caches.match(req).then(resCached => {
    let res = resCached ? resCached : fetch(req) 
    return res
  })
  event.respondWith(cacheRes);

})


