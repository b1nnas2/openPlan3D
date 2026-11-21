// 룸핏(RoomFit) 수정: 편집기 화면의 영어 글자를 한국어로 바꿔 줌
(function () {
  const W = {
    // 위쪽 막대
    "projects": "프로젝트", "untitled project": "내 평면도", "ground floor": "1층", "first floor": "2층",
    "plan": "평면도", "2d": "2D", "3d": "3D", "saved": "저장됨", "save": "저장", "saving...": "저장 중...",
    "undo": "되돌리기", "redo": "다시 하기", "settings": "설정", "help": "도움말", "export": "내보내기",
    // 왼쪽 패널
    "build": "그리기", "rooms": "방 목록", "tools": "도구", "annotate": "표시",
    "select": "선택", "click to select elements": "눌러서 고르기",
    "draw wall": "벽 그리기", "click to draw, dbl-click to finish": "눌러서 그리고, 두 번 눌러 끝내기",
    "dimension": "치수 표시", "add dimension annotations (n)": "치수 적기 (N)",
    "measure": "길이 재기", "measure distances (m)": "거리 재기 (M)",
    "doors": "문", "windows": "창문", "furniture": "가구", "stairs": "계단",
    "single": "여닫이문", "double": "양문", "sliding": "미닫이", "french": "유리문", "pocket": "포켓문",
    "bifold": "접이문", "doorway": "문틀만", "garage": "차고문", "standard": "기본 창", "fixed": "고정 창",
    "casement": "여닫이 창", "awning": "들창", "bay": "돌출 창", "picture": "통창",
    "90cm swing": "90cm 여닫이", "150cm swing": "150cm 여닫이", "180cm slide": "180cm 미닫이",
    "150cm glass": "150cm 유리", "90cm recess": "90cm 벽 속", "180cm fold": "180cm 접이",
    "100cm open": "100cm 뚫림", "240cm overhead": "240cm 위로 열림",
    // 평면도 칸
    "start building your floor plan": "평면도를 그려 보세요",
    "draw walls with": "벽 그리기:", "or drag items from the sidebar": "또는 왼쪽에서 끌어다 놓기",
    "fit": "화면 맞춤", "grid": "격자", "snap": "맞춤",
    // 속성 창
    "properties": "속성", "room properties": "방 속성", "wall properties": "벽 속성",
    "door properties": "문 속성", "window properties": "창문 속성",
    "name": "이름", "type": "종류", "color": "색", "room color": "방 색", "wall color": "벽 색",
    "floor material": "바닥재", "floor": "바닥", "area": "넓이", "length": "길이", "width": "너비",
    "height": "높이", "thickness": "두께", "position": "위치", "sill height": "창턱 높이",
    "swing": "열림 방향", "flip": "뒤집기", "delete": "삭제", "duplicate": "복제", "rotate": "회전",
    "indoor": "실내", "outdoor": "실외", "utility": "다용도",
    "living room": "거실", "bedroom": "침실", "kitchen": "주방", "bathroom": "화장실", "entrance": "현관",
    "hallway": "복도", "closet": "옷방", "balcony": "베란다", "office": "작업실", "dining room": "식당",
    "wood": "나무", "tile": "타일", "carpet": "카펫", "concrete": "콘크리트", "marble": "대리석", "laminate": "강마루",
    "cancel": "취소", "ok": "확인", "close": "닫기", "apply": "적용", "reset": "초기화",
    "dark mode": "어두운 화면", "units": "단위", "language": "언어"
  };
  const R = [
    [/^(\d+)\s*walls?$/i, "벽 $1개"],
    [/^zoom:\s*(.+)$/i, "확대: $1"],
    [/^snap\s+(.+)$/i, "맞춤 $1"],
    [/^room\s+(\d+)$/i, "방 $1"],
    [/^wall\s+(\d+)$/i, "벽 $1"],
  ];
  function tr(s) {
    const t = s.trim();
    if (!t) return null;
    const k = W[t.toLowerCase()];
    if (k) return s.replace(t, k);
    for (const [re, to] of R) if (re.test(t)) return s.replace(t, t.replace(re, to));
    return null;
  }
  function walk(node) {
    if (node.nodeType === 3) {
      const p = node.parentNode;
      if (p && /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)) return;
      const n = tr(node.nodeValue);
      if (n !== null && n !== node.nodeValue) node.nodeValue = n;
      return;
    }
    if (node.nodeType !== 1) return;
    for (const a of ["title", "placeholder", "aria-label"]) {
      const v = node.getAttribute && node.getAttribute(a);
      if (v) { const n = tr(v); if (n !== null && n !== v) node.setAttribute(a, n); }
    }
    for (const c of node.childNodes) walk(c);
  }
  function start() {
    walk(document.body);
    new MutationObserver(ms => {
      for (const m of ms) {
        if (m.type === "characterData") walk(m.target);
        else for (const n of m.addedNodes) walk(n);
        if (m.type === "attributes") walk(m.target);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["title", "placeholder", "aria-label"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();