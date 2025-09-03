 /* Mobile nav behavior */
    const hambtn = document.querySelector('.hambtn');
    const mobileNav = document.getElementById('mobileNav');
    const desktopNav = document.querySelector('nav.desktop-nav');

    // show/hide mobile panel (creates panel element when needed)
    hambtn.addEventListener('click', () => {
      if (!mobileNav.classList.contains('show')) {
        mobileNav.style.display = 'block';
        setTimeout(()=> mobileNav.classList.add('show'), 10);
      } else {
        mobileNav.classList.remove('show');
        setTimeout(()=> mobileNav.style.display = 'none', 220);
      }
    });

    // Close mobile nav when clicking links inside
    mobileNav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
      mobileNav.classList.remove('show');
      setTimeout(()=> mobileNav.style.display = 'none', 220);
    }));

    /* Header shrink on scroll */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
      toggleTopBtn();
    });

    /* Reveal animations: Intersection Observer */
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('reveal-show');
          obs.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});

    // mark sections to observe
    document.querySelectorAll('section').forEach(sec => revealObserver.observe(sec));

    // Simple fade-in for hero text on load
    window.addEventListener('load', () => {
      document.querySelector('.hero').classList.add('loaded');
      // stagger: add small animation by temporarily toggling class on hero elements
      const hero = document.querySelector('.hero');
      hero.querySelector('h1').style.transform = 'translateY(0)';
      hero.querySelector('h1').style.opacity = '1';
      hero.querySelector('p').style.transform = 'translateY(0)';
      hero.querySelector('p').style.opacity = '1';
    });

    /* Scroll to top button */
    const topBtn = document.getElementById('topBtn');
    function toggleTopBtn(){
      if(window.scrollY > 300) topBtn.style.display = 'block';
      else topBtn.style.display = 'none';
    }
    topBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

    /* Smooth nav (desktop + mobile anchors) */
    document.querySelectorAll('a[href^="#"]').forEach(link=>{
      link.addEventListener('click', (e)=>{
        const target = document.querySelector(link.getAttribute('href'));
        if(target){
          e.preventDefault();
          const offset = 72; // header offset
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({top,behavior:'smooth'});
        }
      });
    });

    /* Contact form handler (front-end only placeholder) */
    function handleForm(e){
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      // fake send delay
      setTimeout(()=>{
        alert('Thanks — message sent (demo). I will reply to you soon.');
        btn.innerHTML = original;
        btn.disabled = false;
        e.target.reset();
      }, 900);
    }

    /* Accessibility: close mobile menu on escape */
    document.addEventListener('keydown', (ev) => {
      if(ev.key === 'Escape' && mobileNav.classList.contains('show')){
        mobileNav.classList.remove('show');
        setTimeout(()=> mobileNav.style.display = 'none', 220);
      }
    });

    /* Small responsive: show desktop nav on wide screens & hide mobile panel */
    const onResize = ()=> {
      if(window.innerWidth >= 900){
        document.querySelector('.mobile-nav').style.display = 'none';
        document.querySelector('.mobile-nav').classList.remove('show');
        document.querySelector('.desktop-nav').style.display = 'flex';
      } else {
        document.querySelector('.desktop-nav').style.display = 'none';
      }
    };
    window.addEventListener('resize', onResize);
    onResize();