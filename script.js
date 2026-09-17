let selectedRole = null;
let startTime = null;

// 区分選択
function setRole(role) {
  selectedRole = role;
  alert("選択された区分：" + role);
}

// 出勤（自動入力）
function autoCheckIn() {
  if (!selectedRole) {
    alert("先に『当番・サブ・通常』を選んでください");
    return;
  }

  if (selectedRole === "toban") startTime = "08:30";
  if (selectedRole === "sub") startTime = "08:45";
  if (selectedRole === "normal") startTime = "09:15";

  document.getElementById("start-time").value = startTime;

  alert("出勤時間：" + startTime);
}

// 退勤（1500 → 15:00 に変換）
function manualCheckout() {
  let raw = document.getElementById("end-time").value;

  if (!raw) {
    alert("退勤時間を入力してください");
    return;
  }

  // 1500 → 15:00 に変換
  if (raw.length === 4 && !raw.includes(":")) {
    raw = raw.slice(0, 2) + ":" + raw.slice(2);
  }

  document.getElementById("end-time").value = raw;

  alert("退勤しました：" + raw);

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

  document.getElementById("work-time").textContent =
    `${hours}時間 ${minutes}分`;
}
