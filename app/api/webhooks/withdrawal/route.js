import { db } from "@/utils/firebase/clientApp";
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
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

        // ✅ Create a unique transaction ID (Firestore-generated document ID)
        const withdrawalRef = collection(db, "withdrawals");
        const transactionDocRef = doc(withdrawalRef); // Generates a new unique ID
        const transactionId = transactionDocRef.id;

        // ✅ Fetch updated user data
        const userDoc = await getDoc(userDocRef);
        const userInfo = userDoc.data();

        if (userInfo) {
            await updateDoc(userDocRef, {
                withdrawal: [
                    ...(userInfo?.withdrawal || []), 
                    {
                        transactionId,
                        status: newStatus,
                        address,
                        amount,
                        method,
                        createdAt: new Date().toISOString(),
                    },
                ],
            });
        }

        // ✅ Store withdrawal using the same transaction ID
        await setDoc(transactionDocRef, {
            transactionId,
            userId: userid,
            status: newStatus,
            address,
            amount,
            method,
            createdAt: new Date().toISOString(),
        });

        console.log("Withdrawal requested successfully:", transactionId);

        // ✅ Return success response
        return NextResponse.json({ success: true, transactionId }, { status: 200 });

    } catch (error) {
        console.error("Request failed:", error);
        return NextResponse.json({ error: error.message || "Failed to request withdrawal." }, { status: 500 });
    }
}
