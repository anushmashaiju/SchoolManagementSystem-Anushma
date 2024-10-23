// Function used to generate access token for user
const sendToken = (user, res) => {
  try {
    const access_token = user.generateAccessToken(); // Generate the access token
    console.log("access-token====", access_token); // Log the generated token for debugging
    if (!access_token) {
      return res.status(500).json({ message: "Token generation failed" }); 
    }
    // Send the token as part of the response, along with user info
    res.status(200).json({
      message: "Token generated successfully",
      token: access_token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role, 
      },
    });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ message: "Server error" }); 
  }
};

export default sendToken;
