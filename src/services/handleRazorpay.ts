export async function handleCreateContact(phone: number) {
  try {
    const payload = {
      name: "EthIndia User",
      email: "ethindia.user@example.com",
      contact: `+91${phone}`,
      type: "employee",
    };

    const response = await fetch(
      "http://localhost:3000/api/razorpay/createContact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // Handle non-successful responses
      console.error("Error:", response.statusText);
      return null; // or throw an error depending on your error handling strategy
    }

    const data = await response.json();
    console.log("HII", data);

    return data;
  } catch (error) {
    // Handle other errors
    console.error("Error:", error);
    return null; // or throw an error depending on your error handling strategy
  }
}

export async function handleCreateFunds(upi: string, contact_id: string) {
  try {
    const payload = {
      account_type: "vpa",
      contact_id: contact_id,
      vpa: {
        address: upi,
      },
    };

    console.log(payload);

    const response = await fetch(
      "http://localhost:3000/api/razorpay/createFund",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // Handle non-successful responses
      console.error("Error:", response.statusText);
      return null; // or throw an error depending on your error handling strategy
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    // Handle other errors
    console.error("Error:", error);
    return null; // or throw an error depending on your error handling strategy
  }
}

export async function handleCreatePayout(fa_id: string, amount: number) {
  try {
    const payload = {
      account_number: "2323230036284010",
      fund_account_id: fa_id,
      amount: amount,
      currency: "INR",
      mode: "UPI",
      purpose: "refund",
    };

    // console.log(payload);

    const response = await fetch(
      "http://localhost:3000/api/razorpay/createPayout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // Handle non-successful responses
      console.error("Error:", response.statusText);
      return null; // or throw an error depending on your error handling strategy
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    // Handle other errors
    console.error("Error:", error);
    return null; // or throw an error depending on your error handling strategy
  }
}
