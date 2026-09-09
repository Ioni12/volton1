// const jqApp = new JComponentApp({
//     onInit: () => {
//         addWhatsAppChat();
//     },
//     config: {
//         translations: window.translations
//     }
// });
// jqApp.init();

$(document).ready(function () {
  addWhatsAppChat();
  useKosovaContactForm();
});

function useKosovaContactForm() {
  const $form = $("#kosova-form");
  const $formMessages = $("#kosova-form-messages");
  const $btnSubmit = $("#kosova-contact-form-submit");

  $form.submit(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    $btnSubmit.prop("disabled", true);
    $btnSubmit.addClass("disabled");

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: $form.serialize(),
    })
      .done(function (response) {
        $formMessages.removeClass("error");
        $formMessages.addClass("success");

        $formMessages.text("Faleminderit! Do t'ju kontaktojmë së shpejti.");

        $form.find('input[type="text"], input[type="email"], textarea').val("");

        $btnSubmit.prop("disabled", false);
        $btnSubmit.removeClass("disabled");
      })
      .fail(function (data) {
        $formMessages.removeClass("success");
        $formMessages.addClass("error");

        //Translate in albanian
        $formMessages.text(
          "Nuk mund të dërgohet mesazhi. Ju lutem provoni përsëri."
        );

        $btnSubmit.prop("disabled", false);
        $btnSubmit.removeClass("disabled");
      });
  });
}

(function ($) {
  "use strict";

  const $form = $("#my-contact-form");

  const $formMessages = $("#form-messages");

  const $btnSubmit = $("#contact-form-submit");

  $form.submit(function (e) {
    debugger;
    e.preventDefault();
    e.stopImmediatePropagation();

    $btnSubmit.prop("disabled", true);
    $btnSubmit.addClass("disabled");

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: $form.serialize(),
    })
      .done(function (response) {
        $formMessages.removeClass("error");
        $formMessages.addClass("success");

        $formMessages.text("Thank you. We will contact you shortly.");

        //$('#name, #email,  #subject, #message').val('');

        $form.find('input[type="text"], input[type="email"], textarea').val("");

        $btnSubmit.prop("disabled", false);
        $btnSubmit.removeClass("disabled");
      })
      .fail(function (data) {
        $formMessages.removeClass("success");
        $formMessages.addClass("error");

        $formMessages.text(
          "Oops! An error occured and your message could not be sent."
        );

        $btnSubmit.prop("disabled", false);
        $btnSubmit.removeClass("disabled");
      });
  });

  $(".language-chooser").click((e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const $target = $(e.currentTarget);
    const language = $target.data("val");

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    document.cookie = `language=${language}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=strict`;

    window.location.reload();
  });
})(jQuery);

function addWhatsAppChat() {
  $(".whatsapp").floatingWhatsApp({
    phone: "+355674001007",
    popupMessage: window.translations["VoltonWhatsappMessage"],
    showPopup: true,
    position: "right",
    headerColor: "#76a346",
    zIndex: 100,
    size: "55px",
  });
}
