var images = [];

  for (var i = 1; i <= 8; i++) {
        images.push("https://picsum.photos/id/" +i+ "/80");
        };

        var fundo = "https://picsum.photos/80?gray";


        onload = () => { 
        var elemImages = document.querySelectorAll("#memory img")
    elemImages.forEach(
        (img, i) => {
            img.src = fundo; 
        } );
    };

        
  