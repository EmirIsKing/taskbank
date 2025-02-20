import { db } from "@/firebase"; // Adjust the path
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "@clerk/nextjs/server"; 
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // ✅ Get userId from Clerk auth
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Parse request body
        const { newStatus, address, amount, method, userid } = await req.json();
        if (!userid) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        // ✅ Reference to the user document
        const userDocRef = doc(db, "users", userid);

        // ✅ Ensure user document exists
        const userSnapshot = await getDoc(userDocRef);
        if (!userSnapshot.exists()) {
            await setDoc(userDocRef, { offers: [], withdrawal: [] });
        }

        // ✅ Fetch updated user data
        const userDoc = await getDoc(userDocRef);
        const userInfo = userDoc.data();

        if (userInfo) {
            await updateDoc(userDocRef, {
                withdrawal: [
                    ...(userInfo?.withdrawal || []), 
                    {
                        status: newStatus,
                        address,
                        amount,
                        method,
                        createdAt: new Date().toISOString(),
                    },
                ],
            });
        }

        // ✅ Add withdrawal to "withdrawals" collection
        const withdrawalRef = collection(db, "withdrawals");
        const docRef = await addDoc(withdrawalRef, {
            userId: userid,
            status: newStatus,
            address,
            amount,
            method,
            createdAt: new Date().toISOString(),
        });

        console.log("Withdrawal requested successfully:", docRef.id);

        // ✅ Return success response
        return NextResponse.json({ success: true, id: docRef.id }, { status: 200 });

    } catch (error) {
        console.error("Request failed:", error);
        return NextResponse.json({ error: error.message || "Failed to request withdrawal." }, { status: 500 });
    }
}
