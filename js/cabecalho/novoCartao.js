(function($, Mural, Cartao, Tags, Busca){
	"use strict"

	$("#novo-cartao__trigger").on("click", function(){
		let mural = $(".novoCartao")

		mural.toggleClass("collapsed")

		if(mural.hasClass("collapsed")){
			$(this).addClass('focus')
		} else {
			$(this).removeClass('focus')
		}
	})

	$(".novoCartao").submit(function(event){
		event.preventDefault()
		let $campoConteudo = $(".novoCartao-conteudo")
		let conteudo = $campoConteudo.val().trim()
		if(conteudo){
			let novoCartao = new Cartao(conteudo)
			if(Mural.adiciona(novoCartao)){
				$campoConteudo.removeClass('focus')
				$campoConteudo.val("")
			} else {
				alert("Você não está logado")
			}
		}
	})

	$(".novoCartao-conteudo").on("focus", function(){
		let $campoConteudo = $(this)
		let tagsAntigas = Tags.extraiTags($campoConteudo.val())
		let tagsToRemoveRegex = $campoConteudo.val().split(/[\s\n]/).filter(function(palavra){
			return palavra && tagsAntigas.indexOf(palavra) >= 0
		}).join("|")
		let txt = $campoConteudo.val().replace(new RegExp(tagsToRemoveRegex,"g"), "").trim()
		let tags = Busca.tags.reduce(function(txt,tag){
			return txt + "\n" + tag
		},"")
		$campoConteudo.addClass('focus')
		$campoConteudo.val(tags && (txt + "\n" + tags))
	})
})(jQuery, Mural, Cartao, Tags, Busca)
