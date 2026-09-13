function updateTime() {
  const now = new Date();
  const formatted = now.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  document.getElementById("nowTime").textContent = formatted;
}
setInterval(updateTime, 1000);
updateTime();

function addLog(type) {
  const now = new Date();
  const time = now.toLocaleString("ja-JP");
  const li = document.createElement("li");
  li.textContent = `${type}：${time}`;
  document.getElementById("logList").appendChild(li);
}

document.getElementById("checkInBtn").addEventListener("click", () => {
  addLog("チェックイン");
});

document.getElementById("checkOutBtn").addEventListener("click", () => {
  addLog("チェックアウト");
});


