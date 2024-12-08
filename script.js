//header
const arrow = document.querySelector('.arrow');
//modal
let modalTitle = document.querySelector('.modalTitle');
//ticket finder
const cityFrom = document.querySelector('.cityFrom').value;
const cityTo = document.querySelector('.cityTo').value;
const flightDateFrom = document.querySelector('.flightDateFrom').value;
const flightDateTo = document.querySelector('.flightDateTo').value;
// header content
const fullHeaderContent = document.querySelector('.fullHeaderContent');
let ifArrowOpened = 0;
let carouselItemNow = 0;
function arrowOpener() {
    if (ifArrowOpened == 0) {
        document.getElementById('header').style.height = '25vh';
        document.getElementById('arrow').style.transform = 'rotateX(180deg)';
        fullHeaderContent.style.opacity = '100%';
    } else {
        document.getElementById('header').style.height = '10vh';
        document.getElementById('arrow').style.transform = 'rotateY(180deg)';
        fullHeaderContent.style.opacity = '0%';
    }

    ifArrowOpened += 1;
    if (ifArrowOpened >= 2){
        ifArrowOpened = 0;
    }
}

//modal

document.addEventListener("DOMContentLoaded", function(){
    var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
    console.log(scrollbar);
    document.querySelector('[href="#openModal"]').addEventListener('click',function(){
      document.body.style.overflow = 'hidden';
      document.querySelector('#openModal').style.marginLeft = scrollbar;
    });
    document.querySelector('[href="#close"]').addEventListener('click',function(){
      document.body.style.overflow = 'visible';
      document.querySelector('#openModal').style.marginLeft = '0px';
    });
  });

//modal ticket finder function

function modalTicketFinder(){
  console.log('modal ticket finder');
  let modalTitle = document.querySelector('.modalTitle');
  if (cityFrom == 'Москва') {
    alert('Билет найден!');
  }
  else {
    alert('Ничего не было найдено :(');
  }
}
