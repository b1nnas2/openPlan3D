// 룸핏(RoomFit) 수정: 편집기 속성 창·도구 칸을 끌어서 크기 조절·접기 (앱의 검색 창과 같은 방식)
(function () {
  const css = document.createElement('style');
  css.textContent =
    '[data-rf-folded]>*{visibility:hidden}' +
    '.rf-h{position:fixed;z-index:60;display:flex;align-items:center;justify-content:center;touch-action:none;cursor:grab}' +
    '.rf-h>i{display:block;border-radius:9px;background:#C9C9C6}' +
    '.rf-fold{position:fixed;z-index:59;align-items:center;gap:8px;padding:0 6px 0 18px;box-sizing:border-box;background:rgba(244,244,242,.97);border-radius:24px;box-shadow:0 6px 16px -8px rgba(0,0,0,.18);font-size:14px;color:#111111;cursor:pointer}' +
    '.rf-fold b{font-weight:700;white-space:nowrap}' +
    '.rf-fold span{flex:1;font-size:11px;color:#6B6B6B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.rf-fold button{border:0;border-radius:18px;padding:8px 16px;background:#111111;color:#fff;font-weight:700;white-space:nowrap}';
    document.head.appendChild(css);
  const mobile = () => innerWidth < 768;
  const FAB = () => document.querySelector('button.md\\:hidden.fixed.bottom-4.left-4');

  // getEl: 창 찾기 / side: 'top'(폰에서는 아래 창, 아니면 오른쪽 창) 또는 'right'(왼쪽 도구 칸) / tgt: 크기를 바꿀 요소
  function make(getEl, side, tgt) {
    const h = document.createElement('div');
    h.className = 'rf-h';
    h.appendChild(document.createElement('i'));
    document.body.appendChild(h);

    // 접힌 알약 막대 (세로 폰 아래 창): 공구 버튼 옆에 [제목 · 펼치기]
    const fb = document.createElement('div');
    fb.className = 'rf-fold';
    fb.innerHTML = '<b></b><span>위로 끌거나 눌러서 펼치기</span><button type="button">펼치기</button>';
    fb.style.display = 'none';
    document.body.appendChild(fb);

    let st = null, moved = false, folded = false, saved = 0, wasMobile = mobile(), base = 0;
    const mode = () => (side === 'top' && !mobile() ? 'left' : side);
    const FOLD = m => (m === 'top' ? 64 : 36);
    const DEF = m => (m === 'top' ? innerHeight * 0.45 : 260);
    const size = el => { const r = tgt(el).getBoundingClientRect(); return mode() === 'top' ? r.height : r.width; };

    function apply(el, v) {
      const m = mode(), t = tgt(el);
      if (m === 'top') {
        t.style.height = v + 'px'; t.style.maxHeight = v + 'px';
        t.style.overflowY = folded ? 'hidden' : '';
        t.style.visibility = folded ? 'hidden' : '';   // 접히면 창은 숨기고 알약 막대만
        if (folded) t.setAttribute('data-rf-sheet-folded', ''); else t.removeAttribute('data-rf-sheet-folded');
      } else {
        if (!base) {   // 처음 끌 때 원래 너비 기억
          const cs = getComputedStyle(t);
          base = t.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        }
        t.style.width = v + 'px'; t.style.minWidth = v + 'px'; t.style.overflowX = 'hidden';
        for (const c of t.children) c.style.minWidth = base + 'px';   // 안의 내용은 원래 너비 그대로 → 찌그러지지 않고 가려짐
        if (folded) t.setAttribute('data-rf-folded', ''); else t.removeAttribute('data-rf-folded');
      }
    }
    function reset(el) {
      const t = tgt(el);
      for (const k of ['height', 'maxHeight', 'overflowY', 'overflowX', 'width', 'minWidth', 'visibility']) t.style[k] = '';
      for (const c of t.children) c.style.minWidth = '';
      t.removeAttribute('data-rf-folded');
      t.removeAttribute('data-rf-sheet-folded');
      folded = false;
      base = 0;
    }
    function expand() {
      const el = getEl(); if (!el) return;
      folded = false;
      apply(el, saved || DEF(mode()));
    }
    fb.addEventListener('click', expand);

    // 손잡이·알약 막대를 창에 맞춰 놓기 (매 프레임)
    function place() {
      fb.style.display = 'none';
      const el = getEl();
      if (!el) { h.style.display = 'none'; return; }
      if (mobile() !== wasMobile) { wasMobile = mobile(); reset(el); }   // 화면을 돌리면 처음 크기로
      const m = mode(), i = h.firstChild;

      if (side === 'top' && m === 'top' && folded) {   // 접힘: 손잡이 숨기고 공구 버튼 옆에 알약 막대
        h.style.display = 'none';
        if (el.classList.contains('hidden')) return;
        const head = tgt(el).querySelector('h2,h3,.font-semibold,.font-bold');
        fb.firstChild.textContent = head ? head.textContent.trim() : '속성';
        const fab = FAB(), fr = fab ? fab.getBoundingClientRect() : null;
        const left = fr && fr.width > 0 ? fr.right + 10 : 16;
        const top = fr && fr.width > 0 ? fr.top : innerHeight - 64;
        Object.assign(fb.style, { display: 'flex', left: left + 'px', top: top + 'px', width: (innerWidth - left - 16) + 'px', height: '48px' });
        return;
      }

      const r = tgt(el).getBoundingClientRect();
      if (r.width < 2 || r.height < 2 || r.right <= 1) { h.style.display = 'none'; return; }
      h.style.display = 'flex';
      if (m === 'top') {
        Object.assign(h.style, { left: (r.left + r.width / 2 - 60) + 'px', top: (r.top - 4) + 'px', width: '120px', height: '28px' });
        Object.assign(i.style, { width: '44px', height: '5px' });
      } else {
        const x = m === 'left' ? r.left - 10 : r.right - 10;
        Object.assign(h.style, { left: x + 'px', top: (r.top + r.height / 2 - 60) + 'px', width: '20px', height: '120px' });
        Object.assign(i.style, { width: '5px', height: '44px' });
      }
    }

    // ── 끌기 ──
    h.addEventListener('pointerdown', e => {
      const el = getEl(); if (!el) return;
      h.setPointerCapture(e.pointerId);
      st = { x: e.clientX, y: e.clientY, v: size(el), pd: 0, pt: 0, vel: 0 };
      moved = false;
    });
    h.addEventListener('pointermove', e => {
      if (!st) return;
      const el = getEl(), m = mode();
      const d = m === 'top' ? st.y - e.clientY : m === 'left' ? st.x - e.clientX : e.clientX - st.x;
      if (Math.abs(d) > 4) moved = true;
      const now = performance.now();   // 손가락 속도 재기 (휙 쓸기 알아채기)
      if (st.pt) st.vel = (d - st.pd) / Math.max(1, now - st.pt);
      st.pd = d; st.pt = now;
      if (!moved) return;
      folded = false;
      const max = m === 'top' ? innerHeight * 0.85 : innerWidth * 0.7;
      apply(el, Math.max(FOLD(m), Math.min(max, st.v + d)));
    });
    h.addEventListener('pointerup', () => {
      if (!st) return;
      const el = getEl(), m = mode(), vel = st.vel || 0;
      st = null;
      if (!moved) { if (folded) expand(); return; }   // 톡 누르면 펼치기
      if (vel > 0.25) { folded = false; apply(el, DEF(m)); return; }   // 휙 올리기(넓히기): 바로 펼치기
      if (vel < -0.25 || size(el) < (m === 'top' ? 120 : 170)) {      // 휙 내리기(좁히기) 또는 아주 작게: 접기
        if (side === 'right' && mobile()) {   // 폰 도구 서랍: 닫기
          const back = document.querySelector('.md\\:hidden.fixed.inset-x-0');
          reset(el);
          if (back) back.click();
          return;
        }
        saved = DEF(m);
        folded = true;
        apply(el, FOLD(m));
      }
    });

    // 가로 화면에서 접힌 얇은 막대를 톡 누르면 펼치기
    document.addEventListener('click', e => {
      const el = getEl();
      if (!folded || !el || mode() === 'top' || !tgt(el).contains(e.target)) return;
      e.preventDefault(); e.stopPropagation();
      expand();
    }, true);

    (function loop() { place(); requestAnimationFrame(loop); })();
  }

  function start() {
    make(() => document.querySelector('[data-plan-properties]'), 'top', el => el);   // 벽·문·창문·방 속성 창
    make(() => document.querySelector('.max-md\\:fixed.max-md\\:left-0'), 'right', el => el.firstElementChild || el);   // 그리기·방 목록 칸

    // 세로 폰: [룸핏에 적용]·공구 버튼이 펼친 속성 창과 안 겹치게 그 위로
    (function follow() {
      const label = document.getElementById('rf-apply');
      const p = document.querySelector('[data-plan-properties]');
      const r = p && !p.classList.contains('hidden') ? p.getBoundingClientRect() : null;
      const on = mobile() && r && r.height > 2 && !p.hasAttribute('data-rf-sheet-folded');
      if (label) {
        const b = label.parentElement;
        if (on) b.style.setProperty('top', Math.max(56, Math.min(84, r.top - 104)) + 'px', 'important');
        else b.style.removeProperty('top');
      }
      const fab = FAB();
      if (fab) {
        if (on) fab.style.setProperty('bottom', (innerHeight - r.top + 12) + 'px', 'important');
        else fab.style.removeProperty('bottom');
      }
      requestAnimationFrame(follow);
})();

// 룸핏(RoomFit) 수정: 바닥·벽 무늬(텍스처) 설정 숨기기 → 9단계에서 벽지·바닥 무늬를 다시 쓰기로 해서 지움 (3D에도 그대로 나옴)
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

// 룸핏(RoomFit) 수정: 영어 안내문·튜토리얼·단축키 표시·편집기 자체 [저장] 숨기기
(function () {
  const css = document.createElement('style');
  css.textContent = 'kbd{display:none!important}';   // 단축키 표시 (V, W 등)
  document.head.appendChild(css);
  const hideStart = ['Click to add wall segment', 'Nice!', 'Press Escape', 'Double-click to finish', 'Click to place', 'Drag to'];
  const skipBtns = ['Got it', 'Skip', 'Skip tour', 'Done', 'Dismiss', 'Next'];
  const saveBtns = ['저장', '저장 중...', '저장됨', '저장됨 ✓', 'Save', 'Saved'];
  setInterval(() => {
    // 튜토리얼 창: [Got it]·[Skip] 등을 자동으로 눌러서 닫기
    document.querySelectorAll('button').forEach(b => {
      const t = b.textContent.trim();
      if (skipBtns.includes(t) && b.offsetParent) b.click();
    });
    // 영어 안내 말풍선 숨기기
    document.querySelectorAll('div,span,p').forEach(el => {
      if (el.dataset.rfHid) return;
      const t = el.textContent.trim();
      if (!hideStart.some(w => t.startsWith(w)) || t.length > 200) return;
      el.style.display = 'none'; el.dataset.rfHid = '1';
    });
    // 왼쪽 도구 이름 옆 한 글자 단축키 (V, W 등) 숨기기
    document.querySelectorAll('span').forEach(el => {
      if (!el.childElementCount && /^[A-Z]$/.test(el.textContent.trim())) el.style.display = 'none';
    });
    // 편집기 위쪽 막대의 자체 [저장] 버튼 숨기기 (저장은 룸핏 [저장]으로만)
    const head = document.querySelector('.bg-gradient-to-r.from-slate-800');
    if (head) head.querySelectorAll('button').forEach(b => {
      if (saveBtns.includes(b.textContent.trim())) b.style.display = 'none';
    });
  }, 400);
})();