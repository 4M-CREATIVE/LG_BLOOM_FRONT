var commonEvent = {
  init: function () {
    this.headerEvent(); //헤더 이벤트
    this.searchEvent(); //통합검색 이벤트
  },
  headerEvent: () => {

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
  
    if (input && clearBtn) {
      input.addEventListener('input', () => {
        clearBtn.style.display = input.value.trim() !== '' ? 'block' : 'none';
      });
  
      clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        input.focus();
      });
    }
  
    // 통합검색 스크롤 애니메이션
    let lastScroll = 0;
    const header = document.querySelector(".search-header-wrap");
    const tabs = document.querySelector(".tab-content");
  
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
  
      if (currentScroll <= lastScroll) {
        header.style.top = "0";
        tabs?.classList.add("is-radius");
      } else {
        header.style.top = "-151px";
        tabs?.classList.remove("is-radius");
      }
  
      lastScroll = currentScroll;
    });
  
    // ✅ 탭 전환 이벤트 등록 (scroll과는 무관하게 분리)
    const tabLink = document.querySelectorAll(".tab-menu");
    const tabContent = document.querySelectorAll(".tab-content");
  
    tabLink.forEach((tab) => {
      tab.addEventListener("click", function () {
        const contentId = this.querySelector("span")?.dataset.content;
        if (!contentId) return;
  
        // 탭 버튼 active 처리
        tabLink.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
  
        // 콘텐츠 전환
        tabContent.forEach((box) => box.classList.remove("active"));
        const targetBox = document.getElementById(contentId);
        if (targetBox) targetBox.classList.add("active");
      });
    });
  }
}
