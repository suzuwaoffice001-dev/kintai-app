let selectedRole = null;
let checkInTime = null;

// 区分選択
function setRole(role) {
  selectedRole = role;
  alert("選択された区分：" + role);
}

// 出勤（自動入力）
function autoCheckIn() {
  if (!selectedRole) {
    alert("先に『当番・サブ・一般』を選んでください");
    return;
  }

  if (selectedRole === "toban") checkInTime = "08:30";
  if (selectedRole === "sub") checkInTime = "08:45";
  if (selectedRole === "ippan") checkInTime = "09:15";

  saveLog("出勤", checkInTime);
  alert("出勤時間：" + checkInTime);
}

// 退勤（手入力）
function manualCheckout() {
  const checkout = document.getElementById("checkout-time").value;

  if (!checkout) {
    alert("退勤時間を入力してください");
    return;
  }

  saveLog("退勤", checkout);
  alert("退勤しました：" + checkout);

  calculateWorkTime(checkInTime, checkout);
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
    `実労働時間：${hours}時間 ${minutes}分`;
}

// ログ保存
function saveLog(type, time) {
  const logDiv = document.getElementById("log");
  const entry = document.createElement("div");
  entry.textContent = `${type}：${time}`;
  logDiv.appendChild(entry);
}

