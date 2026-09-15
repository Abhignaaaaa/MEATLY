with open("backend/src/app.ts", "r") as f:
    text = f.read()

cors_logic = """const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://meatly-taupe.vercel.app',
  config.frontendUrl
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
        callback(null, true);
      } else {
        callback(null, false); // Allow requests but without CORS headers if origin doesn't match
      }
    },
    credentials: true,
  })
);"""

text = text.replace("""app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);""", cors_logic)

with open("backend/src/app.ts", "w") as f:
    f.write(text)
