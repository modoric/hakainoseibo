let currentMode = '';
let selectedQuest = '';
let recruitData = [];

function goToStep(step) {
  document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(`step${step}`).classList.remove('hidden');

  if (step === 4) {
    selectedQuest = document.getElementById('questSelect').value;
    if (!selectedQuest) return alert('クエストを選んでください');

    if (currentMode === '募集') {
      document.getElementById('recruitForm').classList.remove('hidden');
      document.getElementById('joinList').classList.add('hidden');
    } else {
      document.getElementById('recruitForm').classList.add('hidden');
      document.getElementById('joinList').classList.remove('hidden');
      showRecruitList();
    }
  }
}

function selectMode(mode) {
  currentMode = mode;
  goToStep(3);
}

function submitRecruit() {
  const comment = document.getElementById('comment').value;
  const url = document.getElementById('url').value;
  if (!comment || !url) return alert('コメントとURLを入力してください');
  recruitData.push({ quest: selectedQuest, comment, url });
  alert('募集を投稿しました！');
  goToStep(2);
}

function showRecruitList() {
  const list = document.getElementById('recruitList');
  list.innerHTML = '';
  const filtered = recruitData.filter(r => r.quest === selectedQuest);
  if (filtered.length === 0) {
    list.innerHTML = '<li>まだ募集がありません</li>';
  } else {
    filtered.forEach(r => {
      const li = document.createElement('li');
      li.className = 'recruit-card';
      li.innerHTML = `
        <strong>クエスト ${r.quest}</strong><br>
        コメント：${r.comment}<br>
        ${r.url}${r.url}</a>
      `;
      list.appendChild(li);
    });
  }
}

function goBackTo(step) {
  document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(`step${step}`).classList.remove('hidden');
}
