var commonEvent = {
  init: function () {
    this.headerEvent(); //헤더 이벤트
  },
  headerEvent: () => {
    // 브라우저감지
    if (navigator.userAgent.includes('Edg')) {
      document.body.classList.add('edge');
      alert('edge');
    }
  
    if (navigator.userAgent.includes('Whale')) {
      document.body.classList.add('whale');
      alert('whale');
    }

    // 헤더 메뉴 토글
    const gnb = document.querySelector('.gnb');
    const menuBtn = document.querySelector('.menu-open-btn');
    const closeBtn = document.querySelector('.gnb .close-btn');
  
    if (!gnb || !menuBtn || !closeBtn) {
      console.log(gnb);
      console.log(menuBtn);
      console.log(closeBtn);
      console.warn('필요한 요소를 찾지 못했습니다.');
      return;
    }
  
    menuBtn.addEventListener('click', function () {
      gnb.classList.add('open');
    });
  
    closeBtn.addEventListener('click', function () {
      gnb.classList.remove('open');
    });
  },
}
