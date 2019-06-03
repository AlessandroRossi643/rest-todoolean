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

  $(document).on({
    mouseenter:function(){
      $(this).children().show("drop");
    },
    mouseleave:function(){
      $(this).children().hide("drop");
    }
  },".todo");

  $(document).on("click",".todo i",function(){
    var iddaEliminare=$(this).attr("data-id");
    console.log(iddaEliminare);
    eliminaImpegno(urlBase,iddaEliminare);
  });


// Function Elimina impegno
  function eliminaImpegno(url,id){
    $.ajax({
      url: url+"/"+id,
      method: "DELETE",
      success: function(){
        stampaLista();
      },
      error:function(){
        alert("Ops, qualcosa è andato storto");
      }
    });
  }


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
    $('#nuovoimpegno').val('');
    $('#lista').html('');
    $.ajax({
      url: urlBase,
      method: "GET",
      success: function(data){

        for (var i = 0; i < data.length; i++) {
          var idImpegno=data[i].id;
          var descrizioneImpegno= data[i].text;
          console.log(descrizioneImpegno);
          console.log(idImpegno);

          var compilazione={
            'impegno': descrizioneImpegno,
            'id': idImpegno
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
