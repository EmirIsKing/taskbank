import crypto from "crypto";

export async function GET(req, res) {
  try {
    // ✅ Extract query parameters using `req.nextUrl.searchParams`
    const { searchParams } = new URL(req.url);

    console.log(searchParams);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }x
}
