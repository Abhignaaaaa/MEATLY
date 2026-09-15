with open("src/views/AccountView.jsx", "r") as f:
    text = f.read()

text = text.replace("{user.role === 'customer' && (", "{(!user.role || user.role === 'customer') && (")

with open("src/views/AccountView.jsx", "w") as f:
    f.write(text)
