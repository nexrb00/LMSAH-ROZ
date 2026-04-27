import React, { useState } from "react";

const Callback = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "منتج 1", qty: 2 },
    { id: 2, name: "منتج 2", qty: 1 },
  ]);

  const [code, setCode] = useState("");

  // تحويل السلة إلى كود
  const generateCode = () => {
    const json = JSON.stringify(cart);
    const encoded = btoa(json); // تشفير Base64
    setCode(encoded);
  };

  // نسخ الكود
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("تم نسخ الكود!");
  };

  // استرجاع السلة من الكود
  const loadFromCode = () => {
    try {
      const decoded = atob(code);
      const parsed = JSON.parse(decoded);
      setCart(parsed);
    } catch (err) {
      alert("كود غير صالح");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>السلة</h2>

      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - الكمية: {item.qty}
          </li>
        ))}
      </ul>

      <button onClick={generateCode}>إنشاء كود</button>

      <div style={{ marginTop: "10px" }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={4}
          cols={50}
          placeholder="سيظهر الكود هنا..."
        />
      </div>

      <button onClick={copyCode}>نسخ الكود</button>
      <button onClick={loadFromCode} style={{ marginLeft: "10px" }}>
        استرجاع السلة
      </button>
    </div>
  );
};

export default Callback;
