with open("src/services/apiClient.js", "r") as f:
    text = f.read()

replacement = """let BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (import.meta.env.PROD) {
  if (!BASE_URL || BASE_URL.includes('localhost')) {
    BASE_URL = 'https://meatly-k4pb.onrender.com/api';
  }
} else {
  if (!BASE_URL) {
    BASE_URL = 'http://localhost:5000/api';
  }
}"""

text = text.replace("const BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://meatly-k4pb.onrender.com/api' : 'http://localhost:5000/api');", replacement)

with open("src/services/apiClient.js", "w") as f:
    f.write(text)
