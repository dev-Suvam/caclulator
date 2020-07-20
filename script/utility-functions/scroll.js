let scrollable_content = document.querySelector('.scrollable-content')
//Get the button
var mybutton = document.getElementById("myBtn");
mybutton.addEventListener('click', ()=> {
  // When the user clicks on the button, scroll to the top of the document
  scrollable_content.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})
var btn_scroll_bottom = document.getElementById('btn-scroll-bottom');
btn_scroll_bottom.addEventListener('click', ()=> {
  scrollable_content.scrollTop = scrollable_content.scrollHeight;
  document.documentElement.scrollHeight =0;
})
// When the user scrolls down 20px from the top of the document, show the button
// scrollable_content.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   let scrollTop_Percentage = (scrollable_content.scrollTop/scrollable_content.scrollHeight)*100;
//   if (scrollTop_Percentage > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }

//   let scrollDown = scrollable_content.scrollHeight-scrollable_content.scrollTop
//   let scrollDown_Percentage = (scrollDown/scrollable_content.scrollHeight)*100
//   console.log(scrollDown_Percentage)
//   if(scrollDown_Percentage > 20 && scrollDown_Percentage< 70) {
//     btn_scroll_bottom.style.display = "block";
//   } else {
//     btn_scroll_bottom.style.display = "none";
//   }
// }


