with open("src/services/apiClient.js", "r") as f:
    text = f.read()

text = text.replace(
    "const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';",
    "const BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://meatly-k4pb.onrender.com/api' : 'http://localhost:5000/api');"
)

with open("src/services/apiClient.js", "w") as f:
    f.write(text)
