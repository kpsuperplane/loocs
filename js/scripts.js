 createjs.Sound.alternateExtensions = ["mp3"];
 createjs.Sound.on("fileload", this.loadHandler, this);
 createjs.Sound.registerSound("mp3/cs.mp3", "cs");
 createjs.Sound.registerSound("mp3/cslong.mp3", "cslong");
 var beats = {
     "cs": {
         beats: [0, 1000, 1000, 500, 500, 500, 500, [500]],
         onCall: function(){
             $('#cs').css('color', 'yellow');
             setTimeout(function(){
                 $('#cs').css('color', '');
             }, 250);
         }
     },
     "cslong": {
         beats: [4000, [4000]],
         onCall: function(){
             $('#cslong').show().addClass('small');
             setTimeout(function(){
                 $('#cslong').removeClass('small');
             }, 10);
             setTimeout(function(){
                 $('#cslong').addClass('small');
                setTimeout(function(){
                    $('#cslong').hide();
                }, 1000);
             }, 1000);
         }
     }
 }
 function beginMusic(){
    $.each(beats, function(beat, value){
        var i = 0;
        var onCall = value.onCall;
        value = value.beats;
        function play(){
            setTimeout(function(){
                createjs.Sound.play(beat);
                onCall();
                i++;
                if(i < value.length-1){
                    play();
                }else{
                    i = 0;
                    value = value[value.length-1];
                    loopEnd();
                }
            }, value[i]);
        }
        function loopEnd(){
            createjs.Sound.play(beat);
                onCall();
            i++;
            i %= value.length;
            setTimeout(loopEnd, value[i]);
        }
        play();
    });
 }
 function loadHandler(event) {
     setTimeout(beginMusic, 1000);
 }