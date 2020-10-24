(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  const swimCommandFetcher = () => {
    $.ajax({
      type: 'GET',
      data: {},
      url: serverUrl,
      success: (res) => (SwimTeam.move(res)) //runs function (data, string that describes status, jqXHR object) if success message received
      // error: runs function (jqXHR object, string textStatus, string errorThrown) if error is received
    });
  }
  var repeatSwimCommandFetcher = () => {
    console.log('if we see this, repeat works');
    setInterval(swimCommandFetcher, 3000)
  }
  repeatSwimCommandFetcher();

  // swimCommandFetcher();

  // $('body').on('click', function() {
  //   swimCommandFetcher();
  // })

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false, // false will force requested pages not to be cached by the browser
      contentType: false, // defaulted to character set
      processData: false, // normally defaulted to true, set to false to prevent transforming data to a string
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
