(function () {

    const $ = window.jQuery = require("jquery");
    const ui = require("jquery-ui-browserify");


    $(function () {



        //set height of scrollbar

        const mainWrapper = $(".body-scroll");
        const bodyWrapper = $(".body-scroll .body-wrapper");
        const wrapper = $(".body-wrapper .body-content");
        const scrollbar = $(".body-scroll .scrollbar");

        //height diff
        const heightdiff = mainWrapper.outerHeight(true)/bodyWrapper[0].scrollHeight;

        //height of scroll
        const scrollheight = mainWrapper.outerHeight(true) * heightdiff;

        //set scroll height
        scrollbar.height(scrollheight);

        //how much we move on scroll
        const containerUnit = bodyWrapper[0].scrollHeight/50;

        //scroll event
        $(mainWrapper).on("DOMMouseScroll mousewheel", function (event) {
            if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
                //scroll down



                const newTop = bodyWrapper.scrollTop() + containerUnit;
                bodyWrapper.scrollTop(newTop);

                const percentSeen = (newTop+mainWrapper.outerHeight(true))/wrapper.outerHeight(true);


                const scrollerTopPos = (bodyWrapper.outerHeight(true)*percentSeen)-(scrollheight);



                if((scrollerTopPos+scrollheight+10) < mainWrapper.outerHeight(true)){

                    const currentTop = parseInt(scrollbar.css("top").replace("px",""));
                    if(scrollerTopPos > currentTop){
                        const movescroll = scrollerTopPos+"px";

                        scrollbar.css("top",movescroll);
                    }

                }
                else{

                    const movescroll = (mainWrapper.outerHeight(true)-scrollheight-15);
                    scrollbar.css("top",movescroll);
                }

            } else {

                //scroll down



                const newTop = bodyWrapper.scrollTop() - containerUnit;
                bodyWrapper.scrollTop(newTop);

                const percentSeen = (newTop+mainWrapper.outerHeight(true))/wrapper.outerHeight(true);


                const scrollerTopPos = (bodyWrapper.outerHeight(true)*percentSeen)-(scrollheight);



                if(scrollerTopPos > 0){
                    const movescroll = scrollerTopPos+"px";

                    scrollbar.css("top",movescroll);
                }
                else{

                    scrollbar.css("top","0px");
                }



            }
            //prevent page fom scrolling
            return false;
        });

        //make it dragable
        $(scrollbar).draggable({
            axis:"y",
            "containment":".body-scroll .scrollbar-wrapper",
            "drag":function(){
                var pos = scrollbar.position().top;

                var posPercent = pos / (mainWrapper.height()-scrollheight);
                console.log(posPercent);
                var bodyLocation = (wrapper.outerHeight(true)-mainWrapper.height()) * posPercent;
                console.log(bodyLocation);
                bodyWrapper.scrollTop(bodyLocation);

            }
        });

    } ());
    //jquery ref





})();