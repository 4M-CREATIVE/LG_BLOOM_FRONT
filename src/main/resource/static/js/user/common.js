var commonEvent = {
  init: function () {
    this.headerEvent(); //헤더 이벤트
    this.searchEvent(); //통합검색 이벤트
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
  searchEvent: () => {
    // 검색 input 키워드 초기화 버튼
    const input = document.querySelector('.search__box .input__search');
    const clearBtn = document.querySelector('.search__box .btn__clear');
  
    if (!input || !clearBtn) return;
  
    input.addEventListener('input', () => {
      clearBtn.style.display = input.value.trim() !== '' ? 'block' : 'none';
    });
  
    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.style.display = 'none';
      input.focus();
    });

    // 통합검색 스크롤 애니메이션
    let lastScroll = 0;
    const header = document.querySelector(".search-header-wrap");
    const tabs = document.querySelector(".search-result");

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      console.log(currentScroll);
      console.log(lastScroll);

      if (currentScroll <= lastScroll) {
        // 위로 스크롤 시 헤더 보이기
        header.style.top = "0";
        tabs.classList.remove("active");
      } else {
        // 아래로 스크롤 시 헤더 숨기기
        header.style.top = "-151px";
        tabs.classList.add("active");
      }

    });
  },
}
