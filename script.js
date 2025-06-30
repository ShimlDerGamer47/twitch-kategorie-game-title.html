document.addEventListener("DOMContentLoaded", () => {
  try {
    const html = document.documentElement;
    const body = document.body;
    const css = getComputedStyle(html);
    const robotoBold = css.getPropertyValue("--font-family").trim();
    const borderColor = css.getPropertyValue("--border-color").trim();

    Object.assign(body.style, {
      fontFamily: robotoBold,
      background: "transparent",
      width: "100vw",
      height: "100vh",
      overflow: "hidden hidden",
      margin: "0"
    });

    const container = document.getElementById("titleTxtContainerId");
    const titleTxt = document.getElementById("titleTxtId");

    Object.assign(container.style, {
      background: "transparent",
      position: "absolute",
      top: "0",
      left: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${borderColor}`,
      padding: "5px",
      margin: "5px",
      userSelect: "none",
      cursor: "default",
      pointerEvents: "none"
    });

    Object.assign(titleTxt.style, {
      background: "transparent",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyItems: "center",
      justifyContent: "center",
      border: `1px solid ${borderColor}`,
      padding: "5px 5px",
      margin: "5px 5px 5px 5px",
      textAlign: "center",
      userSelect: "none",
      cursor: "default",
      pointerEvents: "none"
    });

    const params = new URLSearchParams(window.location.search);
    const channelName = params.get("channelName");

    const fontSize = params.get("fontSize");
    const color = params.get("color");
    const textDecoration = params.get("textDecoration");

    if (fontSize) titleTxt.style.fontSize = fontSize;
    if (color) titleTxt.style.color = color;
    if (textDecoration) titleTxt.style.textDecoration = textDecoration;

    if (channelName) {
      fetch(`https://decapi.me/twitch/game/${encodeURIComponent(channelName)}`)
        .then((res) => res.text())
        .then((game) => {
          if (game.startsWith("User not found")) {
            titleTxt.textContent = "";
            return;
          }

          titleTxt.textContent = game || "Keine Kategorie gefunden.";
        })
        .catch((err) => {
          console.error("Fehler beim Abrufen des Spiels:", err);
        });
    }
  } catch (error) {
    console.error("Fehler:", error);
  }
});
