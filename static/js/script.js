function clickBtn() {
    var txt = document.getElementById("input_form").value;
    var load = $("#load");
    load.removeClass("display-none");

    $.ajax({
      url: 'ajax/',
      method: 'GET',
      data: {"input_data": txt},
      dataType: "text",
      contentType: "application/json",
      beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrf_token);
        }
      },
      error: function(xhr, status, error) {
        console.log("error")
        document.getElementById("output").innerHTML = error;
        load.addClass("display-none");
      }
    })
    .done(function(data) {
      console.log("Success");
      console.log(data);
      document.getElementById("output").innerHTML = data;
      load.addClass("display-none");
    });

    // csrf_tokenの取得に使う
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }

    // ヘッダにcsrf_tokenを付与する関数
    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    };
}

function addword()
{
  doc = document.getElementById("input_form");
  doc.value += "''";
}

function addplus()
{
  doc = document.getElementById("input_form");
  doc.value += '+';
}

function addminus()
{
  doc = document.getElementById("input_form");
  doc.value += '-';
}