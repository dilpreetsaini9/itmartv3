export const generateHTML = (name = "User") => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <title>Welcome to IT MART</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px 0;
      }
      .header h1 {
        margin: 0;
        color: #333;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        line-height: 1.5;
        color: #555;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        padding: 10px 0;
        font-size: 12px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Hello ${name}</h1>
        <h1>Welcome to IT MART</h1>
      </div>
      <div class="content">
        <p>Thank you for logging into IT MART. We're glad to have you with us!</p>
        <p>Here are some exciting services and products we offer:</p>
        <ul>
          <li>Secure online shopping</li>
          <li>Exclusive discounts and offers</li>
          <li>24/7 customer support</li>
        </ul>
        <p>Enjoy your experience!</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 IT MART. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};
export const generateOrderCompleteHTML = (
  name = "User",
  lastname = "",
  orderId = ""
) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <title>Welcome to IT MART</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px 0;
      }
      .header h1 {
        margin: 0;
        color: #333;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        line-height: 1.5;
        color: #555;
      }
      .otp {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        padding: 10px 0;
        font-size: 12px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>hi ${name} ${lastname}</h1>
        <h1Thanks For Ordering || Order Recived</h1>
      </div>
      <div class="content">
        <p>You can track your order at <a href="https://itsmyitmart.store">itmart/profile</a></p>
        <p>Feel free to contact us</p>
        <ul>
          <li>order id : ${orderId}</li>
        </ul>
        <p>Enjoy your experience!</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 IT MART. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
};
