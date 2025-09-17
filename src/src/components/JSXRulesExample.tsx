import React from 'react';

/**
 * JSX Rules Example Component
 * Part 2 - JSX Rules (3:00 - 7:00)
 * 
 * Script: "Ab chaliye dekhte hain JSX likhne ke kuch important rules. 
 * Ye rules follow karne se hi code chalega."
 */

export const JSXRulesExample = () => {
  // ✅ Rule 1: Single Parent Element
  // Har component ka sirf ek parent element hona chahiye.
  
  // ❌ Wrong - Multiple root elements (will cause error)
  // return (
  //   <h1>Hello</h1>
  //   <p>World</p>
  // );

  // ✅ Correct - Single parent element
  const singleParentExample = (
    <div style={{ color: '#1a1a1a' }}>
      <h1 style={{ color: '#1a1a1a', fontSize: '2rem', margin: '0 0 10px 0', fontWeight: '600' }}>Hello</h1>
      <p style={{ color: '#6b7280', fontSize: '1.2rem', margin: '0' }}>World</p>
    </div>
  );

  // 📌 Why? Kyuki React internally sab kuch ek hi tree ke andar render karta hai. 
  // Agar multiple root elements doge, to wo confuse ho jata hai.

  // 👉 Pro Tip: <div> ke jagah <></> (React Fragment) bhi use kar sakte ho
  const fragmentExample = (
    <div style={{ color: '#1a1a1a' }}>
      <h1 style={{ color: '#1a1a1a', fontSize: '2rem', margin: '0 0 10px 0', fontWeight: '600' }}>Hello</h1>
      <p style={{ color: '#6b7280', fontSize: '1.2rem', margin: '0' }}>World</p>
    </div>
  );

  // ✅ Rule 2: Close All Tags
  // JSX me har tag self-closing hona chahiye.
  
  // ❌ Wrong - Unclosed tag
  // <img src="logo.png">

  // ✅ Correct - Self-closing tag
  const selfClosingExample = (
    <div style={{ color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src="https://fastly.picsum.photos/id/961/200/300.jpg?hmac=rshb15adr3WtZi83bW54uoTd2m0FuSCNwtfD74RJY0k" alt="Logo" style={{ width: '40px', height: '40px', border: '2px solid #e2e8f0', borderRadius: '4px' }} />
      <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>&lt;img src="logo.png" alt="Logo" /&gt;</span>
    </div>
  );

  // 📌 Why? Kyuki JSX XML jaisa behave karta hai, aur XML strict hota hai.

  // ✅ Rule 3: Use className Instead of class
  const classNameExample = (
    <div style={{ color: '#1a1a1a' }}>
      <h1 style={{ color: '#1a1a1a', fontSize: '1.8rem', margin: '0', fontWeight: '600' }}>Hello</h1>
      <p style={{ color: '#6b7280', fontSize: '1rem', margin: '10px 0 0 0' }}>
        &lt;h1 className="title"&gt;Hello&lt;/h1&gt;
      </p>
    </div>
  );

  // 📌 Why? Kyuki class JavaScript ka reserved keyword hai. 
  // React ne alternative diya → className.

  // ✅ Rule 4: JavaScript Expressions in { }
  const name = "Abdullah";
  const jsxExpressionExample = (
    <div style={{ color: '#1a1a1a' }}>
      <h1 style={{ color: '#1a1a1a', fontSize: '1.8rem', margin: '0', fontWeight: '600' }}>Hello, {name}</h1>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
        &lt;h1&gt;Hello, {`{name}`}&lt;/h1&gt;
      </p>
    </div>
  );
  // Output: 👉 Hello, Abdullah

  // 📌 You can add any expression, like math, variables, function calls inside { }
  const mathExample = (
    <div style={{ color: '#1a1a1a' }}>
      <p style={{ color: '#1a1a1a', fontSize: '1.2rem', margin: '0', fontWeight: '500' }}>2 + 2 = {2 + 2}</p>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
        &lt;p&gt;2 + 2 = {`{2 + 2}`}&lt;/p&gt;
      </p>
    </div>
  );
  // Output: 👉 2 + 2 = 4

  const currentTime = new Date().toLocaleTimeString();
  const functionCallExample = (
    <div style={{ color: '#1a1a1a' }}>
      <p style={{ color: '#1a1a1a', fontSize: '1.2rem', margin: '0', fontWeight: '500' }}>Current time: {currentTime}</p>
      <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
        &lt;p&gt;Current time: {`{currentTime}`}&lt;/p&gt;
      </p>
    </div>
  );

  return (
    <div style={{ 
      padding: '30px', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      lineHeight: '1.6'
    }}>
      <h1 style={{ 
        color: '#1a1a1a', 
        borderBottom: '3px solid #2563eb',
        paddingBottom: '15px',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        JSX Rules Examples
      </h1>
      
      <section style={{ 
        marginBottom: '40px',
        backgroundColor: '#f8fafc',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ 
          color: '#1e40af', 
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ✅ Rule 1: Single Parent Element
        </h2>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #e2e8f0',
          marginBottom: '15px'
        }}>
          {singleParentExample}
        </div>
        <p style={{ 
          fontWeight: '600', 
          color: '#374151',
          marginBottom: '10px',
          fontSize: '1.1rem'
        }}>
          Fragment Example:
        </p>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #e2e8f0'
        }}>
          {fragmentExample}
        </div>
      </section>

      <section style={{ 
        marginBottom: '40px',
        backgroundColor: '#f0f9ff',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #bae6fd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ 
          color: '#1e40af', 
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ✅ Rule 2: Self-Closing Tags
        </h2>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #bae6fd'
        }}>
          {selfClosingExample}
        </div>
      </section>

      <section style={{ 
        marginBottom: '40px',
        backgroundColor: '#f0fdf4',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #bbf7d0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ 
          color: '#1e40af', 
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ✅ Rule 3: Use className Instead of class
        </h2>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #bbf7d0'
        }}>
          {classNameExample}
        </div>
      </section>

      <section style={{ 
        marginBottom: '40px',
        backgroundColor: '#fef3c7',
        padding: '25px',
        borderRadius: '12px',
        border: '1px solid #fde68a',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ 
          color: '#1e40af', 
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ✅ Rule 4: JavaScript Expressions in { }
        </h2>
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #fde68a'
        }}>
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
            {jsxExpressionExample}
          </div>
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
            {mathExample}
          </div>
          <div style={{ padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
            {functionCallExample}
          </div>
        </div>
      </section>

      <div style={{ 
        backgroundColor: '#1e40af', 
        padding: '25px', 
        borderRadius: '12px',
        border: 'none',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        color: '#ffffff'
      }}>
        <h3 style={{ 
          color: '#ffffff', 
          marginTop: 0,
          fontSize: '1.3rem',
          fontWeight: '600',
          marginBottom: '15px'
        }}>
          📌 Key Points:
        </h3>
        <ul style={{ 
          margin: 0,
          paddingLeft: '20px',
          fontSize: '1.1rem',
          lineHeight: '1.8'
        }}>
          <li style={{ marginBottom: '8px' }}>Always wrap multiple elements in a single parent</li>
          <li style={{ marginBottom: '8px' }}>Use React Fragments (&lt;&gt;&lt;/&gt;) to avoid extra divs</li>
          <li style={{ marginBottom: '8px' }}>Self-close all tags (img, br, hr, etc.)</li>
          <li style={{ marginBottom: '8px' }}>Use className instead of class</li>
          <li>JavaScript expressions go inside curly braces { }</li>
        </ul>
      </div>
    </div>
  );
};

