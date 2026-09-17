let selectedRole = null;
let startTime = null;

// 当番・サブ・通常ボタンを押したときの処理
function setRole(role) {
  selectedRole = role;

  if (role === "toban") startTime = "08:30";
  if (role === "sub") startTime = "08:45";
  if (role === "normal") startTime = "09:15";

  document.getElementById("start-time").value = startTime;

  calculateWorkTime(startTime, document.getElementById("end-time").value);
}

// 退勤時間入力（1500 → 15:00）
function manualCheckout() {
  let raw = document.getElementById("end-time").value;

  // 5桁以上ならエラー
  if (raw.length >= 5) {
    alert("数字は4桁までです（例：1500）");
    document.getElementById("end-time").value = "";
    return;
  }

  // 4桁なら 1500 → 15:00 に変換
  if (/^\d{4}$/.test(raw)) {
    raw = raw.substring(0, 2) + ":" + raw.substring(2);
    document.getElementById("end-time").value = raw;
  }

  calculateWorkTime(startTime, raw);
}

// 勤務時間計算
function calculateWorkTime(start, end) {
  if (!start || !end) return;

  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;

  const diff = endMin - startMin;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  document.getElementById("work-time").value =
    `${hours}時間 ${minutes}分`;
}

// Enter キー無効化
function disableEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
}
