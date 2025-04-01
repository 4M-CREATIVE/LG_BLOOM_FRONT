document.addEventListener('DOMContentLoaded', function () {
  browserDetector(); // 브라우저 감지
});

// 브라우저 감지
function browserDetector() {
  // Edge
  if (navigator.userAgent.includes('Edg')) {
    document.body.classList.add('edge');
    alert('edge');
  }

  // Whale
  if (navigator.userAgent.includes('Whale')) {
    document.body.classList.add('whale');
    alert('whale');
  }
}

function textQr() {

}
