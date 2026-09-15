with open("src/views/AccountView.jsx", "r") as f:
    text = f.read()

banner = """
        {user.role === 'customer' && (
          <div className="bg-[#46552A] text-white rounded-[22px] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Own a meat shop?</h3>
              <p className="text-sm opacity-90 mt-1">Join MEATLY as a partner and grow your local business.</p>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-[#667A3E] hover:text-white" onClick={onNavigateToShopRegister}>
              Register Your Shop
            </Button>
          </div>
        )}

        {/* Account Menu Section */}
"""

text = text.replace("        {/* Account Menu Section */}", banner)

with open("src/views/AccountView.jsx", "w") as f:
    f.write(text)
