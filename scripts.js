//*******************************************
//****************Settings ******************
//*******************************************

var gijt_background =  '#111';
var gijt_padding =  '0px';
var gijt_borderWidth =  ' 3px';
var gijt_borderType =  ' ' + 'solid';
var gijt_borderColor =  ' ' + '#222';
var gijt_borderRadius =  '1%';
var gijt_imgBorderWidth =  '1px';
var gijt_imgBorderType =  ' ' + 'solid';
var gijt_imgBorderColor =  ' ' + '#333';
var gijt_transitionSpeed =  '1s';
var gijt_transitionOrigin = 'left'

var pHolder = '.gijt-pic-holder';
var pHolderImg = '.inner_pers_box img';

//************ Apply Settings ******************

$(pHolder).css('padding', gijt_padding).css('background', gijt_background).css('border', gijt_borderWidth + gijt_borderType + gijt_borderColor).css('border-radius', gijt_borderRadius);

$(pHolderImg).css('border',  gijt_imgBorderWidth + gijt_imgBorderType + gijt_imgBorderColor).css('border-radius', gijt_borderRadius);


$('.left-s, .center-s, .right-s, .off-right, .off-right-next, .off-left').css('transform-origin', gijt_transitionOrigin).css('transition', 'all ' + gijt_transitionSpeed + ' ease');


 //*** Initialize to assign elements to proper start state
$(pHolder).hide().addClass('off-right');
  $('.right-s, .left-s, .center-s').removeClass('off-right');
$(pHolder).show();

//*** Move the last pic before the first (to move left right after load)
$(document).ready(function moveLastToTop(){
  if ($('.left-s').prev(pHolder).length == 0) {
        $(pHolder + ':last').prependTo('#inner-wrapper').removeClass('off-right').addClass('off-left'); 
  }
}); 
     
//********************************************
//************* Move Left and Right **********
//********************************************

//*********** Move Left ******
var moveAllLeft = function()  {
   //*** Turn off "left" button ***
   $('#left-button').css('pointer-events', 'none');
   //*** Clear residual Transistion-Timing settings and .hide()'s ***
  $(pHolder).css('transition-timing-function', '').css('transform', '').show();

   
  $('.left-s').removeClass('left-s').addClass('off-left').css('transition-timing-function', 'cubic-bezier(0.54,.35,0.6,1)');
  $('.center-s').removeClass('center-s').addClass('left-s').css('transition-timing-function', 'cubic-bezier(0.47,.53,0.56,.994)');
  $('.right-s').removeClass('right-s').addClass('center-s').css('transition-timing-function', 'cubic-bezier(0.47,.4,0.56,1)').next(pHolder).removeClass('off-right').addClass('right-s').css('transition-timing-function', 'cubic-bezier(0.31,.525,0.53,1)').next(pHolder).addClass('off-right').css('transform', 'translateX(85%) rotateY(67.25deg) translateX(160%) scalex(1)').css('transition-timing-function', 'cubic-bezier(.1,.9,.9,.1)');
   
    //*** Move first to last if nothing after the right side ***
   if ($('.right-s').next(pHolder).length == 0) {
        $(pHolder + ':first').appendTo('#inner-wrapper').addClass('off-right').removeClass('off-left'); 
  }  
   
   //*** Turn the "left" button back on ***
  $(pHolder)
.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
 function(e){
      $('#left-button').css('pointer-events', 'initial');
    $(this).off(e);
 });

};         

//*********** Move Left ******
var moveAllRight = function()  {
  ///*** Turn off "Right" button
  $('#right-button').css('pointer-events', 'none');
  
   $(pHolder).css('transition-timing-function', '').css('transform', '').css('opacity', '');
  $('.off-right').hide();
  $('.left-s').prev(pHolder).show()
 $('.right-s').removeClass('right-s').addClass('off-right off-right-next').show();
 $('.center-s').removeClass('center-s').addClass('right-s');
 $('.left-s').removeClass('left-s').addClass('center-s').prev(pHolder).removeClass('off-left').addClass('left-s');
  
  ///***Clear Transition-Timing changes and "next" selector**
   $(pHolder).css('transition-timing-function', '').css('transform', '');
  
  $('.off-right-next').removeClass('off-right-next');
 
  //*** Move last to first if nothing before the left side.
  if ($('.left-s').prev(pHolder).length == 0) {
        $(pHolder + ':last').prependTo('#inner-wrapper').addClass('off-left').removeClass('off-right'); 
  }
  
  //***Turn the "Right" button back on***
  $(pHolder)
.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
 function(e){
      $('#right-button').css('pointer-events', 'initial');
    $(this).off(e);
 });
};     

//************Buttons*********
$('#right-button').on('click', moveAllRight);

$('#left-button').on('click', moveAllLeft);



$('.left-s, .center-s, .right-s, .off-right, .off-right-next, .off-left').css('transform-origin', gijt_transitionOrigin).css('transition', 'all ' + gijt_transitionSpeed + ' ease');
