document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chat-container");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  // chat の内容を表示する
  // 第二引数には、user or ollama を引数に渡すことで、表示位置を変える
  const displayMessage = (message, sender) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);

    const messageContent = document.createElement("span");
    messageContent.textContent = message;

    messageElement.appendChild(messageContent);
    chatContainer.appendChild(messageElement);

    // スクロール位置を最下部に自動調整
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return messageElement;
  };

  const fetchOllamaResponse = async (inputMessage, displayMessage) => {
    try {
      // ここで LLM からの応答を取得して表示する
      const url = new URL("/api/chat", "http://localhost:11434");

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          model: "gemma:2b",
          messages: [
            {
              role: "user",
              content: inputMessage,
            },
          ],
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to fetch response from Ollama API.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      const ollamaMessageElement = displayMessage("", "ollama");

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
        for (const line of lines) {
          try {
            const json = JSON.parse(line);

            if (json.message && json.message.content) {
              ollamaMessageElement.querySelector("span").textContent +=
                json.message.content;
            }

            if (json.done) {
              console.log("Response streaming completed.");
              return;
            }
          } catch (error) {
            console.error("Error parsing chunk:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching Ollama response:", error);
    }
  };

  const handleSendMessage = async () => {
    const message = userInput.value.trim();
    if (message === "") return;

    // ユーザーのメッセージを表示する
    displayMessage(message, "user");

    // 入力欄をクリアする
    userInput.value = "";

    await fetchOllamaResponse(message, displayMessage);
  };

  // send ボタンが押された場合のイベントを登録
  sendButton.addEventListener("click", handleSendMessage);

  // Enter キーでも送信できるようにする
  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  });
});
