with open("src/views/ShopApplicationStatusView.jsx", "r") as f:
    text = f.read()

text = text.replace("""  if (!application) {
    onNavigateToRegister();
    return null;
  }""", """  if (!application) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-[#E4E4DA] text-center max-w-sm w-full space-y-4">
          <h2 className="text-xl font-bold text-[#20231B]">No Application Found</h2>
          <p className="text-[#6F7268] text-sm">You haven't submitted a shop application yet.</p>
          <Button variant="primary" fullWidth onClick={onNavigateToRegister}>
            Register Your Shop
          </Button>
          <Button variant="ghost" fullWidth onClick={onBack}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }""")

with open("src/views/ShopApplicationStatusView.jsx", "w") as f:
    f.write(text)
