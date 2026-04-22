const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {

  // Home route → return HTML page
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Kubernetes Demo</title>
        <style>
          body {
            font-family: Arial;
            text-align: center;
            margin-top: 100px;
            background: #0f172a;
            color: white;
          }
          button {
            padding: 12px 20px;
            font-size: 16px;
            background: #22c55e;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background: #16a34a;
          }
          #output {
            margin-top: 20px;
            font-size: 18px;
            color: #38bdf8;
          }
        </style>
      </head>
      <body>

        <h1>🚀 Kubernetes Demo App</h1>
        <p>Backend running inside Kubernetes</p>

        <button onclick="getMessage()">Get Message</button>

        <div id="output"></div>

        <script>
          async function getMessage() {
            const res = await fetch('/api/message');
            const data = await res.json();
            document.getElementById('output').innerHTML =
              data.message + "<br/>" + data.time;
          }
        </script>

      </body>
      </html>
    `);
  }

  // API route
  else if (req.url === "/api/message" && req.method === "GET") {
    const responseData = {
      message: "🔥 Hello from Kubernetes Backend",
      time: new Date().toISOString()
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseData));
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
