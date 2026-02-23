let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPopup();
});

function showInstallPopup() {
  if (localStorage.getItem("pwaInstalled")) return;

  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="
      position:fixed;
      bottom:20px;
      left:20px;
      right:20px;
      background:#111;
      color:#fff;
      padding:15px;
      border-radius:8px;
      z-index:9999;
      text-align:center;">
      <p style="margin-bottom:10px;">Cài đặt HN Nghe Truyện để trải nghiệm tốt hơn</p>
      <button id="installBtn" style="margin-right:10px;padding:8px 12px;">Cài ngay</button>
      <button id="closeBtn" style="padding:8px 12px;">Để sau</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("installBtn").onclick = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      localStorage.setItem("pwaInstalled", "true");
      popup.remove();
    });
  };

  document.getElementById("closeBtn").onclick = () => popup.remove();
}
