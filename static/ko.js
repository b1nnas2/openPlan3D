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
    "dark mode": "어두운 화면", "units": "단위", "language": "언어",
    // 방 속성 창
    "room type": "방 종류", "custom": "직접 입력", "room name": "방 이름", "category": "분류",
    "open to floor below": "아래층이 보이는 구조", "room": "방",
    // 첫 화면 (평면도 목록)
    "floor plan editor": "평면도 편집기", "templates": "견본 평면도", "new project": "새 평면도",
    "projects and version history are saved in this browser.": "평면도와 수정 기록은 이 기기에 저장돼요.",
    "download library backup": "전체 백업 받기", "restore library backup": "백업 되살리기",
    "import project package": "평면도 파일 불러오기", "user guide": "사용 안내",
    "this browser may delete saved projects, for example when it runs low on space. use “download library backup” regularly to keep a copy.":
      "저장 공간이 부족하면 저장한 평면도가 지워질 수 있어요. 가끔 [전체 백업 받기]로 따로 보관해 주세요.",
    "just now": "방금", "open": "열기", "rename": "이름 바꾸기",
    // 벽 속성 창
    "start height": "시작 쪽 높이", "end height": "끝 쪽 높이", "keep fixed": "고정할 끝",
    "start (a)": "시작점 (A)", "end (b)": "끝점 (B)", "center": "가운데", "middle": "가운데",
    "enter cm, or include units such as 2.5 m, 12\" or 5'6\".": "cm로 입력하거나 2.5 m처럼 단위를 붙여도 돼요.",
    "joined corners follow the moving endpoint. openings keep their relative positions.": "붙어 있는 모서리는 함께 움직이고, 문·창문은 제자리를 지켜요.",
    "wall type": "벽 종류", "interior": "내벽", "exterior": "외벽", "partition": "칸막이",
    "curved wall": "곡선 벽", "curve": "곡선", "split wall": "벽 나누기", "material": "재질",
    "texture": "무늬", "opacity": "투명도", "angle": "각도", "offset": "간격", "elevation": "벽면 보기",
    "lock": "잠금", "unlock": "잠금 해제", "visible": "보이기", "hidden": "숨기기",
    // 문·창문 속성 창
    "distance from a": "A에서 거리", "distance from b": "B에서 거리",
    "door style": "문 모양", "slab": "민무늬", "panel": "판넬", "glass": "유리", "shaker": "테두리형",
    "hinge side": "경첩 위치", "left": "왼쪽", "right": "오른쪽",
    "opens": "열리는 쪽", "inward": "안쪽으로", "outward": "바깥쪽으로",
    "frame color": "문틀 색", "custom:": "직접 고르기:", "join to another door...": "다른 문과 잇기...",
    "item details": "가격 정보", "item cost": "가격",
    "use the same currency throughout the project. clear the field to leave the cost unset.": "가격은 원 단위로 적어 주세요. 비워 두면 가격 없음이에요.",
    // 방 목록
    "room presets": "방 모양 견본", "click to add a room shape to the canvas": "누르면 평면도에 방 모양이 추가돼요",
    "rectangle": "네모", "l-shape": "ㄱ자", "t-shape": "ㅜ자", "u-shape": "ㄷ자",
    // 방 속성 창 (아래쪽)
    "item notes": "메모", "room use": "방 용도", "unspecified": "정하지 않음",
    "room ceiling height": "천장 높이", "use plan default": "평면도 기본값",
    "this room override travels to iphone. edit wall heights to change the web 3d geometry.": "이 방에만 쓰는 천장 높이예요. 3D 모양은 벽 높이로 바꿔 주세요.",
    "add photo": "사진 추가", "solid color": "단색", "stone": "돌",
    "jpg or png, up to 8 mib and 24 megapixels. large photos become resized copies up to 1600 pixels. no uploads.": "JPG·PNG 사진(8MB까지)을 넣을 수 있어요. 큰 사진은 작게 줄여서 저장돼요.",
    // 바닥재 이름
    "light oak": "밝은 참나무", "walnut": "월넛", "bamboo": "대나무", "oak": "참나무", "maple": "단풍나무", "cherry": "체리목",
    "white tile": "흰 타일", "gray tile": "회색 타일", "porcelain": "포세린 타일", "vinyl": "장판",
    "white marble": "흰 대리석", "dark marble": "검은 대리석", "slate": "슬레이트",
    "beige carpet": "베이지 카펫", "gray carpet": "회색 카펫"
  };
  const R = [
    [/^(\d+)\s*walls?$/i, "벽 $1개"],
    [/^zoom:\s*(.+)$/i, "확대: $1"],
    [/^snap\s+(.+)$/i, "맞춤 $1"],
    [/^room\s+(\d+)$/i, "방 $1"],
    [/^wall\s+(\d+)$/i, "벽 $1"],
    [/^(\d+)\s*projects?$/i, "평면도 $1개"],
    [/^(\d+)\s*minutes? ago$/i, "$1분 전"],
    [/^(\d+)\s*hours? ago$/i, "$1시간 전"],
    [/^(\d+)\s*days? ago$/i, "$1일 전"],
    [/^item photos\s*\((\d+)\)$/i, "사진 ($1)"],
  ];
  function tr(s) {
    const t = s.trim();
    if (!t) return null;
    const k = W[t.toLowerCase()];
    if (k) return s.replace(t, k);
    for (const [re, to] of R) if (re.test(t)) return s.replace(t, t.replace(re, to));
    // 앞에 그림(🏠, ✏️ 등)이 붙은 글자: 그림은 두고 뒤 글자만 바꾸기
    const m = t.match(/^([^\p{L}\p{N}]+)(.+)$/u);
    if (m) { const k2 = W[m[2].trim().toLowerCase()]; if (k2) return s.replace(t, m[1] + k2); }
    // 뒤에 단위가 붙은 글자: "Length (cm)" → "길이 (cm)"
    const u = t.match(/^(.+?)\s*(\((?:cm|m|mm|°|%)\))$/i);
    if (u) { const k3 = W[u[1].trim().toLowerCase()]; if (k3) return s.replace(t, k3 + " " + u[2]); } 
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