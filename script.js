let selectedRole = null;
let startTime = null;

// 区分選択（押した瞬間に出勤時間を自動入力）
function setRole(role) {
  selectedRole = role;

  if (role === "toban") startTime = "08:30";
  if (role === "sub") startTime = "08:45";
  if (role === "normal") startTime = "09:15";

  document.getElementById("start-time").value = startTime;

  calculateWorkTime(startTime, document.getElementById("end-time").value);
}

// 退勤（1500 → 15:00 に変換）
function manualCheckout() {
  let raw = document.getElementById("end-time").value;

  if (!raw) {
    document.getElementById("work-time").value = "";
    return;
  }

  // 1500 → 15:00 に変換（確実に動く版）
  if (/^\d{4}$/.test(raw)) {
  raw = raw.substring(0, 2) + ":" + raw.substring(2);
  document.getElementById("end-time").value = raw;
}

  calculateWorkTime(startTime, raw);
}

// 実労働時間の計算
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
