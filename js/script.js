let page = 0;
      let limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
      let vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      let done = Math.round(limit/vh)-1;
      
    let clock = 0;
    window.onwheel = function () {
        //console.log(clock);
        if(clock == 0){
        clock = 1;
        
        let pos = event.deltaY;
        let scroll=0;  
        //console.log(event.deltaY);
        //console.log(scroll);
            let go = (event.deltaY < 0 ) ? -1 : +1;
            page = page + go;
            if(page < 0 )page = 0;
            if(page > done) page = done;
            //console.log(page);
                    
      $('html, body').animate({
        scrollTop: vh*page
      });
        setTimeout(function(){clock = 0}, 1000);
       
    }
    }
	
	
	$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});

// Cache selectors
var topMenu = $(".nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   // Set/remove active class
   menuItems
     .parent().removeClass("active")
     .end().filter("[href='#"+id+"']").parent().addClass("active");
});