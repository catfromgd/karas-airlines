const arrow = document.querySelector('.arrow');
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