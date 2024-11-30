// netlify/functions/hello.js

const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  try {
    const { path: requestPath } = event; // Get the path from the event object

    // Set common CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow methods as needed
    };

    if (requestPath.endsWith("/api")) {
      // Endpoint: /hello
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          "events": [
            { "id": 1, "name": "Virtual Tech Summit", "time": "9:00 AM", "platform": "zoom", "organizer":"Tech Innovators", "date":"05/12/2024", "Registrationlink":"https://www.aaspa.org/events/2024-virtual-technology-summit-" },
            { "id": 2, "name": "Online Coding Bootcamp", "time": "2:00 PM", "platform": "Google Meet" , "organizer":"Code Academy", "date":"08/12/2024", "Registrationlink":"https://www.fullstackacademy.com/programs/online-coding-bootcamp"},
            { "id": 3, "name": "Digital Marketing Webinar", "time": "11:00 AM", "platform": "Microsoft Teams" , "organizer":"Digital World", "date":"12/12/2024", "Registrationlink":"https://daninstitute.com/resources/webinars/"},
            { "id": 4, "name": "AI and Data Science Workshop", "time": "4:00 PM", "platform": "Cisco Webex" , "organizer":"AI Experts", "date":"15/12/2024", "Registrationlink":"https://meetings.informs.org/wordpress/seattle2024/data-science-workshop/"},
            { "id": 5, "name": "Online Fitness Challenge", "time": "6:00 PM", "platform": "Facebook Live" , "organizer":"FitLife", "date":"20/12/2024", "Registrationlink":"https://www.glofox.com/blog/virtual-fitness-challenges/"}
            
          ]
        }),
      };
    } else if (requestPath.endsWith("/")) {
      // Endpoint: /html
      const filePath = path.join(__dirname, "public/index.html");

      // Read the HTML file
      const htmlContent = fs.readFileSync(filePath, "utf8");

      return {
        statusCode: 200,
        headers: { corsHeaders, "Content-Type": "text/html" },
        body: htmlContent,
      };
    } else {
      // If the path doesn't match, return a 404 response
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: "Endpoint not found",
      };
    }
  } catch (error) {
    console.error("Error handling request:", error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: "Internal Server Error",
    };
  }
};
