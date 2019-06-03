$(document).ready(function(){
  var urlBase="http://157.230.17.132:3018/todos";
  var sorgente=$('#template-lista').html();
  var template_funzione=Handlebars.compile(sorgente);

  $('#nuovoimpegno').keydown(function(event){
    if(event.which==13){
      var impegnoInserito=$('#nuovoimpegno').val();
      creaImpegno(urlBase,impegnoInserito);
    }
  });


// Function Crea Impegno
  function creaImpegno(url,nuovoimpegno){
    $.ajax({
      url: urlBase,
      method: "POST",
      data: {
        "text":nuovoimpegno
      },
      success: function(){
        stampaLista();
      },
      error:function(){
        alert("Ops, qualcosa è andato storto");
      }
    });
  }


// Function Stampa Lista
  function stampaLista(){
    $('#lista').html('');

    $.ajax({
      url: urlBase,
      method: "GET",
      success: function(data){

        for (var i = 0; i < data.length; i++) {
          var descrizioneImpegno= data[i].text;
          console.log(descrizioneImpegno);

          var compilazione={
            'impegno': descrizioneImpegno
          }
          $('#lista').append(template_funzione(compilazione));
        }

      },
      error:function(){
        alert("Ops, qualcosa è andato storto");
      }
    });
  }
});
