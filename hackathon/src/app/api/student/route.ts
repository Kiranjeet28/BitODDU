import { NextRequest } from "next/server";
import { updateResume } from "./handlers/buildResume";

// Handle POST requests (your existing logic)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Add some logging to debug
        console.log('API Request body:', body);
        console.log('Action:', body.action);
        
        switch (body.action) {
          case 'resume': updateResume(body.rollNo, body.data);
        }
    } catch (error) {
        console.error('Route handler error:', error);
        return handleError(error);
    }
}
function handleError(error: unknown) {
  throw new Error("Function not implemented.");
}

