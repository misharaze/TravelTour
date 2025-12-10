const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  const res = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    alert("✅ Заявка отправлена!");
    form.reset();
  } else {
    alert("❌ Ошибка отправки");
    console.error(result);
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const headerCta = document.querySelector(".btn-order");
  
    if (headerCta) {
      headerCta.addEventListener("click", (e) => {
        e.preventDefault(); // ❗ запрещаем переход по ссылке / скролл
  
        const modalEl = document.getElementById("contactModal");
        if (modalEl) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show(); // явно открываем модалку
        }
      });
    }
  });
  