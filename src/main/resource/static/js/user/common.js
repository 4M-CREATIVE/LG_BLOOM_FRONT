document.addEventListener('DOMContentLoaded', function () {
  browserDetector();       // 브라우저 감지
  headerMenuToggle();      // 헤더 메뉴 토글
});

// 브라우저 감지
function browserDetector() {
  if (navigator.userAgent.includes('Edg')) {
    document.body.classList.add('edge');
    alert('edge');
  }

  if (navigator.userAgent.includes('Whale')) {
    document.body.classList.add('whale');
    alert('whale');
  }
}

// 헤더 메뉴 토글
function headerMenuToggle() {
  const gnb = document.querySelector('.gnb');
  const menuBtn = document.querySelector('.menu-open-btn');
  const closeBtn = document.querySelector('.gnb .close-btn');

  if (!gnb || !menuBtn || !closeBtn) {
    console.warn('필요한 요소를 찾지 못했습니다.');
    return;
  }

  menuBtn.addEventListener('click', function () {
    gnb.classList.add('open');
  });

  closeBtn.addEventListener('click', function () {
    gnb.classList.remove('open');
  });
}
