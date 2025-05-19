import { revalidatePath } from "next/cache";

// OPTIONS request
export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRFToken",
    },
  });
}

/**
 * Handles the POST request to clear the cache.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} The response object indicating the success of the cache clearing operation.
 */
export async function POST(request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token !== process.env.CLEAR_CACHE_AUTH_TOKEN) {
    console.log("fail");
    return new Response(  // Use 'new Response'
      JSON.stringify({
        success: false,
        message: "Invalid Credentials!",
      }),
      {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRFToken",
        },
      }
    );
  }

  revalidatePath("/", "layout");
  console.log("success");
  return new Response(  // Use 'new Response'
    JSON.stringify({
      success: true,
      message: "Cache Cleared successfully!",
    }),
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-CSRFToken",
      },
    }
  );
}
